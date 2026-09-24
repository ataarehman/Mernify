/** Product-structure detail for mobile app pages. Grounded in each public listing, not invented metrics. */

export const mobileAppDetails = {
  'the-trolley': {
    personas: [
      {
        name: 'Household buyer',
        role: 'Orders groceries, food, medicine, and household essentials for delivery',
        quote: 'I need one place to order what the house runs out of, and I need to know where the order is.',
        goals: ['Browse groceries, food, and medicine in one app', 'Place an order without calling the store', 'Follow the order after checkout'],
        frustrations: ['Separate apps for groceries, food, and pharmacy', 'No visibility after the order is placed'],
        tech: 'Android phone',
      },
      {
        name: 'Seller',
        role: 'Lists products and fulfills orders inside the buyer/seller ecosystem',
        quote: 'Orders have to reach the right counter without a separate chat thread for every item.',
        goals: ['Receive orders from the same catalog the buyer sees', 'Keep fulfillment in one flow'],
        frustrations: ['Orders arriving through calls and messages', 'Stock and order status living in different tools'],
        tech: 'Android',
      },
    ],
    journeys: [
      {
        title: 'Buyer journey',
        subtitle: 'From the home categories to a tracked order',
        steps: [
          { stage: 'Open', action: 'Lands on categories such as groceries, restaurants, and medicine', thought: 'I can start from what I need today.', pain: 'Essentials are split across several storefronts', opp: 'Category entry on the first screen', emotion: 3 },
          { stage: 'Choose', action: 'Opens a category and selects items', thought: 'This is the same list I would walk through in the store.', pain: 'Unclear what can actually be delivered', opp: 'Category cards with a direct shop action', emotion: 4 },
          { stage: 'Order', action: 'Submits the basket', thought: 'The order should now belong to a seller, not a chat.', pain: 'Manual order taking drops items', opp: 'Order handling shared by buyer and seller', emotion: 4 },
          { stage: 'Track', action: 'Follows the order after checkout', thought: 'I should not have to call to ask where it is.', pain: 'Delivery status only exists in a phone call', opp: 'Real-time tracking on the order', emotion: 5 },
        ],
      },
    ],
    sitemap: [
      { label: 'Home', children: ['Deliver to', 'Groceries', 'Restaurants', 'Medicine'] },
      { label: 'Shop', children: ['Category', 'Product list', 'Basket'] },
      { label: 'Orders', children: ['Active order', 'Tracking', 'History'] },
      { label: 'Account', children: ['Profile', 'Addresses', 'Seller tools'] },
    ],
    wireframes: [
      {
        screen: 'Home',
        wire: [
          { n: 1, text: 'Delivery address' },
          { n: 2, text: 'Category cards' },
          { n: 3, text: 'Bottom navigation' },
        ],
        final: ['Store listing shows groceries, restaurants, and medicine as the first choices.', 'Bottom bar keeps home, wishlist, cart, and account available.'],
      },
    ],
  },
  grocyon: {
    personas: [
      {
        name: 'Hungry customer',
        role: 'Orders from nearby restaurants',
        quote: 'Show me what is open near me and let me order without a phone call.',
        goals: ['See open restaurants', 'Search a menu', 'Place a food order'],
        frustrations: ['Calling restaurants that are closed', 'Menus that are not on the phone'],
        tech: 'Android',
      },
      {
        name: 'Grocery shopper',
        role: 'Orders household groceries from nearby stores',
        quote: 'Food and groceries should not be two different accounts.',
        goals: ['Switch from restaurants to grocery', 'Reorder nearby staples'],
        frustrations: ['A food app that cannot cover the weekly shop'],
        tech: 'Android',
      },
    ],
    journeys: [
      {
        title: 'Order journey',
        subtitle: 'Nearby restaurant or grocery store',
        steps: [
          { stage: 'Locate', action: 'Sets a delivery address and sees open restaurants', thought: 'These are places I can actually order from now.', pain: 'Lists that include closed kitchens', opp: 'Open restaurants grouped under the current address', emotion: 4 },
          { stage: 'Browse', action: 'Opens a restaurant or switches to grocery', thought: 'I should not install a second app for the shop.', pain: 'Food and grocery split into different products', opp: 'Food and grocery in one bottom navigation', emotion: 4 },
          { stage: 'Order', action: 'Adds items and checks out', thought: 'The store I picked is the one that will prepare this.', pain: 'Unclear which nearby store receives the order', opp: 'Store name and address shown before checkout', emotion: 5 },
        ],
      },
    ],
    sitemap: [
      { label: 'Food', children: ['Deliver to', 'Search', 'Open restaurants'] },
      { label: 'Grocery', children: ['Nearby stores', 'Categories', 'Basket'] },
      { label: 'Orders', children: ['Current order', 'History'] },
    ],
    wireframes: [
      {
        screen: 'Restaurant list',
        wire: [
          { n: 1, text: 'Address' },
          { n: 2, text: 'Search' },
          { n: 3, text: 'Restaurant cards' },
        ],
        final: ['Listing shows the restaurant name and street address on each card.', 'Food and grocery are separate tabs in the bottom bar.'],
      },
    ],
  },
  'license-companion': {
    personas: [
      {
        name: 'Physician',
        role: 'Tracks medical licenses, certifications, and renewal dates',
        quote: 'I cannot miss a renewal because the date lived in an email.',
        goals: ['See upcoming renewals', 'Keep license documents together', 'Act before a credential expires'],
        frustrations: ['Expiry dates scattered across email and paper', 'No reminder until a board notice arrives'],
        tech: 'Android and iOS',
      },
      {
        name: 'Compliance coordinator',
        role: 'Watches credentials for a clinical team',
        quote: 'I need the same expiry picture the clinician sees.',
        goals: ['Review licenses and CE records', 'Know which items expire soon'],
        frustrations: ['Spreadsheets that go stale', 'Documents stored outside the reminder'],
        tech: 'Android and iOS',
      },
    ],
    journeys: [
      {
        title: 'Renewal journey',
        subtitle: 'From the home list to a renewal action',
        steps: [
          { stage: 'Land', action: 'Opens the home screen and sees upcoming reminders', thought: 'The next expiry is the first thing on screen.', pain: 'Renewals buried in a folder', opp: 'Upcoming reminders above the fold', emotion: 4 },
          { stage: 'Review', action: 'Opens a license or certification record', thought: 'The document and the date belong together.', pain: 'A reminder with no document attached', opp: 'License and certification lists on the same home screen', emotion: 4 },
          { stage: 'Act', action: 'Uses remind later or renew now', thought: 'I can deal with this now or schedule it.', pain: 'A date with no next step', opp: 'Remind later and renew actions on the reminder', emotion: 5 },
        ],
      },
    ],
    sitemap: [
      { label: 'Dashboard', children: ['Search records', 'Upcoming reminders', 'CE timeline'] },
      { label: 'Records', children: ['Licenses', 'Certifications', 'CE'] },
      { label: 'Account', children: ['Profile', 'Notifications'] },
    ],
    wireframes: [
      {
        screen: 'Dashboard',
        wire: [
          { n: 1, text: 'Greeting and search' },
          { n: 2, text: 'Upcoming reminders' },
          { n: 3, text: 'License and certification counts' },
        ],
        final: ['Store creative shows a reminder with an expiry date and a day count.', 'Licenses, CE, and certifications are separate entries in the bottom navigation.'],
      },
    ],
  },
  'authentic-detective': {
    personas: [
      {
        name: 'Buyer',
        role: 'Checks whether a luxury item is authentic before trusting it',
        quote: 'I want the authentication step before I treat a listing as real.',
        goals: ['Start an authentication', 'Browse the marketplace', 'Read community discussion'],
        frustrations: ['Photos that are not enough to judge a luxury item', 'No place to ask the community'],
        tech: 'Android and iOS',
      },
      {
        name: 'Collector',
        role: 'Uses forums and brand chat around authenticated fashion',
        quote: 'The listing and the conversation should live in the same app.',
        goals: ['Follow brand discussion', 'Move from a forum post to authentication'],
        frustrations: ['Authentication in one app and community in another'],
        tech: 'Android and iOS',
      },
    ],
    journeys: [
      {
        title: 'Authentication journey',
        subtitle: 'From home to authenticate, marketplace, or forums',
        steps: [
          { stage: 'Arrive', action: 'Opens a home screen built around brand authentication', thought: 'The first job is to verify an item.', pain: 'Authentication hidden behind a marketplace feed', opp: 'Authenticate action on the first screen', emotion: 4 },
          { stage: 'Explore', action: 'Moves into brand chat, marketplace, or forums', thought: 'I can stay here after the check.', pain: 'Community lives on a separate social app', opp: 'Brand chat and forums beside authentication', emotion: 4 },
          { stage: 'Continue', action: 'Opens a forum or listing', thought: 'This is the same community that cares about authenticity.', pain: 'No path from a discussion back to authentication', opp: 'Explore action on the forum introduction', emotion: 5 },
        ],
      },
    ],
    sitemap: [
      { label: 'Home', children: ['Authenticate', 'Hot topics', 'Brand chat'] },
      { label: 'Marketplace', children: ['Browse', 'Listing'] },
      { label: 'Forums', children: ['Fashion discussion', 'Community'] },
      { label: 'Alerts', children: ['Notifications'] },
    ],
    wireframes: [
      {
        screen: 'Home',
        wire: [
          { n: 1, text: 'Authenticate call to action' },
          { n: 2, text: 'Brand chat and authentication tiles' },
          { n: 3, text: 'Forum introduction' },
        ],
        final: ['Store creative leads with brand authentication and an authenticate action.', 'Bottom navigation separates home, grid, activity, and alerts.'],
      },
    ],
  },
  'panda-pos': {
    personas: [
      {
        name: 'Counter staff',
        role: 'Takes takeaway, collection, delivery, and eat-in orders',
        quote: 'The order type has to be chosen before the item, or the ticket is wrong.',
        goals: ['Switch service type quickly', 'Add and customise menu items', 'See the current ticket'],
        frustrations: ['A menu that ignores whether the order is delivery or eat-in', 'Customisations written on paper'],
        tech: 'Android terminal',
      },
      {
        name: 'Manager',
        role: 'Checks orders, reports, and settings across terminals',
        quote: 'If two terminals disagree, the kitchen gets two versions of the same order.',
        goals: ['Trust that terminals share the same order', 'Reach reports without leaving the POS'],
        frustrations: ['Orders re-keyed between till and kitchen', 'Reports in a separate back office'],
        tech: 'Android',
      },
    ],
    journeys: [
      {
        title: 'Ticket journey',
        subtitle: 'Service type, item, customise, add',
        steps: [
          { stage: 'Service', action: 'Selects takeaway, collection, delivery, or eat-in', thought: 'The ticket type is set before I sell.', pain: 'Service type added after the items', opp: 'Service types in the top bar', emotion: 4 },
          { stage: 'Menu', action: 'Opens a category such as pizzas or special offers', thought: 'I can reach the item without scrolling the whole menu.', pain: 'One long undifferentiated list', opp: 'Category tabs above the items', emotion: 4 },
          { stage: 'Item', action: 'Customises a pizza and adds it', thought: 'Size and options belong on the item, not in a note.', pain: 'Modifiers remembered verbally', opp: 'Customise and add actions on each row', emotion: 5 },
          { stage: 'Sync', action: 'The order is available on other terminals', thought: 'The kitchen should see the same ticket.', pain: 'Terminals that drift out of date', opp: 'Real-time order sync across terminals', emotion: 5 },
        ],
      },
    ],
    sitemap: [
      { label: 'Orders', children: ['Take away', 'Collection', 'Delivery', 'Eat-in'] },
      { label: 'Menu', children: ['Categories', 'Item', 'Customise'] },
      { label: 'Cart', children: ['Current ticket'] },
      { label: 'Back office', children: ['Reports', 'Settings'] },
    ],
    wireframes: [
      {
        screen: 'Menu',
        wire: [
          { n: 1, text: 'Service-type tabs' },
          { n: 2, text: 'Category tabs' },
          { n: 3, text: 'Item row with price and add' },
        ],
        final: ['Store screenshot shows service types and pizza categories on one screen.', 'Each item has customise and add, with cart count in the bottom bar.'],
      },
    ],
  },
  'panda-pizzeria': {
    personas: [
      {
        name: 'Customer',
        role: 'Browses the menu, deals, and favourites, then tracks the order',
        quote: 'I want the deal and the usual order without asking the shop to repeat it.',
        goals: ['Browse the menu', 'Save favourites', 'See the order after it is placed'],
        frustrations: ['Deals that only exist on a printed flyer', 'No status after checkout'],
        tech: 'Android',
      },
    ],
    journeys: [
      {
        title: 'Customer order',
        subtitle: 'Menu, deal or favourite, then tracking',
        steps: [
          { stage: 'Browse', action: 'Opens the menu', thought: 'I should see what I can order tonight.', pain: 'Menu only available in the shop', opp: 'Menu browsing in the customer app', emotion: 4 },
          { stage: 'Choose', action: 'Opens a deal or a saved favourite', thought: 'I should not rebuild the same order.', pain: 'Repeating a usual order from scratch', opp: 'Deals and favourites beside the menu', emotion: 4 },
          { stage: 'Track', action: 'Watches the order after checkout', thought: 'I want to know it is being made.', pain: 'Status only by phone', opp: 'Real-time order tracking', emotion: 5 },
        ],
      },
    ],
    sitemap: [
      { label: 'Menu', children: ['Categories', 'Item'] },
      { label: 'Deals', children: ['Current deals'] },
      { label: 'Favourites', children: ['Saved orders'] },
      { label: 'Orders', children: ['Tracking', 'History'] },
    ],
    wireframes: [
      {
        screen: 'Ordering',
        wire: [
          { n: 1, text: 'Menu' },
          { n: 2, text: 'Deals and favourites' },
          { n: 3, text: 'Order status' },
        ],
        final: ['Customer flow is separate from the staff POS.', 'Tracking is part of the order, not a follow-up call.'],
      },
    ],
  },
  'arccos-golf': {
    personas: [
      {
        name: 'Golfer',
        role: 'Records shots and reviews the round',
        quote: 'I want the round captured while I play, not reconstructed afterwards.',
        goals: ['Track shots automatically', 'Review analytics after the round', 'Use caddie guidance during play'],
        frustrations: ['Paper scorecards with no shot location', 'Advice that ignores how the golfer actually plays'],
        tech: 'Android, with course sensors',
      },
    ],
    journeys: [
      {
        title: 'Round journey',
        subtitle: 'Track, review, caddie',
        steps: [
          { stage: 'Play', action: 'Starts a round and lets shots record automatically', thought: 'I should not stop to log every swing.', pain: 'Manual shot entry mid-round', opp: 'Automatic shot tracking', emotion: 4 },
          { stage: 'Review', action: 'Opens analytics for the round', thought: 'I want to see where the shots went.', pain: 'A score with no map', opp: 'Advanced analytics after the round', emotion: 4 },
          { stage: 'Decide', action: 'Uses the AI caddie for a club or target', thought: 'The advice should use my shots, not a generic chart.', pain: 'Static yardage books', opp: 'AI caddie on top of tracked shots', emotion: 5 },
        ],
      },
    ],
    sitemap: [
      { label: 'Round', children: ['Start round', 'Shot tracking', 'Score'] },
      { label: 'Analytics', children: ['Round review', 'Trends'] },
      { label: 'Caddie', children: ['Club guidance', 'Targets'] },
    ],
    wireframes: [
      {
        screen: 'On-course',
        wire: [
          { n: 1, text: 'Hole and target' },
          { n: 2, text: 'Shot capture' },
          { n: 3, text: 'Caddie suggestion' },
        ],
        final: ['The product is built around automatic shot tracking rather than a manual scorecard.', 'Analytics and the AI caddie sit on the same round data.'],
      },
    ],
  },
  'photo-background-changer': {
    personas: [
      {
        name: 'Editor',
        role: 'Removes or replaces a photo background on a phone',
        quote: 'I need the subject cut out without opening a desktop editor.',
        goals: ['Remove a background', 'Replace it with another style', 'Edit more than one image'],
        frustrations: ['Manual cutouts on a small screen', 'One-photo tools when a batch is waiting'],
        tech: 'Android',
      },
    ],
    journeys: [
      {
        title: 'Edit journey',
        subtitle: 'Select, remove, replace',
        steps: [
          { stage: 'Open', action: 'Picks a photo', thought: 'The subject should be selectable without a pen tool.', pain: 'Manual masking on a phone', opp: 'Background removal as the main action', emotion: 4 },
          { stage: 'Remove', action: 'Cuts the subject out, including a transparent result', thought: 'I need the person, not the street behind them.', pain: 'Erase tools that damage the subject', opp: 'Removal and restore controls', emotion: 4 },
          { stage: 'Replace', action: 'Applies a background style or processes a batch', thought: 'The next photos should not start from zero.', pain: 'Repeating the same cutout one image at a time', opp: 'Custom backgrounds and batch editing', emotion: 5 },
        ],
      },
    ],
    sitemap: [
      { label: 'Edit', children: ['Pick photo', 'Remove', 'Restore'] },
      { label: 'Background', children: ['Transparent', 'Styles', 'Custom'] },
      { label: 'Batch', children: ['Queue', 'Export'] },
    ],
    wireframes: [
      {
        screen: 'Editor',
        wire: [
          { n: 1, text: 'Photo canvas' },
          { n: 2, text: 'Remove and restore' },
          { n: 3, text: 'Background styles' },
        ],
        final: ['Store creative shows object removal directly on the photo.', 'Remove and restore are the primary controls under the image.'],
      },
    ],
  },
  ucardia: {
    personas: [
      {
        name: 'Patient',
        role: 'Follows a heart-health program and logs vitals',
        quote: 'I need the next step in the program, not another generic article.',
        goals: ['See the care program', 'Record vitals', 'Follow coaching for the day'],
        frustrations: ['Advice that ignores the latest reading', 'A program that lives in a PDF'],
        tech: 'Android',
      },
    ],
    journeys: [
      {
        title: 'Care journey',
        subtitle: 'Vitals, coaching, program',
        steps: [
          { stage: 'Check', action: 'Records a vital sign', thought: 'This reading should change what I am asked to do.', pain: 'Vitals stored apart from the plan', opp: 'Vital tracking inside the care program', emotion: 4 },
          { stage: 'Coach', action: 'Opens personalized cardiac coaching', thought: 'The next action should match my program.', pain: 'The same tips for every user', opp: 'Coaching tied to the individual program', emotion: 4 },
          { stage: 'Continue', action: 'Follows the customized care program', thought: 'I should see what is left in this plan.', pain: 'A plan with no sequence', opp: 'A program the patient can move through', emotion: 5 },
        ],
      },
    ],
    sitemap: [
      { label: 'Today', children: ['Coaching', 'Next action'] },
      { label: 'Vitals', children: ['Log reading', 'History'] },
      { label: 'Program', children: ['Care plan', 'Progress'] },
    ],
    wireframes: [
      {
        screen: 'Home',
        wire: [
          { n: 1, text: 'Today’s coaching' },
          { n: 2, text: 'Vital entry' },
          { n: 3, text: 'Program progress' },
        ],
        final: ['The listing describes coaching, vital tracking, and a customized care program as one product.', 'Those three jobs are the information architecture, not separate apps.'],
      },
    ],
  },
}

export function getMobileAppDetail(slug) {
  return mobileAppDetails[slug] || null
}
