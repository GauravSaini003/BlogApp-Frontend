import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostById } from '../service/api';
import { AuthContext } from '../context/AuthContext';

const FullPost = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPost = async () => {
    try {
      const res = await getPostById(id, user?.token || '');
      setPost(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (loading) return <p className="p-4 text-center">Loading post...</p>;
  if (!post) return <p className="p-4 text-center">Post not found.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-6">
      {/* Image */}
      {post.image && (
        <img
          src={`http://localhost:5000/uploads/${post.image}`}
          alt="Post"
          className="w-full h-96 object-cover object-center mb-6 rounded"
        />
      )}

      {/* Title */}
      <h1 className="text-4xl font-bold mb-4 text-gray-800">{post.title}</h1>

      {/*User name*/}
      <div className="text-sm text-gray-500 mb-4 flex justify-between">
        <span>Author: {post.author?.username || 'Unknown'}</span>
        
      </div>

      {/* Content */}
      <p className="text-lg text-gray-700 mb-6">{post.content}</p>

      {/* Back button */}
      <Link
        to="/"
        className="inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
      >
        Back to Blog
      </Link>
    </div>
  );
};

export default FullPost;
