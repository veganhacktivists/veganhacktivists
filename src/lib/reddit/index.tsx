import Snoowrap from 'snoowrap';

import { getListFromEnv } from 'lib/helpers/env';

import type { Submission } from 'snoowrap';
import type { PlaygroundRequest } from '@prisma/client';

declare module 'snoowrap' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  class RedditContent<T> {
    then: undefined;
    catch: undefined;
    finally: undefined;
  }
}

const r = new Snoowrap({
  userAgent: process.env.REDDIT_USER_AGENT!,
  accessToken: process.env.REDDIT_CLIENT_SECRET,
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  password: process.env.REDDIT_PASSWORD,
  username: process.env.REDDIT_USERNAME,
});

const subredditsToPost = getListFromEnv('PLAYGROUND_SUBREDDITS');

export const postPlaygroundRequestOnReddit = async (
  request: PlaygroundRequest
) => {
  const compensation = request.isFree ? 'no' : 'This is a possible paid role!';

  const message = `${
    request.organization || request.name
  } needs help! If you're interested in taking on this job, please apply to help with your resume, website, or linkedin, your email, and a little bit about you - thanks for your activism!

  ## **${request.title}**

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

  const submissions: Submission[] = [];

  try {
    for await (const subreddit of subredditsToPost) {
      const submission = await r.submitSelfpost({
        subredditName: subreddit,
        title: request.title,
        text: message,
      });

      submissions.push(submission);
    }
  } catch (err) {
    for await (const submission of submissions) {
      await submission.delete();
    }
    throw err;
  }
  return submissions;
};
