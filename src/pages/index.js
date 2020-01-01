import React from "react";
import { Link } from "gatsby";
import { usePosts } from "../hooks/use-posts";
import Layout from "../components/layout";

export default () => (
  <Layout>
    <div className="mt-4">Hello world!</div>
    <div className="mt-4">
      {usePosts().map(({ id, slug, title, date, formattedDate }) => (
        <div key={id} className="mt-2">
          <time dateTime={date}>{formattedDate}</time>
          <Link to={slug}>
            <h1>{title}</h1>
          </Link>
        </div>
      ))}
    </div>
  </Layout>
);
