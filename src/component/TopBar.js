import React, { useState } from "react";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import { Tooltip } from "@mui/material";
import DialogBox from "./Dialog";

const TopBar = () => {
  const [open, setOpen] = useState(false);
  const handleHelpClick = () => {
    setOpen((prev) => !prev);
  };
  return (
    <div className="topbar_container">
      <Tooltip title="Help" arrow>
        <ContactSupportIcon className="help_icon" onClick={handleHelpClick} />
      </Tooltip>
      {open && <DialogBox open={open} handleClose={handleHelpClick} />}
    </div>
  );
};
export default TopBar;
