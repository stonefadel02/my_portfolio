"use client";

import DotPortrait from "./DotPortrait";
import { useLanguage } from "../context/LanguageContext";

export default function About() {
  const { t, locale } = useLanguage();

  return (
    <div className="flex flex-col items-center text-center py-2 sm:py-4 px-1 sm:px-2 gap-4 sm:gap-6 max-w-2xl mx-auto">
      <DotPortrait
        src="/face.jpeg"
        alt={locale === "fr" ? "Portrait de points interactif de Stone AFEDJOU" : "Stone AFEDJOU dotted portrait"}
      />

      <div className="flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-permanent text-stone-800 dark:text-stone-100 -rotate-1 transition-colors">
          Stone AFEDJOU
        </h1>
        <p className="text-stone-500 dark:text-stone-400 font-kalam font-bold text-base sm:text-lg transition-colors">
          {t.aboutRole}
        </p>
      </div>

      <hr className="w-full border-t-2 border-stone-200 dark:border-stone-700/60 border-dashed my-1 transition-colors" />

      <div className="text-stone-600 dark:text-[#ded8ce] font-kalam leading-relaxed text-justify text-sm sm:text-base md:text-lg flex flex-col gap-3 transition-colors">
        <p>{t.aboutBio1}</p>
        <p>{t.aboutBio2}</p>
        <p>{t.aboutBio3}</p>
        <p>{t.aboutBio4}</p>
      </div>

      <a
        href="https://morning-sea-380.linkyhost.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-lg border-2 border-stone-700 dark:border-stone-600 bg-stone-700 dark:bg-stone-800 px-5 py-2 font-kalam font-bold text-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-stone-800 dark:hover:bg-stone-700 hover:shadow-md"
      >
        {t.viewCv}
      </a>

      <div className="flex gap-4 mt-2">
        <span className="font-permanent text-stone-500 dark:text-stone-400 text-sm transition-colors">
          📍 {t.location}
        </span>
      </div>
    </div>
  );
}
