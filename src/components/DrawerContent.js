import React from 'react'
import { Box, List, ListItem,ListItemButton, ListItemText,ListItemIcon } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';

const DrawerContent = () => {
  return (
    <Box  sx={{paddingTop:'50px'}}>
    <List sx={{cursor:'pointer'}}>
    <ListItem>
    <ListItemButton sx={{ alignItems: 'center', height: '60px'}} disableRipple>
        <ListItemIcon>
          <AddCircleOutlineIcon sx={{ marginBottom: '2px' ,color:'#fff'}} />
        </ListItemIcon>
        <ListItemText primary="Add Image" />
      </ListItemButton>
      </ListItem>
      <ListItem>
      <ListItemButton sx={{ alignItems: 'center', height: '60px' }} disableRipple>
        <ListItemIcon>
          <FavoriteIcon sx={{ marginBottom: '2px',color:'#fff' }} />
        </ListItemIcon>
        <ListItemText primary="Favorites" />
      </ListItemButton>
      </ListItem>
       </List>
    </Box>
  )
}

export default DrawerContent
