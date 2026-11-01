import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  ThumbsUp,
  ArrowUpRight,
  Star,
  CheckCircle2,
  ListOrdered,
} from 'lucide-react';
import { TopTenList } from '../data/initialData';
import { EditorialArtwork } from './EditorialArtwork';

interface HeroShowcaseProps {
  heroLists: TopTenList[];
  heroIndex: number;
  isHeroPlaying: boolean;
  onSelectHeroIndex: (index: number) => void;
  onTogglePlay: () => void;
  onPrev: () => void;
  onNext: () => void;
  onOpenReader: (listId: string) => void;
  onVoteEntry: (listId: string, entryRank: number, direction: 'up' | 'down') => void;
}

const INSPECTOR_RANKS = [1, 2, 3, 5, 10] as const;

export const HeroShowcase: React.FC<HeroShowcaseProps> = ({
  heroLists,
  heroIndex,
  isHeroPlaying,
  onSelectHeroIndex,
  onTogglePlay,
  onPrev,
  onNext,
  onOpenReader,
  onVoteEntry,
}) => {
  const [selectedRankTab, setSelectedRankTab] = useState<number>(1);
  const currentList = heroLists[heroIndex % Math.max(1, heroLists.length)];

  // Keep keyboard Left/Right navigation active when hero is visible
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        document.activeElement?.tagName === 'SELECT'
      ) {
        return;
      }
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onPrev, onNext]);

  if (!currentList) return null;

  const inspectedEntry =
    currentList.entries.find((e) => e.rank === selectedRankTab) ||
    currentList.entries.find((e) => e.rank === 1) ||
    currentList.entries[0];

  const topPodiumEntries = currentList.entries
    .filter((e) => e.rank <= 3)
    .sort((a, b) => a.rank - b.rank);

  return (
    <section
      aria-label="Featured Top 10 Chronicles Showcase"
      className="relative w-full lg:min-h-[calc(100vh-106px)] flex flex-col justify-between bg-[#F8FAFC] dark:bg-[#05060A] text-slate-900 dark:text-white border-b border-slate-200/90 dark:border-white/10 overflow-hidden transition-colors duration-300"
    >
      {/* 1. FULL-BLEED LAYERED CINEMA BACKDROP WITH KEN BURNS MOTION */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentList.id}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 pointer-events-none"
        >
          <EditorialArtwork
            theme={currentList.artworkTheme}
            driveImageUrl={currentList.driveImageUrl}
            driveVideoUrl={currentList.driveVideoUrl}
            alt={currentList.title}
            className="w-full h-full"
          />
          {/* Adaptive Light Mode & Dark Mode Scrims for Guaranteed 4.5:1+ Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F8FAFC] via-[#F8FAFC]/90 to-[#F8FAFC]/30 dark:from-[#05060A] dark:via-[#05060A]/85 dark:to-[#05060A]/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFC] via-[#F8FAFC]/55 to-white/40 dark:from-[#05060A] dark:via-[#05060A]/45 dark:to-black/50" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_32%,transparent_0%,#F8FAFC_88%)] dark:bg-[radial-gradient(circle_at_72%_32%,transparent_0%,#05060A_85%)] opacity-80 dark:opacity-75" />
        </motion.div>
      </AnimatePresence>

      {/* 2. TOP HERO BAR: CHRONICLE EDITION TELEMETRY & SLIDE CONTROLS */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-5 sm:pt-7">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-300/80 dark:border-white/10">
          {/* Left: Unboxed Editorial Metadata */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs tracking-wider uppercase font-semibold text-slate-600 dark:text-slate-300">
            <span className="font-mono-tabular font-bold text-rose-600 dark:text-rose-500">
              0{(heroIndex % heroLists.length) + 1} / 0{heroLists.length}
            </span>
            <span aria-hidden="true" className="text-slate-400 dark:text-white/25">·</span>
            <span className="text-slate-900 dark:text-white font-bold">{currentList.category}</span>
            <span aria-hidden="true" className="text-slate-400 dark:text-white/25 hidden sm:inline">·</span>
            <span className="hidden sm:inline text-slate-700 dark:text-slate-300">Curated by {currentList.author}</span>
            <span aria-hidden="true" className="text-slate-400 dark:text-white/25 hidden md:inline">·</span>
            <span className="hidden md:inline text-slate-500 dark:text-slate-400">{currentList.readTime}</span>
          </div>

          {/* Right: Transport Controls & Live Rating */}
          <div className="flex items-center gap-3 ml-auto">
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono-tabular text-slate-700 dark:text-slate-300">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 dark:fill-amber-400 dark:text-amber-400" />
              <span className="font-bold text-slate-900 dark:text-white">{currentList.averageRating.toFixed(1)}</span>
              <span className="text-slate-500 dark:text-slate-400">({currentList.totalVotes.toLocaleString()} votes)</span>
            </div>

            <div className="flex items-center gap-1 bg-white/85 dark:bg-white/10 backdrop-blur-md px-2 py-1 rounded-xl border border-slate-300/80 dark:border-white/15 shadow-sm">
              <button
                type="button"
                onClick={onPrev}
                aria-label="Previous Featured Top 10"
                className="p-1.5 text-slate-700 dark:text-slate-200 hover:text-rose-600 dark:hover:text-rose-400 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-white/10"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onTogglePlay}
                aria-label={isHeroPlaying ? 'Pause Auto-Transition' : 'Play Auto-Transition'}
                className="p-1.5 text-slate-700 dark:text-slate-200 hover:text-rose-600 dark:hover:text-rose-400 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-white/10"
              >
                {isHeroPlaying ? (
                  <Pause className="w-3.5 h-3.5" />
                ) : (
                  <Play className="w-3.5 h-3.5" />
                )}
              </button>
              <button
                type="button"
                onClick={onNext}
                aria-label="Next Featured Top 10"
                className="p-1.5 text-slate-700 dark:text-slate-200 hover:text-rose-600 dark:hover:text-rose-400 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-white/10"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. CENTER MAIN STAGE: 12-COLUMN ARCHITECTURAL SPLIT */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 my-auto py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left 7 Columns: Dominant Headline, Deck, Interactive Rank Scrubber & Primary CTA */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentList.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4 sm:space-y-5"
              >
                {/* Kicker Line */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tabular text-rose-600 dark:text-rose-400">
                  <span className="uppercase tracking-widest font-bold">
                    Definitive Top 10 Countdown
                  </span>
                  <span aria-hidden="true" className="text-slate-400 dark:text-white/30">·</span>
                  <span className="text-amber-600 dark:text-amber-400 font-semibold">
                    {currentList.viewsCount} Readers
                  </span>
                  <span aria-hidden="true" className="text-slate-400 dark:text-white/30">·</span>
                  <span className="text-slate-600 dark:text-slate-300">{currentList.publishedAt}</span>
                </div>

                {/* Display Headline */}
                <h1
                  onClick={() => onOpenReader(currentList.id)}
                  className="text-2xl sm:text-4xl md:text-5xl xl:text-[3.4rem] font-editorial font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.06] cursor-pointer hover:text-rose-600 dark:hover:text-rose-200 transition-colors"
                >
                  {currentList.title}
                </h1>

                {/* Editorial Deck */}
                <p className="text-sm sm:text-base md:text-lg text-slate-700 dark:text-slate-200/90 leading-relaxed max-w-2xl">
                  {currentList.deck}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Interactive Rank Jump Scrubber Bar (Works on both Mobile & Desktop) */}
            <div className="pt-1">
              <div className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold mb-2">
                Preview Countdown Ranks Inside This List:
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                {INSPECTOR_RANKS.map((rankNum) => {
                  const entry = currentList.entries.find((e) => e.rank === rankNum);
                  if (!entry) return null;
                  const isSelected = selectedRankTab === rankNum;
                  return (
                    <button
                      key={rankNum}
                      type="button"
                      onClick={() => setSelectedRankTab(rankNum)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono-tabular transition-all flex items-center gap-2 whitespace-nowrap shrink-0 border ${
                        isSelected
                          ? 'bg-rose-600 text-white border-rose-500 font-bold shadow-lg shadow-rose-600/25'
                          : 'bg-white/85 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 border-slate-300/80 dark:border-white/10 shadow-xs'
                      }`}
                    >
                      <span className={isSelected ? 'text-white' : 'text-rose-600 dark:text-rose-400 font-bold'}>
                        #{rankNum < 10 ? `0${rankNum}` : rankNum}
                      </span>
                      <span className="font-sans max-w-[130px] truncate">{entry.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Primary CTA & Quick-Vote Action Row */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => onOpenReader(currentList.id)}
                className="flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs sm:text-sm font-bold shadow-xl shadow-rose-600/30 transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Read Full #10 to #01 Countdown</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              {inspectedEntry && (
                <button
                  type="button"
                  onClick={() => onVoteEntry(currentList.id, inspectedEntry.rank, 'up')}
                  className={`flex items-center gap-2 px-4 py-3.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all whitespace-nowrap shrink-0 ${
                    inspectedEntry.userVote === 'up'
                      ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                      : 'bg-white/90 dark:bg-white/10 hover:bg-white dark:hover:bg-white/15 text-slate-900 dark:text-white border-slate-300 dark:border-white/15 backdrop-blur-md shadow-sm'
                  }`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>
                    Upvote #{inspectedEntry.rank < 10 ? `0${inspectedEntry.rank}` : inspectedEntry.rank}
                  </span>
                  <span className="font-mono-tabular opacity-90">
                    ({inspectedEntry.votes.toLocaleString()})
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Right 5 Columns: Glassmorphic Interactive Rank Spotlight & Podium Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-white/90 dark:bg-[#0B0E17]/85 backdrop-blur-2xl border border-slate-200/90 dark:border-white/15 p-5 sm:p-6 shadow-xl dark:shadow-2xl space-y-5">
              {/* Spotlight Header */}
              <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-white/10 pb-3.5">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                  <ListOrdered className="w-4 h-4" />
                  <span>
                    Rank #{inspectedEntry.rank < 10 ? `0${inspectedEntry.rank}` : inspectedEntry.rank} Spotlight
                  </span>
                </div>
                <span className="font-mono-tabular text-xs text-amber-600 dark:text-amber-400 font-bold">
                  ★ {inspectedEntry.rating.toFixed(1)} ({inspectedEntry.ratingCount} ratings)
                </span>
              </div>

              {/* Active Rank Deep Preview with Visual Artwork Thumbnail */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentList.id}-${inspectedEntry.rank}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22 }}
                  className="space-y-3.5"
                >
                  <div
                    onClick={() => onOpenReader(currentList.id)}
                    className="grid grid-cols-12 gap-3.5 items-center cursor-pointer group"
                  >
                    <div className="col-span-4 aspect-video rounded-xl overflow-hidden border border-slate-200 dark:border-white/15 relative">
                      <EditorialArtwork
                        theme={currentList.artworkTheme}
                        variantIndex={inspectedEntry.rank}
                        alt={inspectedEntry.title}
                        className="w-full h-full"
                      />
                      <div className="absolute bottom-1.5 left-1.5 z-20 px-1.5 py-0.5 rounded bg-black/80 font-mono-tabular text-[10px] font-extrabold text-rose-400">
                        #{inspectedEntry.rank < 10 ? `0${inspectedEntry.rank}` : inspectedEntry.rank}
                      </div>
                    </div>

                    <div className="col-span-8 min-w-0">
                      <h2 className="text-lg sm:text-xl font-editorial font-extrabold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors leading-snug truncate">
                        {inspectedEntry.title}
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {inspectedEntry.subtitle}
                      </p>
                      <p className="text-[11px] font-mono-tabular text-amber-600 dark:text-amber-400 mt-1">
                        {inspectedEntry.yearOrOrigin}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {inspectedEntry.summary}
                  </p>

                  {/* Fact Verification Line */}
                  <div className="p-2.5 rounded-xl bg-slate-100/90 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-2 text-[11px] leading-relaxed">
                      {inspectedEntry.factVerification}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Top 3 Podium Quick-Compare List */}
              <div className="pt-3 border-t border-slate-200 dark:border-white/10 space-y-2">
                <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                  <span>Current Top 3 Podium</span>
                  <span>Community Votes</span>
                </div>

                <div className="space-y-1.5">
                  {topPodiumEntries.map((item) => (
                    <div
                      key={item.rank}
                      onClick={() => setSelectedRankTab(item.rank)}
                      className={`px-3 py-2 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-colors text-xs ${
                        selectedRankTab === item.rank
                          ? 'bg-rose-500/10 dark:bg-rose-600/20 border border-rose-500/40 text-slate-900 dark:text-white'
                          : 'bg-slate-100/80 dark:bg-white/5 hover:bg-slate-200/70 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="font-mono-tabular font-extrabold text-rose-600 dark:text-rose-400 shrink-0">
                          #0{item.rank}
                        </span>
                        <span className="font-semibold truncate">{item.title}</span>
                      </div>
                      <span className="font-mono-tabular text-slate-600 dark:text-slate-300 font-bold shrink-0">
                        {item.votes.toLocaleString()}v
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. BOTTOM FILMSTRIP DOCK: FULL 7-CARD GRID ON DESKTOP, SWIPEABLE SNAP RAIL ON MOBILE */}
      <div className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 pb-6 pt-2">
        <div className="flex lg:grid lg:grid-cols-7 gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-1">
          {heroLists.map((item, idx) => {
            const isActive = idx === heroIndex % heroLists.length;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectHeroIndex(idx)}
                className={`snap-start shrink-0 w-[210px] sm:w-[230px] lg:w-auto group text-left rounded-xl overflow-hidden border transition-all relative flex flex-col justify-between ${
                  isActive
                    ? 'border-rose-500 bg-white dark:bg-white/15 shadow-lg shadow-rose-600/15'
                    : 'border-slate-200/90 dark:border-white/10 bg-white/85 dark:bg-[#0B0E17]/75 hover:border-rose-300 dark:hover:border-white/30 hover:bg-white dark:hover:bg-white/10'
                }`}
              >
                {/* Active Auto-Advance Progress Line */}
                {isActive && isHeroPlaying && (
                  <motion.div
                    key={`progress-${item.id}-${heroIndex}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 5.5, ease: 'linear' }}
                    className="absolute top-0 inset-x-0 h-1 bg-rose-500 z-30 origin-left"
                  />
                )}

                <div className="h-16 sm:h-20 w-full relative overflow-hidden">
                  <EditorialArtwork
                    theme={item.artworkTheme}
                    driveImageUrl={item.driveImageUrl}
                    alt={item.title}
                    className="w-full h-full"
                  />
                  <div className="absolute top-2 left-2 z-20 px-1.5 py-0.5 rounded bg-black/75 text-[10px] font-mono-tabular font-bold text-slate-200">
                    0{idx + 1}
                  </div>
                </div>

                <div className="p-2.5 sm:p-3">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 truncate">
                    {item.category}
                  </div>
                  <div className="text-xs font-semibold text-slate-900 dark:text-white line-clamp-2 leading-snug mt-0.5">
                    {item.title}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
