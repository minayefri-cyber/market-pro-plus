export const CATEGORIES = [
  { en: 'Vegetables', mm: 'ဟင်းသီးဟင်းရွက်', emoji: '🥬' },
  { en: 'Meat & Fish', mm: 'အသားနှင့် ငါး', emoji: '🍗' },
  { en: 'Pantry Essentials', mm: 'အခြေခံစားသောက်ကုန်', emoji: '🍚' },
  { en: 'Spices & Sauces', mm: 'ဟင်းခတ်အနှစ်နှင့် မှုန့်များ', emoji: '🧂' },
  { en: 'Household', mm: 'အိမ်သုံးကုန်ပစ္စည်း', emoji: '🧼' },
  { en: 'Fruits', mm: 'သစ်သီးဝလံ', emoji: '🍎' },
];

export const MASTER_ITEMS = [
  // --- VEGETABLES (ဟင်းသီးဟင်းရွက် - စာရင်းဟောင်း + အသစ်ပေါင်းထားသည်) ---
  { id: 'v1', cat: 'Vegetables', en: 'Tomato', mm: 'ခရမ်းချဉ်သီး', img: '🍅' },
  { id: 'v2', cat: 'Vegetables', en: 'Cabbage', mm: 'ဂေါ်ဖီထုပ်', img: '🥬' },
  { id: 'v5', cat: 'Vegetables', en: 'Carrot', mm: 'မုန်လာဥနီ', img: '🥕' },
  { id: 'v6', cat: 'Vegetables', en: 'Green Chili', mm: 'ငရုတ်သီးစိမ်း', img: '🌶️' },
  { id: 'v7', cat: 'Vegetables', en: 'Water Cress', mm: 'ကန်စွန်းရွက်', img: '🌿' },
  { id: 'v8', cat: 'Vegetables', en: 'Sour Leaf', mm: 'ချဉ်ပေါင်ရွက်', img: '🍃' },
  { id: 'v9', cat: 'Vegetables', en: 'Cucumber', mm: 'သခွားသီး', img: '🥒' },
  { id: 'v10', cat: 'Vegetables', en: 'Eggplant', mm: 'ခရမ်းသီး', img: '🍆' },
  { id: 'v11', cat: 'Vegetables', en: 'Cauliflower', mm: 'ပန်းဂေါ်ဖီ', img: '🥦' },
  { id: 'v12', cat: 'Vegetables', en: 'Long Bean', mm: 'ပဲသီး', img: '🎋' },
  { id: 'v13', cat: 'Vegetables', en: 'Pumpkin', mm: 'ရွှေဖရုံသီး', img: '🎃' },
  { id: 'v14', cat: 'Vegetables', en: 'Bottle Gourd', mm: 'ဘူးသီး', img: '🍐' },
  { id: 'v15', cat: 'Vegetables', en: 'Coriander', mm: 'နံနံပင်', img: '🌱' },
  { id: 'v16', cat: 'Vegetables', en: 'Bell Pepper', mm: 'ငရုတ်ပွ', img: '🫑' },
  { id: 'v17', cat: 'Vegetables', en: 'Mushroom', mm: 'မှို', img: '🍄' },
  { id: 'v18', cat: 'Vegetables', en: 'Corn', mm: 'ပြောင်းဖူး', img: '🌽' },
  { id: 'v20', cat: 'Vegetables', en: 'Radish', mm: 'မုန်လာဥဖြူ', img: '🍢' },
  { id: 'v21', cat: 'Vegetables', en: 'Kale', mm: 'ကိုက်လန်', img: '🥬' },
  { id: 'v22', cat: 'Vegetables', en: 'Spinach', mm: 'ဟင်းနုနွယ်', img: '🌿' },
  { id: 'v23', cat: 'Vegetables', en: 'Acacia Leaf', mm: 'ဆူးပုတ်', img: '🌿' },
  { id: 'v24', cat: 'Vegetables', en: 'Bitter Leaf', mm: 'ဂွေးတောက်ရွက်', img: '🍃' },
  { id: 'v25', cat: 'Vegetables', en: 'Napa Cabbage', mm: 'မုန်ညင်းဖြူ', img: '🥬' },
  { id: 'v26', cat: 'Vegetables', en: 'Okra', mm: 'ရုံးပတီသီး', img: '🥒' },
  { id: 'v27', cat: 'Vegetables', en: 'Drumstick', mm: 'ဒန့်ဒလွန်သီး', img: '🎋' },

  // --- MEAT & FISH (အသား၊ ငါးနှင့် ဥ) ---
  { id: 'mf1', cat: 'Meat & Fish', en: 'Chicken (Local)', mm: 'ကြက်သား (ဗမာကြက်)', img: '🍗' },
  { id: 'mf2', cat: 'Meat & Fish', en: 'Chicken (CP)', mm: 'ကြက်သား (CP)', img: '🐔' },
  { id: 'mf3', cat: 'Meat & Fish', en: 'Pork', mm: 'ဝက်သား', img: '🥩' },
  { id: 'mf4', cat: 'Meat & Fish', en: 'Fish', mm: 'ငါး', img: '🐟' },
  { id: 'mf5', cat: 'Meat & Fish', en: 'Dried Fish', mm: 'ငါးခြောက်', img: '🐟' },
  { id: 'mf6', cat: 'Meat & Fish', en: 'Chicken Egg', mm: 'ကြက်ဥ', img: '🥚' },
  { id: 'mf7', cat: 'Meat & Fish', en: 'Duck Egg', mm: 'ဘဲဥ', img: '🥚' },
  { id: 'mf8', cat: 'Meat & Fish', en: 'Century Egg', mm: 'ဆေးဘဲဥ', img: '🌑' },
  { id: 'mf9', cat: 'Meat & Fish', en: 'Dried Shrimp', mm: 'ပုစွန်ခြောက်', img: '🍤' },

  // --- PANTRY ESSENTIALS (အခြေခံစားသောက်ကုန်) ---
  { id: 'p1', cat: 'Pantry Essentials', en: 'Rice (Paw San)', mm: 'ပေါ်ဆန်းမွှေး', img: '🍚' },
  { id: 'p2', cat: 'Pantry Essentials', en: 'Cooking Oil', mm: 'ဆီ (ပဲဆီ/ဟင်းအိုးဆီ)', img: '🫗' },
  { id: 'p3', cat: 'Pantry Essentials', en: 'Salt', mm: 'ဆား', img: '🧂' },
  { id: 'p4', cat: 'Pantry Essentials', en: 'Onion', mm: 'ကြက်သွန်နီ', img: '🧅' },
  { id: 'p5', cat: 'Pantry Essentials', en: 'Potato', mm: 'အာလူး', img: '🥔' },
  { id: 'p6', cat: 'Pantry Essentials', en: 'Garlic', mm: 'ကြက်သွန်ဖြူ', img: '🧄' },
  { id: 'p7', cat: 'Pantry Essentials', en: 'Ginger', mm: 'ဂျင်း', img: '🫚' },
  { id: 'p8', cat: 'Pantry Essentials', en: 'Dried Chili', mm: 'ငရုတ်သီးခြောက်', img: '🌶️' },

  // --- SPICES & SAUCES (ဟင်းခတ်အနှစ်နှင့် မှုန့်များ) ---
  { id: 'ss1', cat: 'Spices & Sauces', en: 'Shrimp Paste', mm: 'ငပိ', img: '🏺' },
  { id: 'ss2', cat: 'Spices & Sauces', en: 'Fish Sauce', mm: 'ငံပြာရည်', img: '🍾' },
  { id: 'ss3', cat: 'Spices & Sauces', en: 'MSG', mm: 'အချိုမှုန့်', img: '⚪' },
  { id: 'ss4', cat: 'Spices & Sauces', en: 'Chicken Powder', mm: 'ကြက်သားမှုန့်', img: '🍗' },
  { id: 'ss5', cat: 'Spices & Sauces', en: 'Masala', mm: 'မဆလာ', img: '🍛' },
  { id: 'ss6', cat: 'Spices & Sauces', en: 'Turmeric Powder', mm: 'နနွင်းမှုန့်', img: '🟡' },
  { id: 'ss7', cat: 'Spices & Sauces', en: 'Chili Powder', mm: 'အရောင်တင်မှုန့်', img: '🌶️' },

  // --- HOUSEHOLD (အိမ်သုံးကုန်ပစ္စည်း) ---
  { id: 'h1', cat: 'Household', en: 'Tissue', mm: 'တစ်ရှူး', img: '🧻' },
  { id: 'h2', cat: 'Household', en: 'Soap', mm: 'ဆပ်ပြာ', img: '🧼' },
  { id: 'h3', cat: 'Household', en: 'Shampoo', mm: 'ခေါင်းလျော်ရည်', img: '🧴' },
  { id: 'h4', cat: 'Household', en: 'Toothpaste', mm: 'သွားတိုက်ဆေး', img: '🪥' },
  { id: 'h5', cat: 'Household', en: 'Detergent', mm: 'အဝတ်လျှော်ဆပ်ပြာ', img: '🧺' },
  { id: 'h6', cat: 'Household', en: 'Cosmetics', mm: 'အလှကုန်ပစ္စည်း', img: '💄' },

  // --- FRUITS (သစ်သီးဝလံ) ---
  { id: 'f1', cat: 'Fruits', en: 'Banana', mm: 'ငှက်ပျောသီး', img: '🍌' },
  { id: 'f2', cat: 'Fruits', en: 'Apple', mm: 'ပန်းသီး', img: '🍎' },
  { id: 'f3', cat: 'Fruits', en: 'Lime', mm: 'သံပုရာသီး', img: '🍋' },
  { id: 'f4', cat: 'Fruits', en: 'Watermelon', mm: 'ဖရဲသီး', img: '🍉' },
  { id: 'f5', cat: 'Fruits', en: 'Mango', mm: 'သရက်သီး', img: '🥭' },
];