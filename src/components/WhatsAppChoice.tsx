import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { CONTACT } from "../config/contact";

type WhatsAppChoiceProps = {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
};

const contacts = [CONTACT.whatsapp.nick, CONTACT.whatsapp.khairul] as const;

export const WhatsAppChoice = ({
  children,
  className,
  ariaLabel = "Choose a WhatsApp contact",
}: WhatsAppChoiceProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
    window.setTimeout(() => triggerRef.current?.focus(), 0);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const focusTimer = window.setTimeout(() => firstLinkRef.current?.focus(), 0);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDialog();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeDialog, isOpen]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls="whatsapp-choice-dialog"
        aria-label={ariaLabel}
        onClick={() => setIsOpen(true)}
        className={className}
      >
        {children}
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[90] flex items-end justify-center p-4 sm:items-center">
            <motion.button
              type="button"
              aria-label="Close WhatsApp contact chooser"
              className="absolute inset-0 cursor-default bg-black/55 backdrop-blur-sm"
              onClick={closeDialog}
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
            />

            <motion.div
              ref={dialogRef}
              id="whatsapp-choice-dialog"
              role="dialog"
              aria-modal="true"
              aria-labelledby="whatsapp-choice-title"
              aria-describedby="whatsapp-choice-description"
              className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-white/10 bg-[#050505] p-6 text-white shadow-2xl"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-white/20" />
              <div className="mb-6 flex items-start justify-between gap-6">
                <div>
                  <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/35">
                    WhatsApp
                  </p>
                  <h2 id="whatsapp-choice-title" className="text-2xl font-black uppercase tracking-tight text-white">
                    Choose contact
                  </h2>
                  <p id="whatsapp-choice-description" className="mt-3 text-sm leading-relaxed text-white/50">
                    Select the Strata team member you want to message.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeDialog}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60"
                  aria-label="Close WhatsApp contact chooser"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-3">
                {contacts.map((contact, index) => (
                  <a
                    key={contact.name}
                    ref={index === 0 ? firstLinkRef : undefined}
                    href={contact.url}
                    target="_blank"
                    rel="noreferrer"
                    onClick={closeDialog}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 transition-colors hover:bg-white hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/60"
                  >
                    <span>
                      <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-current">
                        WhatsApp {contact.name}
                      </span>
                      <span className="mt-1 block text-xs text-white/45 transition-colors group-hover:text-black/50">
                        {contact.phoneDisplay}
                      </span>
                    </span>
                    <span className="h-2 w-2 rounded-full bg-current opacity-40" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
