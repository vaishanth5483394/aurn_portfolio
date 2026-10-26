// ─────────────────────────────────────────────────────────────────────────────
// PROJECT DATA — the only file you need to edit to change the gallery.
//
// Each project's media can be:
//   • a local file under /public (e.g. '/media/video/river-edit.mp4'), or
//   • a hosted URL (e.g. a Cloudinary / Mux / S3 / Bunny URL).
// Just change `src` and `poster`. Add, remove or reorder entries freely.
// Titles and descriptions are written from what is visibly on screen; they
// contain no client names or claims. `tools` is left out until confirmed.
// ─────────────────────────────────────────────────────────────────────────────

export const CATEGORIES = [
  'All Work',
  'Cinematic',
  'Travel & Nature',
  'Cityscapes',
  'Creative Edits',
  'Short Videos',
] as const
export type Category = (typeof CATEGORIES)[number]
export type ProjectCategory = Exclude<Category, 'All Work'>

export interface Project {
  slug: string
  title: string
  kind: 'video' | 'photo'
  categories: ProjectCategory[]
  /** Aspect of the media; drives the card shape. */
  aspect: 'landscape' | 'portrait'
  /** Video file / hosted URL, or the full-size image for photos. */
  src: string
  /** Thumbnail / poster image. */
  poster: string
  description: string
  /** Display length, e.g. '0:17'. Videos only. */
  duration?: string
  year?: string
  /** Optional. Only list software you can confirm. */
  tools?: string[]
}

export const projects: Project[] = [
  {
    slug: 'by-the-river',
    title: 'By the River',
    kind: 'video',
    categories: ['Cinematic', 'Travel & Nature', 'Creative Edits', 'Short Videos'],
    aspect: 'landscape',
    src: '/media/video/river-edit.mp4',
    poster: '/media/poster/river-edit.jpg',
    description:
      'A wide riverside landscape of rocks, water and forested hills, with a lone figure seen from behind and animated text that sits inside the scene.',
    duration: '0:13',
    year: '2026',
  },
  {
    slug: 'gallery-reel',
    title: 'Gallery Reel',
    kind: 'video',
    categories: ['Creative Edits', 'Short Videos'],
    aspect: 'portrait',
    src: '/media/video/temple-reel.mp4',
    poster: '/media/poster/temple-reel.jpg',
    description:
      'A vertical short that moves between portraits and a towering temple gopuram, tied together by one recurring on-screen caption.',
    duration: '0:12',
    year: '2026',
  },
  {
    slug: 'misty-highlands',
    title: 'Misty Highlands',
    kind: 'photo',
    categories: ['Travel & Nature'],
    aspect: 'portrait',
    src: '/media/photo/misty-highlands.jpg',
    poster: '/media/photo/misty-highlands.jpg',
    description:
      'Photograph. A lone house on a tea-covered hillside, half dissolved by drifting cloud.',
  },
  {
    slug: 'golden-tower',
    title: 'Golden Tower',
    kind: 'photo',
    categories: ['Travel & Nature'],
    aspect: 'portrait',
    src: '/media/photo/golden-tower.jpg',
    poster: '/media/photo/golden-tower.jpg',
    description:
      'Photograph. A warm sunset wraps a glass tower in amber light while thick foliage frames the base.',
  },
  {
    slug: 'city-grove',
    title: 'City Grove',
    kind: 'photo',
    categories: ['Travel & Nature'],
    aspect: 'landscape',
    src: '/media/photo/city-grove.jpg',
    poster: '/media/photo/city-grove.jpg',
    description:
      'Photograph. A dense tree canopy meets the urban edge as the late golden light settles across the street.',
  },
  {
    slug: 'lyrics-in-motion',
    title: 'Lyrics in Motion',
    kind: 'video',
    categories: ['Creative Edits', 'Short Videos'],
    aspect: 'landscape',
    src: '/media/video/lyric-edit.mp4',
    poster: '/media/poster/lyric-edit.jpg',
    description:
      'A short edit pairing warm, grainy portrait footage with animated on-screen lyrics that reflow as the shots change.',
    duration: '0:17',
    year: '2026',
  },
  {
    slug: 'heritage-in-detail',
    title: 'Heritage in Detail',
    kind: 'photo',
    categories: ['Cityscapes'],
    aspect: 'landscape',
    src: '/media/photo/heritage-detail.jpg',
    poster: '/media/photo/heritage-detail.jpg',
    description:
      'Photograph. A palace courtyard: wrought-iron stair railing in the foreground, painted columns, stained-glass arches and carved figures behind.',
  },
  {
    slug: 'heat-up',
    title: 'Heat Up',
    kind: 'video',
    categories: ['Creative Edits', 'Short Videos'],
    aspect: 'landscape',
    src: '/media/video/car-edit.mp4',
    poster: '/media/poster/car-edit.jpg',
    description:
      'A playful short that opens on a phone in a freezer, then cuts into a fast car edit with colour flashes, glitch and RGB split.',
    duration: '0:12',
    year: '2026',
  },
]

// Optional: the hero background. Swap `src` to any project file or hosted URL.
export const hero = {
  src: '/media/video/hero.mp4',
  poster: '/media/poster/hero.jpg',
}
