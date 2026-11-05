"use client";

import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();
  const [formState, setFormState] = useState({ email: "", message: "", botcheck: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setFeedback("");

    // Web3Forms access keys are public by design (alias to your email).
    // Env override is supported; fallback keeps Vercel working if env is missing.
    const accessKey =
      process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
      "a4754d6b-8975-4dae-9e6c-81c83b72dc3e";

    if (formState.botcheck) {
      setStatus("success");
      setFeedback(t.successMessage);
      setFormState({ email: "", message: "", botcheck: "" });
      return;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: "New message from portfolio contact form",
          from_name: "Portfolio Contact",
          email: formState.email.trim(),
          message: formState.message.trim(),
          replyto: formState.email.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          (typeof result.message === "string" && result.message) ||
            t.errorMessage
        );
      }

      setStatus("success");
      setFeedback(t.successMessage);
      setFormState({ email: "", message: "", botcheck: "" });
    } catch (err) {
      setStatus("error");
      setFeedback(
        err instanceof Error ? err.message : t.errorMessage
      );
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-3xl mx-auto py-4">
      <div className="text-center">
        <h2 className="text-3xl font-permanent text-stone-800 rotate-1 dark:text-stone-100">{t.contactTitle}</h2>
        <p className="text-stone-500 font-kalam mt-1 dark:text-stone-300">{t.contactSubtitle}</p>
      </div>

      <hr className="border-t-2 border-stone-200 border-dashed my-2 dark:border-stone-700" />

      {/* Social Links */}
      <div className="w-full">
        <h3 className="text-xl font-permanent text-stone-700 text-center mb-4 dark:text-stone-100">{t.viaSocials}</h3>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          <a
            href="http://www.linkedin.com/in/stone-afedjou"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center w-24 sm:w-28 bg-white border-2 border-stone-200 rounded-xl p-3 sm:p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group dark:bg-stone-800 dark:border-stone-700"
          >
            <span className="text-neutral-700 font-bold font-kalam text-sm sm:text-base mb-1.5 sm:mb-2 group-hover:text-blue-500 transition-colors dark:text-stone-200">LinkedIn</span>
            <svg className="w-7 h-7 sm:w-8 sm:h-8 text-stone-400 group-hover:text-blue-500 transition-colors dark:text-stone-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
            </svg>
          </a>

          <a
            href="https://github.com/stonefadel02"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center w-24 sm:w-28 bg-white border-2 border-stone-200 rounded-xl p-3 sm:p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group dark:bg-stone-800 dark:border-stone-700"
          >
            <span className="text-neutral-700 font-bold font-kalam text-sm sm:text-base mb-1.5 sm:mb-2 group-hover:text-emerald-500 transition-colors dark:text-stone-200">GitHub</span>
            <svg className="w-7 h-7 sm:w-8 sm:h-8 text-stone-400 group-hover:text-emerald-500 transition-colors dark:text-stone-400" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/>
            </svg>
          </a>

          <a
            href="mailto:afedjoustone@gmail.com"
            className="flex flex-col items-center justify-center w-24 sm:w-28 bg-white border-2 border-stone-200 rounded-xl p-3 sm:p-4 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group dark:bg-stone-800 dark:border-stone-700"
          >
            <span className="text-neutral-700 font-bold font-kalam text-sm sm:text-base mb-1.5 sm:mb-2 group-hover:text-red-500 transition-colors dark:text-stone-200">Mail</span>
            <svg className="w-7 h-7 sm:w-8 sm:h-8 text-stone-400 group-hover:text-red-500 transition-colors dark:text-stone-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
          </a>
        </div>
      </div>

      <hr className="border-t-2 border-stone-200 border-dashed my-2 dark:border-stone-700" />

      {/* Contact Form */}
      <div className="w-full md:w-4/5 mx-auto bg-stone-50 border-2 border-stone-200 rounded-2xl p-4 sm:p-6 shadow-sm dark:bg-stone-800 dark:border-stone-700">
        <h3 className="text-lg sm:text-xl font-permanent text-stone-700 text-center mb-4 dark:text-stone-100">{t.orViaForm}</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Honeypot — hidden from users */}
          <input
            type="text"
            name="botcheck"
            value={formState.botcheck}
            onChange={(e) => setFormState({ ...formState, botcheck: e.target.value })}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="font-kalam font-bold text-stone-700 text-sm sm:text-base dark:text-stone-200">{t.emailLabel}</label>
            <input
              id="email"
              type="email"
              required
              placeholder={t.emailPlaceholder}
              value={formState.email}
              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              className="px-3 py-2 border-2 border-stone-200 rounded-lg bg-white focus:outline-none focus:border-stone-400 transition-colors font-kalam text-base dark:border-stone-600 dark:bg-stone-900 dark:text-stone-100 dark:placeholder:text-stone-500"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="font-kalam font-bold text-stone-700 text-sm sm:text-base dark:text-stone-200">{t.messageLabel}</label>
            <textarea
              id="message"
              required
              rows={4}
              placeholder={t.messagePlaceholder}
              value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              className="px-3 py-2 border-2 border-stone-200 rounded-lg bg-white focus:outline-none focus:border-stone-400 transition-colors font-kalam resize-none text-base dark:border-stone-600 dark:bg-stone-900 dark:text-stone-100 dark:placeholder:text-stone-500"
            />
          </div>

          {feedback && (
            <p
              role="status"
              className={`font-kalam text-sm text-center rounded-lg px-3 py-2 border ${
                status === "success"
                  ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                  : "bg-red-50 border-red-200 text-red-700"
              }`}
            >
              {feedback}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full py-2 bg-stone-700 hover:bg-stone-800 text-white rounded-lg font-permanent text-lg transition-colors cursor-pointer disabled:bg-stone-300 disabled:cursor-not-allowed"
          >
            {status === "sending" ? t.sendingButton : t.sendButton}
          </button>
        </form>
      </div>
    </div>
  );
}
