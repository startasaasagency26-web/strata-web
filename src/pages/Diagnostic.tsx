import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  HelpCircle,
  Plus,
  Minus
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { CONTACT } from "../config/contact";
import { cn } from "../lib/utils";
import type { LeadApiResponse, LeadFieldErrors } from "../lib/crm/types";
import { supabase } from "../lib/supabase";

const clientEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-primary/10 py-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left focus:outline-none"
      >
        <h4 className="text-base font-bold uppercase tracking-tight text-primary md:text-lg">
          {question}
        </h4>
        <div className="ml-4 h-6 w-6 shrink-0 text-primary/40">
          {isOpen ? <Minus size={20} /> : <Plus size={20} />}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="mt-4 text-sm leading-relaxed text-primary/60 md:text-base">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const Diagnostic = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 7;
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = description?.content;
    const activeDescription = description ?? document.createElement("meta");

    if (!description) {
      activeDescription.name = "description";
      document.head.appendChild(activeDescription);
    }

    document.title = "Request a Strata Diagnostic | Website & Digital System Strategy";
    activeDescription.content = "Tell Strata what is broken in your website, customer journey, or workflow. Request a diagnostic call to define the right digital build direction.";

    return () => {
      document.title = previousTitle;

      if (previousDescription !== undefined) {
        activeDescription.content = previousDescription;
      } else {
        activeDescription.remove();
      }
    };
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    whatsapp: "", // full normalized: +60...
    whatsappLocal: "", // raw input
    role: "",
    location: "Malaysia",
    timezone: "Asia/Kuala_Lumpur",
    utcOffset: "GMT+8",
    language: "English",
    businessType: "",
    requirement: "",
    problem: "",
    websiteUrl: "",
    socialLinks: "",
    references: "",
    timeline: "",
    budget: "",
    preferredDate: "",
    preferredTime: "",
    callTimezone: "GMT+8", // specific to call time step
    notes: "",
    consent: false
  });

  const [phoneError, setPhoneError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<LeadFieldErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clearFieldError = (field: keyof LeadFieldErrors) => {
    setSubmitError("");
    setFieldErrors(prev => {
      if (!prev[field]) return prev;

      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handlePhoneChange = (val: string) => {
    clearFieldError("whatsappPhone");
    // Only allow digits
    const cleaned = val.replace(/\D/g, "");
    
    // Auto-remove leading 0
    const formatted = cleaned.startsWith("0") ? cleaned.substring(1) : cleaned;
    
    setFormData(prev => ({
      ...prev,
      whatsappLocal: formatted,
      whatsapp: formatted ? `+60${formatted}` : ""
    }));

    if (formatted && (formatted.length < 8 || formatted.length > 11)) {
      setPhoneError("Enter your Malaysia number without the country code (8-11 digits).");
    } else {
      setPhoneError("");
    }
  };

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1);
    window.scrollTo({ top: formRef.current?.offsetTop ? formRef.current.offsetTop - 100 : 0, behavior: "smooth" });
  };
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
    window.scrollTo({ top: formRef.current?.offsetTop ? formRef.current.offsetTop - 100 : 0, behavior: "smooth" });
  };

  const buildLeadPayload = () => ({
    fullName: formData.name,
    companyName: formData.company,
    workEmail: formData.email,
    whatsappPhone: formData.whatsapp,
    roleInBusiness: formData.role,
    countryTimezone: `${formData.location} / ${formData.utcOffset}`,
    preferredLanguage: formData.language,
    businessType: formData.businessType,
    serviceNeed: formData.requirement,
    websiteUrl: formData.websiteUrl,
    currentProblem: formData.problem,
    budgetRange: formData.budget,
    timeline: formData.timeline,
    sourcePage: CONTACT.requestDemoPath,
    consent: formData.consent,
    rawPayload: {
      ...formData,
      phone_country_code: "+60",
      phone_local_number: formData.whatsappLocal,
      phone_full: formData.whatsapp,
      country: formData.location,
      timezone: formData.timezone,
      utc_offset: formData.utcOffset,
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isStepValid() || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError("");
    setFieldErrors({});

    const leadPayload = buildLeadPayload();

    try {
      // Direct Supabase Ingestion
      const { data, error } = await supabase
        .from('leads')
        .insert({
          full_name: leadPayload.fullName,
          company_name: leadPayload.companyName,
          work_email: leadPayload.workEmail,
          whatsapp_phone: leadPayload.whatsappPhone,
          role_in_business: leadPayload.roleInBusiness,
          country_timezone: leadPayload.countryTimezone,
          preferred_language: leadPayload.preferredLanguage,
          business_type: leadPayload.businessType,
          service_need: leadPayload.serviceNeed,
          website_url: leadPayload.websiteUrl,
          current_problem: leadPayload.currentProblem,
          budget_range: leadPayload.budgetRange,
          timeline: leadPayload.timeline,
          raw_payload: leadPayload.rawPayload
        })
        .select()
        .single();

      if (error) {
        console.error('Supabase Error:', error);
        setSubmitError("We couldn’t submit your request yet. Please try again.");
        return;
      }

      navigate(`${CONTACT.requestDemoPath}/received`, {
        state: {
          submission: {
            ...formData,
            ...leadPayload,
            leadId: data.id,
          },
        },
      });
    } catch (err) {
      console.error('Submission Error:', err);
      setSubmitError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };


  const isStepValid = () => {
    switch(step) {
      case 1: 
        return (
          formData.name && 
          formData.company && 
          clientEmailPattern.test(formData.email.trim()) && 
          formData.whatsappLocal.length >= 8 && 
          formData.whatsappLocal.length <= 11 &&
          formData.role &&
          !phoneError
        );
      case 2: return formData.businessType;
      case 3: return formData.requirement;
      case 4: return formData.problem.length > 10;
      case 6: return formData.timeline && formData.budget;
      case 7: return formData.consent && formData.preferredDate;
      default: return true;
    }
  };

  return (
    <div className="flex flex-col">
      {/* SECTION 1 — HERO */}
      <section className="relative px-6 py-20 lg:px-20 lg:py-32">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="mb-4 block font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-primary/40">
              STRATA DIAGNOSTIC
            </span>
            <h1 className="mb-8 text-5xl font-black leading-[1.1] tracking-tight text-primary md:text-7xl lg:text-8xl">
              Build a Digital Foundation That Actually Supports Your Business
            </h1>
            <p className="mb-10 max-w-xl text-lg leading-relaxed text-primary/60 md:text-xl">
              Tell us where your website, customer journey, or internal workflow is breaking. We’ll review your business and show you the right website, platform, or system direction.
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
                className="group relative flex h-14 items-center justify-center overflow-hidden rounded-full bg-primary px-8 text-sm font-bold uppercase tracking-widest text-white transition-transform active:scale-95"
              >
                <span className="relative z-10">Start the Diagnostic</span>
              </button>
              <Link to="/#selected-work" className="group relative flex h-14 items-center justify-center overflow-hidden rounded-full border border-primary/10 bg-white px-8 text-sm font-bold uppercase tracking-widest text-primary transition-all hover:bg-primary/5 active:scale-95">
                <span className="relative z-10">View Selected Work</span>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#050505] p-8 shadow-2xl lg:p-12">
              <div className="mb-8 font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
                Diagnostic Focus
              </div>
              <div className="space-y-6">
                {[
                  { id: "01", title: "Business Clarity" },
                  { id: "02", title: "Page Architecture" },
                  { id: "03", title: "Digital System Direction" },
                  { id: "04", title: "Build Roadmap" },
                ].map((item) => (
                  <div key={item.id} className="flex items-center gap-6 border-b border-white/5 pb-6 last:border-0 last:pb-0">
                    <span className="font-mono text-xs font-bold text-white/20">{item.id}</span>
                    <span className="text-xl font-bold uppercase tracking-tight text-white md:text-2xl">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-primary/5 blur-3xl" />
          </motion.div>
        </div>
      </section>

      {/* SECTION 2 — PURPOSE CARDS */}
      <section className="bg-[#fcfbf9] px-6 py-24 lg:px-20 lg:py-32">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Clarify the Business",
              desc: "We identify your offer, audience, trust gaps, customer journey, and conversion goal."
            },
            {
              title: "Architect the Pages",
              desc: "We map the website or platform structure around clarity, proof, mobile flow, and enquiry action."
            },
            {
              title: "Define the Right Build",
              desc: "We decide whether you need a website, landing page, e-commerce experience, platform, dashboard, or workflow system."
            },
            {
              title: "Shape the Roadmap",
              desc: "You leave with a cleaner direction for scope, priorities, timeline, and next steps."
            }
          ].map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group rounded-[32px] border border-primary/5 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <div className="mb-6 h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center transition-colors group-hover:bg-primary group-hover:text-white text-primary">
                 <div className="h-6 w-6 rounded-md border-2 border-current opacity-30" />
              </div>
              <h3 className="mb-4 text-xl font-bold uppercase tracking-tight text-primary leading-tight">
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed text-primary/60">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 3 — THE FORM & QUALIFICATION */}
      <section id="diagnostic-form" ref={formRef} className="px-6 py-24 lg:px-20 lg:py-32">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_0.4fr]">
          {/* Form Side */}
          <div className="rounded-[40px] border border-primary/5 bg-white p-8 shadow-2xl lg:p-16">
            <div className="mb-12">
              <div className="mb-4 flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-primary/40">
                  Step {step} of {totalSteps}
                </span>
                <span className="font-mono text-[10px] font-bold text-primary/40">
                  {Math.round((step / totalSteps) * 100)}% Complete
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-primary/5">
                <motion.div 
                  className="h-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${(step / totalSteps) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Step 1: Contact Details */}
                  {step === 1 && (
                    <div className="space-y-8">
                      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {/* Name & Company */}
                        <div className="space-y-2">
                          <label htmlFor="full-name" className="block font-mono text-[10px] font-bold uppercase tracking-widest text-primary/60">Full Name</label>
                          <input 
                            id="full-name"
                            required
                            type="text" 
                            aria-invalid={Boolean(fieldErrors.fullName)}
                            aria-describedby={fieldErrors.fullName ? "full-name-error" : undefined}
                            className={cn(
                              "w-full rounded-2xl border bg-[#fcfbf9] px-6 py-4 text-sm font-medium text-primary outline-none transition-colors focus:border-primary",
                              fieldErrors.fullName ? "border-red-500/50" : "border-primary/10"
                            )}
                            placeholder="Ahmad Zulkifli"
                            value={formData.name}
                            onChange={(e) => {
                              clearFieldError("fullName");
                              setFormData({...formData, name: e.target.value});
                            }}
                          />
                          {fieldErrors.fullName && (
                            <p id="full-name-error" className="text-[10px] font-bold uppercase tracking-wider text-red-500">{fieldErrors.fullName}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="company-name" className="block font-mono text-[10px] font-bold uppercase tracking-widest text-primary/60">Company Name</label>
                          <input 
                            id="company-name"
                            required
                            type="text" 
                            aria-invalid={Boolean(fieldErrors.companyName)}
                            aria-describedby={fieldErrors.companyName ? "company-name-error" : undefined}
                            className={cn(
                              "w-full rounded-2xl border bg-[#fcfbf9] px-6 py-4 text-sm font-medium text-primary outline-none transition-colors focus:border-primary",
                              fieldErrors.companyName ? "border-red-500/50" : "border-primary/10"
                            )}
                            placeholder="Zul Trading Sdn Bhd"
                            value={formData.company}
                            onChange={(e) => {
                              clearFieldError("companyName");
                              setFormData({...formData, company: e.target.value});
                            }}
                          />
                          {fieldErrors.companyName && (
                            <p id="company-name-error" className="text-[10px] font-bold uppercase tracking-wider text-red-500">{fieldErrors.companyName}</p>
                          )}
                        </div>

                        {/* Email & Phone */}
                        <div className="space-y-2">
                          <label htmlFor="work-email" className="block font-mono text-[10px] font-bold uppercase tracking-widest text-primary/60">Work Email</label>
                          <input 
                            id="work-email"
                            required
                            type="email" 
                            aria-invalid={Boolean(fieldErrors.workEmail)}
                            aria-describedby={fieldErrors.workEmail ? "work-email-error" : undefined}
                            className={cn(
                              "w-full rounded-2xl border bg-[#fcfbf9] px-6 py-4 text-sm font-medium text-primary outline-none transition-colors focus:border-primary",
                              fieldErrors.workEmail ? "border-red-500/50" : "border-primary/10"
                            )}
                            placeholder="ahmad@company.com"
                            value={formData.email}
                            onChange={(e) => {
                              clearFieldError("workEmail");
                              setFormData({...formData, email: e.target.value});
                            }}
                          />
                          {fieldErrors.workEmail && (
                            <p id="work-email-error" className="text-[10px] font-bold uppercase tracking-wider text-red-500">{fieldErrors.workEmail}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="whatsapp-phone" className="block font-mono text-[10px] font-bold uppercase tracking-widest text-primary/60">WhatsApp / Phone</label>
                          <div className={cn(
                            "flex items-center rounded-2xl border bg-[#fcfbf9] px-4 transition-all duration-300",
                            phoneError || fieldErrors.whatsappPhone ? "border-red-500/50" : "border-primary/10 focus-within:border-primary"
                          )}>
                            <div className="flex h-10 items-center justify-center rounded-lg bg-primary/5 px-3 font-mono text-xs font-bold text-primary/40">
                              +60
                            </div>
                            <input 
                              id="whatsapp-phone"
                              required
                              type="tel" 
                              aria-invalid={Boolean(phoneError || fieldErrors.whatsappPhone)}
                              aria-describedby={phoneError || fieldErrors.whatsappPhone ? "whatsapp-phone-error" : undefined}
                              className="w-full bg-transparent px-4 py-4 text-sm font-medium text-primary outline-none"
                              placeholder="12-345 6789"
                              value={formData.whatsappLocal}
                              onChange={(e) => handlePhoneChange(e.target.value)}
                            />
                          </div>
                          {(phoneError || fieldErrors.whatsappPhone) && (
                            <p id="whatsapp-phone-error" className="text-[10px] font-bold uppercase tracking-wider text-red-500">{phoneError || fieldErrors.whatsappPhone}</p>
                          )}
                        </div>

                        {/* Role & Country */}
                        <div className="space-y-2">
                          <label htmlFor="role" className="block font-mono text-[10px] font-bold uppercase tracking-widest text-primary/60">Role in Business</label>
                          <select 
                            id="role"
                            required
                            aria-invalid={Boolean(fieldErrors.roleInBusiness)}
                            aria-describedby={fieldErrors.roleInBusiness ? "role-error" : undefined}
                            className={cn(
                              "w-full appearance-none rounded-2xl border bg-[#fcfbf9] px-6 py-4 text-sm font-medium text-primary outline-none transition-colors focus:border-primary",
                              fieldErrors.roleInBusiness ? "border-red-500/50" : "border-primary/10"
                            )}
                            value={formData.role}
                            onChange={(e) => {
                              clearFieldError("roleInBusiness");
                              setFormData({...formData, role: e.target.value});
                            }}
                          >
                            <option value="" disabled>Select your role</option>
                            {[
                              "Founder / Owner", "CEO / Director", "Marketing Lead", 
                              "Operations Lead", "Manager", "Freelancer / Consultant", "Other"
                            ].map(opt => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                          {fieldErrors.roleInBusiness && (
                            <p id="role-error" className="text-[10px] font-bold uppercase tracking-wider text-red-500">{fieldErrors.roleInBusiness}</p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <label className="block font-mono text-[10px] font-bold uppercase tracking-widest text-primary/60">Country / Timezone</label>
                          <div className="flex items-center justify-between rounded-2xl border border-primary/5 bg-primary/[0.02] px-6 py-4 opacity-70">
                            <span className="text-sm font-medium text-primary/60">Malaysia / GMT+8</span>
                            <div className="text-primary/20">
                              <div className="h-4 w-4 rounded-md border-2 border-current flex items-center justify-center">
                                 <div className="h-1.5 w-1.5 rounded-full bg-current" />
                              </div>
                            </div>
                          </div>
                          {fieldErrors.countryTimezone && (
                            <p className="text-[10px] font-bold uppercase tracking-wider text-red-500">{fieldErrors.countryTimezone}</p>
                          )}
                        </div>
                      </div>

                      {/* Language */}
                      <div className="space-y-4 pt-4">
                        <label className="block font-mono text-[10px] font-bold uppercase tracking-widest text-primary/60">Preferred Language</label>
                        <div className="flex flex-wrap gap-3">
                          {["English", "Bahasa Melayu", "Mandarin"].map((lang) => (
                            <button
                              key={lang}
                              type="button"
                              onClick={() => {
                                clearFieldError("preferredLanguage");
                                setFormData({...formData, language: lang});
                              }}
                              className={cn(
                                "rounded-full px-8 py-3 text-[10px] font-bold uppercase tracking-widest transition-all",
                                formData.language === lang 
                                  ? "bg-primary text-white shadow-xl" 
                                  : "bg-[#f4f2ed] text-primary/60 hover:bg-[#eceae4]"
                              )}
                            >
                              {lang}
                            </button>
                          ))}
                        </div>
                        {fieldErrors.preferredLanguage && (
                          <p className="text-[10px] font-bold uppercase tracking-wider text-red-500">{fieldErrors.preferredLanguage}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Step 2: Business Type */}
                  {step === 2 && (
                    <div className="space-y-8">
                      <h3 className="text-2xl font-bold uppercase tracking-tight text-primary">What kind of business are you building for?</h3>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                          "Service business", "Local retail business", "E-commerce brand",
                          "Repair / technical service business", "Consultant / professional service",
                          "Education / coaching", "Internal operations team", "Other"
                        ].map((type) => (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setFormData({...formData, businessType: type})}
                            className={cn(
                              "flex items-center gap-4 rounded-2xl border p-6 text-left transition-all",
                              formData.businessType === type
                                ? "border-primary bg-primary text-white shadow-xl"
                                : "border-primary/5 bg-[#fcfbf9] text-primary/60 hover:border-primary/20 hover:bg-white"
                            )}
                          >
                            <span className={cn(
                              "h-5 w-5 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors",
                              formData.businessType === type ? "border-white" : "border-primary/10"
                            )}>
                              {formData.businessType === type && <div className="h-2 w-2 rounded-full bg-white" />}
                            </span>
                            <span className="text-xs font-bold uppercase tracking-wider">{type}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Build Requirement */}
                  {step === 3 && (
                    <div className="space-y-8">
                      <h3 className="text-2xl font-bold uppercase tracking-tight text-primary">What do you need Strata to help with?</h3>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                          "Business website", "Landing page / sales page", "Website redesign",
                          "E-commerce website", "Service business platform", "Booking / enquiry system",
                          "Internal dashboard", "AI-assisted workflow system", "Not sure yet"
                        ].map((req) => (
                          <button
                            key={req}
                            type="button"
                            onClick={() => setFormData({...formData, requirement: req})}
                            className={cn(
                              "flex items-center gap-4 rounded-2xl border p-6 text-left transition-all",
                              formData.requirement === req
                                ? "border-primary bg-primary text-white shadow-xl"
                                : "border-primary/5 bg-[#fcfbf9] text-primary/60 hover:border-primary/20 hover:bg-white"
                            )}
                          >
                            <span className={cn(
                              "h-5 w-5 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors",
                              formData.requirement === req ? "border-white" : "border-primary/10"
                            )}>
                              {formData.requirement === req && <div className="h-2 w-2 rounded-full bg-white" />}
                            </span>
                            <span className="text-xs font-bold uppercase tracking-wider">{req}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 4: Current Problem */}
                  {step === 4 && (
                    <div className="space-y-8">
                      <h3 className="text-2xl font-bold uppercase tracking-tight text-primary">What is currently unclear, manual, slow, outdated, or not converting?</h3>
                      <div className="space-y-4">
                        <textarea 
                          required
                          className="min-h-[200px] w-full rounded-2xl border border-primary/10 bg-[#fcfbf9] px-6 py-6 text-sm font-medium text-primary outline-none focus:border-primary transition-colors"
                          placeholder="Tell us about your pain points..."
                          value={formData.problem}
                          onChange={(e) => setFormData({...formData, problem: e.target.value})}
                        />
                        <p className="flex items-center gap-2 text-xs text-primary/40 italic">
                          <HelpCircle size={14} />
                          Example: weak enquiries, unclear services, poor mobile experience, too much manual follow-up, outdated website, no lead capture, or no proper customer journey.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Step 5: Current Links */}
                  {step === 5 && (
                    <div className="space-y-8">
                      <h3 className="text-2xl font-bold uppercase tracking-tight text-primary">Current Links and References</h3>
                      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div className="space-y-2">
                          <label className="block font-mono text-[10px] font-bold uppercase tracking-widest text-primary/60">Current Website URL</label>
                          <input 
                            type="url" 
                            className="w-full rounded-2xl border border-primary/10 bg-[#fcfbf9] px-6 py-4 text-sm font-medium text-primary outline-none focus:border-primary transition-colors"
                            placeholder="https://..."
                            value={formData.websiteUrl}
                            onChange={(e) => setFormData({...formData, websiteUrl: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block font-mono text-[10px] font-bold uppercase tracking-widest text-primary/60">Social Media Links</label>
                          <input 
                            type="text" 
                            className="w-full rounded-2xl border border-primary/10 bg-[#fcfbf9] px-6 py-4 text-sm font-medium text-primary outline-none focus:border-primary transition-colors"
                            placeholder="Instagram, TikTok, etc."
                            value={formData.socialLinks}
                            onChange={(e) => setFormData({...formData, socialLinks: e.target.value})}
                          />
                        </div>
                        <div className="col-span-1 md:col-span-2 space-y-2">
                          <label className="block font-mono text-[10px] font-bold uppercase tracking-widest text-primary/60">Competitor or Reference Links</label>
                          <textarea 
                            className="min-h-[100px] w-full rounded-2xl border border-primary/10 bg-[#fcfbf9] px-6 py-4 text-sm font-medium text-primary outline-none focus:border-primary transition-colors"
                            placeholder="Websites you like or competitors..."
                            value={formData.references}
                            onChange={(e) => setFormData({...formData, references: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 6: Timeline and Budget */}
                  {step === 6 && (
                    <div className="space-y-12">
                      <div className="space-y-6">
                        <h3 className="text-2xl font-bold uppercase tracking-tight text-primary">Intended Timeline</h3>
                        <div className="flex flex-wrap gap-3">
                          {["ASAP", "Within 30 days", "1–3 months", "3+ months", "Still exploring"].map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => setFormData({...formData, timeline: t})}
                              className={cn(
                                "rounded-full px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all",
                                formData.timeline === t 
                                  ? "bg-primary text-white shadow-lg" 
                                  : "bg-[#f4f2ed] text-primary/60 hover:bg-[#eceae4]"
                              )}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-6">
                        <h3 className="text-2xl font-bold uppercase tracking-tight text-primary">Expected Budget</h3>
                        <div className="flex flex-wrap gap-3">
                          {[
                            "Below RM3,000", "RM3,000–RM5,000", "RM5,000–RM10,000", 
                            "RM10,000–RM25,000", "RM25,000+", "Not sure yet"
                          ].map((b) => (
                            <button
                              key={b}
                              type="button"
                              onClick={() => setFormData({...formData, budget: b})}
                              className={cn(
                                "rounded-full px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all",
                                formData.budget === b 
                                  ? "bg-primary text-white shadow-lg" 
                                  : "bg-[#f4f2ed] text-primary/60 hover:bg-[#eceae4]"
                              )}
                            >
                              {b}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 7: Call Time & Consent */}
                  {step === 7 && (
                    <div className="space-y-12">
                      <div className="space-y-8">
                        <h3 className="text-2xl font-bold uppercase tracking-tight text-primary">Preferred Strategy Call Time</h3>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                          <div className="space-y-2">
                            <label className="block font-mono text-[10px] font-bold uppercase tracking-widest text-primary/60">Preferred Date</label>
                            <input 
                              required
                              type="date" 
                              className="w-full rounded-2xl border border-primary/10 bg-[#fcfbf9] px-6 py-4 text-sm font-medium text-primary outline-none focus:border-primary transition-colors"
                              value={formData.preferredDate}
                              onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block font-mono text-[10px] font-bold uppercase tracking-widest text-primary/60">Preferred Time</label>
                            <input 
                              type="time" 
                              className="w-full rounded-2xl border border-primary/10 bg-[#fcfbf9] px-6 py-4 text-sm font-medium text-primary outline-none focus:border-primary transition-colors"
                              value={formData.preferredTime}
                              onChange={(e) => setFormData({...formData, preferredTime: e.target.value})}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block font-mono text-[10px] font-bold uppercase tracking-widest text-primary/60">Timezone</label>
                            <div className="flex h-14 items-center rounded-2xl border border-primary/5 bg-primary/[0.02] px-6 py-4 opacity-70">
                              <span className="text-sm font-medium text-primary/60">GMT+8 (Kuala Lumpur)</span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="block font-mono text-[10px] font-bold uppercase tracking-widest text-primary/60">Additional Notes</label>
                          <textarea 
                            className="min-h-[100px] w-full rounded-2xl border border-primary/10 bg-[#fcfbf9] px-6 py-4 text-sm font-medium text-primary outline-none focus:border-primary transition-colors"
                            placeholder="Anything else we should know?"
                            value={formData.notes}
                            onChange={(e) => setFormData({...formData, notes: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <button
                          type="button"
                          onClick={() => setFormData({...formData, consent: !formData.consent})}
                          className={cn(
                            "mt-1 h-5 w-5 shrink-0 rounded border-2 flex items-center justify-center transition-colors",
                            formData.consent ? "bg-primary border-primary text-white" : "border-primary/10"
                          )}
                        >
                          {formData.consent && <CheckCircle2 size={12} />}
                        </button>
                        <span className="text-xs leading-relaxed text-primary/60">
                          I agree to be contacted by Strata regarding this diagnostic request. My data will be handled according to Strata's privacy policy.
                        </span>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {submitError && (
                <div
                  role="alert"
                  className="rounded-2xl border border-red-500/15 bg-red-500/[0.06] px-5 py-4 text-xs font-bold uppercase tracking-wider text-red-600"
                >
                  {submitError}
                </div>
              )}

              {/* Form Navigation */}
              <div className="flex flex-wrap items-center justify-between gap-6 pt-12 border-t border-primary/5">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-widest text-primary/40 hover:text-primary transition-colors"
                  >
                    <ChevronLeft size={16} />
                    <span>Back</span>
                  </button>
                ) : <div />}

                {step < totalSteps ? (
                  <button
                    type="button"
                    disabled={!isStepValid()}
                    onClick={nextStep}
                    className={cn(
                      "group flex h-14 items-center justify-center gap-4 rounded-full px-10 text-sm font-bold uppercase tracking-widest transition-all active:scale-95",
                      isStepValid() 
                        ? "bg-primary text-white shadow-xl" 
                        : "bg-[#f4f2ed] text-primary/20 cursor-not-allowed"
                    )}
                  >
                    <span>Next Step</span>
                    <ChevronRight size={18} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={!isStepValid() || isSubmitting}
                    aria-busy={isSubmitting}
                    className={cn(
                      "group flex h-14 items-center justify-center gap-4 rounded-full px-12 text-sm font-bold uppercase tracking-widest transition-all active:scale-95",
                      isStepValid() && !isSubmitting
                        ? "bg-primary text-white shadow-xl" 
                        : "bg-[#f4f2ed] text-primary/20 cursor-not-allowed"
                    )}
                  >
                    <span>{isSubmitting ? "Submitting..." : "Submit Diagnostic Request"}</span>
                    <ArrowRight size={18} />
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Qualification Side */}
          <div className="lg:sticky lg:top-32 h-fit">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-[36px] border border-white/10 bg-[#0B0B0B] text-white shadow-2xl"
            >
              <div className="p-8 lg:p-10">
                <span className="mb-6 block font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">
                  QUALIFICATION FILTER
                </span>
                <h3 className="mb-4 text-2xl font-bold uppercase tracking-tight text-white md:text-3xl">
                  Built for serious operators.
                </h3>
                <p className="mb-10 text-sm leading-relaxed text-white/50">
                  Strata works best with businesses that need structure, clarity, and a digital system that supports growth.
                </p>

                {/* Section 1: Good Fit */}
                <div className="space-y-6">
                  <span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-white/20">
                    GOOD FIT
                  </span>
                  <ul className="space-y-4">
                    {[
                      "Malaysian SMEs that need a stronger digital foundation",
                      "Service businesses with weak lead capture",
                      "Brands with unclear websites or poor mobile flow",
                      "Operators replacing manual workflows",
                      "E-commerce businesses needing clearer product journeys",
                      "Founders who want strategy before design"
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-4">
                        <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
                        <span className="text-xs leading-relaxed text-white/70">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="my-10 h-px w-full bg-white/5" />

                {/* Section 2: Not a Fit */}
                <div className="space-y-6">
                  <span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-white/20">
                    NOT A FIT
                  </span>
                  <ul className="space-y-4">
                    {[
                      "You only want the cheapest template",
                      "You have no clear business goal",
                      "You are not ready to provide project details",
                      "You want visuals without structure",
                      "You expect premium work at throwaway pricing"
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-4">
                        <div className="mt-[9px] h-0.5 w-1.5 shrink-0 bg-white/20" />
                        <span className="text-xs leading-relaxed text-white/40">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Strip */}
              <div className="border-t border-white/5 bg-white/[0.02] p-6 text-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                  Not sure if you fit? Submit the diagnostic and we’ll review honestly.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — NEXT STEPS */}
      <section className="bg-[#050505] px-6 py-24 lg:px-20 lg:py-32 text-white">
        <div className="mb-20 text-center">
          <span className="mb-4 block font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
            THE PROCESS
          </span>
          <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl lg:text-6xl">
            What happens next
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {[
            { id: "01", title: "Submit the Diagnostic", desc: "You tell us about your business, current problem, intended build, budget, and timeline." },
            { id: "02", title: "Strata Reviews Fit", desc: "We review your project details and check whether Strata is the right team for the problem." },
            { id: "03", title: "Strategy Call", desc: "We walk through the best direction for your website, platform, system, or workflow." },
            { id: "04", title: "Build Roadmap", desc: "If there is fit, we outline the next step, rough scope, and execution path." }
          ].map((item) => (
            <div key={item.id} className="space-y-6">
              <span className="font-mono text-xs font-bold text-white/20">{item.id}</span>
              <h3 className="text-xl font-bold uppercase tracking-tight text-white">{item.title}</h3>
              <p className="text-sm leading-relaxed text-white/50">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5 — PROOF SECTION */}
      <section className="bg-[#fcfbf9] px-6 py-24 lg:px-20 lg:py-32">
        <div className="mb-20">
          <span className="mb-4 block font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-primary/40">
            CREDIBILITY
          </span>
          <h2 className="text-4xl font-black tracking-tight text-primary md:text-5xl lg:text-6xl">
            Built Across Brand, Service, Commerce, and Operations
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {[
            "J-ARMOR — Brand website / product positioning",
            "J-ARMOR SHOP — E-commerce product store",
            "THUNDERFIX — Service website / trust and conversion flow",
            "ONESPECIALIST — Local service website / lead generation",
            "1MOBILE ROS — Internal repair operations system"
          ].map((project) => (
            <div key={project} className="group rounded-2xl border border-primary/5 bg-white p-6 shadow-sm transition-all hover:shadow-md">
              <p className="font-mono text-[9px] font-bold uppercase leading-relaxed tracking-widest text-primary/60">
                {project}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link to="/#selected-work" className="group inline-flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-widest text-primary">
            <span>View Selected Work</span>
            <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* SECTION 6 — FAQ */}
      <section className="px-6 py-24 lg:px-20 lg:py-32 border-t border-primary/5">
        <div className="mx-auto max-w-4xl">
          <div className="mb-20 text-center">
            <span className="mb-4 block font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-primary/40">
              QUESTIONS
            </span>
            <h2 className="text-4xl font-black tracking-tight text-primary md:text-5xl lg:text-6xl">
              Common enquiries
            </h2>
          </div>
          <div className="space-y-2">
            {[
              {
                q: "Is the diagnostic free?",
                a: "Yes. The initial diagnostic review and strategy call are complementary. Our goal is to ensure we only take on projects where we can provide measurable value."
              },
              {
                q: "Do I need to know exactly what I want built?",
                a: "No. That is exactly what the diagnostic is for. We help you define whether you need a simple website, a complex platform, or an internal operations system based on your business problems."
              },
              {
                q: "Does Strata only build websites?",
                a: "We build digital architecture. This includes business websites, but also extends to custom booking platforms, internal dashboards, e-commerce stores, and AI-assisted workflow systems."
              },
              {
                q: "What should I prepare before the call?",
                a: "Simply be ready to discuss your business goals, what is currently slow or manual in your workflow, and what your ideal customer journey looks like. Any existing branding or links are helpful."
              },
              {
                q: "What happens after the call?",
                a: "If there is a clear fit, we will provide a build roadmap including a rough scope, timeline, and investment range. You decide whether to proceed with the build or keep the strategy findings."
              }
            ].map((item) => (
              <FAQItem key={item.q} question={item.q} answer={item.a} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
