import React, { useState } from "react";
import { TableBody, TableCell, TableRow } from "@windmill/react-ui";
import MainDrawer from "components/drawer/MainDrawer";
import ProductDrawer from "components/drawer/ProductDrawer";
import CheckBox from "components/form/CheckBox";
import DeleteModal from "components/modal/DeleteModal";
import EditDeleteButton from "components/table/EditDeleteButton";
import useToggleDrawer from "hooks/useToggleDrawer";
import useAsync from "hooks/useAsync";
import DiscountServices from "services/DiscountServices";
import useDiscountSubmit from "hooks/useDiscountSubmit";
import { notifySuccess } from "utils/toast";
import { useSelector } from "react-redux";
import { Avatar } from "@windmill/react-ui";
const DiscountTable = ({
  products,
  isCheck,
  setIsCheck,
  currency,
  lang,
  data,
  click,
}) => {
  console.log("🚀 ~ file: DiscountTable.js:21 ~ DiscountTable ~ data:", data);
  const {
    title,
    itemId,
    handleModalOpen,
    handleUpdate,
    isSubmitting,
    serviceId,
  } = useToggleDrawer();
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
    click();
  };

  const handleDeleteDiscount = async (id) => {
    await DiscountServices.deleteDiscount(id);
    notifySuccess("Deleted");
  };
  

  const resp = useAsync(DiscountServices.getAllDiscount);
  const ID = useSelector((state) => state.id);

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  return (
    <>
      {isCheck?.length === 1 && <DeleteModal id={ID} title={title} />}

      <TableBody>
        {Array.isArray(data?.discounts) &&
          data?.discounts?.map((dis, i) => (
            <TableRow key={i + 1}>
              <TableCell>
            
              </TableCell>
              <TableCell>
                <span>
                  {dis?.customers?.map((i) => (
                    <Avatar
                      onMouseOver={handleMouseOver}
                      onMouseOut={handleMouseOut}
                      className="bg-indigo-500 "
                    >
                      {i}
                    </Avatar>
                  ))}
                  {isHovering && (
                    <div>
                      {dis?.customers?.map(
                        (i) => i?.name
                      )}
                    </div>
                  )}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-sm">{dis?.products?.[0]?.title?.en}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">{dis?.discountPrice}</span>
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
                  handleDelete={handleDeleteDiscount}
                  handleUpdate={handleUpdateDiscount}
                />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </>
  );
};

export default DiscountTable;
