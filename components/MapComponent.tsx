'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import Link from 'next/link'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

interface Rep {
    id: string
    first_name: string
    last_name: string
    city: string
    state: string
    lat?: number
    lng?: number
}

interface MapComponentProps {
    reps: Rep[]
    city: string
    state: string
}

// Simple geocoding fallback (you can enhance this with actual geocoding API)
const getCityCoordinates = (city: string, state: string): [number, number] => {
    // Default coordinates for major cities (expand this list)
    const cityCoords: { [key: string]: [number, number] } = {
        'dallas-tx': [32.7767, -96.7970],
        'houston-tx': [29.7604, -95.3698],
        'austin-tx': [30.2672, -97.7431],
        'new-york-ny': [40.7128, -74.0060],
        'los-angeles-ca': [34.0522, -118.2437],
        'chicago-il': [41.8781, -87.6298],
        'phoenix-az': [33.4484, -112.0740],
        'philadelphia-pa': [39.9526, -75.1652],
        'san-antonio-tx': [29.4241, -98.4936],
        'san-diego-ca': [32.7157, -117.1611],
    }

    const key = `${city.toLowerCase()}-${state.toLowerCase()}`
    return cityCoords[key] || [39.8283, -98.5795] // Default to center of US
}

export default function MapComponent({ reps, city, state }: MapComponentProps) {
    const center = getCityCoordinates(city, state)

    // Filter reps with coordinates, or use city default
    const repsWithCoords = reps.map(rep => ({
        ...rep,
        lat: rep.lat || center[0] + (Math.random() - 0.5) * 0.1, // Spread around city if no coords
        lng: rep.lng || center[1] + (Math.random() - 0.5) * 0.1,
    }))

    return (
        <div className="w-full h-96 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
            <MapContainer
                center={center}
                zoom={11}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {repsWithCoords.map((rep) => (
                    <Marker key={rep.id} position={[rep.lat!, rep.lng!]}>
                        <Popup>
                            <div className="text-center p-2">
                                <p className="font-semibold text-gray-900">
                                    {rep.first_name} {rep.last_name}
                                </p>
                                <p className="text-sm text-gray-600 mb-2">
                                    {rep.city}, {rep.state}
                                </p>
                                <Link
                                    href={`/${city}-${state}/${rep.first_name.toLowerCase()}-${rep.last_name.toLowerCase()}`}
                                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                                >
                                    View Profile →
                                </Link>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                    Showing {reps.length} {reps.length === 1 ? 'representative' : 'representatives'} in {city}, {state}
                </p>
            </div>
        </div>
    )
}
