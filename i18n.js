import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: "Welcome",
      dashboard: "Dashboard",
      select_language: "Select Language",
      "Uploaded Equipment History": "Uploaded Equipment History",
      "No equipment uploaded yet.": "No equipment uploaded yet.",
      "Search equipment by name, description, or price...": "Search equipment by name, description, or price...",
      "Search": "Search",
      "View Borrowing History": "View Borrowing History",
      "Available Equipment": "Available Equipment",
      "No equipment found. Try something else! 😊": "No equipment found. Try something else! 😊",
      "Upload Equipment Details": "Upload Equipment Details",
      "Equipment Name:": "Equipment Name:",
      "Description:": "Description:",
      "Address:": "Address:",
      "Owner Name:": "Owner Name:",
      "Mobile Number:": "Mobile Number:",
      "Price:": "Price:",
      "Upload Photo:": "Upload Photo:",
      "Submit": "Submit"
    }
  },
  hi: {
    translation: {
      welcome: "स्वागत है",
      dashboard: "डैशबोर्ड",
      select_language: "भाषा चुनें",
      "Uploaded Equipment History": "अपलोड की गई उपकरण सूची",
      "No equipment uploaded yet.": "अभी तक कोई उपकरण अपलोड नहीं किया गया है।",
      "Search equipment by name, description, or price...": "नाम, विवरण या कीमत से उपकरण खोजें...",
      "Search": "खोजें",
      "View Borrowing History": "उधारी इतिहास देखें",
      "Available Equipment": "उपलब्ध उपकरण",
      "No equipment found. Try something else! 😊": "कोई उपकरण नहीं मिला। कुछ और प्रयास करें! 😊",
      "Upload Equipment Details": "उपकरण विवरण अपलोड करें",
      "Equipment Name:": "उपकरण का नाम:",
      "Description:": "विवरण:",
      "Address:": "पता:",
      "Owner Name:": "मालिक का नाम:",
      "Mobile Number:": "मोबाइल नंबर:",
      "Price:": "कीमत:",
      "Upload Photo:": "फोटो अपलोड करें:",
      "Submit": "सबमिट करें"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
