import { Button } from "@mui/material";

const EditButton = ({item}) => {
    const handleButtonClick = () => {
        item.isEdit = !item.isEdit;
        console.log(`${item.key} is logged and edit flag is ${item.isEdit}`);
        
    }

    return (
        <Button sx={{m: 2}} variant ="outlined" onClick={handleButtonClick}>
            EDIT
        </Button>
    )
}

export default EditButton;