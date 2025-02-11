import { PrismaClient } from "@prisma/client";
import "dotenv/config";
const prisma = new PrismaClient();

const createpost = async (req) => {
  const content = req.body.content;
  console.log("Server at  createpost service");
  // console.log(req.body);
  const post = await prisma.post.create({
    data: {
      content,
      userID: req.body.User.id,
    },
    include: {
      User: true,
    },
  });

  return { post }; //creation of a post
};

const fetchpost = async (req) => {
  console.log("Inside the fetchpost service");
  const searchParams = req.query.search;
  const result = await prisma.post.findMany({
    where: {
      OR: [
        {
          content: {
            contains: searchParams,
            mode: "insensitive",
          },
        },
        {
          User: {
            fullName: {
              contains: searchParams,
              mode: "insensitive",
            },
          },
        },
      ],
    },
    include: {
      User: true,
    },
  });
  return result;
};

const updatepost = async (req) => {
  // let postId = req.body.id;
  const { postId } = req.params;
  // let { postId } = req.params;
  console.log(postId);
  const { like } = req.body;
  const { content } = req.body;
  console.log("postId:", postId);
  // console.log("entered content:", content);
  // console.log(req.body);
  let post_to_find = await prisma.post.findFirst({
    where: {
      id: +postId,
    },
  });
  // const likesate = true;
  if (content) {
    var post = await prisma.post.update({
      // i have used var here so that it can be accessed outside the scope as well
      where: {
        id: +postId,
      },
      data: {
        content: content,
        // like: updatelike(likesate),
      },
    });
    // console.log("likesate:", like);
    return { post };
  }

  // the like is always returned as  true so  we code accordingly
  if (like) {
    // //if like in the request  arrives  as  true
    // const requiredpost = await prisma.post.findFirst({
    //   where: {
    //     id: +postId,
    //   },
    // });
    // console.log("Before:", requiredpost.likecount);
    const post = await prisma.post.update({
      where: {
        id: +postId,
      },
      data: {
        likesCount: { increment: 1 },
      },
    });
    return { post };
  }

  console.log("updated the content or like");
};

const deletepost = async (req) => {
  const { postId } = req.params;
  // console.log("post id:", postId);
  // console.log("at the delete service");
  // console.log(Id);
  const checkPostExist = prisma.post.findFirst({
    where: {
      id: +postId,
    },
  });
  if (!checkPostExist) {
    return "The post of given id doesnt exist";
  }
  await prisma.post.delete({
    where: {
      id: +postId,
    },
  });
  return "Successfully deleted post";
};

export { fetchpost, createpost, updatepost, deletepost };
