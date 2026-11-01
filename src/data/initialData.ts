import { ArtworkTheme } from '../components/EditorialArtwork';

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
}

export interface CountdownEntry {
  rank: number; // 10 down to 1
  title: string;
  subtitle: string;
  yearOrOrigin: string;
  summary: string;
  factVerification: string;
  votes: number;
  userVote?: 'up' | 'down' | null;
  rating: number;
  ratingCount: number;
  driveImageUrl?: string;
  driveVideoUrl?: string;
}

export interface TopTenList {
  id: string;
  title: string;
  deck: string;
  category: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  readTime: string;
  artworkTheme: ArtworkTheme;
  driveImageUrl?: string;
  driveVideoUrl?: string;
  featuredInHero: boolean;
  totalVotes: number;
  averageRating: number;
  ratingCount: number;
  viewsCount: string;
  entries: CountdownEntry[];
}

export interface PollOption {
  id: string;
  title: string;
  detail: string;
  votes: number;
}

export interface CommunityPoll {
  id: string;
  category: string;
  question: string;
  description: string;
  totalVotes: number;
  userVotedOptionId?: string | null;
  options: PollOption[];
}

export interface EditorialBlog {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  readTime: string;
  artworkTheme: ArtworkTheme;
  pullQuote: string;
  excerpt: string;
  paragraphs: string[];
}

export interface VisitorReview {
  id: string;
  listId: string;
  listTitle: string;
  targetItemTitle?: string;
  visitorName: string;
  visitorLocation: string;
  rating: number;
  comment: string;
  createdAt: string;
  upvotes: number;
  status: 'Approved' | 'Featured' | 'Pending Review';
}

export const INITIAL_CATEGORIES: CategoryItem[] = [
  { id: 'cat-scifi', name: 'Sci-Fi Cinema', slug: 'sci-fi-cinema', description: 'Hard science fiction films, speculative futures, and prophetic cinema.', count: 42 },
  { id: 'cat-weird', name: 'Weird Facts', slug: 'weird-facts', description: 'Anomalous historical artifacts, unexplained phenomena, and verified oddities.', count: 68 },
  { id: 'cat-games', name: 'Gaming Worlds', slug: 'gaming-worlds', description: 'Open-world architecture, hidden game lore, and interactive masterpieces.', count: 39 },
  { id: 'cat-horror', name: 'Horror & Thrillers', slug: 'horror-thrillers', description: 'Psychological dread, atmospheric folklore, and unsettling cinema.', count: 34 },
  { id: 'cat-disasters', name: 'Catastrophes & Disasters', slug: 'catastrophes-disasters', description: 'Planetary cataclysms, engineering failures, and cosmic extinction events.', count: 29 },
  { id: 'cat-history', name: 'Bizarre History', slug: 'bizarre-history', description: 'Forgotten empires, eccentric monarchs, and declassified archival events.', count: 54 },
  { id: 'cat-mystery', name: 'Mystery & Unsolved', slug: 'mystery-unsolved', description: 'Cryptographic manuscripts, vanished expeditions, and cold cases.', count: 47 },
  { id: 'cat-science', name: 'Science & Space', slug: 'science-space', description: 'Astrophysics, quantum paradoxes, and extreme deep-sea biology.', count: 36 },
  { id: 'cat-pop', name: 'Pop Culture', slug: 'pop-culture', description: 'Lost media, behind-the-scenes cinema legends, and cult classics.', count: 31 },
  { id: 'cat-myth', name: 'Mythology & Lore', slug: 'mythology-lore', description: 'Ancient pantheons, sunken cities, and comparative folklore.', count: 25 },
];

