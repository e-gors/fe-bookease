import React from "react";
import Http from "../../../../../utils/Http";
import UserTable from "../components/user-table";
// ----------------------------------------------------------------------


//custom columns for each of the table (user table)
const columns = [
  { id: "name", label: "Name" },
  { id: "email", label: "Email" },
  { id: "role", label: "Role" },
  { id: "isVerified", label: "Verified", align: "center" },
  { id: "status", label: "Status" },
  { id: "" },
];

//custom filters for each of the table (user table)
const filterItems = [
  {
    type: "dropdown",
    name: "role",
    label: "Role",
    options: ["Customer", "Service Provider"],
  },
  {
    type: "dropdown",
    name: "isVerified",
    label: "Verified",
    options: [
      {
        name: "Yes",
        value: true,
      },
      {
        name: "No",
        value: false,
      },
    ],
  },
  {
    type: "dropdown",
    name: "status",
    label: "Status",
    options: [
      {
        name: "Active",
        value: "active",
      },
      {
        name: "Banned",
        value: "banned",
      },
    ],
  },
];

export default function UserPage() {
  const [loading, setLoading] = React.useState(false);
  const [userList, setUserList] = React.useState({
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
    Http.get("/users", {
      params: {
        ...filters,
        ...params,
      },
    }).then((res) => {
      if (res.data.data) {
        setUserList({
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

  return (
    <>
      <UserTable
        withPagination
        loading={loading}
        data={userList.data}
        rowsPerPage={filters.limit}
        count={userList.meta.total || 0}
        page={userList.meta.current_page - 1 || 0}
        onChangePage={handleChangePage}
        onRowsChangePage={handleRowChange}
        columns={columns}
        placeholder="Search Users..."
        filterItems={filterItems}
      />
    </>
  );
}
