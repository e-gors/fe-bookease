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
import CommonTableHead from "../../../common-components/table-head";
import TableEmptyRows from "../../../common-components/table-empty-rows";
import CommonToolbar from "../../../common-components/table-toolbar";
import {
  emptyRows,
  applyFilter,
  getComparator,
} from "../../../common-components/utils";
import AppointmentTableRow from "./appointment-table-row";

// ----------------------------------------------------------------------

export default function AppointmentTable(props) {
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
    ...rest
  } = props;

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");

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

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: data,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const paginationProps = {
    rowsPerPageOptions: [10, 25, 50, 100, 150, 250],
    component: "div",
    count: 1,
    rowsPerPage: 10,
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
        <Typography variant="h4">Appointments</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          New Appointment
        </Button>
      </Stack>

      <Card>
        <CommonToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          placeholder={placeholder}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: "unset" }}>
            <Table sx={{ minWidth: 800 }}>
              <CommonTableHead
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
                  <AppointmentTableRow
                    key={i}
                    name={row.name}
                    role={row.role}
                    status={row.status}
                    company={row.company}
                    avatarUrl={row.avatarUrl}
                    isVerified={row.isVerified}
                    selected={selected.indexOf(row.name) !== -1}
                    handleClick={(event) => handleClick(event, row.name)}
                  />
                ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, data.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
              {!loading && data.length === 0 && (
                <Typography align="center">No item(s) at the moment</Typography>
              )}
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
