import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DigitalCanvas from './components/DigitalCanvas';
import InvestigationProgress from './components/InvestigationProgress';
import Home from './pages/Home';
import Briefing from './pages/Briefing';
import FootprintInvestigation from './pages/FootprintInvestigation';
import MetadataTrap from './pages/MetadataTrap';
import PrivacyChallenges from './pages/PrivacyChallenges';
import Results from './pages/Results';
import Leaderboard from './pages/Leaderboard';
import questionsData from './data/footprintQuestions.json';
import metadataData from './data/metadataData.json';
import scenariosData from './data/privacyScenarios.json';
import { soundEffects } from './utils/audioFeedback';
export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [score, setScore] = useState(0);
  const [isMuted, setIsMuted] = useState(soundEffects.isMuted());
  const [isSavedToLeaderboard, setIsSavedToLeaderboard] = useState(false);
  const [highScore, setHighScore] = useState(0);
  // Solved state tracking
  const [solvedPosts, setSolvedPosts] = useState({});
  const [metadataSolved, setMetadataSolved] = useState(false);
  const [metadataSolvedState, setMetadataSolvedState] = useState(undefined);
  const [solvedScenarios, setSolvedScenarios] = useState({});
  // Achievement toast message
  const [toastMessage, setToastMessage] = useState(null);
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };
  // Load highest local score
  useEffect(() => {
    try {
      const stored = localStorage.getItem('seasaw_invisible_trail_scores');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const max = Math.max(...parsed.map((p) => p.score || 0));
          setHighScore(max);
        }
      }
    } catch {
      // Ignored
    }
  }, []);
  const handleToggleMute = () => {
    const muted = soundEffects.toggleMute();
    setIsMuted(muted);
  };
  // Footprint score handler
  const handleFootprintScore = (points, isCorrect, postId) => {
    if (solvedPosts[postId]) return;
    const postItem = questionsData.find((q) => q.id === postId);
    if (!postItem) return;
    const newSolved = {
      ...solvedPosts,
      [postId]: {
        selectedIndex: isCorrect ? postItem.correctIndex : 999,
        isCorrect,
        pointsAwarded: points,
      },
    };
    setSolvedPosts(newSolved);
    setScore((prev) => prev + points);
    if (Object.keys(newSolved).length === 1) {
      showToast('Achievement Unlocked: First Clue Uncovered (+50 bonus awareness)');
    } else if (Object.keys(newSolved).length === questionsData.length) {
      showToast('Footprint Complete: All 4 social posts analyzed!');
    }
  };
  // Metadata score handler
  const handleMetadataScore = (points, isCorrect) => {
    if (metadataSolved) return;
    setMetadataSolved(true);
    setMetadataSolvedState({
      selectedIndex: isCorrect ? metadataData.challengeQuestion.correctIndex : 999,
      isCorrect,
      pointsAwarded: points,
    });
    setScore((prev) => prev + points);
    showToast('Achievement Unlocked: EXIF Forensics Specialist');
  };
  // Scenario score handler
  const handleScenarioScore = (points, isSafest, scenarioId) => {
    if (solvedScenarios[scenarioId]) return;
    const scen = scenariosData.find((s) => s.id === scenarioId);
    if (!scen) return;
    const newScenarios = {
      ...solvedScenarios,
      [scenarioId]: {
        selectedOptionId: isSafest ? scen.options.find((o) => o.isSafest)?.id || '' : '',
        isSafest,
        pointsAwarded: points,
      },
    };
    setSolvedScenarios(newScenarios);
    setScore((prev) => prev + points);
    if (Object.keys(newScenarios).length === scenariosData.length) {
      showToast('Dilemmas Cleared: Ready for Final Investigation Report!');
    }
  };
  // Calculate totals
  const totalQuestions = questionsData.length + 1 + scenariosData.length; // 4 + 1 + 6 = 11 questions
  const footprintCorrectCount = Object.values(solvedPosts).filter((p) => p.isCorrect).length;
  const metadataCorrectCount = metadataSolvedState?.isCorrect ? 1 : 0;
  const scenariosCorrectCount = Object.values(solvedScenarios).filter((s) => s.isSafest).length;
  const totalCorrect = footprintCorrectCount + metadataCorrectCount + scenariosCorrectCount;
  // Maximum possible score
  const maxScore =
    questionsData.reduce((acc, q) => acc + q.points, 0) +
    metadataData.challengeQuestion.points +
    scenariosData.reduce((acc, s) => acc + (s.options.find((o) => o.isSafest)?.score || 150), 0);
  // Compute Detective Rank title
  const accuracy = Math.round((totalCorrect / totalQuestions) * 100);
  let rankTitle = 'Beginner Investigator';
  if (accuracy >= 90) rankTitle = 'Master Investigator';
  else if (accuracy >= 75) rankTitle = 'Cybersecurity Expert';
  else if (accuracy >= 60) rankTitle = 'Privacy Analyst';
  else if (accuracy >= 40) rankTitle = 'Digital Detective';
  // Save score to leaderboard
  const handleSaveToLeaderboard = (nickname) => {
    try {
      const stored = localStorage.getItem('seasaw_invisible_trail_scores');
      let list = stored ? JSON.parse(stored) : [];
      const newEntry = {
        id: `user-${Date.now()}`,
        nickname,
        score,
        accuracy,
        rankTitle,
        timestamp: 'Just now',
        isCurrentUser: true,
      };
      list.push(newEntry);
      list.sort((a, b) => b.score - a.score);
      localStorage.setItem('seasaw_invisible_trail_scores', JSON.stringify(list));
      setIsSavedToLeaderboard(true);
      if (score > highScore) {
        setHighScore(score);
      }
    } catch {
      // Ignored
    }
  };
  // Reset / Replay
  const handleResetInvestigation = () => {
    setScore(0);
    setSolvedPosts({});
    setMetadataSolved(false);
    setMetadataSolvedState(undefined);
    setSolvedScenarios({});
    setIsSavedToLeaderboard(false);
    setCurrentScreen('briefing');
    soundEffects.playClick();
  };
  const handleNavigate = (screen) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 flex flex-col justify-between selection:bg-emerald-500/30 selection:text-emerald-300 relative">
      {/* Background Interactive Cyber Particle Canvas */}
      <DigitalCanvas />

      {/* Top Bar Contract Navigation */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        score={score}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Breadcrumb / HUD Progress (Visible once briefing begins) */}
      {currentScreen !== 'home' && currentScreen !== 'leaderboard' && (
        <InvestigationProgress
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          footprintSolvedCount={Object.keys(solvedPosts).length}
          totalFootprintPosts={questionsData.length}
          metadataSolved={metadataSolved}
          scenariosSolvedCount={Object.keys(solvedScenarios).length}
          totalScenarios={scenariosData.length}
          score={score}
          rankTitle={rankTitle}
        />
      )}

      {/* Floating Achievement Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-lg bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 text-xs font-mono shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-4 flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Active Screen Presentation */}
      <main className="flex-1 w-full">
        {currentScreen === 'home' && (
          <Home
            onStart={() => handleNavigate('briefing')}
            onNavigate={handleNavigate}
            highScore={highScore}
          />
        )}

        {currentScreen === 'briefing' && (
          <Briefing onStartCase={() => handleNavigate('footprint')} />
        )}

        {currentScreen === 'footprint' && (
          <FootprintInvestigation
            onScoreUpdate={handleFootprintScore}
            solvedPosts={solvedPosts}
            onNextStage={() => handleNavigate('metadata')}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'metadata' && (
          <MetadataTrap
            onScoreUpdate={handleMetadataScore}
            isSolved={metadataSolved}
            solvedState={metadataSolvedState}
            onNextStage={() => handleNavigate('scenarios')}
          />
        )}

        {currentScreen === 'scenarios' && (
          <PrivacyChallenges
            onScoreUpdate={handleScenarioScore}
            solvedScenarios={solvedScenarios}
            onFinishCase={() => handleNavigate('results')}
            onNavigate={handleNavigate}
          />
        )}

        {currentScreen === 'results' && (
          <Results
            score={score}
            maxScore={maxScore}
            correctAnswersCount={totalCorrect}
            totalQuestionsCount={totalQuestions}
            footprintSolvedCount={footprintCorrectCount}
            footprintTotal={questionsData.length}
            metadataSolvedCorrect={metadataCorrectCount === 1}
            scenariosSolvedSafestCount={scenariosCorrectCount}
            scenariosTotal={scenariosData.length}
            onReplay={handleResetInvestigation}
            onSaveToLeaderboard={handleSaveToLeaderboard}
            onNavigate={handleNavigate}
            isSavedToLeaderboard={isSavedToLeaderboard}
          />
        )}

        {currentScreen === 'leaderboard' && (
          <Leaderboard onStartNewCase={handleResetInvestigation} onNavigate={handleNavigate} />
        )}
      </main>

      {/* Society Attribution Footer */}
      <Footer />
    </div>
  );
}
