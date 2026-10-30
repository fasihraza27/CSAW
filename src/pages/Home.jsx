import { Shield, ArrowRight, Sparkles } from 'lucide-react';
import { soundEffects } from '../utils/audioFeedback';
export default function Home({ onStart, onNavigate, highScore }) {
  const handleStart = () => {
    soundEffects.playClick();
    onStart();
  };
  return (
    <div className="relative z-10 w-full min-h-[calc(100vh-140px)] flex flex-col justify-between">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 pt-12 pb-16 md:pt-20 md:pb-24 text-center">
        {/* Event Context Header */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-emerald-500/30 bg-emerald-950/30 text-emerald-300 font-mono text-xs uppercase tracking-wider mb-8">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span>SEASAW Cybersecurity Society · Live Case Simulation</span>
        </div>

        {/* Main Title & Tagline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 max-w-4xl mx-auto">
          THE INVISIBLE <span className="text-emerald-400">TRAIL</span>
        </h1>

        <p className="text-xl sm:text-2xl font-light text-slate-300 tracking-wide mb-4 max-w-2xl mx-auto">
          How Much Can a Stranger Learn?
        </p>

        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
          Every social post, campus check-in, and unfiltered photograph leaves a digital breadcrumb.
          Step into the role of a digital forensics detective to investigate a student&apos;s
          exposed online presence, uncover hidden metadata, and defend against real-world OSINT
          risks.
        </p>

        {/* Action Button Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={handleStart}
            className="w-full sm:w-auto px-8 py-3.5 bg-emerald-400 hover:bg-emerald-300 text-black font-semibold rounded text-sm sm:text-base transition-all duration-200 shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2.5 group"
          >
            <span>Start Investigation</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              onNavigate('leaderboard');
            }}
            className="w-full sm:w-auto px-6 py-3.5 bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-slate-700 font-medium rounded text-sm transition-all"
          >
            View Leaderboard
          </button>
        </div>

        {/* Unboxed Case Metrics (Anti-Slop Clean Typography) */}
        <div className="max-w-3xl mx-auto border-t border-b border-slate-800/80 py-4 px-6 flex flex-wrap items-center justify-around gap-6 text-xs text-slate-400 font-mono">
          <div>
            <span className="text-slate-500 block mb-0.5">SUBJECT</span>
            <span className="text-slate-200 font-medium">Ali Ahmed (Fictional)</span>
          </div>
          <span className="text-slate-700 hidden sm:inline" aria-hidden="true">
            /
          </span>
          <div>
            <span className="text-slate-500 block mb-0.5">INVESTIGATION ID</span>
            <span className="text-emerald-400 font-semibold">INV-2026-SEASAW-042</span>
          </div>
          <span className="text-slate-700 hidden sm:inline" aria-hidden="true">
            /
          </span>
          <div>
            <span className="text-slate-500 block mb-0.5">CHALLENGE MODULES</span>
            <span className="text-slate-200 font-medium">3 Forensics Tracks</span>
          </div>
          <span className="text-slate-700 hidden sm:inline" aria-hidden="true">
            /
          </span>
          <div>
            <span className="text-slate-500 block mb-0.5">LOCAL BEST</span>
            <span className="text-cyan-400 font-semibold tabular-nums">{highScore} PTS</span>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-16 border-t border-slate-800/60">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Investigation Workflow</h2>
          <p className="text-sm text-slate-400">
            Four interactive stages engineered to simulate realistic open-source intelligence
            (OSINT) collection and privacy threat modeling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded bg-[#0d1420] border border-slate-800/80 hover:border-emerald-500/40 transition-colors">
            <div className="w-10 h-10 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 font-mono font-bold text-sm">
              01
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Subject Dossier</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Examine the fictional case briefing for student Ali Ahmed. Understand his enrolled
              classes, habits, and digital profile.
            </p>
          </div>

          <div className="p-6 rounded bg-[#0d1420] border border-slate-800/80 hover:border-emerald-500/40 transition-colors">
            <div className="w-10 h-10 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 font-mono font-bold text-sm">
              02
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Footprint Detective</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Inspect 4 social media posts with visual clues. Identify schedule leaks, routine
              habits, ID barcodes, and absence broadcasts.
            </p>
          </div>

          <div className="p-6 rounded bg-[#0d1420] border border-slate-800/80 hover:border-cyan-500/40 transition-colors">
            <div className="w-10 h-10 rounded bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4 font-mono font-bold text-sm">
              03
            </div>
            <h3 className="text-base font-semibold text-white mb-2">The Metadata Trap</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Extract invisible EXIF data embedded in photos: precise GPS latitude/longitude,
              timestamp to the second, and camera hardware serials.
            </p>
          </div>

          <div className="p-6 rounded bg-[#0d1420] border border-slate-800/80 hover:border-amber-500/40 transition-colors">
            <div className="w-10 h-10 rounded bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 font-mono font-bold text-sm">
              04
            </div>
            <h3 className="text-base font-semibold text-white mb-2">Privacy Pressure</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tackle 6 realistic dilemmas involving live location sharing, app permissions, boarding
              passes, and suspicious direct messages.
            </p>
          </div>
        </div>
      </section>

      {/* Detective Gamification Ranks */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-12 border-t border-slate-800/60 mb-8">
        <div className="rounded-lg bg-gradient-to-r from-slate-900 via-[#0e1624] to-slate-900 border border-slate-800 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Earn Your Official Detective Rank</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Score points on every post analysis, metadata challenge, and privacy scenario to climb
              from <span className="text-slate-300 font-semibold">Beginner Investigator</span> all
              the way to <span className="text-emerald-400 font-semibold">Master Investigator</span>
              .
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-mono">
            <span className="px-2.5 py-1 bg-slate-800/90 border border-slate-700/80 text-slate-400 rounded">
              Beginner
            </span>
            <span className="px-2.5 py-1 bg-slate-800/90 border border-slate-700/80 text-slate-300 rounded">
              Detective
            </span>
            <span className="px-2.5 py-1 bg-slate-800/90 border border-slate-700/80 text-cyan-400 rounded">
              Analyst
            </span>
            <span className="px-2.5 py-1 bg-slate-800/90 border border-slate-700/80 text-emerald-400 rounded">
              Expert
            </span>
            <span className="px-2.5 py-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold rounded">
              Master
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
