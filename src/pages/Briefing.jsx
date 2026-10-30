import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Clock,
  Coffee,
  Laptop,
} from 'lucide-react';
import profileData from '../data/profile.json';
import { soundEffects } from '../utils/audioFeedback';
export default function Briefing({ onStartCase }) {
  const handleStart = () => {
    soundEffects.playClick();
    onStartCase();
  };
  return (
    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 py-10">
      {/* Disclaimer Banner */}
      <div className="mb-8 p-4 rounded bg-amber-950/30 border border-amber-600/40 text-amber-200/90 text-xs sm:text-sm flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold block text-amber-300 mb-0.5">
            MANDATORY FICTIONAL CASE DISCLAIMER
          </span>
          <p className="text-amber-200/80 leading-relaxed text-xs">
            All persons, identities, universities, posts, metadata, and locations in this
            investigation are 100% fictional. Engineered specifically for the SEASAW University
            Cybersecurity Society to demonstrate how OSINT (Open Source Intelligence) techniques are
            used to analyze real-world personal exposure. No real student accounts or credentials
            are ever accessed.
          </p>
        </div>
      </div>

      {/* Case Header Dossier */}
      <div className="bg-[#0b1018] border border-slate-800 rounded-lg overflow-hidden mb-8 shadow-xl">
        <div className="bg-[#0e1624] px-6 py-4 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest block">
                {profileData.classification}
              </span>
              <h1 className="text-xl font-bold text-white tracking-tight">
                Investigation Briefing: {profileData.caseId}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="text-slate-400">STATUS:</span>
            <span className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded font-semibold">
              ACTIVE RECONNAISSANCE
            </span>
          </div>
        </div>

        {/* Subject Information Grid */}
        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Subject Card */}
          <div className="md:col-span-1 bg-[#101724] border border-slate-800 rounded p-6 flex flex-col items-center text-center">
            {/* Subject Avatar */}
            <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4 overflow-hidden relative">
              <img
                src="/images/post_student_id_card_1793361231733.jpg"
                alt="Subject Ali Ahmed"
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>

            <h2 className="text-lg font-bold text-white mb-0.5">{profileData.subject.name}</h2>
            <span className="text-xs text-emerald-400 font-mono mb-3">
              {profileData.subject.handles.social}
            </span>

            <div className="w-full border-t border-slate-800/80 pt-4 text-xs text-left space-y-2 text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Institution:</span>
                <span className="font-medium text-slate-200">
                  {profileData.subject.institution}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Major:</span>
                <span className="font-medium text-slate-200">{profileData.subject.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Student ID:</span>
                <span className="font-mono text-emerald-300">{profileData.subject.studentId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Age:</span>
                <span className="font-mono text-slate-200">{profileData.subject.age}</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-slate-900/80 border border-slate-800 rounded w-full text-[11px] text-slate-400 italic text-left">
              &quot;{profileData.subject.bio}&quot;
            </div>
          </div>

          {/* Case Narrative & Objectives */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2 font-mono flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>The Case Context</span>
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Like millions of university students, Ali frequently posts updates about his daily
                college life: morning lectures, favourite local coffee shops, study sessions, and
                weekend adventures. He assumes that because his accounts are just for friends, there
                is nothing hazardous about these casual updates.
              </p>
              <p className="text-sm text-slate-300 leading-relaxed mt-2">
                Your role as the SEASAW Forensic Detective is to examine his public digital
                footprint. Can an adversary construct his daily timetable? Can someone determine
                when his room is vacant or replicate his lab pass? Let&apos;s find out.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Investigative Objectives</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-300">
                {profileData.objectives.map((obj, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded bg-slate-900/60 border border-slate-800 flex items-start gap-2.5"
                  >
                    <span className="text-emerald-400 font-mono font-bold mt-0.5">0{idx + 1}.</span>
                    <span>{obj}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Subject Habits Indicators */}
            <div className="p-4 rounded bg-slate-900/40 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Predictable 8 AM Lecture Schedule</span>
              </div>
              <div className="flex items-center gap-2">
                <Coffee className="w-4 h-4 text-amber-400" />
                <span>Weekly Wednesday Study Café Habit</span>
              </div>
              <div className="flex items-center gap-2">
                <Laptop className="w-4 h-4 text-emerald-400" />
                <span>CS Lab Access Badge Holder</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="bg-[#0e1624] px-6 py-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            Clicking <strong className="text-slate-200">Start Case Investigation</strong> will enter
            the Social Footprint Detective terminal.
          </div>

          <button
            onClick={handleStart}
            className="w-full sm:w-auto px-6 py-2.5 bg-emerald-400 hover:bg-emerald-300 text-black font-semibold rounded text-sm transition-all duration-200 shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 group"
          >
            <span>Start Case Investigation</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
