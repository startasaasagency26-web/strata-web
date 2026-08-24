
const capabilities = [
  "Revenue Infrastructure",
  "Growth Media System",
  "Lead Capture",
  "CRM & Pipeline",
  "Follow-Up Automation",
  "Paid Media",
  "Reporting & Visibility"
];

export const TrustStrip = () => {
  return (
    <section className="py-10 border-y border-border bg-surface2 overflow-hidden flex relative">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
      
      <div className="flex animate-[marquee_30s_linear_infinite] whitespace-nowrap">
        {[...capabilities, ...capabilities, ...capabilities].map((item, idx) => (
          <div key={idx} className="flex items-center mx-8">
            <span className="text-muted/60 text-sm md:text-base font-medium tracking-widest uppercase">
              {item}
            </span>
            <span className="ml-16 w-1.5 h-1.5 rounded-full bg-gold/40" />
          </div>
        ))}
      </div>
    </section>
  );
};
