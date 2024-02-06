import {
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  useMediaQuery,
} from "@mui/material";
import AvatarIcon from "@mui/material/Avatar";
import { AccountCircleOutlined, Logout } from "@mui/icons-material";
import { MouseEvent, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { ErrorAlert, SuccessAlert } from "./Alert";

export default function Avatar() {
  const navigate = useNavigate();
  const phone = useMediaQuery("(max-width:600)");
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const logOut = async () => {
    setLoggingOut(true);
    await signOut(auth)
      .then(() => {
        navigate("/auth/signin");
        SuccessAlert("You're now logged out!");
      })
      .catch(() => ErrorAlert("Something went wrong!"));
    setLoggingOut(false);
  };
  return (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
        onClick={handleMenu}
        sx={{ ml: 2 }}
      >
        <AccountCircleOutlined
          fontSize={phone ? "medium" : "large"}
          sx={{ color: "#000" }}
        />
      </IconButton>
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
        <MenuList sx={{ width: 200 }}>
          <MenuItem onClick={handleClose}>
            <AvatarIcon
              sx={{ mr: 1, height: phone ? 26 : 36, width: phone ? 26 : 36 }}
            />{" "}
            Profile
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <AvatarIcon
              sx={{ mr: 1, height: phone ? 26 : 36, width: phone ? 26 : 36 }}
            />{" "}
            My Account
          </MenuItem>
          <Divider />
          <MenuItem disabled={loggingOut} onClick={logOut}>
            <ListItemIcon>
              <Logout color="error" fontSize={phone ? "small" : "medium"} />
            </ListItemIcon>
            <ListItemText>
              <Typography color="error">
                {loggingOut ? "Logging Out..." : "Logout"}
              </Typography>
            </ListItemText>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}
