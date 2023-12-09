// DrawerComponent.js
import React , { useState }from 'react';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {List,ListItemButton,ListItemIcon} from '@mui/material';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MenuIcon from '@mui/icons-material/Menu';


const DrawerComponent = ({ isOpen, onClose, children }) => {
    const [showIconsOnly, setShowIconsOnly] = useState(false);
    const [showText, setShowText] = useState(true);
    const toggleIconsView = () => {
      setShowIconsOnly(!showIconsOnly);
      setShowText(!showText);
    }
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
      {showText && <IconButton
        sx={{ position: 'absolute', top: '2px', right: '8px', color: 'white' }}
        onClick={onClose}
        aria-label="close drawer"
      >
        <CloseIcon />
      </IconButton>}
      {showIconsOnly ? (
        <List sx={{ cursor: 'pointer',top:'30px'}}>
          <ListItemButton sx={{ alignItems: 'center', height: '60px', justifyContent: 'space-between' }}>
            <ListItemIcon>
              <AddCircleOutline sx={{padding:'10px', marginBottom: '2px',color:'#fff',fontSize:'2rem' }} />
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton sx={{ alignItems: 'center', height: '60px', justifyContent: 'space-between' }}>
            <ListItemIcon>
              <FavoriteIcon sx={{padding:'10px', marginBottom: '2px',color:'#fff',fontSize:'2rem' }} />
            </ListItemIcon>
          </ListItemButton>
        </List>
      ) : (
        // Display icons with text
      <div>
      {children}
      </div>
      )}
      {/* Toggle button to switch between icons-only and icons-with-text views */}
      <IconButton 
        sx={{ position: 'absolute', top: '8px', left: '20px', color: 'white',fontSize:'10px',fontWeight:'bold' }}
        onClick={toggleIconsView}
        aria-label="toggle icons view"
      >
        {showIconsOnly ? <MenuIcon/> : <MenuIcon/>}
      </IconButton>
    </Drawer>
  );
};

export default DrawerComponent;
