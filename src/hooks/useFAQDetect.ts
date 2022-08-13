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

const doesMatchKeywords = (
  tokens: Set<string>,
  keywords: FAQService['keywords']
) => {
  return keywords.some((keyword) =>
    Array.isArray(keyword)
      ? keyword.every((keyword) => tokens.has(keyword))
      : tokens.has(keyword)
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
    const tokens = new Set(debouncedMessage.toLocaleLowerCase().split(' '));

    setSuggestions(
      faqServices
        .filter(({ keywords }) => doesMatchKeywords(tokens, keywords))
        .flatMap(({ suggestions }) =>
          suggestions
            .filter(({ keywords }) => doesMatchKeywords(tokens, keywords))
            .map(({ text }) => text)
        )
    );
  }, [debouncedMessage]);

  return {
    onMessageChange: onChange,
    suggestions,
  };
};
