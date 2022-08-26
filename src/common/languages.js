/**
 * I18 config file.
 * If change the system language, app must reboot.
 */
import I18n from "i18n-js";
import * as RNLocalize from "react-native-localize";
import cn from "./cn";
import en from "./en";

const locales = RNLocalize.getLocales();
const systemLanguage = locales[0]?.languageCode;

if (systemLanguage) {
  I18n.locale = systemLanguage;
} else {
  I18n.locale = "en"; // default language
}

I18n.fallbacks = true;
I18n.translations = {
  zh: cn,
  en,
};

export default I18n;
