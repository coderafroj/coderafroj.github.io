const TECH = ["PYTHON", "JAVA", "C / C++", "JAVASCRIPT", "TYPESCRIPT", "REACT", "NEXT.JS", "SQL", "FIREBASE", "GIT"];

export default function Marquee() {
  const track = [...TECH, ...TECH];
  return (
    <div className="border-y border-border bg-surface overflow-hidden py-4">
      <div className="marquee-track font-display font-bold text-2xl md:text-3xl text-fg-dim">
        {track.map((item, i) => (
          <span key={i} className="flex items-center px-6 whitespace-nowrap">
            {item}
            <span className="ml-6 text-muted">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
