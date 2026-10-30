import { useState } from 'react';
import {
  Award,
  RotateCcw,
  Trophy,
  ShieldCheck,
  FileText,
  Printer,
  UserCheck,
  ArrowRight,
} from 'lucide-react';
import { soundEffects } from '../utils/audioFeedback';
export default function Results({
  score,
  maxScore,
  correctAnswersCount,
  totalQuestionsCount,
  footprintSolvedCount,
  footprintTotal,
  metadataSolvedCorrect,
  scenariosSolvedSafestCount,
  scenariosTotal,
  onReplay,
  onSaveToLeaderboard,
  onNavigate,
  isSavedToLeaderboard,
}) {
  const [nickname, setNickname] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(isSavedToLeaderboard);
  const accuracy = Math.round((correctAnswersCount / Math.max(1, totalQuestionsCount)) * 100);
  // Performance Rating & Detective Rank
  let rankTitle = 'Beginner Investigator';
  let rankColor = 'text-slate-300';
  let rankBorder = 'border-slate-700';
  let rankBg = 'bg-slate-900';
  let rankDescription =
    'You are beginning your digital footprint journey. Review exposed habits and credential handling to improve.';
  if (accuracy >= 90) {
    rankTitle = 'Master Investigator';
    rankColor = 'text-emerald-400';
    rankBorder = 'border-emerald-500/50';
    rankBg = 'bg-emerald-950/30';
    rankDescription =
      'Outstanding operational security acumen! You identified all critical leaks, decoded hidden EXIF forensic tags, and navigated high-stakes privacy pressures flawlessly.';
  } else if (accuracy >= 75) {
    rankTitle = 'Cybersecurity Expert';
    rankColor = 'text-cyan-400';
    rankBorder = 'border-cyan-500/50';
    rankBg = 'bg-cyan-950/30';
    rankDescription =
      'High-grade defense instincts. You neutralized almost all personal exposure threats and showed strong understanding of physical & digital footprint hazards.';
  } else if (accuracy >= 60) {
    rankTitle = 'Privacy Analyst';
    rankColor = 'text-amber-400';
    rankBorder = 'border-amber-500/50';
    rankBg = 'bg-amber-950/30';
    rankDescription =
      'Solid investigative foundation. With sharper attention to metadata leakage and barcode risks, you can eliminate remaining vulnerabilities.';
  } else if (accuracy >= 40) {
    rankTitle = 'Digital Detective';
    rankColor = 'text-blue-400';
    rankBorder = 'border-blue-500/50';
    rankBg = 'bg-blue-950/30';
    rankDescription =
      'Basic awareness demonstrated. Pay closer attention to routine schedules and travel absence disclosures.';
  }
  const handleSaveNickname = (e) => {
    e.preventDefault();
    if (!nickname.trim()) return;
    soundEffects.playBadgeUnlock();
    onSaveToLeaderboard(nickname.trim().slice(0, 16));
    setSaveSuccess(true);
  };
  const handlePrint = () => {
    soundEffects.playClick();
    window.print();
  };
  return (
    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 py-10">
      {/* Top Completion Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 font-mono text-xs uppercase tracking-widest mb-3">
          <ShieldCheck className="w-4 h-4" />
          <span>Case Investigation Concluded</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Final Investigation Report
        </h1>
        <p className="text-sm text-slate-400 mt-2">
          Case ID: <span className="font-mono text-slate-200">INV-2026-SEASAW-042</span> · Subject:{' '}
          <span className="text-slate-200">Ali Ahmed</span>
        </p>
      </div>

      {/* Detective Rank Card */}
      <div
        className={`p-8 rounded-lg border ${rankBorder} ${rankBg} shadow-2xl mb-8 text-center relative overflow-hidden`}
      >
        <div className="w-16 h-16 rounded-full bg-slate-900/80 border border-slate-700 flex items-center justify-center mx-auto mb-4 text-emerald-400 shadow-inner">
          <Award className="w-8 h-8" />
        </div>

        <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block mb-1">
          OFFICIAL DETECTIVE RANK AWARDED
        </span>
        <h2 className={`text-2xl sm:text-4xl font-extrabold tracking-tight mb-3 ${rankColor}`}>
          {rankTitle}
        </h2>
        <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">{rankDescription}</p>

        {/* Score & Accuracy Strip */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <span className="text-xs text-slate-400 font-mono block">TOTAL SCORE</span>
            <span className="text-2xl font-bold font-mono text-white tabular-nums">
              {score} <span className="text-xs text-slate-500 font-normal">/ {maxScore}</span>
            </span>
          </div>

          <div>
            <span className="text-xs text-slate-400 font-mono block">ACCURACY</span>
            <span className="text-2xl font-bold font-mono text-emerald-400 tabular-nums">
              {accuracy}%
            </span>
          </div>

          <div>
            <span className="text-xs text-slate-400 font-mono block">SOLVED ACCURATELY</span>
            <span className="text-2xl font-bold font-mono text-cyan-400 tabular-nums">
              {correctAnswersCount}{' '}
              <span className="text-xs text-slate-500 font-normal">/ {totalQuestionsCount}</span>
            </span>
          </div>

          <div>
            <span className="text-xs text-slate-400 font-mono block">STATUS</span>
            <span className="text-base font-bold font-mono text-emerald-400 block mt-1">
              CLEARED
            </span>
          </div>
        </div>
      </div>

      {/* Forensic Module Breakdown */}
      <div className="bg-[#0c121b] border border-slate-800 rounded-lg p-6 sm:p-8 shadow-xl mb-8 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
          <FileText className="w-4 h-4 text-emerald-400" />
          <span>Category Performance Breakdown</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          {/* Post Footprint */}
          <div className="p-4 rounded bg-[#101724] border border-slate-800 space-y-2">
            <span className="text-slate-400 block font-sans">01. Social Post Forensics</span>
            <div className="flex items-center justify-between text-base font-bold text-white">
              <span>
                {footprintSolvedCount} / {footprintTotal} Identified
              </span>
              <span className="text-emerald-400 font-normal text-xs">
                {Math.round((footprintSolvedCount / footprintTotal) * 100)}%
              </span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-400 h-full rounded-full"
                style={{ width: `${(footprintSolvedCount / footprintTotal) * 100}%` }}
              />
            </div>
          </div>

          {/* Metadata Trap */}
          <div className="p-4 rounded bg-[#101724] border border-slate-800 space-y-2">
            <span className="text-slate-400 block font-sans">02. EXIF Metadata Extraction</span>
            <div className="flex items-center justify-between text-base font-bold text-white">
              <span>{metadataSolvedCorrect ? '1 / 1 Solved' : '0 / 1 Pending'}</span>
              <span
                className={
                  metadataSolvedCorrect
                    ? 'text-cyan-400 font-normal text-xs'
                    : 'text-slate-500 text-xs'
                }
              >
                {metadataSolvedCorrect ? '100%' : '0%'}
              </span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-cyan-400 h-full rounded-full"
                style={{ width: metadataSolvedCorrect ? '100%' : '0%' }}
              />
            </div>
          </div>

          {/* Privacy Dilemmas */}
          <div className="p-4 rounded bg-[#101724] border border-slate-800 space-y-2">
            <span className="text-slate-400 block font-sans">03. Privacy Dilemma Judgement</span>
            <div className="flex items-center justify-between text-base font-bold text-white">
              <span>
                {scenariosSolvedSafestCount} / {scenariosTotal} Safest
              </span>
              <span className="text-amber-400 font-normal text-xs">
                {Math.round((scenariosSolvedSafestCount / scenariosTotal) * 100)}%
              </span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-amber-400 h-full rounded-full"
                style={{ width: `${(scenariosSolvedSafestCount / scenariosTotal) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Save Score to Leaderboard Strip */}
      <div className="bg-[#0c121b] border border-slate-800 rounded-lg p-6 sm:p-8 shadow-xl mb-8">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-2 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-emerald-400" />
          <span>Post Score to Local SEASAW Leaderboard</span>
        </h3>
        <p className="text-xs text-slate-400 mb-4 leading-relaxed">
          Enter an anonymous detective nickname to save your score to this browser&apos;s local
          leaderboard. No passwords or personal accounts required.
        </p>

        {saveSuccess ? (
          <div className="p-4 rounded bg-emerald-950/30 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-emerald-400" />
              <span>
                Score recorded successfully for <strong>{nickname || 'Detective'}</strong>!
              </span>
            </div>
            <button
              onClick={() => onNavigate('leaderboard')}
              className="px-4 py-1.5 rounded bg-emerald-500 text-black font-semibold text-xs hover:bg-emerald-400 transition-colors"
            >
              View Leaderboard
            </button>
          </div>
        ) : (
          <form onSubmit={handleSaveNickname} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Enter detective nickname (e.g. CyberFox)"
              value={nickname}
              maxLength={16}
              onChange={(e) => setNickname(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded bg-[#101724] border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-emerald-500 font-mono"
            />
            <button
              type="submit"
              disabled={!nickname.trim()}
              className={`px-6 py-2.5 rounded font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                nickname.trim()
                  ? 'bg-emerald-400 hover:bg-emerald-300 text-black shadow-md shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <span>Submit to Leaderboard</span>
            </button>
          </form>
        )}
      </div>

      {/* Action Buttons Strip */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
        <button
          onClick={onReplay}
          className="px-5 py-2.5 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Replay Investigation</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report</span>
          </button>

          <button
            onClick={() => onNavigate('leaderboard')}
            className="px-6 py-2.5 rounded bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-semibold flex items-center gap-2 transition-colors font-mono shadow-md shadow-emerald-500/20"
          >
            <span>Proceed to Leaderboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
