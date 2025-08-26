import React from "react";
import KineticTestimonial from "@/components/ui/kinetic-testimonials";

const blogs = [
    {
        name: "Mastering Next.js 14",
        review:
            "Next.js 14 introduces powerful features improving developer experience and application performance, including the new app directory, enhanced image optimization, server components, and incremental static regeneration.",
        handle: "https://nextjs.org/docs",
        avatar: ""
    },
    {
        name: "Why I Switched to Redux Toolkit",
        review:
            "Managing state with Redux Thunk can be cumbersome. Learn how Redux Toolkit simplifies Redux logic, improves maintainability, and speeds up development.",
        handle: "",
        avatar: ""
    },
    {
        name: "Animations with Framer Motion",
        review:
            "Discover how to integrate Framer Motion into React applications, from simple transitions to advanced scroll and gesture-based animations.",
        handle: "",
        avatar: ""
    },
    {
        name: "Getting Started with React Hooks",
        review:
            "Learn React Hooks basics such as useState, useEffect, and custom hooks to manage state, lifecycle events, and reusable logic in functional components.",
        handle: "",
        avatar: ""
    },
    {
        name: "Building a REST API with Node.js and Express",
        review:
            "Step-by-step guide to building a RESTful API using Node.js and Express, including routing, middleware, MongoDB integration, and security best practices.",
        handle: "",
        avatar: ""
    },
    {
        name: "Optimizing Performance in Next.js",
        review:
            "Learn strategies for optimizing performance in Next.js applications, including lazy loading, code splitting, caching, and image optimization.",
        handle: "",
        avatar: ""
    },
    {
        name: "Introduction to MongoDB with Node.js",
        review:
            "Explore MongoDB integration with Node.js, including CRUD operations, Mongoose connection, database design, and best practices for scalable backends.",
        handle: "",
        avatar: ""
    },
    {
        name: "Continuous Integration with Jenkins",
        review:
            "Set up Jenkins pipelines for Node.js and React projects, automate testing, and deploy applications seamlessly with CI/CD workflows.",
        handle: "",
        avatar: ""
    },
    {
        name: "SQL vs NoSQL: Which Database to Choose?",
        review:
            "Compare relational and non-relational databases, their use cases, performance, and scalability to make the right choice for your project.",
        handle: "",
        avatar: ""
    },
    {
        name: "Working with Google Cloud Platform (GCP) in Node.js",
        review:
            "Learn to integrate Node.js apps with GCP, including App Engine deployment, Firestore, Pub/Sub, and serverless cloud functions.",
        handle: "",
        avatar: ""
    },
];

export default function Blogs() {
    return (
        <KineticTestimonial
            testimonials={blogs}
            className="md:py-0 py-0 "
            cardClassName="hover:scale-105 shadow-lg"
            avatarClassName="ring-2 ring-purple-500"
            desktopColumns={4}
            tabletColumns={3}
            mobileColumns={2}
            speed={0.5}
            title="Blogs And Articles"
            subtitle="What our users think about our product"
        />
    );
}
