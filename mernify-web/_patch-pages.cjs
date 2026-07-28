const fs = require('fs')
const path = require('path')
const root = 'F:/mern.org/mernify-web'

const wordmark =
  '<span class="fw-bold text-uppercase" style="font-family:Phudu,sans-serif;font-size:1.35rem;letter-spacing:0.06em;color:inherit">Mernify</span>'

for (const f of fs.readdirSync(root).filter((x) => x.endsWith('.html'))) {
  let c = fs.readFileSync(path.join(root, f), 'utf8')
  c = c.replace(/<img[^>]*src="assets\/images\/logo\/logo\.png"[^>]*>/g, wordmark)
  c = c.replace(/<img[^>]*src="assets\/images\/logo\/logo-secendary\.png"[^>]*>/g, wordmark)
  fs.writeFileSync(path.join(root, f), c)
}
console.log('logos done')

// about.html content
let about = fs.readFileSync(path.join(root, 'about.html'), 'utf8')
about = about.replace(
  /Born in 2012/,
  'About Mernify',
)
about = about.replace(
  /We are <span class="text-main-two-600">“Mernify”<\/span> — a marketing and creative agency based in California, driven by creativity and innovation/,
  'We are <span class="text-main-two-600">“Mernify”</span> — a modern software development partner for products that need to last',
)
about = about.replace(
  /Brands Successfully Transformed/g,
  'Products Engineered End-to-End',
)
about = about.replace(
  /Client Retention and Satisfaction Rate/g,
  'Transparent Delivery Partnerships',
)
about = about.replace(
  /Creative Campaigns Successfully Launched/g,
  'Focused Product Pods',
)
// Remove fake zero counters messaging by replacing unlock growth heading if present
about = about.replace(
  /Unlock growth opportunities streamline workflows, & deliver measurable results through digital on tailored strategies/gi,
  'Design and develop secure, high-performing, and scalable software solutions that help businesses launch faster and grow confidently',
)
fs.writeFileSync(path.join(root, 'about.html'), about)
console.log('about done')

// contact.html
let contact = fs.readFileSync(path.join(root, 'contact.html'), 'utf8')
contact = contact.replace(
  /> contact us</,
  '> Contact</',
)
contact = contact.replace(
  /Contact Our Expert Team for Reliable Support, Guidance, and Professional Assistance/,
  'Tell us about the product you want to build',
)
contact = contact.replace(
  /We’d love to hear from you\. Share your ideas and let’s make them a reality together turning visions into impactful experiences\./,
  'Share enough context for a useful first conversation. We respond with clarifying questions, a suggested next step, and whether a discovery call makes sense.',
)
contact = contact.replace(/Submit Comment/g, 'Send Message')
contact = contact.replace(/placeholder="Write message\.\.\.\."/g, 'placeholder="Tell us about your product, timeline, and goals...."')
fs.writeFileSync(path.join(root, 'contact.html'), contact)
console.log('contact done')

// service.html key titles
let service = fs.readFileSync(path.join(root, 'service.html'), 'utf8')
service = service.replace(/Capabilities/g, 'Services')
service = service.replace(
  /We are <span class="text-main-two-600">“Mernify”<\/span> — a marketing and creative agency based in California, driven by creativity and innovation/,
  'Product engineering buyers actually purchase — organized by outcomes, not programming languages',
)
service = service.replace(/Illustration Design/g, 'Product Engineering')
service = service.replace(/Business Branding/g, 'SaaS Development')
service = service.replace(/Web Development/g, 'Web Development')
service = service.replace(/Application Design/g, 'Mobile App Development')
// Remove pricing offer section if present
service = service.replace(
  /<section[\s\S]*?Special offer![\s\S]*?<\/section>/i,
  '<!-- Pricing removed: custom engagements only -->',
)
fs.writeFileSync(path.join(root, 'service.html'), service)
console.log('service done')
