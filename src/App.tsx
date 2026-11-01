import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sun,
  Moon,
  Search,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Star,
  ThumbsUp,
  ThumbsDown,
  ArrowUpRight,
  BookOpen,
  X,
  Flame,
  Trophy,
  MessageSquarePlus,
  Send,
} from 'lucide-react';
import {
  INITIAL_CATEGORIES,
  INITIAL_TOP_LISTS,
  INITIAL_COMMUNITY_POLLS,
  INITIAL_BLOGS,
  INITIAL_VISITOR_REVIEWS,
  CategoryItem,
  TopTenList,
  CommunityPoll,
  EditorialBlog,
  VisitorReview,
} from './data/initialData';
import { EditorialArtwork, ArtworkTheme } from './components/EditorialArtwork';
import { HeroShowcase } from './components/HeroShowcase';
import { InteractiveHomepageWidgets } from './components/InteractiveHomepageWidgets';
import { ListReaderModal } from './components/ListReaderModal';
import { AdminStudioView } from './components/AdminStudioView';

const CATEGORY_THEMES: ArtworkTheme[] = [
  'scifi-portal',
  'weird-artifacts',
  'gaming-citadel',
  'horror-manor',
  'cosmic-disaster',
  'coldwar-mystery',
  'true-crime',
  'bizarre-nature',
  'pop-cinema',
  'ancient-myth',
];

