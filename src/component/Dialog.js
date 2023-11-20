import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function DialogBox({
  open,
  handleClose,
  dialogTitle = "",
  dialogContent = null,
  DialogAction = [],
  dialogStyle = {},
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
        aria-describedby="dialog-description"
      >
        <div className="dialog">
          <div className="dialog_header">
            <DialogTitle style={{ fontFamily: "inherit" }}>
              {dialogTitle}
            </DialogTitle>
            <CloseIcon
              style={{ cursor: "pointer" }}
              onClick={handleCloseDialog}
            />
          </div>
          <DialogContent>{dialogContent}</DialogContent>
          {DialogAction.length ? (
            <DialogActions>
              {DialogAction.map((el) => (
                <Button
                  variant={el?.variant || "outlined"}
                  onClick={el?.onClick}
                >
                  {el?.label}
                </Button>
              ))}
            </DialogActions>
          ) : null}
        </div>
      </Dialog>
    </React.Fragment>
  );
}
