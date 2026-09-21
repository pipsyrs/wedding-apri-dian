import { CornerFrame } from "@/components/ornaments/CornerFrame";

/** Kartu berbingkai gorga di dua sudut. */
export function Card({ children, className = "", framed = true, ...rest }) {
  return (
    <div
      className={`relative rounded-[2rem] border border-border/70 bg-ivory/80 p-7 backdrop-blur-sm transition-shadow duration-300 sm:p-9 ${className}`}
      {...rest}
    >
      {framed ? (
        <>
          <CornerFrame className="pointer-events-none absolute left-3 top-3 h-9 w-9 text-gold/60" />
          <CornerFrame className="pointer-events-none absolute bottom-3 right-3 h-9 w-9 rotate-180 text-gold/60" />
        </>
      ) : null}
      {children}
    </div>
  );
}
