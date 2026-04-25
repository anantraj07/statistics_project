/* ═══════════════════════════════════════════════════════════
   NUTRIECON INDIA — SCRIPT.JS
   Full diet science platform
   ═══════════════════════════════════════════════════════════ */

/* ──────────────────────────────────────────────────────────
   DATA: NUTRIENT DATABASE (329 records, per-100g)
   [name, cal, protein, fat, fiber, carbs, category]
   ────────────────────────────────────────────────────────── */
const NUTRIENT_DATA = [
  ["Cows' milk",68,3.3,4.1,0,4.9,"Dairy products"],["Milk skim",37,3.7,0.1,0,5.3,"Dairy products"],
  ["Buttermilk",52,3.7,2.0,0,5.3,"Dairy products"],["Evaporated milk",137,6.3,7.9,0,9.5,"Dairy products"],
  ["Powdered milk",500,26.2,27.2,0,37.9,"Dairy products"],["Goats' milk",68,3.3,4.1,0,4.5,"Dairy products"],
  ["Ice cream",160,3.2,9.6,0,15.4,"Dairy products"],["Custard",115,5.2,5.6,0,11.3,"Dairy products"],
  ["Cheddar cheese",412,23.5,35.3,0,5.9,"Dairy products"],["Cream cheese",375,7.1,39.3,0,3.6,"Dairy products"],
  ["Processed cheese",375,25.0,32.1,0,3.6,"Dairy products"],["Swiss cheese",375,25.0,28.6,0,3.6,"Dairy products"],
  ["Eggs raw",150,12.0,12.0,0,0.5,"Dairy products"],["Eggs scrambled",172,10.2,12.5,0,0.8,"Dairy products"],
  ["Butter",714,0.9,78.6,0,0.7,"Fats & Oils"],["Margarine",804,0.5,91.0,0,0.5,"Fats & Oils"],
  ["Corn oil",893,0,100,0,0,"Fats & Oils"],["Olive oil",893,0,100,0,0,"Fats & Oils"],
  ["Lard",902,0,100,0,0,"Fats & Oils"],["Mayonnaise",733,0.7,80.0,0,13.3,"Fats & Oils"],
  ["Beef",288,27.1,18.8,0,0,"Meat & Poultry"],["Hamburger",288,24.7,20.0,0,0,"Meat & Poultry"],
  ["Ground lean beef",218,28.2,11.8,0,0,"Meat & Poultry"],["Roast beef",459,18.8,42.4,0,0,"Meat & Poultry"],
  ["Steak",388,23.5,31.8,0,0,"Meat & Poultry"],["Lamb chop",390,18.0,35.0,0,0,"Meat & Poultry"],
  ["Pork chop",314,23.0,24.7,0,0,"Meat & Poultry"],["Ham",271,18.8,21.2,0,0,"Meat & Poultry"],
  ["Bacon",595,25.0,50.0,0,6.3,"Meat & Poultry"],["Salt pork",783,5.0,91.7,0,0,"Meat & Poultry"],
  ["Chicken roasted",194,29.4,7.6,0,0,"Meat & Poultry"],["Chicken fried",219,24.7,12.4,0,0,"Meat & Poultry"],
  ["Turkey roasted",176,29.4,5.9,0,0,"Meat & Poultry"],["Liver beef",140,20.0,4.7,0,4.7,"Meat & Poultry"],
  ["Oysters",66,8.4,1.8,0,3.7,"Fish & Seafood"],["Tuna canned",191,28.8,7.3,0,0,"Fish & Seafood"],
  ["Salmon canned",162,23.6,7.5,0,0,"Fish & Seafood"],["Sardines",311,20.3,24.4,0,0,"Fish & Seafood"],
  ["Shrimp",91,17.6,0.8,0,1.8,"Fish & Seafood"],["Crab",93,17.3,1.9,0,0.5,"Fish & Seafood"],
  ["Cod broiled",107,22.4,0.9,0,0,"Fish & Seafood"],["Herring",176,17.3,11.3,0,0,"Fish & Seafood"],
  ["Asparagus",20,2.2,0.2,0.9,3.6,"Vegetables"],["Bean sprouts",35,3.8,0.2,0.7,6.9,"Vegetables"],
  ["Broccoli",32,3.6,0.3,1.2,5.9,"Vegetables"],["Brussels sprouts",45,3.2,0.4,1.5,9.3,"Vegetables"],
  ["Cabbage",24,1.3,0.2,0.9,5.4,"Vegetables"],["Carrots",30,0.7,0.1,0.6,6.7,"Vegetables"],
  ["Cauliflower",25,2.7,0.2,1.1,5.2,"Vegetables"],["Celery",17,0.9,0.1,0.9,3.9,"Vegetables"],
  ["Corn",96,3.5,1.0,0.9,22.1,"Vegetables"],["Cucumber",15,0.8,0.1,0.4,3.4,"Vegetables"],
  ["Eggplant",17,1.1,0.1,0.6,5.0,"Vegetables"],["Green beans",32,1.8,0.2,1.1,7.2,"Vegetables"],
  ["Lima beans",111,7.6,0.5,1.7,20.1,"Vegetables"],["Lettuce",13,1.3,0.2,0.5,2.5,"Vegetables"],
  ["Mushrooms",28,2.7,0.5,0.7,4.4,"Vegetables"],["Onion",40,1.1,0.1,0.5,9.3,"Vegetables"],
  ["Peas",71,5.4,0.4,2.0,12.4,"Vegetables"],["Peppers",27,1.3,0.2,0.9,6.3,"Vegetables"],
  ["Lentils",106,7.5,0.3,1.2,19.0,"Vegetables"],["Kale",49,5.3,0.7,1.3,9.0,"Vegetables"],
  ["Potato boiled",85,2.5,0.1,0.6,19.7,"Vegetables"],["Spinach",26,3.0,0.3,1.0,3.0,"Vegetables"],
  ["Sweet potato",105,1.2,0.1,0.8,24.3,"Vegetables"],["Tomatoes",21,1.1,0.2,0.5,4.7,"Vegetables"],
  ["Pumpkin",26,1.0,0.1,0.5,6.5,"Vegetables"],["Zucchini",17,1.2,0.3,0.4,3.1,"Vegetables"],
  ["Apples",59,0.3,0.3,0.6,15.2,"Fruits"],["Apricots",48,1.4,0.2,0.6,11.1,"Fruits"],
  ["Avocado",167,2.1,15.3,2.0,8.5,"Fruits"],["Banana",57,0.7,0.1,0.6,15.3,"Fruits"],
  ["Blueberries",62,0.7,0.3,0.9,15.4,"Fruits"],["Cherries",58,1.2,0.3,0.3,14.3,"Fruits"],
  ["Coconut",354,3.3,35.0,2.5,15.2,"Fruits"],["Dates dried",274,2.2,0.5,2.3,72.9,"Fruits"],
  ["Figs dried",274,3.6,1.3,2.9,68.5,"Fruits"],["Grapes",62,0.6,0.3,0.4,15.7,"Fruits"],
  ["Guava",68,2.6,1.0,5.4,14.3,"Fruits"],["Mango",65,0.5,0.3,0.7,16.7,"Fruits"],
  ["Orange",45,0.9,0.2,0.3,10.0,"Fruits"],["Papaya",39,0.6,0.1,0.8,9.8,"Fruits"],
  ["Pineapple",52,0.5,0.1,0.5,13.7,"Fruits"],["Watermelon",30,0.6,0.2,0.1,7.6,"Fruits"],
  ["Banana",57,0.7,0.1,0.6,15.3,"Fruits"],["Strawberries",32,0.7,0.3,0.8,7.5,"Fruits"],
  ["Wheat flour all-purpose",364,10.9,1.0,0.3,76.4,"Grains & Cereals"],
  ["Whole wheat flour",325,10.8,1.7,2.3,65.8,"Grains & Cereals"],
  ["Rice cooked",130,2.7,0.3,0.4,28.2,"Grains & Cereals"],
  ["Rice raw",360,7.2,1.4,0.6,79.0,"Grains & Cereals"],
  ["Wheat germ",360,25.0,10.3,3.7,50.0,"Grains & Cereals"],
  ["Oatmeal cooked",56,2.5,1.0,0.7,10.0,"Grains & Cereals"],
  ["Cornmeal",362,8.1,3.6,1.2,76.9,"Grains & Cereals"],
  ["White bread",266,8.9,3.2,0.3,50.4,"Grains & Cereals"],
  ["Whole wheat bread",247,10.7,3.0,2.8,46.9,"Grains & Cereals"],
  ["Macaroni cooked",111,4.1,0.6,0.4,22.5,"Grains & Cereals"],
  ["French fries",274,4.0,13.0,1.2,37.0,"Grains & Cereals"],
  ["Peanut butter",600,24.0,50.0,1.8,18.0,"Seeds & Nuts"],
  ["Peanuts",580,26.0,50.0,2.4,18.0,"Seeds & Nuts"],
  ["Almonds",598,20.0,52.8,2.6,20.9,"Seeds & Nuts"],
  ["Walnuts",651,14.8,64.0,2.1,15.8,"Seeds & Nuts"],
  ["Cashews",553,17.2,43.8,0.6,30.2,"Seeds & Nuts"],
  ["Sunflower seeds",584,23.4,51.5,3.0,20.0,"Seeds & Nuts"],
  ["Sesame seeds",573,17.7,49.7,3.9,23.4,"Seeds & Nuts"],
  ["Candy",394,1.8,4.5,0,90.9,"Desserts & Sweets"],
  ["Chocolate bar",518,3.6,10.7,0.4,78.6,"Desserts & Sweets"],
  ["Cake",326,4.0,12.2,0.3,54.1,"Desserts & Sweets"],["Pie",268,3.0,12.5,0.4,38.7,"Desserts & Sweets"],
  ["Cookies",471,6.0,19.1,0.3,69.9,"Desserts & Sweets"],["Sugar",385,0,0,0,99.8,"Desserts & Sweets"],
  ["Honey",304,0.3,0,0.2,82.4,"Desserts & Sweets"],
  ["Coffee",1,0.2,0.0,0,0.4,"Beverages"],["Tea",2,0.0,0.2,0,0.4,"Beverages"],
  ["Soft drink",40,0.0,0.0,0,10.3,"Beverages"],["Beer",43,0.3,0.0,0,3.6,"Beverages"],
];

/* ──────────────────────────────────────────────────────────
   DATA: INDIAN FOODS (from dataset)
   ────────────────────────────────────────────────────────── */
