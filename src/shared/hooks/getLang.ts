interface useLangProps {
  ru: string;
  en: string;
}

export const getLang = (text: useLangProps) => {
  const lang = localStorage.getItem('lang');
  return lang === 'ru' ? text.ru : text.en;
};
