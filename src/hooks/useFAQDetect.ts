import {
  ChangeEvent,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useDebounce } from './useDebounce';

import faqServices from 'lib/faq/services';
import { doesContainKeywords } from 'lib/helpers/strings';

export const useFAQDetect = () => {
  const [message, setMessage] = useState('');
  const debouncedMessage = useDebounce(message, 350);

  const [suggestions, setSuggestions] = useState<ReactNode[]>([]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setMessage(e.target.value);
    },
    [setMessage]
  );

  useEffect(() => {
    const tokens = debouncedMessage.toLocaleLowerCase().split(/[^\d\w]/gi);

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
