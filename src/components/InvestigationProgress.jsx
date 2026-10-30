import { ShieldCheck, Award } from 'lucide-react';
export default function InvestigationProgress({
  currentScreen,
  onNavigate,
  footprintSolvedCount,
  totalFootprintPosts,
  metadataSolved,
  scenariosSolvedCount,
  totalScenarios,
  score,
  rankTitle,
}) {
  const stages = [
    {
      id: 'briefing',
      title: '01. Case Briefing',
      isComplete: footprintSolvedCount > 0 || currentScreen !== 'briefing',
      isActive: currentScreen === 'briefing',
    },
    {
      id: 'footprint',
      title: `02. Social Footprint (${footprintSolvedCount}/${totalFootprintPosts})`,
      isComplete: footprintSolvedCount === totalFootprintPosts,
      isActive: currentScreen === 'footprint',
    },
    {
      id: 'metadata',
      title: '03. Metadata Trap',
      isComplete: metadataSolved,
      isActive: currentScreen === 'metadata',
    },
    {
      id: 'scenarios',
      title: `04. Privacy Pressure (${scenariosSolvedCount}/${totalScenarios})`,
      isComplete: scenariosSolvedCount === totalScenarios,
      isActive: currentScreen === 'scenarios',
    },
    {
      id: 'results',
      title: '05. Forensic Report',
      isComplete: currentScreen === 'results' || currentScreen === 'leaderboard',
      isActive: currentScreen === 'results',
    },
  ];
  // Calculate overall percentage
  const totalTasks = totalFootprintPosts + 1 + totalScenarios;
  const completedTasks = footprintSolvedCount + (metadataSolved ? 1 : 0) + scenariosSolvedCount;
  const progressPercent = Math.min(100, Math.round((completedTasks / totalTasks) * 100));
  return (
    <div className="w-full bg-[#0b1018] border-b border-slate-800 px-4 sm:px-8 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Stages Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto py-1 text-xs">
          {stages.map((stage) => {
            return (
              <button
                key={stage.id}
                onClick={() => onNavigate(stage.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-all whitespace-nowrap shrink-0 border ${
                  stage.isActive
                    ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300 font-medium shadow-sm shadow-emerald-950'
                    : stage.isComplete
                      ? 'bg-slate-900 border-emerald-900/40 text-emerald-400/80 hover:border-emerald-700/60'
                      : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {stage.isComplete ? (
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${stage.isActive ? 'bg-emerald-400' : 'bg-slate-600'}`}
                  />
                )}
                <span>{stage.title}</span>
              </button>
            );
          })}
        </div>

        {/* Global Progress & Detective Rank Status */}
        <div className="flex items-center gap-4 text-xs font-mono shrink-0 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Rank:</span>
            <span className="text-emerald-400 font-semibold">{rankTitle}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-24 bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
              <div
                className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-slate-300 tabular-nums font-semibold">{progressPercent}%</span>
          </div>

          <div className="flex items-center gap-1.5 text-emerald-400 font-bold bg-slate-900/90 border border-slate-800 px-2.5 py-1 rounded">
            <Award className="w-3.5 h-3.5" />
            <span className="tabular-nums">{score} PTS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
