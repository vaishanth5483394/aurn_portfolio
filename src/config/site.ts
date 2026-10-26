// Single source of truth for personal details. Everything here comes from the
// supplied resume / brief. Edit freely.
export const site = {
  name: 'Arun Adhinath',
  role: 'Video Editor & Visual Storyteller',
  tagline: 'Every Frame Tells a Story.',
  email: 'arunadhinath2028@gmail.com',
  // Country code 91 + 10-digit mobile number. The resume shows this number with a digit
  // missing, so this follows the brief's digits. Confirm before launch.
  phoneDisplay: '+91 97514 51222',
  phoneTel: '+919751451222',
  whatsapp: '919751451222',
  location: 'Bengaluru, India',
  resumeUrl: '/resume/Arun-Adhinath-Resume.pdf',
  portrait: '/media/photo/portrait.jpg',
  // Only add real URLs here; empty ones are not rendered.
  socials: [] as { label: string; url: string }[],
}

export const resume = {
  summary:
    'Creative video editor with expertise in transforming raw footage into engaging narratives. Strong skills in video editing and sound design enhance storytelling.',
  experience: [
    {
      period: 'April 2024 – Current',
      title: 'Personal video editor',
      org: 'Family and friends · Pollachi',
      points: [
        'Edited video footage for family and friends, enhancing storytelling through trimming, sequencing and pacing adjustments.',
        'Assembled raw clips into clear, polished story lines.',
        'Added transitions, titles and captions to personal video projects.',
        'Organized and managed project files and source media for efficient editing.',
        'Managed multiple video projects from import through final delivery.',
        'Incorporated graphics, titles, audio and special effects to create engaging video projects.',
      ],
    },
  ],
  education: [
    {
      period: 'August 2026 – current',
      title: 'Bachelor of Science · Animation',
      org: 'Jain (Deemed-to-be University), Bengaluru',
    },
  ],
  skills: [
    'Video editing',
    'Video production software',
    'Quick editing',
    'Sound design',
    'Storytelling techniques',
    'Photography',
    'Client communication',
    'Self motivation',
  ],
  languages: [
    { name: 'Tamil', level: 'First language', pct: 100 },
    { name: 'Kannada', level: 'Proficient (C2)', pct: 100 },
    { name: 'Telugu', level: 'Advanced (C1)', pct: 85 },
    { name: 'Hindi', level: 'Advanced (C1)', pct: 85 },
    { name: 'English', level: 'Upper Intermediate (B2)', pct: 68 },
    { name: 'Sanskrit', level: 'Intermediate (B1)', pct: 50 },
    { name: 'Malayalam', level: 'Beginner (A1)', pct: 16 },
  ],
}
