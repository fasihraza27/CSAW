import { Shield, Volume2, VolumeX, Award } from 'lucide-react';
import { soundEffects } from '../utils/audioFeedback';
export default function Navbar({ currentScreen, onNavigate, score, isMuted, onToggleMute }) {
  const handleNav = (screen) => {
    soundEffects.playClick();
    onNavigate(screen);
  };
  return (
    <header className="sticky top-0 z-50 w-full bg-[#080d16]/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-2.5 text-left text-white font-bold tracking-tight text-base sm:text-lg whitespace-nowrap shrink-0 hover:text-emerald-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded"
        >
          <div className="w-8 h-8 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Shield className="w-4 h-4" />
          </div>
          <span className="font-mono font-bold tracking-wider text-slate-100">
            THE INVISIBLE TRAIL
          </span>
        </button>

        {/* Zone 2: 4-5 Single-line Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-medium text-slate-300">
          <button
            onClick={() => handleNav('briefing')}
            className={`whitespace-nowrap shrink-0 hover:text-emerald-400 transition-colors ${currentScreen === 'briefing' ? 'text-emerald-400 font-semibold' : ''}`}
          >
            Briefing
          </button>
          <button
            onClick={() => handleNav('footprint')}
            className={`whitespace-nowrap shrink-0 hover:text-emerald-400 transition-colors ${currentScreen === 'footprint' ? 'text-emerald-400 font-semibold' : ''}`}
          >
            Footprint Detective
          </button>
          <button
            onClick={() => handleNav('metadata')}
            className={`whitespace-nowrap shrink-0 hover:text-emerald-400 transition-colors ${currentScreen === 'metadata' ? 'text-emerald-400 font-semibold' : ''}`}
          >
            Metadata Trap
          </button>
          <button
            onClick={() => handleNav('scenarios')}
            className={`whitespace-nowrap shrink-0 hover:text-emerald-400 transition-colors ${currentScreen === 'scenarios' ? 'text-emerald-400 font-semibold' : ''}`}
          >
            Privacy Challenges
          </button>
          <button
            onClick={() => handleNav('leaderboard')}
            className={`whitespace-nowrap shrink-0 hover:text-emerald-400 transition-colors ${currentScreen === 'leaderboard' ? 'text-emerald-400 font-semibold' : ''}`}
          >
            Leaderboard
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action Area */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onToggleMute}
            aria-label={isMuted ? 'Unmute forensic audio' : 'Mute forensic audio'}
            className="p-2 rounded border border-slate-800 bg-slate-900/60 text-slate-400 hover:text-emerald-400 hover:border-slate-700 transition-colors"
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded border border-emerald-500/30 bg-emerald-950/20 text-emerald-400 font-mono text-xs font-semibold whitespace-nowrap">
            <Award className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="tabular-nums">{score} PTS</span>
          </div>

          {currentScreen === 'home' ? (
            <button
              onClick={() => handleNav('briefing')}
              className="px-3.5 py-1.5 text-xs font-semibold text-black bg-emerald-400 hover:bg-emerald-300 rounded transition-colors whitespace-nowrap shrink-0 shadow-sm shadow-emerald-500/20"
            >
              Start Investigation
            </button>
          ) : (
            <button
              onClick={() => handleNav('results')}
              className="px-3 py-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded transition-colors whitespace-nowrap shrink-0 border border-slate-700/60"
            >
              Case Report
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
