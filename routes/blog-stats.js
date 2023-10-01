const router = require("express").Router();
const axios = require("axios");
const _ = require("lodash");
const cacheDuration = 600000; // 10 minutes

const fetchBlogData = async () => {
  try {
    const response = await axios.get(
      "https://intent-kit-16.hasura.app/api/rest/blogs",
      {
        headers: {
          "x-hasura-admin-secret":
            "32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6",
        },
      }
    );
    return response.data.blogs;
  } catch (error) {
    throw new Error("Error while fetching data from the database");
  }
};

const calculateAnalytics = _.memoize(
  async () => {
    try {
      const blogData = await fetchBlogData();

      const totalBlogs = blogData.length;

      const blogWithLongestTitle = _.maxBy(blogData, "title.length");

      const blogsWithPrivacyTitle = _.filter(blogData, (blog) =>
        _.includes(blog.title.toLowerCase(), "privacy")
      );

      const uniqueBlogTitles = _.uniqBy(blogData, "title");

      const analyticsResults = {
        totalBlogs,
        blogWithLongestTitle,
        numberOfBlogsWithPrivacyTitle: blogsWithPrivacyTitle.length,
        uniqueBlogTitles,
      };

      return analyticsResults;
    } catch (error) {
      console.error(error.message);
      throw new Error(
        "An error occurred while processing the data for analytics"
      );
    }
  },
  () => {
    return Date.now() - cacheDuration;
  }
);

const searchBlogs = _.memoize(
  async (query) => {
    try {
      if (!query || query.trim() === "") {
        throw new Error(
          "Please provide a query in the parameter, it cannot be empty eg. /api/blog-search?query=privacy"
        );
      }

      const blogData = await fetchBlogData();

      const filteredBlogs = blogData.filter((blog) => {
        const blogTitle = blog.title;
        return blogTitle.includes(query);
      });

      return filteredBlogs;
    } catch (error) {
      throw new Error(
        "An error occurred while processing the data for blog search"
      );
    }
  },
  (query) => {
    return query;
  }
);

router.get("/blog-stats", async (req, res) => {
  try {
    const analyticsResults = await calculateAnalytics();
    res.json(analyticsResults);
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while processing the data for analytics",
    });
  }
});

router.get("/blog-search", async (req, res) => {
  try {
    const query = req.query.query;

    const searchResults = await searchBlogs(query);

    res.json(searchResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error:
        "Please provide a query in the parameter, it cannot be empty eg. /api/blog-search?query=privacy",
    });
  }
});

module.exports = router;
