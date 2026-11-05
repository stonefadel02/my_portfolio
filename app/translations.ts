export type Locale = "fr" | "en";

export interface ProjectData {
  title: string;
  description: string;
  tags: string[];
  links: { label: string; url: string }[];
  accentColor: string;
  image?: string;
}

export interface SkillItem {
  name: string;
  description: string;
  logoKey: string;
}

export interface SkillCategory {
  title: string;
  bgColor: string;
  skills: SkillItem[];
}

const fr = {
  // Cover & General
  folderTitle: "Stone F. AFEDJOU",
  folderCredits: "Cliquez ou touchez les onglets pour explorer • Décollez les scotchs si vous l'osez !",
  peelBottomTape: "Décoller le scotch du bas",
  peelTopTape: "Décoller le scotch du haut",
  clickToPeel: "Cliquer pour décoller le scotch",
  surpriseLink: "Un lien surprise",
  closePage: "Fermer",
  navAria: "Sections du portfolio",
  themeLight: "Jour",
  themeDark: "Nuit",
  themeToggleAria: "Basculer entre mode jour et nuit",
  
  // Tabs
  tabAbout: "À propos",
  tabSkills: "Compétences",
  tabProjects: "Projets",
  tabContact: "Contact",

  // About Section
  aboutRole: "Développeur Full Stack Web & Mobile",
  aboutBio1: "Bonjour et bienvenue sur mon portfolio ! J'ai conçu cet espace interactif pour vous présenter mes réalisations et mon parcours d'apprentissage.",
  aboutBio2: "Je suis Développeur Full Stack Web et Mobile, titulaire d'un certificat professionnel de l'Université Epitech Benin. Je développe des applications web robustes et performantes avec JavaScript, TypeScript, React, Node.js, Express, PostgreSQL, FastAPI et Next.js, et je conçois des applications mobile avec flutter.",
  aboutBio3: "J'approfondis actuellement mon expertise dans la gestion de projets et le marketing digital. La prochaine étape de mon parcours est axée sur l'architecture cloud et les systèmes cloud hautement scalables.",
  aboutBio4: "N'hésitez pas à parcourir mes compétences et projets, ou à m'écrire via l'onglet contact !",
  viewCv: "Voir le CV",
  location: "Benin, Cotonou",

  // Skills Section
  skillsTitle: "Compétences & Formation",
  skillsSubtitle: "Mes stacks techniques et parcours d'apprentissage",
  techStackHeading: "Stack Technique",
  filterAll: "Tous",
  filterFrontend: "Frontend",
  filterBackend: "Backend",
  filterMobile: "Mobile",
  filterAiCloud: "IA & Cloud",

  frontendTitle: "Développement Frontend",
  backendTitle: "Développement Backend",
  mobileTitle: "Développement Mobile",
  aiCloudTitle: "Outils IA & Cloud",

  // Skills descriptions
  descReact: "Interfaces utilisateur modulaires par composants.",
  descNextjs: "Applications web React optimisées pour la production.",
  descAngular: "Applications front-end structurées et robustes.",
  descTypescript: "Développement JavaScript sécurisé et typé.",
  descTailwind: "Styling responsive utilitaire et moderne.",
  descJavascript: "Expériences web riches et interactives.",
  descHtmlCss: "Balisage sémantique et mise en forme graphique.",

  descNodejs: "Environnement d'exécution JavaScript côté serveur.",
  descExpress: "Framework web minimaliste et rapide pour Node.js.",
  descPostgresql: "Système de gestion de base de données relationnelle.",
  descMongodb: "Base de données orientée documents flexible.",
  descFastapi: "APIs Python ultra-performantes et modernes.",
  descPython: "Langage polyvalent pour le développement et l'IA.",
  descRestApis: "Services fiables et connectés pour le web.",

  descReactNative: "Applications mobiles natives multiplateformes.",
  descExpo: "Outils de développement accéléré pour React Native.",
  descMobileUi: "Mises en page fluides et ergonomiques sur mobile.",

  descAgenticAi: "Workflows autonomes pilotés par agents intelligents.",
  descGenAi: "Systèmes d'IA générateurs de texte, code et contenu.",
  descLlms: "Applications basées sur les modèles de langage (LLMs).",
  descDocker: "Conteneurisation et déploiement applicatif.",
  descGit: "Gestion de versions et collaboration de code.",
  descLinuxShell: "Workflows de développement en ligne de commande.",
  descPostman: "Test, documentation et monitoring d'APIs.",
  descBash: "Scripting en ligne de commande et gestion serveur.",

  // Education
  educationHeading: "Formation & Certifications",
  edu1Date: "2020-2023",
  edu1Title: "Génie Électrique : Système Informatique et Logiciels (SIL)",
  edu1Sub: "UATM Gasa-Formation (Cotonou, Gbegamey)",
  edu1Desc: "Formation approfondie en programmation, bases de données, architecture logicielle et conception d'algorithmes.",
  edu2Date: "Certification",
  edu2Title: "Certification Microsoft AI-103",
  edu2Desc: "Certification Microsoft axée sur les compétences appliquées en intelligence artificielle.",
  edu3Date: "2025 - Présent",
  edu3Title: "Spécialisation IA Générative & Agentique",
  edu3Sub: "Apprentissage autodidacte & Recherche",
  edu3Desc: "Immersion approfondie dans les LLMs, architectures d'agents, bases vectorielles et orchestrateurs modernes.",
  codingAcademyDate: "2024 - 2025",
  codingAcademyTitle: "Coding Academy by Epitech Bénin",
  codingAcademyDesc: "Bootcamp intensif de développement web axé sur la pratique par projets et le travail en équipe.",
  baccalaureateDate: "2017 - 2020",
  baccalaureateTitle: "Baccalauréat - Série D",
  baccalaureateSub: "Jean Piaget I, Calavi Tanpke",
  certificationsTitle: "Certifications",
  certification1: "Concevoir et mettre en place un dispositif de suivi et évaluation",
  certificationDesc1: "Suivre les résultats d’un projet et mesurer son impact.",
  certification2: "S’assurer de la faisabilité de son projet de développement",
  certificationDesc2: "Évaluer les ressources, les risques et la viabilité d’un projet.",
  certification3: "Certificat d'anglais EF SET",
  certificationDesc3: "Évaluer son niveau d’anglais selon le Cadre européen commun de référence.",
  certification4: "Certificat Passer d’une idée à un projet de développement",
  certificationDesc4: "Structurer une idée et la transformer en projet réalisable.",

  // Next note
  nextNoteTag: "Ce que je prépare ensuite",
  nextNoteTitle: "Produits IA propulsés par le Cloud",
  nextNoteDesc: "Évolution du développement full-stack vers l'architecture cloud scalable, les pipelines de déploiement et les systèmes d'agents autonomes.",
  nextNoteBadge1: "Apprendre",
  nextNoteBadge2: "en public",

  // Projects Section
  projectsTitle: "Projets & Créations",
  projectsSubtitle: "Voici quelques projets marquants sur lesquels j’ai eu à travailler ou que j’ai réalisés",
  demoLabel: "Tester la démo en direct :",
  codeLabel: "Consulter le code source :",
  downloadOnLabel: "Télécharger sur :",

  occyDesc: "Contribution au développement d'Occy, un système complet de suivi des candidats (ATS) optimisant le processus de recrutement pour les entreprises. Intervention sur les modules Admin, Recruteur et Candidat pour concevoir et faire évoluer la gestion des offres, le suivi des candidatures, la planification des entretiens et les tableaux de bord. Développement d'interfaces réactives, intégration d'APIs REST, optimisation des performances backend et résolution de bugs en production.",
  sparkleDesc: "Sparkle est une plateforme de réservation de ménage à domicile à la demande avec espaces clients et administration séparés. Développée avec React, TypeScript, Tailwind CSS et Node.js. Les clients peuvent réserver en ligne et payer via Stripe ; les administrateurs pilotent les réservations, le personnel et la plateforme depuis un tableau de bord dédié avec mises à jour en direct via Socket.io.",
  thinkComparedDesc: "ThinkCompared est une application web de comparaison de produits électroniques en direct. Elle permet aux utilisateurs d'analyser et comparer les caractéristiques techniques, les tarifs et les fonctionnalités d'ordinateurs, smartphones, moniteurs et gadgets high-tech pour prendre des décisions d'achat éclairées.",
  clinicalRagDesc: "Un assistant de génération augmentée de récupération (RAG) dédié au secteur hospitalier. Il exploite FastAPI, Groq, ChromaDB et LangChain pour analyser et synthétiser des guides cliniques complexes, offrant aux professionnels de santé des réponses rapides, fiables et contextualisées.",
  atmEnergyDesc: "Application Flutter qui simplifie la gestion des tickets carburant : commande et transfert de tickets, suivi des consommations et des livraisons, avec validation par QR code.",
  atmClientDesc: "Application Flutter permettant aux particuliers et aux entreprises de demander des livraisons avec ATM Logistics et de suivre leurs colis en temps réel.",
  atmDriverDesc: "Application Flutter pour les chauffeurs partenaires : réception des missions, suivi des itinéraires et gestion des livraisons.",
  jsrAlternanceDesc: "Plateforme qui met en relation candidats, entreprises et organismes de formation pour des contrats en alternance et des stages en France.",
  honadiDesc: "Site WordPress pour Honadi, agence béninoise de création web et de communication digitale accompagnant entreprises et entrepreneurs dans leur croissance en ligne.",
  chatYamoDesc: "Réalisation de quelques taches sur le site vitrine WordPress de Chat&Yamo, présentant son application de rencontre, ses fonctionnalités et son univers.",
  centre3001Desc: "Site WordPress présentant le Centre 3001, réseau québécois de cliniques spécialisé en laserothérapie douce et en accompagnement du bien-être.",
  centre3001AppDesc: "Application web de gestion destinée au Centre 3001, développée avec React, Express, Tailwind CSS et MongoDB.",
  stoneHoopsDesc: "Site réalisé uniquement en HTML et CSS pour suivre les scores, les classements et les actualités d’une ligue de basketball.",
  izicarDesc: "Site WordPress pour IZICAR Congo, service de location de véhicules avec chauffeur proposant une gamme de voitures et des options pour des trajets confortables et sécurisés.",

  // Contact Section
  contactTitle: "Me Contacter",
  contactSubtitle: "Construisons un projet formidable ensemble !",
  viaSocials: "Via mes réseaux",
  orViaForm: "Ou directement via ce formulaire",
  emailLabel: "Adresse Email",
  emailPlaceholder: "votre.email@exemple.com",
  messageLabel: "Votre Message",
  messagePlaceholder: "Bonjour Stone, j'aimerais échanger au sujet de...",
  sendButton: "Envoyer le message",
  sendingButton: "Envoi en cours...",
  successMessage: "Message envoyé ! Je vous répondrai très prochainement.",
  errorMessage: "Une erreur est survenue. Veuillez réessayer.",
};

