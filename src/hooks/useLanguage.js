import { useEffect, useState } from 'react';

const STORAGE_KEY = 'language';

export default function useLanguage(initialValue = 'zh') {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === 'zh' || stored === 'en') {
        return stored;
      }
    } catch (e) {
      // localStorage unavailable — fall back to the default language
    }
    return initialValue;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {
      // ignore persistence errors
    }
    document.documentElement.lang = value === 'zh' ? 'zh-Hant' : 'en';
  }, [value]);

  return {
    value,
    toggle: () => setValue((prev) => (prev === 'zh' ? 'en' : 'zh')),
  };
}
