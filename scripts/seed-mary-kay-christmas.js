require('dotenv').config({ path: '../.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

const maryKayConsultants = [
    {
        "title": "Mary Kay Independent Beauty Consultant Corrina Warwick",
        "totalScore": 4.8,
        "reviewsCount": 5,
        "street": "209 Lakewood Terrace",
        "city": "Marshall",
        "state": "Wisconsin",
        "countryCode": "US",
        "website": "https://www.marykay.com/cwarwick",
        "phone": "(608) 334-4369",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Mary Kay Cosmetics Kathleen Koclanes",
        "totalScore": 5,
        "reviewsCount": 20,
        "street": "5005 Maher Ave",
        "city": "Madison",
        "state": "Wisconsin",
        "countryCode": "US",
        "website": "https://www.marykay.com/kkoclanes",
        "phone": "(608) 772-0847",
        "categoryName": "Consultant"
    },
    {
        "title": "Mary Kay Cosmetics Independent Consultant",
        "totalScore": 5,
        "reviewsCount": 1,
        "website": "https://www.marykay.com/crivera",
        "phone": "(954) 268-0702",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Mary Kay Independent Beauty Consultant, Courtney Penhallegon",
        "reviewsCount": 0,
        "street": "N Ellsworth Rd",
        "city": "Mesa",
        "state": "Arizona",
        "countryCode": "US",
        "phone": "(801) 669-7805",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Mary Kay Cosmetics | Maricela Rodriguez | Independent Sales Director",
        "totalScore": 5,
        "reviewsCount": 1,
        "website": "https://www.marykay.com/Marykayrodriguez09",
        "phone": "(425) 343-2896",
        "categoryName": "Cosmetics store"
    },
    {
        "title": "Cassie Johnson, Mary Kay Independent Beauty Consultant",
        "totalScore": 5,
        "reviewsCount": 11,
        "street": "12150 Sycamore St NW",
        "city": "Coon Rapids",
        "state": "Minnesota",
        "countryCode": "US",
        "website": "http://www.healthyskinplan.com/",
        "phone": "(763) 245-2243",
        "categoryName": "Health and beauty shop"
    },
    {
        "title": "Mary Kay Independent Beauty Consultant",
        "reviewsCount": 0,
        "street": "11200 Westheimer Rd",
        "city": "Houston",
        "state": "Texas",
        "countryCode": "US",
        "website": "https://marykayapp.page.link/ttMwTa9sRP7vvN9z6",
        "phone": "(832) 906-9871",
        "categoryName": "Make-up artist"
    },
    {
        "title": "Renee Robinson Independent Mary Kay Beauty Consultant",
        "totalScore": 5,
        "reviewsCount": 1,
        "street": "1010 E Elma St",
        "city": "Ontario",
        "state": "California",
        "countryCode": "US",
        "website": "http://marykay.com/reneerobinson2009",
        "phone": "(951) 282-0331",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Mary Kay Independent Beauty Consultant, April Scott",
        "totalScore": 5,
        "reviewsCount": 1,
        "website": "http://www.marykay.com/abeggrow",
        "phone": "(208) 863-9049",
        "categoryName": "Health and beauty shop"
    },
    {
        "title": "Cosmetics & Skincare with Erica- Mary Kay Independent Beauty Consultant",
        "totalScore": 5,
        "reviewsCount": 1,
        "website": "https://skincarewitherica.ueniweb.com/?utm_campaign=gmb",
        "phone": "(817) 363-0889",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Mary Kay Senior Independent Beauty Consultant",
        "reviewsCount": 0,
        "street": "6108 W Acoma Dr",
        "city": "Glendale",
        "state": "Arizona",
        "countryCode": "US",
        "website": "https://marykay.com/bsismilich",
        "phone": "(480) 522-5739",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Mary Kay Independent Sales Director - Alesia C. Dickerson",
        "totalScore": 5,
        "reviewsCount": 16,
        "street": "20810 Groveline Ct",
        "city": "Estero",
        "state": "Florida",
        "countryCode": "US",
        "phone": "(239) 738-2209",
        "categoryName": "Cosmetics industry"
    },
    {
        "title": "Mary Kay Independent Beauty Consultant",
        "reviewsCount": 0,
        "street": "4599 Alder Dr",
        "city": "Oakley",
        "state": "California",
        "countryCode": "US",
        "phone": "(925) 437-1167",
        "categoryName": "Beauty salon"
    },
    {
        "title": "Jane Geen | Mary Kay Independent Beauty Consultant",
        "totalScore": 5,
        "reviewsCount": 11,
        "street": "1355 Grebe Rd",
        "city": "Highland",
        "state": "Michigan",
        "countryCode": "US",
        "website": "http://www.marykay.com/JGeen",
        "phone": "(248) 318-8397",
        "categoryName": "Cosmetics industry"
    },
    {
        "title": "Anna Cole - Mary Kay Independent Beauty consultant",
        "totalScore": 5,
        "reviewsCount": 2,
        "street": "2323 Glenmoor Dr",
        "city": "Arlington",
        "state": "Texas",
        "countryCode": "US",
        "website": "https://www.marykay.com/AnnaCole",
        "phone": "(214) 984-0716",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "MaryKay Beauty Consultant",
        "reviewsCount": 0,
        "street": "171 E Alder St",
        "city": "Alsea",
        "state": "Oregon",
        "countryCode": "US",
        "website": "http://www.marykay.com/kimpruitt2014",
        "phone": "(541) 451-0376",
        "categoryName": "Cosmetics wholesaler"
    },
    {
        "title": "Mary Kay Independent Sales Consultant",
        "reviewsCount": 0,
        "website": "http://www.marykay.com/tracinelson",
        "phone": "(972) 523-7691",
        "categoryName": "Cosmetics industry"
    },
    {
        "title": "Mary Kay",
        "totalScore": 5,
        "reviewsCount": 1,
        "street": "397 Campbell Ave",
        "city": "West Haven",
        "state": "Connecticut",
        "countryCode": "US",
        "website": "http://www.marykay.com/mthomas81559",
        "phone": "(203) 671-5547",
        "categoryName": "Cosmetics store"
    },
    {
        "title": "Mary Kay",
        "reviewsCount": 0,
        "street": "Laurel St",
        "city": "Manchester",
        "state": "New Hampshire",
        "countryCode": "US",
        "website": "https://www.marykayintouch.com/jparris",
        "phone": "(603) 486-7732",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Mary Kay Cosmetics",
        "reviewsCount": 0,
        "street": "929 Main St",
        "city": "Melrose",
        "state": "Massachusetts",
        "countryCode": "US",
        "website": "http://www.marykay.com/carolmouradian",
        "phone": "(617) 823-1817",
        "categoryName": "Cosmetics store"
    },
    {
        "title": "Robin Janetos, Mary Kay Independent Beauty Consultant",
        "reviewsCount": 0,
        "street": "96 Varney Rd",
        "city": "Dover",
        "state": "New Hampshire",
        "countryCode": "US",
        "website": "http://www.marykay.com/rjanetos",
        "phone": "(480) 205-4897",
        "categoryName": "Beautician"
    },
    {
        "title": "Mary Kay with Tay, Independent Beauty Consultant",
        "totalScore": 5,
        "reviewsCount": 1,
        "website": "http://www.marykay.com/Sprice2025",
        "phone": "(631) 213-9618",
        "categoryName": "Cosmetics store"
    },
    {
        "title": "Enma Vasquez - Mary Kay Independent Beauty Consultant",
        "totalScore": 5,
        "reviewsCount": 4,
        "website": "http://www.marykay.com/evasquez",
        "phone": "(617) 564-1051",
        "categoryName": "Beauty supply store"
    },
    {
        "title": "Mary Kay by Allosene",
        "totalScore": 4.9,
        "reviewsCount": 20,
        "street": "773 Eastern Pkwy Apt 3d",
        "city": "Brooklyn",
        "state": "New York",
        "countryCode": "US",
        "website": "https://www.marykay.com/allosene",
        "phone": "(347) 523-2581",
        "categoryName": "Cosmetics store"
    },
    {
        "title": "Mary Kay Independent Beauty Consultant",
        "reviewsCount": 0,
        "street": "412 Pardee Blvd",
        "city": "Browns Mills",
        "state": "New Jersey",
        "countryCode": "US",
        "website": "http://www.marykay.com/Lkorch",
        "categoryName": "Skin care products vending machine"
    },
    {
        "title": "Marykay",
        "totalScore": 1,
        "reviewsCount": 1,
        "street": "826 Conklin St",
        "city": "Farmingdale",
        "state": "New York",
        "countryCode": "US",
        "phone": "(516) 350-4997",
        "categoryName": "Health and beauty shop"
    },
    {
        "title": "Marykay",
        "reviewsCount": 0,
        "street": "306 State St",
        "city": "Perth Amboy",
        "state": "New Jersey",
        "countryCode": "US",
        "phone": "(732) 672-6420",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Mary Kay consultora independiente en Boston Massachusetts",
        "reviewsCount": 0,
        "street": "20 Cambridge St",
        "city": "Revere",
        "state": "Massachusetts",
        "countryCode": "US",
        "phone": "(857) 258-1845",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Mary Kay",
        "reviewsCount": 0,
        "street": "28 S Hill Dr",
        "city": "Lempster",
        "state": "New Hampshire",
        "countryCode": "US",
        "website": "http://www.marykay.com/hcarter811",
        "phone": "(603) 723-0990",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Mary Kay Beauty Consultant-Jessica Black",
        "totalScore": 5,
        "reviewsCount": 5,
        "street": "1900 S 8th Ave",
        "city": "Maywood",
        "state": "Illinois",
        "countryCode": "US",
        "website": "http://marykay.com/JBcares4u",
        "phone": "(630) 474-2829",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Mary Kay Consultant",
        "totalScore": 5,
        "reviewsCount": 1,
        "street": "11332 S Marathon Ln",
        "city": "Plainfield",
        "state": "Illinois",
        "countryCode": "US",
        "website": "https://www.marykay.com/EIsac",
        "phone": "(307) 277-9736",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Agata Zienkiewicz Mary Kay consultant",
        "totalScore": 5,
        "reviewsCount": 1,
        "street": "Ridgewood Rd",
        "city": "Elk Grove Village",
        "state": "Illinois",
        "countryCode": "US",
        "website": "https://www.marykay.com/AZienkiewicz",
        "phone": "(773) 318-9535",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Trish Pacheco - Mary Kay Independent Beauty Consultant",
        "totalScore": 5,
        "reviewsCount": 18,
        "street": "3444 N Country Club Rd #100",
        "city": "Tucson",
        "state": "Arizona",
        "countryCode": "US",
        "website": "https://www.marykay.com/misstrishfig",
        "phone": "(520) 214-1139",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Mary Kay Independent Beauty Consultant, Chelsey DeBruin-Colbert",
        "totalScore": 5,
        "reviewsCount": 5,
        "street": "20450 E Ocotillo Rd",
        "city": "Queen Creek",
        "state": "Arizona",
        "countryCode": "US",
        "website": "http://www.marykay.com/cdebruin",
        "phone": "(641) 569-0611",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Veronica Boe, Mary Kay, Independent Sales Director",
        "totalScore": 5,
        "reviewsCount": 13,
        "street": "124 Spinnaker Way",
        "city": "Vallejo",
        "state": "California",
        "countryCode": "US",
        "website": "http://www.marykay.com/vboe",
        "phone": "(707) 853-5791",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Patricia's Mary Kay Skin Care For All",
        "totalScore": 5,
        "reviewsCount": 1,
        "street": "5135 Andrade Rd",
        "city": "Sunol",
        "state": "California",
        "countryCode": "US",
        "website": "http://www.marykay.com/pmcpicard",
        "phone": "(510) 579-4421",
        "categoryName": "Cosmetics store"
    },
    {
        "title": "Mary Kay Independent Beauty Consultant",
        "reviewsCount": 0,
        "website": "http://www.marykay.com/jsammons",
        "categoryName": "Cosmetics industry"
    },
    {
        "title": "Mary Kay Independent Beauty Consultant",
        "totalScore": 5,
        "reviewsCount": 1,
        "website": "https://www.marykay.com/Becky223",
        "phone": "(586) 337-1447",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Mary Kay Cosmetics Independent Consultant Misti Norfleet",
        "reviewsCount": 0,
        "website": "http://www.marykay.com/MistiDom",
        "phone": "(970) 691-8672",
        "categoryName": "Beauty products wholesaler"
    },
    {
        "title": "Mary Kay Independent Beauty Consultant",
        "totalScore": 5,
        "reviewsCount": 1,
        "website": "http://marykay.com/aalford",
        "phone": "(765) 656-9446",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Marykay Independent Consulrant",
        "reviewsCount": 0,
        "street": "7431 Micron Dr",
        "city": "San Antonio",
        "state": "Texas",
        "countryCode": "US",
        "website": "https://marykay.com/CarolBurton9876",
        "phone": "(210) 243-7038",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Mary Kay by Margot",
        "reviewsCount": 0,
        "street": "Penton Media Building, 1300 E 9th St",
        "city": "Cleveland",
        "state": "Ohio",
        "countryCode": "US",
        "website": "https://www.marykay.com/amwahdan/en-US/",
        "categoryName": "Health and beauty shop"
    },
    {
        "title": "Mary Kay Independent Sales Director & Beauty Consultant - Jenny Ludke",
        "totalScore": 5,
        "reviewsCount": 4,
        "street": "27804 E Mockingbird Dr",
        "city": "Flat Rock",
        "state": "Michigan",
        "countryCode": "US",
        "website": "http://www.marykay.com/jmaitland1",
        "phone": "(734) 508-5080",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "MaryKay Independent Beauty Consultant",
        "reviewsCount": 0,
        "street": "1393 County Rd 142",
        "city": "Jasper",
        "state": "Texas",
        "countryCode": "US",
        "website": "https://www.marykay.com/Amcmillan759",
        "phone": "(409) 200-8022",
        "categoryName": "Cosmetics industry"
    },
    {
        "title": "Olga Morrow - Mary Kay Independent Beauty Consultant",
        "totalScore": 5,
        "reviewsCount": 3,
        "street": "2634 Brea Canyon Rd",
        "city": "Fort Worth",
        "state": "Texas",
        "countryCode": "US",
        "website": "https://www.marykay.com/omorrow",
        "phone": "(817) 692-2184",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Mary Kay Global Headquarters",
        "totalScore": 4.8,
        "reviewsCount": 118,
        "street": "16251 Dallas Pkwy",
        "city": "Addison",
        "state": "Texas",
        "countryCode": "US",
        "website": "http://www.marykay.com/",
        "phone": "(800) 627-9529",
        "categoryName": "Corporate office"
    },
    {
        "title": "Marykay beauty consultant",
        "reviewsCount": 0,
        "street": "2661 Hawco Dr Apt 3212",
        "city": "Grand Prairie",
        "state": "Texas",
        "countryCode": "US",
        "website": "https://www.marykay.com/MAguilar9857",
        "phone": "(214) 790-6563",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Elizabeth reyes Consultora independiente de mary Kay",
        "reviewsCount": 0,
        "street": "8105 Edgewater Dr #200",
        "city": "Oakland",
        "state": "California",
        "countryCode": "US",
        "website": "http://www.marykay.com/EReyes333",
        "phone": "(510) 798-3819",
        "categoryName": "Make-up artist"
    },
    {
        "title": "Heather Richardson, Mary Kay Independent Beauty Consultant",
        "reviewsCount": 0,
        "street": "13625 Laurel St",
        "city": "Manito",
        "state": "Illinois",
        "countryCode": "US",
        "website": "http://www.marykay.com/hrichardson",
        "phone": "(309) 202-1773",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Mary Kay Independent Beauty Consultant",
        "totalScore": 5,
        "reviewsCount": 1,
        "phone": "(330) 617-2909",
        "categoryName": "Skin care clinic"
    },
    {
        "title": "Georgia Atwell- Mary Kay Independent Beauty Consultant",
        "totalScore": 5,
        "reviewsCount": 16,
        "website": "https://www.marykay.com/gatwell/en-US/",
        "phone": "(559) 903-0358",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Mary Kay Independent Beauty Consultant",
        "totalScore": 5,
        "reviewsCount": 1,
        "website": "https://marykay.com/HKWilliams",
        "phone": "(316) 841-9299",
        "categoryName": "Health and beauty shop"
    },
    {
        "title": "Mary Kay Beauty Consultant",
        "reviewsCount": 0,
        "street": "43866 Timberview Ct",
        "city": "Van Buren Township",
        "state": "Michigan",
        "countryCode": "US",
        "website": "http://www.marykay.com/DDBrooks927",
        "phone": "(734) 262-1892",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "KTD, Independent Mary Kay Beauty Consultant",
        "reviewsCount": 0,
        "street": "25 Rose St",
        "city": "Lancaster",
        "state": "New York",
        "countryCode": "US",
        "website": "https://www.mkunitapp.com/ktd/",
        "phone": "(716) 202-9901",
        "categoryName": "Skin care clinic"
    },
    {
        "title": "Krystyl Sank, Independent beauty consultant with Mary Kay cosmetics",
        "reviewsCount": 0,
        "street": "5848 Java Lake Rd",
        "city": "Arcade",
        "state": "New York",
        "countryCode": "US",
        "website": "http://www.marykay.com/kwachowski",
        "phone": "(716) 348-9553",
        "categoryName": "Store"
    },
    {
        "title": "Mary Kay W/Wanda Elaine Independent Beauty Consultant",
        "reviewsCount": 0,
        "website": "http://www.marykay.com/wmckinley8",
        "phone": "(512) 915-5842",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Independent Mary Kay Consultant;Kimeco Green",
        "reviewsCount": 0,
        "website": "https://www.marykay.com/kimecogreen",
        "phone": "(808) 782-5514",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Mary Kay Independent Beauty Consultant| TayShun Woods",
        "reviewsCount": 0,
        "website": "https://www.marykay.com/TWoods61443",
        "phone": "(816) 882-9626",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Mary Kay, Independent Beauty Consultant",
        "reviewsCount": 0,
        "street": "10108 N 142nd E Ave",
        "city": "Owasso",
        "state": "Oklahoma",
        "countryCode": "US",
        "phone": "(918) 407-4331",
        "categoryName": "Cosmetics store"
    },
    {
        "title": "Anny Randel - Independent Mary Kay Consultant",
        "reviewsCount": 0,
        "street": "1625 Larimer St #2703",
        "city": "Denver",
        "state": "Colorado",
        "countryCode": "US",
        "phone": "(970) 310-5689",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Mary Kay Independent Beauty Consultant",
        "reviewsCount": 0,
        "street": "BY APPOINTMENT ONLY, 5732 Golden Chase Ct",
        "city": "Las Vegas",
        "state": "Nevada",
        "countryCode": "US",
        "website": "https://www.marykay.com/shariunderhill",
        "phone": "(702) 400-6546",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Crystal Rich Mary Kay Independent Beauty Consultant",
        "totalScore": 5,
        "reviewsCount": 3,
        "website": "http://www.marykay.com/crichbeauty",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Jessica Galasso, Mary Kay Independent Beauty Consultant",
        "reviewsCount": 0,
        "street": "4d Laurinda Ln",
        "city": "Ballston Lake",
        "state": "New York",
        "countryCode": "US",
        "website": "http://marykay.com/jessgalasso",
        "phone": "(716) 913-5550",
        "categoryName": "Cosmetics store"
    },
    {
        "title": "Independent Beauty Consultant with Mary Kay",
        "reviewsCount": 0,
        "website": "http://www.marykay.com/becky.conway",
        "phone": "(936) 524-4603",
        "categoryName": "Cosmetics industry"
    },
    {
        "title": "Tammy Stedman - Mary Kay Independent Beauty Consultant",
        "totalScore": 5,
        "reviewsCount": 3,
        "website": "https://www.marykay.com/tstedman1",
        "phone": "(810) 252-4259",
        "categoryName": "Cosmetics industry"
    },
    {
        "title": "Mary Kay Beauty Consultant Debbie Reedy",
        "reviewsCount": 0,
        "street": "5496 Woodfall Rd",
        "city": "Village of Clarkston",
        "state": "Michigan",
        "countryCode": "US",
        "phone": "(248) 881-4737",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Elma Balboa, Mary Kay Independent Beauty Consultant",
        "totalScore": 4.4,
        "reviewsCount": 15,
        "street": "John B Oblinger Dr",
        "city": "El Paso",
        "state": "Texas",
        "countryCode": "US",
        "website": "http://www.marykay.com/ebalboa",
        "phone": "(915) 433-4483",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Susan Craven Independent Beauty Consultant Mary Kay Cosmetics",
        "totalScore": 5,
        "reviewsCount": 2,
        "website": "https://www.marykay.com/smcraven",
        "phone": "(915) 217-9980",
        "categoryName": "Cosmetics industry"
    },
    {
        "title": "Stephanie - Mary Kay Independent Beauty Consultant",
        "reviewsCount": 0,
        "street": "4707 Glenburne Dr",
        "city": "Spring Hill",
        "state": "Florida",
        "countryCode": "US",
        "website": "https://www.marykay.com/SteffeRae",
        "phone": "(740) 277-1702",
        "categoryName": "Cosmetics industry"
    },
    {
        "title": "Fredlaina Chatman Independent Mary Kay consultant",
        "reviewsCount": 0,
        "website": "https://www.marykay.com/CChatman80",
        "phone": "(803) 530-7671",
        "categoryName": "Skin care clinic"
    },
    {
        "title": "Mary Kay Beauty Consultant, Diane Carbajal",
        "totalScore": 5,
        "reviewsCount": 2,
        "street": "576 Malachite Ln",
        "city": "Chapin",
        "state": "South Carolina",
        "countryCode": "US",
        "website": "https://www.marykay.com/DianesBeautyBar",
        "phone": "(803) 973-2753",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Mary Kay consultant",
        "reviewsCount": 0,
        "street": "1022 Ninety Six Hwy",
        "city": "Greenwood",
        "state": "South Carolina",
        "countryCode": "US",
        "phone": "(864) 407-3175",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Chris Cartaya, Mary Kay Independent Beauty Consultant",
        "totalScore": 5,
        "reviewsCount": 6,
        "street": "606 Morrill Ct",
        "city": "Valrico",
        "state": "Florida",
        "countryCode": "US",
        "website": "http://www.marykay.com/ccartaya",
        "phone": "(813) 466-0613",
        "categoryName": "Skin care clinic"
    },
    {
        "title": "Mary Kay by Maria Rodriguez",
        "reviewsCount": 0,
        "website": "https://www.marykay.com/marodriguez8",
        "phone": "(646) 739-9208",
        "categoryName": "Cosmetics store"
    },
    {
        "title": "MaryKay Inc.",
        "totalScore": 5,
        "reviewsCount": 1,
        "street": "Lorton Station Blvd",
        "city": "Lorton",
        "state": "Virginia",
        "countryCode": "US",
        "website": "http://www.marykay.com/angelia",
        "phone": "(703) 814-6958",
        "categoryName": "Consultant"
    },
    {
        "title": "Pat Arnold - Mary Kay Independent Consultant",
        "totalScore": 5,
        "reviewsCount": 6,
        "website": "http://linktr.ee/pat.arnold",
        "phone": "(434) 238-5127",
        "categoryName": "Make-up artist"
    },
    {
        "title": "Mary Kay Beauty Consultant Claudia Flores. Hablo Español",
        "totalScore": 5,
        "reviewsCount": 5,
        "street": "1231 S Oak Park Ave",
        "city": "Berwyn",
        "state": "Illinois",
        "countryCode": "US",
        "website": "https://www.marykay.com/cfloresbeautyselfcare",
        "phone": "(708) 595-1845",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Elizabeth Alvarez Mary Kay Consultant",
        "totalScore": 5,
        "reviewsCount": 4,
        "street": "4950 W Irving Park Rd",
        "city": "Chicago",
        "state": "Illinois",
        "countryCode": "US",
        "website": "https://www.marykay.com/yalvarez2",
        "phone": "(773) 501-6367",
        "categoryName": "Consultant"
    },
    {
        "title": "Elizabeth Mendez Mary Kay",
        "reviewsCount": 0,
        "street": "6932 Riverside Dr",
        "city": "Berwyn",
        "state": "Illinois",
        "countryCode": "US",
        "website": "https://www.marykay.com/EMendezRivera",
        "phone": "(708) 996-2435",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Mary Kay Independent Consultant",
        "reviewsCount": 0,
        "street": "12274 S Shannan Ln",
        "city": "Olathe",
        "state": "Kansas",
        "countryCode": "US",
        "website": "http://www.marykay.com/fphillips2",
        "categoryName": "Cosmetics store"
    },
    {
        "title": "Brittany Boose-Mary Kay Independent Consultant",
        "reviewsCount": 0,
        "website": "https://www.marykay.com/BBoose",
        "categoryName": "Cosmetics store"
    },
    {
        "title": "MARY KAY",
        "totalScore": 5,
        "reviewsCount": 1,
        "street": "5884 Leesburg Pike",
        "city": "Falls Church",
        "state": "Virginia",
        "countryCode": "US",
        "website": "https://www.marykay.com/",
        "phone": "(551) 231-2150",
        "categoryName": "Beauty products wholesaler"
    },
    {
        "title": "Mary Kay Sales Director, Anna Sempeles",
        "reviewsCount": 0,
        "street": "5082 Twinbrook Run Dr",
        "city": "Fairfax",
        "state": "Virginia",
        "countryCode": "US",
        "phone": "(571) 225-1710",
        "categoryName": "Cosmetics store"
    },
    {
        "title": "Vickie Coates Mary Kay Consultant",
        "totalScore": 5,
        "reviewsCount": 2,
        "website": "https://www.marykay.com/vickiecoates",
        "phone": "(240) 432-2739",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Mary Kay Sales Director, Marty Beach",
        "reviewsCount": 0,
        "street": "5345 Black Oak Dr",
        "city": "Fairfax",
        "state": "Virginia",
        "countryCode": "US",
        "website": "https://www.marykay.com/mbeach",
        "phone": "(703) 927-9341",
        "categoryName": "Cosmetics store"
    },
    {
        "title": "Mary Kay Cosmetics, Lori Hawthorne, - Sales Director",
        "reviewsCount": 0,
        "street": "56 Morningside Dr",
        "city": "St Paul",
        "state": "Minnesota",
        "countryCode": "US",
        "website": "https://www.marykay.com/lhawthorne",
        "phone": "(651) 485-1566",
        "categoryName": "Cosmetics industry"
    },
    {
        "title": "Mary Kay Independent Beauty Consultant",
        "totalScore": 5,
        "reviewsCount": 1,
        "street": "1103 Mockingbird Ln",
        "city": "Carterville",
        "state": "Illinois",
        "countryCode": "US",
        "website": "http://www.marykay.com/sabrina.stewart",
        "phone": "(618) 713-5813",
        "categoryName": "Health and beauty shop"
    },
    {
        "title": "Becky Conway - Independent Beauty Consultant - Mary Kay",
        "totalScore": 5,
        "reviewsCount": 2,
        "street": "9181 Narcille St",
        "city": "Conroe",
        "state": "Texas",
        "countryCode": "US",
        "website": "http://www.marykay.com/becky.conway",
        "phone": "(936) 524-4603",
        "categoryName": "Cosmetics store"
    },
    {
        "title": "Cordell Harding Mary Kay Independent Consultant",
        "reviewsCount": 0,
        "street": "3800, 1043 N Camp Creek Pkwy SW BLDG 1400-116",
        "city": "Atlanta",
        "state": "GA",
        "countryCode": "US",
        "website": "http://marykay.com/charding777",
        "phone": "(321) 947-8525",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Mary Kay Sales Director-Heather Daniel-Kent",
        "totalScore": 5,
        "reviewsCount": 3,
        "website": "https://marykay.com/heatherdaniel",
        "phone": "(816) 215-5350",
        "categoryName": "Cosmetics store"
    },
    {
        "title": "Veronica Espinoza- Mary Kay Independent Beauty Consultant",
        "totalScore": 5,
        "reviewsCount": 3,
        "website": "https://www.marykay.com/VMarie53",
        "phone": "(281) 871-8068",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Mary Kay Lupita Rabago",
        "totalScore": 1,
        "reviewsCount": 1,
        "street": "213 W B St",
        "city": "Ontario",
        "state": "California",
        "countryCode": "US",
        "website": "http://www.marykay.com/grabago",
        "phone": "(909) 614-9578",
        "categoryName": "Beauty products wholesaler"
    },
    {
        "title": "Diane Kuciel, Mary Kay Beauty Consultant",
        "reviewsCount": 0,
        "street": "4200 Lake Shore Rd",
        "city": "Hamburg",
        "state": "New York",
        "countryCode": "US",
        "website": "http://www.marykay.com/dianekuciel",
        "phone": "(716) 807-8808",
        "categoryName": "Cosmetics industry"
    },
    {
        "title": "Mary Kay Independent Beauty Consultant",
        "reviewsCount": 0,
        "street": "2824 Ridge Rd",
        "city": "Shenandoah Junction",
        "state": "West Virginia",
        "countryCode": "US",
        "website": "http://www.marykay.com/kaz",
        "phone": "(304) 279-3175",
        "categoryName": "Skin care products vending machine"
    },
    {
        "title": "Teresa Bailey Independent Mary Kay Consultant",
        "totalScore": 5,
        "reviewsCount": 2,
        "street": "7507 Mac Arthur Ln",
        "city": "Portage",
        "state": "Michigan",
        "countryCode": "US",
        "website": "https://www.marykay.com/tbailey82022",
        "phone": "(269) 352-7781",
        "categoryName": "Skin care products vending machine"
    },
    {
        "title": "Kimberly Brown Independent Mary Kay Consultant",
        "reviewsCount": 0,
        "street": "912 Wheaton Ave",
        "city": "Kalamazoo",
        "state": "Michigan",
        "countryCode": "US",
        "phone": "(269) 998-8189",
        "categoryName": "Business networking company"
    },
    {
        "title": "Laura A Mary Kay Ind Beauty Consultant",
        "reviewsCount": 0,
        "street": "419 Hastings Dr",
        "city": "Cranberry Twp",
        "state": "Pennsylvania",
        "countryCode": "US",
        "website": "https://www.marykay.com/Lasseff",
        "phone": "(724) 453-4772",
        "categoryName": "Cosmetics industry"
    },
    {
        "title": "Independent Beauty Consultant - Rachael Nowicki",
        "reviewsCount": 0,
        "street": "6603 Burdick Rd",
        "city": "Mayville",
        "state": "New York",
        "countryCode": "US",
        "website": "http://www.marykay.com/rnowicki",
        "phone": "(716) 237-0078",
        "categoryName": "Beauty supply store"
    },
    {
        "title": "ZAYRA'S MARY KAY - Independent Beauty Consultant",
        "totalScore": 1,
        "reviewsCount": 1,
        "street": "1010 S Church St",
        "city": "Smithfield",
        "state": "Virginia",
        "countryCode": "US",
        "website": "https://www.marykay.com/zayra",
        "categoryName": "Beauty product supplier"
    },
    {
        "title": "Marykay independent consultant",
        "totalScore": 1,
        "reviewsCount": 2,
        "street": "154 Kosciuszko St",
        "city": "Buffalo",
        "state": "New York",
        "countryCode": "US",
        "website": "http://www.marykay.com/ebonyRobinson",
        "phone": "(347) 779-5960",
        "categoryName": "Skin care products vending machine"
    }
];

// Helper function to extract name from title
function extractName(title) {
    // Clean up the title
    let cleanTitle = title
        .replace(/Mary Kay|MaryKay/gi, '')
        .replace(/Independent|Beauty|Consultant|Cosmetics|Inc\.|Senior|Sales Director|\/|,/gi, ' ')
        .replace(/\s+/g, ' ')
        .trim();

    // Extract the most likely name
    const parts = cleanTitle.split(' ').filter(p => p && p.length > 1);

    if (parts.length >= 2) {
        return {
            first_name: parts[0].substring(0, 30),
            last_name: parts.slice(1).join(' ').substring(0, 30)
        };
    } else if (parts.length === 1) {
        return {
            first_name: parts[0].substring(0, 30),
            last_name: 'MK Consultant'
        };
    } else {
        return null;
    }
}

// Helper to get state abbreviation
function getStateAbbr(state) {
    if (!state) return null;
    if (state.length === 2) return state.toUpperCase();

    const states = {
        'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR',
        'California': 'CA', 'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE',
        'Florida': 'FL', 'Georgia': 'GA', 'Hawaii': 'HI', 'Idaho': 'ID',
        'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA', 'Kansas': 'KS',
        'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
        'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS',
        'Missouri': 'MO', 'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV',
        'New Hampshire': 'NH', 'New Jersey': 'NJ', 'New Mexico': 'NM', 'New York': 'NY',
        'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH', 'Oklahoma': 'OK',
        'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
        'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT',
        'Vermont': 'VT', 'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV',
        'Wisconsin': 'WI', 'Wyoming': 'WY', 'GA': 'GA'
    };

    return states[state] || state.substring(0, 2).toUpperCase();
}

async function seedMaryKayConsultants() {
    console.log('🎄 MARY KAY CHRISTMAS! Starting import of 100+ consultants...\n');

    // Get Mary Kay company
    const { data: company, error: companyError } = await supabase
        .from('companies')
        .select('id')
        .eq('slug', 'mary-kay')
        .single();

    if (companyError || !company) {
        console.error('❌ Mary Kay company not found:', companyError);
        return;
    }

    console.log(`✅ Found Mary Kay company ID: ${company.id}\n`);

    let successCount = 0;
    let errorCount = 0;
    let skippedCount = 0;

    for (let i = 0; i < maryKayConsultants.length; i++) {
        const consultant = maryKayConsultants[i];

        try {
            // Skip Mary Kay HQ
            if (consultant.title.includes('Global Headquarters')) {
                console.log(`⏭️  Skipping HQ`);
                skippedCount++;
                continue;
            }

            const name = extractName(consultant.title);
            if (!name) {
                console.log(`⏭️  Skipping ${consultant.title} - couldn't extract name`);
                skippedCount++;
                continue;
            }

            const stateAbbr = getStateAbbr(consultant.state);
            const timestamp = Date.now() + i; // Unique timestamp
            const email = `${name.first_name.toLowerCase().replace(/[^a-z0-9]/g, '')}.${name.last_name.toLowerCase().replace(/[^a-z0-9]/g, '')}.${timestamp}@marykay.temp`;

            // Create auth user
            const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
                email: email,
                email_confirm: true,
                user_metadata: {
                    first_name: name.first_name,
                    last_name: name.last_name
                }
            });

            if (authError) {
                console.error(`❌ ${name.first_name} ${name.last_name}:`, authError.message);
                errorCount++;
                continue;
            }

            // Update profile
            const { error: profileError } = await supabase
                .from('profiles')
                .update({
                    bio: consultant.categoryName || null,
                    city: consultant.city || null,
                    state: stateAbbr,
                    personal_website_url: consultant.website || null
                })
                .eq('id', authUser.user.id);

            if (profileError) {
                console.error(`❌ Profile update failed:`, profileError.message);
                errorCount++;
                continue;
            }

            // Link to Mary Kay
            const { error: repError } = await supabase
                .from('rep_companies')
                .insert({
                    rep_id: authUser.user.id,
                    company_id: company.id
                });

            if (repError) {
                console.error(`❌ Rep link failed:`, repError.message);
                errorCount++;
                continue;
            }

            console.log(`✅ ${name.first_name} ${name.last_name} from ${consultant.city || 'Unknown'}, ${stateAbbr || 'N/A'}${consultant.totalScore ? ` (⭐ ${consultant.totalScore})` : ''}`);
            successCount++;

            // Rate limiting
            await new Promise(resolve => setTimeout(resolve, 100));

        } catch (error) {
            console.error(`❌ Unexpected error:`, error.message);
            errorCount++;
        }
    }

    console.log('\n🎅 MARY KAY CHRISTMAS SUMMARY:');
    console.log(`✅ Successfully imported: ${successCount} consultants`);
    console.log(`⏭️  Skipped: ${skippedCount}`);
    console.log(`❌ Errors: ${errorCount}`);
    console.log(`\n🎄 Total new Mary Kay pages for SEO: ${successCount}!`);
    console.log('🎁 Perfect timing with the 90K/month blog post!\n');
}

seedMaryKayConsultants().catch(console.error);
