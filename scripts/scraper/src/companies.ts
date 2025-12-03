import { CompanyConfig } from './types.js';

// Major direct sales companies configuration
// These are the largest MLM/direct sales companies by revenue and representative count

export const COMPANIES: CompanyConfig[] = [
  // Beauty & Cosmetics
  {
    name: 'Mary Kay',
    slug: 'mary-kay',
    baseUrl: 'https://www.marykay.com',
    repLocatorUrl: 'https://www.marykay.com/en-us/find-a-consultant',
    category: 'Beauty & Cosmetics',
    enabled: true,
    scrapeMethod: 'puppeteer',
    rateLimit: 10,
    notes: 'Large consultant network, uses dynamic locator'
  },
  {
    name: 'Avon',
    slug: 'avon',
    baseUrl: 'https://www.avon.com',
    repLocatorUrl: 'https://www.avon.com/replocator',
    category: 'Beauty & Cosmetics',
    enabled: true,
    scrapeMethod: 'puppeteer',
    rateLimit: 10,
    notes: 'Long-established direct sales company'
  },
  {
    name: 'Rodan + Fields',
    slug: 'rodan-fields',
    baseUrl: 'https://www.rodanandfields.com',
    repLocatorUrl: 'https://www.rodanandfields.com/find-a-consultant',
    category: 'Beauty & Cosmetics',
    enabled: true,
    scrapeMethod: 'puppeteer',
    rateLimit: 10,
    notes: 'Premium skincare, high-value reps'
  },
  {
    name: 'Younique',
    slug: 'younique',
    baseUrl: 'https://www.youniqueproducts.com',
    repLocatorUrl: null,
    category: 'Beauty & Cosmetics',
    enabled: true,
    scrapeMethod: 'puppeteer',
    rateLimit: 10,
    notes: 'Makeup focused, strong social media presence'
  },
  {
    name: 'Arbonne',
    slug: 'arbonne',
    baseUrl: 'https://www.arbonne.com',
    repLocatorUrl: 'https://www.arbonne.com/us/en/arb/Find-a-Consultant',
    category: 'Beauty & Cosmetics',
    enabled: true,
    scrapeMethod: 'puppeteer',
    rateLimit: 10,
    notes: 'Vegan/clean beauty focus'
  },
  {
    name: 'Nu Skin',
    slug: 'nu-skin',
    baseUrl: 'https://www.nuskin.com',
    repLocatorUrl: null,
    category: 'Beauty & Cosmetics',
    enabled: true,
    scrapeMethod: 'puppeteer',
    rateLimit: 10,
    notes: 'Anti-aging products'
  },
  {
    name: 'Beautycounter',
    slug: 'beautycounter',
    baseUrl: 'https://www.beautycounter.com',
    repLocatorUrl: 'https://www.beautycounter.com/find-a-consultant',
    category: 'Beauty & Cosmetics',
    enabled: true,
    scrapeMethod: 'puppeteer',
    rateLimit: 10,
    notes: 'Clean beauty, advocacy focused'
  },
  {
    name: 'Color Street',
    slug: 'color-street',
    baseUrl: 'https://www.colorstreet.com',
    repLocatorUrl: null,
    category: 'Beauty & Cosmetics',
    enabled: true,
    scrapeMethod: 'puppeteer',
    rateLimit: 10,
    notes: 'Nail strips, party-based sales'
  },
  {
    name: 'Monat',
    slug: 'monat',
    baseUrl: 'https://monatglobal.com',
    repLocatorUrl: null,
    category: 'Beauty & Cosmetics',
    enabled: true,
    scrapeMethod: 'puppeteer',
    rateLimit: 10,
    notes: 'Hair care focused'
  },
  {
    name: 'LimeLife by Alcone',
    slug: 'limelife',
    baseUrl: 'https://www.limelifebyalcone.com',
    repLocatorUrl: null,
    category: 'Beauty & Cosmetics',
    enabled: true,
    scrapeMethod: 'puppeteer',
    rateLimit: 10,
    notes: 'Professional makeup'
  },

  // Wellness & Essential Oils
  {
    name: 'Young Living',
    slug: 'young-living',
    baseUrl: 'https://www.youngliving.com',
    repLocatorUrl: null,
    category: 'Wellness & Essential Oils',
    enabled: true,
    scrapeMethod: 'puppeteer',
    rateLimit: 10,
    notes: 'Largest essential oils company'
  },
  {
    name: 'doTERRA',
    slug: 'doterra',
    baseUrl: 'https://www.doterra.com',
    repLocatorUrl: 'https://www.doterra.com/US/en/find-consultant',
    category: 'Wellness & Essential Oils',
    enabled: true,
    scrapeMethod: 'puppeteer',
    rateLimit: 10,
    notes: 'Second largest essential oils'
  },
  {
    name: 'Herbalife',
    slug: 'herbalife',
    baseUrl: 'https://www.herbalife.com',
    repLocatorUrl: 'https://www.herbalife.com/find-a-distributor',
    category: 'Wellness & Nutrition',
    enabled: true,
    scrapeMethod: 'puppeteer',
    rateLimit: 10,
    notes: 'Global nutrition company'
  },
  {
    name: 'Plexus',
    slug: 'plexus',
    baseUrl: 'https://plexusworldwide.com',
    repLocatorUrl: null,
    category: 'Wellness & Nutrition',
    enabled: true,
    scrapeMethod: 'puppeteer',
    rateLimit: 10,
    notes: 'Gut health focus'
  },
  {
    name: 'Isagenix',
    slug: 'isagenix',
    baseUrl: 'https://www.isagenix.com',
    repLocatorUrl: null,
    category: 'Wellness & Nutrition',
    enabled: true,
    scrapeMethod: 'puppeteer',
    rateLimit: 10,
    notes: 'Weight loss and nutrition'
  },
  {
    name: 'Optavia',
    slug: 'optavia',
    baseUrl: 'https://www.optavia.com',
    repLocatorUrl: 'https://www.optavia.com/find-a-coach',
    category: 'Wellness & Nutrition',
    enabled: true,
    scrapeMethod: 'puppeteer',
    rateLimit: 10,
    notes: 'Weight loss coaching'
  },
  {
    name: 'Juice Plus+',
    slug: 'juice-plus',
    baseUrl: 'https://www.juiceplus.com',
    repLocatorUrl: null,
    category: 'Wellness & Nutrition',
    enabled: true,
    scrapeMethod: 'puppeteer',
    rateLimit: 10,
    notes: 'Whole food nutrition'
  },
  {
    name: 'AdvoCare',
    slug: 'advocare',
    baseUrl: 'https://www.advocare.com',
    repLocatorUrl: null,
    category: 'Wellness & Nutrition',
    enabled: true,
    scrapeMethod: 'puppeteer',
    rateLimit: 10,
    notes: 'Sports nutrition, transitioned model'
  },
  {
    name: 'Shaklee',
    slug: 'shaklee',
    baseUrl: 'https://www.shaklee.com',
    repLocatorUrl: 'https://www.shaklee.com/find-distributor',
    category: 'Wellness & Nutrition',
    enabled: true,
    scrapeMethod: 'puppeteer',
    rateLimit: 10,
    notes: 'One of the oldest wellness MLMs'
  },
  {
    name: 'Melaleuca',
    slug: 'melaleuca',
    baseUrl: 'https://www.melaleuca.com',
    repLocatorUrl: null,
    category: 'Wellness & Household',
    enabled: true,
    scrapeMethod: 'puppeteer',
    rateLimit: 10,
    notes: 'Large wellness company, membership model'
  },
  {
    name: 'USANA',
    slug: 'usana',
    baseUrl: 'https://www.usana.com',
    repLocatorUrl: null,
    category: 'Wellness & Nutrition',
    enabled: true,
    scrapeMethod: 'puppeteer',
    rateLimit: 10,
    notes: 'High-quality supplements'
  },

  // Home & Kitchen
  {
    name: 'Pampered Chef',
    slug: 'pampered-chef',
    baseUrl: 'https://www.pamperedchef.com',
    repLocatorUrl: 'https://www.pamperedchef.com/find-a-consultant',
    category: 'Home & Kitchen',
    enabled: true,
    scrapeMethod: 'puppeteer',
    rateLimit: 10,
    notes: 'Berkshire Hathaway owned'
  },
  {
    name: 'Tupperware',
    slug: 'tupperware',
    baseUrl: 'https://www.tupperware.com',
    repLocatorUrl: 'https://www.tupperware.com/find-a-consultant',
    category: 'Home & Kitchen',
    enabled: true,
    scrapeMethod: 'puppeteer',
    rateLimit: 10,
    notes: 'Classic brand, restructuring'
  },
  {
    name: 'Norwex',
    slug: 'norwex',
    baseUrl: 'https://norwex.com',
    repLocatorUrl: 'https://norwex.com/find-a-consultant',
    category: 'Home & Cleaning',
    enabled: true,
    scrapeMethod: 'puppeteer',
    rateLimit: 10,
    notes: 'Eco-friendly cleaning products'
  },
  {
    name: 'Thirty-One Gifts',
    slug: 'thirty-one',
    baseUrl: 'https://www.mythirtyone.com',
    repLocatorUrl: null,
    category: 'Home & Accessories',
    enabled: true,
    scrapeMethod: 'puppeteer',
    rateLimit: 10,
    notes: 'Bags and home organization'
  },

  // Fragrances & Candles
  {
    name: 'Scentsy',
    slug: 'scentsy',
    baseUrl: 'https://scentsy.com',
    repLocatorUrl: 'https://scentsy.com/find-a-consultant',
    category: 'Home Fragrance',
    enabled: true,
    scrapeMethod: 'puppeteer',
    rateLimit: 10,
    notes: 'Wickless candles, warmers'
  },
  {
    name: 'PartyLite',
    slug: 'partylite',
    baseUrl: 'https://www.partylite.com',
    repLocatorUrl: null,
    category: 'Home Fragrance',
    enabled: true,
    scrapeMethod: 'puppeteer',
    rateLimit: 10,
    notes: 'Candles and fragrances'
  },
  {
    name: 'Gold Canyon',
    slug: 'gold-canyon',
    baseUrl: 'https://www.goldcanyon.com',
    repLocatorUrl: null,
    category: 'Home Fragrance',
    enabled: true,
    scrapeMethod: 'puppeteer',
    rateLimit: 10,
    notes: 'Premium candles'
  },

  // Fashion & Jewelry
  {
    name: 'Stella & Dot',
    slug: 'stella-dot',
    baseUrl: 'https://www.stelladot.com',
    repLocatorUrl: 'https://www.stelladot.com/stylist',
    category: 'Fashion & Jewelry',
    enabled: true,
    scrapeMethod: 'puppeteer',
    rateLimit: 10,
    notes: 'Jewelry and accessories'
  },
  {
    name: 'Paparazzi Accessories',
    slug: 'paparazzi',
    baseUrl: 'https://paparazziaccessories.com',
    repLocatorUrl: null,
    category: 'Fashion & Jewelry',
    enabled: true,
    scrapeMethod: 'puppeteer',
    rateLimit: 10,
    notes: '$5 jewelry model'
  },
  {
    name: 'Premier Designs',
    slug: 'premier-designs',
    baseUrl: 'https://premierdesigns.com',
    repLocatorUrl: null,
    category: 'Fashion & Jewelry',
    enabled: true,
    scrapeMethod: 'puppeteer',
    rateLimit: 10,
    notes: 'High-fashion jewelry'
  },
  {
    name: 'Trades of Hope',
    slug: 'trades-of-hope',
    baseUrl: 'https://tradesofhope.com',
    repLocatorUrl: null,
    category: 'Fashion & Jewelry',
    enabled: true,
    scrapeMethod: 'puppeteer',
    rateLimit: 10,
    notes: 'Fair trade jewelry'
  },
  {
    name: 'Origami Owl',
    slug: 'origami-owl',
    baseUrl: 'https://origamiowl.com',
    repLocatorUrl: null,
    category: 'Fashion & Jewelry',
    enabled: true,
    scrapeMethod: 'puppeteer',
    rateLimit: 10,
    notes: 'Customizable lockets'
  },
  {
    name: 'cabi',
    slug: 'cabi',
    baseUrl: 'https://www.cabionline.com',
    repLocatorUrl: 'https://www.cabionline.com/find-a-stylist',
    category: 'Fashion & Clothing',
    enabled: true,
    scrapeMethod: 'puppeteer',
    rateLimit: 10,
    notes: 'Women\'s clothing'
  },
  {
    name: 'LuLaRoe',
    slug: 'lularoe',
    baseUrl: 'https://www.lularoe.com',
    repLocatorUrl: null,
    category: 'Fashion & Clothing',
    enabled: true,
    scrapeMethod: 'puppeteer',
    rateLimit: 10,
    notes: 'Leggings and clothing'
  },

  // Books & Education
  {
    name: 'Usborne Books',
    slug: 'usborne',
    baseUrl: 'https://www.usbornebooksandmore.com',
    repLocatorUrl: null,
    category: 'Books & Education',
    enabled: true,
    scrapeMethod: 'puppeteer',
    rateLimit: 10,
    notes: 'Children\'s books'
  },

  // Other Categories
  {
    name: 'Amway',
    slug: 'amway',
    baseUrl: 'https://www.amway.com',
    repLocatorUrl: 'https://www.amway.com/find-an-ibo',
    category: 'Multi-Category',
    enabled: true,
    scrapeMethod: 'puppeteer',
    rateLimit: 10,
    notes: 'Largest MLM globally'
  },
  {
    name: 'Primerica',
    slug: 'primerica',
    baseUrl: 'https://www.primerica.com',
    repLocatorUrl: 'https://www.primerica.com/find-representative',
    category: 'Financial Services',
    enabled: true,
    scrapeMethod: 'puppeteer',
    rateLimit: 10,
    notes: 'Financial services MLM'
  },
  {
    name: 'Beachbody',
    slug: 'beachbody',
    baseUrl: 'https://www.beachbody.com',
    repLocatorUrl: null,
    category: 'Fitness',
    enabled: true,
    scrapeMethod: 'puppeteer',
    rateLimit: 10,
    notes: 'Fitness programs, now BODi'
  },
  {
    name: 'Pink Zebra',
    slug: 'pink-zebra',
    baseUrl: 'https://www.pinkzebrahome.com',
    repLocatorUrl: null,
    category: 'Home Fragrance',
    enabled: true,
    scrapeMethod: 'puppeteer',
    rateLimit: 10,
    notes: 'Soy-based fragrance'
  },
  {
    name: 'Traveling Vineyard',
    slug: 'traveling-vineyard',
    baseUrl: 'https://www.travelingvineyard.com',
    repLocatorUrl: null,
    category: 'Wine',
    enabled: true,
    scrapeMethod: 'puppeteer',
    rateLimit: 10,
    notes: 'Wine tasting parties'
  },
  {
    name: 'Epicure',
    slug: 'epicure',
    baseUrl: 'https://epicure.com',
    repLocatorUrl: null,
    category: 'Food & Spices',
    enabled: true,
    scrapeMethod: 'puppeteer',
    rateLimit: 10,
    notes: 'Spices and meal solutions'
  },
  {
    name: 'Damsel in Defense',
    slug: 'damsel-in-defense',
    baseUrl: 'https://www.damselindefense.net',
    repLocatorUrl: null,
    category: 'Safety Products',
    enabled: true,
    scrapeMethod: 'puppeteer',
    rateLimit: 10,
    notes: 'Personal safety products'
  }
];

// Get enabled companies
export function getEnabledCompanies(): CompanyConfig[] {
  return COMPANIES.filter(c => c.enabled);
}

// Get company by slug
export function getCompanyBySlug(slug: string): CompanyConfig | undefined {
  return COMPANIES.find(c => c.slug === slug);
}

// Get companies by category
export function getCompaniesByCategory(category: string): CompanyConfig[] {
  return COMPANIES.filter(c => c.category === category);
}

// Get all categories
export function getAllCategories(): string[] {
  return [...new Set(COMPANIES.map(c => c.category))];
}
