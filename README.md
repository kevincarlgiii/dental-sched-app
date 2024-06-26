# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


Documentation for Dental Scheduling Application

About the project:
This project is an implementation of the Dental office online schedule system for 24x7 Direct Technical Assessment exam, as a qualification for my employee application.

Technologies used:
As indicated requirements for the application, I have used React for the front-end with HTML and CSS for the design, ReactJS for the functionalities, Node.js for the backend, NoSQL database using MongoDB, MongoDB Atlas and accompanying MongoDB Compass for the database. This application was also deployed using Git and on Github as per these links,
Github: https://kevincarlgiii.github.io/dental-sched-app/
AWS Amplify: https://gh-pages.d70r4cqnmm32a.amplifyapp.com/

Setup: This application was setup using React as front-end, Node.js as backend, and MongoDB as the database, with the accompanying node packages as indicated on the package.json
download or clone the repository using this link: https://github.com/kevincarlgiii/dental-sched-app
run npm install to download all necessary packages
on the root folder, mainly dental-sched-app, run node server.js and npm start on two terminals to run whole application.

Included functionalities:
Login Page with link hyperlink to Registration Page. 
Registration Page for user registration.
Protected Routes for Users, Doctors, Admin.

Admin Page: 

Sidebar, Header with Notification toast, Notifications Page, and User Name, Home page.
Sidebar: Home Page, Users List, Doctors List, Logout
Users Page: Can view list of users created within the application
Doctors Page: Can view list of doctors approved to use the application
Notifications Toast: Can view Seen and Unseen notifications through the application, and change status to mark all as read or delete all notifications
Logout: Logs user out of application

Doctor Page:
Sidebar, Header with Notification toast, Notifications Page, and User Name, Home page.
Sidebar: Home Page with Appointment Setup, Appointments List, Profile Page, Logout
Appointments Page: Can view list of appointments per logged in doctor, so different doctors can view their specific appointment schedules via user profile.
Profile Page: Can update doctor information, like Name, Address, Consultation fees, and their schedule.
Notifications Toast: Can view Seen and Unseen notifications through the application, and change status to mark all as read or delete all notifications
Logout: Logs user out of application

User Page:
Sidebar, Header with Notification toast, Notifications Page, and User Name, Home page.
Sidebar: Home Page with Appointment Setup, Appointments List, Apply as a Doctor Page, Logout
Appointments Page: Can view list of appointments per logged in user, can view if their appointment schedule is approved or rejected as per doctor approval.
Apply Doctor: Can apply as a doctor when filling up form, can be restricted to Admin Page so that the admin is the only one who can add Doctors, but at the current version, users are the one who can apply.
Notifications Toast: Can view Seen and Unseen notifications through the application, and change status to mark all as read or delete all notifications
Logout: Logs user out of application.

Credits:
Main Developer: Kevin Carl M. Gunda
Technical Assessment: Roem Ann Yap


Status: The application is about 70-80% finished, with some missing functionalities like user profile update, admin profile update, user reschedule and cancel appointment functionality. Also missing are the Extras on the assignment which were Email and Text notifications, Rate Limitting and Logging and Monitoring using AWS. As per the application creation, my AWS Account was not yet approved and cannot view the application properly with the backend setup. There is also a short guide video included on the github page and a longer version on YouTube with the link below.

Long version guide on how the application works and other issues found:
https://youtu.be/OqHnv56yTmM#   d e n t a l - s c h e d - a p p  
 