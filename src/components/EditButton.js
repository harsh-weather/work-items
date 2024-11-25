import { Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setEdit } from "../features/editSlice";

const EditButton = ({ item }) => {
  const editItem = useSelector((state) => state.edit.editItem);
  const dispatch = useDispatch();

  const handleEditClick = () => {
    if (editItem) {
      console.log("cannot edit.", editItem);
      return;
    }

    dispatch(setEdit(item));
    console.log(`${item.key} is logged for edit.`);
  };

  return (
    <div>
      <Button sx={{ m: 2 }} variant="outlined" onClick={handleEditClick}>
        EDIT
      </Button>
    </div>
  );
};

export default EditButton;
