import React from "react";
import Http from "../../../../../utils/Http";
import AppointmentTable from "../components/appointment-table";
// ----------------------------------------------------------------------

const columns = [
  { id: "name", label: "Name" },
  { id: "description", label: "Description" },
  { id: "" },
];

export default function AppointmentView() {
  const [loading, setLoading] = React.useState(false);
  const [appointmentList, setAppointmentList] = React.useState({
    data: [],
    meta: {},
  });
  const [filters, setFilters] = React.useState({
    limit: 10,
  });

  React.useEffect(() => {
    const controller = new AbortController();

    fetchingData();
    return () => controller.abort();
  }, []); // eslint-disable-line

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchingData = (params = {}) => {
    setLoading(true);
    Http.get("/appointments", {
      params: {
        ...filters,
        ...params,
      },
    }).then((res) => {
      if (res.data.data) {
        setAppointmentList({
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
    handleFilterChange("limit", value);
  };

  console.log(appointmentList.data);

  return (
    <>
      <AppointmentTable
        withPagination
        loading={loading}
        data={appointmentList.data}
        rowsPerPage={filters.limit}
        count={appointmentList.meta.total || 0}
        page={appointmentList.meta.current_page - 1 || 0}
        onChangePage={handleChangePage}
        onRowsChangePage={handleRowChange}
        columns={columns}
      />
    </>
  );
}
