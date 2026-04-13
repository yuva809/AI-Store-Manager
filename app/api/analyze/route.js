import { NextResponse } from 'next/server';
import { processData } from '@/lib/processData';
import { generateInsights } from '@/lib/mockInsights';

// Increase body size limit for large CSV files (50MB)
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
  },
};

// For App Router, we need to use this export
export const maxDuration = 60; // 60 seconds timeout

export async function POST(request) {
  try {
    const body = await request.json();
    const { data } = body;

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
      { error: 'Failed to analyze data: ' + error.message },
      { status: 500 }
    );
  }
}
