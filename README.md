# SubSpace-Assignment

**Modules Used**

This project utilizes three key modules:

- **Express.js:** A Node.js web application framework that powers the server and handles HTTP requests.

- **Axios:** A promise-based HTTP client for making requests to an external API, enabling data retrieval.

- **Lodash:** A versatile utility library offering functions for various data manipulation and analytics tasks.

**API Endpoints**

1. **Analytics Route:** `/api/blog-stats`
   - **Description:** Fetch analytics data for blogs, including the total number of blogs, the blog with the longest title, the number of blogs containing "privacy" in their titles, and a list of unique blog titles.
   - **Example Request:** `GET /api/blog-stats`

2. **Blog Search Route:** `/api/blog-search`
   - **Description:** Search for blogs based on a query parameter. Requires the `query` parameter for specifying the search query.
   - **Example Request:** `GET /api/blog-search?query=privacy`

Caching is implemented for both the analytics and blog search functionality to improve performance.
