require('dotenv').config({ path: '../.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client with service role key for admin operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const rawConsultants = [
  {
    "title": "The Pampered Chef",
    "totalScore": 5,
    "reviewsCount": 2,
    "street": "209 W Jackson Blvd",
    "city": "Chicago",
    "state": "Illinois",
    "countryCode": "US",
    "website": "http://www.pamperedchef.com/",
    "phone": "(630) 261-8900",
    "categoryName": "Corporate office",
    "url": "https://www.google.com/maps/search/?api=1&query=The%20Pampered%20Chef&query_place_id=ChIJY5dxoIStD4gRv2NWJ0PGnhY"
  },
  {
    "title": "pampered chef",
    "reviewsCount": 0,
    "street": "9623 Mia Ln",
    "city": "Pasco",
    "state": "Washington",
    "countryCode": "US",
    "website": "https://www.pamperedchef.biz/grandmajudy",
    "phone": "(509) 539-0574",
    "categoryName": "Kitchen supply store",
    "url": "https://www.google.com/maps/search/?api=1&query=pampered%20chef&query_place_id=ChIJS9G6UDV7mFQRTuZFvTmnMxI"
  },
  {
    "title": "Pampered Chef with Lilly Norris",
    "reviewsCount": 0,
    "phone": "(541) 729-6802",
    "categoryName": "Kitchen supply store",
    "url": "https://www.google.com/maps/search/?api=1&query=Pampered%20Chef%20with%20Lilly%20Norris&query_place_id=ChIJFWKwHBoxwVQRCT0xG4DomoU"
  },
  {
    "title": "Tamara's Pampered Chef",
    "reviewsCount": 0,
    "website": "https://www.pamperedchef.com/pws/ttebbetts",
    "phone": "(951) 956-5272",
    "categoryName": "Kitchen supply store",
    "url": "https://www.google.com/maps/search/?api=1&query=Tamara's%20Pampered%20Chef&query_place_id=ChIJ2_duvEGf3IARGJP3D3ryF40"
  },
  {
    "title": "Pampered Chef",
    "reviewsCount": 0,
    "website": "http://www.pamperedchef.com/pws/debbzgoodies",
    "phone": "(678) 429-1321",
    "categoryName": "Kitchen supply store",
    "url": "https://www.google.com/maps/search/?api=1&query=Pampered%20Chef&query_place_id=ChIJCed5EuK59YgR5V_xoKZu5QI"
  },
  {
    "title": "Shop Pampered Chef with Penney",
    "totalScore": 5,
    "reviewsCount": 7,
    "street": "174 Rolling Ridge Rd",
    "city": "Fairfield",
    "state": "Connecticut",
    "countryCode": "US",
    "website": "https://www.pamperedchef.com/pws/chefpenney",
    "categoryName": "Kitchen supply store",
    "url": "https://www.google.com/maps/search/?api=1&query=Shop%20Pampered%20Chef%20with%20Penney&query_place_id=ChIJr-Vjn4AP6IkRD02XYVLiYNw"
  },
  {
    "title": "Pampered Chef: Irma Rodriguez",
    "reviewsCount": 0,
    "website": "https://www.pamperedchef.com/pws/irmarod",
    "phone": "(956) 457-4255",
    "categoryName": "Kitchen supply store",
    "url": "https://www.google.com/maps/search/?api=1&query=Pampered%20Chef%3A%20Irma%20Rodriguez&query_place_id=ChIJ4duaQK4-2CIR-Kn0JtIfwtI"
  },
  {
    "title": "Pampered Chef Independent Consultant",
    "reviewsCount": 0,
    "street": "715 Soundside Dr",
    "city": "Wilmington",
    "state": "North Carolina",
    "countryCode": "US",
    "phone": "(910) 471-4159",
    "categoryName": "Kitchen supply store",
    "url": "https://www.google.com/maps/search/?api=1&query=Pampered%20Chef%20Independent%20Consultant&query_place_id=ChIJs2orZpH5qYkRKbbcgqWbiHg"
  },
  {
    "title": "Pampered Chef - Making Cooking Easy",
    "reviewsCount": 0,
    "website": "https://www.pamperedchef.com/pws/ksidenstecker",
    "phone": "(989) 915-2204",
    "categoryName": "Kitchen supply store",
    "url": "https://www.google.com/maps/search/?api=1&query=Pampered%20Chef%20-%20Making%20Cooking%20Easy&query_place_id=ChIJ7wSfQyRoq4YRALgf9-ikN_8"
  },
  {
    "title": "Shop Pampered Chef with Molly",
    "totalScore": 5,
    "reviewsCount": 2,
    "street": null,
    "city": "Milford",
    "state": "Connecticut",
    "countryCode": "US",
    "website": "http://www.pamperedchef.com/pws/pcmollyp",
    "categoryName": "Kitchen supply store",
    "url": "https://www.google.com/maps/search/?api=1&query=Shop%20Pampered%20Chef%20with%20Molly&query_place_id=ChIJicWsiIhz56cRsQe-9HfS9t4"
  },
  {
    "title": "FamilyStyle: Pampered Chef Consultant",
    "reviewsCount": 0,
    "website": "https://www.pamperedchef.com/pws/familystyle",
    "categoryName": "Kitchen supply store",
    "url": "https://www.google.com/maps/search/?api=1&query=FamilyStyle%3A%20Pampered%20Chef%20Consultant&query_place_id=ChIJOfHvlKO7D4gRxizJHMpJUbo"
  },
  {
    "title": "Pampered Chef Indep Consultant Laura Hutchison",
    "reviewsCount": 0,
    "street": "1132 Monroe Dr",
    "city": "Bartlett",
    "state": "Illinois",
    "countryCode": "US",
    "website": "http://pamperedchef.com/pws/laurahutch",
    "phone": "(630) 580-1630",
    "categoryName": "Home goods store",
    "url": "https://www.google.com/maps/search/?api=1&query=Pampered%20Chef%20Indep%20Consultant%20Laura%20Hutchison&query_place_id=ChIJ8QmWw58BD4gRR_9XrAHYltA"
  },
  {
    "title": "Pampered Chef by Josie",
    "reviewsCount": 0,
    "website": "/url?q=https://www.pamperedchef.com/pws/josieplyman&opi=79508299&sa=U&ved=0ahUKEwj0oOuYnqWRAxWkrokEHds2O24Q61gIrgIoBA&usg=AOvVaw0wJhF1iWIad3Rb0uWDijJp",
    "phone": "(304) 657-0952",
    "categoryName": "Kitchen supply store",
    "url": "https://www.google.com/maps/search/?api=1&query=Pampered%20Chef%20by%20Josie&query_place_id=ChIJsc0ZD9CHpiwRFHmMjnpDA54"
  },
  {
    "title": "Julie Remer Pampered Chef",
    "reviewsCount": 0,
    "street": "1095 Venetian Way",
    "city": "Columbus",
    "state": "Ohio",
    "countryCode": "US",
    "categoryName": "Home goods store",
    "url": "https://www.google.com/maps/search/?api=1&query=Julie%20Remer%20Pampered%20Chef&query_place_id=ChIJr0RNBQBhOIgRtVOjq7Hy__o"
  },
  {
    "title": "Independent Pampered Chef Consultant",
    "reviewsCount": 0,
    "website": "/url?q=https://www.pamperedchef.com/pws/lsedam&opi=79508299&sa=U&ved=0ahUKEwj0oOuYnqWRAxWkrokEHds2O24Q61gI5AIoBA&usg=AOvVaw0Hg41-6IZyvFD-3RXWjqR9",
    "phone": "(509) 240-4879",
    "categoryName": "Kitchen supply store",
    "url": "https://www.google.com/maps/search/?api=1&query=Independent%20Pampered%20Chef%20Consultant&query_place_id=ChIJrwCIyXlDolQRr4rhSGtGvUA"
  },
  {
    "title": "Kelly Taylor - Pampered Chef",
    "reviewsCount": 0,
    "street": "16179 Port of Nantucket Dr",
    "city": "Grover",
    "state": "Missouri",
    "countryCode": "US",
    "website": "https://www.pamperedchef.com/pws/ktaylor16",
    "phone": "(314) 562-2429",
    "categoryName": "Kitchen supply store",
    "url": "https://www.google.com/maps/search/?api=1&query=Kelly%20Taylor%20-%20Pampered%20Chef&query_place_id=ChIJHX-HxWMr2YcRWTaANrBvQIk"
  },
  {
    "title": "Pampered Chef with Mandy Heneisen",
    "totalScore": 5,
    "reviewsCount": 1,
    "street": "1204 Pinewood Dr",
    "city": "Pacific",
    "state": "Missouri",
    "countryCode": "US",
    "website": "https://www.pamperedchef.com/pws/mandyheneisen",
    "phone": "(636) 926-6144",
    "categoryName": "Kitchen supply store",
    "url": "https://www.google.com/maps/search/?api=1&query=Pampered%20Chef%20with%20Mandy%20Heneisen&query_place_id=ChIJfYbEVrg72YcR9TPXafL6jl8"
  },
  {
    "title": "A Country Gal's Kitchen - Pampered Chef",
    "reviewsCount": 0,
    "website": "http://www.pamperedchef.com/pws/mistydmcfarlane",
    "phone": "(580) 230-8453",
    "categoryName": "Kitchen supply store",
    "url": "https://www.google.com/maps/search/?api=1&query=A%20Country%20Gal's%20Kitchen%20-%20Pampered%20Chef&query_place_id=ChIJwS2sUPUhtIcRqAOn9KDSL5Y"
  },
  {
    "title": "Pampered Chef independent Consultant Scott Backus",
    "reviewsCount": 0,
    "website": "https://www.pamperedchef.com/pws/scottcooks",
    "phone": "(425) 463-9842",
    "categoryName": "Knit shop",
    "url": "https://www.google.com/maps/search/?api=1&query=Pampered%20Chef%20independent%20Consultant%20Scott%20Backus&query_place_id=ChIJF8Nk3PQpimwRosETw6RN-Xs"
  },
  {
    "title": "Pampered Chef with Janelle",
    "reviewsCount": 0,
    "website": "https://www.pamperedchef.com/pws/jhoatson/",
    "categoryName": "Kitchen supply store",
    "url": "https://www.google.com/maps/search/?api=1&query=Pampered%20Chef%20with%20Janelle&query_place_id=ChIJ1UPGyBKWryIRcEk1VHnytNA"
  },
  {
    "title": "Pampered chef",
    "totalScore": 5,
    "reviewsCount": 1,
    "street": "17 Parham Ln",
    "city": "Summerville",
    "state": "Georgia",
    "countryCode": "US",
    "website": "https://www.pamperedchef.com/",
    "phone": "(706) 676-0500",
    "categoryName": "Kitchen supply store",
    "url": "https://www.google.com/maps/search/?api=1&query=Pampered%20chef&query_place_id=ChIJtTruISMnYIgR5-yLgzlRlWQ"
  },
  {
    "title": "Joanna Acker Pampered Chef Consultant",
    "totalScore": 3,
    "reviewsCount": 2,
    "website": "http://www.pamperedchef.com/pws/pcjoanna",
    "phone": "(256) 682-0338",
    "categoryName": "Kitchen supply store",
    "url": "https://www.google.com/maps/search/?api=1&query=Joanna%20Acker%20Pampered%20Chef%20Consultant&query_place_id=ChIJV1eM7qhoYogRBCZDU4cS5Ms"
  },
  {
    "title": "Cooking With Barbara - Pampered Chef Consultant",
    "totalScore": 5,
    "reviewsCount": 5,
    "website": "https://www.facebook.com/CookingWithBarbaraPamperedChef",
    "phone": "(919) 426-5824",
    "categoryName": "Kitchen supply store",
    "url": "https://www.google.com/maps/search/?api=1&query=Cooking%20With%20Barbara%20-%20Pampered%20Chef%20Consultant&query_place_id=ChIJsTRgbUVOrIkRIUIzMo65qIs"
  },
  {
    "title": "Pampered Chef",
    "reviewsCount": 0,
    "street": "700 Lucas St",
    "city": "Erwin",
    "state": "North Carolina",
    "countryCode": "US",
    "website": "https://www.pamperedchef.com/pws/vhornsby",
    "phone": "(910) 876-4746",
    "categoryName": "Home goods store",
    "url": "https://www.google.com/maps/search/?api=1&query=Pampered%20Chef&query_place_id=ChIJWYV64oV_q4kRk1X7kWFwNG4"
  },
  {
    "title": "Robbie Thompson Pampered Chef Consultant",
    "reviewsCount": 0,
    "website": "https://www.pamperedchef.com/pws/rthompson75",
    "phone": "(702) 542-5475",
    "categoryName": "Kitchen supply store",
    "url": "https://www.google.com/maps/search/?api=1&query=Robbie%20Thompson%20Pampered%20Chef%20Consultant&query_place_id=ChIJbdbGr7XPyIARdNCfpSQnDBc"
  },
  {
    "title": "Pampered Chef with Jeanne Cherne",
    "reviewsCount": 0,
    "website": "http://www.pamperedchef.com/pws/jcherne",
    "phone": "(425) 773-3087",
    "categoryName": "Kitchen supply store",
    "url": "https://www.google.com/maps/search/?api=1&query=Pampered%20Chef%20with%20Jeanne%20Cherne&query_place_id=ChIJn7T_rRLipisR_qpCQHHLsyA"
  },
  {
    "title": "Pampered Chef by Donna",
    "totalScore": 1,
    "reviewsCount": 1,
    "website": "http://www.pamperedchef.com/pws/dnunn",
    "phone": "(862) 254-6047",
    "categoryName": "Kitchen supply store",
    "url": "https://www.google.com/maps/search/?api=1&query=Pampered%20Chef%20by%20Donna&query_place_id=ChIJ9SiL1xBmHSoR4-R6-yb5euI"
  },
  {
    "title": "Nikki Ilgen, Independent Consultant for Pampered Chef",
    "reviewsCount": 0,
    "street": "404 Portland Dr SW",
    "city": "Willmar",
    "state": "Minnesota",
    "countryCode": "US",
    "website": "https://www.pamperedchef.com/pws/nilgen",
    "phone": "(320) 905-5668",
    "categoryName": "Kitchen supply store",
    "url": "https://www.google.com/maps/search/?api=1&query=Nikki%20Ilgen%2C%20Independent%20Consultant%20for%20Pampered%20Chef&query_place_id=ChIJW7JCGjxZtVIRyYhMfeCB1yw"
  },
  {
    "title": "Vernae Larsen, independent pampered chef consultant",
    "reviewsCount": 0,
    "street": "8943 Long Lake Rd",
    "city": "Spicer",
    "state": "Minnesota",
    "countryCode": "US",
    "website": "http://www.pamperedchef.biz/vernaelarsen",
    "phone": "(320) 212-6786",
    "categoryName": "Kitchen supply store",
    "url": "https://www.google.com/maps/search/?api=1&query=Vernae%20Larsen%2C%20independent%20pampered%20chef%20consultant&query_place_id=ChIJbTV2TUBntVIRtAVMcQ6JZfs"
  },
  {
    "title": "Heart-Full Woman with Jessica Lee, featuring Pampered Chef",
    "totalScore": 5,
    "reviewsCount": 1,
    "website": "https://heartfullwoman.com/links",
    "phone": "(605) 636-2151",
    "categoryName": "Kitchen supply store",
    "url": "https://www.google.com/maps/search/?api=1&query=Heart-Full%20Woman%20with%20Jessica%20Lee%2C%20featuring%20Pampered%20Chef&query_place_id=ChIJfeokhMzliIcRwAffyCaOmn0"
  },
  {
    "title": "Laura Quiggle, Independent Pampered Chef Consultant",
    "totalScore": 5,
    "reviewsCount": 1,
    "website": "http://www.facebook.com/LauraQuiggle.PamperedChef",
    "phone": "(440) 637-3992",
    "categoryName": "Kitchen supply store",
    "url": "https://www.google.com/maps/search/?api=1&query=Laura%20Quiggle%2C%20Independent%20Pampered%20Chef%20Consultant&query_place_id=ChIJFx0nrfChf4QRDa_6wxkZ4bk"
  },
  {
    "title": "Pampered Chef with Roseanna W.",
    "reviewsCount": 0,
    "website": "https://pamperedchef.com/pws/kitchen123",
    "categoryName": "Kitchen supply store",
    "url": "https://www.google.com/maps/search/?api=1&query=Pampered%20Chef%20with%20Roseanna%20W.&query_place_id=ChIJJzJgoG8uCGgR176177nh_b0"
  },
  {
    "title": "Robbin Bocchini Pampered Chef Consultant",
    "totalScore": 5,
    "reviewsCount": 3,
    "website": "https://www.pamperedchef.com/pws/rbocchini",
    "phone": "(559) 213-2682",
    "categoryName": "Kitchen supply store",
    "url": "https://www.google.com/maps/search/?api=1&query=Robbin%20Bocchini%20Pampered%20Chef%20Consultant&query_place_id=ChIJf_QOyKBtlIARLlRb0X9nbSU"
  },
  {
    "title": "Pampered Chef Independent Consultant - Michele K",
    "reviewsCount": 0,
    "website": "https://www.pamperedchef.com/pws/mkirschenbaum/",
    "phone": "(626) 803-1001",
    "categoryName": "Kitchen supply store",
    "url": "https://www.google.com/maps/search/?api=1&query=Pampered%20Chef%20Independent%20Consultant%20-%20Michele%20K&query_place_id=ChIJGUmuGgairk4Rqu5jpppZb48"
  },
  {
    "title": "Revitalize My Kitchen, Pampered Chef with Rachel",
    "totalScore": 1,
    "reviewsCount": 1,
    "website": "http://www.pamperedchef.com/pws/revitalizemykitchen",
    "categoryName": "Kitchen supply store",
    "url": "https://www.google.com/maps/search/?api=1&query=Revitalize%20My%20Kitchen%2C%20Pampered%20Chef%20with%20Rachel&query_place_id=ChIJie7IFlYzwYkRevk1acvNxvU"
  },
  {
    "title": "Pampered Chef with Caryn Pollock, Independent Executive Consultant",
    "totalScore": 5,
    "reviewsCount": 15,
    "street": "3786 E Brandon Way",
    "city": "Doylestown",
    "state": "Pennsylvania",
    "countryCode": "US",
    "website": "http://www.pamperedchef.biz/carynpollock",
    "phone": "(917) 929-6745",
    "categoryName": "Kitchen supply store",
    "url": "https://www.google.com/maps/search/?api=1&query=Pampered%20Chef%20with%20Caryn%20Pollock%2C%20Independent%20Executive%20Consultant&query_place_id=ChIJ82gDQq0DxIkRoqFNZUV7JQw"
  },
  {
    "title": "Gretchen's Gourmet Pampered Chef",
    "reviewsCount": 0,
    "street": "7 Whitby Ct",
    "city": "Hockessin",
    "state": "Delaware",
    "countryCode": "US",
    "website": "https://www.pamperedchef.biz/gretchensgourmet",
    "phone": "(302) 388-4762",
    "categoryName": "Kitchen supply store",
    "url": "https://www.google.com/maps/search/?api=1&query=Gretchen's%20Gourmet%20Pampered%20Chef&query_place_id=ChIJqynEK6n_xokRzrHRjKunj4Q"
  },
  {
    "title": "Pampered Chef with Caryn Donah",
    "totalScore": 4.7,
    "reviewsCount": 15,
    "street": "34 Coldevin Rd",
    "city": "Clark",
    "state": "New Jersey",
    "countryCode": "US",
    "website": "https://www.pamperedchef.com/pws/caryndonah",
    "phone": "(908) 279-2778",
    "categoryName": "Kitchen supply store",
    "url": "https://www.google.com/maps/search/?api=1&query=Pampered%20Chef%20with%20Caryn%20Donah&query_place_id=ChIJQXEE4pOzw4kRYOrSWRo31xw"
  },
  {
    "title": "MHeincelman3 Pampered Chef",
    "totalScore": 5,
    "reviewsCount": 2,
    "website": "http://www.pamperedchef.com/pws/mheincelman3",
    "phone": "(619) 992-4883",
    "categoryName": "Food products supplier",
    "url": "https://www.google.com/maps/search/?api=1&query=MHeincelman3%20Pampered%20Chef&query_place_id=ChIJ5Wo_HtMtW4YRDNC57QM9V34"
  },
  {
    "title": "kj's Pampered Chef",
    "reviewsCount": 0,
    "phone": "(484) 788-8440",
    "categoryName": "Home goods store",
    "url": "https://www.google.com/maps/search/?api=1&query=kj's%20Pampered%20Chef&query_place_id=ChIJGz6wAycxxIkRiN81W8U3i2g"
  },
  {
    "title": "Cooking with Lynne, Pampered Chef Consultant",
    "reviewsCount": 0,
    "website": "https://www.pamperedchef.com/pws/duvall2",
    "phone": "(603) 566-0887",
    "categoryName": "Kitchen supply store",
    "url": "https://www.google.com/maps/search/?api=1&query=Cooking%20with%20Lynne%2C%20Pampered%20Chef%20Consultant&query_place_id=ChIJSTLILS_J44kRJVdoS2lqcg4"
  },
  {
    "title": "Sal Independent Consultant with Pampered Chef",
    "reviewsCount": 0,
    "website": "https://www.pamperedchef.com/pws/cookingwithsal",
    "phone": "(413) 244-6934",
    "categoryName": "Kitchen supply store",
    "url": "https://www.google.com/maps/search/?api=1&query=Sal%20Independent%20Consultant%20with%20Pampered%20Chef&query_place_id=ChIJCcw7Pewf54kRjyyikLtQWjQ"
  },
  {
    "title": "Patty Quinn, Independent Pampered Chef Consultant",
    "reviewsCount": 0,
    "website": "http://www.pamperedchef.com/pws/pquinncooks",
    "categoryName": "Consultant",
    "url": "https://www.google.com/maps/search/?api=1&query=Patty%20Quinn%2C%20Independent%20Pampered%20Chef%20Consultant&query_place_id=ChIJjSNufa__44kRnoo62EZQlF0"
  },
  {
    "title": "Independent Consultant",
    "totalScore": 5,
    "reviewsCount": 118,
    "street": "67 Tippin Dr",
    "city": "Huntington Station",
    "state": "New York",
    "countryCode": "US",
    "website": "https://www.pamperedchef.com/pws/mmeringolo/",
    "phone": "(631) 236-7596",
    "categoryName": "Kitchen supply store",
    "url": "https://www.google.com/maps/search/?api=1&query=Independent%20Consultant&query_place_id=ChIJu8MDZUEp6IkR8i1cwNfraHc"
  },
  {
    "title": "Pampered Chef Independent Consulant Dara",
    "reviewsCount": 0,
    "street": "1 County Rd",
    "city": "Barrington",
    "state": "Rhode Island",
    "countryCode": "US",
    "website": "https://www.pamperedchef.com/pws/dcolacchio",
    "categoryName": "Kitchen supply store",
    "url": "https://www.google.com/maps/search/?api=1&query=Pampered%20Chef%20Independent%20Consulant%20Dara&query_place_id=ChIJh2q_aAFR5IkRWFUuIBB3Pi0"
  },
  {
    "title": "Pampered Chef - Eating Healthy with Gayatri (Independent Consultant)",
    "totalScore": 5,
    "reviewsCount": 21,
    "website": "https://www.pamperedchef.com/pws/eatinghealthy",
    "phone": "(518) 282-5171",
    "categoryName": "Cooking class",
    "url": "https://www.google.com/maps/search/?api=1&query=Pampered%20Chef%20-%20Eating%20Healthy%20with%20Gayatri%20(Independent%20Consultant)&query_place_id=ChIJW2k-z9sT3okR-jN7u5xJqNg"
  },
  {
    "title": "Eileen Scarton Pampered Chef Consultant",
    "reviewsCount": 0,
    "phone": "(302) 373-9780",
    "categoryName": "Consultant",
    "url": "https://www.google.com/maps/search/?api=1&query=Eileen%20Scarton%20Pampered%20Chef%20Consultant&query_place_id=ChIJTWVtvfsP3okR_kzHvFU51Ek"
  },
  {
    "title": "Angela & Sam's Pampered Chef",
    "reviewsCount": 0,
    "street": "1 Mendham Ave",
    "city": "Morristown",
    "state": "New Jersey",
    "countryCode": "US",
    "website": "https://www.pamperedchef.com/pws/klein17",
    "phone": "(908) 209-8596",
    "categoryName": "Home goods store",
    "url": "https://www.google.com/maps/search/?api=1&query=Angela%20%26%20Sam's%20Pampered%20Chef&query_place_id=ChIJjdCooxunw4kRFdcQgDNC1Rg"
  }
];

// Filter out corporate office
const consultants = rawConsultants.filter(c =>
  c.categoryName !== 'Corporate office'
);

console.log(`Filtered ${rawConsultants.length} entries down to ${consultants.length} valid Pampered Chef representatives`);

// Helper function to extract name from title
function extractName(title) {
  // Remove common Pampered Chef related words
  const cleaned = title
    .replace(/Pampered Chef/gi, '')
    .replace(/Independent/gi, '')
    .replace(/Consultant/gi, '')
    .replace(/Executive/gi, '')
    .replace(/Indep/gi, '')
    .replace(/Consulant/gi, '') // typo in data
    .replace(/featuring/gi, '')
    .replace(/Shop/gi, '')
    .replace(/with/gi, '')
    .replace(/by/gi, '')
    .replace(/for/gi, '')
    .replace(/Cooking/gi, '')
    .replace(/Kitchen/gi, '')
    .replace(/FamilyStyle/gi, 'FamilyStyle')
    .replace(/:/g, '')
    .replace(/,/g, '')
    .replace(/'/g, '')
    .replace(/-/g, ' ')
    .replace(/\./g, '')
    .replace(/\(/g, '')
    .replace(/\)/g, '')
    .replace(/&/g, 'and')
    .trim();

  const parts = cleaned.split(' ').filter(p => p.length > 0);

  // Handle special cases
  if (parts.length === 0) {
    return {
      first_name: 'Pampered Chef',
      last_name: 'Representative'
    };
  }

  return {
    first_name: parts[0] || 'Pampered Chef',
    last_name: parts.slice(1).join(' ') || 'Representative'
  };
}

// Helper function to extract state abbreviation
function getStateAbbreviation(state) {
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
    'Wisconsin': 'WI', 'Wyoming': 'WY'
  };

  return states[state] || state.substring(0, 2).toUpperCase();
}

async function seedConsultants() {
  console.log('🚀 Starting to seed Pampered Chef consultants...');

  // First, get Pampered Chef company ID
  const { data: company, error: companyError } = await supabase
    .from('companies')
    .select('id')
    .eq('slug', 'pampered-chef')
    .single();

  if (companyError || !company) {
    console.error('❌ Error finding Pampered Chef company:', companyError);
    return;
  }

  console.log(`✅ Found Pampered Chef company with ID: ${company.id}`);

  let successCount = 0;
  let errorCount = 0;

  for (const consultant of consultants) {
    try {
      const name = extractName(consultant.title);
      const stateAbbr = getStateAbbreviation(consultant.state);

      // Create a temporary user for this consultant
      const timestamp = Date.now() + Math.random();
      const email = `${name.first_name.toLowerCase()}.${name.last_name.toLowerCase().replace(/\s+/g, '')}.${timestamp}@pamperedchef.temp`;

      const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
        email: email,
        email_confirm: true,
        user_metadata: {
          first_name: name.first_name,
          last_name: name.last_name
        }
      });

      if (authError) {
        console.error(`❌ Error creating auth user for ${consultant.title}:`, authError.message);
        errorCount++;
        continue;
      }

      // Update the profile with additional info
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          bio: consultant.categoryName || null,
          city: consultant.city || null,
          state: stateAbbr,
          personal_website_url: consultant.website || null,
          profile_picture_url: consultant.imageUrl || null
        })
        .eq('id', authUser.user.id);

      if (profileError) {
        console.error(`❌ Error updating profile for ${consultant.title}:`, profileError.message);
        errorCount++;
        continue;
      }

      // Associate with Pampered Chef company
      const { error: repCompanyError } = await supabase
        .from('rep_companies')
        .insert({
          rep_id: authUser.user.id,
          company_id: company.id
        });

      if (repCompanyError) {
        console.error(`❌ Error linking to company for ${consultant.title}:`, repCompanyError.message);
        errorCount++;
        continue;
      }

      console.log(`✅ Added: ${name.first_name} ${name.last_name} from ${consultant.city || 'Unknown'}, ${stateAbbr || 'N/A'}`);
      successCount++;

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));

    } catch (error) {
      console.error(`❌ Unexpected error for ${consultant.title}:`, error.message);
      errorCount++;
    }
  }

  console.log('\n📊 Summary:');
  console.log(`✅ Successfully added: ${successCount} Pampered Chef consultants`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log('🎉 Seeding complete!');
}

// Run the seeding
seedConsultants().catch(console.error);
