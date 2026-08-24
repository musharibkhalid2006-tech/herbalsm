/* =========================================================
   HERBA · L·S·M  —  PRODUCT DATA
   Yahan se products add/edit/remove karein. Har product ek
   object hai is array ke andar. Image path assets/ folder
   se refer hota hai.
   ========================================================= */

const STORE = {
  // 🔴 IMPORTANT: apna WhatsApp business number yahan daalein
  // Format: country code + number, NO spaces, NO +, NO leading 0
  // Pakistan example: 923001234567
  whatsappNumber: "923702271313",
  currency: "Rs. ",
};

const CATEGORIES = [
  { id: "hair-oils",  name: "Natural Hair Oils", tagline: "Roots & Growth",   img: "assets/hairoil5.jpeg", imgPosition: "82% 42%" },
  { id: "shampoo",     name: "Herbal Shampoos",   tagline: "Cleanse Naturally", img: "assets/hairoil3.jpeg", imgPosition: "78% 48%" },
  { id: "skincare",    name: "Skincare",          tagline: "Coming Soon",     img: "assets/hairoil6.jpeg", imgPosition: "88% 50%" },
  { id: "fragrances",  name: "Fragrances",        tagline: "Coming Soon",     img: "assets/hairoil2.jpeg", imgPosition: "72% 45%" },
];

const PRODUCTS = [
  {
    id: "hibiscus-shampoo-220",
    title: "Hibiscus Herbal Shampoo",
    category: "shampoo",
    categoryLabel: "Herbal Shampoo",
    volume: "220 ML",
    price: 850,
    oldPrice: 950,
    badge: "Best Seller",
    image: "assets/hair7.jpg",
    tags: ["sulfate-free", "paraben-free", "silicone-free", "100% natural"],
    description: "Herbal shampoo infused with Hibiscus — free from sulfates, parabens, and silicones. Gently cleanses while nourishing your scalp naturally."
  },
  {
    id: "herbal-shampoo-220",
    title: "Herbal Shampoo — Natural Hair Care",
    category: "shampoo",
    categoryLabel: "Herbal Shampoo",
    volume: "220 ML",
    price: 900,
    oldPrice: 1000,
    badge: "Best Seller",
    image: "assets/hairoil5.jpeg",
    tags: ["sulfate-free", "paraben-free", "chemical-free"],
    description: "Reduces hair fall, strengthens roots, and deeply nourishes the scalp with a sulfate and paraben-free formula."
  },
  {
    id: "herbal-hair-oil-100",
    title: "Herbal Hair Oil",
    category: "hair-oils",
    categoryLabel: "Herbal Hair Oil",
    volume: "100 ML",
    price: 800,
    oldPrice: 900,
    badge: "Best Seller",
    image: "assets/hairoil3.jpeg",
    tags: ["nourishes roots", "reduces hair fall", "100% natural"],
    description: "Nourishes hair roots and minimizes hair fall. Promotes healthy growth while leaving hair strong and glossy."
  },
  {
    id: "herbal-combo-set",
    title: "Herbal Shampoo + Hair Oil Combo",
    category: "hair-oils",
    categoryLabel: "Combo Pack",
    volume: "220ML + 100ML",
    price: 1600,
    oldPrice: 1700,
    badge: "Best Seller",
    image: "assets/hairoil4.jpeg",
    tags: ["complete hair care", "natural herbs", "chemical-free"],
    description: "A complete herbal hair care routine featuring our signature shampoo and hair oil combo for stronger roots and healthier hair."
  },
  {
    id: "hibiscus-value-pack",
    title: "Herbal Shampoo + Hair Oil Combo",
    category: "shampoo",
    categoryLabel: "Combo Pack",
    volume: "220ML + 100ML",
    price: 1600,
    oldPrice: 1700,
    badge: "Best Seller",
    image: "assets/hairoil6.jpeg",
    tags: ["family pack", "sulfate-free", "natural herbs"],
    description: "A value-sized family pack of our Hibiscus herbal shampoo. Crafted with pure botanicals for visible results."
  },
  {
    id: "herbal-hair-oil-travel",
    title: "Hibiscus Herbal Shampoo",
    category: "hair-oils",
    categoryLabel: "Herbal Shampoo",
    volume: "220 ML",
    price: 850,
    oldPrice: 950,
    badge: "Best Seller",
    image: "assets/hairoil7.jpeg",
    tags: ["nourishes roots", "natural herbs"],
    description: "Twin-pack herbal hair oil designed for daily use to strengthen hair roots and significantly reduce hair fall."
  },
  {
    id: "herba-hibiscus-oil-5pc-combo",
    title: "Hibiscus Shampoo + Herbal Hair Oil Combo Pack",
    category: "hair-oils",
    categoryLabel: "Combo Pack",
    volume: "3x220ML + 2x100ML",
    price: 4000,
    oldPrice: 4150,
    badge: "New",
    image: "assets/hairoilcombo2.jpg",
    tags: ["family pack", "sulfate-free", "natural herbs", "complete hair care"],
    description: "Complete herbal hair care bundle — 3 Hibiscus Herbal Shampoos and 2 Herbal Hair Oils, made with 100% natural, sulphate-free ingredients for stronger, healthier hair."
  },
  {
    id: "herba-shampoo-oil-hibiscus-combo",
    title: "Shampoo + Hair Oil + Hibiscus Combo",
    category: "hair-oils",
    categoryLabel: "Combo Pack",
    volume: "220ML + 100ML + 220ML",
    price: 2400,
    oldPrice: 2550,
    badge: "New",
    image: "assets/hairoilcombo1.jpg",
    tags: ["complete hair care", "natural herbs", "sulfate-free"],
    description: "A well-rounded herbal trio — Herbal Shampoo, Herbal Hair Oil, and Hibiscus Herbal Shampoo — together for a complete, natural hair care routine."
  },
];

/* Helper: find product by id */
function getProductById(id){
  return PRODUCTS.find(p => p.id === id);
}
