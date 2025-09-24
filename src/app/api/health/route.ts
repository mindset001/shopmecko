import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    status: 'ok',
    application: 'ShopMeco',
    description: 'Vehicle service marketplace connecting owners, repairers, and spare part sellers',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    uptime: process.uptime(),
  });
}
