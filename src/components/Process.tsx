import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'

const steps = [
  ['Discover the story', 'Before touching a timeline, I look for what the footage is really about.'],
  ['Select and organize footage', 'Clips are sorted, trimmed and labelled so the good moments are easy to find.'],
  ['Shape the edit', 'Sequence, pacing and transitions come together into a first full cut.'],
  ['Refine sound and visuals', 'Audio, titles, graphics and effects are tuned until they work as one.'],
  ['Deliver the final experience', 'The finished piece is exported in the format it needs to be seen in.'],
]

export default function Process() {
  const [active, setActive] = useState(0)
  const refs = useRef<(HTMLLIElement | null)[]>([])
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i))
        }),
      { rootMargin: '-45% 0px -45% 0px' },
    )
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section id="process" className="mx-auto max-w-[1500px] px-5 py-28 md:px-10 md:py-40">
      <div className="grid gap-14 lg:grid-cols-[5fr_7fr] lg:gap-24">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <p className="eyebrow mb-5">03 — Creative Process</p>
            <h2 className="font-display text-[clamp(3rem,7vw,6.5rem)] leading-[0.92]">
              From raw clips to <em className="text-teal">final cut.</em>
            </h2>
          </Reveal>
        </div>
        <ol>
          {steps.map(([t, d], i) => (
            <li
              key={t}
              data-i={i}
              ref={(el) => {
                refs.current[i] = el
              }}
              className={`group grid grid-cols-[4.5rem_1fr] items-baseline gap-4 border-t hairline py-10 transition-opacity duration-700 md:grid-cols-[7rem_1fr] md:py-14 ${
                active === i ? 'opacity-100' : 'opacity-35'
              }`}
            >
              <span className={`font-mono text-sm tracking-wide2 ${active === i ? 'text-teal' : ''}`}>0{i + 1}</span>
              <div>
                <h3 className="font-display text-4xl leading-none md:text-6xl">{t}</h3>
                <p className="mt-4 max-w-md text-white/65">{d}</p>
              </div>
            </li>
          ))}
          <li className="border-t hairline" aria-hidden="true" />
        </ol>
      </div>
    </section>
  )
}
