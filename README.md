This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev 
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


###  Admin Dashboard – Next.js + MongoDB + Bootstrap
This is a **full-stack web application** built using **Next.js**, **MongoDB**, and **React Bootstrap**. It features a secure admin panel that allows for managing users and products through RESTful APIs.

 #### Admin Authentication
- Admin login using email and password.
- Default seeded admin:
  - **Email:** `abhi@diginow.co.uk`
  - **Password:** `admin123`
- Session-based route protection (can be enhanced with JWT or NextAuth).

###  User Management
Perform full CRUD operations.
- Fields:
  - Full Name
  - Email (must be unique)
  - Phone
  - Profile Picture (via upload)

  ### Product Management
   Perform full CRUD operations.
- Fields:
  - Product Name
  - Price
  - Category
  - Image
  - Rich-text Description
