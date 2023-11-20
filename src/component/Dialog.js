import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
} from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function DialogBox({
  open,
  handleClose,
  dialogTitle = "",
  dialogContent,
  DialogActions = [],
}) {
  const handleCloseDialog = () => {
    handleClose();
  };
  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        {DialogActions.length ? (
          <DialogActions>
            {DialogActions.map((el) => (
              <Button variant={el?.variant || "outlined"} onClick={el?.onClick}>
                {el?.label}
              </Button>
            ))}
          </DialogActions>
        ) : null}
      </Dialog>
    </React.Fragment>
  );
}
