import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { CONTACT } from "../config/contact";

export const DiagnosticReceived = () => {
  const location = useLocation();
  const submission = location.state?.submission || {};

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-20 lg:px-20 lg:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-center text-primary"
        >
          <div className="rounded-full bg-primary/5 p-6">
            <CheckCircle2 size={48} strokeWidth={1.5} />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 text-4xl font-black tracking-tight text-primary md:text-5xl lg:text-6xl"
        >
          Your Strata Diagnostic Has Been Received
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 text-lg leading-relaxed text-primary/60 md:text-xl"
        >
          Thanks — your request has been received. The Strata team will review your details and contact you via email or WhatsApp.
        </motion.p>

        {/* Submission Summary */}
        {location.state?.submission && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12 rounded-[32px] border border-primary/5 bg-[#fcfbf9] p-8 text-left lg:p-12"
          >
            <h3 className="mb-8 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-primary/40">
              Submission Summary
            </h3>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {[
                { label: "Name", value: submission.name },
                { label: "Company", value: submission.company },
                { label: "Requirement", value: submission.requirement },
                { label: "Budget", value: submission.budget },
                { label: "Timeline", value: submission.timeline },
                { label: "Call Time", value: `${submission.preferredDate} at ${submission.preferredTime} (${submission.timezone})` },
              ].map((item) => (
                <div key={item.label} className="space-y-1">
                  <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-primary/30">
                    {item.label}
                  </span>
                  <p className="text-sm font-bold uppercase tracking-tight text-primary">
                    {item.value || "Not provided"}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link to={CONTACT.requestDemoPath} className="group relative flex h-14 items-center justify-center overflow-hidden rounded-full bg-primary px-8 text-sm font-bold uppercase tracking-widest text-white transition-transform active:scale-95">
            <span className="relative z-10 flex items-center gap-2">
              Add More Project Details
              <ArrowUpRight size={16} />
            </span>
          </Link>
          <Link to="/#selected-work" className="group relative flex h-14 items-center justify-center overflow-hidden rounded-full border border-primary/10 bg-white px-8 text-sm font-bold uppercase tracking-widest text-primary transition-all hover:bg-primary/5 active:scale-95">
            <span className="relative z-10 flex items-center gap-2">
              <ArrowLeft size={16} />
              View Selected Work
            </span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};
