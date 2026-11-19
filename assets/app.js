(function () {
  const DATA_DIR = 'data/'
  const DRAFT_PREFIX = 'kpi-draft-v2-'
  const UI_KEY = 'kpi-ui-v1'
  const GH_KEY = 'kpi-gh-v1'
  const GH_TOKEN_KEY = 'kpi-gh-token'

  const LOGO = '<svg class="logo" viewBox="0 0 153 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M135.421 3.3456C142.526 3.3456 145.01 5.72006 145.973 6.49271V3.3456H153.001V31.9334H146.108V19.6653C146.108 18.497 145.01 15.2933 142.43 15.2556V31.9334H135.421V3.3456ZM126.891 25.4884H134.035V31.9899H120.286V3.3456H134.035V9.84711H126.891V14.6903H132.995V20.1553H126.891V25.4884ZM112.642 3.3456H119.285V31.9334H112.642V3.3456ZM93.7914 3.3456C100.896 3.3456 103.38 5.72006 104.343 6.49271V3.3456H111.391V31.9334H104.497V19.6653C104.497 18.497 103.4 15.2933 100.819 15.2556V31.9334H93.8106V3.3456H93.7914ZM82.2383 3.3456H88.862V31.9334H82.219V19.1942H78.7339V31.9334H72.0908V3.3456H78.7339V13.8611H82.219L82.2383 3.3456ZM52.9705 3.3456C60.0756 3.3456 62.5595 5.72006 63.5223 6.49271V3.3456H70.5697V31.9334H63.6763V19.6653C63.6763 18.497 62.5788 15.2933 59.9986 15.2556V31.9334H52.9897V3.3456H52.9705ZM34.1775 31.9899H41.3019V28.4848H44.7678V31.9711H51.8922V3.3456C38.3559 3.36444 34.1967 13.0131 34.1775 19.5523V31.9899ZM44.7871 13.6538V22.5486H41.3404V20.2307C41.3019 18.0824 42.8615 13.6538 44.7871 13.6538ZM26.514 3.3456H33.157V31.9334H26.514V19.1942H23.0673V31.9334H16.4243V3.3456H23.0673V13.8611H26.5525V3.3456H26.514ZM0.519531 3.3456H15.4808V8.90486H11.3987V31.9146H4.60162V8.92371H0.519531V3.3456ZM125.582 2.12067L127.083 0.650767C127.276 0.462318 127.661 0.462318 127.854 0.650767L129.356 2.12067C129.548 2.30912 129.721 2.47873 129.356 2.87447C128.99 3.23253 128.797 3.06292 128.585 2.87447L127.449 1.76262L126.313 2.87447C126.121 3.06292 125.947 3.23253 125.543 2.87447C125.177 2.49757 125.389 2.30912 125.582 2.12067Z" fill="#0098D1"/></svg>'

  const ICONS = {
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    layers: '<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>',
    building: '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5"/><path d="M12 3v12"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
    listCheck: '<path d="m3 17 2 2 4-4"/><path d="m3 7 2 2 4-4"/><path d="M13 6h8"/><path d="M13 12h8"/><path d="M13 18h8"/>',
    chevDown: '<path d="m6 9 6 6 6-6"/>',
    chevRight: '<path d="m9 18 6-6-6-6"/>',
    chevLeft: '<path d="m15 18-6-6 6-6"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    menu: '<path d="M21 6H3"/><path d="M10 12H3"/><path d="M10 18H3"/><circle cx="17" cy="15" r="3"/><path d="m21 19-1.9-1.9"/>',
    panel: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    play: '<circle cx="12" cy="12" r="10"/><path d="m10 8 6 4-6 4Z"/>',
    sheet: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M8 13h2"/><path d="M14 13h2"/><path d="M8 17h2"/><path d="M14 17h2"/>',
    file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
    up: '<path d="M22 7 13.5 15.5 8.5 10.5 2 17"/><path d="M16 7h6v6"/>',
    down: '<path d="M22 17 13.5 8.5 8.5 13.5 2 7"/><path d="M16 17h6v-6"/>',
    alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
    check: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    eye: '<path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    calendar: '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/>',
    github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
    save: '<path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path d="M7 3v4a1 1 0 0 0 1 1h7"/>',
    more: '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
    refresh: '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/>',
    trash: '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>',
    video: '<path d="m16 13 5.22 3.48a.5.5 0 0 0 .78-.42V7.87a.5.5 0 0 0-.75-.43L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
    pen: '<path d="M12 20h9"/><path d="M16.38 3.62a1 1 0 0 1 3 3L7.37 18.64a2 2 0 0 1-.86.5l-2.87.84a.5.5 0 0 1-.62-.62l.84-2.87a2 2 0 0 1 .5-.86Z"/>',
    news: '<path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>'
  }

  function icon(name, cls) {
    return '<svg class="ic' + (cls ? ' ' + cls : '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || '') + '</svg>'
  }

  const $ = s => document.querySelector(s)
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
  const nf1 = new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 1 })
  const nf2 = new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 2 })
  const nf0 = new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 0 })

  function fmt(n) {
    if (n == null || isNaN(n)) return '—'
    const a = Math.abs(n)
    if (a >= 1e9) return nf2.format(n / 1e9) + ' tỷ'
    if (a >= 1e6) return nf1.format(n / 1e6) + ' tr'
    if (a >= 1e4) return nf0.format(n / 1e3) + 'K'
    return nf0.format(n)
  }
  const full = n => (n == null || isNaN(n)) ? '—' : nf0.format(n)
  const signed = n => (n > 0 ? '+' : n < 0 ? '−' : '') + fmt(Math.abs(n))
  const pct = (a, b) => b ? a / b * 100 : 0
  const pctTxt = p => nf0.format(Math.round(p)) + '%'
  const initials = name => String(name).trim().split(/\s+/).slice(-2).map(w => w[0]).join('').toUpperCase()

  const SAVE_UI_SKIP = ['rolePop', 'periodPop']
  const S = {
    data: null,
    base: null,
    dirty: false,
    m: 0,
    year: null,
    available: [],
    cache: {},
    route: { name: 'home' },
    ui: { collapsed: false, groups: {}, open: { cm: true }, role: 'admin', roleUnit: '' },
    pv: { q: '', unit: '', sort: 'total', ctv: false },
    adm: { month: null, files: {}, parsed: {}, report: null, master: null, tab: 'changed', keepOld: true, bai: true, video: true, busy: false, year: null },
    apv: { q: '', unit: '', missing: false }
  }

  try { Object.assign(S.ui, JSON.parse(localStorage.getItem(UI_KEY) || '{}')) } catch (e) {}
  S.ui.open = S.ui.open || {}

  const ROLES = [
    { id: 'admin', name: 'Quản trị', scope: 'Phòng Công nghệ · toàn quyền, nhập liệu, cấu hình', color: '#7c3aed', bg: '#f3edff' },
    { id: 'lead', name: 'Lãnh đạo', scope: 'Xem toàn bộ báo', color: '#c2410c', bg: '#fff1e7' },
    { id: 'head', name: 'Trưởng chuyên mục / VP', scope: 'Xem đơn vị của mình', color: '#0081b1', bg: '#e6f5fb' },
    { id: 'pv', name: 'Phóng viên', scope: 'Xem số liệu của mình', color: '#15803d', bg: '#e7f7ec' }
  ]
  function role() { return ROLES.find(r => r.id === S.ui.role) || ROLES[0] }
  function isAdmin() { return role().id === 'admin' }
  const saveUI = () => { try { const o = Object.assign({}, S.ui); SAVE_UI_SKIP.forEach(k => delete o[k]); localStorage.setItem(UI_KEY, JSON.stringify(o)) } catch (e) {} }

  function D() { return S.data }
  function months() { return D().period.months }
  function unit(id) { return D().units.find(u => u.id === id) }
  function rep(id) { return D().reporters.find(r => r.id === id) }
  function mainUnits() { return D().units.filter(u => u.type !== 'media') }
  function cms() { return D().units.filter(u => u.type === 'cm') }
  function vps() { return D().units.filter(u => u.type === 'vp') }
  function media() { return D().units.find(u => u.type === 'media') }

  function currentYear() { const n = new Date(); return n.getMonth() >= 10 ? n.getFullYear() + 1 : n.getFullYear() }
  function draftYears() {
    const out = []
    try { for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (k && k.startsWith(DRAFT_PREFIX)) out.push(Number(k.slice(DRAFT_PREFIX.length))) } } catch (e) {}
    return out.filter(Boolean)
  }
  function periodYears() {
    const ys = S.available.concat(draftYears(), [currentYear(), 2025])
    const min = Math.min(...ys), max = Math.max(...ys)
    const out = []
    for (let y = max; y >= min; y--) out.push(y)
    return out
  }
  function periodState(y) {
    const c = currentYear()
    return y === c ? 'Đang chạy' : y < c ? 'Đã kết thúc' : 'Sắp tới'
  }
  function hasData() { return D().units.some(u => u.kpi) || dataMonths().length > 0 }

  function dataMonths() {
    return months().map((_, i) => i).filter(i => mainUnits().some(u => (u.monthly[i] || 0) > 0))
  }
  function lastDataMonth() { const l = dataMonths(); return l.length ? l[l.length - 1] : 0 }

  function parseDate(s) { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d) }
  const DAY = 86400000
  function totalDays() { return Math.round((parseDate(D().period.end) - parseDate(D().period.start)) / DAY) + 1 }
  function daysUpTo(m) {
    const start = parseDate(D().period.start)
    const [y, mo] = months()[m].key.split('-').map(Number)
    const endOfMonth = new Date(y, mo, 0)
    const now = new Date()
    const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)
    const end = endOfMonth < yesterday ? endOfMonth : yesterday
    return Math.max(1, Math.min(totalDays(), Math.round((end - start) / DAY) + 1))
  }
  function expected(m) { return daysUpTo(m) / totalDays() * 100 }

  function status(actualPct, expPct) {
    if (!expPct) return 'good'
    const r = actualPct / expPct
    if (r >= 1) return 'good'
    if (r >= 0.85) return 'warn'
    return 'bad'
  }
  const statusText = { good: 'Đúng tiến độ', warn: 'Hơi chậm', bad: 'Chậm tiến độ' }

  const sumTo = (arr, m) => arr.slice(0, m + 1).reduce((s, v) => s + (v || 0), 0)
  function unitCum(u, m) { return sumTo(u.monthly, m) }
  function kpiMonth(u) { return u.kpi ? u.kpi / 12 : 0 }

  function unitStats(u, m) {
    const cum = unitCum(u, m)
    const exp = expected(m)
    const p = pct(cum, u.kpi)
    const need = (u.kpi || 0) * exp / 100
    return { cum, kpi: u.kpi || 0, p, exp, need, gap: cum - need, st: status(p, exp), month: u.monthly[m] || 0, kpiM: kpiMonth(u) }
  }

  function groupStats(list, m) {
    const cum = list.reduce((s, u) => s + unitCum(u, m), 0)
    const kpi = list.reduce((s, u) => s + (u.kpi || 0), 0)
    const prev = list.reduce((s, u) => s + (u.prev || 0), 0)
    const month = list.reduce((s, u) => s + (u.monthly[m] || 0), 0)
    const exp = expected(m)
    const p = pct(cum, kpi)
    const need = kpi * exp / 100
    const monthly = months().map((_, i) => list.reduce((s, u) => s + (u.monthly[i] || 0), 0))
    return { cum, kpi, prev, month, kpiM: kpi / 12, exp, p, need, gap: cum - need, st: status(p, exp), monthly }
  }

  function rm(r, i) {
    const x = r.monthly[i]
    if (!x) return { bai: 0, pvb: 0, video: 0, total: 0 }
    return { bai: x[0] || 0, pvb: x[1] || 0, video: x[2] || 0, total: (x[1] || 0) + (x[2] || 0) }
  }
  function members(r) { return D().reporters.filter(x => x.leader === r.id) }
  function repCum(r, m, withGroup) {
    const list = withGroup ? [r].concat(members(r)) : [r]
    const o = { bai: 0, pvb: 0, video: 0, total: 0 }
    list.forEach(x => { for (let i = 0; i <= m; i++) { const v = rm(x, i); o.bai += v.bai; o.pvb += v.pvb; o.video += v.video; o.total += v.total } })
    return o
  }
  function repMonthTotal(r, i, withGroup) {
    const list = withGroup ? [r].concat(members(r)) : [r]
    return list.reduce((s, x) => s + rm(x, i).total, 0)
  }
  function unitPVMonth(u, i) { return D().reporters.filter(r => r.unit === u.id).reduce((s, r) => s + rm(r, i).total, 0) }
  function unitPVCum(u, m) { let s = 0; for (let i = 0; i <= m; i++) s += unitPVMonth(u, i); return s }

  function alerts(m) {
    return mainUnits().map(u => {
      const s = unitStats(u, m)
      const misses = []
      for (let i = m; i >= 0 && misses.length < 3; i--) {
        if ((u.monthly[i] || 0) < s.kpiM) misses.push(i); else break
      }
      return { u, s, streak: misses.length >= 2 ? misses.reverse() : [] }
    }).filter(a => a.s.st !== 'good' || a.streak.length).sort((a, b) => (a.s.p / a.s.exp) - (b.s.p / b.s.exp))
  }
  function alertCount() { if (!hasData()) return 0; return mainUnits().filter(u => unitStats(u, S.m).st !== 'good').length }

  function ring(p, exp, st, size, opts) {
    opts = opts || {}
    const r = 44
    const c = 2 * Math.PI * r
    const v = Math.max(0, Math.min(p, 100))
    const dash = c * v / 100
    const ang = (Math.min(exp, 100) / 100) * 360 - 90
    const rad = ang * Math.PI / 180
    const x1 = 50 + (r - 9) * Math.cos(rad), y1 = 50 + (r - 9) * Math.sin(rad)
    const x2 = 50 + (r + 9) * Math.cos(rad), y2 = 50 + (r + 9) * Math.sin(rad)
    const track = opts.light ? 'rgba(255,255,255,.18)' : '#edf1f5'
    const stroke = opts.light ? 'url(#lg-white)' : 'url(#lg-' + st + ')'
    const markC = opts.light ? '#ffffff' : '#435466'
    const txt = opts.light ? '#ffffff' : '#0f1b2a'
    const sub = opts.light ? 'rgba(255,255,255,.8)' : '#93a1b1'
    return '<svg width="' + size + '" height="' + size + '" viewBox="0 0 100 100" role="img" aria-label="Hoàn thành ' + pctTxt(p) + ', phải đạt ' + pctTxt(exp) + '">' +
      '<circle cx="50" cy="50" r="' + r + '" fill="none" stroke="' + track + '" stroke-width="10"/>' +
      '<circle cx="50" cy="50" r="' + r + '" fill="none" stroke="' + stroke + '" stroke-width="10" stroke-linecap="round" stroke-dasharray="' + dash.toFixed(2) + ' ' + c.toFixed(2) + '" transform="rotate(-90 50 50)"/>' +
      '<line x1="' + x1.toFixed(2) + '" y1="' + y1.toFixed(2) + '" x2="' + x2.toFixed(2) + '" y2="' + y2.toFixed(2) + '" stroke="' + markC + '" stroke-width="2.5" stroke-linecap="round" opacity=".85"/>' +
      '<text x="50" y="' + (opts.label ? 50 : 56) + '" text-anchor="middle" font-size="20" font-weight="800" fill="' + txt + '" font-family="inherit">' + pctTxt(p) + '</text>' +
      (opts.label ? '<text x="50" y="66" text-anchor="middle" font-size="9.5" font-weight="600" fill="' + sub + '" font-family="inherit">' + esc(opts.label) + '</text>' : '') +
      '</svg>'
  }

  function bar(p, exp, st, opts) {
    opts = opts || {}
    return '<div class="bar' + (opts.lg ? ' bar--lg' : '') + '"><div class="bar__track"><div class="bar__fill bar__fill--' + st + '" style="width:' + Math.min(p, 100).toFixed(1) + '%"></div>' +
      (exp != null ? '<div class="bar__mark" style="left:' + Math.min(exp, 100).toFixed(1) + '%" title="Phải đạt ' + pctTxt(exp) + '"></div>' : '') +
      '</div>' + (opts.noPct ? '' : '<span class="bar__pct num ' + st + '">' + pctTxt(p) + '</span>') + '</div>'
  }

  function niceMax(v) {
    if (v <= 0) return 1
    const e = Math.pow(10, Math.floor(Math.log10(v)))
    const f = v / e
    return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * e
  }

  let chartSeq = 0
  function chartW() { return window.innerWidth < 640 ? 380 : 640 }
  function areaChart(values, kpiM, m, opts) {
    opts = opts || {}
    const id = 'c' + (++chartSeq)
    const W = opts.wide && window.innerWidth >= 1024 ? 1180 : chartW(), H = W < 640 ? 240 : opts.wide && W > 640 ? 250 : 230, L = 44, R = 10, T = 12, B = 28
    const iw = W - L - R, ih = H - T - B
    const n = values.length
    const max = niceMax(Math.max(kpiM || 0, ...values.filter(v => v != null)) * 1.08)
    const x = i => L + (n === 1 ? iw / 2 : i * iw / (n - 1))
    const y = v => T + ih - (v / max) * ih
    const pts = values.map((v, i) => (v != null && i <= m && v > 0) ? [x(i), y(v)] : null)
    const valid = pts.filter(Boolean)
    let line = '', area = ''
    if (valid.length) {
      line = valid.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ')
      area = line + ' L' + valid[valid.length - 1][0].toFixed(1) + ' ' + (T + ih) + ' L' + valid[0][0].toFixed(1) + ' ' + (T + ih) + ' Z'
    }
    let g = ''
    for (let k = 0; k <= 4; k++) {
      const v = max * k / 4
      g += '<line class="chart__grid" x1="' + L + '" x2="' + (W - R) + '" y1="' + y(v).toFixed(1) + '" y2="' + y(v).toFixed(1) + '"/>' +
        '<text class="chart__axis" x="' + (L - 8) + '" y="' + (y(v) + 4).toFixed(1) + '" text-anchor="end">' + fmt(v).replace(' ', '') + '</text>'
    }
    const labels = months().map((mo, i) => '<text class="chart__axis" x="' + x(i).toFixed(1) + '" y="' + (H - 8) + '" text-anchor="middle">' + mo.short + '</text>').join('')
    const kpi = kpiM ? '<line class="chart__kpi" x1="' + L + '" x2="' + (W - R) + '" y1="' + y(kpiM).toFixed(1) + '" y2="' + y(kpiM).toFixed(1) + '"/>' : ''
    const dots = pts.map((p, i) => p ? '<circle class="chart__dot" cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="' + (i === m ? 5 : 3.5) + '"/>' : '').join('')
    const step = iw / (n - 1 || 1)
    const hits = values.map((v, i) => '<rect class="chart__hit" data-chart="' + id + '" data-i="' + i + '" x="' + (x(i) - step / 2).toFixed(1) + '" y="' + T + '" width="' + step.toFixed(1) + '" height="' + ih + '" rx="6"/>').join('')
    CHARTS[id] = { values, kpiM, unitLabel: opts.unitLabel || 'lượt xem' }
    return '<div class="chart"><div class="chart__readout" id="' + id + '-ro">' + readout(id, m) + '</div>' +
      '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Biểu đồ 12 tháng">' + g + hits +
      (area ? '<path d="' + area + '" fill="url(#ag-primary)"/>' : '') + kpi +
      (line ? '<path class="chart__line" d="' + line + '"/>' : '') + dots + labels + '</svg>' +
      '<div class="legend"><span class="legend__item"><span class="legend__sw"></span>Thực tế</span>' + (kpiM ? '<span class="legend__item"><span class="legend__sw legend__sw--kpi"></span>KPI tháng</span>' : '') + '</div></div>'
  }

  function columnChart(values, kpiM, m, opts) {
    opts = opts || {}
    const id = 'c' + (++chartSeq)
    const W = chartW(), H = W < 640 ? 230 : 220, L = 44, R = 10, T = 12, B = 28
    const iw = W - L - R, ih = H - T - B
    const n = values.length
    const max = niceMax(Math.max(kpiM || 0, ...values.map(v => v || 0)) * 1.08)
    const slot = iw / n
    const bw = Math.min(30, slot * 0.58)
    const y = v => T + ih - (v / max) * ih
    let g = ''
    for (let k = 0; k <= 4; k++) {
      const v = max * k / 4
      g += '<line class="chart__grid" x1="' + L + '" x2="' + (W - R) + '" y1="' + y(v).toFixed(1) + '" y2="' + y(v).toFixed(1) + '"/>' +
        '<text class="chart__axis" x="' + (L - 8) + '" y="' + (y(v) + 4).toFixed(1) + '" text-anchor="end">' + fmt(v).replace(' ', '') + '</text>'
    }
    let bars = ''
    values.forEach((v, i) => {
      const cx = L + slot * i + slot / 2
      if (v && i <= m) {
        const st = opts.mono ? 'primary' : (kpiM ? (v >= kpiM ? 'good' : v >= kpiM * 0.85 ? 'warn' : 'bad') : 'primary')
        const h = Math.max(2, (v / max) * ih)
        bars += '<rect x="' + (cx - bw / 2).toFixed(1) + '" y="' + (T + ih - h).toFixed(1) + '" width="' + bw.toFixed(1) + '" height="' + h.toFixed(1) + '" rx="' + Math.min(6, bw / 3).toFixed(1) + '" fill="url(#vg-' + st + ')"' + (i === m ? '' : ' opacity=".9"') + '/>'
      }
      bars += '<text class="chart__axis" x="' + cx.toFixed(1) + '" y="' + (H - 8) + '" text-anchor="middle">' + months()[i].short + '</text>'
      bars += '<rect class="chart__hit" data-chart="' + id + '" data-i="' + i + '" x="' + (L + slot * i).toFixed(1) + '" y="' + T + '" width="' + slot.toFixed(1) + '" height="' + ih + '" rx="6"/>'
    })
    const kpi = kpiM ? '<line class="chart__kpi" x1="' + L + '" x2="' + (W - R) + '" y1="' + y(kpiM).toFixed(1) + '" y2="' + y(kpiM).toFixed(1) + '"/>' : ''
    CHARTS[id] = { values, kpiM, unitLabel: opts.unitLabel || 'lượt xem' }
    return '<div class="chart"><div class="chart__readout" id="' + id + '-ro">' + readout(id, m) + '</div>' +
      '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Biểu đồ cột 12 tháng">' + g + bars + kpi + '</svg>' +
      '<div class="legend"><span class="legend__item"><span class="legend__sw"></span>' + (opts.mono ? 'Tổng pageview' : 'Theo tháng') + '</span>' + (kpiM ? '<span class="legend__item"><span class="legend__sw legend__sw--kpi"></span>KPI tháng</span>' : '') + '</div></div>'
  }

  const CHARTS = {}
  function readout(id, i) {
    const c = CHARTS[id]
    if (!c) return ''
    const v = c.values[i]
    const mo = months()[i]
    if (!v) return '<span>' + mo.label + '</span><span class="faint">Chưa có dữ liệu</span>'
    const diff = c.kpiM ? v - c.kpiM : null
    return '<span>' + mo.label + '</span><strong class="num">' + full(v) + '</strong><span>' + c.unitLabel + '</span>' +
      (diff != null ? '<span class="tag tag--' + (diff >= 0 ? 'good' : 'bad') + ' num">' + signed(diff) + ' so với KPI</span>' : '')
  }

  function href(path) { return '#/' + path }
  function link(path, title, inner, cls) {
    return '<a href="' + href(path) + '" title="' + esc(title) + '"' + (cls ? ' class="' + cls + '"' : '') + '>' + inner + '</a>'
  }

  function parseRoute() {
    const h = location.hash.replace(/^#\/?/, '')
    if (h === 'admin') return { name: 'admin' }
    const parts = h.split('/').filter(Boolean).map(decodeURIComponent)
    if (!parts.length) return { name: 'home' }
    const p0 = parts[0]
    if (p0 === 'tong-quan-pv') return { name: 'repsHome' }
    if (p0 === 'canh-bao') return { name: 'alerts' }
    if (p0 === 'chuyen-muc' || p0 === 'ban') return { name: 'cms' }
    if (p0 === 'van-phong') return { name: 'vps' }
    if (p0 === 'don-vi' && parts[1]) return { name: 'unit', id: parts[1] }
    if (p0 === 'pv' && parts[1]) return { name: 'rep', id: parts[1] }
    if (p0 === 'pv') return { name: 'reps' }
    if (p0 === 'admin' && parts[1] === 'pv') return { name: 'adminReps' }
    if (p0 === 'admin' && parts[1] === 'quyen') return { name: 'roles' }
    if (p0 === 'admin') return { name: 'admin' }
    return { name: 'home' }
  }

  function crumbs() {
    const r = S.route
    const home = link('', 'Tổng quan', 'Tổng quan')
    const sep = icon('chevRight')
    const last = t => '<span class="topbar__crumb-last">' + esc(t) + '</span>'
    const mid = h => '<span class="topbar__crumb-mid">' + h + '</span><span class="topbar__crumb-mid">' + sep + '</span>'
    const kpi = '<span>KPI</span>'
    switch (r.name) {
      case 'home': return mid(home) + last('Tất cả chuyên mục')
      case 'repsHome': return mid(home) + last('Tất cả phóng viên')
      case 'alerts': return mid(home) + last('Cảnh báo')
      case 'cms': return mid(kpi) + last('Chuyên mục')
      case 'vps': return mid(kpi) + last('Văn phòng')
      case 'unit': {
        const u = unit(r.id)
        if (!u) return last('Đơn vị')
        const parent = u.type === 'vp' ? link('van-phong', 'Văn phòng', 'Văn phòng') : u.type === 'media' ? '<span>TT số</span>' : link('chuyen-muc', 'Chuyên mục', 'Chuyên mục')
        return mid(kpi) + mid(parent) + last(u.type === 'vp' ? 'VP ' + u.name : u.name)
      }
      case 'reps': return mid(kpi) + last('Phóng viên')
      case 'rep': {
        const p = rep(r.id)
        if (!p) return last('Phóng viên')
        return mid(kpi) + mid(link('pv', 'Phóng viên', 'Phóng viên')) + last(p.name)
      }
      case 'admin': return mid('<span>Quản trị</span>') + last('Nhập liệu')
      case 'adminReps': return mid('<span>Quản trị</span>') + last('Danh sách PV')
      case 'roles': return mid('<span>Quản trị</span>') + last('Phân quyền')
    }
    return ''
  }

  function renderTopbar() {
    const y = S.year
    const pop = S.ui.periodPop
    $('#topbar').innerHTML =
      '<button class="topbar__btn topbar__btn--mob" data-act="drawer-open" title="Mở menu" aria-label="Mở menu">' + icon('menu') + '</button>' +
      '<nav class="topbar__crumbs" aria-label="Breadcrumb">' + crumbs() + '</nav>' +
      '<div class="topbar__right"><div class="period"><button class="period__btn" data-act="period-pop" aria-expanded="' + !!pop + '" title="Chọn kỳ KPI">' + icon('calendar', 'ic--sm') + '<span>KPI ' + y + '</span>' + (y === currentYear() ? '<span class="period__live"></span>' : '') + icon('chevDown', 'ic--sm') + '</button>' +
      (pop ? '<div class="period__menu" role="listbox">' + periodYears().map(py => {
        const p = KpiParser.makePeriod(py)
        const has = S.available.includes(py) || draftYears().includes(py)
        return '<button class="period__item' + (py === y ? ' is-active' : '') + '" data-act="period-set" data-y="' + py + '" role="option"><span class="period__name">KPI ' + py + '</span><span class="period__range">' + p.months[0].label + ' – ' + p.months[11].label + '</span><span class="tag ' + (py === currentYear() ? 'tag--primary' : '') + '">' + periodState(py) + '</span>' + (has ? '' : '<span class="period__none">Chưa có dữ liệu</span>') + '</button>'
      }).join('') + '</div>' : '') + '</div></div>'
  }

  function sItem(path, label, ic, active, extra) {
    return '<a class="sidebar__item' + (active ? ' is-active' : '') + '" href="' + href(path) + '" title="' + esc(label) + '">' + (ic || '') + '<span class="sidebar__item-text">' + esc(label) + '</span>' + (extra || '') + '</a>'
  }
  function sParent(key, path, label, ic, active, sub, extra) {
    const open = !!S.ui.open[key]
    return '<div class="sidebar__parent' + (open ? ' is-open' : '') + '"><div class="sidebar__parent-row">' +
      '<a class="sidebar__item' + (active ? ' is-active' : '') + '" href="' + href(path) + '" title="' + esc(label) + '">' + ic + '<span class="sidebar__item-text">' + esc(label) + '</span>' + (extra || '') + '</a>' +
      '<button class="sidebar__toggle' + (open ? ' is-open' : '') + '" data-act="open" data-key="' + key + '" aria-label="Mở rộng ' + esc(label) + '" aria-expanded="' + open + '">' + icon('chevRight') + '</button></div>' +
      (open ? '<div class="sidebar__sub">' + sub + '</div>' : '') + '</div>'
  }

  function sGroup(key, label, inner) {
    const c = S.ui.groups[key]
    return '<div class="sidebar__group' + (c ? ' is-collapsed' : '') + '"><button class="sidebar__label" data-act="group" data-key="' + key + '" aria-expanded="' + (!c) + '">' + esc(label) + icon('chevDown') + '</button><div class="sidebar__items">' + inner + '</div></div>'
  }

  function renderSidebar() {
    const r = S.route
    const n = alertCount()
    const curUnit = r.name === 'unit' ? unit(r.id) : r.name === 'rep' && rep(r.id) ? unit(rep(r.id).unit) : null
    const live = hasData()
    const dot = u => live ? '<span class="sidebar__dot sidebar__dot--' + unitStats(u, S.m).st + '"></span>' : '<span class="sidebar__dot" style="background:var(--line)"></span>'
    const cmSub = cms().map(u => sItem('don-vi/' + u.id, u.name, dot(u), curUnit && curUnit.id === u.id)).join('')
    const vpSub = vps().map(u => sItem('don-vi/' + u.id, 'VP ' + u.name, dot(u), curUnit && curUnit.id === u.id)).join('')
    const md = media()
    const lm = months()[lastDataMonth()]
    const ro = role()
    const roUnit = S.ui.roleUnit ? unit(S.ui.roleUnit) : null
    const cmBad = !live ? 0 : cms().filter(u => unitStats(u, S.m).st !== 'good').length
    const vpBad = !live ? 0 : vps().filter(u => unitStats(u, S.m).st !== 'good').length
    $('#sidebar').innerHTML =
      '<div class="sidebar__brand"><a class="sidebar__logo" href="' + href('') + '" title="KPI Toà soạn">' + LOGO + '<span class="sidebar__mark">TN</span></a><span class="sidebar__brand-sub">KPI Toà soạn</span><button class="sidebar__close" data-act="drawer-close" aria-label="Đóng menu">' + icon('x') + '</button></div>' +
      '<button class="sidebar__edge" data-act="collapse" title="' + (S.ui.collapsed ? 'Mở rộng thanh bên' : 'Thu gọn thanh bên') + '" aria-label="Thu gọn hoặc mở rộng thanh bên">' + icon('panel') + '</button>' +
      '<nav class="sidebar__nav">' +
      sGroup('overview', 'Tổng quan',
        sItem('', 'Tất cả chuyên mục', icon('grid'), r.name === 'home') +
        sItem('tong-quan-pv', 'Tất cả phóng viên', icon('users'), r.name === 'repsHome') +
        sItem('canh-bao', 'Cảnh báo', icon('bell'), r.name === 'alerts', n ? '<span class="sidebar__badge">' + n + '</span>' : '')) +
      sGroup('kpi', 'KPI',
        sParent('cm', 'chuyen-muc', 'Chuyên mục', icon('news'), r.name === 'cms', cmSub, cmBad ? '<span class="sidebar__count">' + cmBad + '</span>' : '') +
        sParent('vp', 'van-phong', 'Văn phòng', icon('building'), r.name === 'vps', vpSub, vpBad ? '<span class="sidebar__count">' + vpBad + '</span>' : '') +
        sItem('pv', 'Phóng viên', icon('trophy'), r.name === 'reps' || r.name === 'rep') +
        (md ? sItem('don-vi/' + md.id, 'TT số', icon('play'), curUnit && curUnit.id === md.id, '<span class="sidebar__hint">Playtime</span>') : '')) +
      (isAdmin() ? sGroup('admin', 'Quản trị',
        sItem('admin', 'Nhập liệu', icon('upload'), r.name === 'admin', S.dirty ? '<span class="sidebar__dot sidebar__dot--warn" title="Có bản nháp chưa lưu"></span>' : '') +
        sItem('admin/pv', 'Danh sách PV', icon('listCheck'), r.name === 'adminReps') +
        sItem('admin/quyen', 'Phân quyền', icon('shield'), r.name === 'roles')) : '') +
      '</nav>' +
      '<div class="sidebar__footer">' +
      (S.ui.rolePop ? rolePopover() : '') +
      '<button class="sidebar__user" data-act="role-pop" title="Đổi vai trò xem thử" aria-expanded="' + !!S.ui.rolePop + '">' +
      '<span class="avatar" style="--rc:' + ro.color + ';--rb:' + ro.bg + '">' + esc(roUnit ? initials(roUnit.name) : 'TN') + '<span class="avatar__dot"></span></span>' +
      '<span class="sidebar__user-info"><span class="sidebar__user-name">' + esc(roUnit && ro.id === 'head' ? (roUnit.type === 'vp' ? 'VP ' + roUnit.name : roUnit.name) : 'Báo Thanh Niên') + '</span>' +
      '<span class="role-tag" style="--rc:' + ro.color + ';--rb:' + ro.bg + '">' + esc(ro.name) + '</span></span>' + icon('chevDown', 'sidebar__user-chev') + '</button>' +
      '<div class="sidebar__meta">' + icon('calendar', 'ic--sm') + '<span>' + esc(D().period.label) + (hasData() ? ' · dữ liệu đến ' + esc(lm.label) : ' · chưa có dữ liệu') + '</span></div></div>'
  }

  function rolePopover() {
    const units = mainUnits()
    return '<div class="rolepop" role="dialog" aria-label="Vai trò">' +
      '<div class="rolepop__head"><span>Chú thích quyền</span><span class="tag">Xem thử</span></div>' +
      ROLES.map(x => '<button class="rolepop__item' + (x.id === S.ui.role ? ' is-active' : '') + '" data-act="role-set" data-id="' + x.id + '" style="--rc:' + x.color + ';--rb:' + x.bg + '"><span class="rolepop__sw"></span><span class="rolepop__txt"><strong>' + esc(x.name) + '</strong><small>' + esc(x.scope) + '</small></span>' + (x.id === S.ui.role ? icon('check', 'ic--sm') : '') + '</button>').join('') +
      (S.ui.role === 'head' ? '<label class="field" style="padding:8px 4px 2px"><span class="field__label">Đơn vị phụ trách</span><select class="select" data-in="role-unit"><option value="">Chọn đơn vị</option>' + units.map(u => '<option value="' + u.id + '"' + (S.ui.roleUnit === u.id ? ' selected' : '') + '>' + esc(u.type === 'vp' ? 'VP ' + u.name : u.name) + '</option>').join('') + '</select></label>' : '') +
      '<div class="rolepop__foot">Phân quyền thật sẽ đăng nhập qua SSO ở giai đoạn 2</div></div>'
  }

  function dateTxt(iso) {
    if (!iso) return ''
    const d = new Date(iso)
    return String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0') + '/' + d.getFullYear()
  }

  function renderBottom() {
    const r = S.route.name
    const n = alertCount()
    const it = (path, label, ic, on, badge) => '<a class="bottomnav__item' + (on ? ' is-active' : '') + '" href="' + href(path) + '" title="' + esc(label) + '">' + icon(ic) + '<span>' + esc(label) + '</span>' + (badge ? '<span class="bottomnav__badge">' + badge + '</span>' : '') + '</a>'
    $('#bottomnav').innerHTML =
      it('', 'Tổng quan', 'grid', r === 'home' || r === 'repsHome') +
      it('chuyen-muc', 'Chuyên mục', 'news', r === 'cms' || r === 'vps' || r === 'unit') +
      it('pv', 'Phóng viên', 'users', r === 'reps' || r === 'rep') +
      it('canh-bao', 'Cảnh báo', 'bell', r === 'alerts', n) +
      '<button class="bottomnav__item" data-act="drawer-open" title="Thêm">' + icon('more') + '<span>Thêm</span></button>'
  }

  function renderDraft() {
    const el = $('#draft')
    if (!S.dirty) { el.hidden = true; el.innerHTML = ''; return }
    el.hidden = false
    el.innerHTML = icon('alert', 'ic--sm') + '<span>Đang xem <strong>bản nháp chưa lưu</strong> trên trình duyệt này.</span><div class="draft__actions"><a class="btn btn--sm" href="' + href('admin') + '" title="Lưu dữ liệu">' + icon('save', 'ic--sm') + 'Lưu</a><button class="btn btn--sm btn--ghost" data-act="draft-discard">Huỷ nháp</button></div>'
  }

  function monthChips() {
    const has = new Set(dataMonths())
    return '<div class="months"><span class="months__label">Lũy kế đến</span><div class="months__chips" id="chips">' +
      months().map((mo, i) => '<button class="chip' + (i === S.m ? ' is-active' : '') + '" data-act="month" data-i="' + i + '"' + (has.has(i) ? '' : ' disabled') + '>' + mo.label + '</button>').join('') + '</div></div>'
  }

  function podium(items) {
    const order = [1, 0, 2].filter(i => items[i])
    return '<div class="podium">' + order.map(i => {
      const it = items[i]
      const rk = i + 1
      return '<a class="podium__col podium__col--' + rk + '" href="' + it.href + '" title="' + esc(it.name) + '">' +
        '<span class="podium__ava podium__ava--' + (it.st || 'none') + '">' + it.ava + '<span class="podium__medal">' + rk + '</span></span>' +
        '<span class="podium__name">' + esc(it.name) + '</span>' +
        '<span class="podium__value num">' + it.value + '</span>' +
        (it.sub ? '<span class="podium__sub num' + (it.subCls ? ' ' + it.subCls : '') + '">' + it.sub + '</span>' : '') +
        '<span class="podium__block"><span class="podium__rank">' + rk + '</span></span></a>'
    }).join('') + '</div>'
  }

  function unitPodium(list, m) {
    return podium(list.slice(0, 3).map(u => {
      const s = unitStats(u, m)
      return { name: uName(u), href: href('don-vi/' + u.id), ava: icon(u.type === 'vp' ? 'building' : u.type === 'media' ? 'play' : 'news'), value: pctTxt(s.p), sub: fmt(s.cum) + ' / ' + fmt(s.kpi), st: s.st }
    }))
  }

  function repPodium(list, m) {
    return podium(list.slice(0, 3).map(r => {
      const c = repCum(r, m, true)
      const u = unit(r.unit)
      return { name: r.name, href: href('pv/' + r.id), ava: esc(initials(r.name)), value: fmt(c.total), sub: esc(u ? uName(u) : ''), st: 'none' }
    }))
  }

  function unitRow(u, m, opts) {
    opts = opts || {}
    const s = unitStats(u, m)
    const icn = u.type === 'vp' ? 'building' : u.type === 'media' ? 'play' : 'news'
    return '<a class="row" href="' + href('don-vi/' + u.id) + '" title="' + esc(u.name) + '">' +
      (opts.rank ? '<span class="row__rank row__rank--' + opts.rank + '">' + opts.rank + '</span>' : '<span class="row__icon row__icon--' + s.st + '">' + icon(icn) + '</span>') +
      '<div class="row__main"><div class="row__title"><span class="t">' + esc(uName(u)) + '</span></div>' +
      bar(s.p, s.exp, s.st) +
      '<div class="row__sub"><span class="num">' + fmt(s.cum) + ' / ' + fmt(s.kpi) + '</span><span class="num ' + (s.gap >= 0 ? 'good' : 'bad') + '">' + signed(s.gap) + '</span></div></div>' +
      icon('chevRight', 'row__chev') + '</a>'
  }

  function uName(u) { return u.type === 'vp' ? 'VP ' + u.name : u.type === 'media' ? 'TT số · Media' : u.name }

  function unitCard(u, m, opts) {
    opts = opts || {}
    const s = unitStats(u, m)
    const icn = u.type === 'vp' ? 'building' : u.type === 'media' ? 'play' : 'news'
    return '<a class="ucard ucard--' + s.st + '" href="' + href('don-vi/' + u.id) + '" title="' + esc(uName(u)) + '">' +
      '<div class="ucard__head"><span class="row__icon row__icon--' + s.st + '">' + icon(opts.alert ? (s.st === 'good' ? 'clock' : 'alert') : icn) + '</span><div class="ucard__name"><strong>' + esc(uName(u)) + '</strong><span class="tag tag--' + s.st + '">' + statusText[s.st] + '</span></div>' + ring(s.p, s.exp, s.st, 56) + '</div>' +
      bar(s.p, s.exp, s.st, { noPct: true }) +
      '<div class="ucard__nums"><div><small>Lũy kế</small><span class="num">' + fmt(s.cum) + '</span></div><div><small>KPI năm</small><span class="num">' + fmt(s.kpi) + '</span></div><div><small>So với phải đạt</small><span class="num ' + (s.gap >= 0 ? 'good' : 'bad') + '">' + signed(s.gap) + '</span></div></div>' +
      (opts.streak && opts.streak.length ? '<div class="ucard__foot">' + icon('alert', 'ic--sm') + 'Thiếu KPI tháng ' + opts.streak.map(i => months()[i].short).join(', ') + '</div>' : '') +
      '</a>'
  }

  function viewHome() {
    const m = S.m
    const all = groupStats(mainUnits(), m)
    const lm = months()[m]
    const growth = all.prev ? (all.cum / (all.prev * all.exp / 100) - 1) * 100 : null
    const under = mainUnits().filter(u => unitStats(u, m).st !== 'good').length
    const ranked = mainUnits().map(u => ({ u, s: unitStats(u, m) })).sort((x, y) => y.s.p - x.s.p)
    const topPV = D().reporters.filter(r => r.type === 'pv').map(r => [r, repCum(r, m, true).total]).sort((a, b) => b[1] - a[1]).slice(0, 16).map(x => x[0])

    const hero = '<section class="hero span-8">' +
      '<div class="hero__top">' + icon('target', 'ic--sm') + '<span>Tiến độ KPI toàn báo · ' + esc(D().period.label) + '</span></div>' +
      '<div class="hero__main"><div class="hero__ring">' + ring(all.p, all.exp, all.st, 116, { light: true, label: 'hoàn thành' }) + '</div>' +
      '<div class="hero__info"><div class="hero__label">Lũy kế đến hết ' + esc(lm.label) + '</div>' +
      '<div class="hero__value num">' + fmt(all.cum) + ' <small>/ ' + fmt(all.kpi) + '</small></div>' +
      '<div class="hero__pills"><span class="hero__pill hero__pill--' + all.st + '">' + icon(all.gap >= 0 ? 'up' : 'down', 'ic--sm') + signed(all.gap) + '</span><span class="hero__pill">Phải đạt ' + pctTxt(all.exp) + '</span></div></div></div>' +
      '<div class="hero__foot"><span>' + esc(statusText[all.st]) + '</span><span>' + daysUpTo(m) + '/' + totalDays() + ' ngày</span></div></section>'

    const stats = '<div class="stats stats--3 stats--side span-4">' +
      '<div class="card stat"><div class="stat__label">' + icon('eye') + 'Lượt xem ' + esc(lm.label) + '</div><div class="stat__value num">' + fmt(all.month) + '</div>' + bar(pct(all.month, all.kpiM), null, all.month >= all.kpiM ? 'good' : all.month >= all.kpiM * .85 ? 'warn' : 'bad') + '<div class="stat__sub">KPI tháng ' + fmt(all.kpiM) + '</div></div>' +
      '<div class="card stat"><div class="stat__label">' + icon(growth >= 0 ? 'up' : 'down') + 'So với 2025</div><div class="stat__value num ' + (growth >= 0 ? 'good' : 'bad') + '">' + (growth == null ? '—' : (growth >= 0 ? '+' : '') + nf1.format(growth) + '%') + '</div><div class="stat__sub">Quy đổi cùng tiến độ</div></div>' +
      '<a class="card stat" href="' + href('canh-bao') + '" title="Xem cảnh báo"><div class="stat__label">' + icon('alert') + 'Dưới chuẩn</div><div class="stat__value num ' + (under ? 'bad' : 'good') + '">' + under + '<span class="faint" style="font-size:14px;font-weight:600"> / ' + mainUnits().length + '</span></div><div class="stat__sub">đơn vị chậm tiến độ</div></a>' +
      '</div>'

    const rankCard = '<section class="card span-6"><div class="card__head"><div class="card__title">' + icon('trophy') + 'Xếp hạng chuyên mục & văn phòng</div><div class="card__meta">% so với KPI năm</div></div>' +
      unitPodium(ranked.map(x => x.u), m) +
      '<div class="list list--top list--compact">' + ranked.slice(3).map((x, i) => unitRow(x.u, m, { rank: i + 4 })).join('') + '</div></section>'

    const pvCard = '<section class="card span-6"><div class="card__head"><div class="card__title">' + icon('users') + 'Top phóng viên</div><div class="card__meta">lũy kế pageview</div></div>' + repPodium(topPV, m) + '<div class="list list--top list--compact">' +
      topPV.slice(3).map((r, i) => repRow(r, m, i + 4, { showUnit: true })).join('') + '</div><a class="card__more" href="' + href('tong-quan-pv') + '" title="Tất cả phóng viên">Tất cả phóng viên ' + icon('chevRight', 'ic--sm') + '</a></section>'

    const trend = '<section class="card span-12"><div class="card__head"><div class="card__title">' + icon('up') + 'Diễn biến 12 tháng</div><div class="card__meta">Toàn báo</div></div><div class="card__body">' + areaChart(all.monthly, all.kpiM, m, { wide: true }) + '</div></section>'

    const alertList = alerts(m)
    const alertSec = '<section class="span-12"><div class="sec__head"><div class="card__title">' + icon('bell') + 'Cảnh báo</div><span class="tag tag--bad">' + alertList.length + ' đơn vị</span>' + (alertList.length ? '<a class="sec__more" href="' + href('canh-bao') + '" title="Xem tất cả cảnh báo">Xem tất cả ' + icon('chevRight', 'ic--sm') + '</a>' : '') + '</div>' +
      (alertList.length ? '<div class="cards">' + alertList.slice(0, 6).map(a => unitCard(a.u, m, { alert: true, streak: a.streak })).join('') + '</div>' : '<div class="card"><div class="empty">' + icon('check') + '<div>Tất cả đơn vị đang đúng tiến độ</div></div></div>') + '</section>'

    return monthChips() +
      '<div class="head"><h1 class="head__title">Tất cả chuyên mục</h1><div class="head__sub">' + cms().length + ' chuyên mục · ' + vps().length + ' văn phòng · cập nhật ' + esc(dateTxt(D().updatedAt)) + '</div></div>' +
      '<div class="grid grid--dash">' + hero + stats + rankCard + pvCard + trend + alertSec + '</div>'
  }

  function viewRepsHome() {
    const m = S.m
    const days = daysUpTo(m)
    const pvs = D().reporters.filter(r => r.type === 'pv')
    const ctv = D().reporters.length - pvs.length
    const tot = { bai: 0, pvb: 0, video: 0, total: 0 }
    D().reporters.forEach(r => { const c = repCum(r, m, false); tot.bai += c.bai; tot.pvb += c.pvb; tot.video += c.video; tot.total += c.total })
    const rows = pvs.map(r => ({ r, c: repCum(r, m, true), own: repCum(r, m, false) }))
    const byTotal = rows.slice().sort((a, b) => b.c.total - a.c.total).slice(0, 10)
    const byRate = rows.slice().sort((a, b) => b.own.bai - a.own.bai).slice(0, 10)
    const withKpi = rows.filter(x => x.r.kpi)
    const exp = expected(m)
    const kc = { good: 0, warn: 0, bad: 0 }
    withKpi.forEach(x => { kc[status(pct(x.c.total, x.r.kpi), exp)]++ })
    const contrib = mainUnits().map(u => { const c = unitCum(u, m); const p = unitPVCum(u, m); return { u, c, p, share: c ? p / c * 100 : 0 } }).sort((a, b) => b.share - a.share)
    const kpiCard = withKpi.length ? '<section class="card span-4"><div class="card__head"><div class="card__title">' + icon('target') + 'PV có KPI riêng</div><div class="card__meta">' + withKpi.length + ' người</div></div><div class="card__body"><div class="kpimix">' +
      ['good', 'warn', 'bad'].map(k => '<div class="kpimix__item kpimix__item--' + k + '"><span class="num">' + kc[k] + '</span><small>' + statusText[k] + '</small></div>').join('') +
      '</div><div class="kpimix__bar">' + ['good', 'warn', 'bad'].map(k => kc[k] ? '<span class="bar__fill--' + k + '" style="flex:' + kc[k] + '"></span>' : '').join('') + '</div><div class="note" style="margin-top:10px">So với % phải đạt ' + pctTxt(exp) + '. Các đơn vị chưa giao KPI cho từng PV sẽ không tính.</div></div></section>' : ''
    return monthChips() +
      '<div class="head"><h1 class="head__title">Tất cả phóng viên</h1><div class="head__sub">' + pvs.length + ' phóng viên · ' + ctv + ' CTV · lũy kế đến ' + esc(months()[m].label) + '</div></div>' +
      '<div class="grid grid--dash">' +
      '<div class="stats stats--4 span-12">' +
      '<div class="card stat"><div class="stat__label">' + icon('users') + 'Phóng viên</div><div class="stat__value num">' + pvs.length + '</div><div class="stat__sub">+ ' + ctv + ' CTV</div></div>' +
      '<div class="card stat"><div class="stat__label">' + icon('eye') + 'Pageview PV</div><div class="stat__value num">' + fmt(tot.total) + '</div><div class="stat__sub">bài viết ' + fmt(tot.pvb) + ' · video ' + fmt(tot.video) + '</div></div>' +
      '<div class="card stat"><div class="stat__label">' + icon('file') + 'Số bài</div><div class="stat__value num">' + full(tot.bai) + '</div><div class="stat__sub">' + nf1.format(tot.bai / days) + ' bài/ngày toàn báo</div></div>' +
      '<div class="card stat"><div class="stat__label">' + icon('pen') + 'Bài TB/ngày/PV</div><div class="stat__value num">' + nf2.format(pvs.length ? rows.reduce((s, x) => s + x.own.bai, 0) / pvs.length / days : 0) + '</div><div class="stat__sub">' + days + ' ngày đã qua</div></div>' +
      '</div>' +
      '<section class="card span-6"><div class="card__head"><div class="card__title">' + icon('trophy') + 'Top pageview</div><div class="card__meta">gồm nhóm CTV</div></div>' + repPodium(byTotal.map(x => x.r), m) + '<div class="list list--top">' + byTotal.slice(3).map((x, i) => repRow(x.r, m, i + 4, { showUnit: true })).join('') + '</div><a class="card__more" href="' + href('pv') + '" title="Xếp hạng đầy đủ">Xếp hạng đầy đủ ' + icon('chevRight', 'ic--sm') + '</a></section>' +
      '<section class="card span-6"><div class="card__head"><div class="card__title">' + icon('pen') + 'Viết nhiều nhất</div><div class="card__meta">số bài cá nhân</div></div><div class="list" style="margin-top:6px">' + byRate.map((x, i) => repRow(x.r, m, i + 1, { showUnit: true, byBai: true })).join('') + '</div></section>' +
      kpiCard +
      '<section class="card ' + (withKpi.length ? 'span-8' : 'span-12') + '"><div class="card__head"><div class="card__title">' + icon('users') + 'Đóng góp của PV vào lượt xem đơn vị</div></div><div class="list list--2" style="margin-top:6px">' +
      contrib.map(x => '<a class="row" href="' + href('don-vi/' + x.u.id) + '" title="' + esc(uName(x.u)) + '"><div class="row__main"><div class="row__title"><span class="t">' + esc(uName(x.u)) + '</span></div>' + bar(x.share, null, 'primary') + '<div class="row__sub num"><span>' + fmt(x.p) + ' / ' + fmt(x.c) + '</span></div></div></a>').join('') +
      '</div></section></div>'
  }

  function viewAlerts() {
    const m = S.m
    const list = alerts(m)
    return monthChips() +
      '<div class="head"><h1 class="head__title">Cảnh báo</h1><div class="head__sub">' + list.length + ' đơn vị có % lũy kế thấp hơn % phải đạt (' + pctTxt(expected(m)) + ') hoặc thiếu KPI tháng 2 tháng liên tiếp</div></div>' +
      (list.length ? '<div class="cards">' + list.map(a => unitCard(a.u, m, { alert: true, streak: a.streak })).join('') + '</div>' : '<section class="card"><div class="empty">' + icon('check') + '<div>Không có cảnh báo cho ' + esc(months()[m].label) + '</div></div></section>')
  }

  function viewUnitsList(kind) {
    const m = S.m
    const list = kind === 'vp' ? vps() : cms()
    const g = groupStats(list, m)
    const title = kind === 'vp' ? 'Văn phòng' : 'Chuyên mục'
    return monthChips() +
      '<div class="head"><h1 class="head__title">' + title + '</h1><div class="head__sub">' + list.length + ' đơn vị · lũy kế ' + fmt(g.cum) + ' / ' + fmt(g.kpi) + ' · <span class="' + g.st + '">' + pctTxt(g.p) + '</span> (phải đạt ' + pctTxt(g.exp) + ')</div></div>' +
      '<div class="cards">' + list.map(u => unitCard(u, m)).join('') + '</div>'
  }

  function repRow(r, m, rank, opts) {
    opts = opts || {}
    const g = members(r).length
    const c = repCum(r, m, true)
    const days = daysUpTo(m)
    const k = r.kpi ? pct(c.total, r.kpi) : null
    const exp = expected(m)
    const u = unit(r.unit)
    return '<a class="row" href="' + href('pv/' + r.id) + '" title="' + esc(r.name) + '">' +
      (rank ? '<span class="row__rank row__rank--' + rank + '">' + rank + '</span>' : '') +
      '<div class="sidebar__avatar">' + esc(initials(r.name)) + '</div>' +
      '<div class="row__main"><div class="row__title"><span class="t">' + esc(r.name) + '</span>' + (r.type === 'ctv' ? '<span class="tag">CTV</span>' : '') + (g ? '<span class="tag tag--primary">Nhóm · ' + g + '</span>' : '') + '</div>' +
      '<div class="row__sub">' + (opts.showUnit ? '<span>' + esc(u ? uName(u) : '') + '</span>' : '') + '<span class="num">' + full(c.bai) + ' bài</span><span class="num">' + nf1.format(c.bai / days) + ' bài/ngày</span></div>' +
      (k != null ? bar(k, exp, status(k, exp)) : '') + '</div>' +
      (opts.byBai ? '<div class="row__end"><div class="row__value num">' + full(repCum(r, m, false).bai) + '</div><div class="faint" style="font-size:11.5px">bài</div></div></a>' : '<div class="row__end"><div class="row__value num">' + fmt(c.total) + '</div><div class="faint" style="font-size:11.5px">pageview</div></div></a>')
  }

  function viewUnit(id) {
    const u = unit(id)
    if (!u) return notFound()
    const m = S.m
    const s = unitStats(u, m)
    const isMedia = u.type === 'media'
    const unitLabel = isMedia ? 'playtime' : 'lượt xem'
    const reps = D().reporters.filter(r => r.unit === id && r.type === 'pv').sort((x, y) => repCum(y, m, true).total - repCum(x, m, true).total)
    const ctvFree = D().reporters.filter(r => r.unit === id && r.type === 'ctv' && !r.leader)
    const pvCum = isMedia ? 0 : unitPVCum(u, m)
    const share = s.cum ? pvCum / s.cum * 100 : 0
    const typeLabel = u.type === 'vp' ? 'Văn phòng' : isMedia ? 'TT số · Playtime' : 'Chuyên mục'
    const monthsRows = months().map((mo, i) => {
      const v = u.monthly[i]
      if (!v || i > m) return ''
      const d = v - s.kpiM
      return '<tr><td>' + mo.label + '</td><td class="r num">' + full(v) + '</td><td class="r num"><span class="tag tag--' + (d >= 0 ? 'good' : 'bad') + '">' + signed(d) + '</span></td>' + (isMedia ? '' : '<td class="r num muted">' + fmt(unitPVMonth(u, i)) + '</td>') + '</tr>'
    }).join('')
    return monthChips() +
      '<div class="head"><h1 class="head__title">' + esc(uName(u)) + '</h1><div class="head__sub"><span class="tag tag--primary">' + typeLabel + '</span><span class="tag tag--' + s.st + '">' + statusText[s.st] + '</span></div></div>' +
      '<div class="grid grid--dash">' +
      '<section class="card span-5"><div class="card__body" style="display:flex;gap:16px;align-items:center">' + ring(s.p, s.exp, s.st, 112, { label: 'lũy kế' }) +
      '<div style="min-width:0;flex:1"><div class="stat__label">' + icon(isMedia ? 'play' : 'eye') + 'Lũy kế ' + unitLabel + '</div><div class="stat__value num">' + fmt(s.cum) + '</div><div class="stat__sub num">KPI năm ' + fmt(s.kpi) + ' · tháng ' + fmt(s.kpiM) + '</div>' +
      '<div class="pills" style="margin-top:8px"><span class="tag tag--' + s.st + ' num">' + signed(s.gap) + '</span><span class="tag">Phải đạt ' + pctTxt(s.exp) + '</span></div></div></div>' +
      '<div class="stats" style="padding:0 16px 16px;grid-template-columns:1fr 1fr">' +
      '<div><div class="stat__label">' + icon('calendar') + 'Năm trước</div><div class="row__value num">' + fmt(u.prev) + '</div></div>' +
      (isMedia ? '<div><div class="stat__label">' + icon('clock') + 'Đơn vị</div><div class="row__value">Playtime</div></div>' : '<div><div class="stat__label">' + icon('users') + 'Đóng góp PV</div><div class="row__value num">' + pctTxt(share) + ' <span class="faint" style="font-size:12px">' + fmt(pvCum) + '</span></div></div>') +
      '</div></section>' +
      '<section class="card span-7"><div class="card__head"><div class="card__title">' + icon('up') + 'Theo tháng</div><div class="card__meta">màu theo KPI tháng</div></div><div class="card__body">' + columnChart(u.monthly, s.kpiM, m, { unitLabel }) + '</div></section>' +
      (isMedia ? '' : '<section class="card span-7"><div class="card__head"><div class="card__title">' + icon('users') + 'Phóng viên</div><div class="card__meta">' + reps.length + ' PV' + (ctvFree.length ? ' · ' + ctvFree.length + ' CTV' : '') + '</div></div><div class="list" style="margin-top:6px">' +
        (reps.length ? reps.map((r, i) => repRow(r, m, i + 1)).join('') : '<div class="empty">Chưa có phóng viên</div>') +
        ctvFree.map(r => repRow(r, m)).join('') + '</div></section>') +
      '<section class="card ' + (isMedia ? 'span-12' : 'span-5') + '"><div class="card__head"><div class="card__title">' + icon('calendar') + 'Chi tiết tháng</div></div><div class="table-wrap" style="margin-top:10px"><table class="table"><thead><tr><th>Tháng</th><th class="r">' + (isMedia ? 'Playtime' : 'Lượt xem') + '</th><th class="r">Dư/thiếu</th>' + (isMedia ? '' : '<th class="r">PV đóng góp</th>') + '</tr></thead><tbody>' + (monthsRows || '<tr><td colspan="4" class="empty">Chưa có dữ liệu</td></tr>') + '</tbody></table></div></section>' +
      '</div>'
  }

  function viewReps() {
    const units = mainUnits()
    return monthChips() +
      '<div class="head"><h1 class="head__title">Phóng viên</h1><div class="head__sub">Xếp hạng theo lũy kế đến ' + esc(months()[S.m].label) + ' · PV có nhóm CTV tính cả nhóm</div></div>' +
      '<section class="card"><div class="toolbar">' +
      '<label class="search">' + icon('search') + '<input class="input" type="search" placeholder="Tìm phóng viên…" value="' + esc(S.pv.q) + '" data-in="pv-q"></label>' +
      '<select class="select" data-in="pv-unit"><option value="">Tất cả đơn vị</option>' + units.map(u => '<option value="' + u.id + '"' + (S.pv.unit === u.id ? ' selected' : '') + '>' + esc(u.type === 'vp' ? 'VP ' + u.name : u.name) + '</option>').join('') + '</select>' +
      '<select class="select" data-in="pv-sort"><option value="total"' + (S.pv.sort === 'total' ? ' selected' : '') + '>Tổng pageview</option><option value="bai"' + (S.pv.sort === 'bai' ? ' selected' : '') + '>Số bài</option><option value="rate"' + (S.pv.sort === 'rate' ? ' selected' : '') + '>Bài/ngày</option><option value="kpi"' + (S.pv.sort === 'kpi' ? ' selected' : '') + '>% KPI</option></select>' +
      '<label class="check"><input type="checkbox" data-in="pv-ctv"' + (S.pv.ctv ? ' checked' : '') + '>Gồm CTV</label>' +
      '</div><div class="list" id="pvList">' + repsList() + '</div></section>'
  }

  function repsList() {
    const m = S.m
    const q = KpiParser.normName(S.pv.q)
    let list = D().reporters.filter(r => (S.pv.ctv || r.type === 'pv') && (!S.pv.unit || r.unit === S.pv.unit) && (!q || KpiParser.normName(r.name).includes(q)))
    const key = r => {
      const c = repCum(r, m, true)
      if (S.pv.sort === 'bai') return c.bai
      if (S.pv.sort === 'rate') return c.bai / daysUpTo(m)
      if (S.pv.sort === 'kpi') return r.kpi ? c.total / r.kpi : -1
      return c.total
    }
    list = list.map(r => [r, key(r)]).sort((a, b) => b[1] - a[1]).map(x => x[0])
    if (!list.length) return '<div class="empty">' + icon('search') + '<div>Không tìm thấy phóng viên</div></div>'
    return list.slice(0, 300).map((r, i) => repRow(r, m, i + 1, { showUnit: true })).join('')
  }

  function viewRep(id) {
    const r = rep(id)
    if (!r) return notFound()
    const m = S.m
    const u = unit(r.unit)
    const mem = members(r)
    const leader = r.leader ? rep(r.leader) : null
    const own = repCum(r, m, false)
    const grp = repCum(r, m, true)
    const days = daysUpTo(m)
    const peers = D().reporters.filter(x => x.unit === r.unit && x.type === 'pv')
    const avgRate = peers.length ? peers.reduce((s, x) => s + repCum(x, m, false).bai, 0) / peers.length / days : 0
    const rate = own.bai / days
    const exp = expected(m)
    const kp = r.kpi ? pct(grp.total, r.kpi) : null
    const kst = kp != null ? status(kp, exp) : null
    const totals = months().map((_, i) => repMonthTotal(r, i, true))
    const monthRows = months().map((mo, i) => {
      if (i > m) return ''
      const v = rm(r, i)
      if (!r.monthly[i]) return ''
      return '<tr><td>' + mo.label + '</td><td class="r num">' + full(v.bai) + '</td><td class="r num">' + full(v.pvb) + '</td><td class="r num">' + full(v.video) + '</td><td class="r num"><strong>' + full(v.total) + '</strong></td>' + (r.kpi ? '<td class="r num"><span class="tag tag--' + (v.total - r.kpi / 12 >= 0 ? 'good' : 'bad') + '">' + signed(repMonthTotal(r, i, true) - r.kpi / 12) + '</span></td>' : '') + '</tr>'
    }).join('')
    return monthChips() +
      '<div class="head head__row"><div class="head__avatar">' + esc(initials(r.name)) + '</div><div style="min-width:0"><h1 class="head__title">' + esc(r.name) + '</h1><div class="head__sub">' + link('don-vi/' + u.id, u.name, esc(u.type === 'vp' ? 'VP ' + u.name : u.name)) +
      '<span class="tag ' + (r.type === 'pv' ? 'tag--primary' : '') + '">' + (r.type === 'pv' ? 'Phóng viên' : 'CTV') + '</span>' +
      (leader ? '<span>Nhóm của ' + link('pv/' + leader.id, leader.name, esc(leader.name)) + '</span>' : '') +
      ((r.codes || []).length ? '<span class="faint">' + esc(r.codes.join(', ')) + '</span>' : '') + '</div></div></div>' +
      '<div class="grid grid--dash">' +
      '<div class="stats stats--4 span-12">' +
      '<div class="card stat"><div class="stat__label">' + icon('eye') + (mem.length ? 'Tổng PV nhóm' : 'Tổng pageview') + '</div><div class="stat__value num">' + fmt(grp.total) + '</div><div class="stat__sub">lũy kế ' + (m + 1) + ' tháng</div></div>' +
      '<div class="card stat"><div class="stat__label">' + icon('file') + 'Số bài</div><div class="stat__value num">' + full(own.bai) + '</div><div class="stat__sub">' + (mem.length ? 'cả nhóm ' + full(grp.bai) : 'bài đã xuất bản') + '</div></div>' +
      '<div class="card stat"><div class="stat__label">' + icon('pen') + 'Bài TB/ngày</div><div class="stat__value num ' + (rate >= avgRate ? 'good' : 'bad') + '">' + nf2.format(rate) + '</div><div class="stat__sub">TB đơn vị ' + nf2.format(avgRate) + ' · ' + days + ' ngày</div></div>' +
      '<div class="card stat"><div class="stat__label">' + icon('video') + 'Video plays</div><div class="stat__value num">' + fmt(own.video) + '</div><div class="stat__sub">PV bài viết ' + fmt(own.pvb) + '</div></div>' +
      '</div>' +
      (r.kpi ? '<section class="card span-12"><div class="card__body" style="display:flex;gap:16px;align-items:center">' + ring(kp, exp, kst, 96, { label: 'KPI' }) + '<div style="flex:1;min-width:0"><div class="stat__label">' + icon('target') + 'KPI năm ' + fmt(r.kpi) + '</div>' + bar(kp, exp, kst, { lg: true }) + '<div class="row__sub num"><span>Phải đạt ' + fmt(r.kpi * exp / 100) + '</span><span class="' + (grp.total - r.kpi * exp / 100 >= 0 ? 'good' : 'bad') + '">' + signed(grp.total - r.kpi * exp / 100) + '</span></div></div></div></section>' : '') +
      '<section class="card span-7"><div class="card__head"><div class="card__title">' + icon('up') + 'Pageview theo tháng</div></div><div class="card__body">' + columnChart(totals, r.kpi ? r.kpi / 12 : 0, m, { mono: !r.kpi, unitLabel: 'pageview' }) + '</div></section>' +
      '<section class="card span-5"><div class="card__head"><div class="card__title">' + icon('calendar') + 'Chi tiết tháng</div></div><div class="table-wrap" style="margin-top:10px"><table class="table"><thead><tr><th>Tháng</th><th class="r">Bài</th><th class="r">PV bài</th><th class="r">Video</th><th class="r">Tổng</th>' + (r.kpi ? '<th class="r">Dư/thiếu</th>' : '') + '</tr></thead><tbody>' + (monthRows || '<tr><td colspan="6" class="empty">Chưa có dữ liệu</td></tr>') + '</tbody></table></div></section>' +
      (mem.length ? '<section class="card span-12"><div class="card__head"><div class="card__title">' + icon('users') + 'Nhóm CTV</div><div class="card__meta">' + mem.length + ' người · tổng nhóm ' + fmt(grp.total) + '</div></div><div class="list" style="margin-top:6px">' + mem.slice().sort((a, b) => repCum(b, m).total - repCum(a, m).total).map(x => repRow(x, m)).join('') + '</div></section>' : '') +
      '</div>'
  }

  function notFound() { return '<div class="empty">' + icon('alert') + '<div>Không tìm thấy trang</div><div style="margin-top:12px">' + link('', 'Về tổng quan', 'Về tổng quan', 'btn') + '</div></div>' }

  function viewEmpty() {
    const y = S.year
    const p = D().period
    return '<div class="head"><h1 class="head__title">KPI ' + y + '</h1><div class="head__sub">' + p.months[0].label + ' – ' + p.months[11].label + ' · <span class="tag ' + (y === currentYear() ? 'tag--primary' : '') + '">' + periodState(y) + '</span></div></div>' +
      '<section class="card"><div class="empty empty--big">' + icon('calendar') + '<div class="empty__title">Kỳ KPI ' + y + ' chưa có dữ liệu</div><div class="note">Cần file KPI_' + y + '.xlsx (KPI năm của từng chuyên mục, văn phòng và danh sách PV) để bắt đầu. Kỳ này lấy cột video <strong>' + esc(p.videoField) + '</strong>.</div>' +
      '<div class="pills" style="justify-content:center;margin-top:16px">' + (isAdmin() ? link('admin', 'Nhập file KPI', icon('upload', 'ic--sm') + 'Nhập file KPI ' + y, 'btn btn--primary') : '') +
      (S.available.length ? '<button class="btn" data-act="period-set" data-y="' + Math.max(...S.available) + '">Xem KPI ' + Math.max(...S.available) + '</button>' : '') + '</div></div></section>'
  }

  function ghCfg() {
    try { return Object.assign({ repo: 'thieny298/demokpi', branch: 'main' }, JSON.parse(localStorage.getItem(GH_KEY) || '{}'), { path: 'data/data.js' }) } catch (e) { return { repo: 'thieny298/demokpi', branch: 'main', path: 'data/data.js' } }
  }
  function ghToken() { try { return sessionStorage.getItem(GH_TOKEN_KEY) || '' } catch (e) { return '' } }

  function dropZone(key, title, sub, ic, optional) {
    const f = S.adm.files[key]
    const p = S.adm.parsed[key]
    return '<label class="drop' + (f ? ' is-done' : '') + '" data-drop="' + key + '"><input type="file" accept=".xlsx" data-file="' + key + '"><span class="drop__icon">' + icon(f ? 'check' : ic) + '</span><span style="min-width:0"><span class="drop__title" style="display:block">' + esc(title) + '</span><span class="drop__sub" style="display:block">' + (f ? esc(f.name) + (p ? ' · ' + full(p.length) + ' dòng' : '') : esc(sub)) + '</span></span>' + (optional ? '<span class="drop__opt">Tuỳ chọn</span>' : '') + '</label>'
  }

  function viewAdmin() {
    const a = S.adm
    if (a.month == null) a.month = Math.min(11, lastDataMonth())
    a.year = a.yearTouched ? a.year : S.year
    const vf = D().period.videoField
    const cfg = ghCfg()
    const tok = ghToken()
    const report = a.report
    let preview = ''
    if (report) {
      const rows = report.rows
      const changed = rows.filter(r => (a.bai && r.newBai != null && r.newBai !== r.oldBai) || (a.video && r.newVideo != null && r.newVideo !== r.oldVideo))
      const missing = rows.filter(r => (a.bai && S.adm.parsed.sl && r.newBai == null) || (a.video && S.adm.parsed.vid && r.newVideo == null))
      const view = a.tab === 'changed' ? changed : a.tab === 'missing' ? missing : rows
      const cell = (o, n, has) => {
        if (!has) return '<td class="r faint">—</td>'
        if (n == null) return '<td class="r num"><span class="' + (o ? 'bad' : 'faint') + '">' + full(o) + ' → ' + (a.keepOld ? 'giữ' : '0') + '</span></td>'
        return '<td class="r num">' + (n !== o ? '<span class="faint">' + full(o) + '</span> → <strong>' + full(n) + '</strong>' : full(n)) + '</td>'
      }
      preview = '<section class="card"><div class="card__head"><span class="step__num">3</span><div class="card__title">Xem trước · ' + esc(months()[report.month].label) + '</div></div><div class="card__body">' +
        '<div class="pills" style="margin-bottom:12px">' +
        (S.adm.parsed.sl ? '<span class="tag tag--good">' + icon('check', 'ic--sm') + 'Khớp số bài ' + report.counts.bai + '/' + rows.length + '</span>' : '') +
        (S.adm.parsed.vid ? '<span class="tag tag--good">' + icon('check', 'ic--sm') + 'Khớp video ' + report.counts.video + '/' + rows.length + '</span>' : '') +
        '<span class="tag tag--primary">' + changed.length + ' thay đổi</span>' + (missing.length ? '<span class="tag tag--warn">' + missing.length + ' không tìm thấy</span>' : '') + '</div>' +
        '<div class="pills" style="margin-bottom:12px;align-items:center"><div class="seg">' +
        [['changed', 'Thay đổi'], ['missing', 'Không tìm thấy'], ['all', 'Tất cả']].map(t => '<button class="seg__btn' + (a.tab === t[0] ? ' is-active' : '') + '" data-act="adm-tab" data-tab="' + t[0] + '">' + t[1] + '</button>').join('') + '</div>' +
        '<label class="check"><input type="checkbox" data-in="adm-keep"' + (a.keepOld ? ' checked' : '') + '>Giữ số cũ nếu không tìm thấy</label></div>' +
        '<div class="table-wrap" style="max-height:420px;overflow:auto;border:1px solid var(--line);border-radius:10px"><table class="table"><thead><tr><th>Phóng viên</th><th>Đơn vị</th><th class="r">Số bài</th><th class="r">Video</th></tr></thead><tbody>' +
        (view.length ? view.map(r => '<tr><td>' + esc(r.name) + (r.type === 'ctv' ? ' <span class="tag">CTV</span>' : '') + (r.baiSrc > 1 ? ' <span class="tag tag--primary" title="Cộng ' + r.baiSrc + ' tài khoản">' + r.baiSrc + ' TK</span>' : '') + '</td><td class="muted">' + esc(unit(r.unit).name) + '</td>' + cell(r.oldBai, r.newBai, a.bai && S.adm.parsed.sl) + cell(r.oldVideo, r.newVideo, a.video && S.adm.parsed.vid) + '</tr>').join('') : '<tr><td colspan="4" class="empty">Không có dòng nào</td></tr>') +
        '</tbody></table></div>' +
        ((report.unmatchedSL.length || report.unmatchedVideo.length) ? '<details style="margin-top:12px"><summary class="note" style="cursor:pointer">Tên trong file chưa gán cho ai (gợi ý thêm vào "Tên khác" ở Danh sách PV)</summary><div class="fields fields--2" style="margin-top:10px">' +
          (report.unmatchedSL.length ? '<div class="note note--box"><strong>Sản lượng</strong><br>' + report.unmatchedSL.slice(0, 20).map(x => esc(x.name) + (x.code ? ' (' + esc(x.code) + ')' : '') + ' · ' + full(x.value)).join('<br>') + '</div>' : '') +
          (report.unmatchedVideo.length ? '<div class="note note--box"><strong>Video</strong><br>' + report.unmatchedVideo.slice(0, 20).map(x => esc(x.name) + ' · ' + full(x.value)).join('<br>') + '</div>' : '') +
          '</div></details>' : '') +
        '<div style="display:flex;gap:8px;margin-top:14px;flex-wrap:wrap"><button class="btn btn--primary" data-act="adm-apply">' + icon('check', 'ic--sm') + 'Áp dụng vào bản nháp</button><button class="btn" data-act="adm-reset">Chọn lại file</button></div>' +
        '</div></section>'
    }
    const master = a.master
    const masterCard = '<section class="card"><div class="card__head"><div class="card__title">' + icon('sheet') + 'Nhập lại từ file KPI tổng</div><div class="card__meta">Thay toàn bộ số liệu</div></div><div class="card__body"><div class="fields">' +
      '<div class="note">Dùng khi có file KPI_' + a.year + '.xlsx mới (lượt xem chuyên mục, PV bài viết, KPI…). Mã nhân sự và tên khác đã gán sẽ được giữ lại.</div>' +
      '<div class="fields fields--2"><label class="field"><span class="field__label">Năm KPI</span><input class="input" type="number" min="2025" max="2100" value="' + a.year + '" data-in="adm-year"></label><div></div></div>' +
      dropZone('master', 'File KPI tổng', 'KPI_' + a.year + '.xlsx', 'sheet') +
      (master ? '<div class="note note--box">' + icon('check', 'ic--sm') + ' Đọc được ' + master.units.length + ' đơn vị · ' + master.reporters.length + ' PV/CTV · ' + master.months.length + ' tháng có số liệu (' + esc(master.months.join(', ')) + ')' + (master.warnings.length ? '<br><span class="warn">' + master.warnings.map(esc).join('<br>') + '</span>' : '') + '</div><button class="btn btn--primary" data-act="adm-master-apply">' + icon('refresh', 'ic--sm') + 'Thay dữ liệu bằng file này</button>' : '') +
      '</div></div></section>'

    const saveCard = '<section class="card"><div class="card__head"><span class="step__num">4</span><div class="card__title">Lưu dữ liệu</div><div class="card__meta">' + (S.dirty ? '<span class="warn">Có thay đổi chưa lưu</span>' : 'Đã đồng bộ') + '</div></div><div class="card__body"><div class="fields">' +
      '<div class="note">Dashboard đọc file <code>data/data.js</code> trong repo. Lưu lên GitHub để mọi người thấy số mới (GitHub Pages cập nhật sau khoảng 1 phút).</div>' +
      '<div class="fields fields--2"><label class="field"><span class="field__label">Repo</span><input class="input" value="' + esc(cfg.repo) + '" data-gh="repo"></label><label class="field"><span class="field__label">Nhánh</span><input class="input" value="' + esc(cfg.branch) + '" data-gh="branch"></label></div>' +
      '<label class="field"><span class="field__label">GitHub token (fine-grained, quyền Contents: Read & write) · chỉ lưu trong phiên này</span><input class="input" type="password" autocomplete="off" placeholder="github_pat_…" value="' + esc(tok) + '" data-gh="token"></label>' +
      '<div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn btn--primary" data-act="gh-save"' + (a.busy ? ' disabled' : '') + '>' + icon('github', 'ic--sm') + (a.busy ? 'Đang lưu…' : 'Lưu lên GitHub') + '</button><button class="btn" data-act="download">' + icon('download', 'ic--sm') + 'Tải data.js</button>' + (S.dirty ? '<button class="btn btn--ghost" data-act="draft-discard">' + icon('trash', 'ic--sm') + 'Huỷ nháp</button>' : '') + '</div>' +
      '<div class="note faint">Lịch sử: ' + (D().log || []).slice(-4).reverse().map(l => esc(dateTxt(l.at) + ' · ' + l.action)).join(' — ') + '</div>' +
      '</div></div></section>'

    return '<div class="head"><h1 class="head__title">Nhập liệu</h1><div class="head__sub">Bỏ file xuất từ IMS để cập nhật số bài và video của tháng</div></div>' +
      '<div class="grid grid--dash">' +
      '<div class="grid span-7" style="align-content:start">' +
      '<section class="card"><div class="card__head"><span class="step__num">1</span><div class="card__title">Chọn tháng</div></div><div class="card__body"><select class="select" style="width:100%" data-in="adm-month">' + months().map((mo, i) => '<option value="' + i + '"' + (i === a.month ? ' selected' : '') + '>' + mo.label + (dataMonths().includes(i) ? '' : ' · chưa có số') + '</option>').join('') + '</select></div></section>' +
      '<section class="card"><div class="card__head"><span class="step__num">2</span><div class="card__title">Chọn file</div></div><div class="card__body"><div class="fields">' +
      dropZone('sl', 'Sản lượng theo tài khoản', 'SanLuongTheoTaiKhoan…xlsx · lấy cột "Số bài"', 'file') +
      dropZone('vid', 'Video theo tác giả', 'author_video_T…xlsx · lấy cột "' + vf + '"', 'video') +
      '<div class="note note--box">Khớp theo <strong>Mã nhân sự</strong> trước (cộng mọi tài khoản cùng mã), không có mã thì khớp theo <strong>tên đầy đủ</strong>. Mã dùng chung như PV1000 được bỏ qua. ' + esc(D().period.label) + ' lấy cột <strong>' + vf + '</strong>.</div>' +
      '<div style="display:flex;gap:16px;flex-wrap:wrap"><label class="check"><input type="checkbox" data-in="adm-bai"' + (a.bai ? ' checked' : '') + '>Cập nhật số bài</label><label class="check"><input type="checkbox" data-in="adm-video"' + (a.video ? ' checked' : '') + '>Cập nhật video</label></div>' +
      '<button class="btn btn--primary btn--block" data-act="adm-analyze"' + (!(S.adm.parsed.sl || S.adm.parsed.vid) ? ' disabled' : '') + '>' + icon('search', 'ic--sm') + 'Phân tích</button>' +
      '</div></div></section>' + preview + '</div>' +
      '<div class="grid span-5" style="align-content:start">' + saveCard + masterCard + '</div>' +
      '</div>'
  }

  function viewRoles() {
    const rows = [
      ['Tổng quan toàn báo', [1, 1, 0, 0]],
      ['Chuyên mục / VP của mình', [1, 1, 1, 0]],
      ['Chuyên mục / VP khác', [1, 1, 0, 0]],
      ['Danh sách & hồ sơ PV trong đơn vị', [1, 1, 1, 0]],
      ['Hồ sơ của chính mình', [1, 1, 1, 1]],
      ['Nhập liệu, lưu dữ liệu', [1, 0, 0, 0]],
      ['Thiết lập KPI, phân quyền', [1, 0, 0, 0]]
    ]
    return '<div class="head"><h1 class="head__title">Phân quyền</h1><div class="head__sub">Theo đặc tả: Admin (Phòng Công nghệ), Lãnh đạo, Trưởng chuyên mục/VP, Phóng viên</div></div>' +
      '<div class="cards cards--4" style="margin-bottom:16px">' + ROLES.map(x => '<div class="card rolecard" style="--rc:' + x.color + ';--rb:' + x.bg + '"><span class="avatar">' + esc(initials(x.name)) + '<span class="avatar__dot"></span></span><div><strong>' + esc(x.name) + '</strong><div class="note">' + esc(x.scope) + '</div></div></div>').join('') + '</div>' +
      '<section class="card"><div class="table-wrap"><table class="table"><thead><tr><th>Quyền</th>' + ROLES.map(x => '<th class="r"><span class="role-tag" style="--rc:' + x.color + ';--rb:' + x.bg + '">' + esc(x.name) + '</span></th>').join('') + '</tr></thead><tbody>' +
      rows.map(r => '<tr><td>' + esc(r[0]) + '</td>' + r[1].map((v, i) => '<td class="r">' + (v ? '<span style="color:' + ROLES[i].color + '">' + icon('check', 'ic--sm') + '</span>' : '<span class="faint">—</span>') + '</td>').join('') + '</tr>').join('') +
      '</tbody></table></div><div class="card__body note">Hiện là chế độ xem thử (đổi vai trò ở góc dưới thanh bên). Đăng nhập SSO và giới hạn dữ liệu theo quyền sẽ làm ở giai đoạn 2.</div></section>'
  }

  function viewAdminReps() {
    const f = S.apv
    return '<div class="head"><h1 class="head__title">Danh sách PV</h1><div class="head__sub">Gán mã nhân sự và tên khác (bút danh, tên trên hệ thống video) để khớp file chính xác</div></div>' +
      '<section class="card"><div class="toolbar">' +
      '<label class="search">' + icon('search') + '<input class="input" type="search" placeholder="Tìm…" value="' + esc(f.q) + '" data-in="apv-q"></label>' +
      '<select class="select" data-in="apv-unit"><option value="">Tất cả đơn vị</option>' + mainUnits().map(u => '<option value="' + u.id + '"' + (f.unit === u.id ? ' selected' : '') + '>' + esc(u.name) + '</option>').join('') + '</select>' +
      '<label class="check"><input type="checkbox" data-in="apv-missing"' + (f.missing ? ' checked' : '') + '>Chưa có mã</label></div>' +
      '<div class="table-wrap" id="apvList">' + adminRepsTable() + '</div></section>'
  }

  function adminRepsTable() {
    const f = S.apv
    const q = KpiParser.normName(f.q)
    const list = D().reporters.filter(r => (!f.unit || r.unit === f.unit) && (!f.missing || !(r.codes || []).length) && (!q || KpiParser.normName(r.name).includes(q)))
    return '<table class="table"><thead><tr><th>Họ tên</th><th>Đơn vị</th><th>Loại</th><th>Mã nhân sự</th><th>Tên khác</th></tr></thead><tbody>' +
      list.map(r => '<tr><td>' + link('pv/' + r.id, r.name, esc(r.name)) + '</td><td class="muted">' + esc(unit(r.unit).name) + '</td><td>' + (r.type === 'pv' ? '<span class="tag tag--primary">PV</span>' : '<span class="tag">CTV</span>') + (r.leader ? ' <span class="faint">· ' + esc(rep(r.leader).name) + '</span>' : '') + '</td>' +
        '<td><input class="input" data-rep="' + r.id + '" data-field="codes" value="' + esc((r.codes || []).join(', ')) + '" placeholder="PV1234"></td>' +
        '<td class="wrap"><input class="input" style="width:100%" data-rep="' + r.id + '" data-field="aliases" value="' + esc((r.aliases || []).join(', ')) + '" placeholder="Bút danh, tên video…"></td></tr>').join('') +
      (list.length ? '' : '<tr><td colspan="5" class="empty">Không có dòng nào</td></tr>') + '</tbody></table>'
  }

  function render(scrollTop) {
    S.route = parseRoute()
    chartSeq = 0
    for (const k in CHARTS) delete CHARTS[k]
    const r = S.route
    const views = { home: viewHome, repsHome: viewRepsHome, alerts: viewAlerts, cms: () => viewUnitsList('cm'), vps: () => viewUnitsList('vp'), unit: () => viewUnit(r.id), reps: viewReps, rep: () => viewRep(r.id), admin: viewAdmin, adminReps: viewAdminReps, roles: viewRoles }
    const adminOnly = ['admin', 'adminReps', 'roles']
    $('#page').innerHTML = !hasData() && !adminOnly.includes(r.name) ? viewEmpty() : adminOnly.includes(r.name) && !isAdmin() ? '<div class="empty">' + icon('shield') + '<div>Vai trò ' + esc(role().name) + ' không có quyền vào trang này</div></div>' : (views[r.name] || viewHome)()
    renderTopbar()
    renderSidebar()
    renderBottom()
    renderDraft()
    $('#app').classList.toggle('is-collapsed', !!S.ui.collapsed)
    const chip = document.querySelector('.chip.is-active')
    if (chip) chip.scrollIntoView({ block: 'nearest', inline: 'center' })
    if (scrollTop) window.scrollTo(0, 0)
  }

  function toast(msg, bad) {
    const t = $('#toast')
    t.textContent = msg
    t.className = 'toast is-on' + (bad ? ' toast--bad' : '')
    clearTimeout(toast.tm)
    toast.tm = setTimeout(() => { t.className = 'toast' + (bad ? ' toast--bad' : '') }, 3200)
  }

  function setDirty(on) {
    S.dirty = on
    const key = DRAFT_PREFIX + S.data.period.id
    try {
      if (on) localStorage.setItem(key, JSON.stringify({ baseUpdatedAt: S.base ? S.base.updatedAt : null, data: S.data }))
      else localStorage.removeItem(key)
    } catch (e) { toast('Không lưu được bản nháp trên trình duyệt', true) }
  }

  async function readXlsx(file) {
    const buf = await file.arrayBuffer()
    return XlsxLite.read(buf)
  }

  async function handleFile(key, file) {
    if (!file) return
    if (!/\.xlsx$/i.test(file.name)) { toast('Chỉ hỗ trợ file .xlsx', true); return }
    S.adm.files[key] = file
    S.adm.report = null
    try {
      const wb = await readXlsx(file)
      if (key === 'sl') S.adm.parsed.sl = await KpiParser.parseSanLuong(wb)
      else if (key === 'vid') S.adm.parsed.vid = await KpiParser.parseVideo(wb, D().period.videoField)
      else if (key === 'master') {
        const data = await KpiParser.parseMaster(wb, Number(S.adm.year) || D().period.id, S.data)
        const ms = data.period.months.filter((_, i) => data.units.some(u => u.type !== 'media' && (u.monthly[i] || 0) > 0)).map(m => m.short)
        S.adm.master = { data, units: data.units, reporters: data.reporters, months: ms, warnings: data.warnings || [] }
        S.adm.parsed.master = data.reporters
      }
      toast('Đã đọc ' + file.name)
    } catch (e) {
      delete S.adm.files[key]
      delete S.adm.parsed[key]
      toast(e.message || 'Không đọc được file', true)
    }
    render()
  }

  function analyze() {
    const a = S.adm
    a.report = KpiParser.matchMonthly(S.data, Number(a.month), a.bai ? a.parsed.sl : null, a.video ? a.parsed.vid : null)
    a.tab = 'changed'
    render()
  }

  function applyReport() {
    const a = S.adm
    const rep = a.report
    if (!rep) return
    if (a.keepOld) rep.rows.forEach(r => { if (r.newBai == null) r.newBai = r.oldBai; if (r.newVideo == null) r.newVideo = r.oldVideo })
    KpiParser.applyMonthly(S.data, rep, { bai: a.bai && !!a.parsed.sl, video: a.video && !!a.parsed.vid })
    setDirty(true)
    a.report = null
    a.files = {}
    a.parsed = {}
    toast('Đã cập nhật ' + months()[rep.month].label + ' vào bản nháp')
    render()
  }

  function applyMaster() {
    const mst = S.adm.master
    if (!mst) return
    const d = mst.data
    delete d.warnings
    if (d.period.id !== S.year) {
      S.year = d.period.id
      S.ui.year = S.year
      saveUI()
      S.base = S.cache[S.year] ? JSON.parse(JSON.stringify(S.cache[S.year])) : null
    }
    S.data = d
    S.m = lastDataMonth()
    S.adm.master = null
    delete S.adm.files.master
    delete S.adm.parsed.master
    setDirty(true)
    toast('Đã thay dữ liệu bằng file KPI tổng')
    render()
  }

  function jsonText() { return JSON.stringify(S.data) }
  function jsText() { return 'window.KPI_DATA = ' + jsonText() + ';\n' }
  function fileName(y) { return 'kpi-' + y + '.js' }
  function periodsText(list) { return 'window.KPI_PERIODS = ' + JSON.stringify({ available: list.slice().sort((a, b) => b - a) }) + ';\n' }
  function saveBlob(text, name) {
    const blob = new Blob([text], { type: 'text/javascript' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = name
    a.title = name
    document.body.appendChild(a)
    a.click()
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove() }, 500)
  }

  function download() {
    const y = S.data.period.id
    saveBlob(jsText(), fileName(y))
    if (!S.available.includes(y)) setTimeout(() => saveBlob(periodsText(S.available.concat([y])), 'periods.js'), 400)
  }

  function b64(str) {
    const bytes = new TextEncoder().encode(str)
    let bin = ''
    for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000))
    return btoa(bin)
  }

  async function ghPut(cfg, token, path, text, msg) {
    const api = 'https://api.github.com/repos/' + cfg.repo + '/contents/' + path
    const headers = { Authorization: 'Bearer ' + token, Accept: 'application/vnd.github+json' }
    const cur = await fetch(api + '?ref=' + encodeURIComponent(cfg.branch), { headers })
    let sha
    if (cur.ok) sha = (await cur.json()).sha
    else if (cur.status !== 404) throw new Error('GitHub từ chối (' + cur.status + '). Kiểm tra token và quyền repo.')
    const body = { message: msg, content: b64(text), branch: cfg.branch }
    if (sha) body.sha = sha
    const res = await fetch(api, { method: 'PUT', headers, body: JSON.stringify(body) })
    if (!res.ok) throw new Error('Lưu ' + path + ' thất bại (' + res.status + ')')
  }

  async function ghSave() {
    const cfg = ghCfg()
    const token = ghToken()
    if (!token) { toast('Nhập GitHub token trước', true); return }
    const y = S.data.period.id
    S.adm.busy = true
    render()
    try {
      await ghPut(cfg, token, DATA_DIR + fileName(y), jsText(), 'Cập nhật dữ liệu KPI ' + y + ' · ' + dateTxt(new Date().toISOString()))
      if (!S.available.includes(y)) {
        const list = S.available.concat([y])
        await ghPut(cfg, token, DATA_DIR + 'periods.js', periodsText(list), 'Thêm kỳ KPI ' + y)
        S.available = list
      }
      S.base = JSON.parse(jsonText())
      S.cache[y] = JSON.parse(jsonText())
      setDirty(false)
      toast('Đã lưu KPI ' + y + ' lên GitHub. Trang sẽ cập nhật sau khoảng 1 phút.')
    } catch (e) {
      toast(e.message || 'Lỗi khi lưu', true)
    }
    S.adm.busy = false
    render()
  }

  function discardDraft() {
    if (!confirmInline()) return
    S.data = S.base ? JSON.parse(JSON.stringify(S.base)) : KpiParser.makeSkeleton(S.year)
    setDirty(false)
    S.m = lastDataMonth()
    toast('Đã huỷ bản nháp')
    render()
  }
  let confirmAt = 0
  function confirmInline() {
    const now = Date.now()
    if (now - confirmAt < 3000) { confirmAt = 0; return true }
    confirmAt = now
    toast('Bấm lần nữa để huỷ bản nháp')
    return false
  }

  document.addEventListener('click', e => {
    const t = e.target.closest('[data-act]')
    if (!t) {
      if (e.target.closest('.sidebar a, .bottomnav a')) $('#app').classList.remove('is-drawer')
      if (S.ui.rolePop && !e.target.closest('.rolepop')) { S.ui.rolePop = false; renderSidebar() }
      if (S.ui.periodPop && !e.target.closest('.period')) { S.ui.periodPop = false; renderTopbar() }
      return
    }
    const act = t.dataset.act
    if (act === 'drawer-open') $('#app').classList.add('is-drawer')
    else if (act === 'drawer-close') $('#app').classList.remove('is-drawer')
    else if (act === 'collapse') { S.ui.collapsed = !S.ui.collapsed; S.ui.rolePop = false; saveUI(); $('#app').classList.toggle('is-collapsed', S.ui.collapsed); renderSidebar() }
    else if (act === 'period-pop') { S.ui.periodPop = !S.ui.periodPop; renderTopbar() }
    else if (act === 'period-set') { S.ui.periodPop = false; switchPeriod(Number(t.dataset.y)) }
    else if (act === 'role-pop') { S.ui.rolePop = !S.ui.rolePop; renderSidebar() }
    else if (act === 'role-set') { S.ui.role = t.dataset.id; if (S.ui.role !== 'head') S.ui.roleUnit = ''; saveUI(); render() }
    else if (act === 'open') { e.preventDefault(); S.ui.open[t.dataset.key] = !S.ui.open[t.dataset.key]; saveUI(); renderSidebar() }
    else if (act === 'group') { S.ui.groups[t.dataset.key] = !S.ui.groups[t.dataset.key]; saveUI(); renderSidebar() }
    else if (act === 'month') { S.m = Number(t.dataset.i); render() }
    else if (act === 'adm-analyze') analyze()
    else if (act === 'adm-apply') applyReport()
    else if (act === 'adm-reset') { S.adm.files = {}; S.adm.parsed = {}; S.adm.report = null; render() }
    else if (act === 'adm-tab') { S.adm.tab = t.dataset.tab; render() }
    else if (act === 'adm-master-apply') applyMaster()
    else if (act === 'download') download()
    else if (act === 'gh-save') ghSave()
    else if (act === 'draft-discard') discardDraft()
  })

  document.addEventListener('input', e => {
    const t = e.target
    const k = t.dataset.in
    if (k === 'pv-q') { S.pv.q = t.value; $('#pvList').innerHTML = repsList() }
    else if (k === 'apv-q') { S.apv.q = t.value; $('#apvList').innerHTML = adminRepsTable() }
    if (t.dataset.gh) {
      if (t.dataset.gh === 'token') { try { sessionStorage.setItem(GH_TOKEN_KEY, t.value.trim()) } catch (err) {} }
      else { const c = ghCfg(); c[t.dataset.gh] = t.value.trim(); try { localStorage.setItem(GH_KEY, JSON.stringify(c)) } catch (err) {} }
    }
  })

  document.addEventListener('change', e => {
    const t = e.target
    const k = t.dataset.in
    if (t.dataset.file) { handleFile(t.dataset.file, t.files[0]); return }
    if (t.dataset.rep) {
      const r = rep(t.dataset.rep)
      const vals = t.value.split(',').map(s => s.trim()).filter(Boolean)
      r[t.dataset.field] = t.dataset.field === 'codes' ? vals.map(v => v.toUpperCase()) : vals
      setDirty(true)
      renderDraft()
      renderSidebar()
      toast('Đã lưu vào bản nháp')
      return
    }
    if (k === 'pv-unit') { S.pv.unit = t.value; $('#pvList').innerHTML = repsList() }
    else if (k === 'pv-sort') { S.pv.sort = t.value; $('#pvList').innerHTML = repsList() }
    else if (k === 'pv-ctv') { S.pv.ctv = t.checked; $('#pvList').innerHTML = repsList() }
    else if (k === 'apv-unit') { S.apv.unit = t.value; $('#apvList').innerHTML = adminRepsTable() }
    else if (k === 'apv-missing') { S.apv.missing = t.checked; $('#apvList').innerHTML = adminRepsTable() }
    else if (k === 'adm-month') { S.adm.month = Number(t.value); S.adm.report = null; render() }
    else if (k === 'adm-keep') { S.adm.keepOld = t.checked; render() }
    else if (k === 'adm-bai') { S.adm.bai = t.checked; S.adm.report = null; render() }
    else if (k === 'adm-video') { S.adm.video = t.checked; S.adm.report = null; render() }
    else if (k === 'adm-year') { S.adm.year = Number(t.value); S.adm.yearTouched = true }
    else if (k === 'role-unit') { S.ui.roleUnit = t.value; saveUI(); renderSidebar() }
  })

  document.addEventListener('dragover', e => {
    const z = e.target.closest('[data-drop]')
    if (z) { e.preventDefault(); z.classList.add('is-drag') }
  })
  document.addEventListener('dragleave', e => {
    const z = e.target.closest('[data-drop]')
    if (z) z.classList.remove('is-drag')
  })
  document.addEventListener('drop', e => {
    const z = e.target.closest('[data-drop]')
    if (!z) return
    e.preventDefault()
    z.classList.remove('is-drag')
    handleFile(z.dataset.drop, e.dataTransfer.files[0])
  })

  function showTip(t) {
    const id = t.dataset.chart
    const ro = document.getElementById(id + '-ro')
    if (!ro) return
    ro.innerHTML = readout(id, Number(t.dataset.i))
    t.ownerSVGElement.querySelectorAll('.chart__hit').forEach(h => h.classList.toggle('is-on', h === t))
  }
  document.addEventListener('pointerover', e => { const t = e.target.closest('.chart__hit'); if (t) showTip(t) })
  document.addEventListener('pointerdown', e => { const t = e.target.closest('.chart__hit'); if (t) showTip(t) })

  document.addEventListener('keydown', e => { if (e.key === 'Escape') $('#app').classList.remove('is-drawer') })

  let lastW = window.innerWidth
  window.addEventListener('resize', () => {
    const w = window.innerWidth
    if (((w < 640) !== (lastW < 640) || (w < 1024) !== (lastW < 1024)) && S.data) render()
    lastW = w
  })

  window.addEventListener('hashchange', () => {
    if (location.hash === '#admin') { location.replace('#/admin'); return }
    $('#app').classList.remove('is-drawer')
    render(true)
  })

  function loadScript(src, key) {
    return new Promise((resolve, reject) => {
      window[key] = null
      const sc = document.createElement('script')
      sc.src = src + '?t=' + Date.now()
      sc.onload = () => { const v = window[key]; sc.remove(); v ? resolve(v) : reject(new Error(src + ' rỗng')) }
      sc.onerror = () => { sc.remove(); reject(new Error('không tìm thấy ' + src)) }
      document.head.appendChild(sc)
    })
  }

  async function loadYear(y) {
    if (S.cache[y]) return S.cache[y]
    if (!S.available.includes(y)) return null
    const d = await loadScript(DATA_DIR + fileName(y), 'KPI_DATA')
    S.cache[y] = d
    return d
  }

  async function switchPeriod(y) {
    S.year = y
    S.ui.year = y
    saveUI()
    S.adm.report = null
    S.adm.master = null
    S.adm.files = {}
    S.adm.parsed = {}
    S.adm.yearTouched = false
    let base = null
    try { base = await loadYear(y) } catch (e) { toast('Không tải được KPI ' + y + ': ' + e.message, true) }
    S.base = base ? JSON.parse(JSON.stringify(base)) : null
    S.data = S.base ? JSON.parse(JSON.stringify(S.base)) : KpiParser.makeSkeleton(y)
    S.dirty = false
    try {
      const d = JSON.parse(localStorage.getItem(DRAFT_PREFIX + y) || 'null')
      if (d && d.data && d.data.period && d.data.period.id === y) { S.data = d.data; S.dirty = true }
    } catch (e) {}
    S.m = lastDataMonth()
    render()
  }

  async function init() {
    if (location.hash === '#admin') history.replaceState(null, '', '#/admin')
    try {
      const p = await loadScript(DATA_DIR + 'periods.js', 'KPI_PERIODS')
      S.available = (p.available || []).map(Number)
    } catch (e) {
      $('#page').innerHTML = '<div class="empty">' + icon('alert') + '<div>Không tải được danh sách kỳ KPI (' + esc(e.message) + ').</div><div class="note" style="margin-top:8px">Kiểm tra thư mục <code>data/</code> có nằm cạnh <code>index.html</code> không.</div></div>'
      return
    }
    const saved = Number(S.ui.year)
    const y = periodYears().includes(saved) ? saved : (S.available.length ? Math.max(...S.available) : currentYear())
    await switchPeriod(y)
  }

  init()
})()