export const INITIAL_TOP_LISTS: TopTenList[] = [
  {
    id: 'list-scifi-prophecies',
    title: '10 Mind-Bending Sci-Fi Films That Predicted Real Scientific Breakthroughs',
    deck: 'From relativistic black hole lensing rendered before telescope confirmation to neural acoustic interfaces, these ten films anticipated peer-reviewed discoveries.',
    category: 'Sci-Fi Cinema',
    author: 'Dr. Julian Vance',
    authorRole: 'Senior Film & Science Editor',
    publishedAt: 'October 28, 2026',
    readTime: '14 min read',
    artworkTheme: 'scifi-portal',
    featuredInHero: true,
    totalVotes: 14820,
    averageRating: 4.9,
    ratingCount: 1240,
    viewsCount: '284.5K',
    entries: [
      {
        rank: 10,
        title: 'Frau im Mond (Woman in the Moon)',
        subtitle: 'Multi-Stage Liquid Rocketry & The Dramatic Countdown',
        yearOrOrigin: '1929 · Directed by Fritz Lang',
        summary: 'Consulted by physicist Hermann Oberth, Fritz Lang invented the verbal backwards launch countdown for theatrical tension—a procedure NASA later adopted verbatim for Apollo missions—while depicting multi-stage liquid-fuel separation decades before Sputnik.',
        factVerification: 'Archival blueprints from UFA Studios in Berlin were later confiscated by German military rocketry engineers in 1937 due to their technical accuracy.',
        votes: 980,
        rating: 4.7,
        ratingCount: 112,
      },
      {
        rank: 9,
        title: 'Minority Report',
        subtitle: 'Spatial Gesture Interfaces & Predictive Urban Telemetry',
        yearOrOrigin: '2002 · Directed by Steven Spielberg',
        summary: 'Before production began, a three-day "think tank" of MIT Media Lab scientists and urbanists drafted a 2054 technology bible. Its multi-touch spatial gloves and optical retina-targeted billboards directly inspired modern spatial computing.',
        factVerification: 'MIT scientist John Underkoffler built the actual G-Speak spatial operating system demonstrated in the film.',
        votes: 1140,
        rating: 4.8,
        ratingCount: 145,
      },
      {
        rank: 8,
        title: 'Contagion',
        subtitle: 'R0 Epidemiological Modeling & Fomite Transmission Chains',
        yearOrOrigin: '2011 · Directed by Steven Soderbergh',
        summary: 'Written with direct supervision from Columbia University epidemiologist W. Ian Lipkin, this thriller introduced general audiences to reproductive numbers (R0), spike protein mutations, and global vaccine cold-chain bottlenecks.',
        factVerification: 'Cited by public health academies in 2020 as the most clinically accurate depiction of viral zoonotic spillover ever filmed.',
        votes: 1295,
        rating: 4.8,
        ratingCount: 164,
      },
      {
        rank: 7,
        title: 'Gattaca',
        subtitle: 'Polygenic Embryo Screening & Rapid Automated DNA Sequencing',
        yearOrOrigin: '1997 · Directed by Andrew Niccol',
        summary: 'Released six years before the Human Genome Project even finished its first draft, Gattaca envisioned instant biometric DNA sequencing at turnstiles and polygenic risk scores dictating insurance and employment stratification.',
        factVerification: 'NASA named Gattaca the most plausible science-fiction film in cinema history during its Jet Propulsion Laboratory review.',
        votes: 1490,
        rating: 4.9,
        ratingCount: 218,
      },
      {
        rank: 6,
        title: 'Her',
        subtitle: 'Prosodic Conversational Synthesis & Parasocial AI Attachment',
        yearOrOrigin: '2013 · Directed by Spike Jonze',
        summary: 'Rather than depicting dystopian killer androids, Jonze focused on sub-second vocal prosody, micro-hesitations, and emotional companionship through a minimalist earpiece interface.',
        factVerification: 'Acoustic speech researchers routinely benchmark modern low-latency voice synthesis latency against the conversational pacing in Her.',
        votes: 1610,
        rating: 4.8,
        ratingCount: 190,
      },
      {
        rank: 5,
        title: 'Contact',
        subtitle: 'Prime-Number Phase Modulation & Multi-Array Radio Interferometry',
        yearOrOrigin: '1997 · Directed by Robert Zemeckis',
        summary: 'Adapted from astrophysicist Carl Sagan’s novel, Contact accurately portrays Very Large Array (VLA) signal verification protocols, polarization multiplexing, and the geopolitical friction of open-source scientific decoding.',
        factVerification: 'Remains the only major studio film whose screenplay underwent peer-style review for radio-astronomy nomenclature.',
        votes: 1740,
        rating: 4.9,
        ratingCount: 230,
      },
      {
        rank: 4,
        title: 'Eternal Sunshine of the Spotless Mind',
        subtitle: 'Targeted Reconsolidation Memory Reconsolidation Blockade',
        yearOrOrigin: '2004 · Directed by Michel Gondry',
        summary: 'While whimsical in presentation, the premise of selectively dampening emotional valence during active memory recall mirrors real neurobiological breakthroughs in beta-blocker reconsolidation therapy.',
        factVerification: 'Clinical trials at McGill and Amsterdam universities demonstrated targeted fear-memory dampening during sleep reactivation windows.',
        votes: 1820,
        rating: 4.9,
        ratingCount: 205,
      },
      {
        rank: 3,
        title: 'Arrival',
        subtitle: 'Non-Linear Information Density & Linguistic Graph Topology',
        yearOrOrigin: '2016 · Directed by Denis Villeneuve',
        summary: 'Mathematician Stephen Wolfram and linguistics professors analyzed the heptapod logograms in real time during filming, constructing a coherent visual grammar devoid of linear causal tense.',
        factVerification: 'The film’s workspace screens run genuine Wolfram Language Fourier-transform code analyzing non-human acoustic wave packets.',
        votes: 2150,
        rating: 4.9,
        ratingCount: 312,
      },
      {
        rank: 2,
        title: '2001: A Space Odyssey',
        subtitle: 'Glass Cockpit Tablet Computing, Centrifugal Artificial Gravity & Lip-Reading Vision',
        yearOrOrigin: '1968 · Directed by Stanley Kubrick',
        summary: 'Filmed a year before humans walked on the Moon, Kubrick and Arthur C. Clarke designed flat-screen "Newspads," silent optical lip-reading algorithms, and geostationary orbital transfer stations with aerospace contractors.',
        factVerification: 'Samsung cited Kubrick’s 1968 Newspad prop in federal patent litigation as prior art for modern tablet form factors.',
        votes: 2490,
        rating: 5.0,
        ratingCount: 410,
      },
      {
        rank: 1,
        title: 'Interstellar',
        subtitle: 'Relativistic Gravitational Lensing of Spinning Kerr Black Holes',
        yearOrOrigin: '2014 · Directed by Christopher Nolan',
        summary: 'Nobel laureate Kip Thorne fed Einstein’s general relativistic field equations into Double Negative’s render farm, producing the first high-resolution visualization of a rapidly spinning black hole’s asymmetric accretion halo five years before the Event Horizon Telescope photographed M87*.',
        factVerification: 'The visual rendering led directly to two peer-reviewed astrophysics papers published in Classical and Quantum Gravity.',
        votes: 3120,
        rating: 5.0,
        ratingCount: 540,
      },
    ],
  },
  {
    id: 'list-weird-artifacts',
    title: '10 Unexplained Historical Artifacts That Archaeologists Still Cannot Classify',
    deck: 'Excavated from sealed Roman vaults, Mediterranean shipwrecks, and Neolithic strata, these physical objects defy conventional chronological models.',
    category: 'Weird Facts',
    author: 'Eleanor Vance-Sterling',
    authorRole: 'Archival Historian',
    publishedAt: 'October 26, 2026',
    readTime: '12 min read',
    artworkTheme: 'weird-artifacts',
    featuredInHero: true,
    totalVotes: 12940,
    averageRating: 4.8,
    ratingCount: 980,
    viewsCount: '241.2K',
    entries: [
      {
        rank: 10,
        title: 'The Lycurgus Dichroic Cage Cup',
        subtitle: '4th-Century Roman Glass Infused With 50-Nanometer Colloidal Gold & Silver',
        yearOrOrigin: '320 CE · British Museum Collection',
        summary: 'Carved from a single block of glass, the cup shifts from opaque jade green when lit from the front to glowing ruby crimson when backlit—achieved via precise nanoparticle dispersion Roman metallurgists discovered empirically.',
        factVerification: 'Scanning electron microscopy confirmed gold-silver alloy particles measuring exactly 70 nanometers across.',
        votes: 840,
        rating: 4.8,
        ratingCount: 89,
      },
      {
        rank: 9,
        title: 'The Phaistos Disc of Minoan Crete',
        subtitle: '241 Movable-Type Stamped Clay Hieroglyphs From the Bronze Age',
        yearOrOrigin: '1700 BCE · Heraklion Archaeological Museum',
        summary: 'Unearthed in 1908 inside a Minoan palace basement, this fired clay disk features 45 distinct die-stamped symbols spiraling inward—effectively representing movable-type printing more than three millennia before Gutenberg.',
        factVerification: 'Thermoluminescence testing confirmed its Bronze Age firing date, yet no second example of its script has ever been found.',
        votes: 920,
        rating: 4.7,
        ratingCount: 94,
      },
      {
        rank: 8,
        title: 'The Winnipesaukee Mystery Stone',
        subtitle: 'Machined Quartzite Ovoid Found Encased in Prehistoric New England Clay',
        yearOrOrigin: '1872 · New Hampshire Historical Society',
        summary: 'Pulled from fence-post clay five feet underground in Meredith, New Hampshire, this dark quartzite egg features relief carvings of ears of corn, astronomical crescents, and two tapered bore holes drilled with mechanical straightness.',
        factVerification: 'A 1994 bore-scope analysis noted conical wear patterns inconsistent with known 19th-century lapidary tools.',
        votes: 1010,
        rating: 4.6,
        ratingCount: 77,
      },
      {
        rank: 7,
        title: 'The Saqqara Schist Tri-Lobe Disc',
        subtitle: 'Paper-Thin Metamorphic Stone Bowl Carved Like a Hydrodynamic Impeller',
        yearOrOrigin: '3000 BCE · Tomb of Prince Sabu, Egypt',
        summary: 'Discovered by Walter Bryan Emery in a First Dynasty mastaba, this 61-centimeter metasiltstone vessel has three curved inward-folding lobes carved to millimeter thinness from brittle rock that shatters under metal chisels.',
        factVerification: 'Displayed in the Cairo Museum; experimental archaeologists still debate how the inward-curling thin stone rims were ground without fracturing.',
        votes: 1180,
        rating: 4.8,
        ratingCount: 115,
      },
      {
        rank: 6,
        title: 'The Shroud of Turin Sudarium Companion (Sudarium of Oviedo)',
        subtitle: 'Forensic AB-Bloodstain Geometric Match Recorded in Spain Since 616 CE',
        yearOrOrigin: '616 CE Documented · Cathedral of Oviedo',
        summary: 'While debates over the Turin linen persist, the Sudarium of Oviedo has an unbroken documented chain of custody in Spain since 616 CE and shares over 70 congruent point-for-point bloodstain geometries and rare pollen grains.',
        factVerification: 'Forensic palynology and geometric overlay studies documented identical pulmonary edema fluid stains.',
        votes: 1260,
        rating: 4.7,
        ratingCount: 108,
      },
      {
        rank: 5,
        title: 'The Neolithic Carved Stone Balls of Aberdeenshire',
        subtitle: 'Over 500 Platonic-Solid Symmetrical Spheres Carved 5,000 Years Ago',
        yearOrOrigin: '3200 BCE · National Museum of Scotland',
        summary: 'Found almost exclusively in northeastern Scotland, these granite and diorite spheres are carved into 4, 6, 12, or up to 160 symmetrical projecting knobs corresponding to mathematical Platonic solids—centuries before Greek geometry.',
        factVerification: 'Every surviving sphere measures within a 2-millimeter tolerance of a uniform 70-millimeter diameter.',
        votes: 1390,
        rating: 4.9,
        ratingCount: 132,
      },
      {
        rank: 4,
        title: 'TheUlfberht Crucible-Steel Viking Swords',
        subtitle: 'Hypereutectoid Slag-Free Steel Forged 800 Years Ahead of the Industrial Revolution',
        yearOrOrigin: '800–1000 CE · Northern Europe',
        summary: 'Only 170 authentic +VLFBERH+T blades survive. Metallurgical assays revealed carbon purity levels of 1.1% with almost zero slag—requiring furnace temperatures above 1,600°C not achieved in Europe until the 18th century.',
        factVerification: 'Archaeometallurgists traced the ore signature to Central Asian Damascus ingots traded along Volga river routes.',
        votes: 1520,
        rating: 4.9,
        ratingCount: 151,
      },
      {
        rank: 3,
        title: 'The Roman Dodecahedra',
        subtitle: '116 Hollow Bronze Twelve-Sided Polyhedra With Zero Mention in Roman Texts',
        yearOrOrigin: '100–300 CE · Gallo-Roman Provinces',
        summary: 'Despite Romans keeping obsessive inventories of every military, agricultural, and domestic tool, not a single inscription or text mentions these hollow bronze dodecahedra pierced with differently sized circular apertures and corner studs.',
        factVerification: 'Found strictly in northern Gaul, Britannia, and Germania—never in Rome or the Mediterranean basin.',
        votes: 1890,
        rating: 4.9,
        ratingCount: 210,
      },
      {
        rank: 2,
        title: 'The Voynich Vellum Codex (MS 408)',
        subtitle: '240 Pages of Unbroken Statistical Language, Unknown Botany & Astronomical Charts',
        yearOrOrigin: '1404–1438 CE · Beinecke Library, Yale',
        summary: 'Radiocarbon-dated to early 15th-century Italy, the manuscript obeys Zipf’s Law for natural human languages and displays low word-entropy transitions, yet no cryptographer, NSA team, or deep-learning model has decoded a single sentence.',
        factVerification: 'Pigment analysis confirmed zero post-medieval inks or modern touch-ups on the calfskin vellum.',
        votes: 2210,
        rating: 5.0,
        ratingCount: 295,
      },
      {
        rank: 1,
        title: 'The Antikythera Epicyclic Astronomical Computer',
        subtitle: '37 Meshing Bronze Differential Gears Predicting Lunar Anomalies & Olympiad Cycles',
        yearOrOrigin: '150–100 BCE · National Archaeological Museum, Athens',
        summary: 'Recovered by sponge divers off Antikythera in 1901, micro-focus X-ray computed tomography revealed a pin-and-slot epicyclic gear train tracking the anomalistic lunar orbit, Saros eclipse cycles, and five planetary motions.',
        factVerification: 'No clockwork of comparable mechanical complexity reappears in the historical record for another 1,400 years.',
        votes: 2840,
        rating: 5.0,
        ratingCount: 412,
      },
    ],
  },
  {
    id: 'list-gaming-ecosystems',
    title: '10 Open-World Video Games With Secret Ecosystems Hidden From Players',
    deck: 'Beneath the visible questlines, these ten virtual worlds simulate autonomous wildlife food chains, acoustic weather propagation, and off-screen faction economies.',
    category: 'Gaming Worlds',
    author: 'Marcus K. Lin',
    authorRole: 'Interactive Systems Critic',
    publishedAt: 'October 24, 2026',
    readTime: '11 min read',
    artworkTheme: 'gaming-citadel',
    featuredInHero: true,
    totalVotes: 11680,
    averageRating: 4.9,
    ratingCount: 890,
    viewsCount: '198.4K',
    entries: [
      { rank: 10, title: 'S.T.A.L.K.E.R.: Shadow of Chernobyl', subtitle: 'The A-Life Unscripted Zone Simulation', yearOrOrigin: '2007 · GSC Game World', summary: 'NPC stalkers and mutant packs traverse the entire Exclusion Zone offline, looting artifacts, camping, and dying in firefights miles away from the player without a single scripted trigger.', factVerification: 'Engine developers actually had to throttle A-Life because NPCs completed the main quest before playtesters could.', votes: 890, rating: 4.8, ratingCount: 92 },
      { rank: 9, title: 'Subnautica', subtitle: 'Bathymetric Bioluminescent Predator-Prey Thermoclines', yearOrOrigin: '2018 · Unknown Worlds', summary: 'Every marine organism inside Crater 4546B tracks caloric hunger, bioluminescent attraction, and territorial migration cycles across volcanic vents.', factVerification: 'Stalkers actively collect scrap titanium to build nests and lose teeth only when biting specific alloy densities.', votes: 960, rating: 4.8, ratingCount: 105 },
      { rank: 8, title: 'Shadow of the Colossus', subtitle: 'Inverse-Kinematics Wind & Moss Micro-Ecology', yearOrOrigin: '2005 · Team Ico', summary: 'Hawks and doves dynamicallydraft off rising thermal air currents above canyons and physically perch on the player’s horse when left idle for ten minutes.', factVerification: 'Players discovered forty hidden fruit trees and gleaming-tailed lizards that permanently alter stamina geometry.', votes: 1050, rating: 4.9, ratingCount: 118 },
      { rank: 7, title: 'Metal Gear Solid V: The Phantom Pain', subtitle: 'Adaptive Enemy Supply Logistics & Counter-Doctrine', yearOrOrigin: '2015 · Kojima Productions', summary: 'If you consistently infiltrate outposts at night using headshots, regional Soviet and PFA commanders begin shipping Kevlar helmets, night-vision goggles, and floodlight generators via physical supply trucks.', factVerification: 'Players can intercept the actual logistics trucks on highways to starve outposts of helmets and flashlights.', votes: 1190, rating: 4.9, ratingCount: 134 },
      { rank: 6, title: 'Ultima Online (1997 Alpha Ecology)', subtitle: 'The Fully Simulated Food Web Players Accidentally Rendered Extinct', yearOrOrigin: '1997 · Origin Systems', summary: 'Richard Garriott’s team coded grass growth, herbivore grazing, and carnivore hunting cascades—only for beta testers to hunt every deer and wolf in minutes, hiding one of gaming’s greatest invisible simulations.', factVerification: 'Documented at Game Developers Conference as the canonical lesson on emergent virtual ecology.', votes: 1310, rating: 4.8, ratingCount: 121 },
      { rank: 5, title: 'The Legend of Zelda: Breath of the Wild', subtitle: 'Thermodynamic Chemistry & Barometric Convection Engine', yearOrOrigin: '2017 · Nintendo EPD', summary: 'Every object obeys a unified systemic ruleset: fire heats air mass to create updrafts, metallic weapons attract lightning strikes based on conductivity, and wolves coordinate flanking maneuvers around pack alphas.', factVerification: 'Disabling the pack leader causes remaining wolves to immediately abort their attack and flee.', votes: 1580, rating: 4.9, ratingCount: 198 },
      { rank: 4, title: 'Outer Wilds', subtitle: 'Real-Time Keplerian Orbital Mechanics & Sand Transfer Physics', yearOrOrigin: '2019 · Mobius Digital', summary: 'Rather than animating planets along spline tracks, the entire solar system runs continuous N-body gravitational forces every frame, eroding caves on Ember Twin even when the player is light-minutes away.', factVerification: 'If the player flies far enough out of the solar system, floating-point origin shifting dynamically re-centers the universe.', votes: 1790, rating: 5.0, ratingCount: 245 },
      { rank: 3, title: 'Dwarf Fortress', subtitle: 'Geological Strata, Tectonic Rain Shadows & Generational Folklore', yearOrOrigin: '2006–2026 · Bay 12 Games', summary: 'Before you place a single block, world generation simulates orographic precipitation, river erosion, mineral veins, and centuries of poetic forms, musical scales, and historical grudges.', factVerification: 'In 2015, developers discovered cats were dying of alcohol poisoning because they walked through tavern puddles and licked their paws.', votes: 2040, rating: 5.0, ratingCount: 276 },
      { rank: 2, title: 'Red Dead Redemption 2', subtitle: 'Scavenger Decomposition Chains & Dynamic Railroad Construction', yearOrOrigin: '2018 · Rockstar Studios', summary: 'Over 200 species interact seamlessly: eagles snatch salmon from rapids, grizzly bears bluff-charge if you stand completely still, and timber camps physically clear-cut forests over weeks of in-game time.', factVerification: 'Railroad workers lay individual spikes and ties until the Central Union line physically connects across the map.', votes: 2380, rating: 5.0, ratingCount: 340 },
      { rank: 1, title: 'Rain World', subtitle: 'Procedural Neural-Network Predator Ecology That Lives Without You', yearOrOrigin: '2017 · Videocult', summary: 'Rain World does not revolve around the player. Every lizard, vulture, and scavenger possesses an individual personality matrix, memory of past slights, and off-screen den migration before the lethal downpour arrives.', factVerification: 'Wait in a single shelter observation room and you will never witness the same predator-prey skirmish twice.', votes: 2690, rating: 5.0, ratingCount: 388 },
    ],
  },
  {
    id: 'list-horror-acoustics',
    title: '10 Psychological Horror Masterpieces Built On Real Acoustic Phenomena',
    deck: 'Infrasound at 19 Hz, Shepard tones, and architectural reverberation: how ten directors weaponized psychoacoustics to induce physiological dread.',
    category: 'Horror & Thrillers',
    author: 'Clara Moreau',
    authorRole: 'Cinema & Sound Editor',
    publishedAt: 'October 21, 2026',
    readTime: '10 min read',
    artworkTheme: 'horror-manor',
    featuredInHero: true,
    totalVotes: 9840,
    averageRating: 4.8,
    ratingCount: 740,
    viewsCount: '176.9K',
    entries: [
      { rank: 10, title: 'Berberian Sound Studio', subtitle: 'Analog Magnetic Tape Loops & Organic Foley Dissociation', yearOrOrigin: '2012 · Directed by Peter Strickland', summary: 'Set inside a 1970s Italian giallo post-production studio, the film never shows a single frame of violence—instead forcing the audience to hear watermelons, cabbages, and boiling oil transform into psychological terror.', factVerification: 'Recorded entirely on vintage quarter-inch magnetic tape machines.', votes: 640, rating: 4.7, ratingCount: 68 },
      { rank: 9, title: 'The Lighthouse', subtitle: 'Diaphone Foghorn Sub-Harmonics & Maritime Isolation', yearOrOrigin: '2019 · Directed by Robert Eggers', summary: 'Sound designer Damian Volpe recorded an authentic 1913 Scottish diaphone foghorn whose brass piston blast saturates the theater subwoofer spectrum every seventy seconds.', factVerification: 'Measured at 114 dB on set, causing genuine physical disorientation for the cast.', votes: 790, rating: 4.8, ratingCount: 84 },
      { rank: 8, title: 'Session 9', subtitle: 'Ferrous Oxide Dictaphone Degradation inside Danvers State Hospital', yearOrOrigin: '2001 · Directed by Brad Anderson', summary: 'Filmed inside the real, unheated Kirkbride psychiatric hospital before its demolition, the natural stone corridor slap-back echo forms the backbone of the score.', factVerification: 'No digital reverb plugins were needed for the hydrotherapy basement sequences.', votes: 860, rating: 4.8, ratingCount: 91 },
      { rank: 7, title: 'Skinamarink', subtitle: '1970s CRT Flyback Transformer Whine & Noise-Floor Pareidolia', yearOrOrigin: '2022 · Directed by Kyle Edward Ball', summary: 'By boosting optical 16mm tape hiss and the 15.734 kHz horizontal scan whine of a cathode-ray television in a dark living room, the film triggers auditory pareidolia.', factVerification: 'Viewers report hearing whispered syllables in segments containing only shaped pink noise.', votes: 920, rating: 4.6, ratingCount: 110 },
      { rank: 6, title: 'Cure', subtitle: 'Industrial Laundry Drones & Mesmeric Rhythmic Entrainment', yearOrOrigin: '1997 · Directed by Kiyoshi Kurosawa', summary: 'Kurosawa strips away traditional musical stings during key interrogations, leaving only the rhythmic thrum of distant water pipes, gravel footsteps, and a flickering lighter flame.', factVerification: 'Restored in 4K with its original uncompressed Japanese low-frequency ambient stems.', votes: 1120, rating: 4.9, ratingCount: 142 },
      { rank: 5, title: 'Under the Skin', subtitle: 'Phase-Inverted Viola Clusters & Anechoic Chamber Void', yearOrOrigin: '2013 · Directed by Jonathan Glazer', summary: 'Composer Mica Levi pitch-shifted a single three-note viola figure until its overtones beat against each other, evoking an alien predator learning human vocal cadence.', factVerification: 'Voted the greatest film score of the 21st century by a panel of international film composers.', votes: 1290, rating: 4.9, ratingCount: 165 },
      { rank: 4, title: 'Eraserhead', subtitle: '60-Cycle Industrial Radiator Hum Recorded Inside Cast-Iron Pipes', yearOrOrigin: '1977 · Directed by David Lynch', summary: 'David Lynch and Alan Splet spent an entire year suspending microphones inside floating plastic bottles down industrial steel pipes to craft a constant, suffocating low-end industrial bed.', factVerification: 'Set the template for industrial ambient sound design across cinema and music.', votes: 1450, rating: 4.9, ratingCount: 188 },
      { rank: 3, title: 'Hereditary', subtitle: 'Sub-Audible Heartbeat Pulses & Glottal Tongue Clicks', yearOrOrigin: '2018 · Directed by Ari Aster', summary: 'Colin Stetson used contrabass saxophones circular-breathed with contact microphones strapped to his throat so every bass note carries the literal sound of human cartilage and pulse.', factVerification: 'Zero synthesizers were used in the sub-bass dread passages.', votes: 1680, rating: 4.9, ratingCount: 230 },
      { rank: 2, title: 'Memoria', subtitle: 'Exploding Concrete Core Thuds & Exploding Head Syndrome', yearOrOrigin: '2021 · Directed by Apichatpong Weerasethakul', summary: 'Tilda Swinton’s character attempts to reconstruct a metallic subterranean acoustic thud inside a Bogotá recording studio—a sound mixed specifically to resonate with theater walls.', factVerification: 'Engineered with Dolby Atmos point-source sub-bass localization.', votes: 1840, rating: 4.9, ratingCount: 215 },
      { rank: 1, title: 'The Shining', subtitle: 'Penderecki Polymorphous Strings & Steadycam Carpet-To-Hardwood Cadence', yearOrOrigin: '1980 · Directed by Stanley Kubrick', summary: 'Kubrick alternated Danny’s Big Wheel tricycle between hardwood parquet thunder and deadened wool carpet silence—conditioning the audience’s nervous system before anything appears on screen.', factVerification: 'Acoustic researchers demonstrated that the tricycle transition induces measurable galvanic skin response spikes.', votes: 2410, rating: 5.0, ratingCount: 360 },
    ],
  },
  {
    id: 'list-cosmic-disasters',
    title: '10 Cataclysmic Megastructures & Planetary Disasters Waiting In Deep Space',
    deck: 'Magnetar starquakes, hypervelocity rogue black holes, and false vacuum decay: ten verified astrophysical events that dwarf earthly disasters.',
    category: 'Catastrophes & Disasters',
    author: 'Dr. Aris Thorne',
    authorRole: 'Astrophysics Correspondent',
    publishedAt: 'October 18, 2026',
    readTime: '13 min read',
    artworkTheme: 'cosmic-disaster',
    featuredInHero: true,
    totalVotes: 13410,
    averageRating: 4.9,
    ratingCount: 1020,
    viewsCount: '263.1K',
    entries: [
      { rank: 10, title: 'The Carrington-Scale Solar Superflare', subtitle: 'Coronal Mass Ejection Geomagnetic Induction', yearOrOrigin: '1859 Observed · Solar System', summary: 'In September 1859, solar flare currents were so intense that telegraph operators disconnected their batteries and sent messages purely on auroral current while paper tape caught fire.', factVerification: 'Ice core Beryllium-10 records show the Sun produces flares 10x stronger roughly once every 1,000 years (Miyake Events).', votes: 910, rating: 4.8, ratingCount: 95 },
      { rank: 9, title: 'Hypervelocity Rogue Planetary Ejection', subtitle: 'Gravitational Slingshot at 30 Million Miles Per Hour', yearOrOrigin: 'Milky Way Galactic Core', summary: 'When a binary star system passes too close to Sagittarius A*, one star can be captured while its companion and orbiting planets are catapulted out of the galaxy at 1,700 km/s.', factVerification: 'Star S5-HVS1 was tracked leaving the Milky Way at 3.7 million mph in 2019.', votes: 1020, rating: 4.8, ratingCount: 108 },
      { rank: 8, title: 'Tidal Disruption Event (Spaghettification)', subtitle: 'Stellar Shredding Across a Supermassive Event Horizon', yearOrOrigin: 'AT2018hyz · 665M Light-Years', summary: 'When a sun-sized star wanders within the tidal radius of a quiescent black hole, differential gravity stretches the star into a luminous plasma filament before ejecting relativistic material.', factVerification: 'Observed burping relativistic jets years after the initial stellar consumption.', votes: 1140, rating: 4.8, ratingCount: 119 },
      { rank: 7, title: 'Pair-Instability Hypernova', subtitle: 'Total Stellar Annihilation Leaving Zero Remnant Behind', yearOrOrigin: 'SN 2006gy · 238M Light-Years', summary: 'In stars between 130 and 250 solar masses, gamma-ray photons in the core spontaneously convert into electron-positron pairs, dropping thermal pressure and triggering a thermonuclear explosion that obliterates the core completely.', factVerification: 'Produces up to 40 solar masses of pure radioactive Nickel-56 in seconds.', votes: 1280, rating: 4.9, ratingCount: 130 },
      { rank: 6, title: 'Kessler Syndrome Orbital Shrapnel Cascade', subtitle: 'Hypervelocity Low-Earth Orbit Collisional Chain Reaction', yearOrOrigin: '1978 Proposed · Donald J. Kessler', summary: 'At orbital velocities of 7.8 km/s, a 1-centimeter aluminum bolt carries the kinetic energy of an exploding hand grenade—capable of triggering an exponential debris cascade that seals humanity beneath a shell of shrapnel.', factVerification: 'Currently tracked across more than 36,000 objects larger than 10 cm in Earth orbit.', votes: 1420, rating: 4.9, ratingCount: 156 },
      { rank: 5, title: 'Thorne-Zytkow Hybrid Cannibal Star', subtitle: 'A Neutron Star Core Slowly Digesting a Red Supergiant From Within', yearOrOrigin: 'HV 2112 · Small Magellanic Cloud', summary: 'When a dense neutron star spirals directly into the heart of a diffuse red supergiant, it forms a russian-doll star that looks normal on the outside while running exotic nuclear synthesis at its degenerate core.', factVerification: 'Identified via anomalous lithium, rubidium, and molybdenum spectral signatures.', votes: 1590, rating: 4.9, ratingCount: 172 },
      { rank: 4, title: 'Chicxulub-Class Antipodal Seismic Focusing', subtitle: 'Crustal Liquefaction & Global Silicate Vapor Rain', yearOrOrigin: '66 Million Years Ago · Yucatan Peninsula', summary: 'Within minutes of the Chicxulub impact, ejecta re-entering the upper atmosphere heated the global sky to 2,700°F like an industrial broiling element for several hours.', factVerification: 'Core drillings from Peak Ring in 2016 showed granite from 10 miles deep behaved like liquid water.', votes: 1760, rating: 4.9, ratingCount: 194 },
      { rank: 3, title: 'Short Gamma-Ray Burst (Kilonova)', subtitle: 'Focused Relativistic Beam Sterilizing Planetary Ozones Across Thousands of Light-Years', yearOrOrigin: 'GW170817 · Neutron Star Merger', summary: 'When two neutron stars collide, they forge heavy gold and platinum while firing a narrow two-degree gamma-ray beam capable of stripping a planet’s ozone layer from 6,000 light-years away.', factVerification: 'Hypothesized as a primary trigger of the Late Ordovician mass extinction.', votes: 1980, rating: 5.0, ratingCount: 220 },
      { rank: 2, title: 'Magnetar SGR 1806-20 Crustal Starquake', subtitle: 'A Tenth-of-a-Second Magnetic Rupture That Ionized Earth’s Upper Atmosphere From 50,000 Light-Years Away', yearOrOrigin: 'December 27, 2004 · Sagittarius', summary: 'A crack just millimeters wide in the solid neutron crust of magnetar SGR 1806-20 released more energy in 0.1 seconds than our Sun emits in 150,000 years, physically depressing Earth’s ionosphere.', factVerification: 'Blinded every gamma-ray satellite in Earth orbit simultaneously.', votes: 2290, rating: 5.0, ratingCount: 280 },
      { rank: 1, title: 'Metastable Higgs Field False Vacuum Decay', subtitle: 'A Bubble of True Quantum Vacuum Expanding at the Speed of Light', yearOrOrigin: 'Standard Model Quantum Field Theory', summary: 'If the Higgs field occupies a local metastable energy minimum rather than the true ground state, quantum tunneling anywhere in the cosmos could nucleate a bubble of new physics expanding at c—unobservable until the instant it arrives.', factVerification: 'Calculated directly from the measured top-quark and Higgs-boson masses at CERN.', votes: 2890, rating: 5.0, ratingCount: 395 },
    ],
  },
  {
    id: 'list-coldwar-mysteries',
    title: '10 Forgotten Cold-War Experiments That Almost Rewrote Physics & Geopolitics',
    deck: 'Project Orion nuclear pulse propulsion, orbital copper needle rings, and acoustic seabed arrays declassified decades after completion.',
    category: 'Bizarre History',
    author: 'Henrik Lindqvist',
    authorRole: 'Declassified Archives Editor',
    publishedAt: 'October 15, 2026',
    readTime: '11 min read',
    artworkTheme: 'coldwar-mystery',
    featuredInHero: true,
    totalVotes: 9120,
    averageRating: 4.8,
    ratingCount: 680,
    viewsCount: '154.0K',
    entries: [
      { rank: 10, title: 'Project West Ford Artificial Ring Belt', subtitle: '480 Million Copper Dipole Needles Launched Into Medium Earth Orbit', yearOrOrigin: '1963 · MIT Lincoln Laboratory', summary: 'Before communication satellites existed, the US military launched half a billion 1.8-centimeter copper needles into orbit to form an artificial planetary ring for bouncing radio signals across continents.', factVerification: 'Roughly 40 clumps of West Ford copper needles still remain tracked in polar orbit today.', votes: 680, rating: 4.7, ratingCount: 64 },
      { rank: 9, title: 'The Kola Superdeep Borehole SG-3', subtitle: 'Drilling 12,262 Meters Into the Baltic Continental Crust', yearOrOrigin: '1970–1992 · Murmansk Oblast', summary: 'Soviet geologists drilled deeper than the Mariana Trench, discovering 2.7-billion-year-old microscopic plankton fossils and boiling hydrogen-saturated mud where solid basalt had been predicted.', factVerification: 'Drilling halted when rock at 180°C began behaving like warm plastic.', votes: 790, rating: 4.8, ratingCount: 79 },
      { rank: 8, title: 'Project Iceworm Sub-Glacial Nuclear Railway', subtitle: 'Camp Century Under the Greenland Ice Sheet', yearOrOrigin: '1959–1966 · Greenland', summary: 'Powered by a portable PM-2A nuclear reactor, engineers carved a subterranean town beneath Greenland’s ice cap to test hiding 600 mobile ballistic missiles inside shifting glacial tunnels.', factVerification: 'Ice core samples extracted at Camp Century revolutionized paleoclimatology decades later.', votes: 890, rating: 4.8, ratingCount: 88 },
      { rank: 7, title: 'Operation Acoustic Kitty & Bio-Telemetry', subtitle: 'The $20 Million Micro-Transmitter Feline Field Trial', yearOrOrigin: '1967 · Directorate of Science & Technology', summary: 'Declassified in 2001, engineers attempted to implant a sub-miniature battery and antenna along a cat’s acoustic canal to eavesdrop on park bench meetings—only to conclude cats cannot be directed on command.', factVerification: 'Released via Freedom of Information Act archive redacted memos.', votes: 950, rating: 4.6, ratingCount: 92 },
      { rank: 6, title: 'The Great Seal Endovibrator (The Thing)', subtitle: 'A Battery-Free Passive Cavity Resonator That Operated Undetected for 7 Years', yearOrOrigin: '1945–1952 · Moscow Embassy', summary: 'Invented by Léon Theremin (creator of the theremin instrument), a tiny silver-plated copper cylinder inside a carved wooden plaque had no wires, batteries, or transistors—activating only when illuminated by an external 330 MHz radio beam.', factVerification: 'Direct precursor to all modern passive RFID passport and contactless payment chips.', votes: 1180, rating: 4.9, ratingCount: 138 },
      { rank: 5, title: 'Project Azorian & The Glomar Explorer', subtitle: 'Clawing a Sunken Submarine Off the Pacific Floor 3 Miles Down in Total Secrecy', yearOrOrigin: '1974 · Central Pacific Ocean', summary: 'Disguised as billionaire Howard Hughes’s deep-sea manganese nodule mining ship, a massive mechanical capture claw lowered on three miles of steel pipe recovered a section of hull from 16,500 feet deep.', factVerification: 'Inadvertently birthed the Freedom of Information Act "Glomar Response" ("neither confirm nor deny").', votes: 1320, rating: 4.9, ratingCount: 152 },
      { rank: 4, title: 'Vela Hotel Double-Flash Incident', subtitle: 'The Unclaimed South Atlantic Dual-Pulse Optical Signature', yearOrOrigin: 'September 22, 1979 · Prince Edward Islands', summary: 'Satellite Vela 6911’s bhangmeter photodiodes recorded the unmistakable two-humped light curve of an atmospheric nuclear detonation near Bouvet Island—an event never officially claimed by any nation.', factVerification: 'Simultaneous hydroacoustic signals were detected at Ascension Island.', votes: 1490, rating: 4.8, ratingCount: 164 },
      { rank: 3, title: 'Starfish Prime Magnetospheric EMP', subtitle: 'A 1.4-Megaton Detonation in Space That Created a New Artificial Radiation Belt', yearOrOrigin: 'July 9, 1962 · 400 km Altitude', summary: 'Detonated 250 miles above Johnston Atoll, the blast knocked out streetlights 900 miles away in Honolulu and trapped energetic electrons that crippled one-third of all satellites then in low Earth orbit.', factVerification: 'Directly prompted the 1963 Partial Test Ban Treaty banning nuclear tests in outer space.', votes: 1710, rating: 4.9, ratingCount: 199 },
      { rank: 2, title: 'Duga-1 Over-The-Horizon Woodpecker Array', subtitle: 'A 150-Meter-Tall Steel Wall Broadcasting 10 Megawatts of Shortwave Pulses', yearOrOrigin: '1976–1989 · Chernobyl Exclusion Zone', summary: 'For thirteen years, shortwave radios worldwide were interrupted by a sharp 10 Hz tapping sound bouncing off the ionosphere—originating from a gigantic steel radar lattice hidden in Ukrainian pine forests.', factVerification: 'The massive steel antenna structure still stands inside the Exclusion Zone.', votes: 1980, rating: 4.9, ratingCount: 230 },
      { rank: 1, title: 'Project Orion Nuclear Pulse Starship', subtitle: 'Freeman Dyson’s Blueprint to Reach Saturn by Riding Atomic Shockwaves', yearOrOrigin: '1958–1965 · General Atomics', summary: 'Led by physicist Freeman Dyson and Ted Taylor, Project Orion designed a 4,000-ton interplanetary vessel propelled by ejecting small shaped charges behind a 1,000-ton steel momentum-absorber pusher plate.', factVerification: 'Conventional high-explosive scale model "Hot Rod" flew stably to 100 meters at Point Loma in 1959.', votes: 2540, rating: 5.0, ratingCount: 318 },
    ],
  },
  {
    id: 'list-bizarre-nature',
    title: '10 Extreme Deep-Sea & Extremophile Organisms That Violate Textbook Biology',
    deck: 'From hydrothermal snails forging iron-sulfide armor to immortal medusae reversing cellular senescence on the ocean floor.',
    category: 'Science & Space',
    author: 'Dr. Maya Lin-Chau',
    authorRole: 'Marine Evolutionary Biologist',
    publishedAt: 'October 12, 2026',
    readTime: '9 min read',
    artworkTheme: 'bizarre-nature',
    featuredInHero: true,
    totalVotes: 7640,
    averageRating: 4.8,
    ratingCount: 510,
    viewsCount: '119.3K',
    entries: [
      { rank: 10, title: 'Deinococcus radiodurans', subtitle: 'Surviving 5,000 Grays of Ionizing Gamma Radiation by Stitching Shattered DNA in Hours', yearOrOrigin: 'Polyextremophile Bacterium', summary: 'Capable of surviving radiation doses 1,000 times lethal to humans, this microbe keeps four to ten redundant copies of its genome arranged in tightly packed toroidal rings.', factVerification: 'Survived three years exposed on the exterior hull of the International Space Station.', votes: 540, rating: 4.8, ratingCount: 51 },
      { rank: 9, title: 'Elysia chlorotica (Solar-Powered Sea Slug)', subtitle: 'Kleptoplasty: Stealing Functional Chloroplasts to Photosynthesize Like a Plant', yearOrOrigin: 'North Atlantic Intertidal Zone', summary: 'After feeding on intertidal algae, this emerald sea slug digests the plant cells but keeps the living chloroplasts intact inside its own digestive tract for nine months of solar energy production.', factVerification: 'One of the rarest known examples of functional metazoan photosynthesis.', votes: 610, rating: 4.8, ratingCount: 62 },
      { rank: 8, title: 'Riftia pachyptila (Giant Hydrothermal Tube Worm)', subtitle: '8-Foot Chemosynthetic Titans With Zero Mouth, Gut, or Digestive Tract', yearOrOrigin: 'Galapagos Rift · 2,500m Depth', summary: 'Thriving in pitch darkness around 400°C black smoker vents, these crimson-plumed worms rely entirely on intracellular symbiotic bacteria oxidizing toxic hydrogen sulfide into organic carbon.', factVerification: 'Their discovery in 1977 rewrote astrobiology criteria for icy moons like Europa and Enceladus.', votes: 720, rating: 4.9, ratingCount: 74 },
      { rank: 7, title: 'Channichthyidae (Antarctic Crocodile Icefish)', subtitle: 'The Only Known Vertebrate With Crystal-Clear, Hemoglobin-Free Blood', yearOrOrigin: 'Southern Ocean · -1.9°C Waters', summary: 'Living in sub-freezing Antarctic waters where dissolved oxygen is naturally high, icefish deleted their hemoglobin genes entirely, pumping translucent white blood through enlarged hearts.', factVerification: 'Antifreeze glycoproteins in their plasma prevent ice crystals from nucleating.', votes: 810, rating: 4.8, ratingCount: 80 },
      { rank: 6, title: 'Atretochoana eiselti', subtitle: 'A Three-Foot Lungless Amphibian Breathing Purely Through Amazonian Skin', yearOrOrigin: 'Madeira River Basin, Brazil', summary: 'Possessing neither lungs nor nostrils despite growing over a meter long, this aquatic caecilian relies on dense cutaneous capillary networks in fast-flowing turbid river currents.', factVerification: 'Known only from two museum specimens for over a century until rediscovered in 2011.', votes: 880, rating: 4.7, ratingCount: 69 },
      { rank: 5, title: 'Halomonas titanicae & Deep-Subsurface Lithoautotrophs', subtitle: 'Microbes Living Miles Inside Solid Basalt With 1,000-Year Cell Division Cycles', yearOrOrigin: 'Deep Biosphere · 3km Sub-Seafloor', summary: 'Deep inside oceanic crust fractures, zombie-like endolithic cells divide once every several centuries, powered purely by water radiolysis from natural uranium decay in surrounding rock.', factVerification: 'Collectively accounts for nearly 15% of Earth’s total biomass.', votes: 960, rating: 4.9, ratingCount: 95 },
      { rank: 4, title: 'Macropinna microstoma (Barreleye Fish)', subtitle: 'Rotating Tubular Emerald Eyes Encased Inside a Transparent Fluid-Filled Skull Dome', yearOrOrigin: 'Mesopelagic Twilight Zone · 800m', summary: 'For decades, marine biologists only hauled up specimens with ruptured craniums—until ROV cameras filmed the living fish looking straight upward through its own glass-clear forehead shield.', factVerification: 'Green lens pigments filter out residual downwelling sunlight to spot siphonophore bioluminescence.', votes: 1120, rating: 4.9, ratingCount: 114 },
      { rank: 3, title: 'Tardigrada (Cryptobiotic Water Bears)', subtitle: 'Vitrifying Cellular Cytoplasm Into Bioglass to Survive Vacuum & Absolute Zero', yearOrOrigin: 'Global Moss & Deep-Sea Sediments', summary: 'When desiccated, tardigrades replace intracellular water with intrinsically disordered proteins that solidify into amorphous glass, halting all metabolic time for decades.', factVerification: 'Revived and produced healthy offspring after ten days in open low-Earth orbit on FOTON-M3.', votes: 1340, rating: 4.9, ratingCount: 148 },
      { rank: 2, title: 'Turritopsis dohrnii (The Immortal Jellyfish)', subtitle: 'Cellular Transdifferentiation Rewinding Adult Medusae Back Into Juvenile Polyps', yearOrOrigin: 'Mediterranean & Global Oceans', summary: 'When subjected to physical damage or starvation, this 4.5-millimeter hydrozoan reabsorbs its tentacles, sinks to the seafloor, and reprograms its differentiated adult cells back into a youthful polyp colony.', factVerification: 'Genomic sequencing in 2022 identified doubled copies of telomere-maintenance and DNA-repair genes.', votes: 1620, rating: 5.0, ratingCount: 192 },
      { rank: 1, title: 'Chrysomallon squamiferum (The Scaly-Foot Iron Gastropod)', subtitle: 'A Deep-Sea Volcanic Snail That Builds a Three-Layer Suit of Greigite Iron Armor', yearOrOrigin: 'Kairei Hydrothermal Field · Indian Ocean', summary: 'Living on black smoker chimneys at 2,400 meters depth, this snail incorporates dissolved iron sulfides directly into a magnetic outer shell layer and overlapping metallic foot scales.', factVerification: 'The US military studied its tri-layered shell geometry for next-generation kinetic armor design.', votes: 2180, rating: 5.0, ratingCount: 265 },
    ],
  },
  {
    id: 'list-ancient-myth',
    title: '10 Mythological Sunken Cities & Lost Wonders That Turned Out To Be Real Places',
    deck: 'Dismissed for centuries as poetic allegory by Homer, Herodotus, and medieval chroniclers—until marine sonar and LiDAR proved them right.',
    category: 'Mythology & Lore',
    author: 'Dr. Helena Kass',
    authorRole: 'Maritime Archaeology Editor',
    publishedAt: 'October 09, 2026',
    readTime: '12 min read',
    artworkTheme: 'ancient-myth',
    featuredInHero: true,
    totalVotes: 8490,
    averageRating: 4.9,
    ratingCount: 620,
    viewsCount: '142.8K',
    entries: [
      { rank: 10, title: 'Dunwich (Britain’s Sunken Medieval Port)', subtitle: 'An Entire 13th-Century Capital of East Anglia Swallowed by Two Storm Surges', yearOrOrigin: '1286 & 1328 CE · Suffolk Coast', summary: 'Once rivaling London in size with eight parish churches and monastic hospitals, Dunwich was sheared off into the North Sea by catastrophic winter storm surges.', factVerification: 'Acoustic multibeam sonar mapped the submerged Gothic church ruins across two square kilometers of seabed.', votes: 590, rating: 4.8, ratingCount: 55 },
      { rank: 9, title: 'L’Anse aux Meadows (Vinland of the Norse Sagas)', subtitle: '11th-Century Norse Iron Smelting & Timber Halls in Newfoundland', yearOrOrigin: '1021 CE · Newfoundland, Canada', summary: 'Dismissed as medieval Icelandic folklore until Helge and Anne Stine Ingstad unearthed bog-iron nails, a bronze cloak pin, and Norse turf halls in 1960.', factVerification: 'Solar-storm radiocarbon spike in 993 CE dated the felled timber to the exact year 1021 CE.', votes: 670, rating: 4.8, ratingCount: 68 },
      { rank: 8, title: 'Ciudad Blanca (The White City of the Mosquitia)', subtitle: 'Airborne LiDAR Piercing Untouched Honduran Rainforest Canopy', yearOrOrigin: '1000–1400 CE · La Mosquitia, Honduras', summary: 'Conquistadors wrote of a stone city hidden inside impenetrable Mosquitia jungle valleys. In 2012, billion-pulse airborne laser scanning stripped away the foliage to reveal earthen plazas, pyramids, and caches of carved metates.', factVerification: 'Protected as the Kaha Kamasa archaeological reserve.', votes: 790, rating: 4.9, ratingCount: 82 },
      { rank: 7, title: 'Pavlopetri (The 5,000-Year-Old Sunken Town)', subtitle: 'Complete Bronze Age Streets, Courtyards & Rock-Cut Tombs Under 12 Feet of Water', yearOrOrigin: '2800 BCE · Laconia, Greece', summary: 'Submerged by three successive tectonic earthquakes around 1000 BCE, Pavlopetri preserves two-story Mycenaean house foundations and water management channels intact beneath crystal-clear Peloponnesian shallows.', factVerification: 'The oldest known submerged planned town with intact street grids on Earth.', votes: 890, rating: 4.8, ratingCount: 91 },
      { rank: 6, title: 'Rungholt (The Atlantis of the North Sea)', subtitle: 'The 1362 Grote Mandrenke Storm Surge Rediscovered in Wadden Sea Mudflats', yearOrOrigin: 'January 16, 1362 · North Frisia', summary: 'Legend claimed church bells still rang beneath the waves off Germany’s Frisian coast after a medieval super-storm drowned a wealthy trading town. In 2023, magnetic gradiometry mapped its two-kilometer main dike and harbor church.', factVerification: 'Confirmed by Kiel University geophysicists in May 2023.', votes: 980, rating: 4.9, ratingCount: 104 },
      { rank: 5, title: 'baiae (The Sunken Hedonistic Resort of Roman Emperors)', subtitle: 'Bradyseismic Volcanic Subsidence Preserving Marble Villas Under the Bay of Naples', yearOrOrigin: '100 BCE – 300 CE · Campi Flegrei', summary: 'Where Julius Caesar, Nero, and Hadrian built sprawling thermal bath palaces, slow volcanic deflation lowered the entire coastline twenty feet below sea level, turning mosaic floors into an underwater sculpture park.', factVerification: 'Nymphaeum statues recovered from Baiae had to be replicated in situ to protect the originals.', votes: 1120, rating: 4.9, ratingCount: 120 },
      { rank: 4, title: 'Dwarka (The Submerged Port of the Mahabharata)', subtitle: 'Hundreds of Carved Stone Three-Hole Anchors & Jetty Walls Off Gujarat', yearOrOrigin: '1500 BCE · Gulf of Khambhat, India', summary: 'Sanskrit epics described Dwarka being reclaimed by the Arabian Sea. Marine excavations off modern Bet Dwarka uncovered fortified limestone bastions and the largest concentration of Bronze Age stone anchors in the Indian Ocean.', factVerification: 'Thermoluminescence dating of pottery shards confirmed Late Harappan continuity.', votes: 1290, rating: 4.9, ratingCount: 145 },
      { rank: 3, title: 'Nan Madol (The Venice of the Pacific Built From 750,000 Tons of Basalt)', subtitle: '92 Artificial Lagoon Islets Constructed From Hexagonal Volcanic Columns', yearOrOrigin: '1180 CE · Pohnpei, Micronesia', summary: 'Built atop a Pacific coral reef with no pulleys or metal tools, the Saudeleur Dynasty floated 50-ton prismatic basalt logs across open ocean to stack 30-foot seawalls.', factVerification: 'Designated a UNESCO World Heritage site in 2016.', votes: 1480, rating: 4.9, ratingCount: 168 },
      { rank: 2, title: 'Göbekli Tepe & Karahan Tepe', subtitle: 'Megalithic T-Pillar Sanctuaries Carved by Hunter-Gatherers 6,000 Years Before Stonehenge', yearOrOrigin: '9600 BCE · Southeastern Anatolia', summary: 'Before pottery, metallurgy, or domesticated wheat existed, Pre-Pottery Neolithic communities quarried 16-ton limestone monoliths covered in high-relief foxes, vultures, and astronomical motifs—then intentionally backfilled them.', factVerification: 'Over 200 additional pillars remain unexcavated inside the artificial mound.', votes: 1890, rating: 5.0, ratingCount: 240 },
      { rank: 1, title: 'Thonis-Heracleion (The Lost Pharaohs’ Port in Aboukir Bay)', subtitle: '64 Shipwrecks, 16-Foot Granite Colossi & Stele Submerged by Liquefaction', yearOrOrigin: '8th Century BCE – 2nd Century BCE · Egypt', summary: 'For 2,000 years Heracleion existed only in Herodotus’s Histories and Greek myth. In 2000, Franck Goddio’s proton-magnetometer survey located the intact black granodiorite decree stele and towering statues of Hapi beneath Nile silt.', factVerification: 'Heavy temple loads caused saturated Nile delta clay to liquefy during a 2nd-century BCE flood.', votes: 2460, rating: 5.0, ratingCount: 330 },
    ],
  },
];

