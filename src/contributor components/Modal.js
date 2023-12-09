import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from "@mui/icons-material/Close";

const MaterialModal = ({ title,open, onClose, children }) => {

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle sx={{display:'flex',justifyContent:'space-between',marginRight:'20px', marginTop:'20px'}}>
          {title}
          <CloseIcon onClick={onClose} sx={{ color: "black"}}/>
          </DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
             
      </Dialog>

    </>
  )
}

export default MaterialModal


