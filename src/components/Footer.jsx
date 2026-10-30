export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-[#06090e] py-8 px-4 sm:px-8 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="font-semibold text-slate-200">SEASAW Cybersecurity Society</span>
          <span className="mx-2 text-slate-600" aria-hidden="true">
            ·
          </span>
          <span>Annual Cyber Awareness &amp; Forensics Initiative</span>
          <span className="mx-2 text-slate-600" aria-hidden="true">
            ·
          </span>
          <span>The Invisible Trail</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-slate-400">
          <span>Strictly Fictional Profiles &amp; Scenarios</span>
          <span className="text-slate-600" aria-hidden="true">
            ·
          </span>
          <span>No Personal Data Collected</span>
          <span className="text-slate-600" aria-hidden="true">
            ·
          </span>
          <span>Zero Credential Phishing</span>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-4 text-[11px] text-slate-400 text-center md:text-left leading-relaxed">
        Notice: All identities, institutions, photographs, metadata tags, and GPS coordinates
        featured in this simulation are strictly fictional and engineered solely for educational
        cyber defense awareness.
      </div>
    </footer>
  );
}
