import { SortOutlined } from "@mui/icons-material";
import {
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Tooltip,
} from "@mui/material";
import { Dispatch, MouseEvent, SetStateAction, useState } from "react";

type UserDetails = {
  readonly uid: string;
  readonly id: string;
  email: string;
  createdAt: string;
  status?: boolean;
};

interface User {
  users: Array<UserDetails>;
  setUsers: Dispatch<SetStateAction<Array<UserDetails> | null>>;
}

const Filter = ({ users, setUsers }: User) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const compareByDate = (user1: UserDetails, user2: UserDetails) => {
    const dateA = new Date(user1.createdAt);
    const dateB = new Date(user2.createdAt);

    if (dateA < dateB) {
      return -1;
    }
    if (dateA > dateB) {
      return 1;
    }
    return 0;
  };

  const sortByDate = () => {
    const sortedUsers = users.sort(compareByDate);
    setUsers((prevUsers): Array<UserDetails> | null => {
      if (prevUsers) {
        return [...sortedUsers];
      }
      return null;
    });
    handleClose();
  };

  const compareByEmail = (user1: UserDetails, user2: UserDetails) => {
    const user1Email = user1.email.toLowerCase();
    const user2Email = user2.email.toLowerCase();

    if (user1Email < user2Email) return -1;
    else if (user1Email > user2Email) return 1;
    return 0;
  };

  const sortByEmail = () => {
    const sortedUsers = users.sort(compareByEmail);
    setUsers((prevUsers): Array<UserDetails> | null => {
      if (prevUsers) {
        return [...sortedUsers];
      }
      return null;
    });
    handleClose();
  };

  return (
    <>
      <Tooltip title="Sort">
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          color="inherit"
          onClick={handleMenu}
          sx={{ ml: 2 }}
        >
          <SortOutlined />
        </IconButton>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{ mt: "50px", padding: 5 }}
      >
        <MenuList sx={{ width: 150 }}>
          <MenuItem onClick={sortByDate}>
            <ListItemText primary="Sort by date" />
          </MenuItem>
          <MenuItem onClick={sortByEmail}>
            <ListItemText primary="Sort by email" />
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default Filter;
