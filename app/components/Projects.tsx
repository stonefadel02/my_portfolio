"use client";

import Image from "next/image";
import { useLanguage } from "../context/LanguageContext";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  links: { label: string; url: string }[];
  accentColor: string;
  image?: string;
  downloadOnLabel: string;
  demoLabel: string;
  codeLabel: string;
}

function ThumbnailPlaceholder({ title, accentColor }: { title: string; accentColor: string }) {
  return (
    <div className="w-full md:w-[220px] h-[150px] md:h-[180px] shrink-0 border-2 border-dashed border-stone-300 rounded-lg flex flex-col relative overflow-hidden group hover:border-stone-400 transition-all duration-300 bg-stone-50 shadow-inner">
      {/* Grid pattern background to fit notebook/sketchbook aesthetic */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f1f0_1px,transparent_1px),linear-gradient(to_bottom,#f1f1f0_1px,transparent_1px)] bg-[size:12px_12px] opacity-80" />
      
      {/* Mock Browser Bar */}
      <div className="relative z-10 h-7 border-b border-stone-200 bg-stone-100/80 px-2 flex items-center gap-1.5 select-none">
        <span className="w-2 h-2 rounded-full bg-stone-300 group-hover:bg-red-400 transition-colors" />
        <span className="w-2 h-2 rounded-full bg-stone-300 group-hover:bg-amber-400 transition-colors" />
        <span className="w-2 h-2 rounded-full bg-stone-300 group-hover:bg-emerald-400 transition-colors" />
        <div className="h-4 bg-white border border-stone-200 rounded px-2 flex items-center justify-center flex-grow mx-3 max-w-[110px] text-[8px] text-stone-400 font-mono overflow-hidden truncate">
          {title.toLowerCase()}.com
        </div>
      </div>
      
      {/* Mock browser sketch content */}
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center p-3 select-none">
        <div className="relative rotate-[-3deg] group-hover:rotate-0 transition-transform duration-300">
          <div className="border border-stone-300/80 bg-white/70 backdrop-blur-[1px] p-2.5 rounded shadow-sm flex items-center gap-2 max-w-[150px]">
            <span className={`w-3 h-3 rounded-full ${accentColor} opacity-70 animate-pulse shrink-0`} />
            <div className="flex flex-col gap-1">
              <span className="h-1.5 w-14 bg-stone-300 rounded" />
              <span className="h-1 w-8 bg-stone-200 rounded" />
            </div>
          </div>
        </div>
        <span className="text-[9px] text-stone-400/80 font-kalam absolute bottom-1 right-2 group-hover:text-stone-500 transition-colors">
          [ sketch placeholder ]
        </span>
      </div>
    </div>
  );
}

function ProjectCard({ title, description, tags, links, accentColor, image, downloadOnLabel, demoLabel, codeLabel }: ProjectCardProps) {
  const appStoreLinks = links.filter(({ label }) =>
    ["google play", "app store"].includes(label.toLowerCase()),
  );
  const otherLinks = links.filter(({ label }) =>
    !["google play", "app store"].includes(label.toLowerCase()),
  );

  return (
    <div className="bg-white rounded-xl p-4 sm:p-5 border-2 border-stone-200 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col md:flex-row gap-4 sm:gap-6 dark:bg-stone-800 dark:border-stone-700">
      {/* Thumbnail: Render Image if provided, else Placeholder */}
      {image ? (
        <div className="w-full md:w-[220px] h-[150px] md:h-[180px] shrink-0 border border-stone-200 rounded-lg overflow-hidden relative group hover:border-stone-300 transition-all duration-300 shadow-sm bg-stone-50">
          <Image
            src={image}
            alt={`${title} Thumbnail`}
            fill
            sizes="(min-width: 768px) 220px, 100vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
        </div>
      ) : (
        <ThumbnailPlaceholder title={title} accentColor={accentColor} />
      )}

      {/* Project Content */}
      <div className="flex-grow flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className={`w-3.5 h-3.5 rounded-full ${accentColor} shadow-sm border border-stone-800/10`} />
            <h3 className="text-xl font-permanent text-stone-700 dark:text-stone-100">{title}</h3>
          </div>
          <p className="text-stone-600 font-kalam text-sm leading-relaxed text-justify mb-4 dark:text-stone-300">
            {description}
          </p>
        </div>

        <div>
          {/* Action Links */}
          <div className="space-y-1 mb-4 font-kalam text-stone-600 text-sm border-t border-stone-100 pt-3 dark:text-stone-300 dark:border-stone-700">
            {appStoreLinks.length > 0 && (
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span>{downloadOnLabel}</span>
                {appStoreLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-600 hover:underline font-bold font-permanent"
                  >
                    {link.label}
                  </a>
                ))}
              </p>
            )}
            {otherLinks.map((link, idx) => {
              const isDemo = link.label.toLowerCase().includes("demo") || link.label.toLowerCase().includes("live");
              const isGithub = link.label.toLowerCase().includes("code") || link.label.toLowerCase().includes("github") || link.label.toLowerCase().includes("source");
              
              return (
                <p key={idx} className="flex flex-wrap items-center gap-1">
                  {isDemo && (
                    <>
                      <span>{demoLabel}</span>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600 hover:underline font-bold font-permanent"
                      >
                        {title}
                      </a>
                    </>
                  )}
                  {isGithub && (
                    <>
                      <span>{codeLabel}</span>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:text-emerald-700 hover:underline font-bold font-permanent"
                      >
                        GitHub
                      </a>
                    </>
                  )}
                  {!isDemo && !isGithub && (
                    <>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600 hover:underline font-bold font-permanent"
                      >
                        {link.label}
                      </a>
                    </>
                  )}
                </p>
              );
            })}
          </div>

          {/* Tech Badges as rounded pills */}
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-0.5 bg-stone-100 text-stone-700 rounded-full text-xs font-bold font-kalam border border-stone-200/60 shadow-sm transition-all hover:bg-stone-200/50 dark:bg-stone-700 dark:text-stone-200 dark:border-stone-600 dark:hover:bg-stone-600"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const { t } = useLanguage();

  const projectList = [
    // {
    //   title: "ATM Energy",
    //   image: "/atm-energy.png",
    //   description: t.atmEnergyDesc,
    //   tags: ["Flutter", "Dart", "QR Code", "PDF"],
    //   accentColor: "bg-amber-400",
    //   links: [
    //     { label: "Google Play", url: "https://play.google.com/store/apps/details?id=net.atmenergy.app&pcampaignid=web_share" }
    //   ]
    // },
    // {
    //   title: "ATM Client",
    //   image: "/atm-client.png",
    //   description: t.atmClientDesc,
    //   tags: ["Flutter", "Dart", "Logistics", "Real-time Tracking"],
    //   accentColor: "bg-sky-400",
    //   links: [
    //     { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.atm.client&pcampaignid=web_share" },
    //     { label: "App Store", url: "https://apps.apple.com/us/app/atm-client/id6808215887?l=fr-FR" }
    //   ]
    // },
    // {
    //   title: "ATM Chauffeur",
    //   image: "/atm-chauffeur.png",
    //   description: t.atmDriverDesc,
    //   tags: ["Flutter", "Dart", "Maps", "Logistics"],
    //   accentColor: "bg-emerald-500",
    //   links: [
    //     { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.atm.driver&pcampaignid=web_share" }
    //   ]
    // },
    {
      title: "JSR-Alternance",
      image: "/jsr.png",
      description: t.jsrAlternanceDesc,
      tags: ["Next.js", "Tailwind CSS", "MongoDB"],
      accentColor: "bg-violet-400",
      links: [
        { label: "Live Demo", url: "https://jsr-alternance.fr/" }
      ]
    },
    {
      title: "Honadi",
      image: "/honadi.png",
      description: t.honadiDesc,
      tags: ["WordPress", "Web Design", "Digital Communication"],
      accentColor: "bg-rose-400",
      links: [
        { label: "Live Demo", url: "https://honadi.com/" }
      ]
    },
    {
      title: "Chat&Yamo",
      image: "/yamo.png",
      description: t.chatYamoDesc,
      tags: ["WordPress", "Web Design"],
      accentColor: "bg-pink-400",
      links: [
        { label: "Live Demo", url: "https://www.chat-yamo.com/" }
      ]
    },
    {
      title: "Centre 3001",
      image: "/centre3.png",
      description: t.centre3001Desc,
      tags: ["WordPress", "Healthcare", "Web Design"],
      accentColor: "bg-teal-400",
      links: [
        { label: "Live Demo", url: "https://centre3001.com/" }
      ]
    },
    {
      title: "Centre 3001 Management App",
      image: "/centre31.png",
      description: t.centre3001AppDesc,
      tags: ["React", "Express", "Tailwind CSS", "MongoDB"],
      accentColor: "bg-indigo-400",
      links: [
        { label: "Live Demo", url: "https://contact-centre3001.vercel.app/" }
      ]
    },
    {
      title: "Stone Hoops",
      image: "/hoop.png",
      description: t.stoneHoopsDesc,
      tags: ["HTML", "CSS"],
      accentColor: "bg-orange-500",
      links: [
        { label: "Live Demo", url: "https://stone-hoops.netlify.app/" }
      ]
    },
    {
      title: "IZICAR Congo",
      image: "/izicar.png",
      description: t.izicarDesc,
      tags: ["WordPress"],
      accentColor: "bg-blue-500",
      links: [
        { label: "Live Demo", url: "https://izicar-congo.com/" }
      ]
    }
  ];

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto py-4">
      <div className="text-center">
        <h2 className="text-3xl font-permanent text-stone-800 rotate-1 dark:text-stone-100">{t.projectsTitle}</h2>
        <p className="text-stone-500 font-kalam mt-1 dark:text-stone-300">{t.projectsSubtitle}</p>
      </div>

      <hr className="border-t-2 border-stone-200 border-dashed my-2 dark:border-stone-700" />

      {/* Projects List (One per row) */}
      <div className="flex flex-col gap-8">
        {projectList.map((project, idx) => (
          <ProjectCard
            key={idx}
            {...project}
            downloadOnLabel={t.downloadOnLabel}
            demoLabel={t.demoLabel}
            codeLabel={t.codeLabel}
          />
        ))}
      </div>
    </div>
  );
}
