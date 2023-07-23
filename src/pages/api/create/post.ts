import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed, please use POST' })
    }

    try {
        const feed = await prisma.feed.create({
            data: req.body
        });
        res.status(200).json(feed);
    } catch(error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
}

export default handler;