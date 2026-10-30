import { useState } from 'react';
import { CheckCircle2, AlertTriangle, ArrowLeft, ArrowRight } from 'lucide-react';
import scenariosData from '../data/privacyScenarios.json';
import { soundEffects } from '../utils/audioFeedback';
export default function PrivacyChallenges({
  onScoreUpdate,
  solvedScenarios,
  onFinishCase,
  onNavigate,
}) {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const scenario = scenariosData[currentScenarioIndex];
  const isSolved = Boolean(solvedScenarios[scenario.id]);
  const solvedState = solvedScenarios[scenario.id];
  const handleSelectOption = (optionId) => {
    if (isSolved) return;
    soundEffects.playClick();
    setSelectedOptionId(optionId);
  };
  const handleSubmitAction = () => {
    if (selectedOptionId === null || isSolved) return;
    const chosenOption = scenario.options.find((o) => o.id === selectedOptionId);
    if (!chosenOption) return;
    const isSafest = chosenOption.isSafest;
    const points = chosenOption.score;
    if (isSafest) {
      soundEffects.playCorrect();
    } else {
      soundEffects.playIncorrect();
    }
    onScoreUpdate(points, isSafest, scenario.id);
  };
  const handleNext = () => {
    soundEffects.playClick();
    if (currentScenarioIndex < scenariosData.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
      setSelectedOptionId(null);
    } else {
      onFinishCase();
    }
  };
  const handlePrev = () => {
    soundEffects.playClick();
    if (currentScenarioIndex > 0) {
      setCurrentScenarioIndex(currentScenarioIndex - 1);
      setSelectedOptionId(null);
    }
  };
  const solvedCount = Object.keys(solvedScenarios).length;
  const allSolved = solvedCount === scenariosData.length;
  return (
    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 py-8">
      {/* Track Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block">
            STAGE 04 // OPERATIONAL SECURITY DILEMMAS
          </span>
          <h1 className="text-2xl font-bold text-white tracking-tight">Privacy Under Pressure</h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-world decisions where social convenience collides with personal cybersecurity.
            Choose the safest move.
          </p>
        </div>

        {/* Scenarios mini navigation tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono">
          {scenariosData.map((s, idx) => {
            const isScenSolved = Boolean(solvedScenarios[s.id]);
            const isCurrent = currentScenarioIndex === idx;
            return (
              <button
                key={s.id}
                onClick={() => {
                  soundEffects.playClick();
                  setCurrentScenarioIndex(idx);
                  setSelectedOptionId(null);
                }}
                className={`w-7 h-7 rounded flex items-center justify-center transition-colors ${
                  isCurrent
                    ? 'bg-amber-400 text-black font-bold'
                    : isScenSolved
                      ? solvedScenarios[s.id].isSafest
                        ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-400'
                        : 'bg-rose-950/60 border border-rose-500/40 text-rose-400'
                      : 'text-slate-400 hover:text-slate-200'
                }`}
                title={`Scenario ${idx + 1}: ${s.title}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Scenario Box */}
      <div className="bg-[#0c121b] border border-slate-800 rounded-lg overflow-hidden shadow-2xl mb-8">
        {/* Header Bar */}
        <div className="p-4 bg-[#0e1624] border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold">
              SCENARIO {currentScenarioIndex + 1} OF {scenariosData.length}
            </span>
            <span className="text-xs font-mono text-slate-400">· {scenario.category}</span>
          </div>

          <span className="text-xs font-mono text-emerald-400 font-semibold">MAX +150 PTS</span>
        </div>

        {/* Dilemma Narrative */}
        <div className="p-6 sm:p-8 border-b border-slate-800/80 bg-gradient-to-b from-[#0c121b] to-[#090e17]">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-3">{scenario.title}</h2>
          <div className="p-4 rounded bg-[#101724] border border-slate-800 text-slate-200 text-sm leading-relaxed">
            {scenario.context}
          </div>
        </div>

        {/* Options List */}
        <div className="p-6 sm:p-8 space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
            Select Your Course of Action:
          </h3>

          <div className="space-y-3">
            {scenario.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              let optStyle =
                'bg-[#101724] border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-[#131c2c]';
              if (isSolved && solvedState) {
                if (opt.isSafest) {
                  optStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-medium';
                } else if (solvedState.selectedOptionId === opt.id && !solvedState.isSafest) {
                  optStyle = 'bg-rose-950/40 border-rose-500 text-rose-200';
                } else {
                  optStyle = 'bg-[#101724]/60 border-slate-800/60 text-slate-500 opacity-60';
                }
              } else if (isSelected) {
                optStyle = 'bg-amber-950/40 border-amber-500/80 text-amber-100 font-medium';
              }
              return (
                <button
                  key={opt.id}
                  disabled={isSolved}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`w-full text-left p-4 rounded border text-xs sm:text-sm transition-all flex items-start gap-3 ${optStyle}`}
                >
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-black/40 border border-slate-700/60 shrink-0 mt-0.5 uppercase">
                    {opt.id}
                  </span>
                  <div className="flex-1">
                    <span className="leading-relaxed block">{opt.text}</span>
                    {isSolved && (
                      <span className="block mt-2 text-xs text-slate-400 italic">
                        {opt.feedback}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Action Button or Outcome Callout */}
          {!isSolved ? (
            <button
              disabled={selectedOptionId === null}
              onClick={handleSubmitAction}
              className={`w-full py-3 mt-4 rounded font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                selectedOptionId !== null
                  ? 'bg-amber-400 hover:bg-amber-300 text-black shadow-md shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <span>Execute Action Protocol</span>
            </button>
          ) : (
            <div className="pt-4 space-y-4 animate-in fade-in duration-300">
              <div
                className={`p-4 rounded border flex items-start gap-3 ${
                  solvedState.isSafest
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                    : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                }`}
              >
                {solvedState.isSafest ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="font-bold text-sm block mb-1">
                    {solvedState.isSafest
                      ? `Optimal Cybersecurity Decision! +${solvedState.pointsAwarded} PTS`
                      : `Compromised Security Vector (+${solvedState.pointsAwarded} PTS)`}
                  </span>
                  <p className="text-xs leading-relaxed text-slate-300">{scenario.takeaway}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handlePrev}
          disabled={currentScenarioIndex === 0}
          className={`px-4 py-2.5 rounded text-xs font-semibold border flex items-center gap-2 ${
            currentScenarioIndex > 0
              ? 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
              : 'bg-slate-950 border-slate-900 text-slate-700 cursor-not-allowed'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous Scenario</span>
        </button>

        {currentScenarioIndex < scenariosData.length - 1 ? (
          <button
            onClick={handleNext}
            className="px-5 py-2.5 rounded text-xs font-semibold bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-2 transition-colors"
          >
            <span>
              Next Scenario ({currentScenarioIndex + 2}/{scenariosData.length})
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={onFinishCase}
            className="px-6 py-2.5 rounded text-xs font-semibold bg-emerald-400 hover:bg-emerald-300 text-black shadow-md shadow-emerald-500/20 flex items-center gap-2 transition-colors font-mono"
          >
            <span>Finalize Investigation &amp; Generate Report</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