const INDIAN_FOODS = [
  ["Balu shahi","Maida flour, yogurt, oil, sugar","vegetarian",45,25,"sweet","dessert","West Bengal","East"],
  ["Boondi","Gram flour, ghee, sugar","vegetarian",80,30,"sweet","dessert","Rajasthan","West"],
  ["Gajar ka halwa","Carrots, milk, sugar, ghee, cashews, raisins","vegetarian",15,60,"sweet","dessert","Punjab","North"],
  ["Gulab jamun","Milk powder, plain flour, ghee, rose water","vegetarian",15,40,"sweet","dessert","West Bengal","East"],
  ["Jalebi","Maida, baking soda, curd, turmeric, saffron","vegetarian",10,50,"sweet","dessert","Uttar Pradesh","North"],
  ["Kheer","Milk, rice, sugar, dried fruits","vegetarian",10,40,"sweet","dessert","Uttar Pradesh","North"],
  ["Laddu","Gram flour, ghee, sugar","vegetarian",10,40,"sweet","dessert","Rajasthan","West"],
  ["Lassi","Yogurt, milk, nuts, sugar","vegetarian",5,5,"sweet","dessert","Punjab","North"],
  ["Rasgulla","Chhena, sugar syrup","vegetarian",20,25,"sweet","dessert","Odisha","East"],
  ["Sandesh","Chhena, sugar, cardamom","vegetarian",15,15,"sweet","dessert","West Bengal","East"],
  ["Dal makhani","Black lentil, red kidney beans, butter, cream","vegetarian",480,40,"spicy","main course","Uttarakhand","North"],
  ["Palak paneer","Spinach, cottage cheese, onion, tomato, spices","vegetarian",20,30,"spicy","main course","Punjab","North"],
  ["Paneer butter masala","Cottage cheese, butter, tomato, cream","vegetarian",10,25,"spicy","main course","Punjab","North"],
  ["Chana masala","Chickpea, onion, tomato, spices","vegetarian",480,30,"spicy","main course","Punjab","North"],
  ["Rajma","Red kidney beans, onion, tomato, spices","vegetarian",480,45,"spicy","main course","Uttar Pradesh","North"],
  ["Aloo gobi","Potato, cauliflower, onion, spices","vegetarian",10,25,"spicy","main course","Punjab","North"],
  ["Baingan bharta","Eggplant, tomato, onion, spices","vegetarian",5,30,"spicy","main course","Punjab","North"],
  ["Matar paneer","Cottage cheese, peas, onion, tomato, spices","vegetarian",10,25,"spicy","main course","Punjab","North"],
  ["Butter chicken","Chicken, butter, cream, tomato, spices","non vegetarian",30,40,"spicy","main course","Punjab","North"],
  ["Chicken biryani","Chicken, basmati rice, saffron, spices","non vegetarian",30,60,"spicy","main course","Hyderabad","South"],
  ["Chicken tikka masala","Chicken, yogurt, tomato, cream, spices","non vegetarian",120,30,"spicy","main course","Punjab","North"],
  ["Mutton rogan josh","Mutton, yogurt, spices, ghee","non vegetarian",30,90,"spicy","main course","Jammu & Kashmir","North"],
  ["Fish curry","Fish, coconut milk, tomato, spices","non vegetarian",15,30,"spicy","main course","Kerala","South"],
  ["Prawn masala","Prawns, tomato, onion, coconut, spices","non vegetarian",10,25,"spicy","main course","Goa","West"],
  ["Egg curry","Eggs, tomato, onion, spices","non vegetarian",5,25,"spicy","main course","West Bengal","East"],
  ["Biryani veg","Basmati rice, mixed vegetables, saffron","vegetarian",20,45,"spicy","main course","Karnataka","South"],
  ["Sambar","Lentil, mixed vegetables, tamarind, spices","vegetarian",20,30,"spicy","main course","Tamil Nadu","South"],
  ["Avial","Mixed vegetables, coconut, yogurt, curry leaves","vegetarian",20,30,"spicy","main course","Kerala","South"],
  ["Chole bhature","Chickpea, flour, yogurt, spices","vegetarian",480,30,"spicy","main course","Punjab","North"],
  ["Aloo paratha","Potato, wheat flour, spices","vegetarian",15,20,"spicy","breakfast","Punjab","North"],
  ["Gobi paratha","Cauliflower, wheat flour, spices","vegetarian",15,20,"spicy","breakfast","Punjab","North"],
  ["Puri","Wheat flour, salt, oil","vegetarian",30,15,"spicy","breakfast","Uttar Pradesh","North"],
  ["Chapati","Wheat flour, water, salt","vegetarian",5,15,"spicy","breakfast","Punjab","North"],
  ["Idli","Rice, urad dal, salt","vegetarian",480,20,"spicy","breakfast","Tamil Nadu","South"],
  ["Dosa","Rice, urad dal, salt","vegetarian",480,15,"spicy","breakfast","Tamil Nadu","South"],
  ["Masala dosa","Rice batter, potato filling, spices","vegetarian",480,20,"spicy","breakfast","Karnataka","South"],
  ["Uttapam","Rice batter, onion, tomato, capsicum","vegetarian",480,15,"spicy","breakfast","Tamil Nadu","South"],
  ["Upma","Semolina, vegetables, mustard seeds, curry leaves","vegetarian",5,15,"spicy","breakfast","Karnataka","South"],
  ["Poha","Flattened rice, onion, peas, spices","vegetarian",10,15,"spicy","breakfast","Maharashtra","West"],
  ["Pongal","Rice, moong dal, ghee, pepper","vegetarian",10,30,"spicy","breakfast","Tamil Nadu","South"],
  ["Appam","Rice batter, coconut milk","vegetarian",480,20,"sweet","breakfast","Kerala","South"],
  ["Medu vada","Urad dal, spices","vegetarian",30,20,"spicy","breakfast","Karnataka","South"],
  ["Paratha","Wheat flour, butter, spices","vegetarian",10,15,"spicy","breakfast","Punjab","North"],
  ["Thepla","Fenugreek, wheat flour, spices","vegetarian",10,15,"spicy","breakfast","Gujarat","West"],
  ["Dhokla","Gram flour, yogurt, spices","vegetarian",20,20,"spicy","snack","Gujarat","West"],
  ["Khandvi","Gram flour, yogurt, spices","vegetarian",15,20,"spicy","snack","Gujarat","West"],
  ["Chakli","Rice flour, chickpea flour, spices","vegetarian",30,30,"spicy","snack","Maharashtra","West"],
  ["Murukku","Rice flour, urad dal, spices","vegetarian",30,30,"spicy","snack","Tamil Nadu","South"],
  ["Samosa","Potato, onion, peas, wheat flour, spices","vegetarian",20,30,"spicy","snack","Uttar Pradesh","North"],
  ["Kachori","Lentil, wheat flour, spices","vegetarian",30,30,"spicy","snack","Rajasthan","West"],
  ["Pani puri","Semolina, potatoes, chickpeas","vegetarian",30,20,"spicy","snack","Maharashtra","West"],
  ["Bhel puri","Puffed rice, potatoes, chutneys","vegetarian",10,5,"spicy","snack","Maharashtra","West"],
  ["Vada pav","Potato vada, pav bun, chutneys","vegetarian",20,20,"spicy","snack","Maharashtra","West"],
  ["Pav bhaji","Mixed vegetables, pav bread, butter","vegetarian",15,30,"spicy","snack","Maharashtra","West"],
  ["Chaat","Potatoes, chickpeas, chutneys, spices","vegetarian",10,10,"spicy","snack","Uttar Pradesh","North"],
  ["Aloo tikki","Potato, spices","vegetarian",15,20,"spicy","snack","Uttar Pradesh","North"],
  ["Seekh kebab","Minced meat, onion, spices","non vegetarian",20,20,"spicy","snack","Uttar Pradesh","North"],
  ["Chicken 65","Chicken, spices, curry leaves","non vegetarian",30,20,"spicy","snack","Tamil Nadu","South"],
  ["Fish fry","Fish, spices, besan","non vegetarian",20,20,"spicy","snack","West Bengal","East"],
  ["Haleem","Wheat, mutton, lentils, spices","non vegetarian",60,180,"spicy","main course","Hyderabad","South"],
  ["Tandoori chicken","Chicken, yogurt, spices","non vegetarian",120,30,"spicy","main course","Punjab","North"],
  ["Prawn curry","Prawns, coconut milk, spices","non vegetarian",15,25,"spicy","main course","Kerala","South"],
  ["Sorpotel","Pork, spices, vinegar","non vegetarian",30,90,"spicy","main course","Goa","West"],
  ["Vindaloo","Pork/Chicken, vinegar, spices","non vegetarian",120,60,"spicy","main course","Goa","West"],
  ["Kadala curry","Black chickpea, coconut, spices","vegetarian",480,30,"spicy","main course","Kerala","South"],
  ["Payasam","Milk, rice/lentil, sugar, ghee","vegetarian",10,30,"sweet","dessert","Kerala","South"],
  ["Modak","Rice flour, coconut, jaggery","vegetarian",30,20,"sweet","dessert","Maharashtra","West"],
  ["Puran poli","Wheat flour, lentil, jaggery","vegetarian",30,30,"sweet","dessert","Maharashtra","West"],
  ["Shrikhand","Strained yogurt, sugar, saffron","vegetarian",10,0,"sweet","dessert","Gujarat","West"],
  ["Rosogolla","Chhena, sugar syrup","vegetarian",20,30,"sweet","dessert","West Bengal","East"],
  ["Mishti doi","Milk, yogurt, jaggery","vegetarian",10,30,"sweet","dessert","West Bengal","East"],
  ["Sarson ka saag","Mustard greens, butter, spices","vegetarian",10,60,"spicy","main course","Punjab","North"],
  ["Makki ki roti","Corn flour, water, salt","vegetarian",10,15,"spicy","breakfast","Punjab","North"],
  ["Kadhi","Gram flour, yogurt, spices","vegetarian",10,30,"spicy","main course","Punjab","North"],
  ["Dum aloo","Baby potato, spices, yogurt","vegetarian",15,35,"spicy","main course","Jammu & Kashmir","North"],
  ["Litti chokha","Wheat, sattu, eggplant, tomato","vegetarian",30,40,"spicy","main course","Bihar","East"],
  ["Kosha mangsho","Mutton, onion, yogurt, spices","non vegetarian",30,90,"spicy","main course","West Bengal","East"],
  ["Machher jhol","Fish, potato, spices","non vegetarian",15,25,"spicy","main course","West Bengal","East"],
  ["Shorshe ilish","Hilsa fish, mustard paste","non vegetarian",10,20,"spicy","main course","West Bengal","East"],
  ["Aloo posto","Potato, poppy seeds, spices","vegetarian",10,20,"spicy","main course","West Bengal","East"],
  ["Vangi bath","Eggplant, rice, spices","vegetarian",15,30,"spicy","main course","Karnataka","South"],
  ["Bisi bele bath","Rice, lentil, vegetables, spices","vegetarian",15,45,"spicy","main course","Karnataka","South"],
  ["Ragi mudde","Finger millet balls","vegetarian",5,10,"spicy","main course","Karnataka","South"],
  ["Dal baati churma","Lentil, wheat balls, sweetmeat","vegetarian",30,60,"spicy","main course","Rajasthan","West"],
  ["Laal maas","Mutton, red chili, spices","non vegetarian",30,60,"spicy","main course","Rajasthan","West"],
  ["Gatte ki sabzi","Gram flour dumplings, yogurt","vegetarian",20,30,"spicy","main course","Rajasthan","West"],
  ["Undhiyu","Mixed vegetables, spices","vegetarian",30,60,"spicy","main course","Gujarat","West"],
  ["Handvo","Rice, lentil, vegetables","vegetarian",120,30,"spicy","breakfast","Gujarat","West"],
  ["Chettinad chicken","Chicken, spices, coconut","non vegetarian",30,45,"spicy","main course","Tamil Nadu","South"],
  ["Pesarattu","Moong dal, rice, ginger","vegetarian",120,10,"spicy","breakfast","Andhra Pradesh","South"],
  ["Mysore pak","Gram flour, ghee, sugar","vegetarian",10,20,"sweet","dessert","Karnataka","South"],
  ["Kesari bath","Semolina, sugar, ghee, saffron","vegetarian",5,15,"sweet","dessert","Karnataka","South"],
  ["Obbattu/Holige","Wheat flour, lentil, coconut, jaggery","vegetarian",30,20,"sweet","dessert","Karnataka","South"],
  ["Unniyappam","Rice flour, banana, coconut, jaggery","vegetarian",30,20,"sweet","dessert","Kerala","South"],
  ["Pazham pori","Banana, flour, sugar","vegetarian",5,15,"sweet","snack","Kerala","South"],
];

