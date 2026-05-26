import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeUp, slideLeft, slideRight, VP } from "../utils/motion.js";
import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const SOCIALS = [
  {
    key: "github",
    label: "GitHub",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    ),
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    key: "leetcode",
    label: "LeetCode",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
      </svg>
    ),
  },
  {
    key: "codechef",
    label: "CodeChef",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.257.004C5.227.264.179 5.01.007 11.039c-.174 6.156 4.592 11.301 10.632 11.617.306.016.61.024.913.024 5.998 0 10.992-4.718 11.434-10.77.457-6.24-4.2-11.638-10.351-11.897a12.362 12.362 0 0 0-.378-.009zm.161 2.396c.119-.001.236 0 .355.005 5.06.218 8.972 4.468 8.757 9.53-.216 5.059-4.467 8.974-9.529 8.755-5.062-.218-8.975-4.467-8.757-9.529.207-4.887 4.134-8.69 9.04-8.755a9.77 9.77 0 0 1 .134-.006zm3.407 5.082l-1.044 1.044c.601.597.976 1.42.976 2.33 0 1.83-1.482 3.312-3.312 3.312-1.83 0-3.312-1.482-3.312-3.312 0-.91.375-1.733.976-2.33L8.065 7.482A5.5 5.5 0 0 0 6.5 11.5a5.5 5.5 0 0 0 11 0 5.5 5.5 0 0 0-1.565-3.818z" />
      </svg>
    ),
  },
];

