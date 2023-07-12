import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "context/SidebarContext";
import { useDispatch, useSelector } from "react-redux";
import { setID } from "redux/Actions/SettingActions";


const useToggleDrawer = () => {
  const [serviceId, setServiceId] = useState("");
  const [allId, setAllId] = useState([]);
  const [title, setTitle] = useState("");
  const { toggleDrawer, isDrawerOpen, toggleModal, toggleBulkDrawer, } =
    useContext(SidebarContext);
    const id = useSelector((state) => state.id);
    const dispatch = useDispatch();
  const handleUpdate = (id) => {
    setServiceId(id);
    toggleDrawer();
    dispatch(setID(id));

  };


  const handleUpdateMany = (id) => {
    setAllId(id);
    toggleBulkDrawer();
  };

  const handleModalOpen = (id, title) => {
    setServiceId(id);
    toggleModal(id);
    setTitle(title);

  };

  useEffect(() => {
    if (!isDrawerOpen) {
      dispatch(setID(""))
      setServiceId();
    }
  }, [isDrawerOpen]);

  const handleDeleteMany = async (id, products) => {
    setAllId(id);
    toggleModal();
    setTitle("Selected Products");
  };

  return {
    title,
    allId,
    serviceId,
    handleUpdate,
    setServiceId,
    handleModalOpen,
    handleDeleteMany,
    handleUpdateMany,
  };
};

export default useToggleDrawer;
