import { Helmet } from "react-helmet-async";

import ProductsView from "../modules/Private/sections/products/view/ProductsView";

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> Products | BookEase </title>
      </Helmet>

      <ProductsView />
    </>
  );
}
