import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { site } from '../config/site'

const links = [
  ['Work', 'work'],
  ['About', 'about'],
  ['Process', 'process'],
  ['Resume', 'resume'],
  ['Contact', 'contact'],
] as const

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [solid, setSolid] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const f = () => setSolid(window.scrollY > 40)
    f()
    window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    links.forEach(([, id]) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', k)
    return () => {
      window.removeEventListener('keydown', k)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-colors duration-500 ${
          solid || open ? 'bg-ink/85 backdrop-blur-md border-b hairline' : 'border-b border-transparent'
        }`}
      >
        <nav aria-label="Primary" className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-5 md:px-10">
          <a href="#top" onClick={() => setOpen(false)} className="font-mono text-[12px] uppercase tracking-wide2">
            Arun<span className="text-teal"> / </span>Adhinath
          </a>
          <ul className="hidden items-center gap-9 md:flex">
            {links.map(([label, id]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? 'true' : undefined}
                  className={`font-mono text-[11px] uppercase tracking-wide2 transition-colors hover:text-teal ${
                    active === id ? 'text-teal' : 'text-white/70'
                  }`}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <button
            className="-mr-2 p-2 md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`fixed inset-0 z-[55] flex-col justify-end bg-ink px-5 pb-12 pt-24 md:hidden ${open ? 'flex' : 'hidden'}`}
      >
        <ul className="space-y-2">
          {links.map(([label, id], i) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 border-b hairline py-3 font-display text-5xl"
              >
                <span className="font-mono text-[11px] text-teal">0{i + 1}</span>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-8 font-mono text-[11px] uppercase tracking-wide2 text-white/50">{site.location}</p>
      </div>
    </>
  )
}
