import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { CONTACT } from "../config/contact";
import { trackWhatsAppContact } from "../lib/analytics";

type WhatsAppChoiceProps = {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  /** Labels which CTA drove the contact, so packages are comparable in Ads Manager. */
  source?: string;
};

const contacts = [CONTACT.whatsapp.nick, CONTACT.whatsapp.khairul] as const;

export const WhatsAppChoice = ({
  children,
  className,
  ariaLabel,
  source = "unspecified",
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
              className="absolute inset-0 cursor-default bg-void/80 backdrop-blur-sm"
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
              className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-gold/30 bg-surface2 p-6 text-text shadow-2xl shadow-gold/5"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gold/40" />
              <div className="mb-6 flex items-start justify-between gap-6">
                <div>
                  <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
                    WhatsApp
                  </p>
                  <h2 id="whatsapp-choice-title" className="text-2xl font-black uppercase tracking-tight text-text">
                    Choose contact
                  </h2>
                  <p id="whatsapp-choice-description" className="mt-3 text-sm leading-relaxed text-muted">
                    Select the Strata team member you want to message.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={closeDialog}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-muted transition-colors hover:bg-surface3 hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
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
                    onClick={() => {
                      trackWhatsAppContact(`${source} / ${contact.name}`);
                      closeDialog();
                    }}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-surface px-5 py-4 transition-colors hover:border-gold/40 hover:bg-surface3 hover:text-text focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-focus"
                  >
                    <span>
                      <span className="block font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-current">
                        WhatsApp {contact.name}
                      </span>
                      <span className="mt-1 block text-xs text-muted transition-colors group-hover:text-text/50">
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
