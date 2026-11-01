import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Swords,
  CheckCircle2,
  XCircle,
  Sparkles,
  Star,
  ThumbsUp,
  ArrowUpRight,
  RotateCcw,
} from 'lucide-react';
import { TopTenList } from '../data/initialData';
import { ArtworkTheme, EditorialArtwork } from './EditorialArtwork';

interface HeadToHeadMatchup {
  id: string;
  category: string;
  title: string;
  leftContender: {
    name: string;
    subtitle: string;
    theme: ArtworkTheme;
    variantIndex: number;
    votes: number;
  };
  rightContender: {
    name: string;
    subtitle: string;
    theme: ArtworkTheme;
    variantIndex: number;
    votes: number;
  };
  userPick?: 'left' | 'right' | null;
}

const INITIAL_MATCHUPS: HeadToHeadMatchup[] = [
  {
    id: 'vs-scifi',
    category: 'Sci-Fi Cinema Showdown',
    title: 'Which Film Achieved the Greater Scientific & Visual Milestone?',
    leftContender: {
      name: 'Interstellar (2014)',
      subtitle: 'Kip Thorne Relativistic Kerr Black Hole Lensing',
      theme: 'scifi-portal',
      variantIndex: 0,
      votes: 4820,
    },
    rightContender: {
      name: '2001: A Space Odyssey (1968)',
      subtitle: 'Kubrick Centrifugal Habitat & Glass Cockpit Tablets',
      theme: 'scifi-portal',
      variantIndex: 2,
      votes: 4590,
    },
  },
  {
    id: 'vs-gaming',
    category: 'Living Game World Duel',
    title: 'Which Open World Has the Most Convincing Autonomous Ecology?',
    leftContender: {
      name: 'Rain World (2017)',
      subtitle: 'Off-Screen Neural-Network Predator Hierarchy',
      theme: 'gaming-citadel',
      variantIndex: 1,
      votes: 3410,
    },
    rightContender: {
      name: 'Red Dead Redemption 2 (2018)',
      subtitle: '200-Species Food Web & Dynamic Frontier Construction',
      theme: 'gaming-citadel',
      variantIndex: 3,
      votes: 3890,
    },
  },
  {
    id: 'vs-horror',
    category: 'Psychoacoustic Horror Duel',
    title: 'Which Film Weaponized Sound Design More Effectively?',
    leftContender: {
      name: 'The Shining (1980)',
      subtitle: 'Penderecki Strings & Parquet-to-Carpet Cadence',
      theme: 'horror-manor',
      variantIndex: 0,
      votes: 3120,
    },
    rightContender: {
      name: 'Hereditary (2018)',
      subtitle: 'Sub-Audible Heartbeat Pulses & Contrabass Saxophone',
      theme: 'horror-manor',
      variantIndex: 2,
      votes: 2740,
    },
  },
  {
    id: 'vs-artifacts',
    category: 'Unexplained Artifact Clash',
    title: 'Which Ancient Object Is More Baffling to Modern Historians?',
    leftContender: {
      name: 'The Antikythera Mechanism',
      subtitle: '150 BCE 37-Gear Bronze Epicyclic Computer',
      theme: 'weird-artifacts',
      variantIndex: 0,
      votes: 5120,
    },
    rightContender: {
      name: 'The Voynich Vellum Codex',
      subtitle: '240 Pages of Undeciphered Zipf-Law Script',
      theme: 'weird-artifacts',
      variantIndex: 2,
      votes: 4480,
    },
  },
];

interface CuriosityFactCard {
  id: string;
  category: string;
  statement: string;
  isFact: boolean;
  explanation: string;
  theme: ArtworkTheme;
  variantIndex: number;
}

const CURIOSITY_QUIZ_DECK: CuriosityFactCard[] = [
  {
    id: 'quiz-1',
    category: 'Weird History & Science',
    statement:
      'In 1963, the US military launched 480 million tiny copper needles into orbit to create an artificial ring around Earth for bouncing radio signals.',
    isFact: true,
    explanation:
      '100% Verified Fact (Project West Ford). Conducted by MIT Lincoln Laboratory before modern communications satellites existed; clumps of these needles remain in polar orbit today.',
    theme: 'coldwar-mystery',
    variantIndex: 1,
  },
  {
    id: 'quiz-2',
    category: 'Sci-Fi Cinema Lore',
    statement:
      'NASA invented the backwards verbal launch countdown ("10, 9, 8...") in 1958 for the Mercury space program before any movie ever used it.',
    isFact: false,
    explanation:
      'Historical Myth! Director Fritz Lang invented the backwards countdown in 1929 purely for theatrical suspense in his silent sci-fi film "Frau im Mond"—NASA adopted it decades later.',
    theme: 'scifi-portal',
    variantIndex: 3,
  },
  {
    id: 'quiz-3',
    category: 'Extreme Marine Biology',
    statement:
      'There is a species of volcanic deep-sea snail in the Indian Ocean that builds a literal three-layer suit of magnetic iron-sulfide armor.',
    isFact: true,
    explanation:
      '100% Verified Fact (Chrysomallon squamiferum). Living on 400°C black smoker vents 2,400 meters down, its outer shell is forged from greigite iron-sulfide.',
    theme: 'bizarre-nature',
    variantIndex: 2,
  },
  {
    id: 'quiz-4',
    category: 'Gaming World Simulation',
    statement:
      'In Dwarf Fortress, a bug once caused tavern cats to die of alcohol poisoning because they walked through spilled beer puddles and licked their paws clean.',
    isFact: true,
    explanation:
      '100% Verified Fact! Because the game tracks fluid coatings on creature feet and autonomous feline grooming habits, cats ingested full mug-doses of ale when cleaning their paws.',
    theme: 'gaming-citadel',
    variantIndex: 2,
  },
];

