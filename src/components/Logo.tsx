export const Logo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img 
        src="/strata-sa-mark.png" 
        alt="Strata Agency" 
        className="w-[36px] md:w-[46px] h-auto object-contain select-none pointer-events-none" 
      />
    </div>
  );
};
