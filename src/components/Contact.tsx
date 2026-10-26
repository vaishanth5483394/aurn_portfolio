import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { site } from '../config/site'
import Reveal from './Reveal'

export default function Contact() {
  return (
    <section id="contact" className="border-t hairline">
      <div className="mx-auto max-w-[1500px] px-5 py-28 md:px-10 md:py-40">
        <div className="max-w-2xl">
          <Reveal>
            <p className="eyebrow mb-5">04 — Contact</p>
            <h2 className="font-display text-[clamp(2.6rem,8vw,7.5rem)] leading-[0.92]">
              Have a Story <em className="text-teal">to Tell?</em>
            </h2>
            <p className="mt-8 max-w-sm text-lg text-white/70">Let's turn your next idea into something memorable.</p>
          </Reveal>
          <Reveal delay={120}>
            <ul className="mt-14 border-t hairline">
              <Item icon={<Mail size={16} />} label="Email" href={`mailto:${site.email}`} text={site.email} />
              <Item icon={<Phone size={16} />} label="Phone" href={`tel:${site.phoneTel}`} text={site.phoneDisplay} />
              <Item icon={<MessageCircle size={16} />} label="WhatsApp" href={`https://wa.me/${site.whatsapp}`} text="Message on WhatsApp" external />
              <Item icon={<MapPin size={16} />} label="Location" text={site.location} />
              {site.socials.map((s) => (
                <Item key={s.url} icon={<ArrowUpRight size={16} />} label={s.label} href={s.url} text={s.url.replace(/^https?:\/\//, '')} external />
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Item({ icon, label, text, href, external }: { icon: React.ReactNode; label: string; text: string; href?: string; external?: boolean }) {
  const inner = (
    <>
      <span className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-wide2 text-white/50">
        <span className="text-teal">{icon}</span>
        {label}
      </span>
      <span className="text-right text-base md:text-lg">{text}</span>
    </>
  )
  const cls = 'flex items-center justify-between gap-6 border-b hairline py-5'
  return (
    <li>
      {href ? (
        <a href={href} className={`${cls} transition-colors hover:text-teal`} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {inner}
        </a>
      ) : (
        <div className={cls}>{inner}</div>
      )}
    </li>
  )
}
