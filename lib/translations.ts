import type { Language } from "./types"

export const translations = {
  // Navigation
  home: { en: "Home", hi: "होम" },
  products: { en: "Products", hi: "उत्पाद" },
  categories: { en: "Categories", hi: "श्रेणियाँ" },
  about: { en: "About Us", hi: "हमारे बारे में" },
  contact: { en: "Contact", hi: "संपर्क करें" },
  cart: { en: "Cart", hi: "कार्ट" },
  trackOrder: { en: "Track Order", hi: "ऑर्डर ट्रैक करें" },

  // Product
  addToCart: { en: "Add to Cart", hi: "कार्ट में जोड़ें" },
  selectWeight: { en: "Select Weight", hi: "वजन चुनें" },
  viewDetails: { en: "View Details", hi: "विवरण देखें" },
  featuredProducts: { en: "Featured Products", hi: "विशेष उत्पाद" },
  allProducts: { en: "All Products", hi: "सभी उत्पाद" },

  // Cart & Checkout
  yourCart: { en: "Your Cart", hi: "आपका कार्ट" },
  emptyCart: { en: "Your cart is empty", hi: "आपका कार्ट खाली है" },
  quantity: { en: "Quantity", hi: "मात्रा" },
  remove: { en: "Remove", hi: "हटाएं" },
  requestQuotation: { en: "Request Quotation", hi: "कोटेशन का अनुरोध करें" },
  continueShopping: { en: "Continue Shopping", hi: "खरीदारी जारी रखें" },

  // Checkout Form
  customerDetails: { en: "Customer Details", hi: "ग्राहक विवरण" },
  fullName: { en: "Full Name", hi: "पूरा नाम" },
  mobileNumber: { en: "Mobile Number", hi: "मोबाइल नंबर" },
  email: { en: "Email (Optional)", hi: "ईमेल (वैकल्पिक)" },
  address: { en: "Delivery Address", hi: "डिलीवरी पता" },
  notes: { en: "Additional Notes", hi: "अतिरिक्त नोट्स" },
  submit: { en: "Submit Request", hi: "अनुरोध भेजें" },

  // Order Tracking
  enterDetails: { en: "Enter your order details", hi: "अपना ऑर्डर विवरण दर्ज करें" },
  orderNumber: { en: "Order Number", hi: "ऑर्डर नंबर" },
  quotationNumber: { en: "Quotation Number", hi: "कोटेशन नंबर" },
  track: { en: "Track", hi: "ट्रैक करें" },

  // Status
  requested: { en: "Requested", hi: "अनुरोध किया गया" },
  approved: { en: "Approved", hi: "स्वीकृत" },
  rejected: { en: "Rejected", hi: "अस्वीकृत" },
  processing: { en: "Processing", hi: "प्रक्रिया में" },
  dispatched: { en: "Dispatched", hi: "भेजा गया" },
  delivered: { en: "Delivered", hi: "डिलीवर किया गया" },
  cancelled: { en: "Cancelled", hi: "रद्द" },

  // Common
  loading: { en: "Loading...", hi: "लोड हो रहा है..." },
  error: { en: "Error", hi: "त्रुटि" },
  success: { en: "Success", hi: "सफलता" },
  close: { en: "Close", hi: "बंद करें" },
  save: { en: "Save", hi: "सहेजें" },
  cancel: { en: "Cancel", hi: "रद्द करें" },
  delete: { en: "Delete", hi: "हटाएं" },
  edit: { en: "Edit", hi: "संपादित करें" },
  search: { en: "Search", hi: "खोजें" },

  // Footer
  since1980: { en: "Since 1980", hi: "1980 से" },
  authenticTaste: { en: "Authentic Taste, Traditional Quality", hi: "प्रामाणिक स्वाद, पारंपरिक गुणवत्ता" },
  allRightsReserved: { en: "All rights reserved", hi: "सर्वाधिकार सुरक्षित" },
}

export function translate(key: keyof typeof translations, language: Language): string {
  return translations[key][language]
}
