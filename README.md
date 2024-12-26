# Vercel Showcase Serving Static Files

Showing how to serve static files with Vercel and ES6 modules.

---

## The problem

For the backend Vercel is meant for serverless functions. Instead of constantly running your server it spins up a serverless function when a request is made. 

This is great for saving but creates some challenges since you do not have a permanent file system to store files.

The end result is that we cannot use `app.use(express.static('public'))` to serve static files.

https://examples.vercel.com/guides/why-does-my-serverless-function-work-locally-but-not-when-deployed#reading-from-or-writing-to-the-filesystem

---

## Other Solutions

There are multiple solutions that include storing files elsewhere.

This repository solves the problem by creating individual routes manually for each file.

---

## Solution

Look in `app.js` for comments on how the routes for each individual static file is created dynamically. 

Look in `public/frontpage/frontpage.html` to see how the files are accessed through their endpoints rather than paths. 