'use client'

import { useState, useEffect } from 'react'
import { RefreshCw } from 'lucide-react'
import TropicalHeader from '@/components/TropicalHeader'
import RoadConditions from '@/components/RoadConditions'

export default function Home() {
  const [roadData, setRoadData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(null)

  const fetchRoadConditions = async () => {
    setLoading(true)
    try {
      console.log('🌴 Fetching tropical snow data from our tiki server...')
      
      const response = await fetch('/api/road-conditions', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      })
      
      console.log('🦩 Response status:', response.status)
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`API error: ${errorData.error || response.status}`)
      }
      
      const data = await response.json()
      console.log('🥥 Data received:', data.features?.length, 'road segments')
      setRoadData(data)
      setLastUpdated(new Date())
    } catch (error) {
      console.error('🚨 Tiki bar error:', error)
      console.error('Error details:', error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRoadConditions()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <TropicalHeader />
      
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 gradient-text">
          🦩 Your Tropical Guide to Mountain Snow Conditions 🦩
        </h2>
        <p className="text-xl md:text-2xl text-yellow-200 floating-element mb-4">
          From Raton, NM to Woodland Park, CO - Served with a Tropical Twist! 🍹
        </p>
        <div className="text-lg md:text-xl text-yellow-300">
          🌴 Because checking snow conditions should feel like vacation! 🌴
        </div>
      </div>

      <div className="flex justify-center mb-16">
        <button 
          onClick={fetchRoadConditions}
          disabled={loading}
          className="tiki-button flex items-center gap-3 text-xl md:text-2xl relative overflow-hidden px-8 py-4"
        >
          <RefreshCw className={`w-7 h-7 ${loading ? 'animate-spin' : ''}`} />
          {loading ? '🥥 Mixing Your Tropical Report...' : '🍹 Mix Another Round'}
          
          {/* Button sparkles */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1 left-1/4 text-yellow-300 animate-pulse">✨</div>
            <div className="absolute bottom-1 right-1/4 text-yellow-300 animate-pulse" style={{animationDelay: '0.5s'}}>✨</div>
          </div>
        </button>
      </div>

      {lastUpdated && (
        <div className="text-center mb-16">
          <div className="tiki-card inline-block">
            <p className="text-lg md:text-xl text-orange-800 font-semibold flex items-center gap-3">
              <span className="text-3xl">🥥</span>
              Fresh from the Bartender: {lastUpdated.toLocaleTimeString()}
              <span className="text-3xl">🍹</span>
            </p>
          </div>
        </div>
      )}

      {roadData ? (
        <RoadConditions data={roadData} />
      ) : (
        <div className="text-center">
          <div className="tiki-card">
            <p className="text-2xl">🌴 Loading your tropical snow report... 🌴</p>
          </div>
        </div>
      )}
    </div>
  )
}