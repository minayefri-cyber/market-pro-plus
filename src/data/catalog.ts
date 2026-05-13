export const CATEGORIES = [
  { en: 'Vegetables', mm: 'ဟင်းသီးဟင်းရွက်' },
  { en: 'Meat/Fish', mm: 'အသား/ငါး' },
  { en: 'Dry Goods', mm: 'အခြောက်အခြမ်း' },
  { en: 'Pantry', mm: 'အခြေခံစားသောက်ကုန်' },
  { en: 'Fruits', mm: 'သစ်သီးဝလံ' },
  { en: 'Snacks', mm: 'မုန့်ပဲသရေစာ' },
  { en: 'Household', mm: 'အိမ်သုံး/ဝန်ဆောင်မှု' },
  { en: 'Beverages', mm: 'ဖျော်ရည်/သောက်စရာ' },
  { en: 'Others', mm: 'အထွေထွေ' }
];

export const MASTER_ITEMS = [
  // --- Household & Services (အိမ်သုံး/ဝန်ဆောင်မှု) ---
  { id: 'h1', en: 'Electricity Bill', mm: 'မီတာခ', cat: 'Household', img: '⚡', keys: ['မ', 'မီတာ'] },
  { id: 'h2', en: 'Water Bill', mm: 'ရေဖိုး', cat: 'Household', img: '💧', keys: ['ရ', 'ရေဖိုး'] },
  { id: 'h3', en: 'WiFi / Internet', mm: 'WiFi / အင်တာနက်', cat: 'Household', img: '🌐', keys: ['အ', 'အင်တာနက်'] },
  { id: 'h4', en: 'Fuel / Gas', mm: 'စက်သုံးဆီ', cat: 'Household', img: '⛽', keys: ['စ', 'စက်သုံးဆီ'] },
  { id: 'h5', en: 'Altar Flowers', mm: 'ဘုရားပန်း', cat: 'Household', img: '💐', keys: ['ဘ', 'ဘုရားပန်း'] },

  // --- Vegetables (ဟင်းသီးဟင်းရွက်) ---
  { id: 'v1', en: 'Water Cress', mm: 'ကန်စွန်းရွက်', cat: 'Vegetables', img: '🌿', keys: ['က', 'ကန်'] },
  { id: 'v2', en: 'Asparagus', mm: 'ကညွှတ်', cat: 'Vegetables', img: '🎍', keys: ['က', 'ကညွှတ်'] },
  { id: 'v3', en: 'Kale', mm: 'ကိုက်လန်', cat: 'Vegetables', img: '🥬', keys: ['က', 'ကိုက်လန်'] },
  { id: 'v4', en: 'Onion', mm: 'ကြက်သွန်နီ', cat: 'Vegetables', img: '🧅', keys: ['က', 'ကြက်သွန်'] },
  { id: 'v5', en: 'Garlic', mm: 'ကြက်သွန်ဖြူ', cat: 'Vegetables', img: '🧄', keys: ['က', 'ကြက်သွန်'] },
  { id: 'v6', en: 'Bitter Gourd', mm: 'ကြက်ဟင်းခါးသီး', cat: 'Vegetables', img: '🥒', keys: ['က', 'ကြက်ဟင်းခါးသီး'] },
  { id: 'v7', en: 'Tomato', mm: 'ခရမ်းချဉ်သီး', cat: 'Vegetables', img: '🍅', keys: ['ခ', 'ခရမ်း'] },
  { id: 'v8', en: 'Eggplant', mm: 'ခရမ်းသီး', cat: 'Vegetables', img: '🍆', keys: ['ခ', 'ခရမ်း'] },
  { id: 'v9', en: 'Turkey Berry', mm: 'ခရမ်းကတော့သီး', cat: 'Vegetables', img: '🫐', keys: ['ခ', 'ခရမ်း'] },
  { id: 'v10', en: 'Sour Leaf', mm: 'ချဉ်ပေါင်ရွက်', cat: 'Vegetables', img: '🍃', keys: ['ခ', 'ချဉ်ပေါင်'] },
  { id: 'v11', en: 'Cabbage', mm: 'ဂေါ်ဖီထုပ်', cat: 'Vegetables', img: '🥦', keys: ['ဂ', 'ဂေါ်ဖီ'] }, // Broccoli/Cabbage ပုံစံသုံးထားပါတယ်
  { id: 'v12', en: 'Bitter Leaf', mm: 'ဂွေးတောက်ရွက်', cat: 'Vegetables', img: '🌿', keys: ['ဂ', 'ဂွေးတောက်'] },
  { id: 'v13', en: 'Green Chili', mm: 'ငရုတ်သီးစိမ်း', cat: 'Vegetables', img: '🌶️', keys: ['င', 'ငရုတ်'] },
  { id: 'v14', en: 'Lettuce', mm: 'ဆလပ်ရွက်', cat: 'Vegetables', img: '🥗', keys: ['ဆ', 'ဆလပ်'] },
  { id: 'v15', en: 'Acacia Leaf', mm: 'ဆူးပုတ်', cat: 'Vegetables', img: '🌿', keys: ['ဆ', 'ဆူးပုတ်'] },
  { id: 'v16', en: 'Ginger', mm: 'ဂျင်း', cat: 'Vegetables', img: '🫚', keys: ['ဂျ', 'ဂျင်း'] },
  { id: 'v17', en: 'Coriander', mm: 'နံနံပင်', cat: 'Vegetables', img: '🌱', keys: ['န', 'နံနံပင်'] },
  { id: 'v18', en: 'Cauliflower', mm: 'ပန်းဂေါ်ဖီ', cat: 'Vegetables', img: '🌼', keys: ['ပ', 'ပန်းဂေါ်ဖီ'] },
  { id: 'v19', en: 'Basil', mm: 'ပင်စိမ်း', cat: 'Vegetables', img: '🌿', keys: ['ပ', 'ပင်စိမ်း'] },
  { id: 'v20', en: 'Mint', mm: 'ပူစီနံ', cat: 'Vegetables', img: '🍃', keys: ['ပ', 'ပူစီနံ'] },
  { id: 'v21', en: 'Long Bean', mm: 'ပဲသီး', cat: 'Vegetables', img: '🫛', keys: ['ပ', 'ပဲသီး'] }, // ပဲသီးပုံစံ အသစ်ပြောင်းထားပါတယ်
  { id: 'v22', en: 'Pea Leaf', mm: 'ပဲရွက်', cat: 'Vegetables', img: '🌿', keys: ['ပ', 'ပဲရွက်'] },
  { id: 'v23', en: 'Bottle Gourd', mm: 'ဘူးသီး', cat: 'Vegetables', img: '🏺', keys: ['ဘ', 'ဘူးသီး'] }, // ဘူးသီးပုံစံနဲ့ ဆင်တာ သုံးထားပါတယ်
  { id: 'v24', en: 'Potato', mm: 'အာလူး', cat: 'Vegetables', img: '🥔', keys: ['အ', 'အာလူး'] },
  { id: 'v25', en: 'Carrot', mm: 'မုန်လာဥနီ', cat: 'Vegetables', img: '🥕', keys: ['မ', 'မုန်လာဥနီ'] },
  { id: 'v26', en: 'Radish', mm: 'မုန်လာဥဖြူ', cat: 'Vegetables', img: '🤍', keys: ['မ', 'မုန်လာဥဖြူ'] }, // ဖြူစင်တဲ့ အမြစ်သဘောမျိုး သုံးထားပါတယ်
  { id: 'v27', en: 'Napa Cabbage', mm: 'မုန်ညင်းဖြူ', cat: 'Vegetables', img: '🥬', keys: ['မ', 'မုန်ညင်းဖြူ'] },
  { id: 'v28', en: 'Mushroom', mm: 'မှို', cat: 'Vegetables', img: '🍄', keys: ['မှ', 'မှို'] },
  { id: 'v29', en: 'Bamboo Shoot', mm: 'မျှစ်', cat: 'Vegetables', img: '🎋', keys: ['မျှ', 'မျှစ်'] }, // ဝါးပင်ပေါက်ပုံ
  { id: 'v30', en: 'Okra', mm: 'ရုံးပတီသီး', cat: 'Vegetables', img: '🎍', keys: ['ရ', 'ရုံးပတီသီး'] }, // ရုံးပတီသီး အဆစ်ပုံစံနဲ့ ဆင်တာသုံးထားပါတယ်
  { id: 'v31', en: 'Pumpkin', mm: 'ရွှေဖရုံသီး', cat: 'Vegetables', img: '🎃', keys: ['ရွှ', 'ရွှေဖရုံသီး'] },
  { id: 'v32', en: 'Cucumber', mm: 'သခွားသီး', cat: 'Vegetables', img: '🥒', keys: ['သ', 'သခွားသီး'] },
  { id: 'v33', en: 'Spinach', mm: 'ဟင်းနုနွယ်', cat: 'Vegetables', img: '🌿', keys: ['ဟ', 'ဟင်းနုနွယ်'] },
  // --- Meat/Fish (အသား/ငါး) ---
  { id: 'm1', en: 'Chicken', mm: 'ကြက်သား', cat: 'Meat/Fish', img: '🍗', keys: ['က', 'ကြက်'] },
  { id: 'm2', en: 'Pork', mm: 'ဝက်သား', cat: 'Meat/Fish', img: '🥓', keys: ['ဝ', 'ဝက်'] },
  { id: 'm3', en: 'Beef', mm: 'အမဲသား', cat: 'Meat/Fish', img: '🥩', keys: ['အ', 'အမဲသား'] },
  { id: 'm4', en: 'Fish', mm: 'ငါး', cat: 'Meat/Fish', img: '🐟', keys: ['င', 'ငါး'] },
  { id: 'm5', en: 'Prawn', mm: 'ပုစွန်', cat: 'Meat/Fish', img: '🦐', keys: ['ပ', 'ပုစွန်'] },
  { id: 'e1', en: 'Chicken Egg', mm: 'ကြက်ဥ', cat: 'Meat/Fish', img: '🥚', keys: ['က', 'ကြက်ဥ'] },
  { id: 'e2', en: 'Duck Egg', mm: 'ဘဲဥ', cat: 'Meat/Fish', img: '🥚', keys: ['ဘ', 'ဘဲဥ'] },

  // --- Pantry (အခြေခံစားသောက်ကုန်) ---
  { id: 'p1', en: 'Rice', mm: 'ဆန်', cat: 'Pantry', img: '🍚', keys: ['ဆ', 'ဆန်'] },
  { id: 'p2', en: 'Cooking Oil', mm: 'ဆီ', cat: 'Pantry', img: '🍶', keys: ['ဆ', 'ဆီ'] },
  { id: 'p3', en: 'Salt', mm: 'ဆား', cat: 'Pantry', img: '🧂', keys: ['ဆ', 'ဆား'] },
  { id: 'p4', en: 'Fish Paste', mm: 'ငပိ', cat: 'Pantry', img: '🐟', keys: ['င', 'ငပိ'] },
  { id: 'p5', en: 'Fish Sauce', mm: 'ငံပြာရည်', cat: 'Pantry', img: '🍶', keys: ['င', 'ငံပြာရည်'] },
  { id: 'p6', en: 'Soup Powder', mm: 'ဟင်းချိုမှုန့်', cat: 'Pantry', img: '✨', keys: ['ဟ', 'ဟင်းချိုမှုန့်'] },

  // --- Dry Goods (အခြောက်အခြမ်း) ---
  { id: 'd1', en: 'Chickpea', mm: 'ကုလားပဲ', cat: 'Dry Goods', img: '🫘', keys: ['က', 'ကုလားပဲ'] },
  { id: 'd2', en: 'Noodle', mm: 'ခေါက်ဆွဲ', cat: 'Dry Goods', img: '🍜', keys: ['ခ', 'ခေါက်ဆွဲ'] },
  { id: 'd3', en: 'Glass Noodle', mm: 'ကြာဇံ', cat: 'Dry Goods', img: '🍜', keys: ['က', 'ကြာဇံ'] },
  { id: 'd4', en: 'Peanut', mm: 'မြေပဲ', cat: 'Dry Goods', img: '🥜', keys: ['မ', 'မြေပဲ'] },
  { id: 'd5', en: 'Sugar', mm: 'သကြား', cat: 'Dry Goods', img: '🧂', keys: ['သ', 'သကြား'] },

  // --- Fruits (သစ်သီးဝလံ) ---
  { id: 'f1', en: 'Mango', mm: 'သရက်သီး', cat: 'Fruits', img: '🥭', keys: ['သ', 'သရက်သီး'] },
  { id: 'f2', en: 'Lime', mm: 'သံပရာသီး', cat: 'Fruits', img: '🍋', keys: ['သ', 'သံပရာ'] },
  { id: 'f3', en: 'Banana', mm: 'ငှက်ပျောသီး', cat: 'Fruits', img: '🍌', keys: ['င', 'ငှက်ပျောသီး'] },

  // --- Snacks (မုန့်ပဲသရေစာ) ---
  { id: 's1', en: 'Potato Chips', mm: 'အာလူးကြော်', cat: 'Snacks', img: '🍟', keys: ['အ', 'အာလူးကြော်'] },
  { id: 's2', en: 'Biscuit', mm: 'ဘီစကစ်', cat: 'Snacks', img: '🍪', keys: ['ဘ', 'ဘီစကစ်'] },
  { id: 's3', en: 'Bread', mm: 'ပေါင်မုန့်', cat: 'Snacks', img: '🍞', keys: ['ပ', 'ပေါင်မုန့်'] },
  { id: 's4', en: 'Sunflower Seeds', mm: 'နေကြာစေ့', cat: 'Snacks', img: '🌻', keys: ['န', 'နေကြာစေ့'] },
  { id: 's5', en: 'Cake', mm: 'ကိတ်မုန့်', cat: 'Snacks', img: '🍰', keys: ['က', 'ကိတ်'] },

  // --- Beverages (ဖျော်ရည်/သောက်စရာ) ---
  { id: 'b1', en: 'Water', mm: 'သောက်ရေသန့်', cat: 'Beverages', img: '💧', keys: ['သ', 'ရေသန့်'] },
  { id: 'b2', en: 'Coffee', mm: 'ကော်ဖီ', cat: 'Beverages', img: '☕', keys: ['က', 'ကော်ဖီ'] },
  { id: 'b3', en: 'Tea', mm: 'လက်ဖက်ရည်', cat: 'Beverages', img: '🍵', keys: ['လ', 'လက်ဖက်ရည်'] },
  { id: 'b4', en: 'Soft Drink', mm: 'အချိုရည်', cat: 'Beverages', img: '🥤', keys: ['အ', 'အချိုရည်'] },
  { id: 'b5', en: 'Milk', mm: 'နွားနို့', cat: 'Beverages', img: '🥛', keys: ['န', 'နို့'] },
  { id: 'b6', en: 'Beer', mm: 'ဘီယာ', cat: 'Beverages', img: '🍺', keys: ['ဘ', 'ဘီယာ'] },
  // --- Others (အထွေထွေ) ---
  { id: 'o1', en: 'Tofu', mm: 'တိုဖူး', cat: 'Others', img: '🧊', keys: ['တ', 'တိုဖူး'] },
  { id: 'o2', en: 'Charity / Donation', mm: 'အလှူငွေ', cat: 'Others', img: '🙏', keys: ['အ', 'အလှူ'] },
  { id: 'o3', en: 'Medicine', mm: 'ဆေးဝါး', cat: 'Others', img: '💊', keys: ['ဆ', 'ဆေး'] }
];

/** English (case-insensitive), Myanmar display name, and catalog `keys` (prefix + keyword). */
export function catalogItemMatchesSearch(
  item: { en: string; mm: string; keys?: readonly string[] },
  rawQuery: string
): boolean {
  const q = rawQuery.trim();
  if (!q) return true;
  const qLower = q.toLowerCase();
  if (item.en.toLowerCase().includes(qLower)) return true;
  if (item.mm.includes(q)) return true;
  for (const k of item.keys ?? []) {
    if (k.includes(q)) return true;
  }
  return false;
}