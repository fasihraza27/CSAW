import { useState } from 'react';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MapPin,
  CheckCircle2,
  XCircle,
  Lightbulb,
  ArrowLeft,
  ArrowRight,
  Search,
  Eye,
} from 'lucide-react';
import questionsData from '../data/footprintQuestions.json';
import { soundEffects } from '../utils/audioFeedback';
export default function FootprintInvestigation({
  onScoreUpdate,
  solvedPosts,
  onNextStage,
  onNavigate,
}) {
  const [activePostIndex, setActivePostIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showInspectorClues, setShowInspectorClues] = useState(false);
  const currentPost = questionsData[activePostIndex];
  const isPostSolved = Boolean(solvedPosts[currentPost.id]);
  const solvedState = solvedPosts[currentPost.id];
  const handleSelectOption = (idx) => {
    if (isPostSolved) return;
    soundEffects.playClick();
    setSelectedOption(idx);
  };
  const handleSubmitAnswer = () => {
    if (selectedOption === null || isPostSolved) return;
    const isCorrect = selectedOption === currentPost.correctIndex;
    const points = isCorrect ? currentPost.points : 0;
    if (isCorrect) {
      soundEffects.playCorrect();
    } else {
      soundEffects.playIncorrect();
    }
    onScoreUpdate(points, isCorrect, currentPost.id);
  };
  const handleNextPost = () => {
    soundEffects.playClick();
    if (activePostIndex < questionsData.length - 1) {
      setActivePostIndex(activePostIndex + 1);
      setSelectedOption(null);
      setShowInspectorClues(false);
    } else {
      onNextStage();
    }
  };
  const handlePrevPost = () => {
    soundEffects.playClick();
    if (activePostIndex > 0) {
      setActivePostIndex(activePostIndex - 1);
      setSelectedOption(null);
      setShowInspectorClues(false);
    }
  };
  const toggleInspectorClues = () => {
    soundEffects.playScan();
    setShowInspectorClues(!showInspectorClues);
  };
  const solvedCount = Object.keys(solvedPosts).length;
  const allSolved = solvedCount === questionsData.length;
  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 py-8">
      {/* Track Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block">
            STAGE 02 // RECONNAISSANCE FORENSICS
          </span>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Digital Footprint Detective
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Analyze Ali&apos;s public feed. Find hidden vulnerabilities in seemingly innocent
            updates.
          </p>
        </div>

        {/* Post Selection Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs font-medium">
          {questionsData.map((post, idx) => {
            const isSolved = Boolean(solvedPosts[post.id]);
            const solvedInfo = solvedPosts[post.id];
            return (
              <button
                key={post.id}
                onClick={() => {
                  soundEffects.playClick();
                  setActivePostIndex(idx);
                  setSelectedOption(null);
                }}
                className={`px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 ${
                  activePostIndex === idx
                    ? 'bg-emerald-500 text-black font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <span>Post {post.postNumber}</span>
                {isSolved &&
                  (solvedInfo.isCorrect ? (
                    <CheckCircle2
                      className={`w-3 h-3 ${activePostIndex === idx ? 'text-black' : 'text-emerald-400'}`}
                    />
                  ) : (
                    <XCircle
                      className={`w-3 h-3 ${activePostIndex === idx ? 'text-black' : 'text-rose-400'}`}
                    />
                  ))}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Realistic Fictional Social Media Card (lg:col-span-6) */}
        <div className="lg:col-span-6 bg-[#0c121b] border border-slate-800 rounded-lg overflow-hidden shadow-xl">
          {/* Social Post Top Bar */}
          <div className="p-4 border-b border-slate-800/80 flex items-center justify-between bg-[#0e1624]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-emerald-500/30 overflow-hidden">
                <img
                  src="/images/post_student_id_card_1793361231733.jpg"
                  alt="Ali avatar"
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white text-sm">{currentPost.author}</span>
                  <span className="text-xs text-slate-500">{currentPost.handle}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400/90 font-mono">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span>{currentPost.location}</span>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 font-mono">{currentPost.timestamp}</div>
          </div>

          {/* Social Post Photo & Interactive Hotspots */}
          <div className="relative bg-black group overflow-hidden">
            <img
              src={currentPost.image}
              alt={currentPost.title}
              className="w-full max-h-[380px] object-cover transition-transform duration-300 group-hover:scale-[1.01]"
              referrerPolicy="no-referrer"
            />

            {/* Simulated Clue Overlay Hotspots */}
            {showInspectorClues && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-xs p-4 flex flex-col justify-end transition-opacity duration-200">
                <div className="bg-[#0b1018]/95 border border-emerald-500/40 p-4 rounded text-xs space-y-2 shadow-2xl">
                  <div className="flex items-center justify-between font-mono text-emerald-400 font-bold border-b border-emerald-900/60 pb-1">
                    <span className="flex items-center gap-1.5">
                      <Search className="w-3.5 h-3.5" />
                      <span>FORENSIC CLUE ANALYSIS</span>
                    </span>
                    <span className="text-[10px] text-slate-400">OSINT INSPECTOR</span>
                  </div>
                  {currentPost.clueHotspots.map((clue, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-slate-300">
                      <span className="text-emerald-400 font-mono font-bold">[{idx + 1}]</span>
                      <div>
                        <strong className="text-white block">{clue.label}:</strong>
                        <span className="text-slate-400 text-[11px]">{clue.detail}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Forensic Inspection Toggle Button */}
            <button
              onClick={toggleInspectorClues}
              className={`absolute top-3 right-3 px-3 py-1.5 rounded text-xs font-mono font-medium flex items-center gap-1.5 backdrop-blur-md transition-all shadow-md ${
                showInspectorClues
                  ? 'bg-emerald-500 text-black border border-emerald-400 font-bold'
                  : 'bg-black/75 text-emerald-300 border border-emerald-500/30 hover:bg-black/90'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showInspectorClues ? 'Hide Clues' : 'Inspect Clues'}</span>
            </button>
          </div>

          {/* Social Post Actions & Caption */}
          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between text-slate-400">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-xs">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  <span className="tabular-nums font-mono text-[11px] text-slate-300">
                    {currentPost.likes}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <MessageCircle className="w-4 h-4" />
                  <span className="tabular-nums font-mono text-[11px] text-slate-300">
                    {currentPost.comments}
                  </span>
                </div>
                <Share2 className="w-4 h-4 hover:text-slate-200 cursor-pointer" />
              </div>
              <Bookmark className="w-4 h-4 hover:text-slate-200 cursor-pointer" />
            </div>

            <div className="text-xs text-slate-300 leading-relaxed bg-[#101724] p-3 rounded border border-slate-800">
              <span className="font-semibold text-white mr-2">{currentPost.author}</span>
              {currentPost.caption}
            </div>
          </div>
        </div>

        {/* Right Column: Detective Question & Forensic Analysis (lg:col-span-6) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-[#0c121b] border border-slate-800 rounded-lg p-6 shadow-xl">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold">
                  CASE CHALLENGE {currentPost.postNumber}/4
                </span>
                <span className="text-xs text-slate-400 font-mono">+{currentPost.points} PTS</span>
              </div>
              <span className="text-xs font-mono text-cyan-400">{currentPost.riskLevel}</span>
            </div>

            <h2 className="text-base font-semibold text-white mb-4 leading-snug">
              {currentPost.question}
            </h2>

            {/* Multiple Choice Options */}
            <div className="space-y-3 mb-6">
              {currentPost.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrectOption = idx === currentPost.correctIndex;
                let optionStyle =
                  'bg-[#101724] border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-[#131c2c]';
                if (isPostSolved) {
                  if (isCorrectOption) {
                    optionStyle =
                      'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-medium';
                  } else if (solvedState.selectedIndex === idx && !solvedState.isCorrect) {
                    optionStyle = 'bg-rose-950/40 border-rose-500 text-rose-200';
                  } else {
                    optionStyle = 'bg-[#101724]/60 border-slate-800/60 text-slate-500 opacity-60';
                  }
                } else if (isSelected) {
                  optionStyle =
                    'bg-emerald-950/40 border-emerald-500/80 text-emerald-100 font-medium';
                }
                return (
                  <button
                    key={idx}
                    disabled={isPostSolved}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-3.5 rounded border text-xs sm:text-sm transition-all flex items-start gap-3 ${optionStyle}`}
                  >
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-black/40 border border-slate-700/60 shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-relaxed flex-1">{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Submit Answer Action */}
            {!isPostSolved ? (
              <button
                disabled={selectedOption === null}
                onClick={handleSubmitAnswer}
                className={`w-full py-3 rounded font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
                  selectedOption !== null
                    ? 'bg-emerald-400 hover:bg-emerald-300 text-black shadow-md shadow-emerald-500/20'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <span>Evaluate Clue &amp; Lock In Answer</span>
              </button>
            ) : (
              /* Post Evaluation Result Callout */
              <div className="space-y-4 animate-in fade-in duration-300">
                <div
                  className={`p-4 rounded border flex items-start gap-3 ${
                    solvedState.isCorrect
                      ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                      : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                  }`}
                >
                  {solvedState.isCorrect ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-bold text-sm block mb-1">
                      {solvedState.isCorrect
                        ? `Correct Analysis! +${solvedState.pointsAwarded} Points Awarded`
                        : 'Incorrect Threat Assessment (0 Points)'}
                    </span>
                    <p className="text-xs leading-relaxed text-slate-300">
                      {currentPost.riskExplanation}
                    </p>
                  </div>
                </div>

                {/* Mitigation Advice */}
                <div className="p-4 rounded bg-[#101724] border border-cyan-500/30 text-xs text-slate-300 space-y-1.5">
                  <div className="flex items-center gap-2 font-mono text-cyan-400 font-bold">
                    <Lightbulb className="w-4 h-4 shrink-0" />
                    <span>CYBER DEFENSE &amp; MITIGATION PROTOCOL</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-xs">{currentPost.mitigation}</p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Controls Between Posts */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handlePrevPost}
              disabled={activePostIndex === 0}
              className={`px-4 py-2.5 rounded text-xs font-semibold border flex items-center gap-2 ${
                activePostIndex > 0
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                  : 'bg-slate-950 border-slate-900 text-slate-700 cursor-not-allowed'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Post</span>
            </button>

            {activePostIndex < questionsData.length - 1 ? (
              <button
                onClick={handleNextPost}
                className="px-5 py-2.5 rounded text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-2 transition-colors"
              >
                <span>Next Post (Post {activePostIndex + 2})</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={onNextStage}
                className="px-6 py-2.5 rounded text-xs font-semibold bg-emerald-400 hover:bg-emerald-300 text-black shadow-md shadow-emerald-500/20 flex items-center gap-2 transition-colors font-mono"
              >
                <span>Proceed to The Metadata Trap</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
