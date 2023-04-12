import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export default function SecondarySideDrawer({ secondaryDrawerList, setShowSecondaryDrawer, showSecondaryDrawer }) {
  const clubNames = ['האקדמיה של דודי סלע'];

  const openPrimaryDrawer = () => {
    setShowSecondaryDrawer(false);
    const clickEvent = new MouseEvent("click", {
      "view": window,
      "bubbles": true,
      "cancelable": false
    });
    const el = document.getElementById("toggle-primary-drawer")
    el.dispatchEvent(clickEvent);
  }


  const list = () => (
    <Box
      sx={{ width: '30vw' }}
      role="presentation"
    >
      <List>
        {clubNames.map((clubName) => (
          <ListItem key={clubName} className="flex align-right justify-between" style={{ gap: "1.5rem" }}>
            <Box className='toggle-secondary-drawer'>
              <img src='https://res.cloudinary.com/primap/image/upload/v1681249188/arrow-back_ax3ffu.svg' alt="arrow-left" onClick={() => openPrimaryDrawer()} style={{ maxWidth: "1.3rem" }} />
            </Box>
            <ListItemText primary={clubName} className='drawer-club-name' style={{ textAlign: 'right', whiteSpace: "nowrap" }} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {secondaryDrawerList.map(listItem => (
          <ListItem key={listItem.text} disablePadding onClick={(e) => listItem.onClick(e)}>
            <ListItemButton>
              <ListItemIcon>
                <img src={listItem.icon} alt={`${listItem.text}`} className='drawer-icon' />
              </ListItemIcon>
              <ListItemText primary={listItem.text} className='drawer-list-text' style={{ textAlign: 'right' }} />
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
        open={showSecondaryDrawer}
        onClose={() => setShowSecondaryDrawer(false)}
      >
        {list('right')}
      </Drawer>
    </>
  );
}