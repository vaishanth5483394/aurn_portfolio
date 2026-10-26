import { useEffect, useRef, useState } from 'react'

export function useReducedMotion() {
  const q = '(prefers-reduced-motion: reduce)'
  const [reduced, setReduced] = useState(() => typeof window !== 'undefined' && window.matchMedia(q).matches)
  useEffect(() => {
    const m = window.matchMedia(q)
    const f = () => setReduced(m.matches)
    m.addEventListener('change', f)
    return () => m.removeEventListener('change', f)
  }, [])
  return reduced
}

/** True once the element has entered the viewport (one-shot). */
export function useInView<T extends Element>(margin = '0px 0px -10% 0px') {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    if (!('IntersectionObserver' in window)) return setSeen(true)
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true)
          io.disconnect()
        }
      },
      { rootMargin: margin, threshold: 0.05 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [seen, margin])
  return [ref, seen] as const
}

/** Hash route: #/work/<slug> opens a project. */
const parse = () => {
  const m = window.location.hash.match(/^#\/work\/([\w-]+)/)
  return m ? m[1] : null
}
export function useProjectRoute() {
  const [slug, setSlug] = useState<string | null>(parse)
  useEffect(() => {
    const f = () => setSlug(parse())
    window.addEventListener('hashchange', f)
    return () => window.removeEventListener('hashchange', f)
  }, [])
  const open = (s: string) => {
    window.location.hash = `/work/${s}`
  }
  const close = () => {
    window.history.pushState(null, '', '#work')
    setSlug(null)
  }
  return { slug, open, close }
}
