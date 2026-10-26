import { useRef } from 'react'
import { projects } from './config/projects'
import { useProjectRoute } from './hooks/hooks'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Work from './components/Work'
import ProjectView from './components/ProjectView'
import About from './components/About'
import Process from './components/Process'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const { slug, open, close } = useProjectRoute()
  // Only autoplay (with sound) when the visitor explicitly opened a project.
  // Direct links never autoplay audio.
  const userOpened = useRef(false)
  const handleOpen = (s: string) => {
    userOpened.current = true
    open(s)
  }
  const valid = slug && projects.some((p) => p.slug === slug) ? slug : null

  return (
    <div className="grain">
      <a href="#work" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-teal focus:px-4 focus:py-2 focus:text-ink">
        Skip to work
      </a>
      <Nav />
      <main>
        <Hero />
        <Work onOpen={handleOpen} />
        <About />
        <Process />
        <Contact />
      </main>
      <Footer />
      {valid && <ProjectView slug={valid} onClose={close} onOpen={handleOpen} autoplay={userOpened.current} />}
    </div>
  )
}
