// DrawerComponent.js
import React from 'react';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';



const SideBar = ({ isOpen, onClose, children }) => {

  return (

    <Drawer
      anchor="left" // Change the anchor if needed (e.g., "right" for a right-side drawer)
      open={isOpen}
      onClose={onClose}
      sx={{
        // width:'250px',
        '& .MuiPaper-root': {
          backgroundColor: '#27272e', // Background color of the Drawer
          color:'white',
        },
      }}
    >
          {/* Close icon */}
     <IconButton
        sx={{ position: 'absolute', top: '2px', right: '8px', color: 'white' }}
        onClick={onClose}
        aria-label="close drawer"
      >
        <CloseIcon />
        </IconButton>
        {/* // Display icons with text */}
      {children}
    </Drawer>
  );
};

export default SideBar;
