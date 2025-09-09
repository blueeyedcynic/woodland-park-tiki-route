import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const apiKey = process.env.NEXT_PUBLIC_COTRIP_API_KEY || '7CX91SD-2F4MMMY-N9486EM-NSBQ67Y'
    const url = `https://data.cotrip.org/api/v1/roadConditions?apiKey=${apiKey}`
    
    console.log('🌴 Server fetching road conditions...')
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    })
    
    if (!response.ok) {
      throw new Error(`COTRIP API error: ${response.status}`)
    }
    
    const data = await response.json()
    console.log('🥥 Server received', data.features?.length, 'road segments')
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('🚨 Server tiki bar error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch road conditions', details: error.message },
      { status: 500 }
    )
  }
}