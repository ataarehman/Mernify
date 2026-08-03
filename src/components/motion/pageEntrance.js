/** Main marketing routes that play the entrance curtain. */
export function shouldPlayPageEntrance(pathname) {
  if (pathname === '/') return true
  const exact = new Set([
    '/about',
    '/services',
    '/industries',
    '/case-studies',
    '/process',
    '/contact',
  ])
  if (exact.has(pathname)) return true
  if (pathname.startsWith('/services/')) return true
  if (pathname.startsWith('/case-studies/')) return true
  return false
}
