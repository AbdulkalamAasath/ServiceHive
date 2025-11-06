# 🕒 ServiceHive

**ServiceHive** is a **time-slot swapping web application** that enables users to **manage, share, and swap available time slots** with others in real time.  
It helps users efficiently coordinate their schedules with an intuitive interface and secure backend.

---

## 🚀 Features

✅ User registration and authentication  
✅ View and manage available time slots  
✅ Request and approve swaps between users  
✅ Real-time updates of slot availability  
✅ MongoDB-based backend with token-based authentication  

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React.js |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (via Mongoose) |
| **Dev Tool** | Nodemon |

---

## ⚙️ Project Setup Guide

Follow these simple steps to set up and run **ServiceHive** locally 👇  

---

### 🔹 Step 1: Clone the Repository


git clone https://github.com/AbdulkalamAasath/ServiceHive.git


Step 2: Setup Frontend (React)

cd ServiceHive/mini-proj

1.Install dependencies:
npm install

2.Install routing support:
npm install react-router-dom

3.Start the React development server:

npm run dev

Step 3: Setup Backend (Server)

cd ServiceHive/backend

1.Install dependencies:
npm install express mongoose

2.Install nodemon for automatic server reload:

npm install nodemon --save-dev

3.Start your MongoDB service locally (make sure MongoDB is running).

4.Run the backend server:
nodemon server.js




🌐 API Endpoints

Below are the available API endpoints and their functions:

Endpoint	Method	Description
http://localhost:4000/user/login	 POST	    User-login

http://localhost:4000/user/signup	  POST	    User-signup

http://localhost:4000/user/action/api/get-data	GET	           Fetch user data (requires token)

http://localhost:4000/user/action/api/swappable-slots	GET	  Get available swappable slots

http://localhost:4000/user/action/api/my-slots	GET  	    Get logged-in user’s slots

http://localhost:4000/user/action/api/update-data	PUT	    Update user data

http://localhost:4000/user/action/api/req-data	GET	       Retrieve requested slots

http://localhost:4000/user/action/api/processdata	PUT	     Process or update slot data

http://localhost:4000/user/action/api/swap-request	POST	 Request to swap slots

http://localhost:4000/user/action/api/swap-response	POST	 Backend processes swap request (accept/reject)


