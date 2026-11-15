#Startup Idea Management System
**Project Overview**
This project extends the QUT IFQ636 starter application into a Startup Idea Management System for founders and incubator reviewers.
Founders can submit startup proposals, save drafts and view the status of their ideas. Reviewers can access submitted proposals, record evaluation scores, provide feedback and update review statuses.
**Technology and Architecture**
Frontend: React.js
Backend: Node.js and Express.js
Database: MongoDB Atlas using Mongoose
Authentication: JSON Web Tokens (JWT)
Deployment: AWS EC2 with Nginx
Nginx serves the React frontend and forwards API requests to the Express backend. MongoDB Atlas is hosted separately.
**Local Setup**
Clone the repository.
Install dependencies in the frontend and backend directories using npm install.
Configure the required environment variables, including the MongoDB connection string and JWT secret. Do not commit credentials or .env files.
Start the application using the project's development scripts.
**Main Features**
User registration and login
Founder and Reviewer roles
Startup idea submission and draft saving
Founder dashboard with status filtering
Reviewer scoring and written feedback
Review status management
**Deployment**
The application was configured for deployment on AWS EC2 using Nginx.
Deployment URL: http://16.179.155.182
Public accessibility could not be verified at the time of submission.
**Known Limitations**
The reviewer workflow has not been fully verified end to end.
Final review statuses can be assigned without confirming that all evaluation scores have been completed.
Public deployment availability remains unverified.
The Figma prototype does not cover all required interactive states or the reviewer workflow.
**Project Management**
Development was tracked using Jira issues SCRUM-5 to SCRUM-14 across Founder Submission and Reviewer Workflow iterations.
**Acknowledgement**
Based on the QUT IFQ636 starter application.

**Assessment 1.2 (Total Marks **20**)**

Assignment: **Software requirements analysis and design (**Full-Stack CRUD Application Development with DevOps Practices**)**


---

**Objective**

For this assessment, you have already been assigned a project. Your task is to develop a system that implements CRUD (Create, Read, Update, Delete) operations based on the selected project. The system should include both a user panel and an admin panel. Depending on the nature of your chosen project, you may decide how many CRUD operations are required to support the functionality of the system. You have been provided with a starter project that includes user authentication using Node.js, React.js, and MongoDB, your should extend this application based on your assigned project requirements. Ensure that the implemented features are appropriate and meaningful for your selected project. Your project should include the following:
In this assignment you will complete the following tasks:

* **Basic Version Control using GitHub**
* **Development, CI/CD Integration for Automated Deployment**
* **Project report**

 
---

**GitHub link of the starter project: **[https://github.com/nahaQUT/sampleapp_IFQ636.git](https://github.com/nahaQUT/sampleapp_IFQ636.git)

---

