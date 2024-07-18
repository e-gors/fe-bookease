import React from "react";
import CategoriesView from "../modules/Private/sections/categories/view/CategoriesView";
import { Helmet } from "react-helmet-async";

function Categories() {
  return (
    <>
      <Helmet>
        <title>Categories | BookEase</title>
      </Helmet>
      <CategoriesView />
    </>
  );
}

export default Categories;
