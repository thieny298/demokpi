(function (root) {
  const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" }

  function decodeXml(s) {
    return s.replace(/&(#x[0-9a-fA-F]+|#\d+|amp|lt|gt|quot|apos);/g, (m, e) => {
      if (e[0] === '#') return String.fromCodePoint(e[1] === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10))
      return ENT[e]
    })
  }

  async function inflateRaw(bytes) {
    const ds = new DecompressionStream('deflate-raw')
    const stream = new Blob([bytes]).stream().pipeThrough(ds)
    return new Uint8Array(await new Response(stream).arrayBuffer())
  }

  async function unzip(buffer) {
    const bytes = new Uint8Array(buffer)
    const view = new DataView(buffer)
    let eocd = -1
    for (let i = bytes.length - 22; i >= Math.max(0, bytes.length - 65557); i--) {
      if (view.getUint32(i, true) === 0x06054b50) { eocd = i; break }
    }
    if (eocd < 0) throw new Error('File không phải định dạng .xlsx hợp lệ')
    const count = view.getUint16(eocd + 10, true)
    let ptr = view.getUint32(eocd + 16, true)
    const dec = new TextDecoder()
    const entries = {}
    for (let n = 0; n < count; n++) {
      if (view.getUint32(ptr, true) !== 0x02014b50) break
      const method = view.getUint16(ptr + 10, true)
      const csize = view.getUint32(ptr + 20, true)
      const nameLen = view.getUint16(ptr + 28, true)
      const extraLen = view.getUint16(ptr + 30, true)
      const commentLen = view.getUint16(ptr + 32, true)
      const local = view.getUint32(ptr + 42, true)
      const name = dec.decode(bytes.subarray(ptr + 46, ptr + 46 + nameLen))
      entries[name] = { method, csize, local }
      ptr += 46 + nameLen + extraLen + commentLen
    }
    return {
      has: name => !!entries[name],
      async text(name) {
        const e = entries[name]
        if (!e) return null
        const ln = view.getUint16(e.local + 26, true)
        const le = view.getUint16(e.local + 28, true)
        const start = e.local + 30 + ln + le
        const raw = bytes.subarray(start, start + e.csize)
        const out = e.method === 0 ? raw : await inflateRaw(raw)
        return dec.decode(out)
      }
    }
  }

  function colIndex(ref) {
    let n = 0
    for (let i = 0; i < ref.length; i++) {
      const c = ref.charCodeAt(i)
      if (c < 65 || c > 90) break
      n = n * 26 + (c - 64)
    }
    return n
  }

  function attr(s, name) {
    const m = s.match(new RegExp('\\b' + name + '="([^"]*)"'))
    return m ? decodeXml(m[1]) : null
  }

  function textOf(xml) {
    let out = ''
    const re = /<t\b[^>]*>([\s\S]*?)<\/t>/g
    let m
    while ((m = re.exec(xml))) out += m[1]
    return decodeXml(out)
  }

  function parseShared(xml) {
    if (!xml) return []
    const out = []
    const re = /<si\b[^>]*>([\s\S]*?)<\/si>/g
    let m
    while ((m = re.exec(xml))) out.push(textOf(m[1]))
    return out
  }

  function parseSheet(xml, shared) {
    const rows = []
    const rowRe = /<row\b([^>]*)>([\s\S]*?)<\/row>/g
    const cellRe = /<c\b([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g
    let rm
    let rowNo = 0
    while ((rm = rowRe.exec(xml))) {
      const r = attr(rm[1], 'r')
      rowNo = r ? parseInt(r, 10) : rowNo + 1
      const row = []
      let cm
      let col = 0
      cellRe.lastIndex = 0
      while ((cm = cellRe.exec(rm[2]))) {
        const ref = attr(cm[1], 'r')
        col = ref ? colIndex(ref) : col + 1
        const body = cm[2]
        if (!body) continue
        const t = attr(cm[1], 't')
        let v = null
        if (t === 'inlineStr') v = textOf(body)
        else {
          const vm = body.match(/<v>([\s\S]*?)<\/v>/)
          if (!vm) continue
          const raw = vm[1]
          if (t === 's') v = shared[parseInt(raw, 10)]
          else if (t === 'str' || t === 'e') v = decodeXml(raw)
          else if (t === 'b') v = raw === '1'
          else { const num = Number(raw); v = isNaN(num) ? decodeXml(raw) : num }
        }
        row[col] = v
      }
      rows[rowNo] = row
    }
    return rows
  }

  async function read(buffer) {
    const zip = await unzip(buffer)
    const wbXml = await zip.text('xl/workbook.xml')
    if (!wbXml) throw new Error('Không đọc được workbook')
    const relsXml = (await zip.text('xl/_rels/workbook.xml.rels')) || ''
    const rels = {}
    const relRe = /<Relationship\b([^>]*)\/?>/g
    let m
    while ((m = relRe.exec(relsXml))) rels[attr(m[1], 'Id')] = attr(m[1], 'Target')
    const sheets = []
    const shRe = /<sheet\b([^>]*)\/?>/g
    while ((m = shRe.exec(wbXml))) {
      const target = rels[attr(m[1], 'r:id')] || ''
      const path = target.startsWith('/') ? target.slice(1) : 'xl/' + target.replace(/^\.\//, '')
      sheets.push({ name: attr(m[1], 'name'), state: attr(m[1], 'state') || 'visible', path })
    }
    const shared = parseShared(await zip.text('xl/sharedStrings.xml'))
    const cache = {}
    return {
      sheets,
      names: sheets.map(s => s.name),
      async rows(name) {
        const s = sheets.find(x => x.name === name) || sheets.find(x => x.name.trim() === String(name).trim())
        if (!s) return null
        if (!cache[s.name]) cache[s.name] = parseSheet(await zip.text(s.path), shared)
        return cache[s.name]
      },
      async first() { return this.rows(sheets[0].name) }
    }
  }

  root.XlsxLite = { read }
})(typeof window !== 'undefined' ? window : globalThis)
