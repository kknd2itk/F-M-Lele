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

    try {
      if (id) {
        const product = await prisma.product.findUnique({
          where: { id: id },
        })
        if (!product) {
          res.status(404).json({
            status: "failed",
            message: "Product not found",
          })
        } else {
          res.status(200).json({
            status: "success",
            data: product,
          })
        }
      } else {
        const allProducts = await prisma.product.findMany()
        const count = await prisma.product.count()
        res.status(200).json({
          status: "success",
          message: "All products have been retrieved from the Database",
          count: count,
          data: allProducts,
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
  } else if (req.method === "POST") {
    const { title, description, phoneNumber, price, imagePath, sellerId } =
      req.body

    const id = uuidv4()
    const now = new Date().toISOString()

    try {
      await prisma.product.create({
        data: {
          id: id,
          title: title,
          description: description,
          price: price,
          phoneNumber: phoneNumber,
          imagePath: imagePath,
          seller: { connect: { id: sellerId } },
          createdAt: now,
          updatedAt: now,
        },
      })
      res.status(200).json({
        status: "success",
        message: "Product has been added to the Database",
      })
    } catch (error) {
      console.error(error)
      res.status(400).json({
        status: "failed",
        message: "Product failed to be added to the Database",
        error: error,
      })
    }
  } else if (req.method === "PUT") {
    const { id } = req.query
    const { title, description, phoneNumber, price, imagePath } = req.body

    if (!title || !description || !phoneNumber || !price || !imagePath) {
      res.status(400).json({
        status: "failed",
        message: "All fields are required",
      })
      return
    }

    if (
      typeof phoneNumber !== "number" ||
      typeof price !== "number" ||
      typeof imagePath !== "string"
    ) {
      res.status(400).json({
        status: "failed",
        message: "Invalid data type",
      })
      return
    }

    const now = new Date().toISOString()

    try {
      await prisma.product.update({
        where: { id: id },
        data: {
          title: title,
          description: description,
          price: price,
          phoneNumber: phoneNumber,
          imagePath: imagePath,
          updatedAt: now,
        },
      })
      res.status(200).json({
        status: "success",
        message: "Product has been updated to the Database",
      })
    } catch (error) {
      console.error(error)
      res.status(400).json({
        status: "failed",
        message: "Product failed to be updated to the Database",
        error: error,
      })
    }
  } else if (req.method === "DELETE") {
    const { id } = req.query

    try {
      await prisma.product.delete({
        where: { id: id },
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
  }
}
