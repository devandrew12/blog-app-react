# Getting Started with Create React App

# Description:

The "The blog App" application purpose is to view/create posts.

To create post first will have to create an account and then login to create posts.

When the form is submitted the application creates a post record with the provided information.

It also helps to view/create/update comments of other users and also other users can comment on the post.

For maintaining authentication Context API has been create

To get the Rails server running locally:


## Required Versions

  -  Clone this repo https://github.com/devandrew12/blog-app-react.git
  - `node v18.14.0` required version for node
  - `npm 9.3.1` required version for npm

# Getting started
## Available Scripts

In the project directory, you can run:

  - `npm install` to install the reuired packages for project
  - `npm start` to start the application on localhost

## Folders

  - `src/api` - here is defined url path for base api to hit.
  - `src/components`
     - `comments` - Contains comments create and update.
     - `loginform` - Contains login functionality for application login
     - `logout` - Contains Logout functionality of application 
     - `navbar` - Contains navbar
     - `post` - Contains posts create and update.
     - `resgister` - Contains signup functionality for application signup
  - `src/Context` - Contains context api for app authentication.
  - `src/pages/postpage` - Contains landing page for post which contains all post.

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