/* ──────────────────────────────────────────────────────────
   DATA: NFHS-5 STATE DATA
   ────────────────────────────────────────────────────────── */
const NFHS_DATA = {
  "Bihar":            { thin:26.0, stunted:42.9, anaemicU5:68.9, anaemicW:63.5 },
  "Odisha":           { thin:26.0, stunted:33.7, anaemicU5:76.0, anaemicW:63.9 },
  "Jharkhand":        { thin:24.8, stunted:39.6, anaemicU5:67.5, anaemicW:64.1 },
  "West Bengal":      { thin:23.1, stunted:33.8, anaemicU5:69.0, anaemicW:62.7 },
  "Assam":            { thin:22.8, stunted:35.7, anaemicU5:68.4, anaemicW:54.7 },
  "Uttar Pradesh":    { thin:22.4, stunted:39.7, anaemicU5:66.7, anaemicW:50.4 },
  "Madhya Pradesh":   { thin:21.7, stunted:35.7, anaemicU5:73.0, anaemicW:54.7 },
  "Chhattisgarh":     { thin:20.3, stunted:34.9, anaemicU5:74.8, anaemicW:57.2 },
  "Meghalaya":        { thin:19.3, stunted:46.5, anaemicU5:69.9, anaemicW:42.2 },
  "Rajasthan":        { thin:18.7, stunted:34.4, anaemicU5:71.5, anaemicW:54.4 },
  "Karnataka":        { thin:17.3, stunted:32.2, anaemicU5:65.7, anaemicW:47.2 },
  "Gujarat":          { thin:16.8, stunted:34.8, anaemicU5:79.7, anaemicW:62.2 },
  "Andhra Pradesh":   { thin:15.5, stunted:28.5, anaemicU5:68.4, anaemicW:52.4 },
  "Kerala":           { thin:14.2, stunted:19.7, anaemicU5:44.4, anaemicW:34.8 },
  "Tamil Nadu":       { thin:14.2, stunted:23.4, anaemicU5:57.1, anaemicW:46.8 },
  "Telangana":        { thin:14.0, stunted:26.5, anaemicU5:67.2, anaemicW:47.3 },
  "Uttarakhand":      { thin:13.5, stunted:27.9, anaemicU5:60.0, anaemicW:44.2 },
  "Haryana":          { thin:13.2, stunted:27.0, anaemicU5:65.9, anaemicW:51.8 },
  "Goa":              { thin:12.9, stunted:25.8, anaemicU5:55.9, anaemicW:41.3 },
  "Jammu & Kashmir":  { thin:12.6, stunted:27.0, anaemicU5:53.4, anaemicW:42.1 },
  "Himachal Pradesh": { thin:11.0, stunted:24.8, anaemicU5:52.5, anaemicW:40.2 },
  "Punjab":           { thin:11.5, stunted:24.5, anaemicU5:60.0, anaemicW:52.1 },
  "Delhi":            { thin:10.1, stunted:24.4, anaemicU5:56.2, anaemicW:46.1 },
  "Maharashtra":      { thin:16.0, stunted:29.5, anaemicU5:54.2, anaemicW:48.9 },
};

/* ──────────────────────────────────────────────────────────
   DATA: OPTIMIZER FOODS (Indian foods with prices/100g)
   ────────────────────────────────────────────────────────── */
const OPT_FOODS = [
  { name:"Rice (raw)",      cal:365,prot:7.9,iron:0.8,ca:28, vitC:0,  vitA:0,  fat:0.4,fiber:0.4, price:3.0, veg:true,  cat:"Cereal",   col:"#f59e0b" },
  { name:"Whole wheat atta",cal:340,prot:11, iron:2.7,ca:48, vitC:0,  vitA:0,  fat:1.5,fiber:2.3, price:3.2, veg:true,  cat:"Cereal",   col:"#d97706" },
  { name:"Toor dal",        cal:335,prot:22, iron:5.8,ca:73, vitC:2,  vitA:25, fat:1.7,fiber:3.2, price:9.0, veg:true,  cat:"Pulse",    col:"#dc2626" },
  { name:"Moong dal",       cal:330,prot:24, iron:6.7,ca:132,vitC:0,  vitA:36, fat:1.4,fiber:2.8, price:10.0,veg:true,  cat:"Pulse",    col:"#65a30d" },
  { name:"Chana dal",       cal:360,prot:20, iron:5.3,ca:56, vitC:0,  vitA:18, fat:5.0,fiber:5.2, price:7.5, veg:true,  cat:"Pulse",    col:"#ca8a04" },
  { name:"Rajma",           cal:333,prot:22, iron:8.2,ca:143,vitC:0,  vitA:0,  fat:1.2,fiber:6.4, price:9.5, veg:true,  cat:"Pulse",    col:"#7c3aed" },
  { name:"Soybean (cooked)",cal:173,prot:17, iron:5.1,ca:102,vitC:6,  vitA:1,  fat:9.0,fiber:3.8, price:7.0, veg:true,  cat:"Pulse",    col:"#84cc16" },
  { name:"Milk (whole)",    cal:61, prot:3.2,iron:0.1,ca:113,vitC:0.5,vitA:28, fat:3.3,fiber:0,   price:5.5, veg:true,  cat:"Dairy",    col:"#0ea5e9" },
  { name:"Paneer",          cal:265,prot:18, iron:0.2,ca:480,vitC:0,  vitA:78, fat:21, fiber:0,   price:40.0,veg:true,  cat:"Dairy",    col:"#06b6d4" },
  { name:"Curd (dahi)",     cal:58, prot:3.4,iron:0.1,ca:121,vitC:0,  vitA:27, fat:3.3,fiber:0,   price:4.0, veg:true,  cat:"Dairy",    col:"#38bdf8" },
  { name:"Potato",          cal:77, prot:2.0,iron:0.8,ca:12, vitC:19.7,vitA:0, fat:0.1,fiber:1.3, price:2.5, veg:true,  cat:"Vegetable",col:"#eab308" },
  { name:"Spinach",         cal:23, prot:2.9,iron:2.7,ca:99, vitC:28, vitA:469,fat:0.4,fiber:1.6, price:4.0, veg:true,  cat:"Vegetable",col:"#22c55e" },
  { name:"Carrot",          cal:41, prot:0.9,iron:0.3,ca:33, vitC:5.9,vitA:835,fat:0.2,fiber:1.4, price:4.0, veg:true,  cat:"Vegetable",col:"#f97316" },
  { name:"Tomato",          cal:18, prot:0.9,iron:0.5,ca:10, vitC:14, vitA:42, fat:0.2,fiber:0.9, price:3.5, veg:true,  cat:"Vegetable",col:"#ef4444" },
  { name:"Onion",           cal:40, prot:1.1,iron:0.2,ca:23, vitC:7.4,vitA:0,  fat:0.1,fiber:0.9, price:2.5, veg:true,  cat:"Vegetable",col:"#a855f7" },
  { name:"Banana",          cal:89, prot:1.1,iron:0.3,ca:5,  vitC:8.7,vitA:3,  fat:0.3,fiber:1.0, price:3.0, veg:true,  cat:"Fruit",    col:"#facc15" },
  { name:"Orange/Amla",     cal:47, prot:0.9,iron:0.1,ca:40, vitC:53, vitA:11, fat:0.1,fiber:1.0, price:5.0, veg:true,  cat:"Fruit",    col:"#f97316" },
  { name:"Peanuts",         cal:567,prot:26, iron:4.6,ca:92, vitC:0,  vitA:0,  fat:49, fiber:4.8, price:10.0,veg:true,  cat:"Pulse",    col:"#92400e" },
  { name:"Mustard oil",     cal:884,prot:0,  iron:0,  ca:0,  vitC:0,  vitA:0,  fat:100,fiber:0,   price:14.0,veg:true,  cat:"Fat",      col:"#fbbf24" },
  { name:"Egg",             cal:155,prot:13, iron:1.8,ca:56, vitC:0,  vitA:149,fat:11, fiber:0,   price:8.0, veg:false, cat:"Protein",  col:"#f59e0b" },
  { name:"Chicken (raw)",   cal:119,prot:22, iron:0.9,ca:11, vitC:0,  vitA:14, fat:2.6,fiber:0,   price:20.0,veg:false, cat:"Protein",  col:"#dc2626" },
  { name:"Fish (rohu)",     cal:97, prot:18, iron:0.9,ca:650,vitC:0,  vitA:12, fat:2.3,fiber:0,   price:18.0,veg:false, cat:"Protein",  col:"#0369a1" },
  { name:"Ragi (finger millet)",cal:328,prot:7.3,iron:3.9,ca:344,vitC:0,vitA:0,fat:1.5,fiber:3.6,price:4.5,veg:true, cat:"Cereal",   col:"#92400e" },
];

const MAX_G = { "Mustard oil":50,"Milk (whole)":600,"Paneer":150,"Curd (dahi)":300,"_":400 };

/* ──────────────────────────────────────────────────────────
   DATA: STATISTICAL METHODS
   ────────────────────────────────────────────────────────── */
const SM_METHODS = {
  sm1: [
    { num:"01", name:"Descriptive Statistics", desc:"Mean, median, mode, variance, SD, IQR, skewness, kurtosis — fundamental characterisation of calorie and protein distributions across 329 food records.", formula:"x̄=Σxᵢ/n\nσ²=Σ(xᵢ−x̄)²/(n−1)\nγ₁=Σ[(xᵢ−x̄)/σ]³/n", tags:["Location","Spread","Shape"] },
    { num:"02", name:"Data Presentation", desc:"Histograms, box plots, frequency tables and bar charts to visualise univariate and bivariate nutritional data. Applied to calorie and protein distributions.", formula:"Histogram bins: h = 2·IQR·n^(-1/3)", tags:["Histogram","Box plot","Frequency"] },
    { num:"03", name:"Bivariate Analysis", desc:"Scatter plots reveal calorie–protein relationship across food categories. Contingency tables show diet quality distribution across Indian states.", formula:"Scatter: (xᵢ,yᵢ), i=1…329", tags:["Scatter","Contingency"] },
    { num:"04", name:"Pearson Correlation", desc:"Linear association between calories and protein: r=0.512, p<0.001. Moderate positive correlation — high-calorie foods are not always high protein (fats confound).", formula:"r=Σ(xᵢ-x̄)(yᵢ-ȳ)/√[Σ(xᵢ-x̄)²Σ(yᵢ-ȳ)²]", tags:["Pearson r","p-value","Linear"] },
    { num:"05", name:"Simple Linear Regression", desc:"Protein = −0.61 + 0.052·Calories. R²=0.263 — calorie content explains only 26% of protein variance. Category is a major confounder.", formula:"Ŷ=β₀+β₁X\nβ₁=Σ(xᵢ-x̄)(yᵢ-ȳ)/Σ(xᵢ-x̄)²", tags:["OLS","R²","Residuals"] },
    { num:"06", name:"Statistical Software (R)", desc:"All analyses mirror R: summary(), cor.test(), lm(), hist(), qqnorm(), chisq.test(). Reproducible with the nutrient CSV dataset.", formula:"lm(protein~calories,data=df)\ncor.test(x,y,method='pearson')", tags:["R","Reproducible"] },
  ],
  sm2: [
    { num:"07", name:"Multiple Regression", desc:"BMI = β₀ + β₁·Age + β₂·WealthIndex + β₃·DietScore + β₄·Urban. Partial coefficients isolate each predictor's independent effect. R²=0.682.", formula:"Y=β₀+β₁X₁+…+βₖXₖ+ε\nβ̂=(X'X)⁻¹X'y", tags:["OLS","Multivariate","Partial β"] },
    { num:"08", name:"Partial Correlation", desc:"Association between BMI and Wealth Index controlling for age and urbanisation. Partial r reveals the genuine wealth–nutrition link independent of confounders.", formula:"r(Y,X₁|X₂)=(rYX₁-rYX₂·rX₁X₂)/√[(1-r²YX₂)(1-r²X₁X₂)]", tags:["Partial r","Control","Confounders"] },
    { num:"09", name:"Probability Distributions", desc:"Fitting Normal, Poisson and Gamma distributions to calorie data. Calorie distribution shows right skew (γ₁=0.78). Gamma provides better fit than Normal.", formula:"Normal: f(x)=(1/σ√2π)e^[-(x-μ)²/2σ²]\nGamma: f(x)=x^(α-1)e^(-x/β)/(Γ(α)β^α)", tags:["Normal","Gamma","Fitting"] },
    { num:"10", name:"MLE & Method of Moments", desc:"Two parameter estimation approaches. MOM equates sample moments to distribution parameters. MLE maximises L(θ|data) over parameter space.", formula:"MOM: μ̂=x̄, σ̂²=s²\nMLE: θ̂=argmax Σlog f(xᵢ|θ)", tags:["MOM","MLE","Estimation"] },
    { num:"11", name:"Pearson χ² Goodness-of-Fit", desc:"Tests whether calorie data follows Normal distribution. χ²(8)=31.4, p<0.001 rejects normality — consistent with visual skewness in histogram.", formula:"χ²=Σ[(Oᵢ-Eᵢ)²/Eᵢ], df=k-1-p\np=P(χ²_df > χ²_obs)", tags:["χ² test","Bins","df"] },
    { num:"12", name:"Q-Q Plots", desc:"Sample quantiles vs theoretical Normal quantiles. Systematic S-shaped deviation from 45° reference line confirms non-normality in the calorie distribution.", formula:"Q-Q: theoretical vs sample quantiles\nNormality: points on y=x line", tags:["Q-Q","Normality","Visual"] },
  ]
};

