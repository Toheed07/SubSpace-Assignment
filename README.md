# SubSpace-Assignment

##Modules Used
###Express.js
Express.js is a web application framework for Node.js. It's used to create the web server and define routes for handling incoming HTTP requests.

###Axios
Axios is a promise-based HTTP client for making HTTP requests. It's used to fetch data from an external API.

###Lodash
Lodash is a utility library that provides many helpful functions for working with arrays, objects, and more. It's used for various data manipulation and analytics tasks in this project.

1. Analytics Route
Route: /api/blog-stats
Method: GET
Description: Get analytics data for blogs.
Example Request:
http
Copy code
GET /api/analytics
Response:
The response will include analytics data such as:

Total number of blogs fetched.
Blog with the longest title.
Number of blogs with titles containing the word "privacy."
Array of unique blog titles (no duplicates).
2. Blog Search Route
Route: /api/blog-search
Method: GET
Description: Search for blogs based on a query parameter.
Query Parameter:
query (required): The search query string.
Example Request:
http
Copy code
GET /api/blog-search?query=privacy
Response:
The response will include an array of blog objects that match the search query.

Caching
Both the analytics and blog search functionality are memoized using Lodash's memoize function. This caching mechanism stores the results of these operations for a certain period of time to improve performance. The cache duration is configurable and is set to:

Analytics: Cached for 5 minutes.
Blog Search: Cached for 2 minutes for each unique query.
