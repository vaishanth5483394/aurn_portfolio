import { Download, ExternalLink } from 'lucide-react'
import { resume, site } from '../config/site'
import Reveal from './Reveal'

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal className="border-t hairline pt-6">
      <h3 className="eyebrow mb-6">{title}</h3>
      {children}
    </Reveal>
  )
}

export default function Resume() {
  return (
    <section id="resume" className="border-t hairline bg-surface">
      <div className="mx-auto max-w-[1500px] px-5 py-28 md:px-10 md:py-40">
        <Reveal className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="eyebrow mb-5">Resume</p>
            <h2 className="font-display text-[clamp(2.6rem,8vw,7rem)] leading-[0.92]">
              The <em className="text-teal">short</em> version.
            </h2>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href={site.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
              View Resume <ExternalLink size={15} />
            </a>
            <a href={site.resumeUrl} download="Arun-Adhinath-Resume.pdf" className="btn btn-ghost">
              Download Resume <Download size={15} />
            </a>
          </div>
        </Reveal>

        <div className="mt-20 grid gap-x-20 gap-y-14 lg:grid-cols-2">
          <Block title="Experience">
            {resume.experience.map((e) => (
              <div key={e.title}>
                <p className="font-mono text-[11px] uppercase tracking-wide2 text-white/50">{e.period}</p>
                <h4 className="mt-2 font-display text-3xl">{e.title}</h4>
                <p className="text-white/60">{e.org}</p>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed text-white/75">
                  {e.points.map((pt) => (
                    <li key={pt} className="flex gap-3">
                      <span className="mt-2 h-px w-4 shrink-0 bg-teal" aria-hidden="true" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </Block>

          <div className="space-y-14">
            <Block title="Education &amp; Training">
              {resume.education.map((e) => (
                <div key={e.title}>
                  <p className="font-mono text-[11px] uppercase tracking-wide2 text-white/50">{e.period}</p>
                  <h4 className="mt-2 font-display text-3xl">{e.title}</h4>
                  <p className="text-white/60">{e.org}</p>
                </div>
              ))}
            </Block>

            <Block title="Skills">
              <ul className="flex flex-wrap gap-2">
                {resume.skills.map((s) => (
                  <li key={s} className="border border-white/20 px-3 py-1.5 text-sm">
                    {s}
                  </li>
                ))}
              </ul>
            </Block>

            <Block title="Languages">
              <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
                {resume.languages.map((l) => (
                  <li key={l.name}>
                    <div className="flex justify-between text-sm">
                      <span>{l.name}</span>
                      <span className="text-white/50">{l.level}</span>
                    </div>
                    <div className="mt-2 h-px bg-white/15">
                      <div className="h-px bg-teal" style={{ width: `${l.pct}%` }} />
                    </div>
                  </li>
                ))}
              </ul>
            </Block>
          </div>
        </div>
      </div>
    </section>
  )
}
