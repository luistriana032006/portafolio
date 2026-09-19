import { ImageResponse } from 'next/og'

export const alt = 'Luis Miguel Triana Rueda — Software Engineer & ML Student'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#080808',
          color: '#f5f5f5',
          padding: 72,
        }}
      >
        <div style={{ display: 'flex', fontSize: 28, color: '#E8613A', letterSpacing: 4 }}>
          LUISTRIANA.DEV
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', fontSize: 92, fontWeight: 700, lineHeight: 1.05 }}>
            Luis Miguel
          </div>
          <div style={{ display: 'flex', fontSize: 92, fontWeight: 700, lineHeight: 1.05, color: '#E8613A' }}>
            Triana Rueda
          </div>
          <div style={{ display: 'flex', fontSize: 38, marginTop: 28, color: '#a3a3a3' }}>
            Software Engineer & ML Student
          </div>
        </div>
        <div style={{ display: 'flex', fontSize: 26, color: '#a3a3a3' }}>
          IA aplicada a negocios reales de LatAm · GCI World · MBZUAI 2027
        </div>
      </div>
    ),
    size,
  )
}
