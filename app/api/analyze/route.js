import { NextResponse } from 'next/server';
import { processData } from '@/lib/processData';
import { generateInsights } from '@/lib/mockInsights';

export async function POST(request) {
  try {
    const body = await request.json();
    console.log('[v0] API received body:', JSON.stringify(body).slice(0, 500));
    
    const { data } = body;

    if (!data || !Array.isArray(data) || data.length === 0) {
      console.log('[v0] API error: No valid data provided', { data });
      return NextResponse.json(
        { error: 'No valid data provided' },
        { status: 400 }
      );
    }

    console.log('[v0] Processing data with', data.length, 'rows');
    console.log('[v0] First row sample:', JSON.stringify(data[0]));

    // Process the CSV data to extract metrics
    const metrics = processData(data);
    console.log('[v0] Metrics calculated:', JSON.stringify(metrics));

    // Generate AI-like insights based on the metrics
    const aiInsights = generateInsights(metrics);
    console.log('[v0] Insights generated:', JSON.stringify(aiInsights).slice(0, 500));

    return NextResponse.json({
      metrics,
      insights: aiInsights,
    });
  } catch (error) {
    console.error('[v0] Error analyzing data:', error);
    return NextResponse.json(
      { error: 'Failed to analyze data: ' + error.message },
      { status: 500 }
    );
  }
}
