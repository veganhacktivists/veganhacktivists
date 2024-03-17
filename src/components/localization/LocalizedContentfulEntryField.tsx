import { type FC } from 'react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useContentfulLocalizationContext } from './useContentfulLocalizationContext';

import { useRouterLocale } from 'lib/translation/useRouterLocale';
import { trpc } from 'lib/client/trpc';

export const useLocalizedContentfulEntryField = ({
  contentfulId,
  fieldId,
  contentType,
}: {
  contentfulId: string;
  fieldId: string;
  contentType: string;
}) => {
  const { defaultLocale } = useRouter();
  const currentLocale = useRouterLocale();

  const { showLocalizedContent, registerChildLoadState } =
    useContentfulLocalizationContext();

  const requestLocale = showLocalizedContent ? currentLocale : defaultLocale!;

  const localizedHTML = trpc.translation.getLocalizedHTML.useQuery(
    {
      contentfulId,
      fieldId,
      contentType,
      locale: requestLocale,
    },
    {
      keepPreviousData: true,
      staleTime: Infinity,
      enabled: true,
    },
  );

  useEffect(() => {
    registerChildLoadState(
      contentfulId + fieldId + contentType,
      localizedHTML.isFetching,
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localizedHTML.isFetching]);

  return localizedHTML.data ?? '';
};

const LocalizedContentfulEntryField: FC<{
  contentfulId: string;
  fieldId: string;
  contentType: string;
}> = ({ contentfulId, fieldId, contentType }) => {
  const localizedContentfulEntryField = useLocalizedContentfulEntryField({
    contentfulId,
    fieldId,
    contentType,
  });

  return (
    <div dangerouslySetInnerHTML={{ __html: localizedContentfulEntryField }} />
  );
};

export default LocalizedContentfulEntryField;
