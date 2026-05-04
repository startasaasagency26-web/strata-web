export const Logo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      {/* Assuming one of the images is the black logo (ca1ea7a2... or 4b11fb12...) */}
      <img src="/ca1ea7a2-75a9-4d55-9ee2-dd6db560a788.png" alt="Strata Agency" className="h-12 md:h-16 object-contain mix-blend-multiply" />
    </div>
  );
};
