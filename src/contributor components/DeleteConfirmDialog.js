import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Typography from '@mui/material/Typography';
import CloseIcon from "@mui/icons-material/Close";

const DeleteConfirmDialog = ({id,open,onClose,onDelete }) => {
  return (
    <Dialog id={id} open={open}>
      <DialogTitle sx={{display:'flex',justifyContent:'space-between'}}>
        Confirm Delete
      <CloseIcon onClick={onClose} sx={{ color: "black"}}/>
      </DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete this item?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button color="success" onClick={onClose}>
          Cancel
        </Button>
        <Button color="error" id={id} onClick={() => onDelete(id)}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
