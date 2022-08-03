import type { UserRole } from '@prisma/client';
import type { DefaultJWT } from 'next-auth/jwt';
import type { DefaultSession, DefaultUser } from 'next-auth';

interface UserCustomFields {
  id: string;
  role: UserRole;
}

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user?: DefaultSession['user'] & UserCustomFields;
  }

  interface User extends DefaultUser {
    role: UserRole;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    role: UserRole;
  }
}
