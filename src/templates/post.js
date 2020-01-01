import React from "react";
import { graphql } from "gatsby";
import rehypeReact from "rehype-react";
import Layout from "../components/layout";

const Paragraph = ({ children }) => <p className="mt-2">{children}</p>;

const ExternalLink = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="underline"
  >
    {children}
  </a>
);

const Subtitle = ({ children }) => (
  <h2 className="mt-2 font-semibold">{children}</h2>
);

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: { p: Paragraph, a: ExternalLink, h2: Subtitle }
}).Compiler;

export default ({
  data: {
    markdownRemark: {
      frontmatter: { title, date, formattedDate },
      htmlAst
    }
  }
}) => {
  return (
    <Layout>
      <div className="mt-4">
        <time dateTime={date} className="text-sm text-gray-600">
          {formattedDate}
        </time>
        <h1 className="font-bold text-lg">{title}</h1>
        <div className="mt-2">{renderAst(htmlAst)}</div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date
        formattedDate: date(formatString: "MMMM Do, YYYY")
      }
      htmlAst
    }
  }
`;