export const INITIAL_COMMUNITY_POLLS: CommunityPoll[] = [
  {
    id: 'poll-scifi-century',
    category: 'Sci-Fi Cinema',
    question: 'Which 21st-Century Hard Sci-Fi Film Deserves the #1 All-Time Rank?',
    description: 'Cast your vote to influence our upcoming Winter 2026 Definitive Reader Edition countdown.',
    totalVotes: 8420,
    userVotedOptionId: null,
    options: [
      { id: 'opt-interstellar', title: 'Interstellar (2014)', detail: 'Relativistic time dilation & Kip Thorne’s Kerr black hole metrics', votes: 3190 },
      { id: 'opt-arrival', title: 'Arrival (2016)', detail: 'Sapir-Whorf xenolinguistics & variational principle physics', votes: 2480 },
      { id: 'opt-children-men', title: 'Children of Men (2006)', detail: 'Single-take documentary realism & demographic collapse', votes: 1640 },
      { id: 'opt-ex-machina', title: 'Ex Machina (2014)', detail: 'Embodied Turing test manipulation in an isolated research bunker', votes: 1110 },
    ],
  },
  {
    id: 'poll-open-world',
    category: 'Gaming Worlds',
    question: 'Which Virtual Open World Has the Most Convincing Living Ecology?',
    description: 'Ranked by autonomous NPC routines, unscripted wildlife chains, and environmental physics.',
    totalVotes: 6910,
    userVotedOptionId: null,
    options: [
      { id: 'opt-rdr2', title: 'Red Dead Redemption 2', detail: '200+ wildlife species, decomposition chains & dynamic frontier growth', votes: 2740 },
      { id: 'opt-rainworld', title: 'Rain World', detail: 'Procedural neural-network predator hierarchy that operates off-screen', votes: 1890 },
      { id: 'opt-outerwilds', title: 'Outer Wilds', detail: 'Continuous Keplerian N-body solar system physics & real-time erosion', votes: 1360 },
      { id: 'opt-stalker', title: 'S.T.A.L.K.E.R.: Shadow of Chernobyl', detail: 'Unscripted A-Life Zone migration and faction skirmishes', votes: 920 },
    ],
  },
  {
    id: 'poll-unexplained-artifact',
    category: 'Weird Facts',
    question: 'Which Archaeological Mystery Most Deserves a Dedicated Deep-Dive Documentary?',
    description: 'Vote on the historical anomaly our editorial archival team should investigate next.',
    totalVotes: 5380,
    userVotedOptionId: null,
    options: [
      { id: 'opt-antikythera', title: 'The Antikythera Mechanism', detail: '150 BCE epicyclic bronze differential calendar computer', votes: 2140 },
      { id: 'opt-voynich', title: 'The Voynich Codex (MS 408)', detail: '15th-century vellum manuscript with undeciphered natural entropy', votes: 1580 },
      { id: 'opt-dodecahedra', title: 'The Roman Bronze Dodecahedra', detail: '116 Gallo-Roman geometric polyhedra unmentioned in any text', votes: 1040 },
      { id: 'opt-saqqara-disc', title: 'The Saqqara Tri-Lobe Schist Vessel', detail: 'First Dynasty paper-thin carved stone hydrodynamic disc', votes: 620 },
    ],
  },
];

