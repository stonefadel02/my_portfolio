"use client";

import React, { createContext, useContext, useEffect, useSyncExternalStore } from "react";
import { Locale, translations, TranslationSchema } from "../translations";

interface LanguageContextType {
  locale: Locale;
  setLocale: (lang: Locale) => void;
  t: TranslationSchema;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "fr",
  setLocale: () => {},
  t: translations.fr,
});

const LANGUAGE_EVENT = "portfolio_lang_change";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(LANGUAGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(LANGUAGE_EVENT, callback);
  };
}

function getSnapshot(): Locale {
  try {
    const saved = localStorage.getItem("portfolio_lang");
    if (saved === "en" || saved === "fr") {
      return saved;
    }
  } catch {
    // ignore
  }
  return "fr";
}

function getServerSnapshot(): Locale {
  return "fr";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    try {
      localStorage.setItem("portfolio_lang", newLocale);
      document.documentElement.lang = newLocale;
      window.dispatchEvent(new Event(LANGUAGE_EVENT));
    } catch {
      // ignore
    }
  };

  const t = translations[locale];

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
