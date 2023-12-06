import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";


export type FetchedUser = Partial<Prisma.UserGetPayload<{
  include: { applicantInformation: true, requestorInformation: true } }
>>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({req});
  if (!session?.user?.id){
    return res.status(401).json({});
  }
  const user = await prisma.user.findUnique(
    { 
      select: { id: true, name: true, email: true, role: true, applicantInformation: true, requestorInformation: true },
      where: { id: session.user.id },
    }
  );
  if (!user){
    return res.status(401).json({});
  }
  return res.status(200).json({user});

};

export default handler;
