/** Tombol/link dengan gaya seragam. Pakai `as="a"` untuk tautan. */
export function Button({
  as: Tag = "button",
  variant = "solid",
  className = "",
  children,
  ...rest
}) {
  const variants = {
    solid:
      "bg-ulos text-ivory hover:bg-ulos-deep border-transparent shadow-soft hover:shadow-lift",
    gold: "bg-gold text-ink hover:bg-gold-soft border-transparent shadow-soft hover:shadow-lift",
    outline: "border-gold/60 text-current hover:bg-gold/10",
    ghost: "border-transparent text-current hover:bg-current/5",
  };

  return (
    <Tag
      className={`inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border px-7 py-3.5 font-sans text-xs font-medium uppercase tracking-[0.18em] transition-all duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 min-h-11 ${variants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
