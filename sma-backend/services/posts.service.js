import { PrismaClient } from "@prisma/client";
import "dotenv/config";
const prisma = new PrismaClient();

const fetchpost = async (req) => {
  const { searchTerm, cursor, limit } = req;

  const take = limit ? Number(limit) : 10; // Default limit
  const skip = cursor ? 1 : 0; // Skip the cursor if it exists
  const cursorObj = cursor ? { id: cursor } : undefined; // Cursor object for Prisma

  try {
    const posts = await prisma.post.findMany({
      skip: skip,
      take: take,
      cursor: cursorObj,
      where: {
        content: searchTerm
          ? {
              contains: searchTerm,
              mode: "insensitive", // Perform case-insensitive search
            }
          : undefined,
      },
      orderBy: {
        createdAt: "desc", // Newest first
      },
    });

    let nextCursor = null;

    if (posts.length > 0) {
      nextCursor = posts[posts.length - 1].id;
    }

    return {
      posts,
      nextCursor,
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error; // Re-throw to be handled in the route
  }
};

const createpost = async (req) => {
  const { content } = req.body;
  console.log("Server at  createpost service");
  const post = await prisma.post.create({
    data: {
      content,
    },
  });

  return { post }; //creation of a post
};

const updatepost = async (req) => {
  let { enteredid, enteredcontent, updatelike } = req.body;
  console.log(req.body);
  const post = await prisma.post.update({
    where: {
      id: enteredid,
    },
    data: {
      content: enteredcontent,
      like: updatelike,
    },
  });

  return { post };
};

const deletepost = async (req) => {
  const { Id } = req.params;

  const post = await prisma.user.delete({
    where: {
      id: Id,
    },
  });
  if (!post) {
    return "The post of given id doesnt exist";
  }
  return { post };
};

export { fetchpost, createpost, updatepost, deletepost };
