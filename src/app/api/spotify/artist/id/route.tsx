import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const artistId = url.searchParams.get('artistId');

    if (!artistId) {
      return NextResponse.json({ error: 'Artist ID is required' }, { status: 400 });
    }

    const tokenUrl = 'https://accounts.spotify.com/api/token';
    const artistUrl = `https://api.spotify.com/v1/artists/${artistId}`;

    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      return NextResponse.json({ error: 'Spotify credentials are not set.' }, { status: 500 });
    }

    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    // Request access token from Spotify
    const tokenRes = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
      }),
    });

    if (!tokenRes.ok) {
      console.error('Failed to obtain access token:');
      return NextResponse.json({ error: 'Failed to get access token' }, { status: 500 });
    }

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    // Request artist data from Spotify
    const artistRes = await fetch(artistUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!artistRes.ok) {
      console.error('Failed to fetch artist data:', await artistRes.text());
      return NextResponse.json({ error: 'Failed to fetch artist data' }, { status: 500 });
    }

    const artistData = await artistRes.json();

    // Return artist data as JSON
    return NextResponse.json(artistData, { status: 200 });
  } catch (error) {
    console.error('Error in GET /api/spotify/artist/id:', error);
    return NextResponse.json({ error: 'Something went wrong during the request.' }, { status: 500 });
  }
}
