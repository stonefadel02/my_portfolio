"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import { useLanguage } from "./context/LanguageContext";
import { useTheme } from "./context/ThemeContext";

function PolaroidPhoto({
  image,
  containerClassName,
  peelBottomLabel,
  peelTopLabel,
  clickToPeel,
  surpriseLabel,
}: {
  image: { src: string; width: number; height: number; alt: string };
  containerClassName?: string;
  peelBottomLabel: string;
  peelTopLabel: string;
  clickToPeel: string;
  surpriseLabel: string;
}) {
  const [clickedTapes, setClickedTapes] = useState<Set<number>>(new Set());
  const [isFallen, setIsFallen] = useState(false);

  useEffect(() => {
    if (clickedTapes.size === 2) {
      const timer = setTimeout(() => setIsFallen(true), 150);
      return () => clearTimeout(timer);
    }
  }, [clickedTapes]);

  const handleTapeClick = (id: number) => {
    if (isFallen || clickedTapes.has(id)) return;
    setClickedTapes((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  return (
    <div className={`${containerClassName || ""} absolute`}>
      {/* Surprise Rickroll Emoji underneath */}
      <a
        href="https://www.youtube.com/watch?v=3Kxf2dHlDpQ&list=RD3Kxf2dHlDpQ"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 flex items-center justify-center cursor-pointer select-none"
        aria-label={surpriseLabel}
      >
        <span className="text-5xl sm:text-6xl animate-bounce" role="img" aria-hidden="true">
          🤡
        </span>
      </a>

      {/* The Polaroid container itself */}
      <div
        className={`${
          isFallen
            ? "transition-all duration-[1500ms] ease-in transform translate-y-[120vh] rotate-60 pointer-events-none opacity-0"
            : ""
        } z-20 relative`}
      >
        <div className="p-2.5 sm:p-3 bg-white border border-stone-200 shadow-md rounded-xs">
          <div className="relative aspect-square w-full bg-stone-100 overflow-hidden border border-stone-200">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 640px) 310px, 48vw"
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Sticky Tapes on Corners */}
        <button
          type="button"
          onClick={() => handleTapeClick(1)}
          aria-label={peelBottomLabel}
          className={`absolute -bottom-1 -left-3 w-14 sm:w-16 h-5 sm:h-6 bg-white/70 border border-white/30 shadow-xs backdrop-blur-[1px] transform rotate-45 cursor-pointer transition-opacity duration-300 touch-manipulation ${
            clickedTapes.has(1) ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          title={clickToPeel}
        />
        <button
          type="button"
          onClick={() => handleTapeClick(2)}
          aria-label={peelTopLabel}
          className={`absolute -top-2 -right-3 w-14 sm:w-16 h-5 sm:h-6 bg-white/70 border border-white/30 shadow-xs backdrop-blur-[1px] transform rotate-45 cursor-pointer transition-opacity duration-300 touch-manipulation ${
            clickedTapes.has(2) ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
          title={clickToPeel}
        />
      </div>
    </div>
  );
}

export default function Home() {
  const { t, locale, setLocale } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [animationClass, setAnimationClass] = useState<string>("");
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const binderRef = useRef<HTMLDivElement>(null);

  const handleTabClick = (tabName: string) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsMenuOpen(false);

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }

    if (activeTab === tabName) {
      // Close active page
      setAnimationClass("animate-put-back");
      setTimeout(() => {
        setActiveTab(null);
      }, 800);
    } else if (activeTab) {
      // Transition between tabs: animate out previous, then animate in new
      setAnimationClass("animate-put-back");
      setTimeout(() => {
        setActiveTab(tabName);
        setAnimationClass("animate-pull-over");
      }, 800);
    } else {
      // Open tab from cover
      setActiveTab(tabName);
      setAnimationClass("animate-pull-over");
    }
  };

  const handleClose = () => {
    if (isAnimating || !activeTab) return;
    setIsAnimating(true);
    setIsMenuOpen(false);
    setAnimationClass("animate-put-back");
    setTimeout(() => {
      setActiveTab(null);
    }, 800);
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (
        !isAnimating &&
        binderRef.current &&
        !binderRef.current.contains(e.target as Node) &&
        activeTab
      ) {
        setIsAnimating(true);
        setAnimationClass("animate-put-back");
        setTimeout(() => {
          setActiveTab(null);
        }, 800);
      }
    };

    if (activeTab) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("touchstart", handleOutsideClick, { passive: true });
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [activeTab, isAnimating]);

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 800);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const tabs = [
    { id: "About", label: t.tabAbout, color: "bg-emerald-500", rotate: "-rotate-2" },
    { id: "Skills", label: t.tabSkills, color: "bg-sky-400", rotate: "rotate-1" },
    { id: "Projects", label: t.tabProjects, color: "bg-rose-400", rotate: "-rotate-1" },
    { id: "Contact", label: t.tabContact, color: "bg-amber-400", rotate: "rotate-2" },
  ];

  return (
    <main className="relative min-h-dvh h-dvh w-screen overflow-hidden bg-sky-50 dark:bg-stone-600 flex items-center justify-center p-3 sm:p-4">
      {/* Main Binder/Notebook Container */}
      <div
        ref={binderRef}
        className="relative w-[90vw] h-[70vw] sm:w-[85vw] sm:h-[62vw] lg:w-[80vw] lg:h-[58vw] max-w-[120vh] max-h-[85vh] transition-all duration-300"
      >
        {/* Mobile Floating Menu (perched right on the top edge of the envelope like web tabs) */}
        <div className="sm:hidden absolute -top-7 right-3 z-[130]">
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            aria-label={isMenuOpen ? (locale === "fr" ? "Fermer le menu" : "Close menu") : (locale === "fr" ? "Ouvrir le menu" : "Open menu")}
            aria-expanded={isMenuOpen}
            className={`
              flex items-center gap-1.5 px-3 h-8 rounded-t-lg font-permanent text-xs font-bold shadow-md
              border-t border-x border-stone-800/20 backdrop-blur-md transition-all active:translate-y-0.5 cursor-pointer select-none
              ${
                isMenuOpen
                  ? "bg-amber-300 text-stone-900 ring-2 ring-stone-900/30 -translate-y-0.5"
                  : "bg-amber-400 text-stone-800 hover:-translate-y-0.5"
              }
            `}
          >
            {/* Sketch-style mini hamburger lines */}
            <div className="w-3.5 h-2.5 flex flex-col justify-between items-center">
              <span
                className={`block h-0.5 w-3.5 rounded-full transition-transform duration-300 origin-center ${
                  isMenuOpen ? "rotate-45 translate-y-1 bg-stone-900" : "bg-stone-800"
                }`}
              />
              <span
                className={`block h-0.5 w-3.5 rounded-full transition-opacity duration-200 ${
                  isMenuOpen ? "opacity-0" : "opacity-100 bg-stone-800"
                }`}
              />
              <span
                className={`block h-0.5 w-3.5 rounded-full transition-transform duration-300 origin-center ${
                  isMenuOpen ? "-rotate-45 -translate-y-1 bg-stone-900" : "bg-stone-800"
                }`}
              />
            </div>

            <span>Menu</span>
            <span className="text-stone-800/40 text-[10px]">•</span>
            <span className="px-1.5 py-0.2 rounded text-[10px] font-black uppercase bg-white/90 text-stone-900 shadow-2xs">
              {locale}
            </span>
          </button>

          {/* Compact Floating Dropdown anchored right under the tab button */}
          {isMenuOpen && (
            <>
              {/* Invisible backdrop to dismiss on outside tap */}
              <div
                className="fixed inset-0 z-[-1]"
                onClick={() => setIsMenuOpen(false)}
                aria-hidden="true"
              />

              <div
                className="absolute top-8.5 right-0 w-56 bg-[#fffefb] border-2 border-stone-300 rounded-2xl p-3 shadow-2xl animate-menu-pop text-stone-800 -rotate-1 origin-top-right select-none"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Cute tape on corner */}
                <div className="absolute -top-2 left-6 w-12 h-3.5 bg-white/80 border border-stone-200 shadow-2xs backdrop-blur-xs -rotate-6 pointer-events-none" />

                {/* Header with active tab or close notebook */}
                <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-stone-200 border-dashed">
                  <span className="font-permanent text-xs text-stone-500 uppercase tracking-wider">
                    {locale === "fr" ? "Sommaire" : "Index"}
                  </span>
                  {activeTab && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleClose();
                      }}
                      className="text-[11px] font-kalam font-bold text-red-600 hover:text-red-700 underline cursor-pointer"
                    >
                      {locale === "fr" ? "Fermer ✕" : "Close ✕"}
                    </button>
                  )}
                </div>

                {/* Section Tabs */}
                <div className="flex flex-col gap-1.5">
                  {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => {
                          setIsMenuOpen(false);
                          handleTabClick(tab.id);
                        }}
                        className={`
                          w-full flex items-center justify-between px-3 py-1.5 rounded-xl border border-stone-800/10 font-permanent text-xs transition-all active:scale-95 cursor-pointer
                          ${tab.color} text-stone-800 shadow-xs
                          ${isActive ? "ring-2 ring-stone-900 shadow-md font-black translate-x-1" : "hover:translate-x-0.5"}
                        `}
                      >
                        <span>{tab.label}</span>
                        {isActive && (
                          <span className="text-[10px] bg-stone-900/20 px-1.5 py-0.5 rounded font-kalam font-bold">
                            ✓
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Divider */}
                <hr className="border-t border-stone-200 border-dashed my-2.5" />

                {/* Language switch */}
                <div className="flex items-center justify-between">
                  <span className="font-kalam font-bold text-xs text-stone-500">
                    {locale === "fr" ? "Langue" : "Language"}
                  </span>
                  <div className="flex items-center gap-1 bg-stone-100 border border-stone-200 rounded-lg p-0.5 font-permanent text-xs">
                    <button
                      type="button"
                      onClick={() => setLocale("fr")}
                      className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                        locale === "fr"
                          ? "bg-amber-400 text-stone-900 font-bold shadow-2xs scale-105"
                          : "text-stone-500 hover:text-stone-800"
                      }`}
                    >
                      FR
                    </button>
                    <span className="text-stone-300 text-[10px]">/</span>
                    <button
                      type="button"
                      onClick={() => setLocale("en")}
                      className={`px-2 py-0.5 rounded transition-all cursor-pointer ${
                        locale === "en"
                          ? "bg-amber-400 text-stone-900 font-bold shadow-2xs scale-105"
                          : "text-stone-500 hover:text-stone-800"
                      }`}
                    >
                      EN
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Desktop Navigation Tabs + Language Tab (visible on sm and larger, sticking directly out of the envelope) */}
        <nav aria-label={t.navAria} className="absolute inset-x-0 bottom-full h-8 translate-y-[3px] sm:h-[8%]">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={t.themeToggleAria}
            aria-pressed={theme === "dark"}
            className="absolute left-2 z-[30] flex h-full items-end gap-1.5 rounded-t-lg border-x border-t border-stone-800/20 bg-white/95 px-2.5 pb-1 font-permanent text-xs font-bold text-stone-800 shadow-md backdrop-blur-md transition-all dark:bg-stone-800 dark:text-stone-100 sm:hidden"
          >
            <span aria-hidden="true">{theme === "dark" ? "☀️" : "🌙"}</span>
            {theme === "dark" ? t.themeLight : t.themeDark}
          </button>

          <ul role="tablist" className="absolute right-4 sm:right-6 top-0 hidden h-full w-[68%] items-end gap-x-1 sm:flex sm:gap-x-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <li
                  key={tab.id}
                  role="presentation"
                  className={`relative flex-1 h-full ${isActive ? "z-[50]" : "z-[30] hover:z-[50]"}`}
                >
                  <button
                    type="button"
                    role="tab"
                    onClick={() => handleTabClick(tab.id)}
                    aria-label={tab.label}
                    aria-selected={isActive}
                    className={`
                      relative flex justify-center items-end h-full rounded-t-lg px-1 pb-1 sm:px-3 sm:pb-2 md:px-4 md:pb-3 text-xs sm:text-base md:text-lg lg:text-xl font-bold text-stone-800 shadow-md after:pointer-events-none after:absolute after:inset-x-0 after:-bottom-3 after:h-4 after:bg-inherit after:content-[''] ${tab.color}
                      transition-all duration-200 ease-in-out hover:-translate-y-1 active:translate-y-0.5 cursor-pointer
                      ${tab.rotate} w-full border-t border-x border-stone-800/15 font-permanent select-none
                      ${isActive ? "-translate-y-1 sm:-translate-y-1.5 ring-2 ring-stone-800/20" : ""}
                    `}
                  >
                    <span className="-rotate-1 truncate">{tab.label}</span>
                  </button>
                </li>
              );
            })}

            {/* Language Tab attached right beside other tabs on the envelope */}
            <li role="presentation" className="relative z-[30] flex-initial h-full hover:z-[50]">
              <div
                className={`
                  relative flex items-end justify-center h-full rounded-t-lg px-2 pb-1 sm:px-2.5 sm:pb-2 text-xs sm:text-sm md:text-base font-bold text-stone-800 shadow-md
                  bg-violet-400 rotate-1 border-t border-x border-stone-800/15 font-permanent select-none transition-transform hover:-translate-y-1 after:pointer-events-none after:absolute after:inset-x-0 after:-bottom-3 after:h-4 after:content-[''] after:bg-violet-400
                `}
              >
                <button
                  type="button"
                  onClick={() => setLocale("fr")}
                  className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                    locale === "fr"
                      ? "bg-white/95 text-stone-900 shadow-xs font-black -translate-y-0.5"
                      : "text-stone-800/75 hover:text-stone-950"
                  }`}
                  aria-label="Français"
                  aria-pressed={locale === "fr"}
                >
                  FR
                </button>
                <span className="text-stone-800/40 mx-0.5">/</span>
                <button
                  type="button"
                  onClick={() => setLocale("en")}
                  className={`px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                    locale === "en"
                      ? "bg-white/95 text-stone-900 shadow-xs font-black -translate-y-0.5"
                      : "text-stone-800/75 hover:text-stone-950"
                  }`}
                  aria-label="English"
                  aria-pressed={locale === "en"}
                >
                  EN
                </button>
              </div>
            </li>
            <li role="presentation" className="relative z-[30] flex-initial h-full hover:z-[50]">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={t.themeToggleAria}
                aria-pressed={theme === "dark"}
                className="relative flex h-full items-end gap-1.5 rounded-t-lg border-x border-t border-stone-800/20 bg-white/95 px-2.5 pb-1 sm:pb-2 font-permanent text-xs sm:text-sm md:text-base font-bold text-stone-800 shadow-md backdrop-blur-md transition-all after:pointer-events-none after:absolute after:inset-x-0 after:-bottom-3 after:h-4 after:bg-white after:content-[''] hover:-translate-y-1 dark:bg-stone-800 dark:text-stone-100 dark:after:bg-stone-800"
              >
                <span aria-hidden="true">{theme === "dark" ? "☀️" : "🌙"}</span>
                {theme === "dark" ? t.themeLight : t.themeDark}
              </button>
            </li>
          </ul>
        </nav>

        {/* Decorative shadow/backing sheet */}
        <div className="absolute inset-0 z-10 origin-bottom skew-x-2 sm:skew-x-3 w-full h-full rounded-lg bg-orange-200 border-2 border-orange-300/40 p-4 mt-1 sm:mt-1.5 shadow-xl pointer-events-none" />

        {/* Lined Paper page (slides up/down and gains higher z-index when open) */}
        <div
          ref={scrollContainerRef}
          className={`absolute inset-x-0 bottom-0 top-3 sm:top-5 z-20 w-full rounded-lg bg-lined-paper px-3 sm:px-6 md:px-8 pb-4 pt-4 sm:pt-6 md:pt-8 shadow-lg text-stone-800 overflow-y-auto overscroll-contain ${animationClass}`}
        >
          {/* Desktop Close button */}
          {activeTab && (
            <div className="hidden sm:flex sticky top-0 z-30 justify-end pb-2 pointer-events-none -mt-2">
              <button
                type="button"
                onClick={handleClose}
                aria-label={t.closePage}
                className="pointer-events-auto flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800/90 hover:bg-stone-900 text-stone-100 shadow-md font-kalam text-xs sm:text-sm font-bold transition-transform active:scale-95 cursor-pointer border border-stone-700/50 backdrop-blur-xs"
              >
                <span className="text-sm">✕</span>
                <span>{t.closePage}</span>
              </button>
            </div>
          )}

          {activeTab === "About" && <About />}
          {activeTab === "Skills" && <Skills />}
          {activeTab === "Projects" && <Projects />}
          {activeTab === "Contact" && <Contact />}
        </div>

        {/* Folder cover front (always z-40, sits on top unless paper slides above it to z-100) */}
        <div className="absolute inset-0 z-40 origin-bottom -skew-x-2 sm:-skew-x-3 w-full h-full rounded-lg bg-orange-200 border-2 border-orange-300/30 p-3.5 sm:p-6 shadow-2xl flex flex-col justify-between select-none">
          {/* Label Title */}
          <div className="self-start -rotate-6 translate-y-1 sm:translate-y-4 ml-1 sm:ml-4 bg-white text-stone-800 px-3 py-1.5 sm:p-3 border border-stone-200 shadow-sm rounded-lg">
            <p className="font-permanent text-xl sm:text-2xl lg:text-3xl font-bold -rotate-2">
              {t.folderTitle}
            </p>
          </div>

          {/* Polaroid and Badge */}
          <div className="relative w-full flex-grow flex items-center justify-between my-2">
            {/* Retro Quality Badge */}
            <div className="absolute w-[32vw] h-[32vw] max-w-[130px] max-h-[130px] sm:w-[22vw] sm:h-[22vw] sm:max-w-[185px] sm:max-h-[185px] left-1 sm:left-2 bottom-3 sm:bottom-1 skew-x-2 sm:skew-x-3 -rotate-12 select-none pointer-events-none drop-shadow-md">
              <Image
                src="/stump1.png"
                alt="Full Stack Developer Qualified stamp"
                fill
                sizes="(min-width: 640px) 185px, 32vw"
                className="object-contain"
              />
            </div>

            {/* Polaroid Photo */}
            <PolaroidPhoto
              image={{ src: "/photo.jpeg", width: 240, height: 240, alt: "Stone AFEDJOU Profile" }}
              containerClassName="w-[48vw] max-w-[240px] sm:w-[32vw] sm:max-w-[310px] right-2 sm:right-8 top-2 sm:top-3 skew-x-2 sm:skew-x-3 rotate-[8deg] sm:rotate-[12deg]"
              peelBottomLabel={t.peelBottomTape}
              peelTopLabel={t.peelTopTape}
              clickToPeel={t.clickToPeel}
              surpriseLabel={t.surpriseLink}
            />
          </div>

          {/* Cover bottom credits */}
          <div className="text-center text-xs sm:text-sm text-stone-600 font-kalam font-bold py-1">
            {t.folderCredits}
          </div>
        </div>

        {/* Notebook External Footer details */}
        <p className="absolute -bottom-7 sm:-bottom-8 left-0 right-0 text-center text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-kalam">
          Stone AFEDJOU {new Date().getFullYear()} —{" "}
          <a
            href="http://www.linkedin.com/in/stone-afedjou"
            className="text-blue-500 hover:underline hover:text-blue-600 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>{" "}
          •{" "}
          <a
            href="https://github.com/stonefadel02"
            className="text-emerald-600 hover:underline hover:text-emerald-700 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </p>
      </div>
    </main>
  );
}
