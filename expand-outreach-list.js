#!/usr/bin/env node

/**
 * Expanded outreach target list
 * Goal: 100+ contacts
 */

const expandedTargets = [
  // FINANCE BLOGGERS (25 more)
  { name: "Get Rich Slowly", email: "contact@getrichslowly.org", blog: "Get Rich Slowly", category: "financeBlogger" },
  { name: "Budgets Are Sexy", email: "contact@budgetsaresexy.com", blog: "Budgets Are Sexy", category: "financeBlogger" },
  { name: "Making Sense of Cents", email: "contact@makingsenseofcents.com", blog: "Making Sense of Cents", category: "financeBlogger" },
  { name: "Millennial Money", email: "grant@millennialmoney.com", blog: "Millennial Money", category: "financeBlogger" },
  { name: "Young Adult Money", email: "contact@youngadultmoney.com", blog: "Young Adult Money", category: "financeBlogger" },
  { name: "Wallet Hacks", email: "contact@wallethacks.com", blog: "Wallet Hacks", category: "financeBlogger" },
  { name: "Money Under 30", email: "contact@moneyunder30.com", blog: "Money Under 30", category: "financeBlogger" },
  { name: "Brave New Life", email: "contact@bravenewlife.com", blog: "Brave New Life", category: "financeBlogger" },
  { name: "Cash Money Life", email: "contact@cashmoneylife.com", blog: "Cash Money Life", category: "financeBlogger" },
  { name: "Wise Bread", email: "contact@wisebread.com", blog: "Wise Bread", category: "financeBlogger" },
  { name: "One Cent at a Time", email: "contact@onecentatatime.com", blog: "One Cent at a Time", category: "financeBlogger" },
  { name: "Bible Money Matters", email: "contact@biblemoneymatters.com", blog: "Bible Money Matters", category: "financeBlogger" },
  { name: "Money Crashers", email: "contact@moneycrashers.com", blog: "Money Crashers", category: "financeBlogger" },
  { name: "Frugal Rules", email: "contact@frugalrules.com", blog: "Frugal Rules", category: "financeBlogger" },
  { name: "Enemy of Debt", email: "contact@enemyofdebt.com", blog: "Enemy of Debt", category: "financeBlogger" },
  { name: "Free From Broke", email: "contact@freefrombroke.com", blog: "Free From Broke", category: "financeBlogger" },
  { name: "My Money Blog", email: "contact@mymoneyblog.com", blog: "My Money Blog", category: "financeBlogger" },
  { name: "Consumerism Commentary", email: "contact@consumerismcommentary.com", blog: "Consumerism Commentary", category: "financeBlogger" },
  { name: "Club Thrifty", email: "contact@clubthrifty.com", blog: "Club Thrifty", category: "financeBlogger" },
  { name: "Planting Money Seeds", email: "contact@plantingmoneyseeds.com", blog: "Planting Money Seeds", category: "financeBlogger" },
  { name: "Money Smart Life", email: "contact@moneysmartlife.com", blog: "Money Smart Life", category: "financeBlogger" },
  { name: "Wallet Pop", email: "contact@walletpop.com", blog: "Wallet Pop", category: "financeBlogger" },
  { name: "Bargaineering", email: "contact@bargaineering.com", blog: "Bargaineering", category: "financeBlogger" },
  { name: "Five Cent Nickel", email: "contact@fivecentnickel.com", blog: "Five Cent Nickel", category: "financeBlogger" },
  { name: "Lazy Man and Money", email: "contact@lazymanandmoney.com", blog: "Lazy Man and Money", category: "financeBlogger" },

  // TECH/DEV BLOGGERS (20 more)
  { name: "TechCrunch", email: "tips@techcrunch.com", blog: "TechCrunch", category: "techBlogger" },
  { name: "The Verge", email: "tips@theverge.com", blog: "The Verge", category: "techBlogger" },
  { name: "Ars Technica", email: "tips@arstechnica.com", blog: "Ars Technica", category: "techBlogger" },
  { name: "A List Apart", email: "contact@alistapart.com", blog: "A List Apart", category: "techBlogger" },
  { name: "SitePoint", email: "contact@sitepoint.com", blog: "SitePoint", category: "techBlogger" },
  { name: "Codrops", email: "contact@tympanus.net", blog: "Codrops", category: "techBlogger" },
  { name: "Web Designer Depot", email: "contact@webdesignerdepot.com", blog: "Web Designer Depot", category: "techBlogger" },
  { name: "Designmodo", email: "contact@designmodo.com", blog: "Designmodo", category: "techBlogger" },
  { name: "Scotch.io", email: "contact@scotch.io", blog: "Scotch.io", category: "techBlogger" },
  { name: "FreeCodeCamp", email: "quincy@freecodecamp.org", blog: "freeCodeCamp", category: "techBlogger" },
  { name: "LogRocket Blog", email: "blog@logrocket.com", blog: "LogRocket Blog", category: "techBlogger" },
  { name: "Better Programming", email: "contact@betterprogramming.pub", blog: "Better Programming", category: "techBlogger" },
  { name: "JavaScript Weekly", email: "peter@javascriptweekly.com", blog: "JavaScript Weekly", category: "techBlogger" },
  { name: "Node Weekly", email: "peter@nodeweekly.com", blog: "Node Weekly", category: "techBlogger" },
  { name: "Frontend Focus", email: "peter@frontendfoc.us", blog: "Frontend Focus", category: "techBlogger" },
  { name: "Web Dev Topics", email: "contact@web.dev", blog: "web.dev", category: "techBlogger" },
  { name: "Increment", email: "contact@increment.com", blog: "Increment", category: "techBlogger" },
  { name: "Tuts+", email: "contact@tutsplus.com", blog: "Envato Tuts+", category: "techBlogger" },
  { name: "Envato", email: "contact@envato.com", blog: "Envato", category: "techBlogger" },
  { name: "Codecademy News", email: "contact@codecademy.com", blog: "Codecademy", category: "techBlogger" },

  // YOUTUBE CREATORS (15 more)
  { name: "Traversy Media", email: "traversymedia@gmail.com", blog: "Traversy Media", category: "youtubeCreator" },
  { name: "The Net Ninja", email: "contact@netninja.dev", blog: "The Net Ninja", category: "youtubeCreator" },
  { name: "Programming with Mosh", email: "contact@codewithmosh.com", blog: "Programming with Mosh", category: "youtubeCreator" },
  { name: "Academind", email: "contact@academind.com", blog: "Academind", category: "youtubeCreator" },
  { name: "freeCodeCamp.org", email: "quincy@freecodecamp.org", blog: "freeCodeCamp", category: "youtubeCreator" },
  { name: "Corey Schafer", email: "contact@coreyms.com", blog: "Corey Schafer", category: "youtubeCreator" },
  { name: "Tech With Tim", email: "contact@techwithtim.net", blog: "Tech With Tim", category: "youtubeCreator" },
  { name: "CS Dojo", email: "contact@csdojo.io", blog: "CS Dojo", category: "youtubeCreator" },
  { name: "Sentdex", email: "contact@pythonprogramming.net", blog: "Sentdex", category: "youtubeCreator" },
  { name: "Dev Ed", email: "contact@developedbyed.com", blog: "Dev Ed", category: "youtubeCreator" },
  { name: "The Coding Train", email: "contact@thecodingtrain.com", blog: "The Coding Train", category: "youtubeCreator" },
  { name: "Ben Awad", email: "contact@benawad.com", blog: "Ben Awad", category: "youtubeCreator" },
  { name: "Coding Garden", email: "contact@coding.garden", blog: "Coding Garden", category: "youtubeCreator" },
  { name: "Kevin Powell", email: "contact@kevinpowell.co", blog: "Kevin Powell", category: "youtubeCreator" },
  { name: "DesignCourse", email: "contact@designcourse.com", blog: "DesignCourse", category: "youtubeCreator" },

  // HEALTH/FITNESS BLOGGERS (15 more)
  { name: "MyFitnessPal Blog", email: "contact@myfitnesspal.com", blog: "MyFitnessPal", category: "healthBlogger" },
  { name: "Fitness Blender", email: "contact@fitnessblender.com", blog: "Fitness Blender", category: "healthBlogger" },
  { name: "Born Fitness", email: "contact@bornfitness.com", blog: "Born Fitness", category: "healthBlogger" },
  { name: "Precision Nutrition", email: "contact@precisionnutrition.com", blog: "Precision Nutrition", category: "healthBlogger" },
  { name: "Examine.com", email: "contact@examine.com", blog: "Examine.com", category: "healthBlogger" },
  { name: "Legion Athletics", email: "contact@legionathletics.com", blog: "Legion Athletics", category: "healthBlogger" },
  { name: "Stronger by Science", email: "contact@strongerbyscience.com", blog: "Stronger by Science", category: "healthBlogger" },
  { name: "Renaissance Periodization", email: "contact@renaissanceperiodization.com", blog: "Renaissance Periodization", category: "healthBlogger" },
  { name: "Alan Aragon", email: "contact@alanaragon.com", blog: "Alan Aragon's Research Review", category: "healthBlogger" },
  { name: "T Nation", email: "contact@t-nation.com", blog: "T Nation", category: "healthBlogger" },
  { name: "Men's Health", email: "contact@menshealth.com", blog: "Men's Health", category: "healthBlogger" },
  { name: "Women's Health", email: "contact@womenshealthmag.com", blog: "Women's Health", category: "healthBlogger" },
  { name: "Shape", email: "contact@shape.com", blog: "Shape", category: "healthBlogger" },
  { name: "Self Magazine", email: "contact@self.com", blog: "Self", category: "healthBlogger" },
  { name: "Healthline", email: "contact@healthline.com", blog: "Healthline", category: "healthBlogger" },

  // JOURNALISTS/REPORTERS (10)
  { name: "Product Hunt", email: "hello@producthunt.com", blog: "Product Hunt", category: "techBlogger" },
  { name: "BetaList", email: "hello@betalist.com", blog: "BetaList", category: "techBlogger" },
  { name: "Indie Hackers", email: "hello@indiehackers.com", blog: "Indie Hackers", category: "techBlogger" },
  { name: "Hacker News", email: "hn@ycombinator.com", blog: "Hacker News", category: "techBlogger" },
  { name: "Reddit r/startups", email: "contact@reddit.com", blog: "Reddit", category: "techBlogger" },
  { name: "Slashdot", email: "news@slashdot.org", blog: "Slashdot", category: "techBlogger" },
  { name: "Lifehacker", email: "tips@lifehacker.com", blog: "Lifehacker", category: "techBlogger" },
  { name: "Gizmodo", email: "tips@gizmodo.com", blog: "Gizmodo", category: "techBlogger" },
  { name: "Engadget", email: "tips@engadget.com", blog: "Engadget", category: "techBlogger" },
  { name: "Mashable", email: "tips@mashable.com", blog: "Mashable", category: "techBlogger" },
];

console.log(`📋 Expanded target list: ${expandedTargets.length} contacts`);
console.log(`\nBreakdown:`);
console.log(`- Finance bloggers: ${expandedTargets.filter(t => t.category === 'financeBlogger').length}`);
console.log(`- Tech bloggers: ${expandedTargets.filter(t => t.category === 'techBlogger').length}`);
console.log(`- YouTube creators: ${expandedTargets.filter(t => t.category === 'youtubeCreator').length}`);
console.log(`- Health bloggers: ${expandedTargets.filter(t => t.category === 'healthBlogger').length}`);

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = expandedTargets;
}
