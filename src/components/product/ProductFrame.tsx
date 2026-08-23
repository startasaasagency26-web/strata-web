interface ProductFrameProps {
  src: string;
  alt: string;
  urlLabel: string;
}

export const ProductFrame = ({ src, alt, urlLabel }: ProductFrameProps) => (
  <div className="relative w-full overflow-hidden rounded-[24px] border border-black/[0.09] bg-surface shadow-[0_24px_72px_-16px_rgba(0,0,0,0.22)]">
    <div className="flex h-11 items-center gap-3 border-b border-black/[0.07] bg-[#F2F2F4] px-4 sm:px-5">
      <div className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
        <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
        <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
        <span className="h-3 w-3 rounded-full bg-[#28C840]" />
      </div>
      <div className="flex flex-1 justify-center">
        <div className="flex w-full max-w-[260px] items-center justify-center rounded-md border border-black/[0.07] bg-white/80 px-3 py-1">
          <span className="truncate font-mono text-[11px] text-muted">{urlLabel}</span>
        </div>
      </div>
      <div className="hidden w-[54px] shrink-0 sm:block" aria-hidden="true" />
    </div>
    <div className="flex aspect-[16/9] items-center justify-center overflow-hidden bg-primary px-10 py-8 sm:px-20">
      <img
        src={src}
        alt={alt}
        width="343"
        height="361"
        fetchPriority="high"
        className="h-full w-auto object-contain"
      />
    </div>
  </div>
);
