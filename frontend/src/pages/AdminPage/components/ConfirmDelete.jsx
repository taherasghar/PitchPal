import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useAuth from "../../../hooks/useAuth";

export default function ConfirmDelete({
  openConfirmDialog,
  setOpenConfirmDialog,
  triggerDeleteFunction,
}) {
  const [input, setInput] = React.useState("");
  const { auth } = useAuth();
  const handleClose = () => {
    setOpenConfirmDialog(false);
  };

  return (
    <React.Fragment>
      <Dialog open={openConfirmDialog} onClose={handleClose}>
        <DialogTitle>Confirm your action</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm deletion of selected users by typing 'CONFIRM'.
          </DialogContentText>
          <TextField
            autoFocus
            required
            autoComplete="off"
            margin="dense"
            id="name"
            name="input"
            type="text"
            onChange={(e) => setInput(e.target.value)}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="submit"
            disabled={input !== "CONFIRM"}
            onClick={() => {
              if (
                auth?.isAuthenticated &&
                auth?.role === "admin" &&
                input === "CONFIRM"
              ) {
                triggerDeleteFunction();
                handleClose();
              }
            }}
          >
            CONFIRM
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
