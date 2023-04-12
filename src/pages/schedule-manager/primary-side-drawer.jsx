import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { GridMenuIcon } from '@mui/x-data-grid';

export default function PrimarySideDrawer({ primaryDrawerList, setShowPrimaryDrawer, openDrawerComponent }) {
  const [state, setState] = useState({ right: false });
  const clubNames = ['האקדמיה של דודי סלע'];

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : '30vw', paddingInline: '1vw' }}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {clubNames.map((clubName) => (
          <ListItem key={clubName} className="flex align-right justify-between" style={{ gap: "1.5rem" }}>
            <Box>
              <GridMenuIcon onClick={() => setShowPrimaryDrawer(false)} className='toggle-primary-drawer' />
            </Box>
            <ListItemText primary={clubName} className='drawer-club-name' style={{ textAlign: 'right', whiteSpace: "nowrap" }} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {primaryDrawerList.map(listItem => (
          <ListItem
            key={listItem.text}
            role='button'
            disablePadding
            onClick={() => openDrawerComponent(listItem.className)}
          >
            <ListItemButton className={listItem.className}>
              <ListItemIcon>
                <img src={listItem.icon} alt={`${listItem.text}`} className='drawer-icon' />
              </ListItemIcon>
              <span
                className={listItem.className}
                style={{ textAlign: 'right' }}
              >{listItem.text}</span>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Box className='flex align-right justify-between'>
        <GridMenuIcon id='toggle-primary-drawer' className='toggle-primary-drawer' onClick={toggleDrawer('right', true)} />
      </Box>
      <Drawer
        anchor='right'
        open={state['right']}
        onClose={toggleDrawer('right', false)}
      >
        {list('right')}
      </Drawer>
    </>
  );
}