import type { DefaultSession } from 'next-auth';

interface UserCustomFields {
  id: string;
}

declare module 'next-auth' {
  interface Session {
    user?: DefaultSession['user'] & UserCustomFields;
  }
}
