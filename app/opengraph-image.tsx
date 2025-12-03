import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'IBI Sales Rep Directory - Find Direct Sales Representatives Near You'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
          background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <div style={{ fontSize: 80, fontWeight: 'bold', marginBottom: 20 }}>
          IBI Directory
        </div>
        <div style={{ fontSize: 36, opacity: 0.9 }}>
          Find Direct Sales Representatives Near You
        </div>
      </div>
    ),
    { ...size }
  )
}
