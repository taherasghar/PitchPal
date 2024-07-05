import React from "react";
import HostForm from "./components/HostForm";
import PopoverDialogLogin from "../../components/PopoverDialogLogin";

const Host = () => {
  return (
    <>
      <PopoverDialogLogin timeToPopup={1218} />
      <HostForm />
    </>
  );
};

export default Host;