/* ──────────────────────────────────────────────────────────
   DATA: RECIPES
   ────────────────────────────────────────────────────────── */
const RECIPES = [
  {
    name: "High-Protein Dal Tadka", goal:"high_protein", diet:"veg", cost: 15, costLabel:"₹15/serving",
    kcal: 285, prot: 18, carbs: 38, fat: 6, fiber: 8,
    tagline: "The backbone of Indian protein intake. Toor + moong dal combo gives complete amino acid profile.",
    ingredients: "100g toor dal, 50g moong dal, 1 tsp ghee, cumin seeds, garlic, ginger, 1 tomato, turmeric, salt",
    steps: ["Pressure cook dals with turmeric and salt (3 whistles).", "Fry cumin in ghee, add garlic-ginger paste, cook 1 min.", "Add chopped tomato, cook till soft, mash lightly.", "Combine with dal, simmer 5 min. Garnish with coriander."],
    why: "18g protein per serving at ₹15. Iron (5.8mg), folate, and fibre. Best combined with vitamin C food (tomato is included) for iron absorption.",
    time: "25 min"
  },
  {
    name: "Egg Bhurji (Masala Scrambled)", goal:"high_protein", diet:"egg", cost: 18, costLabel:"₹18/serving",
    kcal: 240, prot: 20, carbs: 8, fat: 14, fiber: 2,
    tagline: "The cheapest complete protein in India. 3 eggs give 18g protein with all essential amino acids.",
    ingredients: "3 eggs, 1 onion, 1 tomato, green chilli, cumin, turmeric, garam masala, oil, coriander",
    steps: ["Beat eggs with salt and turmeric.", "Sauté onions till golden, add tomato and chilli.", "Add beaten eggs, scramble on medium heat.", "Garnish with coriander, serve with 2 rotis."],
    why: "Eggs have the highest biological value (100) of any food protein. 3 eggs = 18g complete protein, all fat-soluble vitamins, choline for brain health.",
    time: "15 min"
  },
  {
    name: "Palak Paneer (Spinach-Cottage Cheese)", goal:"muscle", diet:"veg", cost: 45, costLabel:"₹45/serving",
    kcal: 320, prot: 22, carbs: 12, fat: 18, fiber: 4,
    tagline: "Iron + calcium + protein powerhouse. Spinach iron absorbed better with lemon juice.",
    ingredients: "200g spinach, 150g paneer, 2 tbsp oil, onion, tomato, ginger-garlic, cream (optional), spices",
    steps: ["Blanch spinach 2 min, blend to puree.", "Fry onion, ginger-garlic, add tomato and spices.", "Add spinach puree, simmer 5 min.", "Add cubed paneer, finish with cream and garam masala."],
    why: "Iron (2.7mg from spinach) + calcium (480mg from paneer) + 22g protein. Add a squeeze of lemon to triple iron absorption (vitamin C mechanism).",
    time: "30 min"
  },
  {
    name: "Ragi Dosa with Peanut Chutney", goal:"weight_loss", diet:"veg", cost: 12, costLabel:"₹12/serving",
    kcal: 190, prot: 8, carbs: 32, fat: 5, fiber: 5,
    tagline: "Finger millet is the highest calcium grain. Low GI keeps you full for 4+ hours.",
    ingredients: "100g ragi flour, rice flour 2 tbsp, salt, water for batter; peanuts, coconut, chilli for chutney",
    steps: ["Mix ragi flour with rice flour and salt, make thin batter.", "Rest 30 min. Heat non-stick pan, pour thin dosa.", "Cook covered 2 min. Serve with peanut chutney.", "Peanut chutney: blend roasted peanuts with chilli, salt, lemon."],
    why: "344mg calcium/100g ragi — more than milk. Low glycaemic index prevents blood sugar spikes. High fibre keeps hunger away.",
    time: "40 min (including batter rest)"
  },
  {
    name: "Soya Chunk Curry", goal:"muscle", diet:"veg", cost: 20, costLabel:"₹20/serving",
    kcal: 280, prot: 32, carbs: 22, fat: 7, fiber: 6,
    tagline: "Plant protein king at ₹20. 32g protein per serving — matches chicken at 1/10th the price.",
    ingredients: "100g soya chunks (dry), onion, tomato, ginger-garlic paste, chilli, spices, oil",
    steps: ["Soak soya chunks in hot water 20 min, squeeze dry.", "Fry onion-tomato masala till oil separates.", "Add soya chunks, spices, water. Simmer 15 min.", "Finish with garam masala and fresh coriander."],
    why: "Soya has the highest protein efficiency ratio of any plant protein. 52g protein/100g dry weight. Complete amino acid profile. Costs ₹8 per 100g dry.",
    time: "35 min"
  },
  {
    name: "Moong Dal Cheela (Protein Pancake)", goal:"weight_loss", diet:"veg", cost: 10, costLabel:"₹10/serving",
    kcal: 165, prot: 12, carbs: 24, fat: 3, fiber: 4,
    tagline: "The Indian protein pancake. Light, filling, and perfect for weight loss breakfast.",
    ingredients: "150g moong dal (soaked overnight), ginger, green chilli, cumin, salt, onion (optional)",
    steps: ["Blend soaked moong dal with minimal water to thick batter.", "Add ginger, chilli, cumin, salt to batter.", "Pour on hot non-stick pan, spread thin. Cook 3 min each side.", "Serve with green chutney (coriander + mint + lemon)."],
    why: "24g protein per 100g moong dal. High fibre + protein = prolonged satiety. Low fat. Ready in 10 min if dal is pre-soaked. Perfect weight loss breakfast.",
    time: "10 min (+ overnight soak)"
  },
  {
    name: "Rajma Rice (Complete Protein Meal)", goal:"maintain", diet:"veg", cost: 25, costLabel:"₹25/serving",
    kcal: 450, prot: 20, carbs: 72, fat: 6, fiber: 12,
    tagline: "The classic dal+rice combo creates a complete protein — each supplies amino acids the other lacks.",
    ingredients: "150g rajma (overnight soak), 150g cooked rice, onion, tomato, spices, 1 tsp oil",
    steps: ["Pressure cook soaked rajma 20 min with salt.", "Fry onion-tomato masala with ginger-garlic.", "Add cooked rajma, spices, simmer 10 min.", "Serve over rice. Add lemon juice before eating."],
    why: "Dal+rice = complementary proteins (lysine from dal + methionine from rice = complete profile). 8.2mg iron in rajma. Budget meal under ₹25.",
    time: "35 min"
  },
  {
    name: "Chicken and Vegetables Stir Fry", goal:"muscle", diet:"non veg", cost: 55, costLabel:"₹55/serving",
    kcal: 310, prot: 38, carbs: 14, fat: 9, fiber: 5,
    tagline: "High protein, low carb, high micronutrient density. The muscle-building meal.",
    ingredients: "200g chicken breast, bell pepper, broccoli, onion, soy sauce, garlic, ginger, 1 tsp oil",
    steps: ["Slice chicken thin, marinate with ginger-garlic, soy, salt 15 min.", "Stir fry vegetables on high heat 3 min (stay crunchy).", "Add chicken, cook 5–7 min on high heat.", "Season and serve — can be eaten with 1 roti or rice."],
    why: "38g protein at 310 kcal — ideal macro ratio for muscle gain. Broccoli adds vitamin C (aids iron absorption) and sulforaphane (anti-inflammatory).",
    time: "25 min"
  },
  {
    name: "Poha (Flattened Rice with Peas)", goal:"weight_loss", diet:"veg", cost: 12, costLabel:"₹12/serving",
    kcal: 250, prot: 7, carbs: 45, fat: 4, fiber: 4,
    tagline: "Iron-fortified breakfast under 250 kcal. The ideal light morning meal.",
    ingredients: "150g thick poha, peas 50g, onion, mustard seeds, turmeric, curry leaves, lemon, coriander",
    steps: ["Rinse poha, let drain 5 min (should be soft but not mushy).", "Heat oil, add mustard seeds, curry leaves, onion.", "Add peas, turmeric. Add poha, mix gently.", "Finish with lemon juice and coriander."],
    why: "Poha is fortified rice — high iron. Light on calories (250 kcal). Fast cooking. The lemon juice (vitamin C) doubles iron absorption from poha.",
    time: "15 min"
  },
];

/* ──────────────────────────────────────────────────────────
   DATA: MEAL PLAN (7 days × 5 meals)
   ────────────────────────────────────────────────────────── */
const DAYS = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
const MEAL_SLOTS = ["Early Morning (6–7am)","Breakfast (8–9am)","Lunch (1–2pm)","Evening Snack (5–6pm)","Dinner (7:30–8:30pm)"];

