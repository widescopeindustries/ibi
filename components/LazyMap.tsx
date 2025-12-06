'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

// Lazy load the map component
const MapComponent = dynamic(() => import('./MapComponent'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading map...</p>
            </div>
        </div>
    )
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

interface LazyMapProps {
    reps: Rep[]
    city: string
    state: string
}

export default function LazyMap({ reps, city, state }: LazyMapProps) {
    const [isVisible, setIsVisible] = useState(false)
    const mapRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            {
                rootMargin: '100px' // Start loading 100px before it comes into view
            }
        )

        if (mapRef.current) {
            observer.observe(mapRef.current)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <div ref={mapRef} className="w-full">
            {isVisible ? (
                <MapComponent reps={reps} city={city} state={state} />
            ) : (
                <div className="w-full h-96 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                    <div className="text-center p-8">
                        <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        <p className="text-gray-600 font-medium">Interactive map will load here</p>
                        <p className="text-gray-500 text-sm mt-2">Scroll down to view rep locations</p>
                    </div>
                </div>
            )}
        </div>
    )
}
