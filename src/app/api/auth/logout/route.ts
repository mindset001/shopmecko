import { NextResponse } from 'next/server';

export async function POST() {
  // Create a response that will clear the cookies
  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully'
  });

  // Clear the authentication cookies
  response.cookies.delete('shopmeco_token');
  response.cookies.delete('shopmeco_role');

  return response;
}
