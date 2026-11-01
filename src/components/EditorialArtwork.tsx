import React, { useState, useEffect, useRef } from 'react';
import { Film, Play } from 'lucide-react';

export type ArtworkTheme =
  | 'scifi-portal'
  | 'weird-artifacts'
  | 'gaming-citadel'
  | 'horror-manor'
  | 'cosmic-disaster'
  | 'coldwar-mystery'
  | 'bizarre-nature'
  | 'ancient-myth'
  | 'true-crime'
  | 'pop-cinema';

/**
 * Multi-image high-definition photography pool per theme so that lists,
 * individual #10-#1 entries, category posters, and blogs each display distinct visuals.
 */
const THEME_PHOTO_POOLS: Record<
  ArtworkTheme,
  { photos: string[]; palette: [string, string, string] }
> = {
  'scifi-portal': {
    photos: [
      'https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/956981/milky-way-starry-sky-night-sky-star-956981.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/41162/moon-landing-apollo-11-nasa-buzz-aldrin-41162.jpeg?auto=compress&cs=tinysrgb&w=1600',
    ],
    palette: ['#050711', '#1E1B4B', '#F43F5E'],
  },
  'weird-artifacts': {
    photos: [
      'https://images.pexels.com/photos/8828439/pexels-photo-8828439.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/1097491/pexels-photo-1097491.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/2832034/pexels-photo-2832034.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=1600',
    ],
    palette: ['#08090E', '#451A03', '#F59E0B'],
  },
  'gaming-citadel': {
    photos: [
      'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/2387793/pexels-photo-2387793.jpeg?auto=compress&cs=tinysrgb&w=1600',
    ],
    palette: ['#060911', '#0F172A', '#38BDF8'],
  },
  'horror-manor': {
    photos: [
      'https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/9754/mountains-clouds-forest-fog.jpg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/691668/pexels-photo-691668.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/15286/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1600',
    ],
    palette: ['#05070A', '#1E293B', '#E11D48'],
  },
  'cosmic-disaster': {
    photos: [
      'https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/73873/star-clusters-rosette-nebula-star-galaxies-73873.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/816608/pexels-photo-816608.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/39561/solar-flare-sun-eruption-energy-39561.jpeg?auto=compress&cs=tinysrgb&w=1600',
    ],
    palette: ['#05050A', '#4C0519', '#FB923C'],
  },
  'coldwar-mystery': {
    photos: [
      'https://images.pexels.com/photos/256381/pexels-photo-256381.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/2159/flight-sky-earth-space.jpg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/355935/pexels-photo-355935.jpeg?auto=compress&cs=tinysrgb&w=1600',
    ],
    palette: ['#060B11', '#0F172A', '#10B981'],
  },
  'bizarre-nature': {
    photos: [
      'https://images.pexels.com/photos/1076758/pexels-photo-1076758.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/3046629/pexels-photo-3046629.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/932638/pexels-photo-932638.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/1894350/pexels-photo-1894350.jpeg?auto=compress&cs=tinysrgb&w=1600',
    ],
    palette: ['#040D12', '#083344', '#06B6D4'],
  },
  'ancient-myth': {
    photos: [
      'https://images.pexels.com/photos/2356045/pexels-photo-2356045.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/161815/santorini-oia-greece-water-161815.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/3290068/pexels-photo-3290068.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/71241/pexels-photo-71241.jpeg?auto=compress&cs=tinysrgb&w=1600',
    ],
    palette: ['#090A0F', '#1E293B', '#FBBF24'],
  },
  'true-crime': {
    photos: [
      'https://images.pexels.com/photos/315191/pexels-photo-315191.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/169647/pexels-photo-169647.jpeg?auto=compress&cs=tinysrgb&w=1600',
    ],
    palette: ['#06070B', '#18181B', '#EF4444'],
  },
  'pop-cinema': {
    photos: [
      'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/274937/pexels-photo-274937.jpeg?auto=compress&cs=tinysrgb&w=1600',
      'https://images.pexels.com/photos/1117132/pexels-photo-1117132.jpeg?auto=compress&cs=tinysrgb&w=1600',
    ],
    palette: ['#07060E', '#31102F', '#F43F5E'],
  },
};

/**
 * Converts a standard Google Drive sharing URL into a direct embeddable image or video preview URL.
 */
export function parseGoogleDriveUrl(url?: string): {
  type: 'drive-file' | 'external' | 'none';
  fileId?: string;
  imageUrl?: string;
  videoPreviewUrl?: string;
} {
  if (!url || !url.trim()) return { type: 'none' };
  const trimmed = url.trim();

  const fileIdMatch =
    trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
    trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/) ||
    trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/);

  if (fileIdMatch && fileIdMatch[1]) {
    const fileId = fileIdMatch[1];
    return {
      type: 'drive-file',
      fileId,
      imageUrl: `https://drive.google.com/thumbnail?id=${fileId}&sz=w1600`,
      videoPreviewUrl: `https://drive.google.com/file/d/${fileId}/preview`,
    };
  }

  return {
    type: 'external',
    imageUrl: trimmed,
    videoPreviewUrl: trimmed,
  };
}

