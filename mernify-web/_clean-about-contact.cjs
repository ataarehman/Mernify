const fs = require('fs')
const p = 'F:/mern.org/mernify-web/about.html'
let c = fs.readFileSync(p, 'utf8')

c = c.replace(/<section class="team-area[\s\S]*?<\/section>/, '<!-- Team removed: no fabricated headshots -->')
c = c.replace(/Brand & Creative Strategy/g, 'Product Engineering')
c = c.replace(/Digital Design & Experiences/g, 'SaaS and Web Platforms')
c = c.replace(/Content & Visual Storytelling/g, 'AI and Automation')
c = c.replace(/Growth-Focused Creative Solutions/g, 'Dedicated Product Teams')
c = c.replace(
  /Shaping strong brand identities through clear positioning, creative direction, and strategic thinking that helps brands/g,
  'Modern engineering, product thinking, and structured delivery for products that need to last.',
)
c = c.replace(
  /Julian Miles|Adrian Miles|James Hayes|Alexander Moore|Michael Anderson|Sophia Williams|Emily Johnson|Ethan Roberts/g,
  'Delivery Partner',
)
c = c.replace(/\+8801314986186/g, 'hello@mernify.com')
c = c.replace(
  /1st Floor, Afroza Tower, Uposhohor New Market, Rajshahi 6202/g,
  'Remote-first · Global collaboration',
)
c = c.replace(
  /Nemo enim ipsam voluptatem quia aut odit aut fugit, magni dolores eos qui voluptatem sequi nesciunt neque porro quisquam est a dolorem ipsum quia/g,
  'Modern technology. Reliable execution. Measurable business value.',
)

fs.writeFileSync(p, c)
console.log('about cleaned')

const contact = 'F:/mern.org/mernify-web/contact.html'
let cc = fs.readFileSync(contact, 'utf8')
cc = cc.replace(/\+8801314986186/g, 'hello@mernify.com')
cc = cc.replace(
  /1st Floor, Afroza Tower, Uposhohor New Market, Rajshahi 6202/g,
  'Remote-first · Global collaboration',
)
cc = cc.replace(
  /Nemo enim ipsam voluptatem quia aut odit aut fugit, magni dolores eos qui voluptatem sequi nesciunt neque porro quisquam est a dolorem ipsum quia/g,
  'Modern technology. Reliable execution. Measurable business value.',
)
fs.writeFileSync(contact, cc)
console.log('contact cleaned')