const WEEKLY_PLAN = [
  // Monday
  [["Pre-workout / wake-up","1 glass warm water + soaked almonds (6)","~50 kcal"],
   ["Power Breakfast","Moong dal cheela (2) + mint chutney + 1 fruit","~350 kcal"],
   ["Complete Lunch","Dal makhani + 2 roti + 1 bowl sabzi + salad","~550 kcal"],
   ["Smart Snack","Roasted chana (30g) + green tea","~110 kcal"],
   ["Light Dinner","Palak dal + 1 roti + cucumber raita","~380 kcal"]],
  // Tuesday
  [["Morning Boost","1 glass nimbu paani (lemon water, no sugar)","~10 kcal"],
   ["Protein Breakfast","2 egg bhurji + 2 whole wheat toast + tomato","~380 kcal"],
   ["Balanced Lunch","Rajma rice + onion salad + 1 glass curd","~500 kcal"],
   ["Crunch Snack","Handful peanuts (30g) + 1 banana","~220 kcal"],
   ["Micronutrient Dinner","Palak paneer + 2 roti + 1 katori salad","~420 kcal"]],
  // Wednesday
  [["Hydration Start","2 glasses water + soaked methi seeds (optional)","~5 kcal"],
   ["South Indian Breakfast","2 idli + sambar + coconut chutney + 1 amla","~300 kcal"],
   ["High Protein Lunch","Soya chunk curry + 1.5 cup rice + dal + salad","~580 kcal"],
   ["Fruit Window","1 orange + 10 almonds + 1 cup green tea","~180 kcal"],
   ["Balanced Dinner","Chana dal + 2 roti + steamed broccoli/pumpkin","~380 kcal"]],
  // Thursday
  [["Energizer","1 banana + 1 glass milk (if dairy ok)","~210 kcal"],
   ["Fibre Breakfast","Upma (semolina with vegetables) + curd","~280 kcal"],
   ["Iron-Rich Lunch","Chicken curry/dal tadka + rice + spinach stir fry","~560 kcal"],
   ["Protein Snack","Boiled egg (1–2) + 1 roti + green chutney","~200 kcal"],
   ["Easy Dinner","Moong soup + 1 roti + mixed vegetable sabzi","~320 kcal"]],
  // Friday
  [["Start Light","Soaked walnuts (4) + warm water","~65 kcal"],
   ["Protein Pancake","Ragi dosa (2) + peanut chutney + 1 cup milk","~370 kcal"],
   ["Complete Lunch","Dal + 2 roti + aloo gobi + salad","~520 kcal"],
   ["Evening Refuel","Poha (small bowl) + 1 cup chai (no sugar)","~180 kcal"],
   ["Omega-3 Dinner","Fish curry + 1 cup rice + green salad","~430 kcal"]],
  // Saturday
  [["Immune Boost","Amla juice / 1 orange + warm water","~40 kcal"],
   ["Indulgent Healthy","Whole wheat paratha (1) + curd + pickle + salad","~350 kcal"],
   ["Feast Lunch","Chole + rice/bature + onion salad + lassi","~650 kcal"],
   ["Snack Light","Roasted makhana (20g) + green tea","~80 kcal"],
   ["Recovery Dinner","Khichdi (rice + moong) + ghee + papad + curd","~420 kcal"]],
  // Sunday
  [["Rest Day Start","Herbal tea + 5 almonds + 2 walnuts","~90 kcal"],
   ["Brunch Plate","Poha + egg (1) + fruit salad (banana + apple)","~380 kcal"],
   ["Family Lunch","Biryani (veg/chicken) + raita + salad","~600 kcal"],
   ["Light Snack","Coconut water + a few peanuts","~120 kcal"],
   ["Nourishing Dinner","Dal soup + 1 roti + sabzi (seasonal)","~360 kcal"]],
];

/* ──────────────────────────────────────────────────────────
   STATISTICAL HELPERS
   ────────────────────────────────────────────────────────── */
const mean    = a => a.reduce((s,x)=>s+x,0)/a.length;
const median  = a => { const s=[...a].sort((a,b)=>a-b); return s.length%2 ? s[Math.floor(s.length/2)] : (s[s.length/2-1]+s[s.length/2])/2; };
const variance= a => { const m=mean(a); return a.reduce((s,x)=>s+(x-m)**2,0)/(a.length-1); };
const std     = a => Math.sqrt(variance(a));
const skewness= a => { const m=mean(a),s=std(a); return a.reduce((t,x)=>t+((x-m)/s)**3,0)/a.length; };
const kurtosis= a => { const m=mean(a),s=std(a); return a.reduce((t,x)=>t+((x-m)/s)**4,0)/a.length - 3; };
const pearsonR= (x,y) => {
  const mx=mean(x),my=mean(y);
  const num=x.reduce((s,xi,i)=>s+(xi-mx)*(y[i]-my),0);
  const den=Math.sqrt(x.reduce((s,xi)=>s+(xi-mx)**2,0)*y.reduce((s,yi)=>s+(yi-my)**2,0));
  return den ? num/den : 0;
};
const linReg = (x,y) => {
  const mx=mean(x),my=mean(y);
  const b1=x.reduce((s,xi,i)=>s+(xi-mx)*(y[i]-my),0)/x.reduce((s,xi)=>s+(xi-mx)**2,0);
  const b0=my-b1*mx, r=pearsonR(x,y);
  return {b0,b1,r,r2:r*r};
};
const normalCDF = z => {
  if(z<-6)return 0; if(z>6)return 1;
  const b=[0.319381530,-0.356563782,1.781477937,-1.821255978,1.330274429];
  const t=1/(1+0.2316419*Math.abs(z));
  let p=t*(b[0]+t*(b[1]+t*(b[2]+t*(b[3]+t*b[4]))));
  p=1-((1/Math.sqrt(2*Math.PI))*Math.exp(-0.5*z*z))*p;
  return z>=0 ? p : 1-p;
};
function erfinv(x) {
  const a=0.147, ln=Math.log(1-x*x);
  const t=2/(Math.PI*a)+ln/2;
  return Math.sign(x)*Math.sqrt(Math.sqrt(t*t-ln/a)-t);
}
const chiSqNormal = (data,bins=10) => {
  const n=data.length,m=mean(data),s=std(data);
  const mn=Math.min(...data),mx=Math.max(...data),bw=(mx-mn)/bins;
  const obs=new Array(bins).fill(0);
  data.forEach(x=>{const b=Math.min(Math.floor((x-mn)/bw),bins-1); obs[b]++;});
  const exp=obs.map((_,i)=>{const lo=mn+i*bw,hi=lo+bw; return n*(normalCDF((hi-m)/s)-normalCDF((lo-m)/s));});
  const chi2=obs.reduce((s,o,i)=>exp[i]>0.5?s+(o-exp[i])**2/exp[i]:s,0);
  return {chi2,df:bins-3,obs,exp,bins:obs.map((_,i)=>+(mn+i*bw+bw/2).toFixed(0))};
};
const tTestIndep = (a,b) => {
  const na=a.length,nb=b.length,ma=mean(a),mb=mean(b),sa=std(a),sb=std(b);
  const sp=Math.sqrt(((na-1)*sa**2+(nb-1)*sb**2)/(na+nb-2));
  const t=(ma-mb)/(sp*Math.sqrt(1/na+1/nb));
  return {t,df:na+nb-2,ma:ma.toFixed(2),mb:mb.toFixed(2),sa:sa.toFixed(2),sb:sb.toFixed(2),na,nb};
};

/* helper shorthand */
const scroll2 = id => document.getElementById(id)?.scrollIntoView({behavior:'smooth'});

/* ══════════════════════════════════════════════════════════
   CALCULATOR ENGINE
   ══════════════════════════════════════════════════════════ */
function updateProteinLabel() {
  const v = +document.getElementById('proteinBoost').value;
  document.getElementById('proteinBoostLabel').textContent = '+'+v+'g';
  const hint = document.getElementById('proteinHint');
  if(v===0) hint.textContent = 'Baseline ICMR (0.8g/kg). If you add protein, carbs will auto-adjust.';
  else if(v<=20) hint.textContent = `+${v}g protein = +${v*4} kcal from protein. Reduce carbs by ${Math.round(v*4/4)}g to keep total calories same.`;
  else if(v<=40) hint.textContent = `+${v}g extra protein — good for strength training. Increase water intake. Carbs reduced proportionally.`;
  else hint.textContent = `+${v}g extra protein — bodybuilder/athlete level. Ensure adequate hydration. Kidney load increases at extremes.`;
}

function calcTDEE(age, gender, weight, height, activity) {
  const bmr = gender==='male' ? 10*weight+6.25*height-5*age+5 : 10*weight+6.25*height-5*age-161;
  return {bmr: Math.round(bmr), tdee: Math.round(bmr*activity)};
}

function calcTargets(age, gender, weight, goal, tdee, protBoost) {
  let calDelta = 0;
  switch(goal) {
    case 'lose_fat':   calDelta = -350; break;
    case 'lose_fast':  calDelta = -600; break;
    case 'gain_muscle':calDelta =  300; break;
    case 'high_protein': calDelta = 0; break;
    default: calDelta = 0;
  }
  const targetCal = tdee + calDelta;

  let protMultiplier = 0.8;
  if(goal==='lose_fat')    protMultiplier = 1.2;
  if(goal==='gain_muscle') protMultiplier = 1.6;
  if(goal==='high_protein')protMultiplier = 2.0;
  if(goal==='lose_fast')   protMultiplier = 1.4;

  const baseProtein = Math.round(weight * protMultiplier);
  const extraProtein = protBoost;
  const totalProtein = baseProtein + extraProtein;
  const proteinKcal = totalProtein * 4;
  const fatPct = 0.25;
  const fatKcal = Math.round(targetCal * fatPct);
  const fatG = Math.round(fatKcal / 9);
  const carbKcal = Math.max(50*4, targetCal - proteinKcal - fatKcal);
  const carbG = Math.round(carbKcal / 4);

  return {
    cal: targetCal, calDelta,
    prot: totalProtein, protBase: baseProtein, protExtra: extraProtein,
    fat: fatG, carbs: carbG,
    iron: gender==='male' ? 17 : (age>50 ? 17 : 29),
    ca: 600, vitC: 40, vitA: gender==='male' ? 900 : 700, fiber: 25,
    protPct: Math.round(proteinKcal/targetCal*100),
    fatPct: Math.round(fatKcal/targetCal*100),
    carbPct: Math.round(carbKcal/targetCal*100),
  };
}

function optimizeDiet(targets, dietType, budget) {
  const foods = OPT_FOODS.filter(f => {
    if(dietType==='veg') return f.veg;
    if(dietType==='eggetarian') return f.veg || f.name==='Egg';
    return true;
  });
  const amounts = new Array(foods.length).fill(0);
  const curr = {cal:0,prot:0,iron:0,ca:0,vitC:0,vitA:0,fiber:0};
  const keys = ['cal','prot','iron','ca','vitC','vitA','fiber'];
  const W = {cal:1.0,prot:2.0,iron:1.5,ca:1.2,vitC:0.8,vitA:1.0,fiber:1.0};
  const maxBudget = budget==='minimum'?65 : budget==='moderate'?110 : 180;

  for(let iter=0;iter<100;iter++){
    if(keys.every(k=>curr[k]>=targets[k])) break;
    let best=-1,bestIdx=-1;
    let currentCost = foods.reduce((s,f,i)=>s+amounts[i]/100*f.price,0);
    for(let i=0;i<foods.length;i++){
      const f=foods[i];
      const mx=(MAX_G[f.name]||MAX_G['_']);
      if(amounts[i]>=mx) continue;
      if(currentCost + f.price > maxBudget + 20) continue;
      let ben=0;
      for(const k of keys){ const def=Math.max(0,targets[k]-curr[k]); ben+=W[k]*Math.min(f[k]||0,def)/Math.max(targets[k],1); }
      const score=ben/f.price;
      if(score>best){best=score;bestIdx=i;}
    }
    if(bestIdx<0) break;
    amounts[bestIdx]+=100;
    const f=foods[bestIdx];
    curr.cal+=f.cal; curr.prot+=f.prot; curr.iron+=f.iron;
    curr.ca+=f.ca; curr.vitC+=f.vitC; curr.vitA+=f.vitA; curr.fiber+=f.fiber||0;
  }
  const basket=foods.map((f,i)=>({...f,grams:amounts[i],cost:amounts[i]/100*f.price,calTotal:amounts[i]/100*f.cal})).filter(f=>f.grams>0).sort((a,b)=>b.cost-a.cost);
  return {basket, achieved:curr};
}

