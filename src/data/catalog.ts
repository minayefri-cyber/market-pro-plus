export const CATEGORIES = [
  { en: 'Produce', mm: 'ဟင်းသီးဟင်းရွက်/သစ်သီး' },
  { en: 'Meat/Fish', mm: 'အသား/ငါး' },
  { en: 'Groceries/Snacks', mm: 'စားသောက်ကုန်/မုန့်' },
  { en: 'Personal Care & Apparel', mm: 'လူသုံးကုန်/အဝတ်အထည်' },
  { en: 'Household & Others', mm: 'အိမ်သုံး/အထွေထွေ' }
];

export const MASTER_ITEMS = [
  // --- Produce (ဟင်းသီးဟင်းရွက်/သစ်သီး) ---
  { id: 'v1', en: 'Water Cress', mm: 'ကန်စွန်းရွက်', cat: 'Produce', img: '🌿', keys: ['က', 'ကန်'] },
  { id: 'v2', en: 'Asparagus', mm: 'ကညွှတ်', cat: 'Produce', img: '🎍', keys: ['က', 'ကညွှတ်'] },
  { id: 'v3', en: 'Kale', mm: 'ကိုက်လန်', cat: 'Produce', img: '🥬', keys: ['က', 'ကိုက်လန်'] },
  { id: 'v4', en: 'Onion', mm: 'ကြက်သွန်နီ', cat: 'Produce', img: '🧅', keys: ['က', 'ကြက်သွန်'] },
  { id: 'v5', en: 'Garlic', mm: 'ကြက်သွန်ဖြူ', cat: 'Produce', img: '🧄', keys: ['က', 'ကြက်သွန်'] },
  { id: 'v6', en: 'Bitter Gourd', mm: 'ကြက်ဟင်းခါးသီး', cat: 'Produce', img: '🥒', keys: ['က', 'ကြက်ဟင်းခါးသီး'] },
  { id: 'v7', en: 'Tomato', mm: 'ခရမ်းချဉ်သီး', cat: 'Produce', img: '🍅', keys: ['ခ', 'ခရမ်း'] },
  { id: 'v8', en: 'Eggplant', mm: 'ခရမ်းသီး', cat: 'Produce', img: '🍆', keys: ['ခ', 'ခရမ်း'] },
  { id: 'v9', en: 'Turkey Berry', mm: 'ခရမ်းကတော့သီး', cat: 'Produce', img: '🫐', keys: ['ခ', 'ခရမ်း'] },
  { id: 'v10', en: 'Sour Leaf', mm: 'ချဉ်ပေါင်ရွက်', cat: 'Produce', img: '🍃', keys: ['ခ', 'ချဉ်ပေါင်'] },
  { id: 'v11', en: 'Cabbage', mm: 'ဂေါ်ဖီထုပ်', cat: 'Produce', img: '🥬', keys: ['ဂ', 'ဂေါ်ဖီ'] }, 
  { id: 'v12', en: 'Bitter Leaf', mm: 'ဂွေးတောက်ရွက်', cat: 'Produce', img: '🌿', keys: ['ဂ', 'ဂွေးတောက်'] },
  { id: 'v13', en: 'Green Chili', mm: 'ငရုတ်သီးစိမ်း', cat: 'Produce', img: '🌶️', keys: ['င', 'ငရုတ်'] },
  { id: 'v14', en: 'Lettuce', mm: 'ဆလပ်ရွက်', cat: 'Produce', img: '🥗', keys: ['ဆ', 'ဆလပ်'] },
  { id: 'v15', en: 'Acacia Leaf', mm: 'ဆူးပုတ်', cat: 'Produce', img: '🌿', keys: ['ဆ', 'ဆူးပုတ်'] },
  { id: 'v16', en: 'Ginger', mm: 'ဂျင်း', cat: 'Produce', img: '🫚', keys: ['ဂျ', 'ဂျင်း'] },
  { id: 'v17', en: 'Coriander', mm: 'နံနံပင်', cat: 'Produce', img: '🌱', keys: ['န', 'နံနံပင်'] },
  { id: 'v18', en: 'Cauliflower', mm: 'ပန်းဂေါ်ဖီ', cat: 'Produce', img: '🌼', keys: ['ပ', 'ပန်းဂေါ်ဖီ'] },
  { id: 'v19', en: 'Basil', mm: 'ပင်စိမ်း', cat: 'Produce', img: '🌿', keys: ['ပ', 'ပင်စိမ်း'] },
  { id: 'v20', en: 'Mint', mm: 'ပူစီနံ', cat: 'Produce', img: '🍃', keys: ['ပ', 'ပူစီနံ'] },
  { id: 'v21', en: 'Long Bean', mm: 'ပဲသီး', cat: 'Produce', img: '🫛', keys: ['ပ', 'ပဲသီး'] }, 
  { id: 'v22', en: 'Pea Leaf', mm: 'ပဲရွက်', cat: 'Produce', img: '🌿', keys: ['ပ', 'ပဲရွက်'] },
  { id: 'v23', en: 'Bottle Gourd', mm: 'ဘူးသီး', cat: 'Produce', img: '🍐', keys: ['ဘ', 'ဘူးသီး'] }, 
  { id: 'v24', en: 'Potato', mm: 'အာလူး', cat: 'Produce', img: '🥔', keys: ['အ', 'အာလူး'] },
  { id: 'v25', en: 'Carrot', mm: 'မုန်လာဥနီ', cat: 'Produce', img: '🥕', keys: ['မ', 'မုန်လာဥနီ'] },
  { id: 'v26', en: 'Radish', mm: 'မုန်လာဥဖြူ', cat: 'Produce', img: '🧅', keys: ['မ', 'မုန်လာဥဖြူ'] }, 
  { id: 'v27', en: 'Napa Cabbage', mm: 'မုန်ညင်းဖြူ', cat: 'Produce', img: '🥬', keys: ['မ', 'မုန်ညင်းဖြူ'] },
  { id: 'v28', en: 'Mushroom', mm: 'မှို', cat: 'Produce', img: '🍄', keys: ['မှ', 'မှို'] },
  { id: 'v29', en: 'Bamboo Shoot', mm: 'မျှစ်', cat: 'Produce', img: '🎋', keys: ['မျှ', 'မျှစ်'] }, 
  { id: 'v30', en: 'Okra', mm: 'ရုံးပတီသီး', cat: 'Produce', img: '🫛', keys: ['ရ', 'ရုံးပတီသီး'] }, 
  { id: 'v31', en: 'Pumpkin', mm: 'ရွှေဖရုံသီး', cat: 'Produce', img: '🎃', keys: ['ရွှ', 'ရွှေဖရုံသီး'] },
  { id: 'v32', en: 'Cucumber', mm: 'သခွားသီး', cat: 'Produce', img: '🥒', keys: ['သ', 'သခွားသီး'] },
  { id: 'v33', en: 'Spinach', mm: 'ဟင်းနုနွယ်', cat: 'Produce', img: '🌿', keys: ['ဟ', 'ဟင်းနုနွယ်'] },
  { id: 'f1', en: 'Mango', mm: 'သရက်သီး', cat: 'Produce', img: '🥭', keys: ['သ', 'သရက်သီး'] },
  { id: 'f2', en: 'Lime', mm: 'သံပရာသီး', cat: 'Produce', img: '🍋', keys: ['သ', 'သံပရာ'] },
  { id: 'f3', en: 'Banana', mm: 'ငှက်ပျောသီး', cat: 'Produce', img: '🍌', keys: ['င', 'ငှက်ပျောသီး'] },

  // --- Meat/Fish (အသား/ငါး) ---
  { id: 'm1', en: 'Chicken', mm: 'ကြက်သား', cat: 'Meat/Fish', img: '🍗', keys: ['က', 'ကြက်'] },
  { id: 'm2', en: 'Pork', mm: 'ဝက်သား', cat: 'Meat/Fish', img: '🥓', keys: ['ဝ', 'ဝက်'] },
  { id: 'm3', en: 'Beef', mm: 'အမဲသား', cat: 'Meat/Fish', img: '🥩', keys: ['အ', 'အမဲသား'] },
  { id: 'm4', en: 'Fish', mm: 'ငါး', cat: 'Meat/Fish', img: '🐟', keys: ['င', 'ငါး'] },
  { id: 'm5', en: 'Prawn', mm: 'ပုစွန်', cat: 'Meat/Fish', img: '🦐', keys: ['ပ', 'ပုစွန်'] },
  { id: 'e1', en: 'Chicken Egg', mm: 'ကြက်ဥ', cat: 'Meat/Fish', img: '🥚', keys: ['က', 'ကြက်ဥ'] },
  { id: 'e2', en: 'Duck Egg', mm: 'ဘဲဥ', cat: 'Meat/Fish', img: '🥚', keys: ['ဘ', 'ဘဲဥ'] },

  // --- Groceries/Snacks (စားသောက်ကုန်/မုန့်) ---
  { id: 'p1', en: 'Rice', mm: 'ဆန်', cat: 'Groceries/Snacks', img: '🍚', keys: ['ဆ', 'ဆန်'] },
  { id: 'p2', en: 'Cooking Oil', mm: 'ဆီ', cat: 'Groceries/Snacks', img: '🍶', keys: ['ဆ', 'ဆီ'] },
  { id: 'p3', en: 'Salt', mm: 'ဆား', cat: 'Groceries/Snacks', img: '🧂', keys: ['ဆ', 'ဆား'] },
  { id: 'p4', en: 'Fish Paste', mm: 'ငပိ', cat: 'Groceries/Snacks', img: '🐟', keys: ['င', 'ငပိ'] },
  { id: 'p5', en: 'Fish Sauce', mm: 'ငံပြာရည်', cat: 'Groceries/Snacks', img: '🍶', keys: ['င', 'ငံပြာရည်'] },
  { id: 'p6', en: 'Soup Powder', mm: 'ဟင်းချိုမှုန့်', cat: 'Groceries/Snacks', img: '🥣', keys: ['ဟ', 'ဟင်းချိုမှုန့်'] },
  { id: 'd1', en: 'Chickpea', mm: 'ကုလားပဲ', cat: 'Groceries/Snacks', img: '🫘', keys: ['က', 'ကုလားပဲ'] },
  { id: 'd2', en: 'Noodle', mm: 'ခေါက်ဆွဲ', cat: 'Groceries/Snacks', img: '🍜', keys: ['ခ', 'ခေါက်ဆွဲ'] },
  { id: 'd3', en: 'Glass Noodle', mm: 'ကြာဇံ', cat: 'Groceries/Snacks', img: '🍜', keys: ['က', 'ကြာဇံ'] },
  { id: 'd4', en: 'Peanut', mm: 'မြေပဲ', cat: 'Groceries/Snacks', img: '🥜', keys: ['မ', 'မြေပဲ'] },
  { id: 'd5', en: 'Sugar', mm: 'သကြား', cat: 'Groceries/Snacks', img: '🧂', keys: ['သ', 'သကြား'] },
  { id: 's1', en: 'Potato Chips', mm: 'အာလူးကြော်', cat: 'Groceries/Snacks', img: '🍟', keys: ['အ', 'အာလူးကြော်'] },
  { id: 's2', en: 'Biscuit', mm: 'ဘီစကစ်', cat: 'Groceries/Snacks', img: '🍪', keys: ['ဘ', 'ဘီစကစ်'] },
  { id: 's3', en: 'Bread', mm: 'ပေါင်မုန့်', cat: 'Groceries/Snacks', img: '🍞', keys: ['ပ', 'ပေါင်မုန့်'] },
  { id: 's4', en: 'Sunflower Seeds', mm: 'နေကြာစေ့', cat: 'Groceries/Snacks', img: '🌻', keys: ['န', 'နေကြာစေ့'] },
  { id: 's5', en: 'Cake', mm: 'ကိတ်မုန့်', cat: 'Groceries/Snacks', img: '🍰', keys: ['က', 'ကိတ်'] },
  { id: 'b1', en: 'Water', mm: 'သောက်ရေသန့်', cat: 'Groceries/Snacks', img: '💧', keys: ['သ', 'ရေသန့်'] },
  { id: 'b2', en: 'Coffee', mm: 'ကော်ဖီ', cat: 'Groceries/Snacks', img: '☕', keys: ['က', 'ကော်ဖီ'] },
  { id: 'b3', en: 'Tea', mm: 'လက်ဖက်ရည်', cat: 'Groceries/Snacks', img: '🍵', keys: ['လ', 'လက်ဖက်ရည်'] },
  { id: 'b4', en: 'Soft Drink', mm: 'အချိုရည်', cat: 'Groceries/Snacks', img: '🥤', keys: ['အ', 'အချိုရည်'] },
  { id: 'b5', en: 'Milk', mm: 'နွားနို့', cat: 'Groceries/Snacks', img: '🥛', keys: ['န', 'နို့'] },
  { id: 'b6', en: 'Beer', mm: 'ဘီယာ', cat: 'Groceries/Snacks', img: '🍺', keys: ['ဘ', 'ဘီယာ'] },
  { id: 'o1', en: 'Tofu', mm: 'တိုဖူး', cat: 'Groceries/Snacks', img: '🧈', keys: ['တ', 'တိုဖူး'] },
// --- Personal Care & Apparel (လူသုံးကုန်/အဝတ်အထည်) ---
{ id: 'pc1', en: 'Shampoo', mm: 'ခေါင်းလျှော်ရည်', cat: 'Personal Care & Apparel', img: '🧴', keys: ['ခ', 'ခေါင်းလျှော်ရည်'] },
{ id: 'pc2', en: 'Soap', mm: 'ဆပ်ပြာ', cat: 'Personal Care & Apparel', img: '🧼', keys: ['ဆ', 'ဆပ်ပြာ'] },
{ id: 'pc3', en: 'Toothpaste', mm: 'သွားတိုက်ဆေး', cat: 'Personal Care & Apparel', img: '🪥', keys: ['သ', 'သွားတိုက်ဆေး'] },
{ id: 'pc4', en: 'Toothbrush', mm: 'သွားတိုက်တံ', cat: 'Personal Care & Apparel', img: '🪥', keys: ['သ', 'သွားတိုက်တံ'] },
{ id: 'pc5', en: 'Face Powder', mm: 'ပေါင်ဒါ', cat: 'Personal Care & Apparel', img: '💄', keys: ['ပ', 'ပေါင်ဒါ'] },
{ id: 'pc6', en: 'Cosmetics', mm: 'အလှကုန်', cat: 'Personal Care & Apparel', img: '💄', keys: ['အ', 'အလှကုန်'] },
{ id: 'pc7', en: 'Perfume', mm: 'ရေမွှေး', cat: 'Personal Care & Apparel', img: '🧴', keys: ['ရ', 'ရေမွှေး'] },
{ id: 'pc8', en: 'Sanitary Pad', mm: 'အမျိုးသမီးသုံးပစ္စည်း', cat: 'Personal Care & Apparel', img: '🩹', keys: ['အ', 'အမျိုးသမီးသုံး'] },
{ id: 'pc9', en: 'Tissue', mm: 'တစ်ရှူး', cat: 'Personal Care & Apparel', img: '🧻', keys: ['တ', 'တစ်ရှူး'] },
{ id: 'pc10', en: 'Detergent', mm: 'အဝတ်လျှော်ဆပ်ပြာမှုန့်', cat: 'Personal Care & Apparel', img: '🫧', keys: ['အ', 'အဝတ်လျှော်'] },

{ id: 'ap1', en: 'T-Shirt', mm: 'တီရှပ်', cat: 'Personal Care & Apparel', img: '👕', keys: ['တ', 'တီရှပ်'] },
{ id: 'ap2', en: 'Shirt', mm: 'အင်္ကျီ', cat: 'Personal Care & Apparel', img: '👔', keys: ['အ', 'အင်္ကျီ'] },
{ id: 'ap3', en: 'Pants', mm: 'ဘောင်းဘီ', cat: 'Personal Care & Apparel', img: '👖', keys: ['ဘ', 'ဘောင်းဘီ'] },
{ id: 'ap4', en: 'Longyi', mm: 'လုံချည်', cat: 'Personal Care & Apparel', img: '🩳', keys: ['လ', 'လုံချည်'] },
{ id: 'ap5', en: 'Underwear', mm: 'အတွင်းခံ', cat: 'Personal Care & Apparel', img: '🩲', keys: ['အ', 'အတွင်းခံ'] },
{ id: 'ap6', en: 'Shoes', mm: 'ဖိနပ်', cat: 'Personal Care & Apparel', img: '👟', keys: ['ဖ', 'ဖိနပ်'] },
{ id: 'ap7', en: 'Slippers', mm: 'ဖိနပ်ပါး', cat: 'Personal Care & Apparel', img: '🩴', keys: ['ဖ', 'ဖိနပ်ပါး'] },
{ id: 'ap8', en: 'Socks', mm: 'ခြေအိတ်', cat: 'Personal Care & Apparel', img: '🧦', keys: ['ခြ', 'ခြေအိတ်'] },
{ id: 'ap9', en: 'Bag', mm: 'အိတ်', cat: 'Personal Care & Apparel', img: '👜', keys: ['အ', 'အိတ်'] },
{ id: 'ap10', en: 'Hat', mm: 'ဦးထုပ်', cat: 'Personal Care & Apparel', img: '🧢', keys: ['ဦး', 'ဦးထုပ်'] },
  // --- Household & Others (အိမ်သုံး/အထွေထွေ) ---
  { id: 'h1', en: 'Electricity Bill', mm: 'မီတာခ', cat: 'Household & Others', img: '⚡', keys: ['မ', 'မီတာ'] },
  { id: 'h2', en: 'Water Bill', mm: 'ရေဖိုး', cat: 'Household & Others', img: '💧', keys: ['ရ', 'ရေဖိုး'] },
  { id: 'h3', en: 'WiFi / Internet', mm: 'WiFi / အင်တာနက်', cat: 'Household & Others', img: '🌐', keys: ['အ', 'အင်တာနက်'] },
  { id: 'h4', en: 'Fuel / Gas', mm: 'စက်သုံးဆီ', cat: 'Household & Others', img: '⛽', keys: ['စ', 'စက်သုံးဆီ'] },
  { id: 'h5', en: 'Altar Flowers', mm: 'ဘုရားပန်း', cat: 'Household & Others', img: '💐', keys: ['ဘ', 'ဘုရားပန်း'] },
  { id: 'o2', en: 'Charity / Donation', mm: 'အလှူငွေ', cat: 'Household & Others', img: '🙏', keys: ['အ', 'အလှူ'] },
  { id: 'o3', en: 'Medicine', mm: 'ဆေးဝါး', cat: 'Household & Others', img: '💊', keys: ['ဆ', 'ဆေး'] }
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