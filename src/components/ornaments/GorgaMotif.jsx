/**
 * Motif gorga Batak Toba sebagai SVG. Server Component — tanpa JS di client.
 * variant: simeol (sulur), ipon (gerigi tepi), desa (mata angin), sitompi (anyaman bersulur), rumah (Rumah Bolon), ulos (tenun ulos).
 */
export function GorgaMotif({
  variant = "simeol",
  className = "",
  stroke = "currentColor",
  ...rest
}) {
  const shapes = {
    simeol: (
      <>
        <path d="M4 32c8 0 8-14 16-14s8 14 16 14 8-14 16-14 8 14 16 14 8-14 16-14 8 14 16 14" />
        <circle cx="20" cy="18" r="2.5" />
        <circle cx="52" cy="18" r="2.5" />
        <circle cx="84" cy="18" r="2.5" />
        <path d="M4 44c8 0 8 12 16 12s8-12 16-12 8 12 16 12 8-12 16-12 8 12 16 12 8-12 16-12" />
      </>
    ),
    ipon: (
      <>
        <path d="M0 40h116" />
        <path d="M4 40l6-12 6 12 6-12 6 12 6-12 6 12 6-12 6 12 6-12 6 12 6-12 6 12 6-12 6 12 6-12 6 12 6-12 6 12" />
        <path d="M0 52h116" />
      </>
    ),
    desa: (
      <>
        <circle cx="58" cy="40" r="26" />
        <circle cx="58" cy="40" r="15" />
        <circle cx="58" cy="40" r="4" />
        <path d="M58 4v14M58 62v14M22 40h14M80 40h14" />
        <path d="M32 14l10 10M84 14L74 24M32 66l10-10M84 66L74 56" />
      </>
    ),
    sitompi: (
      <>
        <path d="M58 6v16M58 58v16" />
        <path d="M58 22c-12 0-20 7-20 18s8 18 20 18 20-7 20-18-8-18-20-18z" />
        <path d="M58 32c-6 0-10 3-10 8s4 8 10 8 10-3 10-8-4-8-10-8z" />
        <path d="M38 40H20c-6 0-10-4-10-9s4-9 10-9M78 40h18c6 0 10-4 10-9s-4-9-10-9" />
        <path d="M38 40H20c-6 0-10 4-10 9s4 9 10 9M78 40h18c6 0 10 4 10 9s-4 9-10 9" />
        <circle cx="58" cy="40" r="2.5" />
      </>
    ),
    rumah: (
      <>
        {/* Atap pelana melengkung dengan ujung menjulang — ciri Rumah Bolon */}
        <path d="M4 32c12-1 20-9 26-19 7 10 16 15 28 15s21-5 28-15c6 10 14 18 26 19" />
        <path d="M4 32l-1-9M112 32l1-9" />
        {/* Garis bawah atap */}
        <path d="M16 32h84" />
        {/* Dinding melebar ke bawah */}
        <path d="M20 32l3 20h70l3-20" />
        {/* Ukiran gorga pada dinding */}
        <path d="M36 41h44" />
        {/* Pintu tengah */}
        <path d="M52 52v-7h12v7" />
        {/* Tiang panggung */}
        <path d="M30 52v15M45 52v15M71 52v15M86 52v15" />
        <path d="M24 67h68" />
      </>
    ),
    ulos: (
      <>
        {/* Pita tenun atas & bawah */}
        <path d="M14 20h88M14 60h88" />
        <path d="M14 26h88M14 54h88" />
        {/* Tiga belah ketupat besar — inti motif ragi hidup */}
        <path d="M58 26l14 14-14 14-14-14z" />
        <path d="M28 33l7 7-7 7-7-7z" />
        <path d="M88 33l7 7-7 7-7-7z" />
        {/* Isi ketupat tengah */}
        <path d="M58 34l6 6-6 6-6-6z" />
        {/* Jumbai di kedua ujung */}
        <path d="M14 20v-7M14 60v7M102 20v-7M102 60v7" />
      </>
    ),
  };

  return (
    <svg
      viewBox="0 0 116 80"
      fill="none"
      stroke={stroke}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      {shapes[variant] ?? shapes.simeol}
    </svg>
  );
}
