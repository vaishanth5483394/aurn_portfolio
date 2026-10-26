import { useEffect, useRef, useState } from 'react'
import { ArrowDownRight, Pause, Play } from 'lucide-react'
import { hero } from '../config/projects'
import { site } from '../config/site'
import { useReducedMotion } from '../hooks/hooks'

const pad = (n: number) => String(n).padStart(2, '0')

export default function Hero() {
  const reduced = useReducedMotion()
  const vref = useRef<HTMLVideoElement>(null)
  const wrap = useRef<HTMLElement>(null)
  const [failed, setFailed] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [t, setT] = useState(0)
  const showVideo = !reduced && !failed

  // pause when scrolled out of view (saves battery / CPU)
  useEffect(() => {
    const v = vref.current
    if (!v || !wrap.current) return
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().catch(() => {})
      else v.pause()
    })
    io.observe(wrap.current)
    return () => io.disconnect()
  }, [showVideo])

  const toggle = () => {
    const v = vref.current
    if (!v) return
    if (v.paused) v.play().catch(() => {})
    else v.pause()
  }

  return (
    <section id="top" ref={wrap} className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
      <img src={hero.poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
      {showVideo && (
        <video
          ref={vref}
          className="absolute inset-0 h-full w-full object-cover"
          src={hero.src}
          poster={hero.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => setFailed(true)}
          onTimeUpdate={(e) => setT(e.currentTarget.currentTime)}
        />
      )}
      <div className="absolute inset-0 bg-ink/55" />
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink via-ink/70 to-transparent" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-[2] h-24"
        style={{ background: 'linear-gradient(to bottom, #080808 0%, #080808 75%, transparent 100%)' }}
      />
      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-5 pb-10 pt-32 md:px-10 md:pb-14">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.34em] md:text-base">{site.name}</p>
        <p className="eyebrow mb-6">Video Editor &amp; Visual Storyteller · {site.location}</p>
        <h1 className="font-display text-[clamp(3.6rem,13vw,12rem)] leading-[0.88] tracking-tight">
          Every Frame
          <br />
          Tells a <em className="text-teal">Story.</em>
        </h1>

        <div className="mt-10 grid items-end gap-10 md:grid-cols-[1fr_auto]">
          <div>
            <p className="max-w-md text-base leading-relaxed text-white/75 md:text-lg">
              I'm Arun, a video editor who turns raw footage into short, rhythmic stories, with sound and picture shaped
              together.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#work" className="btn btn-solid">
                Explore Selected Work <ArrowDownRight size={16} />
              </a>
              <a href="#contact" className="btn btn-ghost">
                Let's Collaborate
              </a>
            </div>
          </div>

          <div className="hidden items-center gap-6 font-mono text-[11px] uppercase tracking-wide2 text-white/60 md:flex">
            {showVideo && (
              <>
                <span aria-hidden="true" className="tabular-nums">
                  TC 00:{pad(Math.floor(t))}:{pad(Math.floor((t % 1) * 24))}
                </span>
                <button
                  onClick={toggle}
                  aria-label={playing ? 'Pause background video' : 'Play background video'}
                  className="flex items-center gap-2 border border-white/25 px-3 py-2 hover:border-teal hover:text-teal"
                >
                  {playing ? <Pause size={12} /> : <Play size={12} />} {playing ? 'Pause' : 'Play'}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex" aria-hidden="true">
        <span className="font-mono text-[10px] uppercase tracking-wide2 text-white/50">Scroll</span>
        <span className="scrollcue block h-10 w-px bg-teal" />
      </div>
    </section>
  )
}
