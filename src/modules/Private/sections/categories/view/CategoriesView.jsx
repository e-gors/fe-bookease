import React from "react";
import Http from "../../../../../utils/Http";
import CategoriesTable from "../components/categories-table";
// ----------------------------------------------------------------------

const columns = [
  { id: "name", label: "Name" },
  { id: "description", label: "Description" },
  { id: "" },
];

export default function CategoriesView() {
  const [loading, setLoading] = React.useState(false);
  const [categoriesList, setCategoriesList] = React.useState({
    data: [],
    meta: {},
  });
  const [filters, setFilters] = React.useState({
    limit: 10,
    search: "",
  });

  React.useEffect(() => {
    const controller = new AbortController();

    const time = setTimeout(() => {
      fetchingData();
    }, 400);
    return () => {
      clearTimeout(time);
      controller.abort();
    };
  }, [filters]); // eslint-disable-line

  const handleFilterChange = (event) => {
    const {name, value} = event.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchingData = (params = {}) => {
    setLoading(true);
    Http.get("/categories", {
      params: {
        ...filters,
        ...params,
      },
    }).then((res) => {
      if (res.data.data) {
        setCategoriesList({
          data: res.data.data,
          meta: res.data.meta,
        });
      }
      setLoading(false);
    });
  };

  const handleChangePage = (newPage) => {
    fetchingData({ page: newPage + 1 });
  };

  const handleRowChange = (value) => {
    fetchingData({ limit: value });
    setFilters((prev) => ({
      ...prev,
      limit: value,
    }));
  };

  return (
    <>
      <CategoriesTable
        withPagination
        loading={loading}
        data={categoriesList.data}
        rowsPerPage={filters.limit}
        count={categoriesList.meta.total || 0}
        page={categoriesList.meta.current_page - 1 || 0}
        onChangePage={handleChangePage}
        onRowsChangePage={handleRowChange}
        columns={columns}
        placeholder="Search Categories..."
        filterValues={filters}
        onMultipleFilters={handleFilterChange}
      />
    </>
  );
}
