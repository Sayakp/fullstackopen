const dummy = (blogs) => {
  // Function to learn testing in node js. Receives an array and always returns 1
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((likesSum, blog) => likesSum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return {};

  const favoriteBlog = blogs.reduce((prev, current) =>
    current.likes > prev.likes ? current : prev
  );
  return (({ title, author, likes }) => ({ title, author, likes }))(
    favoriteBlog
  );
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return {};

  // Make an object with the blog count for each author
  const authorsBlogCount = blogs.reduce((authorsBlogsCount, current) => {
    authorsBlogsCount[current.author] =
      (authorsBlogsCount[current.author] || 0) + 1;
    return authorsBlogsCount;
  }, {});
  // Look for the author with most blogs
  const authorWithMostBlogs = getMaxKey(authorsBlogCount);

  return {
    author: authorWithMostBlogs,
    blogs: authorsBlogCount[authorWithMostBlogs],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return {};

  // Make an object with the likes count for each author
  const authorsLikeCount = blogs.reduce((authorsBlogsCount, current) => {
    authorsBlogsCount[current.author] =
      (authorsBlogsCount[current.author] || 0) + current.likes;
    return authorsBlogsCount;
  }, {});
  // Look for the author with most likes
  const authorWithMostLikes = getMaxKey(authorsLikeCount);

  return {
    author: authorWithMostLikes,
    likes: authorsLikeCount[authorWithMostLikes],
  };
};

const getMaxKey = (obj) => {
  // Returns the key with the max value in an object (returns only one in case two keys have the most)
  return Object.keys(obj).reduce((maxKey, current) =>
    obj[current] > obj[maxKey] ? current : maxKey
  );
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
