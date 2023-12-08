import { type Request, type Response, type NextFunction } from 'express';
import { google } from 'googleapis';
import { query } from '../config/pgSetup';
import { decrypt } from '../utils/encryption';

const exerciseController = {
  searchExercise: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { muscle, offset, type, name, difficulty } = req.query;
      const apiKey = process.env.NINJA_APIKEY || '';

      const queryParams = [];

      if (muscle) {
        queryParams.push(`muscle=${muscle}`);
      }
      if (offset !== undefined) {
        queryParams.push(`offset=${offset}`);
      }
      if (type) {
        queryParams.push(`type=${type}`);
      }
      if (name) {
        queryParams.push(`name=${name}`);
      }
      if (difficulty) {
        queryParams.push(`difficulty=${difficulty}`);
      }

      const url = `https://api.api-ninjas.com/v1/exercises?${queryParams.join(
        '&',
      )}`;
      const options = {
        method: 'GET',
        headers: {
          'X-Api-Key': apiKey,
        },
      };
      const response = await fetch(url, options);
      const data = await response.json();

      res.locals.data = data;
      return next();
    } catch (error) {
      return next({
        log: `Error in testController.apeCheck, ${error}`,
        status: 400,
        message: { err: 'Searching for exercise failed.' },
      });
    }
  },
  ytShorts: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { exercise } = req.query;
      const { userId } = res.locals.decodedToken;

      const tokenQuery = `
        SELECT encrypted_youtube_token
        FROM youtube_tokens
        WHERE user_id = $1
      `;
      const result = await query(tokenQuery, [userId]);
      const encryptedToken = result.rows[0].encrypted_youtube_token;
      const decryptedToken = decrypt(encryptedToken);

      const oauth2Client = new google.auth.OAuth2();
      oauth2Client.setCredentials({ access_token: decryptedToken });

      // fix typing on client => 'part' param was giving trouble
      const youtube = google.youtube({
        version: 'v3',
        auth: oauth2Client,
      }) as any;

      // other params => yt short not video, highest view count, grab first 5 maybe not just 1
      const response = await youtube.search.list({
        part: 'snippet',
        q: `${exercise} workout short`,
        maxResults: 5,
        type: 'video',
      });

      const videos = response.data.items;
      // extract videoIds from each object in array of videos
      // fix videoobject typing here
      const videoIds = videos.map((videoObject: any) => {
        return videoObject.id.videoId;
      });
      if (videoIds.length > 0) {
        // Send the video data
        return res.json(videoIds);
      }
      // No videos found
      return res.status(404).json({ message: 'No videos found' });
    } catch (error) {
      return next({
        log: `Error in exerciseController.ytShorts, ${error}`,
        status: 400,
        message: { err: 'Searching for exercise failed.' },
      });
    }
  },
};

export default exerciseController;
