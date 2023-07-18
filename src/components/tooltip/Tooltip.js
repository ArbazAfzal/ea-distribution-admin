import React from "react";
import { useDispatch } from "react-redux";
import ReactTooltip from "react-tooltip";
import { setID } from "redux/Actions/SettingActions";

const Tooltip = ({ id, Icon, title, bgColor }) => {
  // const dispatch = useDispatch()
  // if (id) {
  //   dispatch(setID(id))
  // }
  return (
    <>
      <p data-tip data-for={id} className="text-xl">
        <Icon />
      </p>
      <ReactTooltip id={id} backgroundColor={bgColor}>
        <span className="text-sm font-medium">{title}</span>
      </ReactTooltip>
    </>
  );
};

export default Tooltip;
