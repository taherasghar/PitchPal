import * as React from "react";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { blue } from "@mui/material/colors";
import LoginIcon from "@mui/icons-material/Login";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export function SimpleDialog(props) {
  const { open } = props;
  const nagivate = useNavigate();

  return (
    <Dialog open={open}>
      <DialogTitle>Login Required</DialogTitle>

      <List sx={{ pt: 0 }}>
        <ListItem disableGutters key={"Login"}>
          <ListItemButton
            onClick={() => {
              nagivate("/login");
            }}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <LoginIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={"Login"} />
          </ListItemButton>
        </ListItem>

        <ListItem disableGutters key={"Sign up"}>
          <ListItemButton
            onClick={() => {
              nagivate("/register");
            }}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonAddAltOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={"Create a new account"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}

export default function PopoverDialogLogin(props) {
  const [open, setOpen] = React.useState(false);
  const { auth } = useAuth();

  if (!auth?.isAuthenticated) {
    setTimeout(() => {
      setOpen(true);
    }, props.timeToPopup);
  }

  return (
    <div>
      <SimpleDialog open={open} />
    </div>
  );
}
