// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { prisma } from "@/lib/prisma"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req, res, authOptions)

  if (session) {
    if (req.method === "GET") {
      const allProducts = await prisma.product.findMany()
      res.status(200).json(allProducts)
    } else if (req.method === "POST") {
      const { title, description, phoneNumber, price, imagePath } = req.body

      await prisma.product.create({
        data: {
          title,
          description,
          price,
          phoneNumber,
          imagePath,
          sellerId: session?.user?.userProfile?.id,
        },
      })
    }
  } else {
    res.send({
      error:
        "You must be signed in to view the protected content on this page.",
    })
  }
}