const en: typeof fr = {
  // Cover & General
  folderTitle: "Stone F. AFEDJOU",
  folderCredits: "Click or tap on tabs to explore • Peel the tapes if you dare!",
  peelBottomTape: "Peel bottom tape",
  peelTopTape: "Peel top tape",
  clickToPeel: "Click to peel tape",
  surpriseLink: "A surprise link",
  closePage: "Close",
  navAria: "Portfolio sections",
  themeLight: "Day",
  themeDark: "Night",
  themeToggleAria: "Toggle day and night mode",

  // Tabs
  tabAbout: "About",
  tabSkills: "Skills",
  tabProjects: "Projects",
  tabContact: "Contact",

  // About Section
  aboutRole: "Full Stack AI Developer & Cloud Enthusiast",
  aboutBio1: "Hello there and welcome to my notebook! I built this interactive space to showcase my work and learning path.",
  aboutBio2: "I am a Full Stack AI Developer with a Software Engineering degree from COMSATS University. I build robust, performant web applications using JavaScript, TypeScript, React, Node.js, Express, PostgreSQL, FastAPI, and Next.js, and create intelligent solutions with Generative AI and Agentic AI.",
  aboutBio3: "I am deepening my expertise in engineering workflows with autonomous agents and LLMs. Next on my learning path is cloud architecture and scalable cloud systems.",
  aboutBio4: "Feel free to browse through my skills, projects, or drop me a line in the contact tab!",
  viewCv: "View CV",
  location: "Islamabad, Pakistan",

  // Skills Section
  skillsTitle: "Skills & Education",
  skillsSubtitle: "My tech stacks and learning path",
  techStackHeading: "Tech Stack",
  filterAll: "All",
  filterFrontend: "Frontend",
  filterBackend: "Backend",
  filterMobile: "Mobile",
  filterAiCloud: "AI & Cloud",

  frontendTitle: "Frontend Dev",
  backendTitle: "Backend Dev",
  mobileTitle: "Mobile Dev",
  aiCloudTitle: "AI & Cloud Tools",

  // Skills descriptions
  descReact: "Component-based user interfaces.",
  descNextjs: "Production-ready React web applications.",
  descAngular: "Structured front-end web applications.",
  descTypescript: "Type-safe JavaScript development.",
  descTailwind: "Utility-first responsive styling.",
  descJavascript: "Interactive web experiences.",
  descHtmlCss: "Semantic markup and visual styling.",

  descNodejs: "JavaScript runtime for back-end services.",
  descExpress: "Minimal Node.js web framework.",
  descPostgresql: "Relational database management.",
  descMongodb: "Flexible document database.",
  descFastapi: "High-performance Python APIs.",
  descPython: "Versatile programming and AI language.",
  descRestApis: "Reliable services for connected applications.",

  descReactNative: "Cross-platform mobile applications.",
  descExpo: "Fast React Native development tooling.",
  descMobileUi: "Responsive layouts for mobile experiences.",

  descAgenticAi: "Autonomous workflows powered by AI agents.",
  descGenAi: "AI systems that create text and content.",
  descLlms: "Large language model applications.",
  descDocker: "Application containerization and deployment.",
  descGit: "Collaborative version control.",
  descLinuxShell: "Command-line development workflows.",
  descPostman: "API testing, documentation, and monitoring.",
  descBash: "Command-line scripting and server administration.",

  // Education
  educationHeading: "Education",
  edu1Date: "2021 - 2025",
  edu1Title: "BS in Software Engineering",
  edu1Sub: "COMSATS University",
  edu1Desc: "Focus on core programming, databases, software architecture, and algorithm design.",
  edu2Date: "Certificate",
  edu2Title: "Microsoft AI-103 Certificate",
  edu2Desc: "Microsoft AI certification focused on applied artificial intelligence skills.",
  edu3Date: "2025 - Present",
  edu3Title: "Generative & Agentic AI Specialization",
  edu3Sub: "Self-Directed Learning & Research",
  edu3Desc: "Diving deep into LLMs, agent architectures, vector databases, and modern orchestrators.",
  codingAcademyDate: "2024 - 2025",
  codingAcademyTitle: "Coding Academy by Epitech Benin",
  codingAcademyDesc: "Intensive web development bootcamp focused on hands-on projects and teamwork.",
  baccalaureateDate: "2017 - 2020",
  baccalaureateTitle: "Baccalaureate - Science Track (Series D)",
  baccalaureateSub: "Jean Piaget I, Calavi Tanpke",
  certificationsTitle: "Certifications",
  certification1: "Design and implement a monitoring and evaluation framework",
  certificationDesc1: "Track project outcomes and measure their impact.",
  certification2: "Ensure the feasibility of a development project",
  certificationDesc2: "Assess a project's resources, risks, and viability.",
  certification3: "EF SET English Certificate",
  certificationDesc3: "Assess English proficiency using the Common European Framework of Reference.",
  certification4: "Certificate: From an Idea to a Development Project",
  certificationDesc4: "Structure an idea and turn it into a viable project.",

  // Next note
  nextNoteTag: "What I'm building next",
  nextNoteTitle: "Cloud-powered AI products",
  nextNoteDesc: "Expanding from full-stack development into scalable cloud architecture, deployment workflows, and intelligent agent systems.",
  nextNoteBadge1: "Learning",
  nextNoteBadge2: "in public",

  // Projects Section
  projectsTitle: "Projects & Creations",
  projectsSubtitle: "Some interesting things I have built",
  demoLabel: "Try a live demo of this project:",
  codeLabel: "View the source code:",
  downloadOnLabel: "Download on:",

  occyDesc: "Contributed to the development of Occy, a full-featured Applicant Tracking System (ATS) that streamlines the recruitment process for organizations. Worked across the Admin, Recruiter, and Candidate modules to implement and enhance features for job management, candidate applications, hiring workflows, interview scheduling, user management, and dashboard functionality. Developed responsive UI components, integrated REST APIs, optimized backend functionality, resolved production issues, and collaborated with the team to deliver scalable and maintainable solutions for the recruitment platform.",
  sparkleDesc: "Sparkle is an on-demand house cleaning platform with separate customer and admin panels. Built with React, TypeScript, Tailwind CSS, and Node.js. Customers can book cleanings and pay via Stripe; admins manage bookings, staff, and platform data from a dedicated dashboard. Real-time booking updates are handled via Socket.io. Features include authentication, role-based access control, and a fully responsive UI.",
  thinkComparedDesc: "ThinkCompared is a live electronic product comparison web application. It enables users to search and compare detailed specifications, pricing, and features of electronic products such as mobile phones, laptops, desktops, monitors, and other gadgets, helping them make informed purchase decisions.",
  clinicalRagDesc: "A retrieval-augmented generation (RAG) assistant for healthcare systems. It utilizes FastAPI, Groq, ChromaDB, and LangChain to extract and synthesize guidelines from hospital clinical documents, providing doctors and clinical staff with fast, context-aware information.",
  atmEnergyDesc: "A Flutter app that streamlines fuel voucher management, including voucher ordering and transfers, consumption and delivery tracking, and QR code validation.",
  atmClientDesc: "A Flutter app for individuals and businesses to request deliveries from ATM Logistics and track their parcels in real time.",
  atmDriverDesc: "A Flutter app for partner drivers to receive assignments, follow routes, and manage deliveries.",
  jsrAlternanceDesc: "A platform connecting candidates, companies, and training organizations for work-study contracts and internships in France.",
  honadiDesc: "A WordPress website for Honadi, a Beninese web development and digital communications agency helping businesses and entrepreneurs grow online.",
  chatYamoDesc: "Built the WordPress showcase website for Chat&Yamo, presenting its dating app, features, and brand.",
  centre3001Desc: "A WordPress website for Centre 3001, a Quebec clinic network specializing in low-level laser therapy and wellness support.",
  centre3001AppDesc: "A web-based management application for Centre 3001, built with React, Express, Tailwind CSS, and MongoDB.",
  stoneHoopsDesc: "A website built entirely with HTML and CSS to showcase basketball league scores, standings, and news.",
  izicarDesc: "A WordPress website for IZICAR Congo, a chauffeur-driven car rental service offering a range of vehicles and options for comfortable, safe journeys.",

  // Contact Section
  contactTitle: "Contact Me",
  contactSubtitle: "Let's build something awesome together!",
  viaSocials: "Via my socials",
  orViaForm: "Or directly via this form",
  emailLabel: "Email Address",
  emailPlaceholder: "your.email@example.com",
  messageLabel: "Your Message",
  messagePlaceholder: "Hi Stone, I'd love to talk about...",
  sendButton: "Send Message",
  sendingButton: "Sending...",
  successMessage: "Message sent! I'll get back to you soon.",
  errorMessage: "Something went wrong. Please try again.",
};

export type TranslationSchema = typeof fr;

export const translations: Record<Locale, TranslationSchema> = {
  fr,
  en,
};
