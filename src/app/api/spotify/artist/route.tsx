import type { NextApiRequest, NextApiResponse } from 'next'

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
      const { artistId } = req.query;

      if (!artistId || typeof artistId !== 'string') {
        return res.status(400).json({ error: 'Artist ID is required' });
      }

      const url = 'https://accounts.spotify.com/api/token';

      const clientId = process.env.SPOTIFY_CLIENT_ID!;
      const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;

      const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

      const tokenRes = await fetch(url, {
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
          return res.status(500).json({ error: 'Failed to get access token' });
        }

        const tokenData = await tokenRes.json();
        const accessToken = tokenData.access_token;

        const artistUrl = `https://api.spotify.com/v1/artists/${artistId}`;
        const artistResponse = await fetch(artistUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!artistResponse.ok) {
          return res.status(500).json({ error: 'Failed to fetch artist data' });
        }

        const artistData = await artistResponse.json();
        return res.status(200).json(artistData);
  }

  catch {
      return res.status(500).json({ error: 'Something went wrong during request.' });
  }

}
