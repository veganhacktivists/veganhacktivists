import {
  ChangeEvent,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useDebounce } from './useDebounce';
import { FAQService } from 'lib/faq/service';

import faqServices from 'lib/faq/services';
import { getLevenshteinDistance } from 'lib/helpers/strings';

const MAX_LEVENSHTEIN_DISTANCE_MATCHING_TOKENS = 1;

const doesContainKeyword = (tokens: string[], keyword: string) => {
  const match = tokens.some(
    (token) =>
      getLevenshteinDistance(token, keyword) <=
      MAX_LEVENSHTEIN_DISTANCE_MATCHING_TOKENS
  );

  return match;
};

const doesContainKeywords = (
  tokens: string[],
  keywords: FAQService['keywords']
) => {
  return keywords.some((keyword) =>
    Array.isArray(keyword)
      ? keyword.every((k) => doesContainKeyword(tokens, k))
      : doesContainKeyword(tokens, keyword)
  );
};

export const useFAQDetect = () => {
  const [message, setMessage] = useState('');
  const debouncedMessage = useDebounce<string>(message, 350);

  const [suggestions, setSuggestions] = useState<ReactNode[]>([]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setMessage(e.target.value);
    },
    [setMessage]
  );

  useEffect(() => {
    const tokens = debouncedMessage.toLocaleLowerCase().split(' ');

    setSuggestions(
      faqServices
        .filter(({ keywords }) => doesContainKeywords(tokens, keywords))
        .flatMap(({ suggestions }) =>
          suggestions
            .filter(({ keywords }) => doesContainKeywords(tokens, keywords))
            .map(({ text }) => text)
        )
    );
  }, [debouncedMessage]);

  return {
    onMessageChange: onChange,
    suggestions,
  };
};