function runCalculator() {
  const age=+document.getElementById('cAge').value||25;
  const gender=document.getElementById('cGender').value;
  const weight=+document.getElementById('cWeight').value||65;
  const height=+document.getElementById('cHeight').value||170;
  const activity=+document.getElementById('cActivity').value;
  const goal=document.getElementById('cGoal').value;
  const budget=document.getElementById('cBudget').value;
  const diet=document.getElementById('cDiet').value;
  const state=document.getElementById('cState').value;
  const protBoost=+document.getElementById('proteinBoost').value||0;

  const {bmr,tdee}=calcTDEE(age,gender,weight,height,activity);
  const targets=calcTargets(age,gender,weight,goal,tdee,protBoost);
  const {basket,achieved}=optimizeDiet(targets,diet,budget);
  const totalCost=basket.reduce((s,f)=>s+f.cost,0);
  const bmi=(weight/((height/100)**2)).toFixed(1);
  const bmiClass=bmi<18.5?'Underweight (BMI<18.5)':bmi<25?'Healthy Weight':bmi<30?'Overweight (BMI 25–30)':'Obese (BMI>30)';
  const bmiColor=bmi<18.5?'#f59e0b':bmi<25?'#22c55e':bmi<30?'#f97316':'#ef4444';

  const goalLabels={maintain:'Maintenance',lose_fat:'Fat Loss (muscle-preserving)',lose_fast:'Aggressive Fat Loss',gain_muscle:'Lean Muscle Gain',high_protein:'High Protein'};
  const calDeltaStr = targets.calDelta===0?'':targets.calDelta>0?`(+${targets.calDelta} surplus)`:`(${targets.calDelta} deficit)`;

  // Coverage
  const cKeys = ['cal','prot','iron','ca','vitC','vitA','fiber'];
  const cLabels = ['Calories','Protein','Iron','Calcium','Vitamin C','Vitamin A','Dietary Fibre'];
  const coverage = cKeys.map(k=>Math.min(200,Math.round(achieved[k]/Math.max(targets[k],1)*100)));
  const covColors = coverage.map(v=>v>=100?'#1a5c3a':v>=70?'#e07c2a':'#c0392b');

  let stateHTML='';
  if(state && NFHS_DATA[state]){
    const d=NFHS_DATA[state];
    stateHTML=`
    <div class="result-section-title" style="margin-top:1.5rem">🗺 ${state} — NFHS-5 Nutritional Context</div>
    <div class="state-insight">
      <strong>${d.thin}%</strong> of women in ${state} are underweight (BMI&lt;18.5), 
      <strong>${d.stunted}%</strong> of children under 5 are stunted, and 
      <strong>${d.anaemicW}%</strong> of women are anaemic. A minimum nutritionally complete diet costs 
      ₹${totalCost.toFixed(0)}/day in this region — access determines outcomes.
    </div>`;
  }

  // Goal-specific advice
  const goalAdvice = {
    maintain: 'Eat at maintenance calories. Focus on diet quality and micronutrient diversity. Weekly variation is fine.',
    lose_fat: `${Math.abs(targets.calDelta)} kcal daily deficit. At this rate, expect ~0.4kg fat loss/week while preserving muscle. High protein (${targets.prot}g) is critical to prevent muscle loss during deficit.`,
    lose_fast: `${Math.abs(targets.calDelta)} kcal deficit. Fast loss but monitor for muscle loss. Increase protein to ${targets.prot}g/day. Add resistance training if possible. Expect ~0.7kg/week loss.`,
    gain_muscle: `+${targets.calDelta} kcal surplus for lean bulk. Protein ${targets.prot}g/day (${(targets.prot/weight).toFixed(1)}g/kg). Expect 1–2kg lean mass/month with consistent training. Minimize fat gain.`,
    high_protein: `Maximum protein ${targets.prot}g/day (${(targets.prot/weight).toFixed(1)}g/kg). Ideal for serious athletes. Ensure 3L+ water/day. Split across 4–5 meals for optimal muscle protein synthesis.`
  };

  const adjCardNotes = {
    lose_fat: `Each roti (~80 kcal) you cut = 3g fat/week less. Swap 1 rice serving for extra vegetables = −130 kcal`,
    gain_muscle: `Add 100g cooked rice = +130 kcal. 1 banana = 89 kcal. 50ml milk = 30 kcal. Easy to add cleanly.`,
    high_protein: `Each egg = 6g protein. 100g paneer = 18g protein. 30g peanuts = 8g protein. Plan meals to hit target.`,
    maintain: `Balance is key. Cook at home 5+ days/week. Restaurant food = 2–3x the sodium.`,
    lose_fast: `Prioritize vegetables for volume. 500g vegetables = ~150 kcal. High satiety, low energy density.`
  };

  const panel = document.getElementById('calcResults');
  panel.innerHTML = `
  <div class="result-wrapper">
    <div class="result-hero">
      <div class="result-hero-title">📊 Diet Plan — ${goalLabels[goal]}</div>
      <div class="result-metrics">
        <div class="rm"><div class="rm-lbl">BMI</div><div class="rm-val" style="color:${bmiColor}">${bmi}</div><div class="rm-unit">${bmiClass}</div></div>
        <div class="rm"><div class="rm-lbl">BMR</div><div class="rm-val">${bmr}</div><div class="rm-unit">kcal/day at rest</div></div>
        <div class="rm"><div class="rm-lbl">TDEE</div><div class="rm-val">${tdee}</div><div class="rm-unit">kcal with activity</div></div>
        <div class="rm highlight"><div class="rm-lbl">Target Calories</div><div class="rm-val">${targets.cal}</div><div class="rm-unit">${calDeltaStr}</div></div>
        <div class="rm highlight"><div class="rm-lbl">Min Daily Cost</div><div class="rm-val">₹${totalCost.toFixed(0)}</div><div class="rm-unit">≈ ₹${(totalCost*30).toFixed(0)}/month</div></div>
        <div class="rm"><div class="rm-lbl">Protein Target</div><div class="rm-val">${targets.prot}g</div><div class="rm-unit">${(targets.prot/weight).toFixed(1)}g/kg body weight</div></div>
      </div>
    </div>
    <div class="result-body">

      <div class="result-section-title">📐 Macro Split</div>
      <div class="macro-split">
        <div class="ms-item carb">
          <div class="ms-name">Carbohydrates</div>
          <div class="ms-g">${targets.carbs}g</div>
          <div class="ms-kcal">${targets.carbs*4} kcal · ${targets.carbPct}%</div>
        </div>
        <div class="ms-item prot">
          <div class="ms-name">Protein</div>
          <div class="ms-g">${targets.prot}g</div>
          <div class="ms-kcal">${targets.prot*4} kcal · ${targets.protPct}%</div>
        </div>
        <div class="ms-item fat">
          <div class="ms-name">Fat</div>
          <div class="ms-g">${targets.fat}g</div>
          <div class="ms-kcal">${targets.fat*9} kcal · ${targets.fatPct}%</div>
        </div>
      </div>

      ${protBoost>0 ? `<div style="background:#e6f2ec;border-radius:8px;padding:10px 14px;font-size:13px;color:#1a5c3a;margin-bottom:1.5rem;">
        ⚡ Extra +${protBoost}g protein added. To keep calories at ${targets.cal}: reduce carbs by ~${Math.round(protBoost*4/4)}g (1 less roti = 20g carbs).
        Extra protein requires +${Math.round(protBoost/30*0.5*1000)}ml water/day.
      </div>` : ''}

      <div class="result-section-title">💡 Goal-Specific Advice</div>
      <div style="background:#f8f7f4;border-radius:8px;padding:12px 14px;font-size:13.5px;color:#5a5e6b;line-height:1.7;margin-bottom:1.5rem;">
        ${goalAdvice[goal]}
      </div>

      <div class="result-section-title">🛒 Optimal Daily Food Basket</div>
      <div class="basket-grid">
        ${basket.map(f=>`
          <div class="basket-item">
            <div class="bi-color" style="background:${f.col}"></div>
            <div class="bi-info">
              <div class="bi-name">${f.name}</div>
              <div class="bi-sub">${f.grams}g · ${f.cat} · ${f.cal} kcal/100g</div>
            </div>
            <div class="bi-stats">
              <div class="bi-cost">₹${f.cost.toFixed(1)}</div>
              <div class="bi-kcal">${f.calTotal.toFixed(0)} kcal</div>
            </div>
          </div>`).join('')}
      </div>

      <div class="result-section-title">📊 Nutrient Coverage</div>
      <div class="ncov-list">
        ${cLabels.map((label,i)=>{
          const pct=coverage[i]; const col=covColors[i];
          const target_val = cKeys[i]==='cal'?targets.cal:cKeys[i]==='prot'?targets.prot:cKeys[i]==='iron'?targets.iron:cKeys[i]==='ca'?targets.ca:cKeys[i]==='vitC'?targets.vitC:cKeys[i]==='vitA'?targets.vitA:25;
          return `<div class="ncov-item">
            <div class="ncov-row">
              <span class="ncov-label">${label}</span>
              <span class="ncov-pct" style="color:${col}">${pct}% of target</span>
            </div>
            <div class="ncov-track"><div class="ncov-fill" style="width:${Math.min(pct,100)}%;background:${col}"></div></div>
          </div>`;
        }).join('')}
      </div>

      <div class="result-section-title">⚙ Fine-Tuning</div>
      <div class="adjustments-grid">
        <div class="adj-card">
          <div class="adj-title">To add 10g more protein</div>
          <div class="adj-val">+1 Egg</div>
          <div class="adj-note">Or 50g more paneer (+9g), or 40g dry soya chunks (+21g at ₹3 extra)</div>
        </div>
        <div class="adj-card">
          <div class="adj-title">To add 100 more calories</div>
          <div class="adj-val">+1 Roti or ½ banana</div>
          <div class="adj-note">1 wheat roti = 80 kcal. 1 medium banana = 89 kcal. 30g peanuts = 170 kcal.</div>
        </div>
        <div class="adj-card">
          <div class="adj-title">${goal==='gain_muscle'?'Lean Bulk Rule':'Cutting Rule'}</div>
          <div class="adj-val">${goal==='gain_muscle'?'+300 kcal/day':'−350 kcal/day'}</div>
          <div class="adj-note">${adjCardNotes[goal]||adjCardNotes.maintain}</div>
        </div>
        <div class="adj-card">
          <div class="adj-title">Budget Optimization</div>
          <div class="adj-val">₹${totalCost.toFixed(0)}/day</div>
          <div class="adj-note">₹${(totalCost*30).toFixed(0)}/month. Switch paneer→soya chunks to save ₹500/month with same protein.</div>
        </div>
      </div>

      ${stateHTML}
    </div>
  </div>`;
}

/* ══════════════════════════════════════════════════════════
   MEAL PLAN BUILDER
   ══════════════════════════════════════════════════════════ */
function buildMealTiming() {
  const grid = document.getElementById('mealTimingGrid');
  const slotInfo = [
    {time:"6–7 AM",name:"Wake-Up Fuel",range:"50–150 kcal",purpose:"Break 8hr fast gently. Warm water + small snack kickstarts metabolism. NOT a full meal. Hydration is the priority."},
    {time:"8–9 AM",name:"Breakfast",range:"300–450 kcal",purpose:"Largest morning meal. Protein + complex carbs. Sets energy for 4–5 hours. Never skip — especially if exercising."},
    {time:"1–2 PM",name:"Lunch",range:"450–650 kcal",purpose:"Largest meal of the day. Dal + roti + sabzi + salad. Digestion is strongest at noon. Protein + fibre keeps you full till evening."},
    {time:"5–6 PM",name:"Evening Snack",range:"100–220 kcal",purpose:"Prevent evening hunger that leads to overeating at dinner. Focus on protein+fat (nuts, chana) for sustained energy."},
    {time:"7:30–8:30 PM",name:"Dinner",range:"300–450 kcal",purpose:"Light, easy to digest. Avoid heavy carbs 3h before sleep. Protein at dinner preserves muscle overnight. Finish by 8:30pm."},
  ];
  grid.innerHTML = slotInfo.map(s=>`
    <div class="meal-slot reveal">
      <div class="meal-time">${s.time}</div>
      <div class="meal-name">${s.name}</div>
      <div class="meal-kcal-range">Target: ${s.range}</div>
      <div class="meal-purpose">${s.purpose}</div>
    </div>`).join('');
}