export const INITIAL_BLOGS: EditorialBlog[] = [
  {
    id: 'blog-countdown-psychology',
    title: 'Why the Reverse Countdown (#10 to #1) Remains the Most Potent Narrative Structure on the Web',
    subtitle: 'An architectural analysis of suspense, cognitive closure, and why Listverse-style curation outlasted algorithmic feeds.',
    category: 'Pop Culture',
    author: 'Eleanor Vance-Sterling',
    authorRole: 'Editor-in-Chief',
    publishedAt: 'October 29, 2026',
    readTime: '7 min read',
    artworkTheme: 'weird-artifacts',
    pullQuote: 'A descending countdown is a contract with the reader: every scroll promises an escalation of stakes, rarity, or strangeness.',
    excerpt: 'Long before infinite scroll hijacked attention spans, the reverse numbered chronicle offered something far rarer: finite, structured curiosity with a definitive climax at #1.',
    paragraphs: [
      'During the golden era of curiosity publications—anchored by pioneers like Listverse—readers did not arrive looking for generic encyclopedia summaries. They arrived seeking curated escalation. Beginning at #10 establishes a baseline threshold of wonder, while each subsequent numeral acts as a structural chapter marker ratcheting up historical or scientific improbability.',
      'Cognitive psychologists refer to this mechanism as the Zeigarnik gradient: once a human mind perceives a bounded ten-step sequence, abandoning the sequence at #4 creates palpable narrative tension. Unlike endless social feeds that induce fatigue without resolution, a Top 10 essay rewards the reader with a distinct intellectual payoff.',
      'In designing Tenfold, we combined museum-grade archival typography with live reader counter-ranking. When an editorial board places Interstellar at #1 over 2001: A Space Odyssey, the comment section and live vote tally become a living peer-review symposium.',
    ],
  },
  {
    id: 'blog-practical-effects-scifi',
    title: 'How Kip Thorne’s Relativistic Equations Changed Visual Effects Forever',
    subtitle: 'Inside the 40,000 lines of C++ code that turned general relativity into cinema.',
    category: 'Sci-Fi Cinema',
    author: 'Dr. Julian Vance',
    authorRole: 'Senior Film & Science Editor',
    publishedAt: 'October 25, 2026',
    readTime: '9 min read',
    artworkTheme: 'scifi-portal',
    pullQuote: 'For the first time in Hollywood history, the visual effects supervisor did not draw what a black hole should look like—he compiled Einstein’s equations and waited for the light rays to converge.',
    excerpt: 'Standard ray-tracing assumes light travels in straight Euclidean lines. Near a spinning Kerr black hole, light bundles twist through warped spacetime.',
    paragraphs: [
      'When Paul Franklin’s team at Double Negative began testing point-light ray tracers for Gargantua, single light rays flickered violently across pixel boundaries. Kip Thorne realized they needed to integrate bundles of light rays—caustic beams—backward from the virtual IMAX camera lens through the warped Kerr metric.',
      'When the first full-resolution frame finished rendering after 100 hours of compute time, neither Thorne nor the animators expected the accretion disk to wrap both over the top and underneath the black hole’s shadow simultaneously. Gravitational lensing bent the far side of the disk into a luminous double halo.',
      'Five years later, when the Event Horizon Telescope collaboration synthesized petabytes of millimeter-wave interferometry from M87*, the resulting silhouette confirmed that cinematic physics had genuinely previewed observational astronomy.',
    ],
  },
  {
    id: 'blog-psychoacoustics-cinema',
    title: 'The 19-Hertz Ghost Frequency: Fact vs. Folklore in Modern Horror Sound Design',
    subtitle: 'Investigating Vic Tandy’s standing acoustic wave experiment and its adoption by cinema sound mixers.',
    category: 'Horror & Thrillers',
    author: 'Clara Moreau',
    authorRole: 'Cinema & Sound Editor',
    publishedAt: 'October 20, 2026',
    readTime: '6 min read',
    artworkTheme: 'horror-manor',
    pullQuote: 'You do not hear 19 Hertz with your cochlea; you feel it as a cold pressure behind the sternum and a shimmer at the edge of peripheral vision.',
    excerpt: 'In 1998, British engineer Vic Tandy discovered that an extractor fan vibrating at 18.98 Hz inside a Coventry laboratory was causing workers to see grey peripheral apparitions.',
    paragraphs: [
      'The human eyeball possesses a natural mechanical resonant frequency near 18 to 19 Hertz, first cataloged in NASA technical report 19770013810 during rocket-launch vibration tests. When standing acoustic waves in an enclosed room match that frequency, subtle ocular vibrations register on the retina as shadowy peripheral movement.',
      'Modern theatrical horror mixers routinely layer sub-24 Hz sine sweeps beneath quiet dialogue scenes. Even on consumer headphones that roll off below 30 Hz, harmonic distortion in the 38 Hz and 57 Hz octaves signals impending threat before a single visual cue appears.',
    ],
  },
  {
    id: 'blog-emergent-game-ai',
    title: 'Why Simulating Off-Screen Worlds Makes Video Games Feel Haunted With Life',
    subtitle: 'From Ultima Online’s doomed deer herds to Rain World’s independent lizard minds.',
    category: 'Gaming Worlds',
    author: 'Marcus K. Lin',
    authorRole: 'Interactive Systems Critic',
    publishedAt: 'October 16, 2026',
    readTime: '8 min read',
    artworkTheme: 'gaming-citadel',
    pullQuote: 'A game world becomes unforgettable the moment you realize its creatures are not waiting in a T-pose for your camera frustum to arrive.',
    excerpt: 'Most games are theatrical stage sets that only exist within a 100-meter radius of the player. The rarest masterpieces simulate ecosystems whether you are watching or not.',
    paragraphs: [
      'When players first stepped into Rain World’s industrial ruins, many assumed the lizard predators followed deterministic patrol paths. In reality, each creature runs an autonomous utility controller weighing hunger, injury, rain-timer urgency, and personal vendettas against specific scavengers.',
      'By decoupling world simulation from player proximity, game designers trade scripted predictability for genuine anecdote generation—where every player walks away with a survival story the developers themselves never scripted.',
    ],
  },
];

