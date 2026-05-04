
export const Logo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative">
        <span className="text-4xl md:text-5xl font-serif text-primary leading-none" style={{ fontFamily: 'Times New Roman, serif', letterSpacing: '-2px' }}>S</span>
        <div className="absolute -bottom-1 -right-2 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-50"></div>
      </div>
      <div className="mt-2 flex flex-col items-center">
        <span className="text-white tracking-[0.2em] text-lg md:text-xl font-serif">STRATA</span>
        <div className="flex items-center gap-2 mt-1">
          <span className="h-[1px] w-4 bg-primary opacity-80"></span>
          <span className="text-primary text-[0.6rem] md:text-xs tracking-[0.3em] font-sans">AGENCY</span>
          <span className="h-[1px] w-4 bg-primary opacity-80"></span>
        </div>
      </div>
    </div>
  );
};
