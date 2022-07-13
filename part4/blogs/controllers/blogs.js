const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  let { author, url, likes, title } = request.body;
  const user = request.user;
  if (title === undefined && url === undefined) {
    return response.status(400).end();
  }
  if (user === undefined) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  if (likes === undefined) likes = 0;
  const blog = new Blog({
    likes: likes,
    title: title,
    url: url,
    author: author,
    user: user._id,
  });
  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const { id } = request.params;
  const user = request.user;

  if (user === undefined) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const blogToDelete = await Blog.findById(id);

  if (!blogToDelete) {
    return response.status(404).json({ error: "blog does not exist" });
  } else if (blogToDelete.user.toString() !== user._id.toString()) {
    return response
      .status(401)
      .json({ error: "user unauthorized to delete this post" });
  }
  user.blogs = user.blogs.filter((blog) => blog.id !== id);
  await Blog.findByIdAndDelete(id);
  await user.save();
  response.status(204).end();
});

blogsRouter.put("/:id", async (request, response) => {
  let { author, url, likes, title, user } = request.body;
  console.log(title, url);
  if (likes === undefined) likes = 0;
  if (title === undefined || url === undefined) {
    response.status(400).end();
  } else {
    const newBlog = {
      likes: likes,
      title: title,
      url: url,
      author: author,
      user: user,
    };
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      newBlog,
      { new: true }
    ).populate("user", {
      username: 1,
      name: 1,
      id: 1,
    });
    response.json(updatedBlog);
  }
});

module.exports = blogsRouter;