export const INITIAL_VISITOR_REVIEWS: VisitorReview[] = [
  {
    id: 'rev-1',
    listId: 'list-scifi-prophecies',
    listTitle: '10 Mind-Bending Sci-Fi Films That Predicted Real Scientific Breakthroughs',
    targetItemTitle: '#1 Interstellar (2014)',
    visitorName: 'Soren Lindholm',
    visitorLocation: 'Stockholm, Sweden',
    rating: 5,
    comment: 'The fact that Kip Thorne and Double Negative actually published two peer-reviewed papers in Classical and Quantum Gravity from the Gargantua renderer makes Interstellar an undisputed #1. Arrival is a very close #2 for the Wolfram code alone.',
    createdAt: '2 hours ago',
    upvotes: 142,
    status: 'Featured',
  },
  {
    id: 'rev-2',
    listId: 'list-weird-artifacts',
    listTitle: '10 Unexplained Historical Artifacts That Archaeologists Still Cannot Classify',
    targetItemTitle: '#3 The Roman Dodecahedra',
    visitorName: 'Dr. Nadia Al-Mansoor',
    visitorLocation: 'Oxford, UK',
    rating: 5,
    comment: 'I saw three of the Gallo-Roman bronze dodecahedra at the Gallo-Roman Museum in Tongeren last spring. What stunned me is the absence of wear marks inside the apertures—ruling out rope or transit surveying instruments.',
    createdAt: '5 hours ago',
    upvotes: 98,
    status: 'Featured',
  },
  {
    id: 'rev-3',
    listId: 'list-gaming-ecosystems',
    listTitle: '10 Open-World Video Games With Secret Ecosystems Hidden From Players',
    targetItemTitle: '#1 Rain World (2017)',
    visitorName: 'Devon K.',
    visitorLocation: 'Seattle, WA',
    rating: 5,
    comment: 'Finally a publication puts Rain World at #1 where it belongs! Watching a pack of scavengers rescue me from a Green Lizard simply because I gifted them a pearl three cycles earlier was the greatest unscripted moment in my 25 years of gaming.',
    createdAt: '1 day ago',
    upvotes: 84,
    status: 'Approved',
  },
  {
    id: 'rev-4',
    listId: 'list-horror-acoustics',
    listTitle: '10 Psychological Horror Masterpieces Built On Real Acoustic Phenomena',
    targetItemTitle: '#9 The Lighthouse (2019)',
    visitorName: 'Mateo Rivera',
    visitorLocation: 'Madrid, Spain',
    rating: 4,
    comment: 'Saw The Lighthouse in an IMAX theater with calibrated subwoofers—that 1913 Scottish diaphone foghorn blast physically rattled the seat frames every time it sounded. Berberian Sound Studio also deserves huge credit.',
    createdAt: '1 day ago',
    upvotes: 61,
    status: 'Approved',
  },
  {
    id: 'rev-5',
    listId: 'list-cosmic-disasters',
    listTitle: '10 Cataclysmic Megastructures & Planetary Disasters Waiting In Deep Space',
    targetItemTitle: '#2 Magnetar SGR 1806-20',
    visitorName: 'Elena Rostova',
    visitorLocation: 'Zurich, Switzerland',
    rating: 5,
    comment: 'Compressing Earth’s ionosphere from 50,000 light-years away on December 27, 2004 is still the wildest real telemetry event in modern astrophysics.',
    createdAt: '2 days ago',
    upvotes: 73,
    status: 'Pending Review',
  },
];
