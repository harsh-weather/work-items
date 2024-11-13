import React, { useEffect, useState } from 'react';
// import { dummySample } from './sample/dummy';
import { DataGrid } from '@mui/x-data-grid';
import { Paper, Button, FormLabel, Table, TableBody, Card, CardContent, TextField} from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import * as XLSX from 'xlsx';
import {  db, ref, set, get, push } from './firebase/firebase';
import { RowItem } from './components/RowItem';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newData, setNewData] = useState();
  const [newStatus, setNewStatus] = useState();
  const [newPaymentReceived, setNewPaymentReceived] = useState();
  const [newPaymentTotal, setNewPaymentTotal] = useState();
  const [refreshflag, setRefreshFlag] = useState(true);

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(todos);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Work Items');
    XLSX.writeFile(wb, 'export.xlsx');
  };

  const fetchData = async () => {    
    const dbRef = ref(db, "items");
    const snapshot =(await get(dbRef));
    if(snapshot.exists()) {
      const data = Object.values(snapshot.val());
      data.map((item) => item['isEdit'] = false);
      setTodos(data);
    }
  }

  useEffect(() => { 
  fetchData();
  }, [refreshflag]);

  const addNewItem = async (e) => {
    e.preventDefault();

    const uuid = (new Date()).getTime();
      const newTodo = {
        key: uuid,
        id: uuid,
        data: newData, 
        status: newStatus, 
        paymentReceived: newPaymentReceived, 
        paymentTotal: newPaymentTotal,
      }

    console.log(`${newTodo.key} added to DB.`);
    
    const newRef = push(ref(db, "items"));
    set(newRef, {...newTodo})
    .then(() => {
      setRefreshFlag(!refreshflag);
      alert(`${newTodo.data} written to Firebase.`);
    })
    .catch((e) => {
      console.error("Error while writing to Firebase: ", e);
    })
  }

  const columns = [
    {field: 'item', headerName: 'Client', headerAlign: 'center'},
    {field: 'status', headerName: 'Current Status', headerAlign: 'center'},
    {field: 'paymentReceived', headerName: 'Received Amount',  headerAlign: 'center'},
    {field: 'paymentTotal', headerName: 'Total Amount',  headerAlign: 'center'}
  ]

  const renderForm = () => {
    return ( 
    <Card variant="outlined" sx={{gap: 2, width: 0.2 }}>
      <CardContent>
    <form onSubmit={addNewItem}>
      <FormLabel>Work Item:</FormLabel><br/>      
        <TextField
          type="text"
          value={newData}
          onChange={(e) => setNewData(e.target.value)}
        />
        <p/>
      <FormLabel>Status:</FormLabel><br/>
        <TextField
          type="text"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
        /><p />
      <FormLabel>Received Payment:</FormLabel><br/>
        <TextField
          type="number"
          value={newPaymentReceived}
          onChange={(e) => setNewPaymentReceived(e.target.value)}
        /><p/>
      <FormLabel>Total Amount:</FormLabel><br/>
        <TextField
          type="number"
          value={newPaymentTotal}
          onChange={(e) => setNewPaymentTotal(e.target.value)}
        /><p/>   
      <Button variant="outlined" type="submit">Add Todo</Button>
    </form>
    </CardContent>
      </Card>
  )}

  const renderTable=()=> {
    return (<TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow key="header">
              <TableCell><h2>Item Name</h2></TableCell>
              <TableCell><h2>Status</h2></TableCell>
              <TableCell><h2>Payment Received</h2></TableCell>
              <TableCell><h2>Payment Total</h2></TableCell>
              <TableCell><h2>ACTIONS</h2></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {todos.map((item) => (
            <RowItem item={item} />
          ))}
          </TableBody>
        </Table>  
      </TableContainer>
    )
  }

  // eslint-disable-next-line no-unused-vars
  const renderDataGrid = () => {
    return (
    <div>
      <Paper>
        <DataGrid sx={{m: 2}} rows={todos} columns={columns} />
      </Paper>
    </div>
    )
  }

  return (
    <div>
      <h1>Work Items Manager</h1>
      {renderForm()}
      <br/>
      {renderTable()}
      {/* {renderDataGrid()} */}
      <Button variant="outlined" onClick={handleExport}>Export to CSV</Button>
    </div>
  );
};

export default App;