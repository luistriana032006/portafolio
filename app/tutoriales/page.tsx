import type { Metadata } from 'next'
import { Nav } from '@/components/nav'
import { Tutorials } from '@/components/tutorials'

export const metadata: Metadata = {
  title: 'Tutoriales — Luis Miguel Triana Rueda',
  description: 'Tutoriales, análisis de datos con Jupyter y apuntes de ML Engineering por Luis Miguel Triana Rueda.',
}

export default function TutorialesPage() {
  return (
    <main>
      <Nav />
      <div className="pt-14">
        <Tutorials />
      </div>
    </main>
  )
}
