import { Button } from "@mui/material";
import {  db, ref, remove } from '../firebase/firebase';
import { triggerRefresh } from "../features/refreshSlice";
import { useDispatch } from "react-redux";


const DeleteButton = ({item}) => {
    const dispatch = useDispatch();

    const deleteAction = () => {
        console.log(`${item.key} is logged and deleted.`);
        const deleteRef = ref(db, "items/"+item.firebaseId);
        remove(deleteRef)
        .then(() => {
            dispatch(triggerRefresh());
            console.log(`${item.data} is deleted successfully.`);
        })
        .catch(e => {
            alert(`Error occurred while deleting ${item.data}`, e);
        })
    }

    return (
        <Button variant="outlined" onClick={deleteAction}>
            Delete
        </Button>
    )
}

export default DeleteButton;