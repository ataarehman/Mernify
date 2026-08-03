const fs = require('fs')
const p = 'F:/mern.org/mernify-web/contact.html'
let c = fs.readFileSync(p, 'utf8')

c = c.replace(
  /Contact Our Expert Team for Reliable Support, Guidance, and Professional Assistance/g,
  'Tell us about the product you want to build',
)
c = c.replace(/\(251\) 854-6308/g, 'info@mernify.co')
c = c.replace(/\+8801314986186/g, 'info@mernify.co')
c = c.replace(
  /1st Floor, Afroza Tower, Uposhohor New Market, Rajshahi 6202/g,
  'Remote-first · Global collaboration',
)
c = c.replace(
  /Nemo enim ipsam voluptatem quia aut odit aut fugit, magni dolores eos qui voluptatem sequi nesciunt neque porro quisquam est a dolorem ipsum quia/g,
  'Modern technology. Reliable execution. Measurable business value.',
)
c = c.replace(/Art Direction/g, 'Product Engineering')
c = c.replace(/Brand Guidelines/g, 'SaaS Development')
c = c.replace(/Graphic Design/g, 'Mobile Apps')
c = c.replace(/Motion Design/g, 'AI Integration')
c = c.replace(/Generative AI/g, 'Cloud and DevOps')
c = c.replace(/SEO Blog/g, 'Case Studies')
c = c.replace(/Careers/g, 'Process')

fs.writeFileSync(p, c)
console.log('contact fixed')

// same footer cleanup across remaining pages
for (const f of ['about.html', 'service.html', 'portfolio.html', 'faq.html', 'index.html']) {
  const fp = `F:/mern.org/mernify-web/${f}`
  let h = fs.readFileSync(fp, 'utf8')
  h = h.replace(/\+8801314986186/g, 'info@mernify.co')
  h = h.replace(
    /1st Floor, Afroza Tower, Uposhohor New Market, Rajshahi 6202/g,
    'Remote-first · Global collaboration',
  )
  h = h.replace(/\(251\) 854-6308/g, 'info@mernify.co')
  fs.writeFileSync(fp, h)
}
console.log('phones cleaned')