type ActiveSection = 'home' | 'polls' | 'blogs' | 'admin';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<ActiveSection>('home');

  // Core Stateful Data (Shared between Frontend & Admin Studio)
  const [categories, setCategories] = useState<CategoryItem[]>(INITIAL_CATEGORIES);
  const [lists, setLists] = useState<TopTenList[]>(INITIAL_TOP_LISTS);
  const [polls, setPolls] = useState<CommunityPoll[]>(INITIAL_COMMUNITY_POLLS);
  const [blogs] = useState<EditorialBlog[]>(INITIAL_BLOGS);
  const [reviews, setReviews] = useState<VisitorReview[]>(INITIAL_VISITOR_REVIEWS);

  // Interactive Reader & Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'editorial' | 'votes' | 'rating'>('editorial');
  const [activeReaderListId, setActiveReaderListId] = useState<string | null>(null);
  const [activeBlogModal, setActiveBlogModal] = useState<EditorialBlog | null>(null);

  // Live Interactive Homepage Ranking Arena State
  const [arenaListId, setArenaListId] = useState<string>(INITIAL_TOP_LISTS[0].id);

  // Quick Homepage Review Modal State
  const [showQuickReviewModal, setShowQuickReviewModal] = useState<boolean>(false);
  const [quickRevListId, setQuickRevListId] = useState<string>(INITIAL_TOP_LISTS[0].id);
  const [quickRevName, setQuickRevName] = useState<string>('');
  const [quickRevLocation, setQuickRevLocation] = useState<string>('');
  const [quickRevTarget, setQuickRevTarget] = useState<string>('Entire Top 10 List');
  const [quickRevRating, setQuickRevRating] = useState<number>(5);
  const [quickRevComment, setQuickRevComment] = useState<string>('');

  // Auto-Transitioning Hero Carousel State
  const heroLists = lists.filter((l) => l.featuredInHero);
  const [heroIndex, setHeroIndex] = useState<number>(0);
  const [isHeroPlaying, setIsHeroPlaying] = useState<boolean>(true);

  // Sync Dark/Light theme class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  // Auto-transition hero showcase every 5.5 seconds
  useEffect(() => {
    if (!isHeroPlaying || heroLists.length <= 1 || activeReaderListId || activeSection !== 'home') {
      return;
    }
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroLists.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isHeroPlaying, heroLists.length, activeReaderListId, activeSection]);

  const currentHeroList = heroLists[heroIndex % Math.max(1, heroLists.length)] || lists[0];
  const activeReaderList = lists.find((l) => l.id === activeReaderListId) || null;
  const arenaList = lists.find((l) => l.id === arenaListId) || lists[0];

  // Visitor Vote on a #10-#1 Entry
  const handleVoteEntry = (listId: string, entryRank: number, direction: 'up' | 'down') => {
    setLists((prev) =>
      prev.map((list) => {
        if (list.id !== listId) return list;
        let deltaTotal = 0;
        const updatedEntries = list.entries.map((entry) => {
          if (entry.rank !== entryRank) return entry;
          const currentVote = entry.userVote || null;
          let delta = 0;
          let nextVote: 'up' | 'down' | null = direction;

          if (currentVote === direction) {
            delta = direction === 'up' ? -1 : 1;
            nextVote = null;
          } else if (currentVote === null) {
            delta = direction === 'up' ? 1 : -1;
          } else {
            delta = direction === 'up' ? 2 : -2;
          }
          deltaTotal += delta;
          return {
            ...entry,
            votes: Math.max(0, entry.votes + delta),
            userVote: nextVote,
          };
        });
        return {
          ...list,
          totalVotes: Math.max(0, list.totalVotes + deltaTotal),
          entries: updatedEntries,
        };
      })
    );
  };

  // Visitor Star Rating on a #10-#1 Entry
  const handleRateEntry = (listId: string, entryRank: number, stars: number) => {
    setLists((prev) =>
      prev.map((list) => {
        if (list.id !== listId) return list;
        const updatedEntries = list.entries.map((entry) => {
          if (entry.rank !== entryRank) return entry;
          const newCount = entry.ratingCount + 1;
          const newAvg = Number(((entry.rating * entry.ratingCount + stars) / newCount).toFixed(1));
          return {
            ...entry,
            rating: newAvg,
            ratingCount: newCount,
          };
        });
        const newListCount = list.ratingCount + 1;
        const newListAvg = Number(
          ((list.averageRating * list.ratingCount + stars) / newListCount).toFixed(1)
        );
        return {
          ...list,
          averageRating: newListAvg,
          ratingCount: newListCount,
          entries: updatedEntries,
        };
      })
    );
  };

  // Visitor Poll Voting
  const handleVotePoll = (pollId: string, optionId: string) => {
    setPolls((prev) =>
      prev.map((poll) => {
        if (poll.id !== pollId) return poll;
        if (poll.userVotedOptionId === optionId) return poll;

        const hadPreviousVote = Boolean(poll.userVotedOptionId);
        const updatedOptions = poll.options.map((opt) => {
          if (opt.id === optionId) {
            return { ...opt, votes: opt.votes + 1 };
          }
          if (opt.id === poll.userVotedOptionId) {
            return { ...opt, votes: Math.max(0, opt.votes - 1) };
          }
          return opt;
        });

        return {
          ...poll,
          totalVotes: hadPreviousVote ? poll.totalVotes : poll.totalVotes + 1,
          userVotedOptionId: optionId,
          options: updatedOptions,
        };
      })
    );
  };

  // Add Visitor Review / Comment
  const handleAddVisitorReview = (
    newRev: Omit<VisitorReview, 'id' | 'createdAt' | 'upvotes' | 'status'>
  ) => {
    const created: VisitorReview = {
      ...newRev,
      id: `rev-${Date.now()}`,
      createdAt: 'Just now',
      upvotes: 1,
      status: 'Approved',
    };
    setReviews((prev) => [created, ...prev]);
  };

  const handleQuickReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickRevName.trim() || !quickRevComment.trim()) return;
    const targetList = lists.find((l) => l.id === quickRevListId) || lists[0];
    handleAddVisitorReview({
      listId: targetList.id,
      listTitle: targetList.title,
      targetItemTitle: quickRevTarget,
      visitorName: quickRevName.trim(),
      visitorLocation: quickRevLocation.trim() || 'Global Reader',
      rating: quickRevRating,
      comment: quickRevComment.trim(),
    });
    setQuickRevName('');
    setQuickRevLocation('');
    setQuickRevComment('');
    setShowQuickReviewModal(false);
  };

  const handleUpvoteReview = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, upvotes: r.upvotes + 1 } : r))
    );
  };

  // Admin Handlers
  const handleAddCategory = (cat: Omit<CategoryItem, 'id' | 'count'>) => {
    setCategories((prev) => [...prev, { ...cat, id: `cat-${Date.now()}`, count: 1 }]);
  };

  const handleDeleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const handleAddTopList = (newList: TopTenList) => {
    setLists((prev) => [newList, ...prev]);
  };

  const handleDeleteTopList = (id: string) => {
    setLists((prev) => prev.filter((l) => l.id !== id));
  };

  const handleToggleHeroFeature = (id: string) => {
    setLists((prev) =>
      prev.map((l) => (l.id === id ? { ...l, featuredInHero: !l.featuredInHero } : l))
    );
  };

  const handleUpdateReviewStatus = (reviewId: string, status: VisitorReview['status']) => {
    setReviews((prev) => prev.map((r) => (r.id === reviewId ? { ...r, status } : r)));
  };

  const handleDeleteReview = (reviewId: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
  };

  // Filtered & Sorted Lists for Main Grid
  const filteredLists = lists
    .filter((l) => {
      const matchesCat = selectedCategory === 'All' || l.category === selectedCategory;
      const matchesQuery =
        !searchQuery.trim() ||
        l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.deck.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.entries.some((e) => e.title.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesQuery;
    })
    .sort((a, b) => {
      if (sortOrder === 'votes') return b.totalVotes - a.totalVotes;
      if (sortOrder === 'rating') return b.averageRating - a.averageRating;
      return 0;
    });

  // Live Community-Sorted Entries for the Interactive Ranking Arena
  const sortedArenaEntries = [...(arenaList?.entries || [])].sort((a, b) => b.votes - a.votes);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#06070B] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* STRICT 3-ZONE TOP BAR CONTRACT */}
      <header className="flex items-center justify-between gap-8 px-6 py-4 border-b border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#06070B]/90 backdrop-blur-xl sticky top-0 z-40">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            setActiveReaderListId(null);
            setActiveSection('home');
          }}
          className="text-2xl font-editorial font-extrabold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0"
        >
          TENFOLD
        </a>

        {/* Zone 2: 5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600 dark:text-slate-400">
          <a
            href="#chronicles"
            onClick={(e) => {
              e.preventDefault();
              setActiveReaderListId(null);
              setActiveSection('home');
            }}
            className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 ${
              activeSection === 'home' && !activeReaderListId
                ? 'text-rose-600 dark:text-rose-400 underline underline-offset-8 decoration-rose-500 decoration-2'
                : ''
            }`}
          >
            Top 10 Lists
          </a>
          <a
            href="#polls"
            onClick={(e) => {
              e.preventDefault();
              setActiveReaderListId(null);
              setActiveSection('polls');
            }}
            className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 ${
              activeSection === 'polls'
                ? 'text-rose-600 dark:text-rose-400 underline underline-offset-8 decoration-rose-500 decoration-2'
                : ''
            }`}
          >
            Community Polls
          </a>
          <a
            href="#blogs"
            onClick={(e) => {
              e.preventDefault();
              setActiveReaderListId(null);
              setActiveSection('blogs');
            }}
            className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 ${
              activeSection === 'blogs'
                ? 'text-rose-600 dark:text-rose-400 underline underline-offset-8 decoration-rose-500 decoration-2'
                : ''
            }`}
          >
            Editorial Blogs
          </a>
          <a
            href="#admin"
            onClick={(e) => {
              e.preventDefault();
              setActiveReaderListId(null);
              setActiveSection('admin');
            }}
            className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 ${
              activeSection === 'admin'
                ? 'text-rose-600 dark:text-rose-400 underline underline-offset-8 decoration-rose-500 decoration-2'
                : ''
            }`}
          >
            Admin Studio
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              setActiveReaderListId(null);
              setActiveSection(activeSection === 'admin' ? 'home' : 'admin');
            }}
            className="px-4 py-2 text-xs font-bold text-white bg-rose-600 rounded-xl hover:bg-rose-500 shadow-lg shadow-rose-600/25 transition-all whitespace-nowrap shrink-0"
          >
            {activeSection === 'admin' ? 'Exit Admin Panel' : 'Admin Studio'}
          </button>
        </div>
      </header>

      {/* UTILITY, SEARCH & LIGHT/DARK THEME RIBBON */}
      <div className="border-b border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-[#0B0D14] px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          {/* Category Quick-Filter Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 max-w-full lg:max-w-3xl">
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setActiveReaderListId(null);
                setActiveSection('home');
              }}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === 'All' && activeSection === 'home'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All Top 10s
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat.name);
                  setActiveReaderListId(null);
                  setActiveSection('home');
                }}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  selectedCategory === cat.name && activeSection === 'home'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Input + Write Review Button + Light/Dark Theme Switcher */}
          <div className="flex items-center gap-2.5 ml-auto">
            <div className="relative w-44 sm:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeSection !== 'home') setActiveSection('home');
                  if (activeReaderListId) setActiveReaderListId(null);
                }}
                placeholder="Search movies, games, lists..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-white dark:bg-[#141826] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <button
              type="button"
              onClick={() => setShowQuickReviewModal(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-[#141826] text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-white/10 hover:border-rose-500 transition-colors whitespace-nowrap shrink-0"
            >
              <MessageSquarePlus className="w-3.5 h-3.5 text-rose-500" />
              <span>Write Review</span>
            </button>

            {/* Light / Dark Mode Toggle */}
            <button
              type="button"
              onClick={() => setIsDark((prev) => !prev)}
              aria-label="Toggle Light or Dark Theme"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-[#141826] text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-white/10 hover:border-rose-500 transition-colors whitespace-nowrap shrink-0"
            >
              {isDark ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-700" />
                  <span>Dark</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* VIEW ROUTING */}
      {activeReaderList ? (
        <ListReaderModal
          list={activeReaderList}
          reviews={reviews}
          onClose={() => setActiveReaderListId(null)}
          onVoteEntry={handleVoteEntry}
          onRateEntry={handleRateEntry}
          onAddVisitorReview={handleAddVisitorReview}
          onUpvoteReview={handleUpvoteReview}
        />
      ) : activeSection === 'admin' ? (
        <AdminStudioView
          categories={categories}
          lists={lists}
          reviews={reviews}
          polls={polls}
          onAddCategory={handleAddCategory}
          onDeleteCategory={handleDeleteCategory}
          onAddTopList={handleAddTopList}
          onDeleteTopList={handleDeleteTopList}
          onToggleHeroFeature={handleToggleHeroFeature}
          onUpdateReviewStatus={handleUpdateReviewStatus}
          onDeleteReview={handleDeleteReview}
          onSelectListToRead={(list) => setActiveReaderListId(list.id)}
        />
      ) : (
        <main className="space-y-24 pb-24">
          {/* 1. FULL-BLEED CINEMATIC AUTO-TRANSITIONING HERO SHOWCASE */}
          {activeSection === 'home' && currentHeroList && (
            <HeroShowcase
              heroLists={heroLists}
              heroIndex={heroIndex}
              isHeroPlaying={isHeroPlaying}
              onSelectHeroIndex={(idx) => {
                setHeroIndex(idx);
                setIsHeroPlaying(false);
              }}
              onTogglePlay={() => setIsHeroPlaying((prev) => !prev)}
              onPrev={() =>
                setHeroIndex((prev) => (prev - 1 + heroLists.length) % heroLists.length)
              }
              onNext={() => setHeroIndex((prev) => (prev + 1) % heroLists.length)}
              onOpenReader={(listId) => setActiveReaderListId(listId)}
              onVoteEntry={handleVoteEntry}
            />
          )}

          {/* 2. ASYMMETRIC MAGAZINE BENTO GRID OF TOP 10 CHRONICLES */}
          {activeSection === 'home' && (
            <section id="chronicles" className="max-w-7xl mx-auto px-6 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/10">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-rose-500 mb-1">
                    Curated Listverse-Scale Countdowns
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-editorial font-extrabold text-slate-900 dark:text-white">
                    {selectedCategory === 'All'
                      ? 'Trending Top 10 Lists & Reviews'
                      : `${selectedCategory} — Top 10 Countdowns`}
                  </h2>
                </div>

                {/* Sort Segmented Control */}
                <div className="flex items-center gap-1.5 bg-slate-200/70 dark:bg-[#111522] p-1 rounded-xl border border-slate-300/60 dark:border-white/10 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setSortOrder('editorial')}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                      sortOrder === 'editorial'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Editorial Pick
                  </button>
                  <button
                    type="button"
                    onClick={() => setSortOrder('votes')}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                      sortOrder === 'votes'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Most Voted
                  </button>
                  <button
                    type="button"
                    onClick={() => setSortOrder('rating')}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                      sortOrder === 'rating'
                        ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    Highest Rated
                  </button>
                </div>
              </div>

              {filteredLists.length === 0 ? (
                <div className="p-12 text-center rounded-2xl bg-white dark:bg-[#0D101A] border border-slate-200 dark:border-white/10">
                  <p className="text-base text-slate-600 dark:text-slate-400 mb-4">
                    No Top 10 chronicles matched your current filter or search query.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('All');
                      setSearchQuery('');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-rose-600 text-white text-xs font-bold"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
                  {filteredLists.map((list, index) => {
                    const isFeaturedWide = index === 0 && selectedCategory === 'All' && !searchQuery;
                    const topThree = list.entries
                      .filter((e) => e.rank <= 3)
                      .sort((a, b) => a.rank - b.rank);

                    return (
                      <motion.article
                        layout
                        key={list.id}
                        onClick={() => setActiveReaderListId(list.id)}
                        className={`${
                          isFeaturedWide ? 'lg:col-span-8' : 'lg:col-span-4'
                        } group rounded-2xl bg-white dark:bg-[#0D101A] border border-slate-200 dark:border-white/10 overflow-hidden flex flex-col justify-between cursor-pointer hover:border-rose-500/60 transition-all shadow-sm hover:shadow-xl`}
                      >
                        <div>
                          <div
                            className={`${
                              isFeaturedWide ? 'aspect-[21/9]' : 'aspect-video'
                            } overflow-hidden border-b border-slate-200 dark:border-white/10 relative`}
                          >
                            <EditorialArtwork
                              theme={list.artworkTheme}
                              driveImageUrl={list.driveImageUrl}
                              driveVideoUrl={list.driveVideoUrl}
                              alt={list.title}
                              rankNumber={10}
                            />
                          </div>

                          <div className="p-6">
                            {/* Unboxed Metadata Line */}
                            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2.5">
                              <span className="font-bold text-rose-600 dark:text-rose-400">
                                {list.category}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span>{list.readTime}</span>
                              <span aria-hidden="true">·</span>
                              <span className="font-mono-tabular font-bold text-amber-500 dark:text-amber-400">
                                ★ {list.averageRating.toFixed(1)}
                              </span>
                              <span aria-hidden="true">·</span>
                              <span className="font-mono-tabular">{list.viewsCount} reads</span>
                            </div>

                            <h3
                              className={`${
                                isFeaturedWide ? 'text-2xl sm:text-3xl' : 'text-xl'
                              } font-editorial font-extrabold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors leading-snug mb-2.5`}
                            >
                              {list.title}
                            </h3>

                            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-5">
                              {list.deck}
                            </p>

                            {/* Podium Preview (#01, #02, #03) with Visual Thumbnails & Quick Upvote */}
                            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#131726] border border-slate-200/70 dark:border-white/5 space-y-2.5">
                              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center justify-between">
                                <span>Top Podium Preview</span>
                                <span>Quick Upvote</span>
                              </div>
                              {topThree.map((entry) => (
                                <div
                                  key={entry.rank}
                                  className="flex items-center justify-between text-xs gap-2.5"
                                >
                                  <div className="flex items-center gap-2.5 min-w-0">
                                    <div className="w-9 h-6 rounded overflow-hidden shrink-0 border border-slate-300 dark:border-white/10">
                                      <EditorialArtwork
                                        theme={list.artworkTheme}
                                        variantIndex={entry.rank}
                                        alt={entry.title}
                                        className="w-full h-full"
                                      />
                                    </div>
                                    <div className="truncate text-slate-800 dark:text-slate-200 font-medium">
                                      <span className="font-mono-tabular font-extrabold text-rose-500 mr-1.5">
                                        #0{entry.rank}
                                      </span>
                                      <span>{entry.title}</span>
                                    </div>
                                  </div>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleVoteEntry(list.id, entry.rank, 'up');
                                    }}
                                    className={`px-2 py-0.5 rounded font-mono-tabular text-[11px] font-bold flex items-center gap-1 shrink-0 transition-colors ${
                                      entry.userVote === 'up'
                                        ? 'bg-rose-600 text-white'
                                        : 'bg-white dark:bg-[#0D101A] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:border-rose-500'
                                    }`}
                                  >
                                    <ThumbsUp className="w-2.5 h-2.5" />
                                    <span>{entry.votes.toLocaleString()}</span>
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="px-6 py-4 bg-slate-50/80 dark:bg-[#111420] border-t border-slate-200/80 dark:border-white/5 flex items-center justify-between text-xs">
                          <span className="font-mono-tabular font-semibold text-slate-600 dark:text-slate-400">
                            {list.totalVotes.toLocaleString()} visitor votes
                          </span>
                          <span className="font-bold text-rose-600 dark:text-rose-400 group-hover:translate-x-1 transition-transform">
                            Read #10 to #01 →
                          </span>
                        </div>
                      </motion.article>
                    );
                  })}
                </div>
              )}
            </section>
          )}

          {/* 3. INTERACTIVE HOMEPAGE MOVIE & GAME LIVE RANKING ARENA */}
          {activeSection === 'home' && arenaList && (
            <section className="max-w-7xl mx-auto px-6">
              <div className="rounded-3xl bg-white dark:bg-[#0D101A] border border-slate-200 dark:border-white/10 p-6 sm:p-10 space-y-8">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-200 dark:border-white/10 pb-6">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-rose-500 mb-1">
                      <Trophy className="w-4 h-4" />
                      <span>Interactive Visitor Ranking Arena · Live Leaderboard</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-editorial font-extrabold text-slate-900 dark:text-white">
                      Vote & Re-Rank the Top 10 in Real Time
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Select any countdown below and upvote or rate individual movies, games, or artifacts. Watch the live community leaderboard reorder instantly.
                    </p>
                  </div>

                  {/* Select Which List to Rank Live */}
                  <div className="flex flex-wrap items-center gap-2">
                    {lists.slice(0, 5).map((l) => (
                      <button
                        key={l.id}
                        type="button"
                        onClick={() => setArenaListId(l.id)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                          arenaList.id === l.id
                            ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/25'
                            : 'bg-slate-100 dark:bg-[#141826] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        {l.category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Re-Ordering List of All 10 Contenders with Visual Artwork Thumbnails */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AnimatePresence mode="popLayout">
                    {sortedArenaEntries.map((entry, idx) => {
                      const communityRank = idx + 1;
                      return (
                        <motion.div
                          layout
                          key={`${arenaList.id}-${entry.rank}`}
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.25 }}
                          className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#131726] border border-slate-200/80 dark:border-white/10 flex items-center justify-between gap-3.5"
                        >
                          <div
                            onClick={() => setActiveReaderListId(arenaList.id)}
                            className="flex items-center gap-3.5 min-w-0 cursor-pointer group"
                          >
                            {/* Visual Thumbnail with Rank Badge */}
                            <div className="w-16 h-12 rounded-xl overflow-hidden relative shrink-0 border border-slate-300 dark:border-white/15">
                              <EditorialArtwork
                                theme={arenaList.artworkTheme}
                                variantIndex={entry.rank}
                                alt={entry.title}
                                className="w-full h-full"
                              />
                              <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                                <span className="font-mono-tabular text-xs font-extrabold text-white drop-shadow">
                                  #{communityRank < 10 ? `0${communityRank}` : communityRank}
                                </span>
                              </div>
                            </div>

                            <div className="min-w-0">
                              <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-rose-500 transition-colors truncate">
                                {entry.title}
                              </div>
                              <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                                Editorial #{entry.rank} · ★ {entry.rating.toFixed(1)} · {entry.yearOrOrigin}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => handleVoteEntry(arenaList.id, entry.rank, 'up')}
                              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono-tabular font-bold transition-colors ${
                                entry.userVote === 'up'
                                  ? 'bg-rose-600 text-white'
                                  : 'bg-white dark:bg-[#0D101A] text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-white/10 hover:border-rose-500'
                              }`}
                            >
                              <ThumbsUp className="w-3.5 h-3.5" />
                              <span>{entry.votes.toLocaleString()}</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleVoteEntry(arenaList.id, entry.rank, 'down')}
                              className={`p-1.5 rounded-xl border transition-colors ${
                                entry.userVote === 'down'
                                  ? 'bg-slate-800 text-white border-slate-700'
                                  : 'bg-white dark:bg-[#0D101A] text-slate-400 border-slate-300 dark:border-white/10 hover:text-slate-900 dark:hover:text-white'
                              }`}
                              title="Rank Lower"
                            >
                              <ThumbsDown className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Currently ranking: <strong className="text-slate-900 dark:text-white">{arenaList.title}</strong>
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveReaderListId(arenaList.id)}
                    className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline"
                  >
                    Open Full #10 to #01 Essay & Fact Checks →
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* 3B. INTERACTIVE HOMEPAGE WIDGETS (#1 HALL OF FAME GALLERY, VISUAL HEAD-TO-HEAD DUELS & FACT QUIZ) */}
          {activeSection === 'home' && (
            <InteractiveHomepageWidgets
              lists={lists}
              onOpenReader={(listId) => setActiveReaderListId(listId)}
              onRateEntry={handleRateEntry}
              onVoteEntry={handleVoteEntry}
            />
          )}

          {/* 4. EXPLORE ALL 10+ TOP 10 CATEGORIES VISUAL POSTER MATRIX */}
          {activeSection === 'home' && (
            <section className="max-w-7xl mx-auto px-6 space-y-6">
              <div className="flex items-end justify-between border-b border-slate-200 dark:border-white/10 pb-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-rose-500 mb-1">
                    Complete Listverse-Style Directory
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-editorial font-extrabold text-slate-900 dark:text-white">
                    Explore Every Top 10 Category Universe
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {categories.map((cat, idx) => {
                  const catTheme = CATEGORY_THEMES[idx % CATEGORY_THEMES.length];
                  const isSelected = selectedCategory === cat.name;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat.name);
                        const el = document.getElementById('chronicles');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`group relative rounded-2xl overflow-hidden border text-left transition-all min-h-[175px] flex flex-col justify-end p-5 ${
                        isSelected
                          ? 'border-rose-500 ring-2 ring-rose-500/40 shadow-xl'
                          : 'border-slate-200 dark:border-white/10 hover:border-rose-500/60'
                      }`}
                    >
                      <div className="absolute inset-0">
                        <EditorialArtwork
                          theme={catTheme}
                          variantIndex={idx % 4}
                          alt={cat.name}
                          className="w-full h-full"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20" />
                      </div>

                      <div className="relative z-20 w-full">
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="font-editorial font-extrabold text-base text-white group-hover:text-rose-300 transition-colors">
                            {cat.name}
                          </span>
                          <span className="font-mono-tabular text-xs font-extrabold text-rose-400">
                            {cat.count}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                          {cat.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {/* 5. INTERACTIVE COMMUNITY POLLS & HEAD-TO-HEAD BATTLES */}
          {(activeSection === 'home' || activeSection === 'polls') && (
            <section id="polls" className="max-w-7xl mx-auto px-6 space-y-8">
              <div className="border-b border-slate-200 dark:border-white/10 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-rose-500 mb-1">
                    Live Community Polls · Instant Percentage Bars
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-editorial font-extrabold text-slate-900 dark:text-white">
                    Cast Your Vote in Active Reader Showdowns
                  </h2>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Click any contender to vote and immediately recalculate community standings.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {polls.map((poll) => (
                  <div
                    key={poll.id}
                    className="p-6 rounded-2xl bg-white dark:bg-[#0D101A] border border-slate-200 dark:border-white/10 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                        <span className="font-bold text-rose-500">{poll.category}</span>
                        <span className="font-mono-tabular font-semibold">
                          {poll.totalVotes.toLocaleString()} votes
                        </span>
                      </div>

                      <h3 className="text-lg font-editorial font-bold text-slate-900 dark:text-white leading-snug mb-2">
                        {poll.question}
                      </h3>

                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
                        {poll.description}
                      </p>

                      <div className="space-y-3">
                        {poll.options.map((opt) => {
                          const pct =
                            poll.totalVotes > 0
                              ? Math.round((opt.votes / poll.totalVotes) * 100)
                              : 0;
                          const isSelected = poll.userVotedOptionId === opt.id;

                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => handleVotePoll(poll.id, opt.id)}
                              className={`w-full text-left p-3.5 rounded-xl border transition-all relative overflow-hidden ${
                                isSelected
                                  ? 'border-rose-500 bg-rose-500/10'
                                  : 'border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#131726] hover:border-rose-500/50'
                              }`}
                            >
                              <div
                                className="absolute inset-y-0 left-0 bg-rose-500/15 transition-transform duration-300 origin-left"
                                style={{
                                  width: '100%',
                                  transform: `scaleX(${pct / 100})`,
                                }}
                              />

                              <div className="relative z-10 flex items-baseline justify-between gap-2 mb-1">
                                <span className="text-xs font-bold text-slate-900 dark:text-white">
                                  {opt.title}
                                </span>
                                <span className="font-mono-tabular text-xs font-extrabold text-rose-500 shrink-0">
                                  {pct}% ({opt.votes.toLocaleString()})
                                </span>
                              </div>
                              <div className="relative z-10 text-[11px] text-slate-500 dark:text-slate-400">
                                {opt.detail}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-200/70 dark:border-white/10 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                      <span>
                        {poll.userVotedOptionId
                          ? '✓ Ballot recorded in live poll'
                          : 'Click any option above to vote'}
                      </span>
                      <span className="font-mono-tabular">Live Poll</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 6. DEEP-DIVE EDITORIAL BLOGS & ESSAYS */}
          {(activeSection === 'home' || activeSection === 'blogs') && (
            <section id="blogs" className="max-w-7xl mx-auto px-6 space-y-8">
              <div className="border-b border-slate-200 dark:border-white/10 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-rose-500 mb-1">
                    Editorial Features & Deep-Dive Blogs
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-editorial font-extrabold text-slate-900 dark:text-white">
                    Long-Form Essays Behind the Countdowns
                  </h2>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Click any feature article to open the full essay reader.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {blogs.map((blog) => (
                  <article
                    key={blog.id}
                    onClick={() => setActiveBlogModal(blog)}
                    className="group rounded-2xl bg-white dark:bg-[#0D101A] border border-slate-200 dark:border-white/10 overflow-hidden grid grid-cols-1 sm:grid-cols-12 cursor-pointer hover:border-rose-500/60 transition-all"
                  >
                    <div className="sm:col-span-5 min-h-[220px]">
                      <EditorialArtwork
                        theme={blog.artworkTheme}
                        alt={blog.title}
                        className="w-full h-full"
                      />
                    </div>
                    <div className="sm:col-span-7 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                          <span className="font-bold text-rose-500">{blog.category}</span>
                          <span aria-hidden="true">·</span>
                          <span>{blog.readTime}</span>
                        </div>

                        <h3 className="text-lg font-editorial font-bold text-slate-900 dark:text-white group-hover:text-rose-500 transition-colors leading-snug mb-2">
                          {blog.title}
                        </h3>

                        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                          {blog.excerpt}
                        </p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-slate-200/70 dark:border-white/10 flex items-center justify-between text-xs">
                        <span className="text-slate-500 dark:text-slate-400 font-medium">
                          {blog.author}
                        </span>
                        <span className="font-bold text-rose-500 flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Read Full Blog →</span>
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* 7. VISITOR MOVIE & LIST REVIEWS WALL */}
          {activeSection === 'home' && (
            <section className="max-w-7xl mx-auto px-6 space-y-6">
              <div className="border-b border-slate-200 dark:border-white/10 pb-4 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-rose-500 mb-1">
                    Community Voice · Movie & Entry Critiques
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-editorial font-extrabold text-slate-900 dark:text-white">
                    Latest Visitor Reviews & Ratings ({reviews.length})
                  </h2>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setShowQuickReviewModal(true)}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors whitespace-nowrap shrink-0"
                  >
                    + Submit Movie / List Review
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {reviews.slice(0, 6).map((rev) => (
                  <div
                    key={rev.id}
                    className="p-6 rounded-2xl bg-white dark:bg-[#0D101A] border border-slate-200 dark:border-white/10 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                        <span className="font-bold text-slate-900 dark:text-white">
                          {rev.visitorName} · {rev.visitorLocation}
                        </span>
                        <span className="font-mono-tabular font-bold text-amber-400">
                          ★ {rev.rating}.0
                        </span>
                      </div>

                      <div className="text-xs font-bold text-rose-500 mb-2 truncate">
                        {rev.targetItemTitle} — {rev.listTitle}
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-4">
                        “{rev.comment}”
                      </p>
                    </div>

                    <div className="pt-3 mt-4 border-t border-slate-200/70 dark:border-white/10 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>{rev.createdAt}</span>
                      <button
                        type="button"
                        onClick={() => handleUpvoteReview(rev.id)}
                        className="flex items-center gap-1.5 font-mono-tabular font-bold hover:text-rose-500 transition-colors"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>Helpful ({rev.upvotes})</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>
      )}

      {/* QUICK VISITOR REVIEW MODAL */}
      {showQuickReviewModal && (
        <div
          onClick={() => setShowQuickReviewModal(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-lg w-full rounded-2xl bg-white dark:bg-[#0D101A] border border-slate-200 dark:border-white/15 p-6 sm:p-8 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-editorial font-bold text-slate-900 dark:text-white">
                Submit a Movie or Top 10 Review
              </h3>
              <button
                type="button"
                onClick={() => setShowQuickReviewModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleQuickReviewSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  Select Top 10 List
                </label>
                <select
                  value={quickRevListId}
                  onChange={(e) => setQuickRevListId(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#141826] border border-slate-300 dark:border-white/10"
                >
                  {lists.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={quickRevName}
                    onChange={(e) => setQuickRevName(e.target.value)}
                    placeholder="e.g. Jordan V."
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#141826] border border-slate-300 dark:border-white/10"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                    Movie / Entry Name
                  </label>
                  <input
                    type="text"
                    value={quickRevTarget}
                    onChange={(e) => setQuickRevTarget(e.target.value)}
                    placeholder="e.g. #1 Interstellar"
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#141826] border border-slate-300 dark:border-white/10"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  Rating (1 to 5 Stars)
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setQuickRevRating(s)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-mono-tabular font-bold flex items-center gap-1 ${
                        s <= quickRevRating
                          ? 'border-amber-400 bg-amber-400/10 text-amber-400'
                          : 'border-slate-300 dark:border-white/10 text-slate-400'
                      }`}
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{s}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
                  Review Comment
                </label>
                <textarea
                  rows={3}
                  required
                  value={quickRevComment}
                  onChange={(e) => setQuickRevComment(e.target.value)}
                  placeholder="Share your review and how you rank this entry..."
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#141826] border border-slate-300 dark:border-white/10"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Publish Review</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* BLOG READER MODAL */}
      {activeBlogModal && (
        <div
          onClick={() => setActiveBlogModal(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-3xl w-full rounded-2xl bg-white dark:bg-[#0D101A] border border-slate-300 dark:border-white/15 overflow-hidden my-8"
          >
            <div className="aspect-video relative">
              <EditorialArtwork theme={activeBlogModal.artworkTheme} alt={activeBlogModal.title} />
              <button
                type="button"
                onClick={() => setActiveBlogModal(null)}
                className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/80 text-white hover:bg-rose-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 sm:p-10 space-y-6">
              <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400">
                <span className="text-rose-500 font-bold">{activeBlogModal.category}</span>
                <span aria-hidden="true">·</span>
                <span>{activeBlogModal.publishedAt}</span>
                <span aria-hidden="true">·</span>
                <span>{activeBlogModal.readTime}</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-editorial font-extrabold text-slate-900 dark:text-white leading-tight">
                {activeBlogModal.title}
              </h2>

              <p className="text-base text-slate-600 dark:text-slate-300">
                {activeBlogModal.subtitle}
              </p>

              <blockquote className="py-5 border-y border-slate-200 dark:border-white/10 text-lg sm:text-xl font-editorial italic text-rose-600 dark:text-rose-400">
                “{activeBlogModal.pullQuote}”
              </blockquote>

              <div className="space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed">
                {activeBlogModal.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EDITORIAL FOOTER */}
      <footer className="border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#050609] py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-xs text-slate-500 dark:text-slate-400">
          <div>
            <span className="font-editorial font-extrabold text-slate-900 dark:text-white text-lg mr-3">
              TENFOLD
            </span>
            <span>
              Definitive Top 10 Chronicles, Film & Gaming Reviews, and Live Community Ranking Platform.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-semibold">
            <button
              type="button"
              onClick={() => {
                setActiveReaderListId(null);
                setActiveSection('home');
              }}
              className="hover:text-rose-500 transition-colors"
            >
              Top 10 Lists
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveReaderListId(null);
                setActiveSection('polls');
              }}
              className="hover:text-rose-500 transition-colors"
            >
              Community Polls
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveReaderListId(null);
                setActiveSection('blogs');
              }}
              className="hover:text-rose-500 transition-colors"
            >
              Editorial Blogs
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveReaderListId(null);
                setActiveSection('admin');
              }}
              className="hover:text-rose-500 transition-colors"
            >
              Admin Studio
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
