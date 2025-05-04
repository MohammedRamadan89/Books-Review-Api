
📚 Book Reviews API
This is a RESTful API built with Node.js, Express, and MongoDB that allows users to manage books and reviews. The API supports user authentication, authorization (including admin-only actions), and basic CRUD operations for books and reviews.

🚀 Features
User registration and login with JWT authentication.

Role-based access (user/admin).

CRUD operations for books (Admin only).

Users can add, update, delete, and view reviews for books.

Data validation and error handling.

Secure password hashing with bcrypt.

🛠 Tech Stack
Backend: Node.js, Express.js

Database: MongoDB, Mongoose

Authentication: JWT (JSON Web Tokens)

Other: bcrypt, dotenv

🔧 Setup & Installation
1️⃣ Clone the repository:
git clone https://github.com/MohammedRamadan89/Books-Review-Api.git

cd Books-Review-Api

2️⃣ Install dependencies:
npm install

3️⃣ Create a .env file:
touch .env

➡️ Add the following variables to the .env file:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret_key
PORT=3000

4️⃣ Start the server:
npm run dev
🌐 The API will be running at:
http://localhost:3000/

📖 API Endpoints
🔐 Auth Routes
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login and get JWT token

📚 Book Routes
Method	Endpoint	Description	Access
POST	/api/books/add	Add a new book	Admin only
GET	/api/books/	Get all books	Public
GET	/api/books/:id	Get a book by ID	Public
PUT	/api/books/:id	Update a book	Admin only
DELETE	/api/books/:id	Delete a book	Admin only

📝 Review Routes
Method	Endpoint	Description	Access
POST	/api/reviews/addReview	Add a review for a book	Authenticated
GET	/api/reviews/:bookId	Get all reviews for a specific book	Public
PUT	/api/reviews/:id	Update your own review	Authenticated
DELETE	/api/reviews/:id	Delete your own review	Authenticated

🛡 Authentication & Authorization
All protected routes require a valid JWT token in the Authorization header:

Authorization: Bearer <token>
Admin-only routes require the user to have the role: "admin".

✅ Example Usage
Register:
POST /api/auth/register
{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
}
Login:
POST /api/auth/login
{
    "email": "john@example.com",
    "password": "password123"
}
Response:
{
    "token": "<JWT_TOKEN>"
}
Add a Review:
POST /api/reviews/addReview
Headers: Authorization: Bearer <token>
{
    "book": "<book_id>",
    "rating": 5,
    "comment": "Fantastic book!"
}
🪪 License
This project is licensed under the MIT License. See the LICENSE file for more details.

