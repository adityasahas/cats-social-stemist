import { NextApiRequest, NextApiResponse } from "next";
import prisma from "prisma";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const {query: {id}} = req;

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed, please use GET' })
    }

    if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Missing id' });
    }

    try {
        const feed = await prisma.feed.findUnique({
            where: {id: id}
        })

        if (!feed) {
            return res.status(404).json({ error: 'Feed not found' });
        }

        res.status(200).json(feed);
    } catch(error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
}