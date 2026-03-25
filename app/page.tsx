import { Nav } from '@/components/nav'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Skills } from '@/components/skills'
import { Projects } from '@/components/projects'
import { Research } from '@/components/research'
import { Timeline } from '@/components/timeline'
import { Contact } from '@/components/contact'

export default function Page() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Research />
      <Timeline />
      <Contact />
    </main>
  )
}
