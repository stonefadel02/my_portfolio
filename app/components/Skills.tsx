"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";

import {
  siAdonisjs,
  siDocker,
  siExpress,
  siFastapi,
  siFigma,
  siFlutter, 
  siGit,
  siGooglegemini,
  siGnubash,
  siHtml5,
  siJavascript,
  siLaravel,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siNestjs,
  siMysql,
  siPostgresql,
  siPostman,
  siPython,
  siReact,
  siTailwindcss,
  siTypescript,
  siVuedotjs,
  siWordpress,
  siAngular,
} from "simple-icons";

interface Skill {
  name: string;
  description: string;
  logo: {
    path: string;
    hex: string;
  };
}

interface SkillCardProps {
  title: string;
  skills: Skill[];
  bgColor: string;
  icon: React.ReactNode;
  isVisible: boolean;
  delay: number;
}

function SkillCard({ title, skills, bgColor, icon, isVisible, delay }: SkillCardProps) {
  return (
    <div
      className={`rounded-xl border-2 border-stone-200 bg-white p-4 sm:p-5 shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-lg dark:border-stone-700 dark:bg-stone-800 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-lg ${bgColor} flex items-center justify-center text-white`}>
          {icon}
        </div>
        <h3 className="text-lg font-permanent text-stone-700 dark:text-stone-100">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2 cursor-pointer">
        {skills.map((skill) => (
          <span
            key={skill.name}
            title={skill.description}
            className="flex items-center gap-1.5 rounded-full border border-stone-200 bg-stone-100 px-3 py-1 text-sm font-bold text-stone-600 font-kalam transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-sm dark:border-stone-600 dark:bg-stone-700 dark:text-stone-200 dark:hover:bg-stone-600"
          >
            <svg
              aria-hidden="true"
              className="h-4 w-4 shrink-0"
              fill={`#${skill.logo.hex}`}
              viewBox="0 0 24 24"
            >
              <path d={skill.logo.path} />
            </svg>
            {skill.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState("all");
  const [skillsVisible, setSkillsVisible] = useState(false);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const skillsElement = skillsRef.current;
    if (!skillsElement) return;

    const timer = setTimeout(() => {
      setSkillsVisible(true);
    }, 350);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSkillsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(skillsElement);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const filterTabs = [
    { id: "all", label: t.filterAll },
    { id: "frontend", label: t.filterFrontend },
    { id: "backend", label: t.filterBackend },
    { id: "mobile", label: t.filterMobile },
    { id: "aicloud", label: t.filterAiCloud },
  ];

  const certifications = [
    {
      title: t.certification1,
      description: t.certificationDesc1,
      color: "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
      icon: (
        <svg aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 3h6a1 1 0 0 1 1 1v3H8V4a1 1 0 0 1 1-1Zm0 10 2 2 4-4" />
        </svg>
      ),
    },
    {
      title: t.certification2,
      description: t.certificationDesc2,
      color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
      icon: (
        <svg aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18M7 14l4-4 3 3 6-7m-5 0h5v5" />
        </svg>
      ),
    },
    {
      title: t.certification3,
      description: t.certificationDesc3,
      color: "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
      icon: (
        <svg aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M12 3a15 15 0 0 1 0 18m0-18a15 15 0 0 0 0 18" />
        </svg>
      ),
    },
    {
      title: t.certification4,
      description: t.certificationDesc4,
      color: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
      icon: (
        <svg aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 18h6m-5 4h4m-2-20a7 7 0 0 0-4 12.75c.6.4 1 1 1 1.75h6c0-.75.4-1.35 1-1.75A7 7 0 0 0 12 2Z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto py-4">
      <div className="text-center">
        <h2 className="text-3xl font-permanent text-stone-800 -rotate-1 dark:text-stone-100">{t.skillsTitle}</h2>
        <p className="text-stone-500 font-kalam mt-1 dark:text-stone-300">{t.skillsSubtitle}</p>
      </div>

      <hr className="border-t-2 border-stone-200 border-dashed my-2 dark:border-stone-700" />

      {/* Skills Grid */}
      <div ref={skillsRef}>
        <h3 className="text-xl font-permanent text-stone-700 mb-4 dark:text-stone-100">{t.techStackHeading}</h3>
        <div className="mb-4 flex flex-wrap gap-2" aria-label="Filter skills by category">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id)}
              aria-pressed={activeFilter === tab.id}
              className={`rounded-full border px-3 py-1 font-kalam text-sm font-bold transition-colors ${activeFilter === tab.id ? "border-sky-500 bg-sky-500 text-white" : "border-stone-200 bg-white text-stone-500 hover:border-sky-300 hover:text-sky-600 dark:border-stone-600 dark:bg-stone-800 dark:text-stone-300 dark:hover:text-sky-300"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(activeFilter === "all" || activeFilter === "frontend") && (
            <SkillCard
              title={t.frontendTitle}
              bgColor="bg-sky-400"
              skills={[
                { name: "React", description: t.descReact, logo: siReact },
                { name: "Vue.js", description: t.descReact, logo: siVuedotjs },
                { name: "WordPress", description: t.descReact, logo: siWordpress },

                { name: "Next.js", description: t.descNextjs, logo: siNextdotjs },
                { name: "Angular", description: t.descAngular, logo: siAngular },
                { name: "TypeScript", description: t.descTypescript, logo: siTypescript },
                { name: "Tailwind CSS", description: t.descTailwind, logo: siTailwindcss },
                { name: "JavaScript", description: t.descJavascript, logo: siJavascript },
                { name: "HTML/CSS", description: t.descHtmlCss, logo: siHtml5 },
              ]}
              isVisible={skillsVisible}
              delay={0}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
            />
          )}
          {(activeFilter === "all" || activeFilter === "backend") && (
            <SkillCard
              title={t.backendTitle}
              bgColor="bg-emerald-500"
              skills={[
                { name: "Laravel", description: t.descNodejs, logo: siLaravel },
                { name: "NestJS", description: t.descNodejs, logo: siNestjs },
                { name: "AdonisJS", description: t.descNodejs, logo: siAdonisjs },


                { name: "Node.js", description: t.descNodejs, logo: siNodedotjs },
                { name: "Express", description: t.descExpress, logo: siExpress },
                { name: "PostgreSQL", description: t.descPostgresql, logo: siPostgresql },
                { name: "MySQL", description: t.descPostgresql, logo: siMysql },
                { name: "MongoDB", description: t.descMongodb, logo: siMongodb },
                { name: "FastAPI", description: t.descFastapi, logo: siFastapi },
                { name: "Python", description: t.descPython, logo: siPython },
                { name: "REST APIs", description: t.descRestApis, logo: siPostman },
              ]}
              isVisible={skillsVisible}
              delay={100}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              }
            />
          )}
          {(activeFilter === "all" || activeFilter === "mobile") && (
            <SkillCard
              title={t.mobileTitle}
              bgColor="bg-rose-400"
              skills={[
                { name: "React Native", description: t.descReactNative, logo: siReact },
                { name: "Flutter", description: t.descReactNative, logo: siFlutter },
                { name: "Mobile UI Layouts", description: t.descMobileUi, logo: siFigma },
              ]}
              isVisible={skillsVisible}
              delay={200}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              }
            />
          )}
          {(activeFilter === "all" || activeFilter === "aicloud") && (
            <SkillCard
              title={t.aiCloudTitle}
              bgColor="bg-amber-400"
              skills={[
                { name: "Claude AI", description: t.descAgenticAi, logo: siGooglegemini },
                { name: "Chat GPT AI", description: t.descGenAi, logo: siGooglegemini },
                { name: "Gemini AI", description: t.descLlms, logo: siGooglegemini },
                { name: "Git", description: t.descGit, logo: siGit },
                { name: "Docker", description: t.descDocker, logo: siDocker },
                { name: "Postman", description: t.descPostman, logo: siPostman },
                { name: "Linux Shell", description: t.descLinuxShell, logo: siGnubash },
              ]}
              isVisible={skillsVisible}
              delay={300}
              icon={
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              }
            />
          )}
        </div>
      </div>

      <hr className="border-t-2 border-stone-200 border-dashed my-2 dark:border-stone-700" />

      {/* Education Timeline */}
      <div>
        <h3 className="text-xl font-permanent text-stone-700 mb-4 dark:text-stone-100">{t.educationHeading}</h3>
        <ol className="relative ml-4 flex flex-col gap-6 border-l-2 border-sky-300 pl-6">
          <li className="relative">
            <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-sky-500 shadow-sm"></span>
            <span className="text-sm font-bold text-stone-400 font-kalam dark:text-stone-400">{t.baccalaureateDate}</span>
            <h4 className="text-lg font-permanent text-stone-700 dark:text-stone-100">{t.baccalaureateTitle}</h4>
            <p className="text-stone-500 font-kalam mt-1 dark:text-stone-300">{t.baccalaureateSub}</p>
          </li>
          <li className="relative">
            <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-sky-500 shadow-sm"></span>
            <span className="text-sm font-bold text-stone-400 font-kalam dark:text-stone-400">{t.edu1Date}</span>
            <h4 className="text-lg font-permanent text-stone-700 dark:text-stone-100">{t.edu1Title}</h4>
            <p className="text-stone-500 font-kalam mt-1 dark:text-stone-300">{t.edu1Sub}</p>
            <p className="text-stone-400 text-sm mt-1 dark:text-stone-400">{t.edu1Desc}</p>
          </li>

          
          <li className="relative">
            <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-white bg-sky-500 shadow-sm"></span>
            <span className="text-sm font-bold text-stone-400 font-kalam dark:text-stone-400">{t.codingAcademyDate}</span>
            <h4 className="text-lg font-permanent text-stone-700 dark:text-stone-100">{t.codingAcademyTitle}</h4>
            <p className="text-stone-500 font-kalam mt-1 dark:text-stone-300">{t.codingAcademyDesc}</p>
          </li>
        </ol>
      </div>

      <div>
        <h3 className="text-xl font-permanent text-stone-700 mb-4 dark:text-stone-100">{t.certificationsTitle}</h3>
        <ul className="grid gap-3 sm:grid-cols-2">
          {certifications.map((certification) => (
            <li
              key={certification.title}
              className="group relative flex min-h-32 items-start gap-3 overflow-hidden rounded-xl border border-stone-200 bg-gradient-to-br from-white to-stone-50 p-4 font-kalam text-stone-700 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md dark:border-stone-700 dark:from-stone-800 dark:to-stone-900 dark:text-stone-200"
            >
              <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${certification.color}`}>
                {certification.icon}
              </span>
              <span className="flex min-h-11 flex-col gap-1">
                <span className="font-bold leading-snug">{certification.title}</span>
                <span className="text-sm leading-snug text-stone-500 dark:text-stone-400">{certification.description}</span>
                <span className="mt-1 text-xs font-bold text-amber-700 dark:text-amber-300">2026</span>
              </span>
              <span aria-hidden="true" className="pointer-events-none absolute -bottom-5 -right-3 text-7xl font-black text-stone-900/[0.03] dark:text-white/[0.03]">✦</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mt-2 overflow-hidden rounded-2xl border-2 border-amber-200 bg-amber-50 p-6 shadow-md rotate-[0.5deg] transition-transform duration-300 hover:rotate-0 dark:border-amber-800 dark:bg-amber-950/60">
        <div className="absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 rotate-1 bg-amber-200/70 shadow-sm" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-kalam font-bold text-amber-700 dark:text-amber-300">{t.nextNoteTag}</p>
            <h3 className="mt-1 text-2xl font-permanent text-stone-800 dark:text-stone-100">{t.nextNoteTitle}</h3>
            <p className="mt-2 max-w-xl font-kalam text-stone-600 dark:text-stone-200">
              {t.nextNoteDesc}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2 font-kalam font-bold text-amber-800 dark:text-amber-200">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-amber-300 bg-white text-2xl shadow-sm" aria-hidden="true">
              ☁️
            </span>
            <span>{t.nextNoteBadge1}<br />{t.nextNoteBadge2}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
