import { useState, useRef, useEffect } from 'react';
import {
  Scan,
  MapPin,
  Camera,
  FileCode,
  CheckCircle2,
  XCircle,
  ShieldCheck,
  ArrowRight,
  Compass,
  Layers,
} from 'lucide-react';
import metadataData from '../data/metadataData.json';
import { soundEffects } from '../utils/audioFeedback';
export default function MetadataTrap({ onScoreUpdate, isSolved, solvedState, onNextStage }) {
  const [isRevealed, setIsRevealed] = useState(isSolved);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const mapCanvasRef = useRef(null);
  // Radar / Coordinate Map Animation on Canvas
  useEffect(() => {
    if (!isRevealed) return;
    const canvas = mapCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId;
    let angle = 0;
    const w = (canvas.width = 320);
    const h = (canvas.height = 200);
    const renderMap = () => {
      ctx.fillStyle = '#090e17';
      ctx.fillRect(0, 0, w, h);
      // Draw grid lines
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.15)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      // Draw concentric radar rings around center
      const cx = w / 2;
      const cy = h / 2;
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.25)';
      [25, 55, 85].forEach((r) => {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      });
      // Rotating radar beam
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      const gradient = ctx.createLinearGradient(0, 0, 90, 0);
      gradient.addColorStop(0, 'rgba(16, 185, 129, 0.4)');
      gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, 90, 0, Math.PI / 4);
      ctx.lineTo(0, 0);
      ctx.fill();
      ctx.restore();
      // Pinpoint Target Marker (Fictional Campus Quad)
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fill();
      // Pulsing beacon ring
      const pulseRadius = (Date.now() / 25) % 35;
      ctx.strokeStyle = `rgba(16, 185, 129, ${1 - pulseRadius / 35})`;
      ctx.beginPath();
      ctx.arc(cx, cy, pulseRadius, 0, Math.PI * 2);
      ctx.stroke();
      // Crosshairs
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - 10, cy);
      ctx.lineTo(cx + 10, cy);
      ctx.moveTo(cx, cy - 10);
      ctx.lineTo(cx, cy + 10);
      ctx.stroke();
      angle += 0.03;
      animId = requestAnimationFrame(renderMap);
    };
    renderMap();
    return () => cancelAnimationFrame(animId);
  }, [isRevealed]);
  const handleRevealMetadata = () => {
    soundEffects.playScan();
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setIsRevealed(true);
      soundEffects.playCorrect();
    }, 800);
  };
  const handleSelectOption = (idx) => {
    if (isSolved) return;
    soundEffects.playClick();
    setSelectedOption(idx);
  };
  const handleSubmitChallenge = () => {
    if (selectedOption === null || isSolved) return;
    const isCorrect = selectedOption === metadataData.challengeQuestion.correctIndex;
    const points = isCorrect ? metadataData.challengeQuestion.points : 0;
    if (isCorrect) {
      soundEffects.playCorrect();
    } else {
      soundEffects.playIncorrect();
    }
    onScoreUpdate(points, isCorrect, 'metadata-challenge');
  };
  return (
    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">
            STAGE 03 // FORENSIC EXIF INSPECTION
          </span>
          <h1 className="text-2xl font-bold text-white tracking-tight">The Metadata Trap</h1>
          <p className="text-xs text-slate-400 mt-1">
            Exchangeable Image File Format (EXIF) can silently turn a harmless picture into an exact
            geolocation tracker.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-slate-900 border border-slate-800 text-xs font-mono">
          <span className="text-slate-400">CHALLENGE:</span>
          <span className="text-cyan-400 font-semibold">
            +{metadataData.challengeQuestion.points} PTS
          </span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
        {/* Sample Image Slot & Scanner */}
        <div className="lg:col-span-5 bg-[#0c121b] border border-slate-800 rounded-lg overflow-hidden shadow-xl">
          <div className="p-3 bg-[#0e1624] border-b border-slate-800 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-300 flex items-center gap-2">
              <Camera className="w-3.5 h-3.5 text-cyan-400" />
              <span>{metadataData.filename}</span>
            </span>
            <span className="text-slate-500">{metadataData.fileSize}</span>
          </div>

          <div className="relative bg-black group overflow-hidden">
            <img
              src={metadataData.sampleImage}
              alt="Campus Quad Sample for EXIF"
              className="w-full max-h-[300px] object-cover"
              referrerPolicy="no-referrer"
            />

            {/* Scanning line animation */}
            {isScanning && (
              <div className="absolute inset-0 bg-emerald-500/10 pointer-events-none">
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-lg shadow-emerald-400 animate-pulse transition-all duration-300 translate-y-24" />
              </div>
            )}

            {!isRevealed && !isScanning && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-xs flex flex-col items-center justify-center p-6 text-center">
                <Scan className="w-10 h-10 text-cyan-400 mb-3 animate-pulse" />
                <h3 className="text-sm font-semibold text-white mb-1">Prepared EXIF Dataset</h3>
                <p className="text-xs text-slate-400 max-w-xs mb-4">
                  This case uses a prepared, fictional EXIF dataset. The image is illustrative; the values revealed below are simulated.
                </p>
                <button
                  onClick={handleRevealMetadata}
                  className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded text-xs transition-all shadow-md shadow-cyan-500/20 flex items-center gap-2"
                >
                  <Scan className="w-4 h-4" />
                  <span>Reveal Metadata</span>
                </button>
              </div>
            )}
          </div>

          {/* Interactive Radar Visualizer */}
          {isRevealed && (
            <div className="p-4 border-t border-slate-800 bg-[#080d15] space-y-3">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-400 flex items-center gap-1.5 font-semibold">
                  <Compass className="w-3.5 h-3.5" />
                  <span>SIMULATED GPS RADAR LOCATOR</span>
                </span>
                <span className="text-[11px] text-cyan-400">TARGET ACQUIRED</span>
              </div>

              <div className="w-full rounded overflow-hidden border border-slate-800/80 bg-black flex justify-center">
                <canvas ref={mapCanvasRef} className="w-full max-w-[320px] h-[160px]" />
              </div>

              <div className="p-2.5 bg-slate-900/80 rounded border border-slate-800 text-[11px] font-mono text-slate-300 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                  <span>51.5246° N, 0.1340° W</span>
                </div>
                <span className="text-slate-400">Campus Quad Walkway</span>
              </div>
            </div>
          )}
        </div>

        {/* Revealed EXIF Tags & Forensic Inspector */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-cyan-950/20 border border-cyan-500/30 rounded-lg p-3 text-xs text-cyan-100 leading-relaxed">
            {metadataData.demoNotice}
          </div>
          <div className="bg-[#0c121b] border border-slate-800 rounded-lg p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-cyan-400" />
                <h2 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  Simulated EXIF Data
                </h2>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                {isRevealed ? 'Sample Data Revealed' : 'Hidden'}
              </span>
            </div>

            {isRevealed ? (
              <div className="space-y-4 max-h-[360px] overflow-y-auto pr-2">
                {metadataData.exifTags.map((category, catIdx) => (
                  <div key={catIdx} className="space-y-2">
                    <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                      {category.category}
                    </span>
                    <div className="space-y-1.5">
                      {category.items.map((item, itemIdx) => (
                        <div
                          key={itemIdx}
                          className="p-2.5 rounded bg-[#101724] border border-slate-800 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 hover:border-slate-700 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-slate-400 font-mono">{item.key}:</span>
                            <span className="font-semibold text-slate-200 font-mono">
                              {item.value}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 text-[11px]">
                            <span
                              className={`px-1.5 py-0.5 rounded font-mono font-semibold ${
                                item.risk === 'Critical'
                                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                  : item.risk === 'High'
                                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                    : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              {item.risk} Risk
                            </span>
                            <span className="text-slate-500 hidden sm:inline">·</span>
                            <span className="text-slate-400">{item.note}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-16 text-center space-y-3">
                <Layers className="w-10 h-10 text-slate-600 mx-auto" />
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Click <strong className="text-cyan-400">&apos;Reveal Metadata&apos;</strong> to view the fictional EXIF values prepared for this case. They are not extracted from the image file.
                </p>
              </div>
            )}
          </div>

          {/* Platform Handling Truth Matrix */}
          <div className="bg-[#0c121b] border border-slate-800 rounded-lg p-5">
            <h3 className="text-xs font-bold text-slate-200 font-mono uppercase tracking-wider mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Platform EXIF Scrubbing Realities</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {metadataData.platformHandling.map((plat, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded bg-[#101724] border border-slate-800 space-y-1"
                >
                  <div className="flex items-center justify-between font-semibold text-white">
                    <span className="truncate pr-2">{plat.platform.split('(')[0]}</span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        plat.riskStatus === 'Protected on Public Feed'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {plat.riskStatus}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{plat.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Forensic Challenge Question */}
      <div className="bg-[#0c121b] border border-slate-800 rounded-lg p-6 shadow-xl mb-8">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono font-bold">
            STAGE 03 CHALLENGE
          </span>
          <span className="text-xs text-slate-400 font-mono">Hardware &amp; Serial Forensics</span>
        </div>

        <h3 className="text-base font-semibold text-white mb-4">
          {metadataData.challengeQuestion.question}
        </h3>

        <div className="space-y-3 mb-6">
          {metadataData.challengeQuestion.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrectOption = idx === metadataData.challengeQuestion.correctIndex;
            let optStyle =
              'bg-[#101724] border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-[#131c2c]';
            if (isSolved && solvedState) {
              if (isCorrectOption) {
                optStyle = 'bg-emerald-950/40 border-emerald-500 text-emerald-200 font-medium';
              } else if (solvedState.selectedIndex === idx && !solvedState.isCorrect) {
                optStyle = 'bg-rose-950/40 border-rose-500 text-rose-200';
              } else {
                optStyle = 'bg-[#101724]/60 border-slate-800/60 text-slate-500 opacity-60';
              }
            } else if (isSelected) {
              optStyle = 'bg-cyan-950/40 border-cyan-500/80 text-cyan-100 font-medium';
            }
            return (
              <button
                key={idx}
                disabled={isSolved}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-3.5 rounded border text-xs sm:text-sm transition-all flex items-start gap-3 ${optStyle}`}
              >
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-black/40 border border-slate-700/60 shrink-0 mt-0.5">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="leading-relaxed flex-1">{opt}</span>
              </button>
            );
          })}
        </div>

        {!isSolved ? (
          <button
            disabled={selectedOption === null}
            onClick={handleSubmitChallenge}
            className={`w-full py-3 rounded font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 ${
              selectedOption !== null
                ? 'bg-cyan-400 hover:bg-cyan-300 text-black shadow-md shadow-cyan-500/20'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <span>Lock In Forensic Deduction</span>
          </button>
        ) : (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div
              className={`p-4 rounded border flex items-start gap-3 ${
                solvedState?.isCorrect
                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                  : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
              }`}
            >
              {solvedState?.isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div>
                <span className="font-bold text-sm block mb-1">
                  {solvedState?.isCorrect
                    ? `Forensic Analysis Confirmed! +${solvedState.pointsAwarded} Points`
                    : 'Incorrect Assessment (0 Points)'}
                </span>
                <p className="text-xs leading-relaxed text-slate-300">
                  {metadataData.challengeQuestion.explanation}
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded bg-[#101724] border border-cyan-500/30 text-xs text-slate-300">
              <span className="font-semibold text-cyan-300 block mb-1">
                Defense Recommendation:
              </span>
              <p className="text-slate-400 text-xs leading-relaxed">
                {metadataData.challengeQuestion.mitigation}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="flex justify-end">
        <button
          onClick={onNextStage}
          className="px-6 py-2.5 rounded text-xs font-semibold bg-emerald-400 hover:bg-emerald-300 text-black shadow-md shadow-emerald-500/20 flex items-center gap-2 transition-colors font-mono"
        >
          <span>Advance to Privacy Under Pressure</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
