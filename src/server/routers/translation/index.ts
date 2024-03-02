import { getLocalizedHTML } from 'lib/services/translation';
import { getLocalizedHTMLSchema } from 'lib/services/translation/schemas';
import { baseProcedure } from 'server/procedures';
import { t } from 'server/trpc';

const translationRouter = t.router({
  getLocalizedHTML: baseProcedure
    .input(getLocalizedHTMLSchema)
    .query(async ({ input }) => {
      return await getLocalizedHTML(input);
    }),
});

export default translationRouter;
