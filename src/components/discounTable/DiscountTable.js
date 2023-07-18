import React, { useState } from "react";
import { TableBody, TableCell, TableRow } from "@windmill/react-ui";
import { Avatar } from "@windmill/react-ui";
import DiscountServices from "services/DiscountServices";
import { useDispatch, useSelector } from "react-redux";
import { notifySuccess } from "utils/toast";
import CheckBox from "components/form/CheckBox";
import EditDeleteButton from "components/table/EditDeleteButton";
import useToggleDrawer from "hooks/useToggleDrawer";
import useDiscountSubmit from "hooks/useDiscountSubmit";
import DeleteModal from "components/modal/DeleteModal";
import { Link, useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import ReactTooltip from "react-tooltip";
import Tooltip from "components/tooltip/Tooltip";
import { FiZoomIn } from "react-icons/fi";
import { t } from "i18next";
import { setID } from "redux/Actions/SettingActions";

const DiscountTable = ({ isCheck, setIsCheck, data, click,handleUpd,update }) => {
  const { title, handleModalOpen, handleUpdate, serviceId } = useToggleDrawer();
  const { resData } = useDiscountSubmit(serviceId);

  const handleClick = (e) => {
    const { id, checked } = e.target;

    setIsCheck((prevIsCheck) => {
      if (checked) {
        return [...prevIsCheck, id];
      } else {
        return prevIsCheck.filter((item) => item !== id);
      }
    });
  };

  const handleUpdateDiscount = async (id) => {
    handleUpdate(id);
    handleUpd(true);
  };

  // const handleDeleteDiscount = async (id) => {
  //   await DiscountServices.deleteDiscount(id);
  //   notifySuccess("Deleted");
  // };

  // const resp = useAsync(DiscountServices.getAllDiscount);
  const ID = useSelector((state) => state.id);
  const dispatch=useDispatch()
  const getid = (id)=>{
    dispatch(setID(id))
    console.log(id)
  }

  const handleMouseOver = (customerId, index) => {
    setHoveredCustomerId(customerId);
    setCurrentcustomerIndex(index);
  };
  const handleMouseOverProduct = (customerId, index) => {
    setHoveredProductId(customerId);
    setCurrentcustomerIndex(index);
  };

  const handleMouseOut = () => {
    setHoveredCustomerId(null);
  };
  const handleMouseOutProducts = () => {
    setHoveredProductId(null);
  };

  const [hoveredCustomerId, setHoveredCustomerId] = useState(null);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [currentcustomerIndex, setCurrentcustomerIndex] = useState(null);

  const [avatarStartIndexes, setAvatarStartIndexes] = useState({});
  const [avatarStartIndexesProducts, setAvatarStartIndexesProducts] = useState(
    {}
  );

  const handleShowNextAvatarsCus = (id) => {
    setAvatarStartIndexes((prevIndexes) => ({
      ...prevIndexes,
      [id]: (prevIndexes[id] || 0) + 4,
    }));
  };

  const handleShowPreviousAvatarsCus = (id) => {
    setAvatarStartIndexes((prevIndexes) => ({
      ...prevIndexes,
      [id]: Math.max(prevIndexes[id] - 4, 0),
    }));
  };

  const handleShowNextAvatarsProducts = (id) => {
    setAvatarStartIndexesProducts((prevIndexes) => ({
      ...prevIndexes,
      [id]: (prevIndexes[id] || 0) + 4,
    }));
  };

  const handleShowPreviousAvatarsProducts = (id) => {
    setAvatarStartIndexesProducts((prevIndexes) => ({
      ...prevIndexes,
      [id]: Math.max(prevIndexes[id] - 4, 0),
    }));
  };

  return (
    <>
      {isCheck?.length === 1 && <DeleteModal id={ID} title={title} />}

      <TableBody>
        {Array.isArray(data?.discounts) &&
          data?.discounts?.map((dis, i) => {
            const avatarStartIndex = avatarStartIndexes[dis._id] || 0;
            const avatarStartIndexProducts =
              avatarStartIndexesProducts[dis._id] || 0;

            return (
              <TableRow key={i + 1}>
                {/* <TableCell>
                  <CheckBox
                    id={dis._id}
                    checked={isCheck?.includes(dis._id)}
                    onClick={handleClick}
                  />
                </TableCell> */}
                <TableCell>
                  {avatarStartIndex > 0 && (
                    <button
                      onClick={() => handleShowPreviousAvatarsCus(dis._id)}
                    >
                      Prev 4 cus
                    </button>
                  )}

                  <span>
                    {dis?.customers
                      ?.slice(avatarStartIndex, avatarStartIndex + 4)
                      .map((customer) => (
                        <React.Fragment key={customer._id}>
                          <div
                            style={{
                              border: "1px solid red",
                              width: "50px",
                              borderRadius: "50%",
                              display: "inline-flex",
                              justifyContent: "center",
                              alignItems: "center",
                              fontSize: "24px",
                              fontWeight: "bold",
                              backgroundColor: "#eaeaea",
                            }}
                            onMouseOver={() => handleMouseOver(customer._id, i)}
                            onMouseOut={handleMouseOut}
                          >
                            {customer.name.charAt(0).toUpperCase()}
                          </div>

                          {hoveredCustomerId === customer._id &&
                            currentcustomerIndex === i && (
                              <div>{customer.name}</div>
                            )}
                        </React.Fragment>
                      ))}
                  </span>

                  {avatarStartIndex + 4 < dis?.customers?.length && (
                    // <button onClick={() => handleShowNextAvatarsCus(dis._id)}>
                    //   Next 4 cust
                    // </button>
                    <div className="relative">
                    <button
                      className="tooltip-btn bg-green-500"
                      data-tip
                      data-for={`custom-tooltip-${i}`}
                      data-event="mouseenter focus"
                      data-event-off="mouseleave blur"
                    >
                      {avatarStartIndex ? 4 : avatarStartIndex + dis?.customers?.length}
                    </button>

                    <ReactTooltip
                        id={`custom-tooltip-${i}`}
                        effect="solid"
                        className="tooltip-container"
                      >
                        <div className="tooltip-content">
                          {dis.customers.map((customer) =>
                           <React.Fragment key={customer._id}>
                           <div
                             style={{
                               border: "1px solid red",
                               width: "50px",
                               borderRadius: "50%",
                               display: "inline-flex",
                               justifyContent: "center",
                               alignItems: "center",
                               fontSize: "24px",
                               fontWeight: "bold",
                               backgroundColor: "#eaeaea",
                             }}
                             onMouseOver={() => handleMouseOver(customer._id, i)}
                             onMouseOut={handleMouseOut}
                           >
                             {customer.name.charAt(0).toUpperCase()}
                           </div>
 
                           {hoveredCustomerId === customer._id &&
                             currentcustomerIndex === i && (
                               <div>{customer.name}</div>
                             )}
                         </React.Fragment>
                          )}
                             {/* <p>{dis.customer.map((customer) => customer.name).join(", ")}</p> */}
                        </div>
                      </ReactTooltip>
                     </div>
                  )}
                </TableCell>
                <TableCell>
                  {avatarStartIndexProducts > 0 && (
                    <button
                      onClick={() => handleShowPreviousAvatarsProducts(dis._id)}
                    >
                      Prev 4 products
                    </button>
                  )}

                  <span>
                    {dis?.products
                      ?.slice(
                        avatarStartIndexProducts,
                        avatarStartIndexProducts + 4
                      )
                      .map((product) => (
                        <React.Fragment key={product._id}>
                          <Avatar
                            src={product.image}
                            alt={product.title.en.charAt().toUpperCase()}
                            style={{
                              border: "1px solid blue",
                           
                            }}
                            onMouseOver={() =>
                              handleMouseOverProduct(product._id, i)
                            }
                            onMouseOut={handleMouseOutProducts}
                          />
                          

                          {hoveredProductId === product._id &&
                            currentcustomerIndex === i && (
                              <div>{product.title.en}</div>
                            )}
                            
                        </React.Fragment>
                      ))}
                  </span>

                  {avatarStartIndexProducts + 4 < dis?.products?.length && (
                    <button onClick={() => handleShowNextAvatarsProducts(dis._id)}>
                      Next 4 products
                    </button>
                  )}
                </TableCell>
                <TableCell>
                  <span className="text-sm">{dis?.discountPrice}</span>
                </TableCell>
                <TableCell>
                  <Link
                    to={`/discountDetails/${dis._id}`}
                    className="flex justify-center text-gray-400 hover:text-green-600"
                  > 
                  <button  onClick= {()=>{getid(dis?._id)}}>    
                    <Tooltip
                      id="view"
                      Icon={FiZoomIn}
                      title={t("DetailsTbl")}
                      bgColor="#10B981"
                    />
                    </button>
                  </Link>
                </TableCell>
                <TableCell>
                  <EditDeleteButton
                    id={dis._id}
                    disdata={resData}
                    title={dis.title}
                    handleModalOpen={handleModalOpen}
                    isCheck={isCheck}
                    product={dis}
                    parent={data}
                    handleUpdate={handleUpdateDiscount}
                  />
                </TableCell>
              </TableRow>
            );
          })}
      </TableBody>
    </>
  );
};

export default DiscountTable;
