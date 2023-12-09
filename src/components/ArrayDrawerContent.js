import React from 'react';
import { Box, List, ListItem, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';

const drawerItems = [
  {
    icon: <AddCircleOutlineIcon sx={{ marginBottom: '2px', color: '#fff' }} />,
    text: 'Add Image',
    link: '/contributor',
  },
  {
    icon: <FavoriteIcon sx={{ marginBottom: '2px', color: '#fff' }} />,
    text: 'Favorites',
    link: '/favorites',
  },
  {
    icon: <PersonIcon sx={{ marginBottom: '2px', color: '#fff' }} />,
    text: 'Become a contributor',
    link: '/contributor',
  },
  // {
  //   icon: <FavoriteIcon sx={{ marginBottom: '2px', color: '#fff' }} />,
  //   text: 'Favorites',
  //   link: '/contributor',
  // },
];

const ArrayDrawerContent = () => {
  return (
    <Box sx={{ paddingTop: '50px' }}>
      <List sx={{ cursor: 'pointer'}}>
        {drawerItems.map((item, index) => (
          <ListItem key={index}>
            <ListItemButton sx={{ alignItems: 'center', height: '60px',':hover': { backgroundColor: '#333' }}} disableRipple>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <Link to={item.link} style={{ textDecoration: 'none', color: 'white' }}>
              <ListItemText primary={item.text}  sx={{color:'white'}}/>
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ArrayDrawerContent;
