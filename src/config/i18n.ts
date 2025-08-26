import i18n from "i18next";
import Backend from "i18next-fs-backend";
import middleware from "i18next-http-middleware";
import path from "path";

i18n
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: "en",
    preload: ["en", "ar"],
    backend: {
      loadPath: path.join(__dirname, "../locales/{{lng}}/translation.json"),
    },
    detection: {
      order: ["querystring", "header"],
      caches: false,
    },
    debug: true,
  });

export default i18n;
