import { NextApiRequest, NextApiResponse } from "next";
import prisma from "prisma";

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    const {query: {catBreed}} = req;

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed, please use GET' })
    }

    if (!catBreed || typeof catBreed !== 'string') {
        return res.status(400).json({ error: 'Missing breed type' });
    }

    try {
        const feeds = await prisma.feed.findMany({
            where: {breed: catBreed}
        })

        res.status(200).json(feeds);
    } catch(error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
}