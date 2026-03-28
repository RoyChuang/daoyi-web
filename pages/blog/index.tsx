import BlogIndexPage from "../../src/components/BlogIndexPage";

const AllArticles = () => {
  return <BlogIndexPage articlesPerPage={12} />;
};

export async function getStaticProps() {
  return { props: {} };
}

export default AllArticles;
