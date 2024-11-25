import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import { RowItem } from "./RowItem";
import { headers } from "../schema/headers";

const DisplayTable = ({ items }) => {
  // const columns = [
  //     {field: 'item', headerName: 'Client', headerAlign: 'center'},
  //     {field: 'status', headerName: 'Current Status', headerAlign: 'center'},
  //     {field: 'paymentReceived', headerName: 'Received Amount',  headerAlign: 'center'},
  //     {field: 'paymentTotal', headerName: 'Total Amount',  headerAlign: 'center'}
  // ]

  //   // eslint-disable-next-line no-unused-vars
  //   const renderDataGrid = () => {
  //     return (
  //     <div>
  //       <Paper>
  //         <DataGrid sx={{m: 2}} rows={todos} columns={columns} />
  //       </Paper>
  //     </div>
  //     )
  //   }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow key="header">
            {headers.map((column) => (
              <TableCell>
                <h5>{column}</h5>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <RowItem item={item} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DisplayTable;
