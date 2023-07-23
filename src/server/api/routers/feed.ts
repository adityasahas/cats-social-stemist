import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "@/server/api/trpc";
import { prisma } from "@/server/db";

export const feedRouter = createTRPCRouter({
  posts: publicProcedure.query(async () => {
    const posts = await prisma.feed.findMany();
    return posts;
  })
});
