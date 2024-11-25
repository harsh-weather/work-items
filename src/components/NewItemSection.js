import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { push, ref, set } from "firebase/database";
import { useState } from "react";
import { db } from "../firebase/firebase";
import { useDispatch } from "react-redux";
import { triggerRefresh } from "../features/refreshSlice";
import { punctuateAmount } from "../utils";
import { menuItems } from "../schema/statusItems";

const NewItemSection = () => {
  const [newData, setNewData] = useState();
  const [newStatus, setNewStatus] = useState("Received File");
  const [newPaymentReceived, setNewPaymentReceived] = useState(0);
  const [newPaymentTotal, setNewPaymentTotal] = useState(0);

  const refreshDispatch = useDispatch();

  const clearNewFormData = () => {
    setNewData("");
    setNewStatus("Received File");
    setNewPaymentReceived(0);
    setNewPaymentTotal(0);
  };

  /** TODO:
   * 1. Clear form data after submission
   * 2. Try to find a way to parametrize the 'new' data variables so that they can follow the mapping2 schema.
   * 3.
   */

  const addNewItem = async (e) => {
    e.preventDefault();

    const uuid = new Date().getTime();
    const newTodo = {
      key: uuid,
      id: uuid,
      data: newData,
      status: newStatus,
      paymentReceived: newPaymentReceived,
      paymentTotal: newPaymentTotal,
    };

    console.log(`${newTodo.key} added to DB.`);

    const newRef = push(ref(db, "items"));
    set(newRef, { ...newTodo })
      .then(() => {
        refreshDispatch(triggerRefresh());

        alert(`${newTodo.data} saved successfully.`);
        clearNewFormData();
      })
      .catch((e) => {
        console.error("Error while writing to Firebase: ", e);
      });
  };

  return (
    <Card variant="outlined" sx={{ gap: 1, width: 1 }}>
      <CardContent>
        <form onSubmit={addNewItem}>
          <FormLabel>Work Item:</FormLabel>
          <br />
          <TextField
            type="text"
            value={newData}
            onChange={(e) => setNewData(e.target.value)}
            // onSubmit={setNewData("")}
          />
          <p />
          <FormLabel>Enter Status:</FormLabel>
          <p />
          <FormControl>
            <Select
              id="simple-select-status"
              value={newStatus}
              label="Age"
              onChange={(e) => setNewStatus(e.target.value)}
            >
              {menuItems.map((menuItem) => (
                <MenuItem value={menuItem}>{menuItem}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <p />
          <FormLabel>Received Payment:</FormLabel>
          <br />
          <TextField
            type="text"
            value={newPaymentReceived}
            onChange={(e) => setNewPaymentReceived(Number(e.target.value) || 0)}
          />
          <p />
          <FormLabel>Total Amount:</FormLabel>
          <br />
          <TextField
            type="text"
            value={punctuateAmount(newPaymentTotal)}
            onChange={(e) => setNewPaymentTotal(Number(e.target.value) || 0)}
          />
          <p />
          <Button variant="outlined" type="submit">
            Add Work Item
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewItemSection;
