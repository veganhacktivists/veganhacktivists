// import axios from 'axios';

// import type { AxiosInstance } from 'axios';

// class RedditClient {
//   private client: AxiosInstance;
//   private static async auth() {
//     const res = await axios.post<{
//       access_token: string;
//       token_type: 'bearer';
//       expires_in: number;
//       scope: string;
//     }>('https://www.reddit.com/api/v1/access_token', {
//       grant_type: 'password',
//       username: process.env.REDDIT_USERNAME,
//       password: process.env.REDDIT_PASSWORD,
//     });
//     return res.data;
//   }
//   private constructor(client: AxiosInstance) {
//     this.client = client;
//   }

//   static async new() {
//     const authRes = await this.auth();

//     const client = axios.create({
//       baseURL: 'https://www.oauth.reddit.com/api',
//       headers: {
//         Authorization: `${authRes.token_type} ${authRes.access_token}`,
//       },
//     });

//     return new RedditClient(client);
//   }
// }

// const redditClient = RedditClient.new();

// export default redditClient;

import Snoowrap from 'snoowrap';

import { getListFromEnv } from 'lib/helpers/env';

import type { PlaygroundRequest } from '@prisma/client';

const r = new Snoowrap({
  userAgent: process.env.REDDIT_USER_AGENT!,
  accessToken: process.env.REDDIT_CLIENT_SECRET,
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  password: process.env.REDDIT_PASSWORD,
  username: process.env.REDDIT_USERNAME,
});

const subredditsToPost = getListFromEnv('PLAYGROUND_SUBREDDITS');

const postPlaygroundRequestOnReddit = async (request: PlaygroundRequest) => {
  const compensation = request.isFree ? 'no' : 'This is a possible paid role!';

  const message = `${
    request.organization || request.name
  } needs help! If you're interested in taking on this job, please apply to help with your resume, website, or linkedin, your email, and a little bit about you - thanks for your activism!

  ## **{title}**

  **Website:** [${request.website}](${request.website})

  **Compensation:** ${compensation}

  **Description:** ${request.description}

  **Interested in this request?** Please click the link below to apply to help on Playground!

  **Click here:** [link](https://veganhacktivists.org/playground/request/${
    request.id
  })

  Thanks for your activism for the animals!

  **VH: Playground** by [Vegan Hacktivists](https://veganhacktivists.org/)
*Find other requests to help animals, [click here!](https://veganhacktivists.org/playground)*`;

  for await (const subreddit of subredditsToPost) {
    const sub = r.getSubreddit(subreddit);

    const submission = await r.submitSelfpost({
      subredditName: subreddit,
      title: request.title,
      text: message,
    });
  }
};
