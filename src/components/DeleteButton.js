import { Button } from "@mui/material";

const DeleteButton = ({item}) => {
    const deleteAction = () => {
        console.log(`${item.key} is logged and deleted.`);
    }

    return (
        <Button variant="outlined" onClick={deleteAction}>
            Delete
        </Button>
    )
}

export default DeleteButton;