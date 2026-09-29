import { useRef } from "react";
import { useInView } from "@/hooks/useInView";

// Bloque que aparece suavemente la primera vez que entra en pantalla (clases .rv / .in de motion.css)
export default function Reveal({ as: Tag = "div", className, children, ...rest }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const classes = [className, "rv", inView && "in"].filter(Boolean).join(" ");
  return (
    <Tag ref={ref} className={classes} {...rest}>
      {children}
    </Tag>
  );
}
