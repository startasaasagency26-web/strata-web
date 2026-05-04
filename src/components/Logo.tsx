export const Logo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center overflow-hidden ${className}`}>
      {/* 
        Using mix-blend-screen to drop the black background of the logo, 
        leaving only the white SA mark and text perfectly integrated into the black navbar.
        If we only wanted the SA mark, we could use object-position top and limit height.
      */}
      <img 
        src="/ca1ea7a2-75a9-4d55-9ee2-dd6db560a788.png" 
        alt="Strata Agency" 
        className="w-[34px] md:w-[42px] object-cover object-top mix-blend-screen select-none pointer-events-none" 
        style={{ height: '32px', objectPosition: 'center 10%' }}
      />
      {/* 
        The inline style height restricts it to the top portion (the SA mark) 
        assuming the mark is at the top of the square image. 
      */}
    </div>
  );
};