export default function Contact({ data }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const blobY = useTransform(scrollYProgress, [0, 1], ["-22%", "22%"]);

  const formRef = useRef(null);

  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errors, setErrors] = useState({});

  const validate = (fd) => {
    const e = {};
    if (!fd.from_name?.trim()) e.from_name = "Name is required";
    if (!fd.reply_to?.trim()) e.reply_to = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(fd.reply_to))
      e.reply_to = "Enter a valid email";
    if (!fd.subject?.trim()) e.subject = "Subject is required";
    if (!fd.message?.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = Object.fromEntries(new FormData(formRef.current));
    const errs = validate(fd);
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("sending");

    if (!SERVICE_ID || SERVICE_ID === "YOUR_SERVICE_ID") {
      /* Fall back to mailto when EmailJS keys not configured */
      window.location.href = `mailto:${data?.email}?subject=${encodeURIComponent(fd.subject)}&body=${encodeURIComponent(`From: ${fd.from_name} <${fd.reply_to}>\n\n${fd.message}`)}`;
      setStatus("idle");
      return;
    }

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: fd.from_name,
          reply_to: fd.reply_to,
          subject: fd.subject,
          message: fd.message,
        },
        PUBLIC_KEY,
      );
      setStatus("success");
      formRef.current.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding relative overflow-hidden"
    >
      <motion.div
        style={{ y: blobY }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        <div
          className="absolute top-[-5%] left-[10%] w-96 h-96 rounded-full blur-[130px]"
          style={{ background: "rgba(37,99,235,0.05)" }}
        />
        <div
          className="absolute bottom-[-5%] right-[5%] w-80 h-80 rounded-full blur-[120px]"
          style={{ background: "rgba(20,184,166,0.05)" }}
        />
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          className="mb-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={VP}
        >
          <p
            className="text-xs font-semibold tracking-[0.2em] t3 mb-3 uppercase"
            style={{ fontFamily: "JetBrains Mono, monospace" }}
          >
            Get In Touch
          </p>
          <h2 className="text-4xl md:text-5xl font-bold t1 leading-tight">
            Let's Build Something{" "}
            <span className="gradient-text">Together</span>
          </h2>
          <p className="t2 mt-4 max-w-lg text-base leading-relaxed">
            Have a project in mind? I'm available for freelance work and always
            happy to discuss new ideas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
          {/* Left: Info + socials */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
            className="space-y-4"
          >
            {/* Contact info */}
            {[
              {
                label: "Email",
                value: data?.email,
                href: `mailto:${data?.email}`,
                icon: (
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                ),
              },
              {
                label: "Location",
                value: data?.location,
                href: null,
                icon: (
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                ),
              },
            ].map(({ label, value, href, icon }) => (
              <div
                key={label}
                className="flex items-center gap-4 p-4 rounded-xl"
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "rgba(37,99,235,0.12)",
                    color: "#2563eb",
                  }}
                >
                  {icon}
                </div>
                <div>
                  <p className="text-xs t3 mb-0.5">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      className="text-sm t1 font-medium hover:text-accent-indigo transition-colors"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm t1 font-medium">{value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Social links */}
            <div
              className="p-5 rounded-xl"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              <p className="text-xs t3 mb-3 font-medium">Find me on</p>
              <div className="grid grid-cols-2 gap-2">
                {SOCIALS.map(({ key, label, icon }) => (
                  <motion.a
                    key={key}
                    href={data?.social?.[key] || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: "spring", stiffness: 340, damping: 20 }}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium t2 transition-colors"
                    style={{ border: "1px solid var(--border)" }}
                  >
                    <span className="t3">{icon}</span>
                    {label}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={VP}
          >
            <div
              className="rounded-2xl p-7"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
            >
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-12 gap-4"
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{
                      background: "rgba(34,197,94,0.12)",
                      color: "#22c55e",
                    }}
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold t1 mb-1">Message Sent!</h3>
                    <p className="text-sm t3">
                      I'll get back to you as soon as possible.
                    </p>
                  </div>
                  <button
                    onClick={() => setStatus("idle")}
                    className="text-xs text-accent-indigo font-medium hover:underline mt-2"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  noValidate
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-3">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-medium t2 mb-1.5">
                        Name
                      </label>
                      <input
                        name="from_name"
                        type="text"
                        placeholder="Your name"
                        className="contact-input"
                        style={
                          errors.from_name ? { borderColor: "#ef4444" } : {}
                        }
                      />
                      {errors.from_name && (
                        <p
                          className="text-xs mt-1"
                          style={{ color: "#ef4444" }}
                        >
                          {errors.from_name}
                        </p>
                      )}
                    </div>
                    {/* Email */}
                    <div>
                      <label className="block text-xs font-medium t2 mb-1.5">
                        Email
                      </label>
                      <input
                        name="reply_to"
                        type="email"
                        placeholder="you@example.com"
                        className="contact-input"
                        style={
                          errors.reply_to ? { borderColor: "#ef4444" } : {}
                        }
                      />
                      {errors.reply_to && (
                        <p
                          className="text-xs mt-1"
                          style={{ color: "#ef4444" }}
                        >
                          {errors.reply_to}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-medium t2 mb-1.5">
                      Subject
                    </label>
                    <input
                      name="subject"
                      type="text"
                      placeholder="What's this about?"
                      className="contact-input"
                      style={errors.subject ? { borderColor: "#ef4444" } : {}}
                    />
                    {errors.subject && (
                      <p className="text-xs mt-1" style={{ color: "#ef4444" }}>
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-medium t2 mb-1.5">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder="Tell me about your project..."
                      className="contact-input"
                      style={errors.message ? { borderColor: "#ef4444" } : {}}
                    />
                    {errors.message && (
                      <p className="text-xs mt-1" style={{ color: "#ef4444" }}>
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Error banner */}
                  {status === "error" && (
                    <p
                      className="text-xs px-3 py-2 rounded-lg"
                      style={{
                        background: "rgba(239,68,68,0.1)",
                        color: "#ef4444",
                      }}
                    >
                      Something went wrong. Please email me directly at{" "}
                      {data?.email}
                    </p>
                  )}

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={status === "sending"}
                    whileHover={
                      status !== "sending" ? { scale: 1.02, y: -1 } : {}
                    }
                    whileTap={status !== "sending" ? { scale: 0.98 } : {}}
                    className="w-full py-3.5 rounded-xl font-semibold text-sm text-white flex items-center justify-center gap-2 transition-opacity"
                    style={{
                      background: "linear-gradient(135deg, #2563eb, #0891b2)",
                      boxShadow: "0 0 24px rgba(37,99,235,0.3)",
                      opacity: status === "sending" ? 0.7 : 1,
                      cursor: status === "sending" ? "not-allowed" : "pointer",
                    }}
                  >
                    {status === "sending" ? (
                      <>
                        <svg
                          className="animate-spin"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeDasharray="32"
                            strokeDashoffset="8"
                            strokeLinecap="round"
                          />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
