import { NextResponse } from 'next/server';
import { processData } from '@/lib/processData';
import { generateInsights } from '@/lib/mockInsights';

export async function POST(request) {
  try {
    const { data } = await request.json();

    if (!data || !Array.isArray(data) || data.length === 0) {
      return NextResponse.json(
        { error: 'No valid data provided' },
        { status: 400 }
      );
    }

    // Process the CSV data to extract metrics
    const metrics = processData(data);

    // Generate AI-like insights based on the metrics
    const aiInsights = generateInsights(metrics);

    return NextResponse.json({
      metrics,
      insights: aiInsights,
    });
  } catch (error) {
    console.error('Error analyzing data:', error);
    return NextResponse.json(
      { error: 'Failed to analyze data' },
      { status: 500 }
    );
  }
}