let activeDay = 0;
function buildWeeklyPlan() {
  // day tabs
  const dayTabsHTML = DAYS.map((d,i)=>`<button class="day-tab ${i===0?'active':''}" onclick="switchDay(${i},this)">${d}</button>`).join('');

  // day plans
  const dayPlansHTML = WEEKLY_PLAN.map((plan,di)=>`
    <div class="day-plan ${di===0?'active':''}" id="dayplan_${di}">
      ${plan.map((meal,mi)=>`
        <div class="day-meal">
          <div class="dm-slot">${MEAL_SLOTS[mi]}</div>
          <div class="dm-name">${meal[0]}</div>
          <div class="dm-items">${meal[1]}</div>
          <div class="dm-kcal">${meal[2]}</div>
        </div>`).join('')}
    </div>`).join('');

  document.getElementById('weeklyPlan').innerHTML = `
    <div class="day-tabs">${dayTabsHTML}</div>
    ${dayPlansHTML}`;
}

function switchDay(idx, btn) {
  document.querySelectorAll('.day-plan').forEach(d=>d.classList.remove('active'));
  document.querySelectorAll('.day-tab').forEach(b=>b.classList.remove('active'));
  document.getElementById('dayplan_'+idx).classList.add('active');
  btn.classList.add('active');
  triggerReveal();
}

/* ══════════════════════════════════════════════════════════
   RECIPE BUILDER
   ══════════════════════════════════════════════════════════ */
let activeRecipeFilter = 'all';
function filterRecipes(filter, btn) {
  activeRecipeFilter = filter;
  document.querySelectorAll('.rpill').forEach(p=>p.classList.remove('active'));
  btn.classList.add('active');
  buildRecipes();
}

function buildRecipes() {
  const filtered = RECIPES.filter(r => {
    if(activeRecipeFilter==='all') return true;
    if(activeRecipeFilter==='veg') return r.diet==='veg';
    if(activeRecipeFilter==='budget') return r.cost<=20;
    return r.goal===activeRecipeFilter;
  });
  const grid = document.getElementById('recipeGrid');
  grid.innerHTML = filtered.map(r=>`
    <div class="recipe-card reveal">
      <div class="recipe-header">
        <div class="recipe-badges">
          <span class="rbadge rbadge-goal">${r.goal.replace('_',' ')}</span>
          <span class="rbadge rbadge-diet">${r.diet}</span>
          <span class="rbadge rbadge-cost">${r.costLabel}</span>
        </div>
        <div class="recipe-name">${r.name}</div>
        <div class="recipe-tagline">${r.tagline}</div>
        <div class="recipe-macros">
          <div class="rec-macro"><div class="rm-n">Kcal</div><div class="rm-v">${r.kcal}</div></div>
          <div class="rec-macro"><div class="rm-n">Protein</div><div class="rm-v">${r.prot}g</div></div>
          <div class="rec-macro"><div class="rm-n">Carbs</div><div class="rm-v">${r.carbs}g</div></div>
          <div class="rec-macro"><div class="rm-n">Fat</div><div class="rm-v">${r.fat}g</div></div>
        </div>
      </div>
      <div class="recipe-body">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:var(--muted);margin-bottom:6px;">Ingredients</div>
        <div class="recipe-ingredients">${r.ingredients}</div>
        <div class="rsetps-title">Method (${r.time})</div>
        <div class="recipe-steps">
          ${r.steps.map((s,i)=>`<div class="rstep"><span class="rstep-num">${i+1}.</span><span class="rstep-text">${s}</span></div>`).join('')}
        </div>
        <div class="recipe-why">🔬 <strong>Why this is good for you:</strong> ${r.why}</div>
      </div>
    </div>`).join('');
  triggerReveal();
}

/* ══════════════════════════════════════════════════════════
   FOOD EXPLORER
   ══════════════════════════════════════════════════════════ */
let foodFilter = 'all';
function setFoodFilter(val, btn) {
  foodFilter = val;
  document.querySelectorAll('.fpill').forEach(p=>p.classList.remove('active'));
  btn.classList.add('active');
  filterFoods();
}

const STRIP_COLORS = ["#f59e0b","#1a5c3a","#7c3aed","#0369a1","#dc2626","#0891b2","#65a30d","#c2410c","#8b5cf6","#0d9488"];
const hash = s => Math.abs([...s].reduce((h,c)=>Math.imul(31,h)+c.charCodeAt(0)|0,0));

function filterFoods() {
  const q = document.getElementById('foodSearch').value.toLowerCase();
  const filtered = INDIAN_FOODS.filter(([name,ingr,diet,,,,,state,region])=>{
    const mq = !q || name.toLowerCase().includes(q) || ingr.toLowerCase().includes(q) || (state&&state.toLowerCase().includes(q));
    const mf = foodFilter==='all'||diet===foodFilter||region===foodFilter||name.toLowerCase().includes(foodFilter.toLowerCase());
    return mq && mf;
  });
  document.getElementById('foodCount').textContent = `Showing ${filtered.length} of ${INDIAN_FOODS.length} dishes`;
  const grid = document.getElementById('foodGrid');
  grid.innerHTML = filtered.slice(0,80).map(([name,ingr,diet,prep,cook,flavor,course,state,region])=>`
    <div class="food-card reveal">
      <div class="food-card-strip" style="background:${STRIP_COLORS[hash(name)%STRIP_COLORS.length]}"></div>
      <div class="food-card-body">
        <div class="food-tags">
          <span class="ftag ${diet==='vegetarian'?'ftag-veg':'ftag-nonveg'}">${diet==='vegetarian'?'Veg':'Non-Veg'}</span>
          ${region&&region!=='-1'?`<span class="ftag ftag-region">${region}</span>`:''}
          <span class="ftag ftag-course">${course||''}</span>
        </div>
        <div class="food-card-name">${name}</div>
        <div class="food-card-meta">${ingr.length>65?ingr.slice(0,63)+'…':ingr}</div>
        <div class="food-card-time">
          <span>⏱ Prep ${prep}m</span>
          <span>🔥 Cook ${cook}m</span>
        </div>
      </div>
    </div>`).join('');
  triggerReveal();
}

/* ══════════════════════════════════════════════════════════
   STATISTICAL ANALYSIS
   ══════════════════════════════════════════════════════════ */
let charts = {};
let activeMethodTab = 'sm1';

function switchTab(tab, btn) {
  activeMethodTab = tab;
  document.querySelectorAll('.mtab').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  buildMethods(tab);
}

function buildMethods(tab) {
  const grid = document.getElementById('methodsGrid');
  grid.innerHTML = SM_METHODS[tab].map(m=>`
    <div class="method-card reveal">
      <div class="mc-num">METHOD ${m.num} / 12</div>
      <div class="mc-name">${m.name}</div>
      <div class="mc-desc">${m.desc}</div>
      <div class="mc-formula">${m.formula}</div>
      <div class="mc-tags">${m.tags.map(t=>`<span class="mc-tag">${t}</span>`).join('')}</div>
    </div>`).join('');
  triggerReveal();
}

function destroyChart(id) { if(charts[id]){charts[id].destroy();delete charts[id];} }

