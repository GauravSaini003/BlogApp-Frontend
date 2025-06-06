Mini Blogging Platform - Frontend
This is the Frontend for the Mini Blogging Platform.

🎯 Objective (Frontend):
✅ Implement User Dashboard
✅ Implement Admin Panel
✅ Implement Public Blog Page

🚀 Features Achieved:
✅ User can:

Sign Up & Log In (JWT-based authentication)

Create a Blog Post (with optional Image Upload)

View own Posts (My Posts Page)

Update & Delete own Posts

✅ Public Blog Page:

View all public posts (Homepage)

✅ Admin can:

View list of all Users

View list of all Posts

✅ Tech Used:

React.js

Context API (for Auth State)

React Router DOM

Axios

Tailwind CSS

✅ Authentication:

JWT token stored and passed with API calls

Protected Routes for Dashboard and Admin Panel

✅ API calls implemented:

/api/auth/signup

/api/auth/login

/api/posts

/api/posts/myposts

/api/posts/create

/api/posts/:id (Update/Delete)

/api/admin/users