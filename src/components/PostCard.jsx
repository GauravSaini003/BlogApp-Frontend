import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post, onDelete, isOwner }) => {
  return (
    <div className="bg-white border rounded-lg shadow-md overflow-hidden mb-6 hover:shadow-lg transition-shadow duration-300">

      {/* Image */}
      {post.image && (
        <img
          src={`http://localhost:5000/uploads/${post.image}`}
          alt="Post"
          className="w-full h-64 object-cover object-center"
        />
      )}

      {/* Content */}
      <div className="p-5">
        <h3 className="text-2xl font-bold mb-3 text-gray-800">{post.title}</h3>
        <p className="text-gray-600 mb-4">
          {post.content.length > 200
            ? `${post.content.slice(0, 200)}...`
            : post.content}
        </p>

        {/* Author name */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span className='text-black underline'>Author: {post.author?.username || 'Unknown'}</span>
         
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-3">
         <Link to={`/posts/${post._id}`} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
  Read More
</Link>

          {isOwner && (
            <>
              <Link
                to={`/edit-post/${post._id}`}
                className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
              >
                Edit
              </Link>
              <button
                onClick={() => onDelete(post._id)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
