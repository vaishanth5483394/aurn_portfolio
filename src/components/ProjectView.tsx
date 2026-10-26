import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { projects, type Project } from '../config/projects'

export default function ProjectView({
  slug,
  onClose,
  onOpen,
  autoplay,
}: {
  slug: string
  onClose: () => void
  onOpen: (slug: string) => void
  autoplay: boolean
}) {
  const i = projects.findIndex((p) => p.slug === slug)
  const p = projects[i]
  const root = useRef<HTMLDivElement>(null)
  const scroller = useRef<HTMLDivElement>(null)
  const [err, setErr] = useState(false)

  // lock page scroll, restore focus on close, trap focus, Esc closes
  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    const k = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return onClose()
      if (e.key !== 'Tab' || !root.current) return
      const f = root.current.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),video[controls]')
      if (!f.length) return
      const first = f[0],
        last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) (e.preventDefault(), last.focus())
      else if (!e.shiftKey && document.activeElement === last) (e.preventDefault(), first.focus())
    }
    window.addEventListener('keydown', k)
    return () => {
      window.removeEventListener('keydown', k)
      document.body.style.overflow = ''
      prev?.focus?.()
    }
  }, [onClose])

  useEffect(() => {
    setErr(false)
    scroller.current?.scrollTo({ top: 0 })
    root.current?.querySelector<HTMLElement>('[data-close]')?.focus({ preventScroll: true })
  }, [slug])

  if (!p) return null
  const prev = projects[(i - 1 + projects.length) % projects.length]
  const next = projects[(i + 1) % projects.length]
  const related = [
    ...projects.filter((o) => o.slug !== p.slug && o.categories.some((c) => p.categories.includes(c))),
    ...projects.filter((o) => o.slug !== p.slug && !o.categories.some((c) => p.categories.includes(c))),
  ].slice(0, 3)

  return (
    <div
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-label={p.title}
      className="fixed inset-0 z-[80] flex flex-col bg-ink"
    >
      <div className="flex h-16 shrink-0 items-center justify-between border-b hairline px-5 md:px-10">
        <p className="font-mono text-[11px] uppercase tracking-wide2 text-white/60">
          <span className="text-teal">{String(i + 1).padStart(2, '0')}</span> / {String(projects.length).padStart(2, '0')}
        </p>
        <button
          data-close
          onClick={onClose}
          className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide2 hover:text-teal"
        >
          Close <X size={18} />
        </button>
      </div>

      <div ref={scroller} className="flex-1 overflow-y-auto">
        <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-8 md:px-10 md:py-12 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
          <div className="flex justify-center bg-black lg:self-start">
            {p.kind === 'video' ? (
              err ? (
                <div className="relative grid aspect-video w-full place-items-center overflow-hidden">
                  <img src={p.poster} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
                  <p role="alert" className="relative max-w-sm p-8 text-center font-mono text-[12px] uppercase leading-relaxed tracking-wide2 text-white/80">
                    This video couldn't be played. Your browser may not support the format, or the file path in
                    src/config/projects.ts is wrong.
                  </p>
                </div>
              ) : (
                <video
                  key={p.slug}
                  className={`w-auto max-w-full bg-black ${p.aspect === 'portrait' ? 'max-h-[72vh]' : 'max-h-[72vh] w-full'}`}
                  src={p.src}
                  poster={p.poster}
                  controls
                  playsInline
                  preload="metadata"
                  autoPlay={autoplay}
                  onError={() => setErr(true)}
                />
              )
            ) : (
              <img src={p.src} alt={p.title} className="max-h-[78vh] w-auto max-w-full object-contain" />
            )}
          </div>

          <div className="lg:pt-2">
            <p className="eyebrow">{p.categories.join(' · ')}</p>
            <h2 className="mt-4 font-display text-[clamp(2.6rem,6vw,5rem)] leading-[0.95]">{p.title}</h2>
            <p className="mt-6 max-w-md leading-relaxed text-white/70">{p.description}</p>
            <dl className="mt-8 divide-y hairline border-y hairline font-mono text-[11px] uppercase tracking-wide2">
              <Row k="Format" v={p.kind === 'video' ? 'Video' : 'Photograph'} />
              {p.duration && <Row k="Length" v={p.duration} />}
              {p.year && <Row k="Year" v={p.year} />}
              {p.tools?.length ? <Row k="Tools" v={p.tools.join(', ')} /> : null}
            </dl>

            <div className="mt-10 grid grid-cols-2 gap-px bg-white/15">
              <Nav dir="prev" p={prev} onOpen={onOpen} />
              <Nav dir="next" p={next} onOpen={onOpen} />
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-[1500px] border-t hairline px-5 py-12 md:px-10">
          <p className="eyebrow mb-6">Related</p>
          <ul className="grid gap-6 sm:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug}>
                <button onClick={() => onOpen(r.slug)} className="group block w-full text-left">
                  <div className="aspect-video overflow-hidden bg-surface">
                    <img
                      src={r.poster}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-3 font-display text-2xl group-hover:text-teal">{r.title}</p>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-6 py-3">
      <dt className="text-white/45">{k}</dt>
      <dd className="text-right">{v}</dd>
    </div>
  )
}

function Nav({ dir, p, onOpen }: { dir: 'prev' | 'next'; p: Project; onOpen: (s: string) => void }) {
  return (
    <button
      onClick={() => onOpen(p.slug)}
      className={`group bg-ink p-5 text-left transition-colors hover:bg-surface ${dir === 'next' ? 'text-right' : ''}`}
    >
      <span
        className={`flex items-center gap-2 font-mono text-[10px] uppercase tracking-wide2 text-teal ${
          dir === 'next' ? 'justify-end' : ''
        }`}
      >
        {dir === 'prev' && <ArrowLeft size={14} />}
        {dir === 'prev' ? 'Previous' : 'Next'}
        {dir === 'next' && <ArrowRight size={14} />}
      </span>
      <span className="mt-2 block font-display text-2xl">{p.title}</span>
    </button>
  )
}
