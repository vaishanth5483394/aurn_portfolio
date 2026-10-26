import { site } from '../config/site'

export default function Footer() {
  return (
    <footer className="border-t hairline">
      <div className="mx-auto flex max-w-[1500px] flex-col items-start justify-between gap-4 px-5 py-10 font-mono text-[11px] uppercase tracking-wide2 text-white/50 md:flex-row md:items-center md:px-10">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <p>{site.tagline}</p>
        <a href="#top" className="hover:text-teal">Back to top ↑</a>
      </div>
    </footer>
  )
}
