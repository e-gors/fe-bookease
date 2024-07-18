import React from "react";
import Http from "../../../../../utils/Http";
import ServicesTable from "../components/services-table";
// ----------------------------------------------------------------------

const columns = [
  { id: "name", label: "Name" },
  { id: "description", label: "Description" },
  { id: "" },
];

export default function ServicesView() {
  const [loading, setLoading] = React.useState(false);
  const [servicesList, setServicesList] = React.useState({
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
    Http.get("/services", {
      params: {
        ...filters,
        ...params,
      },
    }).then((res) => {
      if (res.data.data) {
        setServicesList({
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
      <ServicesTable
        withPagination
        loading={loading}
        data={servicesList.data}
        rowsPerPage={filters.limit}
        count={servicesList.meta.total || 0}
        page={servicesList.meta.current_page - 1 || 0}
        onChangePage={handleChangePage}
        onRowsChangePage={handleRowChange}
        columns={columns}
        placeholder="Search Services..."
        filterValues={filters}
        onMultipleFilters={handleFilterChange}
      />
    </>
  );
}
