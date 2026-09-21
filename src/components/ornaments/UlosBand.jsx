/** Pita tenun ulos horizontal — dipakai sebagai aksen tepi kartu/section. */
export function UlosBand({ className = "", tone = "light" }) {
  const stripes =
    tone === "dark"
      ? ["#c9a227", "#fdf8f0", "#8c1c13", "#fdf8f0", "#c9a227"]
      : ["#8c1c13", "#c9a227", "#1a1310", "#c9a227", "#8c1c13"];

  return (
    <div className={`flex h-2 w-full overflow-hidden ${className}`} aria-hidden="true">
      {stripes.map((color, i) => (
        <span key={i} className="h-full flex-1" style={{ backgroundColor: color }} />
      ))}
    </div>
  );
}
