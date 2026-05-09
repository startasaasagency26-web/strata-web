import { LiquidButton } from "../ui/liquid-glass-button";

export default function LiquidGlassDemo() {
  return (
    <section className="py-24 bg-surface/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-12">
          <div className="text-center">
            <h2 className="text-3xl font-black uppercase mb-4 tracking-tight">Interactive Components</h2>
            <p className="text-muted font-mono text-sm uppercase tracking-widest">Verifying Liquid Glass Integration</p>
          </div>
          
          <div className="relative h-[200px] w-full max-w-[800px] bg-primary/5 rounded-[32px] border border-black/5 flex items-center justify-center overflow-hidden"> 
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_0%,transparent_70%)] opacity-50" />
            <LiquidButton className="z-10">
              Liquid Glass
            </LiquidButton> 
          </div>
        </div>
      </div>
    </section>
  )
}
