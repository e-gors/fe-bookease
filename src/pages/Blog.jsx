import { Helmet } from "react-helmet-async";

import BlogView from "../modules/Private/sections/blog/view/BlogView";

// ----------------------------------------------------------------------

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title> Blogs | BookEase </title>
      </Helmet>

      <BlogView />
    </>
  );
}
