import { TableCell, TableRow, TextField } from "@mui/material";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import { useState } from "react";

const RowItem = ({item}) => {
    const [newData, setNewData] = useState(item.data);
    const [newStatus, setNewStatus] = useState(item.status);
    const [newPaymentReceived, setNewPaymentReceived] = useState(item.paymentReceived);
    const [newPaymentTotal, setNewPaymentTotal] = useState(item.paymentTotal);
    
        if(!item.isEdit) 
        return(<TableRow>
            <TableCell>{item.data}</TableCell>
            <TableCell>{item.status}</TableCell>
            <TableCell>{item.paymentReceived}</TableCell>
            <TableCell>{item.paymentTotal}</TableCell>
            <TableCell>
            <EditButton item={item} />
            <DeleteButton item={item} />
            </TableCell>
        </TableRow>)
      else 
      return (<TableRow>
            <TableCell>
                <TextField
                type="text"
                value={newData}
                onChange={(e) => setNewData(e.target.value)} />
            </TableCell>
            <TableCell>
                <TextField
                type="text"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)} />
            </TableCell>
            <TableCell>
                <TextField
                type="text"
                value={newPaymentReceived}
                onChange={(e) => setNewPaymentReceived(e.target.value)} />
            </TableCell>
            <TableCell>
                <TextField
                type="text"
                value={newPaymentTotal}
                onChange={(e) => setNewPaymentTotal(e.target.value)} />
            </TableCell>
            <TableCell>
                <EditButton item={item} />
            </TableCell>
      </TableRow>)
}

export {RowItem};