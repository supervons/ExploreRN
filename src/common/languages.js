import I18n from "i18n-js";
import * as RNLocalize from "react-native-localize";
import cn from "./cn";
import en from "./en";

const locales = RNLocalize.getLocales();
const systemLanguage = locales[0]?.languageCode; // 用户系统偏好语言

if (systemLanguage) {
  I18n.locale = systemLanguage;
} else {
  I18n.locale = "en"; // 默认语言为英文
}

I18n.fallbacks = true;
I18n.translations = {
  zh: cn,
  en,
};

export default I18n;
