import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { GridMenuIcon } from '@mui/x-data-grid';

export default function ClubSideDrawer({ clubOptions, optionFuncs, optionIcons, showClubDetails, setShowClubDetails }) {
  const openMainDrawer = () => {
    const clickEvent = new MouseEvent("click", {
      "view": window,
      "bubbles": true,
      "cancelable": false
    });
    const el = document.getElementById("toggle-main-drawer")
    el.dispatchEvent(clickEvent);
  }
  const list = () => (
    <Box
      sx={{ width: 'auto' }}
      role="presentation"
    >
      <List>
        {['האקדמיה של דודי סלע'].map((text, index) => (
          <ListItem key={text}>
            <Box className="flex align-right justify-between">
              <GridMenuIcon onClick={() => openMainDrawer()} />
            </Box>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {clubOptions.map((text, index) => (
          <ListItem key={text} disablePadding onClick={(e) => optionFuncs[index](e, index)}>
            <ListItemButton>
              <ListItemIcon>
                <img alt={optionIcons[index]} src={optionIcons[index]} className="drawer-icon" />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Drawer
        anchor='right'
        variant='permanent'
        open={showClubDetails}
        onClose={() => setShowClubDetails(false)}
      >
        {list('right')}
      </Drawer>
    </>
  );
}