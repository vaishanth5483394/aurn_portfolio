import { useEffect, useMemo, useRef, useState } from 'react'
import { Play, Image as ImageIcon } from 'lucide-react'
import { CATEGORIES, projects, type Category, type Project } from '../config/projects'
import Reveal from './Reveal'

function Card({ p, index, onOpen }: { p: Project; index: number; onOpen: (slug: string) => void }) {
  const [loaded, setLoaded] = useState(false)
  const [broken, setBroken] = useState(false)
  return (
    <Reveal className="mb-8 break-inside-avoid md:mb-12" delay={(index % 2) * 90}>
      <button
        onClick={() => onOpen(p.slug)}
        data-cursor={p.kind === 'video' ? 'Play' : 'View'}
        className="group block w-full text-left"
        aria-label={`${p.kind === 'video' ? 'Play' : 'View'} ${p.title}`}
      >
        <div
          className={`relative w-full overflow-hidden bg-surface ${p.aspect === 'portrait' ? 'aspect-[9/16]' : 'aspect-video'}`}
        >
          {!broken ? (
            <img
              src={p.poster}
              alt={`${p.title} — ${p.kind === 'video' ? 'video thumbnail' : 'photograph'}`}
              loading="lazy"
              decoding="async"
              onLoad={() => setLoaded(true)}
              onError={() => setBroken(true)}
              className={`h-full w-full object-cover transition-[transform,opacity] duration-[1200ms] ease-out group-hover:scale-[1.06] ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ) : (
            <div className="grid h-full place-items-center font-mono text-[11px] uppercase tracking-wide2 text-white/40">
              Thumbnail unavailable
            </div>
          )}
          <div className="absolute inset-0 bg-ink/10 transition-colors duration-500 group-hover:bg-ink/35" />
          <span className="absolute left-4 top-4 font-mono text-[11px] tracking-wide2 text-white/80">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="absolute bottom-4 right-4 grid h-14 w-14 place-items-center rounded-full border border-white/70 bg-ink/40 text-white backdrop-blur-sm transition-all duration-300 group-hover:border-teal group-hover:bg-teal group-hover:text-ink">
            {p.kind === 'video' ? <Play size={18} fill="currentColor" /> : <ImageIcon size={18} />}
          </span>
        </div>
        <div className="mt-4 flex items-start justify-between gap-6 border-t hairline pt-4">
          <div>
            <h3 className="font-display text-3xl leading-none md:text-4xl">{p.title}</h3>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-wide2 text-teal">{p.categories.join(' · ')}</p>
          </div>
          <p className="shrink-0 pt-1 font-mono text-[11px] uppercase tracking-wide2 text-white/50">
            {p.kind === 'video' ? p.duration : 'Photograph'}
          </p>
        </div>
      </button>
    </Reveal>
  )
}

export default function Work({ onOpen }: { onOpen: (slug: string) => void }) {
  const [filter, setFilter] = useState<Category>('All Work')
  const list = useMemo(
    () => (filter === 'All Work' ? projects : projects.filter((p) => p.categories.includes(filter))),
    [filter],
  )
  const count = (c: Category) => (c === 'All Work' ? projects.length : projects.filter((p) => p.categories.includes(c)).length)

  // custom "Play / View" cursor (fine pointers only)
  const dot = useRef<HTMLDivElement>(null)
  const label = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    let raf = 0
    const move = (e: MouseEvent) => {
      const hit = (e.target as HTMLElement).closest<HTMLElement>('[data-cursor]')
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        if (!dot.current || !label.current) return
        dot.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(${hit ? 1 : 0})`
        if (hit) label.current.textContent = hit.dataset.cursor ?? ''
      })
    }
    window.addEventListener('mousemove', move)
    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section id="work" className="relative mx-auto max-w-[1500px] px-5 py-28 md:px-10 md:py-40">
      <Reveal className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="eyebrow mb-5">01 — Selected Work</p>
          <h2 className="font-display text-[clamp(2.6rem,8vw,7.5rem)] leading-[0.92]">
            Frames worth
            <br />
            <em className="text-teal">watching twice.</em>
          </h2>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-white/60">
          Short edits and photographs, in no particular order. Open any piece to watch it full-frame.
        </p>
      </Reveal>

      <div role="group" aria-label="Filter work by category" className="mt-14 flex flex-wrap gap-x-2 gap-y-3 border-y hairline py-5">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            aria-pressed={filter === c}
            onClick={() => setFilter(c)}
            className={`px-4 py-2 font-mono text-[11px] uppercase tracking-wide2 transition-colors ${
              filter === c ? 'bg-white text-ink' : 'text-white/60 hover:text-teal'
            }`}
          >
            {c} <sup className="ml-0.5 text-[9px] opacity-70">{count(c)}</sup>
          </button>
        ))}
      </div>

      <p className="sr-only" role="status" aria-live="polite">
        Showing {list.length} {list.length === 1 ? 'project' : 'projects'} in {filter}
      </p>

      {list.length ? (
        <div key={filter} className="mt-12 columns-1 gap-8 md:columns-2 md:gap-12">
          {list.map((p) => (
            <Card key={p.slug} p={p} index={projects.indexOf(p)} onOpen={onOpen} />
          ))}
        </div>
      ) : (
        <p className="mt-20 font-display text-4xl text-white/50">Nothing filed under {filter} yet.</p>
      )}

      <div
        ref={dot}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-50 hidden transition-transform duration-150 ease-out [@media(hover:hover)_and_(pointer:fine)]:block"
        style={{ transform: 'translate(-100px,-100px) scale(0)' }}
      >
        <div className="-ml-11 -mt-11 grid h-[88px] w-[88px] place-items-center rounded-full bg-teal">
          <span ref={label} className="font-mono text-[11px] font-medium uppercase tracking-wide2 text-ink" />
        </div>
      </div>
    </section>
  )
}
