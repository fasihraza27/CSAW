import { useState, useEffect } from 'react';
import { Trophy, RotateCcw, Trash2, Info, ArrowLeft } from 'lucide-react';
import { soundEffects } from '../utils/audioFeedback';
const DEFAULT_SEEDED_LEADERBOARD = [
  {
    id: 'seed-1',
    nickname: 'CipherByte',
    score: 1650,
    accuracy: 100,
    rankTitle: 'Master Investigator',
    timestamp: 'Oct 30, 04:15',
  },
  {
    id: 'seed-2',
    nickname: 'ShadowFox',
    score: 1550,
    accuracy: 94,
    rankTitle: 'Master Investigator',
    timestamp: 'Oct 29, 21:40',
  },
  {
    id: 'seed-3',
    nickname: 'NullPointer',
    score: 1400,
    accuracy: 88,
    rankTitle: 'Cybersecurity Expert',
    timestamp: 'Oct 29, 18:22',
  },
  {
    id: 'seed-4',
    nickname: 'ByteHound',
    score: 1250,
    accuracy: 78,
    rankTitle: 'Cybersecurity Expert',
    timestamp: 'Oct 29, 14:05',
  },
  {
    id: 'seed-5',
    nickname: 'SEASAW_VP',
    score: 1050,
    accuracy: 67,
    rankTitle: 'Privacy Analyst',
    timestamp: 'Oct 28, 19:30',
  },
];
export default function Leaderboard({ onStartNewCase, onNavigate }) {
  const [entries, setEntries] = useState([]);
  useEffect(() => {
    try {
      const stored = localStorage.getItem('seasaw_invisible_trail_scores');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setEntries(parsed);
          return;
        }
      }
    } catch {
      // Fallback
    }
    // Seed default if empty
    setEntries(DEFAULT_SEEDED_LEADERBOARD);
    try {
      localStorage.setItem(
        'seasaw_invisible_trail_scores',
        JSON.stringify(DEFAULT_SEEDED_LEADERBOARD),
      );
    } catch {
      // The default leaderboard remains visible for this session.
    }
  }, []);
  const handleResetScores = () => {
    soundEffects.playClick();
    if (window.confirm('Reset local leaderboard to default society benchmark scores?')) {
      setEntries(DEFAULT_SEEDED_LEADERBOARD);
      try {
        localStorage.setItem(
          'seasaw_invisible_trail_scores',
          JSON.stringify(DEFAULT_SEEDED_LEADERBOARD),
        );
      } catch {
        // The visible leaderboard is still reset for this session.
      }
    }
  };
  return (
    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-950/30 border border-amber-500/30 text-amber-300 font-mono text-xs uppercase tracking-widest mb-3">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>University Detective Standings</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          SEASAW Leaderboard
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          Rankings based on investigative accuracy, metadata extraction speed, and OPSEC judgements.
        </p>
      </div>

      {/* Mandatory Local Storage Notice Callout */}
      <div className="mb-8 p-4 rounded bg-[#0e1624] border border-cyan-500/30 text-xs text-slate-300 flex items-start gap-3">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-cyan-300 block mb-0.5">LOCAL BROWSER STORAGE NOTICE</strong>
          Scores and nicknames are stored strictly in this browser&apos;s local storage. They are
          not synchronized across external devices or transmitted to third-party databases. Only
          pseudonymous handles are shown.
        </div>
      </div>

      {/* Leaderboard Table Container */}
      <div className="bg-[#0c121b] border border-slate-800 rounded-lg overflow-hidden shadow-2xl mb-8">
        <div className="p-4 bg-[#0e1624] border-b border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <span>INVESTIGATION ROSTER ({entries.length} DETECTIVES)</span>
          <span className="text-emerald-400">STATUS: VERIFIED</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-900/50 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4 text-center w-16">Rank</th>
                <th className="py-3.5 px-4">Detective Nickname</th>
                <th className="py-3.5 px-4">Rank Title</th>
                <th className="py-3.5 px-4 text-right">Accuracy</th>
                <th className="py-3.5 px-4 text-right">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs">
              {entries.map((entry, idx) => {
                const isTopThree = idx < 3;
                const isUser = entry.isCurrentUser;
                return (
                  <tr
                    key={entry.id || idx}
                    className={`transition-colors ${
                      isUser
                        ? 'bg-emerald-950/30 border-l-2 border-l-emerald-400 font-semibold'
                        : 'hover:bg-[#101724]'
                    }`}
                  >
                    {/* Rank Badge */}
                    <td className="py-3.5 px-4 text-center font-mono">
                      {idx === 0 ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 font-bold">
                          1
                        </span>
                      ) : idx === 1 ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-300/20 text-slate-200 border border-slate-300/40 font-bold">
                          2
                        </span>
                      ) : idx === 2 ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-amber-700/20 text-amber-500 border border-amber-700/40 font-bold">
                          3
                        </span>
                      ) : (
                        <span className="text-slate-400 tabular-nums">#{idx + 1}</span>
                      )}
                    </td>

                    {/* Nickname */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-white font-mono">{entry.nickname}</span>
                        {isUser && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-mono">
                            YOU
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono block">
                        Logged {entry.timestamp}
                      </span>
                    </td>

                    {/* Rank Title */}
                    <td className="py-3.5 px-4 font-mono text-slate-300">
                      <span
                        className={`text-xs ${
                          entry.rankTitle === 'Master Investigator'
                            ? 'text-emerald-400'
                            : entry.rankTitle === 'Cybersecurity Expert'
                              ? 'text-cyan-400'
                              : 'text-slate-300'
                        }`}
                      >
                        {entry.rankTitle}
                      </span>
                    </td>

                    {/* Accuracy */}
                    <td className="py-3.5 px-4 text-right font-mono text-slate-300 tabular-nums">
                      {entry.accuracy}%
                    </td>

                    {/* Score */}
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-emerald-400 tabular-nums text-sm">
                      {entry.score} PTS
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
        <button
          onClick={handleResetScores}
          className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1.5 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Reset Leaderboard Benchmarks</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundEffects.playClick();
              onNavigate('home');
            }}
            className="px-4 py-2.5 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Home</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              onStartNewCase();
            }}
            className="px-6 py-2.5 rounded bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-semibold flex items-center gap-2 transition-colors font-mono shadow-md shadow-emerald-500/20"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Start Fresh Investigation</span>
          </button>
        </div>
      </div>
    </div>
  );
}
