'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

// Your priority snow conditions with custom tropical icons
const getPriorityCondition = (conditions) => {
  const priorityConditions = conditions.filter(condition => {
    const desc = condition.conditionDescription.toLowerCase()
    
    // Ice/Icy conditions
    if (desc.includes('ice') || desc.includes('icy')) {
      return { type: 'ice', icon: '🧊🛣️', severity: 'high', desc: condition.conditionDescription }
    }
    
    // Snow-covered roads
    if (desc.includes('snow') && (desc.includes('covered') || desc.includes('packed'))) {
      return { type: 'snow-covered', icon: '❄️🛣️', severity: 'high', desc: condition.conditionDescription }
    }
    
    // Active snowfall
    if (desc.includes('snow') && (desc.includes('falling') || desc.includes('snowing') || desc.includes('active'))) {
      return { type: 'snowfall', icon: '❄️❄️❄️', severity: 'high', desc: condition.conditionDescription }
    }
    
    return null
  }).filter(Boolean)

  return priorityConditions[0] || null
}

const getRouteSegments = (data) => {
  // Filter for your specific route: Raton Pass, I-25, US 24
  const routeSegments = {
    ratonPass: [],
    i25: [],
    us24: []
  }

  data.features.forEach(feature => {
    const routeName = feature.properties.routeName?.toLowerCase() || ''
    const name = feature.properties.name?.toLowerCase() || ''
    
    // Raton Pass area (US 25/I-25 near New Mexico border)
    if ((routeName.includes('us 25') || routeName.includes('i-25')) && 
        (name.includes('raton') || name.includes('pass'))) {
      routeSegments.ratonPass.push(feature)
    }
    
    // I-25 in Colorado
    else if (routeName.includes('i-25') || routeName.includes('i 25')) {
      routeSegments.i25.push(feature)
    }
    
    // US 24 to Woodland Park
    else if (routeName.includes('us 24') || routeName.includes('us-24')) {
      routeSegments.us24.push(feature)
    }
  })

  return routeSegments
}

function RouteCard({ title, icon, segments, stationNumber }) {
  const [expanded, setExpanded] = useState(false)
  
  // Get the worst condition across all segments
  let worstCondition = null
  let hasSnowConditions = false
  
  segments.forEach(segment => {
    const priority = getPriorityCondition(segment.properties.currentConditions || [])
    if (priority && (!worstCondition || priority.severity === 'high')) {
      worstCondition = priority
      hasSnowConditions = true
    }
  })

  return (
    <div className={`tiki-card mb-6 ${hasSnowConditions ? 'warning-snow' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-4xl">{icon}</div>
          <div>
            <h3 className="text-xl font-bold text-orange-800">
              Tiki Station {stationNumber}: {title}
            </h3>
            {worstCondition && (
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl">{worstCondition.icon}</span>
                <span className="font-bold text-red-700">SNOW ALERT!</span>
              </div>
            )}
          </div>
        </div>
        
        <button
          onClick={() => setExpanded(!expanded)}
          className="tiki-button p-2"
        >
         {expanded ? <ChevronUp /> : <ChevronDown />}
        </button>
      </div>

      {!expanded && (
        <div className="text-center">
          {hasSnowConditions ? (
            <p className="text-red-700 font-bold text-lg">
              🚨 {worstCondition.desc} 🚨
            </p>
          ) : (
            <p className="text-green-700 font-bold text-lg">
              🌺 Clear sailing to paradise! 🌺
            </p>
          )}
        </div>
      )}

      {expanded && (
        <div className="space-y-4">
          {segments.length === 0 ? (
            <p className="text-center text-orange-700">
              🍹 No data available for this tiki station
            </p>
          ) : (
            segments.map((segment, index) => (
              <SegmentDetail key={index} segment={segment} />
            ))
          )}
        </div>
      )}
    </div>
  )
}

function SegmentDetail({ segment }) {
  const conditions = segment.properties.currentConditions || []
  const priorityCondition = getPriorityCondition(conditions)
  
  return (
    <div className="bg-white/50 rounded-xl p-4 border-2 border-yellow-300">
      <h4 className="font-bold text-orange-800 mb-2">
        🛣️ {segment.properties.routeName}: {segment.properties.name}
      </h4>
      
      {priorityCondition && (
        <div className="warning-snow mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{priorityCondition.icon}</span>
            <span className="font-bold">PRIORITY ALERT: {priorityCondition.desc}</span>
          </div>
        </div>
      )}
      
      <div className="space-y-2">
        {conditions.map((condition, index) => (
          <div key={index} className="text-sm">
            <span className="font-semibold text-blue-700">
              🥥 {condition.conditionDescription}
            </span>
            {condition.additionalData && (
              <p className="text-blue-600 ml-4">
                {condition.additionalData}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function RoadConditions({ data }) {
  const routeSegments = getRouteSegments(data)
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          🍹 Current Mountain Mai Tai Report 🍹
        </h2>
        <p className="text-xl md:text-2xl text-yellow-200">
          Your tropical trail to paradise conditions
        </p>
      </div>

      <RouteCard 
        title="Raton Pass"
        icon="🏝️"
        segments={routeSegments.ratonPass}
        stationNumber={1}
      />
      
      <RouteCard 
        title="I-25 Colorado Springs"
        icon="🌺"
        segments={routeSegments.i25}
        stationNumber={2}
      />
      
      <RouteCard 
        title="US 24 to Woodland Park"
        icon="🥥"
        segments={routeSegments.us24}
        stationNumber={3}
      />
      
      <div className="text-center mt-8">
        <p className="text-yellow-200 text-sm">
          🦩 Safe travels from your tropical weather bartender! 🦩
        </p>
      </div>
    </div>
  )
}