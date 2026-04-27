export const translations = {
  mm: {
    'app.title': 'Market Pro+',
    'cart.title': 'ဝယ်ယူမည့်စာရင်း',
    'cart.empty': 'ဝယ်ယူမည့်စာရင်း မရှိသေးပါ',
    'cart.clear': 'အားလုံးဖျက်မည်',
    'cart.total': 'စုစုပေါင်းကျသင့်ငွေ',
    'cart.items': 'မျိုး',
    'nav.catalog': 'ပစ္စည်းများ',
    'nav.cart': 'စာရင်း'
  }
};

export const t = (key: string) => {
  const result = translations.mm[key as keyof typeof translations.mm];
  return result || key;
};