interface EditorialArtworkProps {
  theme: ArtworkTheme;
  driveImageUrl?: string;
  driveVideoUrl?: string;
  alt: string;
  className?: string;
  rankNumber?: number;
  variantIndex?: number;
  animateZoom?: boolean;
  showVideoTrigger?: boolean;
}

export const EditorialArtwork: React.FC<EditorialArtworkProps> = ({
  theme,
  driveImageUrl,
  driveVideoUrl,
  alt,
  className = 'w-full h-full',
  rankNumber,
  variantIndex = 0,
  animateZoom = false,
  showVideoTrigger = false,
}) => {
  const [fallbackOffset, setFallbackOffset] = useState<number>(0);
  const [showVideoEmbed, setShowVideoEmbed] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const themeConfig = THEME_PHOTO_POOLS[theme] || THEME_PHOTO_POOLS['scifi-portal'];
  const parsedImage = parseGoogleDriveUrl(driveImageUrl);
  const parsedVideo = parseGoogleDriveUrl(driveVideoUrl);

  useEffect(() => {
    setFallbackOffset(0);
  }, [theme, driveImageUrl, variantIndex]);

  // Paint high-resolution atmospheric cinema shader on background canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = 640;
    const h = 360;
    canvas.width = w;
    canvas.height = h;

    const [c0, c1, c2] = themeConfig.palette;
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, c0);
    grad.addColorStop(0.55, c1);
    grad.addColorStop(1, c0);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Volumetric atmospheric flare
    const rad = ctx.createRadialGradient(w * 0.65, h * 0.35, 10, w * 0.65, h * 0.35, w * 0.6);
    rad.addColorStop(0, `${c2}66`);
    rad.addColorStop(0.5, `${c2}18`);
    rad.addColorStop(1, 'transparent');
    ctx.fillStyle = rad;
    ctx.fillRect(0, 0, w, h);
  }, [themeConfig]);

  if (showVideoEmbed && parsedVideo.type !== 'none' && parsedVideo.videoPreviewUrl) {
    return (
      <div className={`relative overflow-hidden bg-black ${className}`}>
        <iframe
          src={parsedVideo.videoPreviewUrl}
          title={alt}
          className="w-full h-full border-0"
          allow="autoplay; encrypted-media; fullscreen"
        />
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setShowVideoEmbed(false);
          }}
          className="absolute top-4 right-4 px-3.5 py-1.5 text-xs font-semibold bg-black/85 text-white border border-white/20 rounded-lg hover:bg-black transition-colors whitespace-nowrap shrink-0"
        >
          Close Video Player
        </button>
      </div>
    );
  }

  const pool = themeConfig.photos;
  const poolIndex = Math.abs((variantIndex || 0) + fallbackOffset) % pool.length;
  let activeImageUrl = pool[poolIndex];

  if (parsedImage.type !== 'none' && parsedImage.imageUrl && fallbackOffset === 0) {
    activeImageUrl = parsedImage.imageUrl;
  }

  return (
    <div className={`relative overflow-hidden bg-[#06070B] select-none ${className}`}>
      {/* Underlying Atmospheric Cinema Shader Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />

      {/* High-Resolution Photographic Layer */}
      {fallbackOffset < pool.length && (
        <img
          src={activeImageUrl}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setFallbackOffset((prev) => prev + 1)}
          className={`relative z-10 w-full h-full object-cover transition-transform duration-1000 ease-out ${
            animateZoom ? 'scale-105' : 'group-hover:scale-105'
          }`}
        />
      )}

      {/* Subtle Cinema Vignette & Color Grade Overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-[#06070B]/85 via-transparent to-black/30"
        aria-hidden="true"
      />

      {/* Optional Rank Number Overlay */}
      {typeof rankNumber === 'number' && (
        <div className="absolute top-3.5 left-3.5 z-20 bg-black/75 backdrop-blur-md border border-white/15 px-3 py-1 rounded-md">
          <span className="font-mono-tabular text-xs font-bold tracking-wider text-rose-400">
            TOP {rankNumber < 10 ? `0${rankNumber}` : rankNumber}
          </span>
        </div>
      )}

      {/* Optional Google Drive Video Trigger */}
      {showVideoTrigger && parsedVideo.type !== 'none' && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setShowVideoEmbed(true);
          }}
          className="absolute bottom-4 right-4 z-20 flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-xl transition-colors whitespace-nowrap shrink-0"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Play Drive Video</span>
        </button>
      )}

      {/* Subtle Drive Cloud Indicator when using custom Drive media */}
      {(parsedImage.type === 'drive-file' || parsedVideo.type === 'drive-file') &&
        !showVideoTrigger && (
          <div className="absolute bottom-3 right-3 z-20 bg-black/80 backdrop-blur-md text-slate-200 px-2.5 py-1 rounded text-[11px] flex items-center gap-1.5 border border-white/15">
            <Film className="w-3 h-3 text-rose-400" />
            <span>Drive Media Linked</span>
          </div>
        )}
    </div>
  );
};
