import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Check,
  Star,
  Link2,
  Search,
  FolderPlus,
  MessageSquare,
  ListOrdered,
  Eye,
} from 'lucide-react';
import {
  CategoryItem,
  TopTenList,
  VisitorReview,
  CommunityPoll,
} from '../data/initialData';
import {
  ArtworkTheme,
  EditorialArtwork,
  parseGoogleDriveUrl,
} from './EditorialArtwork';

interface AdminStudioViewProps {
  categories: CategoryItem[];
  lists: TopTenList[];
  reviews: VisitorReview[];
  polls: CommunityPoll[];
  onAddCategory: (cat: Omit<CategoryItem, 'id' | 'count'>) => void;
  onDeleteCategory: (id: string) => void;
  onAddTopList: (newList: TopTenList) => void;
  onDeleteTopList: (id: string) => void;
  onToggleHeroFeature: (id: string) => void;
  onUpdateReviewStatus: (reviewId: string, status: VisitorReview['status']) => void;
  onDeleteReview: (reviewId: string) => void;
  onSelectListToRead: (list: TopTenList) => void;
}

export const AdminStudioView: React.FC<AdminStudioViewProps> = ({
  categories,
  lists,
  reviews,
  polls,
  onAddCategory,
  onDeleteCategory,
  onAddTopList,
  onDeleteTopList,
  onToggleHeroFeature,
  onUpdateReviewStatus,
  onDeleteReview,
  onSelectListToRead,
}) => {
  const [activeTab, setActiveTab] = useState<'lists' | 'publish' | 'categories' | 'visitors'>('lists');
  const [searchQuery, setSearchQuery] = useState('');
  const [reviewFilter, setReviewFilter] = useState<'All' | VisitorReview['status']>('All');

  // Category Form State
  const [catName, setCatName] = useState('');
  const [catDesc, setCatDesc] = useState('');

  // Publish New Top 10 List Form State
  const [title, setTitle] = useState('');
  const [deck, setDeck] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.name || 'Sci-Fi Cinema');
  const [author, setAuthor] = useState('Editorial Curatorial Board');
  const [artworkTheme, setArtworkTheme] = useState<ArtworkTheme>('scifi-portal');
  const [driveImageUrl, setDriveImageUrl] = useState('');
  const [driveVideoUrl, setDriveVideoUrl] = useState('');
  const [featureInHero, setFeatureInHero] = useState(true);
  const [entry1Title, setEntry1Title] = useState('');
  const [entry1Summary, setEntry1Summary] = useState('');
  const [entry2Title, setEntry2Title] = useState('');
  const [entry2Summary, setEntry2Summary] = useState('');
  const [entry3Title, setEntry3Title] = useState('');
  const [entry3Summary, setEntry3Summary] = useState('');
  const [publishSuccess, setPublishSuccess] = useState(false);

  const totalVotesAcrossSite = lists.reduce((acc, item) => acc + item.totalVotes, 0);
  const totalPollVotes = polls.reduce((acc, p) => acc + p.totalVotes, 0);

  const parsedDriveImage = parseGoogleDriveUrl(driveImageUrl);

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) return;
    const slug = catName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    onAddCategory({
      name: catName.trim(),
      slug,
      description: catDesc.trim() || 'Curated Top 10 countdowns and community rankings.',
    });
    setCatName('');
    setCatDesc('');
  };

  const handlePublishList = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !deck.trim()) return;

    const newList: TopTenList = {
      id: `list-custom-${Date.now()}`,
      title: title.trim(),
      deck: deck.trim(),
      category: selectedCategory,
      author: author.trim() || 'Editorial Board',
      authorRole: 'Senior Editor',
      publishedAt: 'November 1, 2026',
      readTime: '11 min read',
      artworkTheme,
      driveImageUrl: driveImageUrl.trim() || undefined,
      driveVideoUrl: driveVideoUrl.trim() || undefined,
      featuredInHero: featureInHero,
      totalVotes: 1250,
      averageRating: 4.9,
      ratingCount: 84,
      viewsCount: '18.2K',
      entries: [
        {
          rank: 10,
          title: 'Entry #10 — The Precursor',
          subtitle: 'Verified Historical & Cinematic Milestone',
          yearOrOrigin: '2026 Edition',
          summary: 'Opening the countdown with foundational mechanics that set the stage for later breakthroughs in the genre.',
          factVerification: 'Verified via primary production notes and peer-reviewed archives.',
          votes: 110,
          rating: 4.7,
          ratingCount: 14,
        },
        {
          rank: 9,
          title: 'Entry #09 — The Catalyst',
          subtitle: 'Structural Leap in Design & Execution',
          yearOrOrigin: 'Archival Selection',
          summary: 'Demonstrated how systemic realism and atmospheric tension outperform conventional spectacle.',
          factVerification: 'Cross-referenced in institutional museum catalogs.',
          votes: 124,
          rating: 4.7,
          ratingCount: 16,
        },
        {
          rank: 8,
          title: 'Entry #08 — The Anomaly',
          subtitle: 'Unexplained Technical Precision',
          yearOrOrigin: 'Documented Record',
          summary: 'An entry that baffled contemporary critics before becoming a touchstone for modern creators.',
          factVerification: 'Primary documentation preserved in national collections.',
          votes: 138,
          rating: 4.8,
          ratingCount: 19,
        },
        {
          rank: 7,
          title: 'Entry #07 — The Paradigm Shift',
          subtitle: 'Redefining Audience Expectations',
          yearOrOrigin: 'Milestone Release',
          summary: 'Introduced non-linear storytelling and physical world rules that remain unmatched decades later.',
          factVerification: 'Confirmed by retrospective engineering interviews.',
          votes: 152,
          rating: 4.8,
          ratingCount: 21,
        },
        {
          rank: 6,
          title: 'Entry #06 — The Hidden Architecture',
          subtitle: 'Sub-Surface Complexity & Lore',
          yearOrOrigin: 'Curated Selection',
          summary: 'Beneath the surface narrative lies a meticulously constructed mathematical and acoustic structure.',
          factVerification: 'Analyzed in academic monographs.',
          votes: 168,
          rating: 4.8,
          ratingCount: 25,
        },
        {
          rank: 5,
          title: 'Entry #05 — The Threshold',
          subtitle: 'Where Realism Meets the Uncanny',
          yearOrOrigin: 'Critical Consensus',
          summary: 'Marks the halfway point of the countdown with an unforgettable synthesis of craft and scale.',
          factVerification: 'Restored from original master elements.',
          votes: 185,
          rating: 4.9,
          ratingCount: 29,
        },
        {
          rank: 4,
          title: 'Entry #04 — The Grand Experiment',
          subtitle: 'Pushing Medium Boundaries to the Limit',
          yearOrOrigin: 'Landmark Work',
          summary: 'A daring technical achievement that required inventing entirely new production pipelines.',
          factVerification: 'Documented in technical whitepapers.',
          votes: 210,
          rating: 4.9,
          ratingCount: 33,
        },
        {
          rank: 3,
          title: entry3Title.trim() || 'Contender #03 — The Bronze Benchmark',
          subtitle: 'Top-Tier Editorial & Community Selection',
          yearOrOrigin: 'Definitive Tier',
          summary:
            entry3Summary.trim() ||
            'Voted into the top three by both our editorial historians and thousands of global reader rankings.',
          factVerification: 'Verified across independent archival sources.',
          votes: 290,
          rating: 4.9,
          ratingCount: 42,
        },
        {
          rank: 2,
          title: entry2Title.trim() || 'Contender #02 — The Penultimate Masterwork',
          subtitle: 'Near-Unanimous Critical Acclaim',
          yearOrOrigin: 'All-Time Classic',
          summary:
            entry2Summary.trim() ||
            'A towering achievement that defined the parameters of its category for an entire generation.',
          factVerification: 'Preserved in permanent international registries.',
          votes: 360,
          rating: 5.0,
          ratingCount: 54,
        },
        {
          rank: 1,
          title: entry1Title.trim() || 'Contender #01 — The Undisputed Apex',
          subtitle: 'The #1 Definitive Selection',
          yearOrOrigin: 'Pinnacle Achievement',
          summary:
            entry1Summary.trim() ||
            'Standing at #1 on our countdown, this work synthesizes scientific rigor, unforgettable atmosphere, and enduring cultural impact.',
          factVerification: 'Unanimously ratified by the Tenfold Curatorial Board.',
          votes: 495,
          rating: 5.0,
          ratingCount: 78,
          driveImageUrl: driveImageUrl.trim() || undefined,
          driveVideoUrl: driveVideoUrl.trim() || undefined,
        },
      ],
    };

    onAddTopList(newList);
    setTitle('');
    setDeck('');
    setEntry1Title('');
    setEntry1Summary('');
    setEntry2Title('');
    setEntry2Summary('');
    setEntry3Title('');
    setEntry3Summary('');
    setPublishSuccess(true);
    setTimeout(() => {
      setPublishSuccess(false);
      setActiveTab('lists');
    }, 1800);
  };

  const filteredLists = lists.filter(
    (l) =>
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredReviews = reviews.filter((r) => {
    const matchesStatus = reviewFilter === 'All' || r.status === reviewFilter;
    const matchesSearch =
      r.visitorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.listTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Studio Header & Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-200 dark:border-white/10">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-rose-500 mb-1">
            Admin Backend Console · Content & Visitor Control
          </div>
          <h1 className="text-3xl font-editorial font-extrabold text-slate-900 dark:text-white">
            Tenfold Publishing & Moderation Studio
          </h1>
        </div>

        {/* Sub-navigation Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-[#111420] rounded-xl border border-slate-200 dark:border-white/10">
          <button
            type="button"
            onClick={() => setActiveTab('lists')}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'lists'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ListOrdered className="w-3.5 h-3.5" />
            <span>Manage Top 10s ({lists.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('publish')}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'publish'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Review + Drive Link</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('categories')}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'categories'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FolderPlus className="w-3.5 h-3.5" />
            <span>Categories ({categories.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('visitors')}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'visitors'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Visitor Reviews ({reviews.length})</span>
          </button>
        </div>
      </div>

      {/* 4-Column KPI Summary Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-8">
        <div className="p-5 rounded-2xl bg-white dark:bg-[#0D101A] border border-slate-200 dark:border-white/10">
          <div className="text-xs text-slate-500 dark:text-slate-400">Published Top 10 Lists</div>
          <div className="text-2xl font-mono-tabular font-extrabold text-slate-900 dark:text-white mt-1">
            {lists.length} Lists · {lists.length * 10} Items
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {lists.filter((l) => l.featuredInHero).length} rotating in Hero Banner
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0D101A] border border-slate-200 dark:border-white/10">
          <div className="text-xs text-slate-500 dark:text-slate-400">Visitor Ranking Votes</div>
          <div className="text-2xl font-mono-tabular font-extrabold text-rose-500 mt-1">
            {totalVotesAcrossSite.toLocaleString()}
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            +{totalPollVotes.toLocaleString()} community poll ballots
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0D101A] border border-slate-200 dark:border-white/10">
          <div className="text-xs text-slate-500 dark:text-slate-400">Active Categories</div>
          <div className="text-2xl font-mono-tabular font-extrabold text-slate-900 dark:text-white mt-1">
            {categories.length} Categories
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Films, Games, Weird Facts, Horror, Space
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-[#0D101A] border border-slate-200 dark:border-white/10">
          <div className="text-xs text-slate-500 dark:text-slate-400">Visitor Movie & Item Reviews</div>
          <div className="text-2xl font-mono-tabular font-extrabold text-amber-400 mt-1">
            {reviews.length} Reviews
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {reviews.filter((r) => r.status === 'Pending Review').length} pending approval
          </div>
        </div>
      </div>

      {/* TAB 1: MANAGE TOP 10 LISTS */}
      {activeTab === 'lists' && (
        <div className="bg-white dark:bg-[#0D101A] rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden">
          <div className="p-5 border-b border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                All Top 10 Lists & Countdown Reviews
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Toggle Hero Carousel rotation, inspect live visitor votes, or open any list in the Countdown Reader.
              </p>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter lists by title or category..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#141826] border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-white/10 text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-[#111522]">
                  <th className="py-3.5 px-4">Top 10 Chronicle Title</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4 text-right">Visitor Votes</th>
                  <th className="py-3.5 px-4 text-right">Avg Rating</th>
                  <th className="py-3.5 px-4 text-center">Hero Carousel</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-white/5 text-sm">
                {filteredLists.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-white/5 transition-colors"
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900 dark:text-white max-w-md truncate">
                        {item.title}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        By {item.author} · {item.publishedAt}
                        {(item.driveImageUrl || item.driveVideoUrl) && ' · Google Drive Media Linked'}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-rose-500 dark:text-rose-400 font-bold whitespace-nowrap">
                      {item.category}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono-tabular text-xs font-bold">
                      {item.totalVotes.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono-tabular text-xs">
                      <span className="text-amber-500 dark:text-amber-400 font-bold">
                        ★ {item.averageRating.toFixed(1)}
                      </span>{' '}
                      <span className="text-slate-400">({item.ratingCount})</span>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => onToggleHeroFeature(item.id)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors whitespace-nowrap shrink-0 ${
                          item.featuredInHero
                            ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                            : 'bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 border border-slate-300 dark:border-white/10'
                        }`}
                      >
                        {item.featuredInHero ? 'Active in Hero' : 'Add to Hero'}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => onSelectListToRead(item)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 hover:bg-rose-600 hover:text-white transition-colors whitespace-nowrap shrink-0"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Open</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteTopList(item.id)}
                          title="Delete List"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: PUBLISH NEW TOP 10 LIST + GOOGLE DRIVE IMAGE/VIDEO LINK UPLOADER */}
      {activeTab === 'publish' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <form
            onSubmit={handlePublishList}
            className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0D101A] border border-slate-200 dark:border-white/10 space-y-5"
          >
            <div>
              <h2 className="text-xl font-editorial font-bold text-slate-900 dark:text-white">
                Publish New Top 10 Review & Google Drive Media
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Paste any Google Drive shared image or video link (`drive.google.com/file/d/.../view`). Our resolver automatically converts file IDs into high-speed direct thumbnails and video embeds.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Top 10 List Headline
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 10 Forgotten Sci-Fi Thrillers With Genius Practical Effects"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-[#141826] border border-slate-300 dark:border-white/10"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Editorial Deck / Summary
                </label>
                <textarea
                  rows={2}
                  required
                  value={deck}
                  onChange={(e) => setDeck(e.target.value)}
                  placeholder="Concise two-sentence thesis introducing the countdown..."
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-[#141826] border border-slate-300 dark:border-white/10"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-[#141826] border border-slate-300 dark:border-white/10"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Visual Backdrop Theme
                </label>
                <select
                  value={artworkTheme}
                  onChange={(e) => setArtworkTheme(e.target.value as ArtworkTheme)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-[#141826] border border-slate-300 dark:border-white/10"
                >
                  <option value="scifi-portal">Sci-Fi Deep Space</option>
                  <option value="weird-artifacts">Ancient Mystery Relics</option>
                  <option value="gaming-citadel">Dark Fantasy Gaming World</option>
                  <option value="horror-manor">Gothic Mist & Horror</option>
                  <option value="cosmic-disaster">Supernova & Cosmic Cataclysm</option>
                  <option value="coldwar-mystery">Declassified Cold-War Radar</option>
                  <option value="bizarre-nature">Abyssal Bioluminescent Ocean</option>
                  <option value="ancient-myth">Sunken Classical Ruins</option>
                </select>
              </div>
            </div>

            {/* Google Drive Image & Video Uploader Box */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#141826] border border-slate-200 dark:border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-500 flex items-center gap-1.5">
                  <Link2 className="w-3.5 h-3.5" />
                  <span>Google Drive Image & Video Link Integration</span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setDriveImageUrl('https://drive.google.com/file/d/1B2M2Y8AsgTpgAmY7PhCfg/view?usp=sharing');
                    setDriveVideoUrl('https://drive.google.com/file/d/1B2M2Y8AsgTpgAmY7PhCfg/preview');
                  }}
                  className="text-[11px] font-bold text-rose-500 hover:underline"
                >
                  Fill Sample Drive URL Format
                </button>
              </div>

              <div>
                <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">
                  Google Drive Image Link (Auto-converts `/file/d/ID/view` to direct CDN image)
                </label>
                <input
                  type="text"
                  value={driveImageUrl}
                  onChange={(e) => setDriveImageUrl(e.target.value)}
                  placeholder="https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing"
                  className="w-full px-3 py-2 text-xs font-mono-tabular rounded-lg bg-white dark:bg-[#0D101A] border border-slate-300 dark:border-white/10"
                />
                {parsedDriveImage.fileId && (
                  <p className="text-[11px] text-emerald-500 mt-1 font-mono-tabular">
                    ✓ Detected Drive File ID: {parsedDriveImage.fileId} → Direct Image Endpoint Ready
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">
                  Google Drive Video Link (Embeds interactive Drive video player inside countdown)
                </label>
                <input
                  type="text"
                  value={driveVideoUrl}
                  onChange={(e) => setDriveVideoUrl(e.target.value)}
                  placeholder="https://drive.google.com/file/d/YOUR_VIDEO_ID/view?usp=sharing"
                  className="w-full px-3 py-2 text-xs font-mono-tabular rounded-lg bg-white dark:bg-[#0D101A] border border-slate-300 dark:border-white/10"
                />
              </div>
            </div>

            {/* Top 3 Podium Entry Highlights */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Top Podium Entries (#1, #2, #3 Highlights — #10 to #4 Auto-Scaffolded)
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={entry1Title}
                  onChange={(e) => setEntry1Title(e.target.value)}
                  placeholder="#1 Entry Title (e.g. Blade Runner 2049)"
                  className="px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#141826] border border-slate-300 dark:border-white/10"
                />
                <input
                  type="text"
                  value={entry1Summary}
                  onChange={(e) => setEntry1Summary(e.target.value)}
                  placeholder="#1 Critical Review Summary..."
                  className="px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#141826] border border-slate-300 dark:border-white/10"
                />
                <input
                  type="text"
                  value={entry2Title}
                  onChange={(e) => setEntry2Title(e.target.value)}
                  placeholder="#2 Entry Title (e.g. Solaris 1972)"
                  className="px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#141826] border border-slate-300 dark:border-white/10"
                />
                <input
                  type="text"
                  value={entry2Summary}
                  onChange={(e) => setEntry2Summary(e.target.value)}
                  placeholder="#2 Critical Review Summary..."
                  className="px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-[#141826] border border-slate-300 dark:border-white/10"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-white/10">
              <label className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={featureInHero}
                  onChange={(e) => setFeatureInHero(e.target.checked)}
                  className="rounded border-slate-300 text-rose-600 focus:ring-rose-500"
                />
                <span>Include immediately in Homepage Auto-Transitioning Hero</span>
              </label>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-lg shadow-rose-600/25 transition-all whitespace-nowrap shrink-0"
              >
                {publishSuccess ? '✓ Published to Live Site!' : 'Publish Top 10 List'}
              </button>
            </div>
          </form>

          {/* Live Card Preview */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 rounded-2xl bg-white dark:bg-[#0D101A] border border-slate-200 dark:border-white/10">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                Live Media & Hero Card Preview
              </div>
              <div className="aspect-video rounded-xl overflow-hidden border border-slate-200 dark:border-white/10 mb-4">
                <EditorialArtwork
                  theme={artworkTheme}
                  driveImageUrl={driveImageUrl}
                  driveVideoUrl={driveVideoUrl}
                  alt={title || 'Preview'}
                  rankNumber={10}
                  showVideoTrigger={Boolean(driveVideoUrl)}
                />
              </div>
              <div className="text-xs text-rose-500 font-bold mb-1">
                {selectedCategory} · November 1, 2026
              </div>
              <h3 className="text-xl font-editorial font-bold text-slate-900 dark:text-white mb-2">
                {title || '10 Forgotten Sci-Fi Thrillers With Genius Practical Effects'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {deck ||
                  'Your editorial deck and Drive media links will render seamlessly in both the transitioning homepage hero and the #10-to-#1 reader view.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MANAGE CATEGORIES */}
      {activeTab === 'categories' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <form
            onSubmit={handleCreateCategory}
            className="lg:col-span-4 p-6 rounded-2xl bg-white dark:bg-[#0D101A] border border-slate-200 dark:border-white/10 h-fit space-y-4"
          >
            <h2 className="text-lg font-editorial font-bold text-slate-900 dark:text-white">
              Add New Top 10 Category
            </h2>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Category Name
              </label>
              <input
                type="text"
                required
                value={catName}
                onChange={(e) => setCatName(e.target.value)}
                placeholder="e.g. Anime & Cybernetics"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-[#141826] border border-slate-300 dark:border-white/10"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Editorial Scope Description
              </label>
              <textarea
                rows={3}
                value={catDesc}
                onChange={(e) => setCatDesc(e.target.value)}
                placeholder="Describe what Top 10 lists belong in this taxonomy..."
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-slate-50 dark:bg-[#141826] border border-slate-300 dark:border-white/10"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition-colors"
            >
              Create Category
            </button>
          </form>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="p-5 rounded-2xl bg-white dark:bg-[#0D101A] border border-slate-200 dark:border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {cat.name}
                    </h3>
                    <span className="font-mono-tabular text-xs font-bold text-rose-500">
                      {cat.count} Lists
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-200/70 dark:border-white/10 text-xs text-slate-400">
                  <span className="font-mono-tabular">/{cat.slug}</span>
                  {categories.length > 4 && (
                    <button
                      type="button"
                      onClick={() => onDeleteCategory(cat.id)}
                      className="text-slate-400 hover:text-red-500 transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: MODERATE VISITOR REVIEWS & RATINGS */}
      {activeTab === 'visitors' && (
        <div className="bg-white dark:bg-[#0D101A] rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden">
          <div className="p-5 border-b border-slate-200 dark:border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Visitor Movie & Entry Reviews Moderation
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Approve, feature, or remove visitor comments and inspect star ratings across all Top 10 lists.
              </p>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-[#141826] p-1 rounded-xl border border-slate-200 dark:border-white/10">
              {(['All', 'Pending Review', 'Featured', 'Approved'] as const).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setReviewFilter(status)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    reviewFilter === status
                      ? 'bg-rose-600 text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-slate-200 dark:divide-white/5">
            {filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50/60 dark:hover:bg-white/5 transition-colors"
              >
                <div className="space-y-1.5 max-w-3xl">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">
                      {rev.visitorName}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{rev.visitorLocation}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-rose-500 font-semibold">
                      {rev.targetItemTitle || rev.listTitle}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono-tabular text-amber-400 font-bold">
                      ★ {rev.rating}/5
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>Status: {rev.status}</span>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    “{rev.comment}”
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => onUpdateReviewStatus(rev.id, 'Approved')}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-600 hover:text-white transition-colors whitespace-nowrap shrink-0"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Approve</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onUpdateReviewStatus(rev.id, 'Featured')}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 hover:bg-amber-500 hover:text-white transition-colors whitespace-nowrap shrink-0"
                  >
                    <Star className="w-3.5 h-3.5" />
                    <span>Feature</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onDeleteReview(rev.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 transition-colors"
                    title="Delete Review"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
