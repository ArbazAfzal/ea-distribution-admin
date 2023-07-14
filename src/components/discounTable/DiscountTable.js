import React, { useState } from "react";
import { TableBody, TableCell, TableRow } from "@windmill/react-ui";

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
  
  isCheck,
  setIsCheck,

  data,
  click,
}) => {
  const {
    title,
    handleModalOpen,
    handleUpdate,

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

  const [hoveredCustomerId, setHoveredCustomerId] = useState(null);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [currentcustomerIndex, setCurrentcustomerIndex] = useState(null);
  const [currentProductIndex, setCurrentProductIndex] = useState(null);

  const handleMouseOver = (customerId, index) => {
    setHoveredCustomerId(customerId);
    setCurrentcustomerIndex(index);
  };
  console.log("object::::,", currentcustomerIndex);
  const handleMouseOverProducts = (productId,i) => {
    setHoveredProductId(productId);
    setCurrentProductIndex(i)
  };

  const handleMouseOut = () => {
    setHoveredCustomerId(null);
  };
  const handleMouseOutProducts = () => {
    setHoveredProductId(null);
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
              {console.log(dis, "---------")}
              <TableCell>
                <span>
                  {dis?.customers?.map((customer) => (
                    <React.Fragment key={customer._id}>
                      <Avatar
                        style={{ border: "1px solid red" }}
                        onMouseOver={() => handleMouseOver(customer._id, i)}
                        onMouseOut={handleMouseOut}
                      >
                        {customer.name.charAt(0)}
                      </Avatar>
                      {hoveredCustomerId === customer._id &&
                      currentcustomerIndex == i ? (
                        <div>{customer.name}</div>
                      ) : (
                        ""
                      )}
                    </React.Fragment>
                  ))}
                </span>
              </TableCell>

              <TableCell>
                <span>
                  {dis?.products?.map((product) => (
                    <React.Fragment key={product._id}>
                      <Avatar
                        onMouseOver={() => handleMouseOverProducts(product._id,i)}
                        onMouseOut={handleMouseOutProducts}
                      >
                        {product.title.en}
                      </Avatar>
                      {hoveredProductId === product._id && currentProductIndex===i && (
                        <div>{product.title.en}</div>
                      )}
                    </React.Fragment>
                  ))}
                </span>
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


