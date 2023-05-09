import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

const options = ['קדם קבסו','אור','סער','אמיר','גיל','ירון','גלעד'];

export const ParticipantsList = ({participants, setParticipants}) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleClick = () => {
    };

    const handleMenuItemClick = (event, option) => {
        const _participants = JSON.parse(JSON.stringify(participants));
        if (_participants.includes(option)) {
            const index = participants.indexOf(option);
            _participants.splice(index, 1); // 2nd parameter means remove one item only
        } else {
            _participants.push(option)
        }
        setParticipants(_participants);
        setOpen(false);
    };

    const handleSelectOption = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    return (
        <>
            <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                <Button onClick={handleSelectOption}>הוספת משתתפים</Button>
                <Button
                    size="small"
                    aria-controls={open ? 'split-button-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-label="select merge strategy"
                    aria-haspopup="menu"
                    onClick={handleSelectOption}
                >
                    <ArrowDropDownIcon />
                </Button>
            </ButtonGroup>
            <Popper
                sx={{
                    zIndex: 1,
                }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu" autoFocusItem>
                                    {options.map((option, index) => (
                                        <MenuItem
                                            selected={participants.includes(option)}
                                            key={option}
                                            onClick={(event) => handleMenuItemClick(event, option)}
                                        >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
}
{/* <MenuItem //TODO
disabled={index === 2}
selected={index === participants} */}
