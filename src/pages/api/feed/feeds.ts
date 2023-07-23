import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "prisma";

export default async function getFeedHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed, please use GET' })
    }

    try {
        const feeds = await prisma.feed.findMany({
            orderBy: {createdAt: 'desc'}
        });
        res.status(200).json(feeds);
    } catch(error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
}