interface InteractiveHomepageWidgetsProps {
  lists: TopTenList[];
  onOpenReader: (listId: string) => void;
  onRateEntry: (listId: string, entryRank: number, stars: number) => void;
  onVoteEntry: (listId: string, entryRank: number, direction: 'up' | 'down') => void;
}

export const InteractiveHomepageWidgets: React.FC<InteractiveHomepageWidgetsProps> = ({
  lists,
  onOpenReader,
  onRateEntry,
  onVoteEntry,
}) => {
  // 1. Head-to-Head State
  const [matchups, setMatchups] = useState<HeadToHeadMatchup[]>(INITIAL_MATCHUPS);
  const [activeMatchupIdx, setActiveMatchupIdx] = useState<number>(0);

  // 2. Fact vs Myth Quiz State
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [score, setScore] = useState<number>(0);
  const [answeredCount, setAnsweredCount] = useState<number>(0);

  const currentMatchup = matchups[activeMatchupIdx];
  const totalMatchupVotes =
    currentMatchup.leftContender.votes + currentMatchup.rightContender.votes;
  const leftPercent = Math.round(
    (currentMatchup.leftContender.votes / Math.max(1, totalMatchupVotes)) * 100
  );
  const rightPercent = 100 - leftPercent;

  const handlePickDuel = (side: 'left' | 'right') => {
    setMatchups((prev) =>
      prev.map((m, idx) => {
        if (idx !== activeMatchupIdx) return m;
        if (m.userPick === side) return m;

        const prevPick = m.userPick;
        const leftDelta = side === 'left' ? 1 : prevPick === 'left' ? -1 : 0;
        const rightDelta = side === 'right' ? 1 : prevPick === 'right' ? -1 : 0;

        return {
          ...m,
          userPick: side,
          leftContender: {
            ...m.leftContender,
            votes: m.leftContender.votes + leftDelta,
          },
          rightContender: {
            ...m.rightContender,
            votes: m.rightContender.votes + rightDelta,
          },
        };
      })
    );
  };

  const currentQuiz = CURIOSITY_QUIZ_DECK[quizIndex];
  const handleGuessQuiz = (guessFact: boolean) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(guessFact);
    setAnsweredCount((prev) => prev + 1);
    if (guessFact === currentQuiz.isFact) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    setSelectedAnswer(null);
    setQuizIndex((prev) => (prev + 1) % CURIOSITY_QUIZ_DECK.length);
  };

  return (
    <div className="space-y-24">
      {/* WIDGET 1: VISUAL #1 CONTENDERS GALLERY & INSTANT STAR RATING STRIP */}
      <section className="max-w-7xl mx-auto px-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-rose-500 mb-1">
              Visual Hall of Fame · Rate the #01 Contenders
            </div>
            <h2 className="text-2xl sm:text-3xl font-editorial font-extrabold text-slate-900 dark:text-white">
              The Undisputed #01 Ranked Selections Across Every Category
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Click the stars on any poster below to rate that #1 selection or launch its countdown.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {lists.slice(0, 8).map((list, idx) => {
            const numberOneEntry =
              list.entries.find((e) => e.rank === 1) || list.entries[0];
            if (!numberOneEntry) return null;

            return (
              <div
                key={list.id}
                className="group rounded-2xl bg-white dark:bg-[#0D101A] border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col justify-between shadow-xs hover:border-rose-500/60 transition-all"
              >
                <div>
                  <div
                    onClick={() => onOpenReader(list.id)}
                    className="aspect-[16/10] relative overflow-hidden cursor-pointer"
                  >
                    <EditorialArtwork
                      theme={list.artworkTheme}
                      variantIndex={(idx % 3) + 1}
                      driveImageUrl={numberOneEntry.driveImageUrl || list.driveImageUrl}
                      alt={numberOneEntry.title}
                      className="w-full h-full"
                    />
                    <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-md bg-rose-600 text-white font-mono-tabular text-xs font-extrabold shadow-lg">
                      #01 IN {list.category.toUpperCase()}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="text-[11px] font-mono-tabular text-amber-500 dark:text-amber-400 font-semibold mb-1">
                      {numberOneEntry.yearOrOrigin}
                    </div>
                    <h3
                      onClick={() => onOpenReader(list.id)}
                      className="text-lg font-editorial font-extrabold text-slate-900 dark:text-white group-hover:text-rose-500 transition-colors cursor-pointer leading-snug mb-1.5"
                    >
                      {numberOneEntry.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {numberOneEntry.summary}
                    </p>
                  </div>
                </div>

                {/* Interactive Star Rating + Upvote Bar */}
                <div className="px-5 py-3.5 bg-slate-50 dark:bg-[#121624] border-t border-slate-200/80 dark:border-white/5 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => onRateEntry(list.id, numberOneEntry.rank, star)}
                        title={`Rate ${numberOneEntry.title} ${star} stars`}
                        className="p-0.5 text-amber-400 hover:scale-125 transition-transform"
                      >
                        <Star
                          className={`w-3.5 h-3.5 ${
                            star <= Math.round(numberOneEntry.rating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-300 dark:text-slate-700'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="font-mono-tabular text-xs font-bold text-slate-700 dark:text-slate-300 ml-1.5">
                      {numberOneEntry.rating.toFixed(1)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onVoteEntry(list.id, numberOneEntry.rank, 'up')}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono-tabular font-bold transition-colors ${
                      numberOneEntry.userVote === 'up'
                        ? 'bg-rose-600 text-white'
                        : 'bg-white dark:bg-[#0D101A] text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-white/10 hover:border-rose-500'
                    }`}
                  >
                    <ThumbsUp className="w-3 h-3" />
                    <span>{numberOneEntry.votes.toLocaleString()}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* WIDGET 2: INTERACTIVE HEAD-TO-HEAD VISUAL FACE-OFF + CURIOSITY FACT QUIZ */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left 7 Columns: Visual Split-Screen Head-to-Head Duel */}
        <div className="lg:col-span-7 rounded-3xl bg-white dark:bg-[#0D101A] border border-slate-200 dark:border-white/10 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-rose-500 mb-1">
                <Swords className="w-4 h-4" />
                <span>Head-to-Head Visual Showdown</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-editorial font-extrabold text-slate-900 dark:text-white">
                {currentMatchup.title}
              </h3>
            </div>

            {/* Matchup Switcher Tabs */}
            <div className="flex items-center gap-1.5">
              {matchups.map((m, idx) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setActiveMatchupIdx(idx)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono-tabular font-bold transition-colors ${
                    activeMatchupIdx === idx
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-100 dark:bg-[#141826] text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  0{idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Split-Screen Photographic Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative">
            {/* Left Contender */}
            <div
              onClick={() => handlePickDuel('left')}
              className={`group relative rounded-2xl overflow-hidden border-2 cursor-pointer transition-all min-h-[250px] flex flex-col justify-end ${
                currentMatchup.userPick === 'left'
                  ? 'border-rose-500 ring-4 ring-rose-500/25'
                  : 'border-slate-200 dark:border-white/10 hover:border-rose-500/60'
              }`}
            >
              <div className="absolute inset-0">
                <EditorialArtwork
                  theme={currentMatchup.leftContender.theme}
                  variantIndex={currentMatchup.leftContender.variantIndex}
                  alt={currentMatchup.leftContender.name}
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
              </div>

              <div className="relative z-20 p-5 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono-tabular">
                  <span className="text-rose-400 font-bold">CONTENDER A</span>
                  <span className="text-white font-extrabold text-base">{leftPercent}%</span>
                </div>
                <h4 className="text-xl font-editorial font-extrabold text-white group-hover:text-rose-300 transition-colors">
                  {currentMatchup.leftContender.name}
                </h4>
                <p className="text-xs text-slate-300 line-clamp-2">
                  {currentMatchup.leftContender.subtitle}
                </p>
                <div className="pt-2 flex items-center justify-between text-xs font-mono-tabular text-slate-300">
                  <span>{currentMatchup.leftContender.votes.toLocaleString()} votes</span>
                  <span className="px-2.5 py-1 rounded-md bg-rose-600 text-white font-sans font-bold">
                    {currentMatchup.userPick === 'left' ? '✓ Voted' : 'Vote A'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Contender */}
            <div
              onClick={() => handlePickDuel('right')}
              className={`group relative rounded-2xl overflow-hidden border-2 cursor-pointer transition-all min-h-[250px] flex flex-col justify-end ${
                currentMatchup.userPick === 'right'
                  ? 'border-amber-400 ring-4 ring-amber-400/25'
                  : 'border-slate-200 dark:border-white/10 hover:border-amber-400/60'
              }`}
            >
              <div className="absolute inset-0">
                <EditorialArtwork
                  theme={currentMatchup.rightContender.theme}
                  variantIndex={currentMatchup.rightContender.variantIndex}
                  alt={currentMatchup.rightContender.name}
                  className="w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
              </div>

              <div className="relative z-20 p-5 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono-tabular">
                  <span className="text-amber-400 font-bold">CONTENDER B</span>
                  <span className="text-white font-extrabold text-base">{rightPercent}%</span>
                </div>
                <h4 className="text-xl font-editorial font-extrabold text-white group-hover:text-amber-300 transition-colors">
                  {currentMatchup.rightContender.name}
                </h4>
                <p className="text-xs text-slate-300 line-clamp-2">
                  {currentMatchup.rightContender.subtitle}
                </p>
                <div className="pt-2 flex items-center justify-between text-xs font-mono-tabular text-slate-300">
                  <span>{currentMatchup.rightContender.votes.toLocaleString()} votes</span>
                  <span className="px-2.5 py-1 rounded-md bg-amber-500 text-slate-950 font-sans font-bold">
                    {currentMatchup.userPick === 'right' ? '✓ Voted' : 'Vote B'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Animated Tug-of-War Split Meter */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono-tabular font-bold">
              <span className="text-rose-500">
                {currentMatchup.leftContender.name} ({leftPercent}%)
              </span>
              <span className="text-amber-500">
                {rightPercent}% ({currentMatchup.rightContender.name})
              </span>
            </div>
            <div className="h-3 w-full rounded-full bg-amber-500/30 overflow-hidden flex">
              <div
                className="h-full bg-rose-600 transition-all duration-500"
                style={{ width: `${leftPercent}%` }}
              />
              <div
                className="h-full bg-amber-400 transition-all duration-500"
                style={{ width: `${rightPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Interactive "Weird Fact or Historical Myth?" Visual Flashcard */}
        <div className="lg:col-span-5 rounded-3xl bg-white dark:bg-[#0D101A] border border-slate-200 dark:border-white/10 p-6 sm:p-8 flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-white/10 pb-4 mb-5">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-amber-500 mb-1">
                  Interactive Listverse Trivia
                </div>
                <h3 className="text-xl font-editorial font-extrabold text-slate-900 dark:text-white">
                  Weird Fact or Historical Myth?
                </h3>
              </div>
              <div className="text-right font-mono-tabular">
                <div className="text-xs text-slate-400">Your Score</div>
                <div className="text-base font-extrabold text-rose-500">
                  {score} / {answeredCount}
                </div>
              </div>
            </div>

            {/* Visual Flashcard Artwork */}
            <div className="aspect-video rounded-2xl overflow-hidden border border-slate-200 dark:border-white/10 mb-4 relative">
              <EditorialArtwork
                theme={currentQuiz.theme}
                variantIndex={currentQuiz.variantIndex}
                alt={currentQuiz.category}
                className="w-full h-full"
              />
              <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded bg-black/80 text-amber-400 text-[11px] font-bold uppercase tracking-wider">
                {currentQuiz.category} · Card 0{quizIndex + 1}/0{CURIOSITY_QUIZ_DECK.length}
              </div>
            </div>

            <p className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-100 leading-relaxed mb-4">
              “{currentQuiz.statement}”
            </p>

            {selectedAnswer === null ? (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleGuessQuiz(true)}
                  className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verified Fact</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleGuessQuiz(false)}
                  className="py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Historical Myth</span>
                </button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-slate-100 dark:bg-[#141826] border border-slate-200 dark:border-white/10 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-extrabold uppercase tracking-wider ${
                      selectedAnswer === currentQuiz.isFact
                        ? 'text-emerald-500'
                        : 'text-rose-500'
                    }`}
                  >
                    {selectedAnswer === currentQuiz.isFact
                      ? '✓ Correct Instinct!'
                      : '✗ Surprising Twist!'}
                  </span>
                  <button
                    type="button"
                    onClick={handleNextQuiz}
                    className="px-3 py-1 rounded-lg bg-rose-600 text-white text-xs font-bold hover:bg-rose-500 transition-colors"
                  >
                    Next Mystery Card →
                  </button>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {currentQuiz.explanation}
                </p>
              </motion.div>
            )}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex items-center justify-between text-xs text-slate-400">
            <span>All facts cross-checked against our Top 10 archives</span>
            <button
              type="button"
              onClick={handleNextQuiz}
              className="flex items-center gap-1 text-slate-500 dark:text-slate-300 hover:text-rose-500 font-semibold transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Skip Card</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