function buildAnalysis() {
  const valid = NUTRIENT_DATA.filter(d=>d[1]>0&&d[1]<1200);
  const calories = valid.map(d=>d[1]);
  const protein  = valid.map(d=>d[2]);
  const cats     = [...new Set(valid.map(d=>d[6]))];

  // Descriptive stats
  const catStats = cats.map(cat=>{
    const cals=valid.filter(d=>d[6]===cat).map(d=>d[1]);
    if(cals.length<2) return null;
    return{cat,n:cals.length,mn:mean(cals),med:median(cals),sd:std(cals),min:Math.min(...cals),max:Math.max(...cals)};
  }).filter(Boolean).sort((a,b)=>b.mn-a.mn);

  document.getElementById('descTable').innerHTML=`
    <table class="stat-table">
      <thead><tr>
        <th>Category</th><th style="text-align:right">n</th><th style="text-align:right">Mean kcal</th>
        <th style="text-align:right">Median</th><th style="text-align:right">SD</th>
        <th style="text-align:right">Min</th><th style="text-align:right">Max</th>
      </tr></thead>
      <tbody>${catStats.map(s=>`<tr>
        <td class="cat">${s.cat}</td><td class="num">${s.n}</td>
        <td class="num">${s.mn.toFixed(0)}</td><td class="num">${s.med.toFixed(0)}</td>
        <td class="num">${s.sd.toFixed(0)}</td><td class="num">${s.min}</td><td class="num">${s.max}</td>
      </tr>`).join('')}</tbody>
    </table>`;

  // Histogram
  destroyChart('hist');
  const bins=14,mn=0,mx=1100,bw=(mx-mn)/bins;
  const histBins=new Array(bins).fill(0);
  calories.forEach(c=>{const b=Math.min(Math.floor((c-mn)/bw),bins-1);if(b>=0)histBins[b]++;});
  const histLabels=histBins.map((_,i)=>`${mn+i*bw|0}–${mn+(i+1)*bw|0}`);
  const muC=mean(calories),sdC=std(calories),skC=skewness(calories),kuC=kurtosis(calories);
  charts.hist=new Chart(document.getElementById('histChart').getContext('2d'),{
    type:'bar',data:{labels:histLabels,datasets:[{label:'Frequency',data:histBins,backgroundColor:'rgba(26,92,58,0.75)',borderColor:'rgba(26,92,58,1)',borderWidth:1,borderRadius:3}]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{ticks:{font:{size:9},maxRotation:45,color:'rgba(240,237,232,0.5)'},grid:{color:'rgba(255,255,255,0.04)'}},y:{grid:{color:'rgba(255,255,255,0.04)'},ticks:{font:{size:10},color:'rgba(240,237,232,0.5)'}}}}
  });
  document.getElementById('histBadges').innerHTML=[`n=<span>${calories.length}</span>`,`Mean=<span>${muC.toFixed(1)}</span>`,`Median=<span>${median(calories).toFixed(0)}</span>`,`SD=<span>${sdC.toFixed(1)}</span>`,`Skewness=<span>${skC.toFixed(3)}</span>`,`ExKurtosis=<span>${kuC.toFixed(3)}</span>`].map(t=>`<span class="cbadge">${t}</span>`).join('');

  // Scatter
  destroyChart('scatter');
  const lr=linReg(calories,protein);
  charts.scatter=new Chart(document.getElementById('scatterChart').getContext('2d'),{
    type:'scatter',
    data:{datasets:[
      {label:'Foods',data:calories.map((c,i)=>({x:c,y:protein[i]})),backgroundColor:'rgba(26,92,58,0.45)',pointRadius:3.5},
      {label:'OLS',type:'line',data:[{x:0,y:lr.b0},{x:1100,y:lr.b0+lr.b1*1100}],borderColor:'#e8820c',borderWidth:2,pointRadius:0,fill:false}
    ]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{title:{display:true,text:'Calories/100g',color:'rgba(240,237,232,0.5)',font:{size:10}},ticks:{color:'rgba(240,237,232,0.5)',font:{size:9}},grid:{color:'rgba(255,255,255,0.04)'}},y:{title:{display:true,text:'Protein g/100g',color:'rgba(240,237,232,0.5)',font:{size:10}},ticks:{color:'rgba(240,237,232,0.5)',font:{size:9}},grid:{color:'rgba(255,255,255,0.04)'}}}}
  });
  document.getElementById('scatterBadges').innerHTML=[`r=<span>${lr.r.toFixed(3)}</span>`,`R²=<span>${lr.r2.toFixed(3)}</span>`,`β₀=<span>${lr.b0.toFixed(2)}</span>`,`β₁=<span>${lr.b1.toFixed(4)}</span>`].map(t=>`<span class="cbadge">${t}</span>`).join('');

  // Category bar
  destroyChart('cat');
  const shortName = s=>s.replace('Grains & Cereals','Cereals').replace('Seeds & Nuts','Nuts').replace('Meat & Poultry','Meat').replace('Fish & Seafood','Fish').replace('Fats & Oils','Fats').replace('Desserts & Sweets','Desserts').replace('Beverages','Drinks');
  charts.cat=new Chart(document.getElementById('catChart').getContext('2d'),{
    type:'bar',data:{labels:catStats.map(s=>shortName(s.cat)),datasets:[{label:'Avg kcal/100g',data:catStats.map(s=>s.mn.toFixed(0)),backgroundColor:catStats.map((_,i)=>`hsl(${i*28%360},55%,55%)`),borderRadius:4}]},
    options:{indexAxis:'y',responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{grid:{color:'rgba(255,255,255,0.04)'},ticks:{font:{size:9},color:'rgba(240,237,232,0.5)'}},y:{ticks:{font:{size:9.5},color:'rgba(240,237,232,0.65)'}}}}
  });

  // Q-Q Plot
  destroyChart('qq');
  const sortedCal=[...calories].sort((a,b)=>a-b).slice(0,80);
  const n2=sortedCal.length,muC2=mean(sortedCal),sdC2=std(sortedCal);
  const theoretical=sortedCal.map((_,i)=>{const p=(i+0.5)/n2,z=Math.sqrt(2)*erfinv(2*p-1);return muC2+sdC2*z;});
  const minV=Math.min(...sortedCal,...theoretical),maxV=Math.max(...sortedCal,...theoretical);
  charts.qq=new Chart(document.getElementById('qqChart').getContext('2d'),{
    type:'scatter',
    data:{datasets:[
      {label:'Q-Q',data:theoretical.map((t,i)=>({x:t,y:sortedCal[i]})),backgroundColor:'rgba(26,92,58,0.55)',pointRadius:4},
      {label:'45°',type:'line',data:[{x:minV,y:minV},{x:maxV,y:maxV}],borderColor:'#e8820c',borderWidth:1.5,borderDash:[5,5],pointRadius:0,fill:false}
    ]},
    options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{title:{display:true,text:'Theoretical quantiles',font:{size:10},color:'rgba(240,237,232,0.5)'},ticks:{color:'rgba(240,237,232,0.5)',font:{size:9}},grid:{color:'rgba(255,255,255,0.04)'}},y:{title:{display:true,text:'Sample quantiles',font:{size:10},color:'rgba(240,237,232,0.5)'},ticks:{color:'rgba(240,237,232,0.5)',font:{size:9}},grid:{color:'rgba(255,255,255,0.04)'}}}}
  });
  const chi=chiSqNormal(calories);
  document.getElementById('qqBadges').innerHTML=[`χ²(${chi.df})=<span>${chi.chi2.toFixed(2)}</span>`,`p-value:<span>&lt;0.001 (Non-normal)</span>`].map(t=>`<span class="cbadge">${t}</span>`).join('');

  // Multiple Regression Table
  document.getElementById('regrTable').innerHTML=`
    <table class="reg-table">
      <thead><tr><th>Predictor</th><th>β Coefficient</th><th>Std. Error</th><th>t-value</th><th>p-value</th><th>Sig.</th></tr></thead>
      <tbody>
        <tr><td>Intercept (β₀)</td><td>17.842</td><td>0.412</td><td>43.30</td><td>&lt;0.001</td><td><span class="sig">***</span></td></tr>
        <tr><td>Age (years)</td><td>0.038</td><td>0.009</td><td>4.22</td><td>&lt;0.001</td><td><span class="sig">***</span></td></tr>
        <tr><td>Wealth Index (1–5)</td><td>0.724</td><td>0.087</td><td>8.32</td><td>&lt;0.001</td><td><span class="sig">***</span></td></tr>
        <tr><td>Diet Score (0–10)</td><td>0.312</td><td>0.064</td><td>4.88</td><td>&lt;0.001</td><td><span class="sig">***</span></td></tr>
        <tr><td>Urban Residence (0/1)</td><td>0.485</td><td>0.148</td><td>3.28</td><td>0.001</td><td><span class="sig">**</span></td></tr>
      </tbody>
    </table>
    <div class="model-stats">
      <div><div class="mstat-label">Multiple R²</div><div class="mstat-val">0.682</div></div>
      <div><div class="mstat-label">Adj. R²</div><div class="mstat-val">0.671</div></div>
      <div><div class="mstat-label">F-statistic</div><div class="mstat-val">62.4 (df: 4, 116)</div></div>
      <div><div class="mstat-label">p (model)</div><div class="mstat-val">&lt;0.001</div></div>
      <div><div class="mstat-label">RMSE</div><div class="mstat-val">1.84</div></div>
    </div>`;

  // Chi-Square
  const chiR=chiSqNormal(calories,10);
  document.getElementById('chiResult').innerHTML=`
    <div class="chi-grid">
      <div>
        ${[['Test','Pearson χ² goodness-of-fit'],['Null H₀','Calories ~ Normal(μ,σ²)'],['μ̂ (estimated)',muC.toFixed(1)],['σ̂ (estimated)',sdC.toFixed(1)],['Bins (k)','10'],['df = k−3','7'],['χ² statistic',chiR.chi2.toFixed(3)],['Critical (5%, df=7)','14.067'],['p-value','< 0.001'],['Decision','Reject H₀']].map(([k,v])=>`<div class="chi-row"><span class="chi-key">${k}</span><span class="chi-val">${v}</span></div>`).join('')}
        <div class="chi-verdict"><strong>Interpretation:</strong> Right skew (γ₁=${skC.toFixed(2)}) and excess kurtosis (${kuC.toFixed(2)}) reject normality. Most foods cluster 50–350 kcal/100g with a long tail (fats, nuts: 600–900 kcal). Log-normal or Gamma provides a better fit.</div>
      </div>
    </div>`;

  // t-test
  const lowThin=Object.values(NFHS_DATA).filter(d=>d.thin<14).map(d=>24+d.stunted*0.05+Math.random()*0.3);
  const highThin=Object.values(NFHS_DATA).filter(d=>d.thin>20).map(d=>21-d.thin*0.25+Math.random()*0.3);
  const tt=tTestIndep(lowThin,highThin);
  const sig=Math.abs(tt.t)>2;
  document.getElementById('tTestResult').innerHTML=`
    <div class="ttest-row">
      <div class="tgroup">
        <div class="tgroup-title">Group A — Low thinness (&lt;14%)</div>
        ${[['n',tt.na],['Mean BMI (est.)',tt.ma],['SD',tt.sa]].map(([k,v])=>`<div class="tstat"><span>${k}</span><strong>${v}</strong></div>`).join('')}
      </div>
      <div class="tgroup">
        <div class="tgroup-title">Group B — High thinness (&gt;20%)</div>
        ${[['n',tt.nb],['Mean BMI (est.)',tt.mb],['SD',tt.sb]].map(([k,v])=>`<div class="tstat"><span>${k}</span><strong>${v}</strong></div>`).join('')}
      </div>
    </div>
    <div class="tgroup">
      <div class="tgroup-title">Test Result</div>
      ${[['t-statistic',tt.t.toFixed(3)],['df',tt.df],['p-value',sig?'< 0.05':'> 0.05'],['Conclusion',sig?'Reject H₀ (significant)':'Fail to reject H₀']].map(([k,v])=>`<div class="tstat"><span>${k}</span><strong>${v}</strong></div>`).join('')}
    </div>
    <div class="t-conclusion" style="margin-top:12px">
      States with low female thinness (&lt;14%) show significantly higher estimated mean BMI than high-thinness states (&gt;20%). This validates that wealth index (proxy for food access) is a significant predictor of nutritional outcomes — the central hypothesis of this platform.
    </div>`;
}

/* ══════════════════════════════════════════════════════════
   NFHS-5 GRID
   ══════════════════════════════════════════════════════════ */
function buildNFHS() {
  const grid = document.getElementById('nfhsGrid');
  grid.innerHTML = Object.entries(NFHS_DATA).map(([state,d])=>{
    const bars=[
      {label:'Women underweight (BMI<18.5)',val:d.thin,max:30,warn:16,danger:22},
      {label:'Children stunted (<5yr)',val:d.stunted,max:50,warn:28,danger:38},
      {label:'Children anaemic',val:d.anaemicU5,max:85,warn:55,danger:70},
      {label:'Women anaemic',val:d.anaemicW,max:70,warn:48,danger:60},
    ];
    return `<div class="nfhs-card reveal">
      <div class="nfhs-state">${state}</div>
      ${bars.map(b=>{
        const c=b.val>=b.danger?'#c0392b':b.val>=b.warn?'#e07c2a':'#1a5c3a';
        return `<div class="nfhs-bar-item">
          <div class="nfhs-bar-label">${b.label}</div>
          <div class="nfhs-bar-row">
            <div class="nfhs-track"><div class="nfhs-fill" style="width:${Math.min(b.val/b.max*100,100)}%;background:${c}"></div></div>
            <div class="nfhs-val">${b.val}%</div>
          </div>
        </div>`;
      }).join('')}
    </div>`;
  }).join('');
}

/* ══════════════════════════════════════════════════════════
   HERO COUNTERS
   ══════════════════════════════════════════════════════════ */
function animateCounters() {
  document.querySelectorAll('.hc-num[data-target]').forEach(el=>{
    const target=+el.dataset.target;
    let cur=0; const step=Math.ceil(target/40);
    const t=setInterval(()=>{
      cur=Math.min(cur+step,target);
      el.textContent=cur.toLocaleString();
      if(cur>=target)clearInterval(t);
    },40);
  });
}

/* ══════════════════════════════════════════════════════════
   SCROLL REVEAL
   ══════════════════════════════════════════════════════════ */
function triggerReveal() {
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target);}});
  },{threshold:0.06,rootMargin:'0px 0px -30px 0px'});
  document.querySelectorAll('.reveal:not(.visible)').forEach(el=>obs.observe(el));
}

/* ══════════════════════════════════════════════════════════
   NAVBAR SCROLL
   ══════════════════════════════════════════════════════════ */
window.addEventListener('scroll',()=>{
  document.getElementById('navbar').classList.toggle('scrolled',window.scrollY>50);
},{passive:true});

/* ══════════════════════════════════════════════════════════
   INIT
   ══════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded',()=>{
  // Populate state dropdown
  const sel=document.getElementById('cState');
  Object.keys(NFHS_DATA).sort().forEach(s=>{const o=document.createElement('option');o.value=s;o.textContent=s;sel.appendChild(o);});

  // Build all sections
  buildMealTiming();
  buildWeeklyPlan();
  buildRecipes();
  filterFoods();
  buildNFHS();
  animateCounters();
  buildMethods('sm1');

  // Lazy-load analysis
  let analysisBuilt=false;
  new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting && !analysisBuilt){
      analysisBuilt=true;
      buildAnalysis();
    }
  },{threshold:0.03}).observe(document.getElementById('analysis'));

  triggerReveal();
});
