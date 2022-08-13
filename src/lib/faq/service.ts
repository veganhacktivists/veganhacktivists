type KeywordGroup = string[];
type KeywordGroups = (KeywordGroup | string)[];

interface Suggestion {
  keywords: KeywordGroups;
  text: React.ReactNode;
}

export interface FAQService {
  keywords: KeywordGroups;
  suggestions: Suggestion[];
}
