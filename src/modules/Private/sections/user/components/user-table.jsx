import { useState } from "react";

import {
  Card,
  Stack,
  Table,
  Button,
  Container,
  TableBody,
  Typography,
  TableContainer,
  TablePagination,
  Grid,
  CircularProgress,
} from "@mui/material";
import Iconify from "../../../../../components/iconify";
import Scrollbar from "../../../../../components/scrollbar";
import TableNoData from "../../../common-components/table-no-data";
import UserTableHead from "../../../common-components/table-head";
import TableEmptyRows from "../../../common-components/table-empty-rows";
import CommonToolbar from "../../../common-components/table-toolbar";
import {
  emptyRows,
  applyFilter,
  getComparator,
} from "../../../common-components/utils";
import UserTableRow from "./user-table-row";
import { getProfile } from "../../../../../utils/helpers";

// ----------------------------------------------------------------------

export default function UserTable(props) {
  const {
    data = [],
    columns = [],
    rowsPerPage,
    onChangePage,
    onRowsChangePage,
    withPagination = false,
    withNumber,
    loading,
    placeholder,
    filterItems,
    filterValues,
    onMultipleFilters,
    onClearFilters,
    customPage,
    ...rest
  } = props;

  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === "asc";
    if (id !== "") {
      setOrder(isAsc ? "desc" : "asc");
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = data.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    onChangePage && onChangePage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    onRowsChangePage && onRowsChangePage(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: data,
    comparator: getComparator(order, orderBy),
    filterValues,
  });

  const notFound = !dataFiltered.length && !!filterValues.search;

  const paginationProps = {
    rowsPerPageOptions: [10, 25, 50, 100, 150, 250],
    component: "div",
    count: 1,
    page: 1,
    ...rest,
  };

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4">Users</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          New User
        </Button>
      </Stack>

      <Card>
        <CommonToolbar
          numSelected={selected.length}
          filterValues={filterValues}
          placeholder={placeholder}
          filterItems={filterItems}
          onMultipleFilters={onMultipleFilters}
          onClearFilters={onClearFilters}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: "unset" }}>
            <Table sx={{ minWidth: 360 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={data.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={columns}
              />
              <TableBody>
                {dataFiltered.map((row, i) => (
                  <UserTableRow
                    key={i}
                    name={row.name}
                    email={row.email}
                    role={row.role}
                    status={row.status}
                    avatarUrl={getProfile(
                      row.profile?.profilePicture,
                      row.profile?.gender,
                      i
                    )}
                    isVerified={row.isVerified}
                    selected={selected.indexOf(row.name) !== -1}
                    handleClick={(event) => handleClick(event, row.name)}
                  />
                ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(customPage, rowsPerPage, data.length)}
                />

                {notFound && !loading && (
                  <TableNoData query={filterValues.search} />
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        {withPagination && (
          <TablePagination
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            {...paginationProps}
          />
        )}
        {loading && (
          <Grid container justifyContent="center">
            <CircularProgress />
          </Grid>
        )}
      </Card>
    </Container>
  );
}
