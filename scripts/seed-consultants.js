require('dotenv').config({ path: '../.env.local' });
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client with service role key for admin operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const consultants = [
  {
    "imageUrl": "https://lh3.googleusercontent.com/p/AF1QipOnSpl133Q5QccgaheN7s8mQ9qgRLqZB_1PZ43Q=w408-h408-k-no",
    "title": "Nueva Imagen consultora Mary Kay",
    "reviewsCount": 0,
    "street": "17602 El Polvorin Rd",
    "city": "Penitas",
    "state": "Texas",
    "countryCode": "US",
    "phone": "(956) 638-8522",
    "categoryName": "Market",
    "url": "https://www.google.com/maps/search/?api=1&query=Nueva%20Imagen%20consultora%20Mary%20Kay&query_place_id=ChIJE_cJ_9KtZYYRg4wGrr2V0So"
  },
  {
    "title": "Nicole Sanchez, Mary Kay IBC",
    "reviewsCount": 0,
    "street": "2950 White Pine Rd",
    "city": "Parrottsville",
    "state": "Tennessee",
    "countryCode": "US",
    "website": "https://www.marykay.com/nicolesanchez",
    "phone": "(423) 592-8175",
    "categoryName": "Beauty product supplier",
    "url": "https://www.google.com/maps/search/?api=1&query=Nicole%20Sanchez%2C%20Mary%20Kay%20IBC&query_place_id=ChIJZ6bU4-fJW4gRFvBmG0QVCYY"
  },
  {
    "imageUrl": "https://lh3.googleusercontent.com/p/AF1QipNe650PeU3n0qSQrqcxXl0bpnyQldV61AEpg5Uj=w408-h544-k-no",
    "title": "Jenn's Mary Kay",
    "reviewsCount": 0,
    "street": "14763 SW 109th Ave",
    "city": "Portland",
    "state": "Oregon",
    "countryCode": "US",
    "website": "https://www.marykay.com/BeautifulYoubyJenn",
    "categoryName": "Beauty product supplier",
    "url": "https://www.google.com/maps/search/?api=1&query=Jenn's%20Mary%20Kay&query_place_id=ChIJhUmn5sYNlVQRUHsjA_S5c-c"
  },
  {
    "imageUrl": "https://lh3.googleusercontent.com/p/AF1QipOhwrdiIwqZmjem7pO-uZKoBcue1ew4qR6dRNQU=w408-h544-k-no",
    "title": "Renee Robinson Independent Mary Kay Beauty Consultant",
    "totalScore": 5,
    "reviewsCount": 1,
    "street": "1010 E Elma St",
    "city": "Ontario",
    "state": "California",
    "countryCode": "US",
    "website": "http://marykay.com/reneerobinson2009",
    "phone": "(951) 282-0331",
    "categoryName": "Beauty product supplier",
    "url": "https://www.google.com/maps/search/?api=1&query=Renee%20Robinson%20Independent%20Mary%20Kay%20Beauty%20Consultant&query_place_id=ChIJ498dPf41w4ARMBrrjln1SOw"
  },
  {
    "imageUrl": "https://lh3.googleusercontent.com/p/AF1QipNFDFXlVqhHatHm-O9SCXoDgguFH1m89mORH_aZ=w408-h408-k-no",
    "title": "Mary Kay Beauty Consultant, Diana Lopez",
    "totalScore": 5,
    "reviewsCount": 1,
    "street": "5106 Lost Hills Trail",
    "city": "Laredo",
    "state": "Texas",
    "countryCode": "US",
    "website": "http://www.marykay.com/dianalopz",
    "phone": "(956) 999-6187",
    "categoryName": "Beauty product supplier",
    "url": "https://www.google.com/maps/search/?api=1&query=Mary%20Kay%20Beauty%20Consultant%2C%20Diana%20Lopez&query_place_id=ChIJ7XZklnwnYYYRx0Fp-EvESwE"
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
    "categoryName": "Beauty product supplier",
    "url": "https://www.google.com/maps/search/?api=1&query=Marykay%20beauty%20consultant&query_place_id=ChIJx8pJgdaHToYRB9HYziIpcN8"
  },
  {
    "imageUrl": "https://lh3.googleusercontent.com/p/AF1QipPErGLubVDhCOt_E1vn_0bUS4N0CCWrWgfjJ50p=w408-h408-k-no",
    "title": "Agata Zienkiewicz Mary Kay consultant",
    "totalScore": 5,
    "reviewsCount": 1,
    "street": "Ridgewood Rd",
    "city": "Elk Grove Village",
    "state": "Illinois",
    "countryCode": "US",
    "website": "https://www.marykay.com/AZienkiewicz",
    "phone": "(773) 318-9535",
    "categoryName": "Beauty product supplier",
    "url": "https://www.google.com/maps/search/?api=1&query=Agata%20Zienkiewicz%20Mary%20Kay%20consultant&query_place_id=ChIJzcQZ_PyxD4gR0qRKow6rLIM"
  },
  {
    "imageUrl": "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=O_eJwOGbhjt9KJr98B4UrA&cb_client=search.gws-prod.gps&w=408&h=240&yaw=265.0059&pitch=0&thumbfov=100",
    "title": "Mary Kay Consultant",
    "totalScore": 5,
    "reviewsCount": 1,
    "street": "11332 S Marathon Ln",
    "city": "Plainfield",
    "state": "Illinois",
    "countryCode": "US",
    "website": "https://www.marykay.com/EIsac",
    "phone": "(307) 277-9736",
    "categoryName": "Beauty product supplier",
    "url": "https://www.google.com/maps/search/?api=1&query=Mary%20Kay%20Consultant&query_place_id=ChIJsbGCmvP3DogRX1x-lVor2HU"
  },
  {
    "imageUrl": "https://lh3.googleusercontent.com/p/AF1QipP7pml-BqgUxpHcMVkXoKinJ5jAooUBMAtuiBEe=w408-h395-k-no",
    "title": "Yolanda Mary Kay Clean skin",
    "reviewsCount": 0,
    "street": "12519",
    "city": "Norwalk",
    "state": "CA",
    "countryCode": "US",
    "website": "https://www.marykay.com/YGalindo1",
    "phone": "(562) 595-3265",
    "categoryName": "Beauty product supplier",
    "url": "https://www.google.com/maps/search/?api=1&query=Yolanda%20Mary%20Kay%20Clean%20skin&query_place_id=ChIJ-9U7l9_TwoARumjKYTRBYB0"
  },
  {
    "imageUrl": "https://lh3.googleusercontent.com/p/AF1QipOqhoj7KHmZ-XQXQbIKcoEgIkJBVY83N5jkd6Hm=w408-h461-k-no",
    "title": "Lourdes consultora independiente mary kay",
    "totalScore": 4.3,
    "reviewsCount": 6,
    "street": "9437 N 13th Ave",
    "city": "Phoenix",
    "state": "Arizona",
    "countryCode": "US",
    "website": "https://www.marykay.com/MEspinoza2523",
    "phone": "(602) 516-9164",
    "categoryName": "Beauty product supplier",
    "url": "https://www.google.com/maps/search/?api=1&query=Lourdes%20consultora%20independiente%20mary%20kay&query_place_id=ChIJ5wBBTQ5tK4cRFFnIg6G9K3Q"
  },
  {
    "imageUrl": "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=VgvOFk4AsDh0KMbnCM75cA&cb_client=search.gws-prod.gps&w=408&h=240&yaw=123.617966&pitch=0&thumbfov=100",
    "title": "Stacy Welch, Mary Kay Beauty Consultant",
    "totalScore": 5,
    "reviewsCount": 13,
    "street": "6655 W Jewell Ave",
    "city": "Lakewood",
    "state": "Colorado",
    "countryCode": "US",
    "website": "https://www.marykay.com/swelch0518",
    "phone": "(720) 299-6095",
    "categoryName": "Cosmetics store",
    "url": "https://www.google.com/maps/search/?api=1&query=Stacy%20Welch%2C%20Mary%20Kay%20Beauty%20Consultant&query_place_id=ChIJv-Sy0E-Ba4cRFG6M-NDmyuw"
  },
  {
    "imageUrl": "https://lh3.googleusercontent.com/p/AF1QipOvbAOxmd5TfGiJxbffeDgtVpKFU0UPQQoI9Dvm=w408-h408-k-no",
    "title": "Darnika Smith Mary Kay Beauty Consultant",
    "totalScore": 5,
    "reviewsCount": 1,
    "website": "https://www.marykay.com/dsmithbeauty",
    "phone": "(678) 304-8099",
    "categoryName": "Cosmetics store",
    "url": "https://www.google.com/maps/search/?api=1&query=Darnika%20Smith%20Mary%20Kay%20Beauty%20Consultant&query_place_id=ChIJwRNQIxAj9YgRoSjIKrZNa14"
  },
  {
    "imageUrl": "https://lh3.googleusercontent.com/p/AF1QipMFOwR0yxhtcYoPbsqK1Hv_UeKMvZb_pATRc05v=w408-h341-k-no",
    "title": "Mary Kay Cosmetics",
    "totalScore": 5,
    "reviewsCount": 1,
    "website": "https://marykay.com/feliciasfacials",
    "phone": "(281) 297-8775",
    "categoryName": "Beauty product supplier",
    "url": "https://www.google.com/maps/search/?api=1&query=Mary%20Kay%20Cosmetics&query_place_id=ChIJTQ23M_O__CERplEH7d3f41Y"
  },
  {
    "imageUrl": "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=VlOtjWmr8x5wW_eLwZJ8rQ&cb_client=search.gws-prod.gps&w=408&h=240&yaw=179.03523&pitch=0&thumbfov=100",
    "title": "Mary Kay consultant",
    "reviewsCount": 0,
    "street": "1022 Ninety Six Hwy",
    "city": "Greenwood",
    "state": "South Carolina",
    "countryCode": "US",
    "phone": "(864) 407-3175",
    "categoryName": "Beauty product supplier",
    "url": "https://www.google.com/maps/search/?api=1&query=Mary%20Kay%20consultant&query_place_id=ChIJDfCmkG8F-IgRcbkzxnPKhOU"
  },
  {
    "imageUrl": "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=8gJJNdL0MLXcKb2lWElheA&cb_client=search.gws-prod.gps&w=408&h=240&yaw=72.10715&pitch=0&thumbfov=100",
    "title": "Sarah's Mary Kay",
    "totalScore": 5,
    "reviewsCount": 6,
    "street": "1748 Union Center Maine Hwy",
    "city": "Endicott",
    "state": "New York",
    "countryCode": "US",
    "website": "http://www.marykay.com/SSimonds",
    "phone": "(607) 725-4588",
    "categoryName": "Beauty product supplier",
    "url": "https://www.google.com/maps/search/?api=1&query=Sarah's%20Mary%20Kay&query_place_id=ChIJMQFqkRft2okR3ym7xBex9dQ"
  },
  {
    "title": "Shop Luxurious Mary Kay with Kathleen",
    "totalScore": 5,
    "reviewsCount": 1,
    "website": "http://www.marykay.com/kkimmoore",
    "phone": "(202) 600-9608",
    "categoryName": "Beauty product supplier",
    "url": "https://www.google.com/maps/search/?api=1&query=Shop%20Luxurious%20Mary%20Kay%20with%20Kathleen&query_place_id=ChIJmec-YlR5hAYRP1Ilmp7QjCE"
  },
  {
    "imageUrl": "https://lh3.googleusercontent.com/p/AF1QipOLVP7dsCW71HyBa4yDu8969FIxPV4aLRP1ksui=w408-h512-k-no",
    "title": "Renee Schreiner, Independent Mary Kay Consultant",
    "totalScore": 5,
    "reviewsCount": 10,
    "street": "1686 Winfield Dr",
    "city": "Lakewood",
    "state": "Colorado",
    "countryCode": "US",
    "website": "http://www.marykay.com/rschreiner",
    "phone": "(303) 234-1970",
    "categoryName": "Cosmetics industry",
    "url": "https://www.google.com/maps/search/?api=1&query=Renee%20Schreiner%2C%20Independent%20Mary%20Kay%20Consultant&query_place_id=ChIJDU_AZ7qFa4cRurIrhVGjjpE"
  },
  {
    "imageUrl": "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=JxuzfGODwW7oA1zUtvmG9Q&cb_client=search.gws-prod.gps&w=408&h=240&yaw=232.40413&pitch=0&thumbfov=100",
    "title": "Adrianas Mary Kay",
    "reviewsCount": 0,
    "street": "812 S Wenatchee Ave",
    "city": "Wenatchee",
    "state": "Washington",
    "countryCode": "US",
    "phone": "(509) 664-5167",
    "categoryName": "Beauty product supplier",
    "url": "https://www.google.com/maps/search/?api=1&query=Adrianas%20Mary%20Kay&query_place_id=ChIJWYtGmkvNm1QRyEytCG62lOc"
  },
  {
    "imageUrl": "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=_od1aze9H0yr34FPob2zZA&cb_client=search.gws-prod.gps&w=408&h=240&yaw=173.9449&pitch=0&thumbfov=100",
    "title": "Michelle Willis Independent Mary Kay consultant",
    "reviewsCount": 0,
    "street": "458 E 10375 S",
    "city": "Sandy",
    "state": "Utah",
    "countryCode": "US",
    "website": "https://marykay.com/Michellewillispink",
    "phone": "(801) 759-7027",
    "categoryName": "Cosmetics store",
    "url": "https://www.google.com/maps/search/?api=1&query=Michelle%20Willis%20Independent%20Mary%20Kay%20consultant&query_place_id=ChIJi4cjzgKHUocR27jWBQyh93Y"
  },
  {
    "imageUrl": "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=pi0r1oaIU-MJspsB_shtaw&cb_client=search.gws-prod.gps&w=408&h=240&yaw=185.85394&pitch=0&thumbfov=100",
    "title": "Mary Kay beauty consultant Kristina Dunaway",
    "reviewsCount": 0,
    "street": "224 Sheridan Cir",
    "city": "Hopkinsville",
    "state": "Kentucky",
    "countryCode": "US",
    "website": "https://www.marykay.com/kdunaway",
    "phone": "(270) 839-7529",
    "categoryName": "Health and beauty shop",
    "url": "https://www.google.com/maps/search/?api=1&query=Mary%20Kay%20beauty%20consultant%20Kristina%20Dunaway&query_place_id=ChIJJ_WULE4zZYgRGDD_runpTfo"
  },
  {
    "imageUrl": "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=pb5Z7LRWT1dyYxTfb1rNlw&cb_client=search.gws-prod.gps&w=408&h=240&yaw=98.91628&pitch=0&thumbfov=100",
    "title": "Mary Kay Marthette Loney",
    "reviewsCount": 0,
    "street": "3807 Dickerson Pike Suite K",
    "city": "Nashville",
    "state": "Tennessee",
    "countryCode": "US",
    "website": "http://www.marykay.com/mloney1",
    "phone": "(615) 519-1055",
    "categoryName": "Cosmetics industry",
    "url": "https://www.google.com/maps/search/?api=1&query=Mary%20Kay%20Marthette%20Loney&query_place_id=ChIJm2V7M4JdZIgRkTIPwVg2tbE"
  },
  {
    "imageUrl": "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=iagdOJr59YE7BoylfM-t0Q&cb_client=search.gws-prod.gps&w=408&h=240&yaw=302.7103&pitch=0&thumbfov=100",
    "title": "Mary Kay Independent Beauty Consultant",
    "totalScore": 5,
    "reviewsCount": 1,
    "street": "1103 Mockingbird Ln",
    "city": "Carterville",
    "state": "Illinois",
    "countryCode": "US",
    "website": "http://www.marykay.com/sabrina.stewart",
    "phone": "(618) 713-5813",
    "categoryName": "Health and beauty shop",
    "url": "https://www.google.com/maps/search/?api=1&query=Mary%20Kay%20Independent%20Beauty%20Consultant&query_place_id=ChIJFztmYecXd4gRhEVNytxR7E8"
  },
  {
    "imageUrl": "https://lh3.googleusercontent.com/p/AF1QipPozKD-jb0Ig8wz58nV0yoLR256ZEvlB2gFLkE=w408-h390-k-no",
    "title": "Mary Kay consultant",
    "reviewsCount": 0,
    "street": "Joslin Branch Rd",
    "city": "White Bluff",
    "state": "Tennessee",
    "countryCode": "US",
    "website": "https://www.marykay.com/jwaggoner4",
    "phone": "(615) 268-0492",
    "categoryName": "Beauty product supplier",
    "url": "https://www.google.com/maps/search/?api=1&query=Mary%20Kay%20consultant&query_place_id=ChIJTWD_Eeq9ZIgRVN41kOSGWiE"
  },
  {
    "imageUrl": "https://lh3.googleusercontent.com/p/AF1QipP94AeWs5KnXRhVxwV2nJcQ5nd1LpKj0pqiVG6Q=w408-h907-k-no",
    "title": "Anna Cole - Mary Kay Independent Beauty consultant",
    "totalScore": 5,
    "reviewsCount": 2,
    "street": "2323 Glenmoor Dr",
    "city": "Arlington",
    "state": "Texas",
    "countryCode": "US",
    "website": "https://www.marykay.com/AnnaCole",
    "phone": "(214) 984-0716",
    "categoryName": "Beauty product supplier",
    "url": "https://www.google.com/maps/search/?api=1&query=Anna%20Cole%20-%20Mary%20Kay%20Independent%20Beauty%20consultant&query_place_id=ChIJYbT1jfljToYRCmPTxHG9k10"
  },
  {
    "imageUrl": "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxRu0-YY5DUQVMEYC3dAeuSqlqUyt5QWqoZLx1XmMcGVaMzW9QJkLnoviVGI1vEHuS4cWHQUOblqp7lYNI_wylEekrTo9ZnUh1FAk-6xMSs-mNuO3d5emjv6KxtG-xgO3v7S9GeNA=w408-h272-k-no",
    "title": "MaryKayRichardson.com",
    "totalScore": 1,
    "reviewsCount": 1,
    "street": "1103 Bell Grimes Ln D",
    "city": "Nashville",
    "state": "Tennessee",
    "countryCode": "US",
    "website": "http://www.marykayrichardson.com/",
    "phone": "(623) 999-8088",
    "categoryName": "Corporate campus",
    "url": "https://www.google.com/maps/search/?api=1&query=MaryKayRichardson.com&query_place_id=ChIJ9wIoZCFdZIgRRz-y-l9DbRA"
  },
  {
    "imageUrl": "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=4dsIieJFba--MbpqByRzOQ&cb_client=search.gws-prod.gps&w=408&h=240&yaw=193.07698&pitch=0&thumbfov=100",
    "title": "Stephanie Renee presenting Mary Kay Skincare",
    "totalScore": 5,
    "reviewsCount": 1,
    "street": "838 N Delaware St ste 9 2207",
    "city": "Indianapolis",
    "state": "Indiana",
    "countryCode": "US",
    "website": "https://www.marykay.com/SkincareBabe",
    "phone": "(770) 256-9738",
    "categoryName": "Cosmetics store",
    "url": "https://www.google.com/maps/search/?api=1&query=Stephanie%20Renee%20presenting%20Mary%20Kay%20Skincare&query_place_id=ChIJc8Hxmk1Ra4gRdi5ksEjT2Sc"
  },
  {
    "imageUrl": "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSy9PEI2uE0VyTWhUS6Omqe1PCC1dRzQO9yLZZVsf-SLPUI44zIpT19Zwp__uZlU83wVLxg6zPr1VS6hzbClGe7QY9O9B6p2bD_C5QHwdzoCc8IZsbEE-48jzxmtHBfe1ig2oDUK=w408-h306-k-no",
    "title": "Ana's Mary Kay",
    "totalScore": 5,
    "reviewsCount": 5,
    "street": "1806 Atlanta Rd A",
    "city": "Gainesville",
    "state": "Georgia",
    "countryCode": "US",
    "website": "https://www.marykay.com/AGomez21866",
    "phone": "(770) 882-1674",
    "categoryName": "Cosmetics store",
    "url": "https://www.google.com/maps/search/?api=1&query=Ana's%20Mary%20Kay&query_place_id=ChIJSc9FCQDx9YgRjaNMT6Zz8Sg"
  },
  {
    "imageUrl": "https://lh3.googleusercontent.com/p/AF1QipMcdcczvozRgr_riqVC3qWP9FjEgaCrCPFoyc2X=w408-h343-k-no",
    "title": "Jessica Harsh Mary Kay Store",
    "totalScore": 5,
    "reviewsCount": 1,
    "street": "601 Babbling Brook Dr",
    "city": "Saginaw",
    "state": "Texas",
    "countryCode": "US",
    "website": "https://www.marykay.com/jessicaharsh75",
    "phone": "(661) 426-3145",
    "categoryName": "Cosmetics store",
    "url": "https://www.google.com/maps/search/?api=1&query=Jessica%20Harsh%20Mary%20Kay%20Store&query_place_id=ChIJUT1Xq5rfTYYRMZFAboMr7xw"
  },
  {
    "title": "Mary Kay Cosmetics",
    "reviewsCount": 0,
    "street": "1929 Holly St",
    "city": "Harrisburg",
    "state": "Pennsylvania",
    "countryCode": "US",
    "website": "https://www.marykay.com/en-us/",
    "phone": "(717) 343-8252",
    "categoryName": "Cosmetics store",
    "url": "https://www.google.com/maps/search/?api=1&query=Mary%20Kay%20Cosmetics&query_place_id=ChIJlyZeIQDByIkRMbe4tUAsxhk"
  },
  {
    "imageUrl": "https://lh3.googleusercontent.com/p/AF1QipOokuYrJGbAtmMHLVvI9_gnJ2gT8PTAFFXOdho=w408-h408-k-no",
    "title": "Mary Kay by Maria Karantonis",
    "totalScore": 5,
    "reviewsCount": 3,
    "street": "431 E Derry Rd Apt. 1W",
    "city": "Hershey",
    "state": "Pennsylvania",
    "countryCode": "US",
    "website": "http://www.marykay.com/mkarantonis/en-us/",
    "phone": "(717) 571-8357",
    "categoryName": "Consultant",
    "url": "https://www.google.com/maps/search/?api=1&query=Mary%20Kay%20by%20Maria%20Karantonis&query_place_id=ChIJ6-9a6667yIkR1GhjPzzhzg8"
  },
  {
    "title": "Mary Kay Eastern Branch",
    "totalScore": 4.4,
    "reviewsCount": 17,
    "street": "115 Shady Ln",
    "city": "Manchester",
    "state": "Pennsylvania",
    "countryCode": "US",
    "categoryName": "Warehouse",
    "url": "https://www.google.com/maps/search/?api=1&query=Mary%20Kay%20Eastern%20Branch&query_place_id=ChIJkSatw9ONyIkR5JrM_fBJU_0"
  },
  {
    "imageUrl": "https://lh3.googleusercontent.com/p/AF1QipP3xK-X7KtNtJYghskPzIVznVgJCLefBuM4bvVP=w408-h408-k-no",
    "title": "Mary Kay Tracy Potochny",
    "totalScore": 5,
    "reviewsCount": 19,
    "street": "1429 Stonecutter Cir",
    "city": "Hummelstown",
    "state": "Pennsylvania",
    "countryCode": "US",
    "website": "http://www.marykay.com/tpotochny",
    "phone": "(717) 880-1770",
    "categoryName": "Consultant",
    "url": "https://www.google.com/maps/search/?api=1&query=Mary%20Kay%20Tracy%20Potochny&query_place_id=ChIJcccsuYClyIkRmd3caOLlCWQ"
  },
  {
    "imageUrl": "https://lh3.googleusercontent.com/p/AF1QipO0JF2ww6ZslxDQAiVZb6v09F1KMmHJMK05i9w5=w408-h425-k-no",
    "title": "Mary Kay",
    "reviewsCount": 0,
    "street": "301 N Progress Ave Apt H2",
    "city": "Harrisburg",
    "state": "Pennsylvania",
    "countryCode": "US",
    "website": "http://marykay.com/FMorales34",
    "phone": "(717) 343-8252",
    "categoryName": "Beauty supply store",
    "url": "https://www.google.com/maps/search/?api=1&query=Mary%20Kay&query_place_id=ChIJ_yiDnbHHyIkRukek4vkVfoQ"
  },
  {
    "imageUrl": "https://lh3.googleusercontent.com/p/AF1QipN_UCpwmU0os1E23zr4G3mPc71c8s2eScD_M6k2=w408-h330-k-no",
    "title": "Mary Kay - Patty Zannino",
    "totalScore": 5,
    "reviewsCount": 3,
    "website": "http://www.marykay.com/pzannino",
    "phone": "(717) 248-0752",
    "categoryName": "Cosmetics store",
    "url": "https://www.google.com/maps/search/?api=1&query=Mary%20Kay%20-%20Patty%20Zannino&query_place_id=ChIJP4oYfha1zokRTPsc75VeGTw"
  },
  {
    "imageUrl": "https://lh3.googleusercontent.com/p/AF1QipNkqrMQZ0mzM4i4kM7Y4gXlDDkYDjsX5aYmDU56=w420-h240-k-no",
    "title": "Mary Kay Beauty Consultant - Loretta Long",
    "reviewsCount": 0,
    "street": "220 Creek Rd",
    "city": "Bath",
    "state": "Pennsylvania",
    "countryCode": "US",
    "website": "http://www.marykay.com/LLong3",
    "categoryName": "Cosmetics store",
    "url": "https://www.google.com/maps/search/?api=1&query=Mary%20Kay%20Beauty%20Consultant%20-%20Loretta%20Long&query_place_id=ChIJaQZzQppBxIkRVswdVV5VDHU"
  },
  {
    "imageUrl": "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=12TibVET13lHbYqPgMK57g&cb_client=search.gws-prod.gps&w=408&h=240&yaw=123.37909&pitch=0&thumbfov=100",
    "title": "Marykay",
    "reviewsCount": 0,
    "street": "306 State St",
    "city": "Perth Amboy",
    "state": "New Jersey",
    "countryCode": "US",
    "phone": "(732) 672-6420",
    "categoryName": "Beauty product supplier",
    "url": "https://www.google.com/maps/search/?api=1&query=Marykay&query_place_id=ChIJyT5-W-DLw4kR3B6gAmp4iQU"
  },
  {
    "imageUrl": "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=az5wpOGeXTx7URIYrmwQYg&cb_client=search.gws-prod.gps&w=408&h=240&yaw=274.77222&pitch=0&thumbfov=100",
    "title": "Studio Pink (Mary Kay)",
    "totalScore": 5,
    "reviewsCount": 1,
    "street": "30 Union St",
    "city": "Elizabeth",
    "state": "New Jersey",
    "countryCode": "US",
    "website": "http://www.marykay.com/jwalker2019",
    "phone": "(908) 419-5857",
    "categoryName": "Cosmetics industry",
    "url": "https://www.google.com/maps/search/?api=1&query=Studio%20Pink%20(Mary%20Kay)&query_place_id=ChIJYSqnLQBNwokRaTiohsQvwQ8"
  },
  {
    "imageUrl": "https://lh3.googleusercontent.com/p/AF1QipNoWLObPMvwmO2xgoTv-IJIOBJWiC8VLPksMW1H=w408-h408-k-no",
    "title": "Ashley Seymour Mary Kay Independent Beauty Consultant",
    "reviewsCount": 0,
    "street": "104 West St",
    "city": "Sayre",
    "state": "Pennsylvania",
    "countryCode": "US",
    "website": "http://www.marykay.com/aseymour1",
    "phone": "(570) 423-4802",
    "categoryName": "Cosmetics store",
    "url": "https://www.google.com/maps/search/?api=1&query=Ashley%20Seymour%20Mary%20Kay%20Independent%20Beauty%20Consultant&query_place_id=ChIJE2HYtjMJ0IkRqzxzmsWkGsQ"
  },
  {
    "title": "Mary kay",
    "reviewsCount": 0,
    "street": "1877 Narrows Branch",
    "city": "Hardy",
    "state": "Kentucky",
    "countryCode": "US",
    "website": "http://www.marykay.com/AWolford",
    "phone": "(606) 471-4991",
    "categoryName": "Cosmetics store",
    "url": "https://www.google.com/maps/search/?api=1&query=Mary%20kay&query_place_id=ChIJyRQCwxV9RYgRTdmpVjzhwbE"
  },
  {
    "imageUrl": "https://lh3.googleusercontent.com/p/AF1QipOcN1oCFqkQjL0_bQnxS_JVnfRroZivWskQpS3-=w408-h408-k-no",
    "title": "Mary Kay Pink Diamonds Cosmetics Tierra Nicole Independent Sales Director Fishers, Noblesville, Westfield, Carmel",
    "totalScore": 5,
    "reviewsCount": 1,
    "website": "http://www.marykay.com/TierraNicole",
    "phone": "(317) 938-4035",
    "categoryName": "Cosmetics store",
    "url": "https://www.google.com/maps/search/?api=1&query=Mary%20Kay%20Pink%20Diamonds%20Cosmetics%20Tierra%20Nicole%20Independent%20Sales%20Director%20Fishers%2C%20Noblesville%2C%20Westfield%2C%20Carmel&query_place_id=ChIJizUSB_Dy7gERg3yWbZebmkA"
  },
  {
    "imageUrl": "https://lh3.googleusercontent.com/p/AF1QipMAqoQvv_rcvRFrKGQY5oVFI_RzlhAlNmIjBLxo=w408-h544-k-no",
    "title": "Jessica Kilday - Mary Kay Independent Beauty Consultant",
    "reviewsCount": 0,
    "website": "http://www.marykay.com/jakilday",
    "phone": "(516) 984-3487",
    "categoryName": "Beauty product supplier",
    "url": "https://www.google.com/maps/search/?api=1&query=Jessica%20Kilday%20-%20Mary%20Kay%20Independent%20Beauty%20Consultant&query_place_id=ChIJEbEZr2TSfGkRujO3HNOnyCc"
  },
  {
    "imageUrl": "https://lh3.googleusercontent.com/p/AF1QipMMFu1Cw-KkJ4SK-Y2Y-GRofQmYVLMAr7MnFFkQ=w408-h409-k-no",
    "title": "Mary Kay with Heather Martin, Independent Beauty Consultant",
    "reviewsCount": 0,
    "website": "https://www.marykay.com/hmartin0420",
    "categoryName": "Cosmetics store",
    "url": "https://www.google.com/maps/search/?api=1&query=Mary%20Kay%20with%20Heather%20Martin%2C%20Independent%20Beauty%20Consultant&query_place_id=ChIJzaVbpH6Hp0IRbkYe3OlMzm4"
  },
  {
    "title": "Mary Kay Skincare/Cosmetics",
    "reviewsCount": 0,
    "website": "http://www.marykay.com/stephj720",
    "phone": "(718) 308-1808",
    "categoryName": "Beauty product supplier",
    "url": "https://www.google.com/maps/search/?api=1&query=Mary%20Kay%20Skincare%2FCosmetics&query_place_id=ChIJC8siRf1FQIgRKxV945CRgSY"
  },
  {
    "imageUrl": "https://lh3.googleusercontent.com/p/AF1QipO-1T6HlqpDEoe2BsN7TithFvFtuCnTHvNfwdtk=w408-h408-k-no",
    "title": "Mary Kay Beauty Products - Jeannie Flowers",
    "reviewsCount": 0,
    "website": "http://marykay.com/jflowers100",
    "phone": "(228) 218-7049",
    "categoryName": "Beauty product supplier",
    "url": "https://www.google.com/maps/search/?api=1&query=Mary%20Kay%20Beauty%20Products%20-%20Jeannie%20Flowers&query_place_id=ChIJT3rgqLK_m4gRhY9IYTebNbw"
  },
  {
    "title": "MARY KAY",
    "reviewsCount": 0,
    "website": "https://www.marykay.com/HEATHERDEBTER",
    "phone": "(423) 298-7432",
    "categoryName": "Cosmetics store",
    "url": "https://www.google.com/maps/search/?api=1&query=MARY%20KAY&query_place_id=ChIJqRTqotqtYYgRbPyVH4L8CMA"
  },
  {
    "imageUrl": "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=wNwgCdSjNax886wqD9mhPw&cb_client=search.gws-prod.gps&w=408&h=240&yaw=238.7832&pitch=0&thumbfov=100",
    "title": "Mary Kay by Margot",
    "reviewsCount": 0,
    "street": "Penton Media Building, 1300 E 9th St",
    "city": "Cleveland",
    "state": "Ohio",
    "countryCode": "US",
    "website": "https://www.marykay.com/amwahdan/en-US/",
    "categoryName": "Health and beauty shop",
    "url": "https://www.google.com/maps/search/?api=1&query=Mary%20Kay%20by%20Margot&query_place_id=ChIJNxgyQy77MIgRUsY78RDo_Do"
  },
  {
    "title": "Chyanne's Mary Kay",
    "reviewsCount": 0,
    "website": "https://www.marykay.com/ChyanneEllis",
    "phone": "(352) 800-1695",
    "categoryName": "Health and beauty shop",
    "url": "https://www.google.com/maps/search/?api=1&query=Chyanne's%20Mary%20Kay&query_place_id=ChIJe6ZCC4MbUysR7cp6g55Pfe4"
  },
  {
    "imageUrl": "https://lh3.googleusercontent.com/p/AF1QipPWcwZx3q2SscxSmZXb1XXs3fHEh2HU3C-PC39E=w408-h408-k-no",
    "title": "Mary Kay W/Wanda Elaine Independent Beauty Consultant",
    "reviewsCount": 0,
    "website": "http://www.marykay.com/wmckinley8",
    "phone": "(512) 915-5842",
    "categoryName": "Beauty product supplier",
    "url": "https://www.google.com/maps/search/?api=1&query=Mary%20Kay%20W%2FWanda%20Elaine%20Independent%20Beauty%20Consultant&query_place_id=ChIJ-yPGOi21RIYR3m7sDK-EQJQ"
  },
  {
    "imageUrl": "https://lh3.googleusercontent.com/p/AF1QipPWcwZx3q2SscxSmZXb1XXs3fHEh2HU3C-PC39E=w408-h408-k-no",
    "title": "Mary Kay Debbie Young",
    "reviewsCount": 0,
    "website": "http://www.marykay.com/debbieyoung",
    "phone": "(404) 245-9302",
    "categoryName": "Beauty product supplier",
    "url": "https://www.google.com/maps/search/?api=1&query=Mary%20Kay%20Debbie%20Young&query_place_id=ChIJ0cwYYrrUmgURoG0acYV8fAc"
  },
  {
    "imageUrl": "https://lh3.googleusercontent.com/p/AF1QipNrURtByp9rLuSBY4e0U0tIT1q8TmDWIMV5jINc=w408-h408-k-no",
    "title": "April McBride Mary Kay Independent Beauty Consultant",
    "reviewsCount": 0,
    "website": "https://www.marykay.com/amcbride1962",
    "phone": "(615) 972-4661",
    "categoryName": "Cosmetics store",
    "url": "https://www.google.com/maps/search/?api=1&query=April%20McBride%20Mary%20Kay%20Independent%20Beauty%20Consultant&query_place_id=ChIJe54bh3RaJ04RPJtwfxe2IJI"
  }
];

