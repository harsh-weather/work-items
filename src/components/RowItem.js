import {
  MenuItem,
  Select,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import SubmitButton from "./SubmitButton";
import { useState } from "react";
import { useSelector } from "react-redux";
import { menuItems as statusItems } from "../schema/statusItems";
import { mapping } from "../schema/masterSchema";

const RowItem = ({ item }) => {
  const [newData, setNewData] = useState(item.data);
  const [newStatus, setNewStatus] = useState(item.status);
  const [newPaymentReceived, setNewPaymentReceived] = useState(
    item.paymentReceived
  );
  const [newPaymentTotal, setNewPaymentTotal] = useState(item.paymentTotal);

  const editItem = useSelector((state) => state.edit.editItem);
  const cols = Object.keys(mapping);

  if (item.key !== editItem)
    return (
      <TableRow>
        {cols.map((c) => (
          <TableCell>{item[c]}</TableCell>
        ))}
        <TableCell>
          <EditButton item={item} />
          <DeleteButton item={item} />
        </TableCell>
      </TableRow>
    );
  else
    return (
      <TableRow>
        <TableCell>
          <TextField
            type="text"
            value={newData}
            onChange={(e) => setNewData(e.target.value)}
          />
        </TableCell>
        <TableCell>
          <Select
            id="simple-select-status"
            value={newStatus}
            label="Age"
            onChange={(e) => setNewStatus(e.target.value)}
          >
            {statusItems.map((menuItem) => (
              <MenuItem value={menuItem}>{menuItem}</MenuItem>
            ))}
          </Select>
        </TableCell>
        <TableCell>
          <TextField
            type="text"
            value={newPaymentReceived}
            onChange={(e) => setNewPaymentReceived(e.target.value)}
          />
        </TableCell>
        <TableCell>
          <TextField
            type="text"
            value={newPaymentTotal}
            onChange={(e) => setNewPaymentTotal(e.target.value)}
          />
        </TableCell>
        <TableCell>
          <SubmitButton
            item={item}
            newData={newData}
            newStatus={newStatus}
            newPaymentReceived={newPaymentReceived}
            newPaymentTotal={newPaymentTotal}
          />
        </TableCell>
      </TableRow>
    );
};

export { RowItem };
