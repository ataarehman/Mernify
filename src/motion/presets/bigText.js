/** Responsive scale/offset values for hero giant word (mernify-web custom-gsap §05).
 *  X offsets softened vs template so transforms stay within clipped hero on narrow viewports.
 */
export const BIG_TEXT_BREAKPOINTS = [
  { query: '(min-width: 1801px)', scale: 0.095, y: '39.5%', x: '-8%' },
  { query: '(min-width: 1700px) and (max-width: 1800px)', scale: 0.105, y: '41.5%', x: '-8%' },
  { query: '(min-width: 1600px) and (max-width: 1699px)', scale: 0.11, y: '44%', x: '-8%' },
  { query: '(min-width: 1400px) and (max-width: 1599px)', scale: 0.125, y: '51%', x: '-7%' },
  { query: '(min-width: 1200px) and (max-width: 1399px)', scale: 0.105, y: '55%', x: '-7%' },
  { query: '(min-width: 992px) and (max-width: 1199px)', scale: 0.125, y: '66%', x: '-12%' },
  { query: '(min-width: 768px) and (max-width: 991px)', scale: 0.165, y: '71%', x: '-10%' },
  { query: '(min-width: 576px) and (max-width: 767px)', scale: 0.225, y: '98%', x: '-6%' },
  { query: '(min-width: 425px) and (max-width: 575px)', scale: 0.285, y: '119%', x: '-4%' },
  { query: '(max-width: 424px)', scale: 0.305, y: '136%', x: '-2%' },
]

export const BIG_TEXT_BLEND_COLOR = '#f8fafc'
