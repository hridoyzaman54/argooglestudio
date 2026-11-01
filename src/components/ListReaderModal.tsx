import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  ThumbsUp,
  ThumbsDown,
  Star,
  CheckCircle2,
  ArrowUpDown,
  Send,
  Flame,
} from 'lucide-react';
import { TopTenList, VisitorReview } from '../data/initialData';
import { EditorialArtwork } from './EditorialArtwork';

interface ListReaderModalProps {
  list: TopTenList;
  reviews: VisitorReview[];
  onClose: () => void;
  onVoteEntry: (listId: string, entryRank: number, direction: 'up' | 'down') => void;
  onRateEntry: (listId: string, entryRank: number, stars: number) => void;
  onAddVisitorReview: (newReview: Omit<VisitorReview, 'id' | 'createdAt' | 'upvotes' | 'status'>) => void;
  onUpvoteReview: (reviewId: string) => void;
}

export const ListReaderModal: React.FC<ListReaderModalProps> = ({
  list,
  reviews,
  onClose,
  onVoteEntry,
  onRateEntry,
  onAddVisitorReview,
  onUpvoteReview,
}) => {
  const [sortMode, setSortMode] = useState<'editorial' | 'community'>('editorial');
  const [visitorName, setVisitorName] = useState('');
  const [visitorLocation, setVisitorLocation] = useState('');
  const [selectedTargetItem, setSelectedTargetItem] = useState<string>('Entire Top 10 List');
  const [reviewRating, setReviewRating] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submittedBanner, setSubmittedBanner] = useState(false);

  const listReviews = reviews.filter((r) => r.listId === list.id);

  // Compute sorted entries based on sortMode
  const displayedEntries = [...list.entries].sort((a, b) => {
    if (sortMode === 'editorial') {
      return b.rank - a.rank;
    }
    return b.votes - a.votes;
  });

  // Compute community rank map (1 = highest votes)
  const communityRankMap = new Map<number, number>();
  [...list.entries]
    .sort((a, b) => b.votes - a.votes)
    .forEach((entry, idx) => {
      communityRankMap.set(entry.rank, idx + 1);
    });

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitorName.trim() || !reviewComment.trim()) return;

    onAddVisitorReview({
      listId: list.id,
      listTitle: list.title,
      targetItemTitle: selectedTargetItem,
      visitorName: visitorName.trim(),
      visitorLocation: visitorLocation.trim() || 'Global Reader',
      rating: reviewRating,
      comment: reviewComment.trim(),
    });

    setVisitorName('');
    setVisitorLocation('');
    setReviewComment('');
    setSubmittedBanner(true);
    setTimeout(() => setSubmittedBanner(false), 4000);
  };

  const scrollToEntry = (rank: number) => {
    const el = document.getElementById(`countdown-entry-${rank}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="min-h-screen bg-[#F8FAFC] dark:bg-[#06070B] text-slate-900 dark:text-slate-100 pb-28"
    >
      {/* Sticky Sub-Header Bar */}
      <div className="sticky top-0 z-40 bg-white/90 dark:bg-[#0B0D14]/90 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-rose-600 dark:hover:text-rose-400 transition-colors whitespace-nowrap shrink-0"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Top 10 Lists</span>
          </button>

          {/* Interactive Ordering Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-[#121521] p-1 rounded-xl border border-slate-200 dark:border-white/10">
            <button
              type="button"
              onClick={() => setSortMode('editorial')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                sortMode === 'editorial'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Editorial Countdown (#10 → #01)
            </button>
            <button
              type="button"
              onClick={() => setSortMode('community')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                sortMode === 'community'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Live Visitor Ranking</span>
            </button>
          </div>
        </div>
      </div>

      {/* Full-Bleed Cinema Hero Banner */}
      <div className="relative min-h-[420px] lg:min-h-[480px] flex items-end border-b border-slate-200 dark:border-white/10 overflow-hidden">
        <div className="absolute inset-0">
          <EditorialArtwork
            theme={list.artworkTheme}
            driveImageUrl={list.driveImageUrl}
            driveVideoUrl={list.driveVideoUrl}
            alt={list.title}
            animateZoom={true}
            showVideoTrigger={Boolean(list.driveVideoUrl)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06070B] via-[#06070B]/70 to-black/30" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto w-full px-6 py-12">
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-rose-400 font-bold mb-3">
            <span>{list.category}</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span className="text-slate-300">{list.publishedAt}</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span className="text-slate-300">{list.readTime}</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span className="font-mono-tabular text-amber-400">
              ★ {list.averageRating.toFixed(1)} ({list.ratingCount.toLocaleString()} reviews)
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-editorial font-extrabold tracking-tight text-white leading-[1.08] max-w-4xl mb-4">
            {list.title}
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl leading-relaxed mb-6">
            {list.deck}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-300 pt-4 border-t border-white/15">
            <div>
              Curated by <strong className="text-white">{list.author}</strong> · {list.authorRole}
            </div>
            <div className="font-mono-tabular">
              Total Visitor Rank Votes: <strong className="text-rose-400">{list.totalVotes.toLocaleString()}</strong>
            </div>
            <div className="font-mono-tabular">
              Reads: <strong className="text-white">{list.viewsCount}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Reader Layout with Sticky #10-to-#1 Jump Rail */}
      <div className="max-w-7xl mx-auto px-6 pt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Sticky Countdown Jump Rail (3 Columns on Desktop) */}
        <aside className="lg:col-span-3">
          <div className="sticky top-20 p-5 rounded-2xl bg-white dark:bg-[#0D101A] border border-slate-200 dark:border-white/10">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
              Countdown Index (#10 → #01)
            </div>
            <div className="space-y-1">
              {displayedEntries.map((entry) => {
                const commRank = communityRankMap.get(entry.rank) || entry.rank;
                return (
                  <button
                    key={entry.rank}
                    type="button"
                    onClick={() => scrollToEntry(entry.rank)}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-slate-100 dark:hover:bg-white/5 transition-colors flex items-center justify-between gap-2 group"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="font-mono-tabular font-bold text-rose-600 dark:text-rose-400 shrink-0">
                        #{entry.rank < 10 ? `0${entry.rank}` : entry.rank}
                      </span>
                      <span className="truncate font-medium text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white">
                        {entry.title}
                      </span>
                    </div>
                    <span className="font-mono-tabular text-[11px] text-slate-400 shrink-0">
                      {entry.votes}v
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Right 9 Columns: The 10 Countdown Entries & Visitor Review Wall */}
        <div className="lg:col-span-9 space-y-12">
          <AnimatePresence mode="popLayout">
            {displayedEntries.map((entry) => {
              const communityPos = communityRankMap.get(entry.rank) || entry.rank;
              return (
                <motion.section
                  layout
                  key={entry.rank}
                  id={`countdown-entry-${entry.rank}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="scroll-mt-24 rounded-2xl bg-white dark:bg-[#0D101A] border border-slate-200 dark:border-white/10 overflow-hidden"
                >
                  {/* Top Entry Banner Header */}
                  <div className="p-6 sm:p-8 border-b border-slate-100 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/60 dark:bg-[#111522]/60">
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono-tabular text-4xl sm:text-5xl font-extrabold text-rose-600 dark:text-rose-500">
                        #{entry.rank < 10 ? `0${entry.rank}` : entry.rank}
                      </span>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-editorial font-bold text-slate-900 dark:text-white leading-tight">
                          {entry.title}
                        </h2>
                        <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
                          {entry.subtitle} <span aria-hidden="true">·</span>{' '}
                          <span className="font-mono-tabular text-amber-600 dark:text-amber-400">
                            {entry.yearOrOrigin}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Editorial vs Live Visitor Rank Comparison */}
                    <div className="text-xs font-mono-tabular text-slate-500 dark:text-slate-400 shrink-0">
                      <span>Editorial #{entry.rank}</span>
                      <span aria-hidden="true" className="mx-2">·</span>
                      <span className="text-rose-600 dark:text-rose-400 font-bold">
                        Visitor Rank #{communityPos}
                      </span>
                    </div>
                  </div>

                  {/* High-Definition Visual Artwork on Every #10 to #01 Entry */}
                  <div className="aspect-video border-b border-slate-200 dark:border-white/10">
                    <EditorialArtwork
                      theme={list.artworkTheme}
                      variantIndex={entry.rank}
                      driveImageUrl={entry.driveImageUrl || (entry.rank === 1 ? list.driveImageUrl : undefined)}
                      driveVideoUrl={entry.driveVideoUrl || (entry.rank === 1 ? list.driveVideoUrl : undefined)}
                      alt={entry.title}
                      rankNumber={entry.rank}
                      showVideoTrigger={Boolean(entry.driveVideoUrl || (entry.rank === 1 && list.driveVideoUrl))}
                    />
                  </div>

                  {/* Entry Narrative & Verification */}
                  <div className="p-6 sm:p-8 space-y-6">
                    <p className="text-base sm:text-lg text-slate-700 dark:text-slate-200 leading-relaxed">
                      {entry.summary}
                    </p>

                    {/* Verified Fact Callout */}
                    <div className="p-4 rounded-xl bg-slate-100/80 dark:bg-[#141826] border border-slate-200/80 dark:border-white/10">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Verified Historical & Scientific Fact Check</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {entry.factVerification}
                      </p>
                    </div>

                    {/* Interactive Voting & Star Rating Controls */}
                    <div className="pt-4 border-t border-slate-200/80 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => onVoteEntry(list.id, entry.rank, 'up')}
                          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all whitespace-nowrap shrink-0 ${
                            entry.userVote === 'up'
                              ? 'bg-rose-600 text-white border-rose-500 shadow-lg shadow-rose-600/25'
                              : 'bg-slate-100 dark:bg-[#151928] text-slate-800 dark:text-slate-200 border-slate-300 dark:border-white/10 hover:border-rose-500'
                          }`}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>Upvote Rank</span>
                          <span className="font-mono-tabular">
                            ({entry.votes.toLocaleString()})
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onVoteEntry(list.id, entry.rank, 'down')}
                          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-colors whitespace-nowrap shrink-0 ${
                            entry.userVote === 'down'
                              ? 'bg-slate-800 text-white border-slate-700'
                              : 'bg-slate-100 dark:bg-[#151928] text-slate-500 dark:text-slate-400 border-slate-300 dark:border-white/10 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          <ThumbsDown className="w-3.5 h-3.5" />
                          <span>Downvote</span>
                        </button>
                      </div>

                      {/* 5-Star Visitor Rating */}
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                          Rate #{entry.rank}:
                        </span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => onRateEntry(list.id, entry.rank, star)}
                              title={`Rate ${star} stars`}
                              className="p-1 text-amber-400 hover:scale-110 transition-transform"
                            >
                              <Star
                                className={`w-4 h-4 ${
                                  star <= Math.round(entry.rating)
                                    ? 'fill-amber-400 text-amber-400'
                                    : 'text-slate-300 dark:text-slate-700'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                        <span className="text-xs font-mono-tabular font-bold text-slate-700 dark:text-slate-200">
                          {entry.rating.toFixed(1)} ({entry.ratingCount})
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.section>
              );
            })}
          </AnimatePresence>

          {/* Visitor Movie & Countdown Review Form */}
          <section className="pt-10 border-t border-slate-200 dark:border-white/10">
            <h3 className="text-2xl font-editorial font-bold text-slate-900 dark:text-white mb-2">
              Visitor Reviews & Community Debate ({listReviews.length})
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
              Rate a specific movie/entry from this countdown or share what should have taken #1. Admins can feature or moderate all submissions in the Admin Studio.
            </p>

            <form
              onSubmit={handleReviewSubmit}
              className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0D101A] border border-slate-200 dark:border-white/10 mb-8 space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                    placeholder="e.g. Alex Mercer"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-[#141826] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                    Location
                  </label>
                  <input
                    type="text"
                    value={visitorLocation}
                    onChange={(e) => setVisitorLocation(e.target.value)}
                    placeholder="e.g. London, UK"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-[#141826] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                    Which Entry Are You Reviewing?
                  </label>
                  <select
                    value={selectedTargetItem}
                    onChange={(e) => setSelectedTargetItem(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-[#141826] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-rose-500"
                  >
                    <option value="Entire Top 10 List">Entire Top 10 Countdown</option>
                    {list.entries.map((e) => (
                      <option key={e.rank} value={`#${e.rank} ${e.title}`}>
                        #{e.rank} — {e.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  Your Star Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewRating(star)}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border text-xs font-mono-tabular font-bold transition-colors ${
                        star <= reviewRating
                          ? 'border-amber-500/50 bg-amber-500/10 text-amber-400'
                          : 'border-slate-300 dark:border-white/10 text-slate-400'
                      }`}
                    >
                      <Star
                        className={`w-3.5 h-3.5 ${
                          star <= reviewRating ? 'fill-amber-400 text-amber-400' : 'text-slate-400'
                        }`}
                      />
                      <span>{star}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  Your Review & Ranking Thoughts
                </label>
                <textarea
                  rows={3}
                  required
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Write your movie/game review or explain how you would rank these 10 entries..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-[#141826] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="flex items-center justify-between gap-4">
                {submittedBanner ? (
                  <span className="text-xs font-semibold text-emerald-500">
                    ✓ Your review is now live and synced with the Admin Panel!
                  </span>
                ) : (
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Instant live publication + Admin moderation sync
                  </span>
                )}

                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/25 transition-all whitespace-nowrap shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post Review</span>
                </button>
              </div>
            </form>

            {/* Visitor Reviews Feed */}
            <div className="space-y-4">
              {listReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-6 rounded-2xl bg-white dark:bg-[#0D101A] border border-slate-200 dark:border-white/10"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-bold text-slate-900 dark:text-white text-sm">
                        {rev.visitorName}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{rev.visitorLocation}</span>
                      {rev.targetItemTitle && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-rose-500 dark:text-rose-400 font-semibold">
                            {rev.targetItemTitle}
                          </span>
                        </>
                      )}
                      <span aria-hidden="true">·</span>
                      <span>{rev.createdAt}</span>
                    </div>

                    <div className="flex items-center gap-1 text-amber-400">
                      {Array.from({ length: rev.rating }).map((_, idx) => (
                        <Star key={idx} className="w-3.5 h-3.5 fill-amber-400" />
                      ))}
                    </div>
                  </div>

                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                    {rev.comment}
                  </p>

                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>Moderation Status: {rev.status}</span>
                    <button
                      type="button"
                      onClick={() => onUpvoteReview(rev.id)}
                      className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-rose-500 font-mono-tabular font-semibold transition-colors"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>Helpful ({rev.upvotes})</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
};
