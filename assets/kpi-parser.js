(function (root) {
  const BANS = [
    { id: 'ctxh', name: 'Ban CTXH', short: 'CTXH', kpiLabel: 'Ban CTXH' },
    { id: 'kinh-te', name: 'Ban Kinh tế', short: 'Kinh tế', kpiLabel: 'Ban Kinh Tế' },
    { id: 'vh-tt', name: 'Ban Văn hoá - Thể thao', short: 'VH-TT', kpiLabel: 'Ban Văn Hóa - Thể Thao' },
    { id: 'quoc-te', name: 'Ban Quốc tế', short: 'Quốc tế', kpiLabel: 'Ban Quốc Tế' },
    { id: 'giao-duc', name: 'Ban Giáo dục', short: 'Giáo dục', kpiLabel: 'Ban Giáo Dục' },
    { id: 'tncs', name: 'Ban Thanh niên & Cuộc sống', short: 'TN&CS', kpiLabel: 'Ban Thanh niên và cuộc sống' },
    { id: 'ptnds', name: 'TT Phát triển Nội dung số', short: 'PTNDS', kpiLabel: 'Trung tâm Phát triển Nội dung số' }
  ]

  const UNITS = [
    { id: 'thoi-su', name: 'Thời sự - Chính trị', type: 'cm', ban: 'ctxh', sheet: 'Thời sự - CTXH', kpiName: ['Thời sự - Chính Trị', 'Thời sự'] },
    { id: 'doi-song', name: 'Đời sống', type: 'cm', ban: 'ctxh', sheet: 'Đời Sống', kpiName: 'Đời sống' },
    { id: 'suc-khoe', name: 'Sức khoẻ', type: 'cm', ban: 'ctxh', sheet: 'Sức Khoẻ', kpiName: 'Sức khỏe' },
    { id: 'kinh-te', name: 'Kinh tế - Du lịch - Tiêu dùng', type: 'cm', ban: 'kinh-te', sheet: 'Kinh Tế - Du Lịch - Tiêu Dùng', kpiName: 'Kinh Tế - Du Lịch - Tiêu Dùng' },
    { id: 'the-thao', name: 'Thể thao', type: 'cm', ban: 'vh-tt', sheet: 'Thể Thao', kpiName: 'Thể Thao' },
    { id: 'giai-tri', name: 'Giải trí', type: 'cm', ban: 'vh-tt', sheet: 'Giải Trí', kpiName: 'Giải trí' },
    { id: 'van-hoa', name: 'Văn hoá', type: 'cm', ban: 'vh-tt', sheet: 'Văn Hoá', kpiName: 'Văn hóa' },
    { id: 'thoi-trang-tre', name: 'Thời trang trẻ', type: 'cm', ban: 'vh-tt', sheet: 'Thời Trang Trẻ', kpiName: 'Thời trang trẻ' },
    { id: 'the-gioi', name: 'Thế giới', type: 'cm', ban: 'quoc-te', sheet: 'Thế Giới', kpiName: 'Thế giới' },
    { id: 'giao-duc', name: 'Giáo dục', type: 'cm', ban: 'giao-duc', sheet: 'Giáo Dục', kpiName: 'Giáo dục' },
    { id: 'gioi-tre', name: 'Giới trẻ', type: 'cm', ban: 'tncs', sheet: 'Giới Trẻ', kpiName: 'Giới trẻ' },
    { id: 'cong-nghe', name: 'Công nghệ - Game', type: 'cm', ban: 'ptnds', sheet: 'Công Nghệ - Game', kpiName: 'Công nghệ - Game' },
    { id: 'ha-noi', name: 'Hà Nội', type: 'vp', ban: null, sheet: 'VP Hà Nội', kpiName: 'Hà Nội' },
    { id: 'da-nang', name: 'Đà Nẵng', type: 'vp', ban: null, sheet: 'VP Đà Nẵng', kpiName: 'Đà Nẵng' },
    { id: 'can-tho', name: 'Cần Thơ', type: 'vp', ban: null, sheet: 'VP Cần Thơ', kpiName: 'Cần Thơ' },
    { id: 'nha-trang', name: 'Nha Trang', type: 'vp', ban: null, sheet: 'VP Nha Trang', kpiName: 'Nha Trang' },
    { id: 'dong-nam-bo', name: 'Đông Nam Bộ', type: 'vp', ban: null, sheet: 'VP Đông Nam Bộ', kpiName: 'Đông Nam Bộ', optional: true },
    { id: 'binh-dinh', name: 'Bình Định', type: 'vp', ban: null, sheet: 'VP Bình Định', kpiName: 'Bình Định', optional: true },
    { id: 'dong-bac-bo', name: 'Đông Bắc Bộ', type: 'vp', ban: null, sheet: 'VP Đông Bắc Bộ', kpiName: 'Đông Bắc Bộ', optional: true },
    { id: 'bac-trung-bo', name: 'Bắc Trung Bộ', type: 'vp', ban: null, sheet: 'VP Bắc Trung Bộ', kpiName: 'Bắc Trung Bộ', optional: true },
    { id: 'media', name: 'Media', type: 'media', ban: null, sheet: null, kpiName: 'Media' }
  ]

  const TONE = { 'à': 'a', 'á': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a', 'è': 'e', 'é': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e', 'ỳ': 'y', 'ý': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y' }
  const MARK = { 'à': '̀', 'á': '́', 'ả': '̉', 'ã': '̃', 'ạ': '̣', 'è': '̀', 'é': '́', 'ẻ': '̉', 'ẽ': '̃', 'ẹ': '̣', 'ỳ': '̀', 'ý': '́', 'ỷ': '̉', 'ỹ': '̃', 'ỵ': '̣' }

  function normName(s) {
    if (s == null) return ''
    let t = String(s).normalize('NFC').replace(/\s+/g, ' ').trim().toLowerCase()
    t = t.replace(/([ou])([àáảãạèéẻẽẹỳýỷỹỵ])(?![a-zđ])/g, (m, a, b) => {
      if ((a === 'o' && (TONE[b] === 'a' || TONE[b] === 'e')) || (a === 'u' && TONE[b] === 'y')) return (a + MARK[b]).normalize('NFC') + TONE[b]
      return m
    })
    return t
  }

  function slug(s) {
    return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'd')
      .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
  }

  function num(v) {
    if (v == null || v === '') return null
    const n = typeof v === 'number' ? v : Number(String(v).replace(/[^\d.-]/g, ''))
    return isFinite(n) ? n : null
  }

  function cleanName(v) {
    return String(v).replace(/\s+/g, ' ').trim()
  }

  function makePeriod(year) {
    return {
      id: year,
      label: 'KPI ' + year,
      start: (year - 1) + '-11-01',
      end: year + '-10-31',
      videoField: year >= 2027 ? 'TotalPlay' : 'Plays',
      months: Array.from({ length: 12 }, (_, i) => {
        const m = ((10 + i) % 12) + 1
        const y = i < 2 ? year - 1 : year
        return { key: y + '-' + String(m).padStart(2, '0'), label: 'T' + m + '/' + y, short: 'T' + m }
      })
    }
  }

  function findRow(rows, pred, from = 1) {
    for (let r = from; r < rows.length; r++) if (rows[r] && pred(rows[r], r)) return r
    return -1
  }

  function a(row) { return row && row[1] != null ? String(row[1]).trim() : '' }

  async function parseMaster(wb, year, prev) {
    const period = makePeriod(year)
    const warnings = []
    const cm = await wb.rows('KPI CM')
    const pvSheet = await wb.rows('KPI Phóng viên')
    if (!cm || !pvSheet) throw new Error('Không tìm thấy sheet "KPI CM" hoặc "KPI Phóng viên"')

    const kpiTop = {}
    const playRow = findRow(cm, row => /play\s*time/i.test(String(row[2] || '')))
    for (let r = 4; r < cm.length; r++) {
      const row = cm[r]
      if (!row) continue
      const name = a(row)
      if (/tiến độ/i.test(name)) break
      if (!name || num(row[3]) == null) continue
      kpiTop[normName(name)] = { prev: num(row[2]), kpi: num(row[3]), metric: playRow > 0 && r > playRow ? 'playtime' : 'pageview' }
    }

    const mediaHead = findRow(cm, row => a(row) === 'Media' && /playtime/i.test(String(row[2] || '')))
    let mediaMonthly = Array(12).fill(null)
    if (mediaHead > 0) {
      const mr = findRow(cm, row => a(row) === 'Media' && typeof row[2] === 'number', mediaHead + 1)
      if (mr > 0) mediaMonthly = period.months.map((_, i) => num(cm[mr][7 + i * 2]))
    }

    const banRows = {}
    pvSheet.forEach(row => {
      const name = a(row)
      const ban = BANS.find(b => normName(b.kpiLabel) === normName(name))
      if (ban) banRows[ban.id] = num(row[2])
    })

    const prevReps = {}
    if (prev && prev.reporters) prev.reporters.forEach(r => { prevReps[r.id] = r })

    const units = []
    const reporters = []
    const usedIds = new Set()

    const visible = name => wb.sheets.some(sh => sh.name.trim() === name.trim() && sh.state === 'visible')
    for (const cfg of UNITS) {
      if (cfg.optional && !visible(cfg.sheet)) continue
      const top = [].concat(cfg.kpiName).map(n => kpiTop[normName(n)]).find(Boolean) || {}
      const unit = {
        id: cfg.id, name: cfg.name, type: cfg.type, ban: cfg.ban,
        metric: cfg.type === 'media' ? 'playtime' : 'pageview',
        prev: top.prev ?? null, kpi: top.kpi ?? null,
        monthly: Array(12).fill(null)
      }
      if (unit.kpi == null) warnings.push('Thiếu KPI năm của ' + cfg.name)
      if (cfg.type === 'media') { unit.monthly = mediaMonthly; units.push(unit); continue }

      const rows = await wb.rows(cfg.sheet)
      if (!rows) { warnings.push('Không tìm thấy sheet ' + cfg.sheet); units.push(unit); continue }

      const unitRow = findRow(rows, row => /^(chuyên mục|tổng)$/i.test(a(row)) && typeof row[2] === 'number')
      if (unitRow > 0) unit.monthly = period.months.map((_, i) => num(rows[unitRow][2 + i * 2]))

      const dsRow = findRow(rows, row => /^danh sách pv/i.test(a(row)))
      const official = {}
      if (dsRow > 0) {
        for (let r = dsRow + 3; r < rows.length; r++) {
          const name = a(rows[r])
          if (!name) break
          const clean = cleanName(name.replace(/\(nhóm\)/i, ''))
          official[normName(clean)] = { kpi: num(rows[r][3]) }
        }
      }

      const progRow = findRow(rows, row => /tiến độ thực hiện của pv/i.test(a(row)))
      if (progRow < 0) { warnings.push('Không thấy khối tiến độ PV ở ' + cfg.sheet); units.push(unit); continue }

      let leader = null
      for (let r = progRow + 3; r < rows.length; r++) {
        const row = rows[r]
        const raw = a(row)
        if (!raw) break
        if (raw.length > 60) break
        const monthly = period.months.map((_, i) => {
          const b = 2 + i * 5
          const sb = num(row[b]), pb = num(row[b + 1]), vd = num(row[b + 2])
          if (sb == null && pb == null && vd == null) return null
          return [sb || 0, pb || 0, vd || 0]
        })
        const groupMatch = raw.match(/^nhóm\s*:\s*(.+)$/i)
        if (groupMatch) {
          leader = { name: cleanName(groupMatch[1]), rec: null }
          continue
        }
        const name = cleanName(raw)
        const key = normName(name)
        let type = 'ctv'
        let lead = null
        if (leader && normName(leader.name) === key) {
          type = 'pv'
        } else if (official[key]) {
          type = 'pv'
          leader = null
        } else if (leader) {
          lead = leader.id
        }
        let id = cfg.id + '-' + slug(name)
        while (usedIds.has(id)) id += '-2'
        usedIds.add(id)
        const old = prevReps[id]
        const rec = {
          id, name, unit: cfg.id, type, leader: lead,
          kpi: official[key] ? official[key].kpi : null,
          codes: old ? old.codes || [] : [],
          aliases: old ? old.aliases || [] : [],
          monthly
        }
        if (leader && normName(leader.name) === key) { leader.id = id; rec.isLeader = true }
        reporters.push(rec)
      }
      units.push(unit)
    }

    reporters.forEach(r => { if (r.leader === undefined) r.leader = null })

    return {
      version: 1,
      period,
      bans: BANS.map(b => ({ id: b.id, name: b.name, short: b.short, kpiPV: banRows[b.id] ?? null })),
      units,
      reporters,
      updatedAt: new Date().toISOString(),
      log: (prev && prev.log ? prev.log.slice(-30) : []).concat([{ at: new Date().toISOString(), action: 'Import file KPI tổng' }]),
      warnings
    }
  }

  async function parseSanLuong(wb) {
    const rows = await wb.first()
    const head = findRow(rows, row => row.some(c => /số bài/i.test(String(c || ''))))
    if (head < 0) throw new Error('File sản lượng thiếu cột "Số bài"')
    const h = rows[head]
    const idx = name => h.findIndex(c => c != null && normName(c) === normName(name))
    const cName = idx('Tên đầy đủ'), cPen = idx('Bút danh'), cCode = idx('Mã nhân sự'), cBai = idx('Số bài')
    if (cName < 0 || cBai < 0) throw new Error('File sản lượng thiếu cột "Tên đầy đủ" hoặc "Số bài"')
    const out = []
    for (let r = head + 1; r < rows.length; r++) {
      const row = rows[r]
      if (!row || (row[cName] == null && (cPen < 0 || row[cPen] == null))) continue
      out.push({
        name: cleanName(row[cName] != null ? row[cName] : row[cPen]),
        pen: cPen > 0 && row[cPen] != null ? cleanName(row[cPen]) : '',
        code: cCode > 0 && row[cCode] != null ? String(row[cCode]).trim() : '',
        value: num(row[cBai]) || 0
      })
    }
    return out
  }

  async function parseVideo(wb, field) {
    const rows = await wb.first()
    const head = findRow(rows, row => row.some(c => normName(c) === 'author'))
    if (head < 0) throw new Error('File video thiếu cột "Author"')
    const h = rows[head]
    const cName = h.findIndex(c => normName(c) === 'author')
    const cVal = h.findIndex(c => c != null && normName(c) === normName(field))
    if (cVal < 0) throw new Error('File video thiếu cột "' + field + '"')
    const out = []
    for (let r = head + 1; r < rows.length; r++) {
      const row = rows[r]
      if (!row || row[cName] == null) continue
      out.push({ name: cleanName(row[cName]), value: num(row[cVal]) || 0 })
    }
    return out
  }

  function personalCodes(sl) {
    const names = {}
    sl.forEach(s => {
      if (!s.code) return
      const c = s.code.toUpperCase()
      if (!names[c]) names[c] = new Set()
      names[c].add(normName(s.name))
    })
    const ok = new Set()
    Object.keys(names).forEach(c => { if (names[c].size === 1) ok.add(c) })
    return ok
  }

  function matchMonthly(data, monthIdx, sl, vid) {
    const valid = sl ? personalCodes(sl) : new Set()
    const report = { month: monthIdx, rows: [], unmatchedSL: [], unmatchedVideo: [], counts: { bai: 0, video: 0, missingBai: 0, missingVideo: 0 } }
    const usedSL = new Set()
    const usedVid = new Set()
    data.reporters.forEach(rep => {
      if ((rep.movedTo && monthIdx >= rep.movedTo.month) || (rep.movedFrom && monthIdx < rep.movedFrom.month)) return
      const names = new Set([normName(rep.name)].concat((rep.aliases || []).map(normName)))
      const codes = new Set((rep.codes || []).map(c => String(c).trim().toUpperCase()))
      const cur = rep.monthly[monthIdx] || [0, 0, 0]
      const row = { id: rep.id, name: rep.name, unit: rep.unit, type: rep.type, oldBai: cur[0], oldVideo: cur[2], newBai: null, newVideo: null, baiSrc: 0, vidSrc: 0 }
      if (sl) {
        let sum = 0, hit = 0
        sl.forEach((s, i) => {
          const code = valid.has(s.code.toUpperCase()) ? s.code.toUpperCase() : ''
          const byName = names.has(normName(s.name)) || (s.pen && names.has(normName(s.pen)))
          const ok = codes.size && code ? codes.has(code) : byName
          if (ok) { sum += s.value; hit++; usedSL.add(i) }
        })
        if (hit) { row.newBai = sum; row.baiSrc = hit; report.counts.bai++ } else report.counts.missingBai++
      }
      if (vid) {
        let sum = 0, hit = 0
        vid.forEach((v, i) => {
          if (names.has(normName(v.name))) { sum += v.value; hit++; usedVid.add(i) }
        })
        if (hit) { row.newVideo = sum; row.vidSrc = hit; report.counts.video++ } else report.counts.missingVideo++
      }
      report.rows.push(row)
    })
    if (sl) report.unmatchedSL = sl.filter((_, i) => !usedSL.has(i)).sort((x, y) => y.value - x.value).slice(0, 40)
    if (vid) report.unmatchedVideo = vid.filter((_, i) => !usedVid.has(i)).sort((x, y) => y.value - x.value).slice(0, 40)
    return report
  }

  function applyMonthly(data, report, opts) {
    const m = report.month
    data.reporters.forEach(rep => {
      const row = report.rows.find(x => x.id === rep.id)
      if (!row) return
      const cur = rep.monthly[m] ? rep.monthly[m].slice() : [0, 0, 0]
      if (opts.bai) cur[0] = row.newBai ?? 0
      if (opts.video) cur[2] = row.newVideo ?? 0
      rep.monthly[m] = cur
    })
    data.updatedAt = new Date().toISOString()
    data.log = (data.log || []).slice(-30).concat([{ at: data.updatedAt, action: 'Cập nhật ' + data.period.months[m].label + (opts.bai ? ' · số bài' : '') + (opts.video ? ' · video' : '') }])
    return data
  }

  function seedCodes(data, sl) {
    const valid = personalCodes(sl)
    const byName = {}
    sl.forEach(s => {
      const k = normName(s.name)
      if (!byName[k]) byName[k] = new Set()
      if (s.code && valid.has(s.code.toUpperCase())) byName[k].add(s.code.toUpperCase())
    })
    let n = 0
    data.reporters.forEach(r => {
      if (r.codes && r.codes.length) return
      const set = byName[normName(r.name)]
      if (set && set.size === 1) { r.codes = [...set]; n++ }
    })
    return n
  }

  function makeSkeleton(year) {
    return {
      version: 1,
      period: makePeriod(year),
      bans: BANS.map(b => ({ id: b.id, name: b.name, short: b.short, kpiPV: null })),
      units: UNITS.filter(u => !u.optional).map(u => ({ id: u.id, name: u.name, type: u.type, ban: u.ban, metric: u.type === 'media' ? 'playtime' : 'pageview', prev: null, kpi: null, monthly: Array(12).fill(null) })),
      reporters: [],
      updatedAt: null,
      log: []
    }
  }

  root.KpiParser = { BANS, UNITS, normName, slug, makePeriod, makeSkeleton, parseMaster, parseSanLuong, parseVideo, matchMonthly, applyMonthly, seedCodes }
})(typeof window !== 'undefined' ? window : globalThis)
