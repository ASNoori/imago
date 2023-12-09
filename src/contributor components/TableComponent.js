import React from 'react';
import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Delete, Edit } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { mkConfig, generateCsv, download } from 'export-to-csv'; //or use your library of choice here

const csvConfig = mkConfig({
  fieldSeparator: ',',
  decimalSeparator: '.',
  useKeysAsHeaders: true,
  // Add an array of columns you want to include in the export
  includedColumns: ['id','title', 'name'],

});
// const TableComponent = ({ data, columns }) => {
//     const tableColumns = useMemo(() => columns, [columns]);

//     const table = useMaterialReactTable({
//       columns: tableColumns,
//       data,
//     });
//     return <MaterialReactTable table={table}/>;
// }

// Another Way to do this 
const TableComponent = (props) => {
  const handleExportData = () => {
     // Filter the data to include only the selected columns
     const filteredData = props.data.map((item) => {
      const filteredItem = {};
      csvConfig.includedColumns.forEach((column) => {
        filteredItem[column] = item[column];
      });
      return filteredItem;
    });

    const csv = generateCsv(csvConfig)(filteredData);
    download(csvConfig)(csv);
  };
    return (
    <Box p={5}>
     <MaterialReactTable
          columns={props.columns}
          data={props.data ?? []}
          // enableStickyHeader
          // enableClickToCopy
          enableEditing
          enableDensityToggle={false}
          enableColumnActions={true}
          positionActionsColumn="last"
          renderTopToolbarCustomActions={({ table }) => (
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
                p: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              <Button
                color="primary"
                onClick={handleExportData}
                startIcon={<FileDownloadIcon />}
                variant="contained"
              //   style={{ background: "#337dad" }}
              >
                Export All Data
              </Button>
            </Box>
          )}
          renderRowActions={({ row, table }) => (
            <>
              <Box sx={{ display: "flex", gap: "1rem", color: "red" }}>
                {props.isEdit ? (
                  <Tooltip arrow placement="right" title="Edit">
                    <IconButton
                      color="primary"
                      disableFocusRipple
                      onClick={() => props.onEdit(row?.original)}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                ) : (
                  ""
                )}
                <Tooltip arrow placement="right" title="Delete">
                  <IconButton
                    color="primary"
                    disableFocusRipple
                    onClick={() => props.confirmDialog(row?.original?.id)}
                  >
                    <Delete />
                  </IconButton>
                </Tooltip>
                  </Box>
            </>
          )}
      />  
  </Box>
    );
}

export default TableComponent