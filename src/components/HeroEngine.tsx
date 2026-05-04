import { useEffect } from 'react';
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const HeroEngine = ({ className = '' }: { className?: string }) => {
  const prefersReducedMotion = useReducedMotion();

  // Mouse Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for parallax
  const springConfig = { damping: 40, stiffness: 100, mass: 1.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Transform constraints: max +/- 4deg
  const rotateX = useTransform(springY, [-1, 1], [4, -4]);
  const rotateY = useTransform(springX, [-1, 1], [-4, 4]);
  
  // Subtle structural parallax
  const shiftX = useTransform(springX, [-1, 1], [-15, 15]);
  const shiftY = useTransform(springY, [-1, 1], [-15, 15]);

  useEffect(() => {
    // Only apply parallax on desktop/pointer devices
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches && !prefersReducedMotion) {
      const handleMouseMove = (e: MouseEvent) => {
        // Normalize mouse coordinates to -1 to 1 based on window size
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth) * 2 - 1;
        const y = (e.clientY / innerHeight) * 2 - 1;
        
        mouseX.set(x);
        mouseY.set(y);
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [mouseX, mouseY, prefersReducedMotion]);

  // Standard animation states depending on reduced motion
  const animateFloat = prefersReducedMotion ? {} : {
    y: [0, -10, 0],
    transition: { duration: 7, ease: "easeInOut" as const, repeat: Infinity }
  };

  const animateGlow = prefersReducedMotion ? { opacity: 0.7, scale: 1 } : {
    opacity: [0.55, 0.9, 0.55],
    scale: [1, 1.04, 1],
    transition: { duration: 5, ease: "easeInOut" as const, repeat: Infinity }
  };

  const animateGlass1 = prefersReducedMotion ? {} : {
    rotate: [-1.5, 1.5, -1.5],
    y: [0, -5, 0],
    transition: { duration: 8, ease: "easeInOut" as const, repeat: Infinity }
  };
  
  const animateGlass2 = prefersReducedMotion ? {} : {
    rotate: [1.5, -1.5, 1.5],
    y: [0, 4, 0],
    transition: { duration: 9, ease: "easeInOut" as const, repeat: Infinity, delay: 1 }
  };

  const animateGlass3 = prefersReducedMotion ? {} : {
    rotate: [-1, 1, -1],
    y: [0, -3, 0],
    transition: { duration: 7.5, ease: "easeInOut" as const, repeat: Infinity, delay: 0.5 }
  };

  const animateForeground = prefersReducedMotion ? {} : {
    y: [-8, 6, -8],
    rotateZ: [-0.5, 0.5, -0.5],
    transition: { duration: 6, ease: "easeInOut" as const, repeat: Infinity }
  };

  const animateLines = prefersReducedMotion ? { opacity: 0.5 } : {
    opacity: [0.3, 0.7, 0.3],
    transition: { duration: 4, ease: "easeInOut" as const, repeat: Infinity }
  };

  const animateGlints = prefersReducedMotion ? { opacity: 0.8 } : {
    opacity: [0.2, 1, 0.2],
    transition: { duration: 3, ease: "easeInOut" as const, repeat: Infinity, delay: 2 }
  };

  return (
    <div className={`relative perspective-[1200px] w-full max-w-[800px] mx-auto ${className}`}>
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="w-full h-auto will-change-transform"
      >
        <motion.svg 
          animate={animateFloat}
          width="100%" 
          height="100%" 
          viewBox="0 0 2048 2048" 
          xmlns="http://www.w3.org/2000/svg"
          className="will-change-transform"
        >
          <defs>
            <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="52" result="blur"/>
              <feColorMatrix in="blur" type="matrix"
                values="1 0 0 0 0.95  0 1 0 0 0.95  0 0 1 0 0.95  0 0 0 0.55 0" result="glow"/>
              <feMerge>
                <feMergeNode in="glow"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>

            <filter id="dropShadow" x="-35%" y="-35%" width="170%" height="170%">
              <feDropShadow dx="0" dy="36" stdDeviation="42" floodColor="#000000" floodOpacity="0.42"/>
            </filter>

            <filter id="glassBlur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="0.25"/>
            </filter>

            <linearGradient id="chromeHorizontal" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f7f7f4"/>
              <stop offset="18%" stopColor="#ffffff"/>
              <stop offset="42%" stopColor="#a7a7a4"/>
              <stop offset="64%" stopColor="#f0f0ec"/>
              <stop offset="100%" stopColor="#777775"/>
            </linearGradient>

            <linearGradient id="chromeReverse" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7c7c79"/>
              <stop offset="30%" stopColor="#f4f4f0"/>
              <stop offset="56%" stopColor="#ffffff"/>
              <stop offset="100%" stopColor="#9a9a96"/>
            </linearGradient>

            <linearGradient id="glassFill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.82"/>
              <stop offset="42%" stopColor="#e6e6e3" stopOpacity="0.50"/>
              <stop offset="100%" stopColor="#8c8c89" stopOpacity="0.38"/>
            </linearGradient>

            <linearGradient id="deepGlass" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.50"/>
              <stop offset="55%" stopColor="#bdbdba" stopOpacity="0.26"/>
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.12"/>
            </linearGradient>

            <radialGradient id="aura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.42"/>
              <stop offset="44%" stopColor="#ffffff" stopOpacity="0.14"/>
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
            </radialGradient>

            <linearGradient id="highlightBand" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0"/>
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.70"/>
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
            </linearGradient>
          </defs>

          {/* transparent canvas; object-only hero asset */}
          <g id="strata-sa-digital-architecture-engine" filter="url(#dropShadow)">
            
            {/* 2. Glow/aura layer */}
            <motion.ellipse 
              animate={animateGlow}
              cx="1040" cy="1070" rx="720" ry="760" fill="url(#aura)" 
              style={{ transformOrigin: "1040px 1070px" }}
            />

            {/* 3. Rear glass architecture planes */}
            <g opacity="0.72">
              <motion.g animate={animateGlass1} style={{ transformOrigin: "850px 1030px" }}>
                <rect x="615" y="540" width="470" height="980" rx="84" fill="url(#deepGlass)" stroke="#ffffff" strokeOpacity="0.42" strokeWidth="2" transform="rotate(-15 850 1030)"/>
              </motion.g>
              <motion.g animate={animateGlass2} style={{ transformOrigin: "1235px 1015px" }}>
                <rect x="965" y="510" width="540" height="1010" rx="90" fill="url(#deepGlass)" stroke="#ffffff" strokeOpacity="0.36" strokeWidth="2" transform="rotate(13 1235 1015)"/>
              </motion.g>
              <motion.g animate={animateGlass3} style={{ transformOrigin: "1055px 1030px" }}>
                <rect x="750" y="580" width="610" height="900" rx="78" fill="url(#deepGlass)" stroke="#ffffff" strokeOpacity="0.30" strokeWidth="2" transform="rotate(-2 1055 1030)"/>
              </motion.g>
            </g>

            {/* 4. Chrome S/A structure - parallax shift */}
            <motion.g style={{ x: shiftX, y: shiftY }}>
              {/* chrome S silhouette: segmented engineered browser-frame arms */}
              <g filter="url(#softGlow)">
                <rect x="425" y="560" width="820" height="145" rx="72.5" fill="url(#chromeHorizontal)" stroke="#ffffff" strokeOpacity="0.75" strokeWidth="3" transform="rotate(-5 835 632.5)"/>
                <rect x="565" y="900" width="760" height="132" rx="66" fill="url(#chromeReverse)" stroke="#ffffff" strokeOpacity="0.62" strokeWidth="3" transform="rotate(14 945 966)"/>
                <rect x="390" y="1260" width="850" height="145" rx="72.5" fill="url(#chromeHorizontal)" stroke="#ffffff" strokeOpacity="0.78" strokeWidth="3" transform="rotate(-6 815 1332.5)"/>
              </g>

              {/* right A-frame: architectural chrome struts */}
              <g filter="url(#softGlow)">
                <rect x="1210" y="550" width="126" height="980" rx="63" fill="url(#chromeHorizontal)" stroke="#ffffff" strokeOpacity="0.72" strokeWidth="3" transform="rotate(-27 1273 1040)"/>
                <rect x="1445" y="780" width="116" height="710" rx="58" fill="url(#chromeReverse)" stroke="#ffffff" strokeOpacity="0.68" strokeWidth="3" transform="rotate(30 1503 1135)"/>
                <rect x="1110" y="1320" width="620" height="102" rx="51" fill="url(#chromeHorizontal)" stroke="#ffffff" strokeOpacity="0.70" strokeWidth="3"/>
              </g>

              {/* black precision joints and structural details */}
              <g opacity="0.95">
                <circle cx="610" cy="850" r="42" fill="#090909" stroke="#ffffff" strokeOpacity="0.22" strokeWidth="2"/>
                <circle cx="1440" cy="830" r="32" fill="#090909" stroke="#ffffff" strokeOpacity="0.22" strokeWidth="2"/>
                <circle cx="1490" cy="1290" r="38" fill="#090909" stroke="#ffffff" strokeOpacity="0.24" strokeWidth="2"/>
                <circle cx="730" cy="1435" r="29" fill="#090909" stroke="#ffffff" strokeOpacity="0.22" strokeWidth="2"/>
                <rect x="590" y="890" width="205" height="36" rx="18" fill="#090909" opacity="0.58" stroke="#ffffff" strokeOpacity="0.14"/>
                <rect x="1325" y="1176" width="210" height="38" rx="19" fill="#090909" opacity="0.50" stroke="#ffffff" strokeOpacity="0.14"/>
                <rect x="775" y="622" width="185" height="34" rx="17" fill="#090909" opacity="0.40" stroke="#ffffff" strokeOpacity="0.12"/>
              </g>
            </motion.g>

            {/* 6. fine blueprint connection lines */}
            <motion.g animate={animateLines} fill="none" stroke="#ffffff" strokeWidth="2" style={{ transformOrigin: "center" }}>
              <path d="M610 850 C750 790 850 790 985 825"/>
              <path d="M1245 790 C1390 795 1500 855 1560 930"/>
              <path d="M725 1432 C925 1482 1175 1448 1325 1350"/>
              <path d="M1490 1290 C1370 1220 1250 1210 1145 1240"/>
            </motion.g>

            {/* 5. foreground web-interface slab */}
            <motion.g animate={animateForeground} style={{ transformOrigin: "1048px 1054px" }}>
              <g transform="rotate(4 1048 1054)">
                <rect x="748" y="642" width="600" height="835" rx="72" fill="url(#glassFill)" stroke="#ffffff" strokeOpacity="0.82" strokeWidth="3"/>
                <rect x="780" y="682" width="536" height="760" rx="54" fill="#ffffff" opacity="0.07" stroke="#ffffff" strokeOpacity="0.24" strokeWidth="2"/>
                <circle cx="808" cy="720" r="8" fill="#ffffff" opacity="0.40"/>
                <circle cx="836" cy="720" r="8" fill="#ffffff" opacity="0.32"/>
                <circle cx="864" cy="720" r="8" fill="#ffffff" opacity="0.26"/>
                <rect x="925" y="710" width="290" height="18" rx="9" fill="#ffffff" opacity="0.20"/>
                <rect x="828" y="835" width="405" height="16" rx="8" fill="#ffffff" opacity="0.22"/>
                <rect x="828" y="895" width="305" height="16" rx="8" fill="#ffffff" opacity="0.16"/>
                <rect x="828" y="955" width="445" height="16" rx="8" fill="#ffffff" opacity="0.16"/>
                <rect x="828" y="1070" width="210" height="16" rx="8" fill="#ffffff" opacity="0.15"/>
                <rect x="828" y="1130" width="385" height="16" rx="8" fill="#ffffff" opacity="0.14"/>
                <rect x="828" y="1190" width="275" height="16" rx="8" fill="#ffffff" opacity="0.14"/>
                <path d="M738 715 L1320 610 L1370 725 L785 830 Z" fill="url(#highlightBand)" opacity="0.22"/>
              </g>
            </motion.g>

            {/* 7. small premium glints */}
            <motion.g animate={animateGlints} stroke="#ffffff" strokeLinecap="round">
              <path d="M690 630 L750 630" strokeOpacity="0.92" strokeWidth="5"/>
              <path d="M720 600 L720 660" strokeOpacity="0.50" strokeWidth="3"/>
              <path d="M1320 690 L1370 690" strokeOpacity="0.78" strokeWidth="4"/>
              <path d="M1345 667 L1345 714" strokeOpacity="0.42" strokeWidth="3"/>
              <path d="M1510 1248 L1555 1248" strokeOpacity="0.74" strokeWidth="4"/>
              <path d="M1532 1226 L1532 1270" strokeOpacity="0.40" strokeWidth="3"/>
            </motion.g>
          </g>
        </motion.svg>
      </motion.div>
    </div>
  );
};
