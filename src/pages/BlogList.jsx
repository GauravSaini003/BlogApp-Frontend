import React, { useEffect, useState } from 'react';
import { getPosts } from '../service/api';
import PostCard from '../components/PostCard';

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3;

  const [searchTerm, setSearchTerm] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');

  const fetchPosts = async () => {
    try {
      const res = await getPosts();
      console.log('Fetched posts:', res.data);

      const postArray = Array.isArray(res.data.Blogs)
        ? res.data.Blogs
        : Array.isArray(res.data.posts)
        ? res.data.posts
        : Array.isArray(res.data.MyPost)
        ? res.data.MyPost
        : Array.isArray(res.data)
        ? res.data
        : [];

      setPosts(postArray);
      setFilteredPosts(postArray);
      setCurrentPage(1); // Always start at page 1 when posts load
    } catch (err) {
      console.error(err);
      setPosts([]);
      setFilteredPosts([]);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    let filtered = posts;

    // Search
    if (searchTerm) {
      filtered = filtered.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by author
    if (authorFilter) {
      filtered = filtered.filter((post) =>
        post.author?.username?.toLowerCase().includes(authorFilter.toLowerCase())
      );
    }

    setFilteredPosts(filtered);
    setCurrentPage(1); // Reset to page 1 when filter/search changes
  }, [searchTerm, authorFilter, posts]);

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const goToPage = (pageNumber) => setCurrentPage(pageNumber);

  const clearFilters = () => {
    setSearchTerm('');
    setAuthorFilter('');
  };

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-center text-blue-600"> Blog Posts</h1>

      {/* Search & Filter UI */}
      <div className="flex flex-col md:flex-row md:items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="Search by title or content..."
          className="p-3 border border-gray-300 rounded w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by author..."
          className="p-3 border border-gray-300 rounded w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={authorFilter}
          onChange={(e) => setAuthorFilter(e.target.value)}
        />
        <button
          onClick={clearFilters}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded text-sm"
        >
          Clear Filters
        </button>
      </div>

      {/* Blog Posts */}
      {currentPosts.length === 0 ? (
        <p className="text-center text-gray-500">No posts found.</p>
      ) : (
        currentPosts.map((post) => <PostCard key={post._id} post={post} />)
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={`px-4 py-2 rounded border text-sm font-medium ${
                page === currentPage
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-blue-500 border-blue-500 hover:bg-blue-100'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;