// Helper function to extract name from title
function extractName(title) {
  // Remove common Mary Kay related words
  const cleaned = title
    .replace(/Mary Kay/gi, '')
    .replace(/Independent Beauty Consultant/gi, '')
    .replace(/IBC/gi, '')
    .replace(/consultora/gi, '')
    .replace(/consultant/gi, '')
    .replace(/,/g, '')
    .replace(/'/g, '')
    .replace(/presenting/gi, '')
    .replace(/Skincare/gi, '')
    .replace(/Cosmetics/gi, '')
    .replace(/with/gi, '')
    .replace(/by/gi, '')
    .replace(/w\//gi, '')
    .replace(/-/g, ' ')
    .trim();

  const parts = cleaned.split(' ').filter(p => p.length > 0);

  return {
    first_name: parts[0] || 'Mary Kay',
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
  console.log('🚀 Starting to seed consultants...');

  // First, get Mary Kay company ID
  const { data: company, error: companyError } = await supabase
    .from('companies')
    .select('id')
    .eq('slug', 'mary-kay')
    .single();

  if (companyError || !company) {
    console.error('❌ Error finding Mary Kay company:', companyError);
    return;
  }

  console.log(`✅ Found Mary Kay company with ID: ${company.id}`);

  let successCount = 0;
  let errorCount = 0;

  for (const consultant of consultants) {
    try {
      const name = extractName(consultant.title);
      const stateAbbr = getStateAbbreviation(consultant.state);

      // Create a temporary user for this consultant
      // Since we're using the service role key, we can bypass RLS
      const email = `${name.first_name.toLowerCase()}.${name.last_name.toLowerCase().replace(/\s+/g, '')}@marykay.temp`;

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

      // Associate with Mary Kay company
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

      console.log(`✅ Added: ${name.first_name} ${name.last_name} from ${consultant.city}, ${stateAbbr}`);
      successCount++;

    } catch (error) {
      console.error(`❌ Unexpected error for ${consultant.title}:`, error.message);
      errorCount++;
    }
  }

  console.log('\n📊 Summary:');
  console.log(`✅ Successfully added: ${successCount} consultants`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log('🎉 Seeding complete!');
}

// Run the seeding
seedConsultants().catch(console.error);
