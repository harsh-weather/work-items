import { Button } from '@mui/material';
import React from 'react'
import * as XLSX from 'xlsx';

const ExportReport = ({items}) => {

    const handleExportButtonClick = () => {
        // items.forEach(element => {
        //     console.log(element);
        // });
        console.log(items);
        const ws = XLSX.utils.json_to_sheet(items);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Work Items');
        XLSX.writeFile(wb, 'export.xlsx');
      };

      
  return (
    <Button variant="outlined" onClick={handleExportButtonClick}>Export to CSV</Button>
  )
}

export default ExportReport