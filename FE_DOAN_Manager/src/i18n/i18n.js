import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './en.json';
import translationVI from './vi.json';

i18n
  .use(initReactI18next) // Sử dụng react-i18next
  .init({
    resources: {
      en: {
        translation: translationEN,
      },
      vi: {
        translation: translationVI,
      },
      // Thêm các ngôn ngữ khác nếu cần
    },
    lng: 'vi', // Ngôn ngữ mặc định
    fallbackLng: 'en', // Ngôn ngữ dự phòng nếu không tìm thấy
    interpolation: {
      escapeValue: false, // không escape các chuỗi HTML
    },
  });

export default i18n;
