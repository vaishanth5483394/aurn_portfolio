import { resume, site } from '../config/site'
import Reveal from './Reveal'
import Resume from './Resume'

export default function About() {
  return (
    <section id="about" className="border-t hairline bg-surface">
      <div className="mx-auto max-w-[1500px] px-5 pt-28 md:px-10 md:pt-40">
        <Reveal className="relative mx-auto w-full max-w-md">
          <div className="absolute -bottom-4 -right-4 h-full w-full border border-teal" aria-hidden="true" />
          <img
            src={site.portrait}
            alt="Portrait of Arun Adhinath"
            loading="lazy"
            className="relative aspect-[4/5] w-full object-cover object-top grayscale"
          />
        </Reveal>
      </div>

      <Resume />

      <div className="mx-auto max-w-[1500px] px-5 pb-28 md:px-10 md:pb-40">
        <div>
          <Reveal>
            <p className="eyebrow mb-5">02 — About</p>
            <h2 className="font-display text-[clamp(2.6rem,8vw,7rem)] leading-[0.92]">
              Behind the <em className="text-teal">Frames</em>
            </h2>
          </Reveal>
          <Reveal delay={100} className="mt-10 max-w-xl space-y-5 text-lg leading-relaxed text-white/75">
            <p>
              I'm a creative video editor and visual storyteller based in {site.location}. I like turning raw footage into
              something with rhythm: trimming, sequencing and pacing until a handful of clips reads as one story.
            </p>
            <p>
              Sound is half of every edit for me, so picture and audio are shaped together. I've been editing since April
              2024 and I'm now studying Animation at Jain (Deemed-to-be University).
            </p>
          </Reveal>
          <Reveal delay={150} className="mt-12">
            <p className="eyebrow mb-4">Skills</p>
            <ul className="grid max-w-xl grid-cols-1 border-t hairline sm:grid-cols-2">
              {resume.skills.map((s) => (
                <li key={s} className="flex items-center gap-3 border-b hairline py-3 text-sm sm:odd:border-r sm:odd:pr-4 sm:even:pl-4">
                  <span className="h-1.5 w-1.5 bg-teal" aria-hidden="true" />
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
