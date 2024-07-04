import { Helmet } from "react-helmet-async";

import BlogView from "../modules/Private/sections/blog/view/BlogView";

// ----------------------------------------------------------------------

export default function BlogPage() {
  return (
    <>
      <Helmet>
        <title> Blog | BookEase </title>
      </Helmet>

      <BlogView />
    </>
  );
}
