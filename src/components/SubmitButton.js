import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { clearEdit } from "../features/editSlice";
import {  db, ref, set } from '../firebase/firebase';
import { triggerRefresh } from "../features/refreshSlice";


const SubmitButton = (props) => {
    const dispatch = useDispatch();
    
        const handleSubmitClick = () => {
        console.log("onSubmit", props.item);
        const newWorkItem = {
            data: props.newData,
            id: props.item.key,
            key: props.item.key,
            paymentReceived: props.newPaymentReceived,
            paymentTotal: props.newPaymentTotal,
            status: props.newStatus,
            firebaseId: props.item.firebaseId,
        }
        dispatch(clearEdit());
        
        const newRef = ref(db, "items/"+newWorkItem.firebaseId);
        set(newRef, {...newWorkItem})
        .then(() => {
        // alert(`Item ${newWorkItem.data} is updated.`);
        dispatch(triggerRefresh());
        })
        .catch((e) => {
            alert("Error while writing to backend: ", e);
        });
    }

    return (<div>
        <Button sx={{m: 2}} variant ="outlined" onClick={handleSubmitClick}>
            SUBMIT
        </Button>
        </div>
    )
}

export default SubmitButton;