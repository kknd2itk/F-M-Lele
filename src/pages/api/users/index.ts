// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { prisma } from "@/lib/prisma"
import { v4 as uuidv4 } from "uuid"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    const { id } = req.query
    const userId = Array.isArray(id) ? id[0] : id

    try {
      if (id) {
        const user = await prisma.user.findUnique({
          where: { id: userId },
        })
        if (!user) {
          res.status(404).json({
            status: "failed",
            message: "Product not found",
          })
        } else {
          res.status(200).json({
            status: "success",
            data: user,
          })
        }
      } else {
        const allUsers = await prisma.user.findMany()
        const count = await prisma.user.count()
        res.status(200).json({
          status: "success",
          message: "All products have been retrieved from the Database",
          count: count,
          data: allUsers,
        })
      }
    } catch (error) {
      console.error(error)
      res.status(500).json({
        status: "failed",
        message: "Failed to retrieve products from the database",
        error: error,
      })
    }
  } else if (req.method === "PUT") {
    const { id } = req.query
    const userId = Array.isArray(id) ? id[0] : id

    try {
      // Get the request body
      const { role } = req.body

      // Update the user in the database
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: { role },
      })

      res.status(200).json({
        status: "success",
        message: "User has been updated",
        data: updatedUser,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        status: "failed",
        message: "Failed to update user",
        error: error,
      })
    }
  } else if (req.method === "DELETE") {
    const { id } = req.query
    const userId = Array.isArray(id) ? id[0] : id

    try {
      await prisma.user.delete({
        where: { id: userId },
      })
      res.status(200).json({
        status: "success",
        message: "Product has been deleted from the Database",
      })
    } catch (error) {
      console.error(error)
      res.status(400).json({
        status: "failed",
        message: "Product failed to be deleted from the Database",
        error: error,
      })
    }
  } else {
    res.status(405).json({
      status: "failed",
      message: `Method ${req.method} Not Allowed`,
    })
  }
}
