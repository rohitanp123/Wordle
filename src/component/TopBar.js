import React, { useState } from "react";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import { Tooltip, Typography } from "@mui/material";
import DialogBox from "./Dialog";

const TopBar = () => {
  const [open, setOpen] = useState(false);
  const handleHelpClick = () => {
    setOpen((prev) => !prev);
  };
  return (
    <div className="topbar_container">
      {/* <Tooltip title="Help" arrow>
        <ContactSupportIcon
          className="help_icon"
          onClick={handleHelpClick}
          style={{ width: "36px", height: "36px" }}
        />
      </Tooltip> */}
      {open && (
        <DialogBox
          open={open}
          handleClose={handleHelpClick}
          dialogTitle="HOW TO PLAY"
          titleStyle={{
            titleAlign: "center",
            fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
            color: "var(--green--)",
            fontWeight: "bold",
          }}
          dialogContent={
            <div>
              <Typography></Typography>
            </div>
          }
        />
      )}
    </div>
  );
};
export default TopBar;
