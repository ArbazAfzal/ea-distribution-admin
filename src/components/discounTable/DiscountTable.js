
import React from "react";
import {
  TableBody,
  TableCell,
  TableRow,
} from "@windmill/react-ui";
import MainDrawer from "components/drawer/MainDrawer";
import ProductDrawer from "components/drawer/ProductDrawer";
import CheckBox from "components/form/CheckBox";
import DeleteModal from "components/modal/DeleteModal";
import EditDeleteButton from "components/table/EditDeleteButton";
import useToggleDrawer from "hooks/useToggleDrawer";
import useAsync from "hooks/useAsync";
import DiscountServices from "services/DiscountServices";
import { Id } from "react-flags-select";
import DiscountDrawer from "components/drawer/DiscountDrawer";
import useDiscountSubmit from "hooks/useDiscountSubmit";

const DiscountTable = ({ products, isCheck, setIsCheck, currency, lang, data }) => {
  // const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  const {
    title,
    itemId,
    handleModalOpen,
    handleUpdate,
    isSubmitting,
    serviceId
  } = useToggleDrawer();
  console.log(serviceId,"&&&&&&&&&&&&&&&&&&&&&&&&&&&")
  const {
    id
  } = useDiscountSubmit();
  const handleClick = (e) => {
    const { id, checked } = e.target;
    console.log("id", id, checked);

    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };
  const handleUpdateDiscount =  async (id) => {
    // Add the logic for updating discounts here
    handleUpdate()
    const res= await (DiscountServices.getDiscountById(id))
    console.log(res,"reshjdgjhgjbkjbkbjkbf");
    console.log(id,"&^%$$$$$$$")
  };
  const resp = useAsync(DiscountServices.getAllDiscount)
  
  const Ids = Array.isArray(resp.data.discounts) && resp.data.discounts.map((i) => {

    return i?._id

  }
  )
  // console.log("🚀 ~ file: DiscountTable.js:113 ~ Ids ~ Ids:", Ids)
  console.log(serviceId, "------------")

  return (
    <>
      {isCheck?.length < 1 && <DeleteModal id={serviceId} title={title} />}

      {isCheck?.length < 2 && (
        <MainDrawer>
          <DiscountDrawer id={serviceId} />
        </MainDrawer>
      )}

      <TableBody>
        {Array.isArray(data?.discounts) &&
          data?.discounts?.map((dis, i) => (
            <TableRow key={i + 1}>
              <TableCell>
                <CheckBox type="checkbox" />
              </TableCell>
              <TableCell>
                <span className="text-sm">
                  {dis?.customers?.[0]?.name}
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
                  id={dis?._id}
                  title={dis.title}
                  handleModalOpen={handleModalOpen}
                  isCheck={isCheck}
                  discount={dis}
                  handleUpdateDiscount={handleUpdateDiscount}
                />
               
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </>
  );
};

export default DiscountTable;
