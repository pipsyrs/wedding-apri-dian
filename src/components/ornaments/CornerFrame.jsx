/** Sudut berukir gorga untuk membingkai kartu. */
export function CornerFrame({ className = "" }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M2 24V8a6 6 0 016-6h16" />
      <path d="M10 26V14a4 4 0 014-4h12" />
      <path d="M18 10c0 6-8 6-8 12" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}
