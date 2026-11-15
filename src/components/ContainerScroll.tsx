"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/** 3D tilt-in showcase card on scroll.
 *  In-house re-build inspired by Aceternity UI's "Container Scroll Animation"
 *  (@manuarora700 on 21st.dev); see DEVIATIONS.md #17. Re-skinned to the
 *  site's tokens. Transform/opacity only; static under reduced motion. */
export function ContainerScroll({ title, children }: { title: ReactNode; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const set = () => setMobile(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const p = useTransform(scrollYProgress, [0.08, 0.5], [0, 1], { clamp: true });
  const rotate = useTransform(p, [0, 1], [mobile ? 14 : 22, 0]);
  const scale = useTransform(p, [0, 1], mobile ? [0.86, 0.98] : [1.06, 1]);
  const lift = useTransform(p, [0, 1], [0, mobile ? -40 : -90]);
  const shadow = useTransform(
    p,
    (v) =>
      `0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 40px 120px -40px rgba(242,166,90,${(0.15 + v * 0.45).toFixed(3)})`
  );

  const still = !!reduce;

  return (
    <div ref={ref} className="relative flex flex-col items-center py-10 md:py-20" style={{ perspective: "1000px" }}>
      <motion.div style={still ? undefined : { translateY: lift }} className="w-full">
        {title}
      </motion.div>
      <motion.div
        style={
          still
            ? undefined
            : {
                rotateX: rotate,
                scale,
                boxShadow: shadow,
              }
        }
        className="cscroll-card relative mt-10 w-full max-w-[1180px] rounded-[28px] border border-hairline bg-[#121212] p-2 will-change-transform md:-mt-6 md:p-3"
      >
        <div className="relative h-full w-full overflow-hidden rounded-[20px] border border-hairline/60 bg-night">{children}</div>
      </motion.div>
    </div>
  );
}
