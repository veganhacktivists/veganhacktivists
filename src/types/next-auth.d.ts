import type { DefaultSession } from 'next-auth';

interface UserCustomFields {
  id: string;
}

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user?: DefaultSession['user'] & UserCustomFields;
  }
}
