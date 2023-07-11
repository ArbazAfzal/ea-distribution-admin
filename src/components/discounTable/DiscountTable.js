
// import React, { useState } from "react";
// import {
//   TableBody,
//   TableCell,
//   TableRow,
// } from "@windmill/react-ui";
// import MainDrawer from "components/drawer/MainDrawer";
// import ProductDrawer from "components/drawer/ProductDrawer";
// import CheckBox from "components/form/CheckBox";
// import DeleteModal from "components/modal/DeleteModal";
// import EditDeleteButton from "components/table/EditDeleteButton";
// import useToggleDrawer from "hooks/useToggleDrawer";
// import useAsync from "hooks/useAsync";
// import DiscountServices from "services/DiscountServices";
// import { Id } from "react-flags-select";
// import DiscountDrawer from "components/drawer/DiscountDrawer";
// import useDiscountSubmit from "hooks/useDiscountSubmit";

// const DiscountTable = ({ products, isCheck, setIsCheck, currency, lang, data }) => {

//   const [res,sertRes]=useState()
//   const [response,sertResp]=useState()
//   console.log("🚀 ~ file: DiscountTable.js:24 ~ DiscountTable ~ response:", response)
//   console.log("🚀 ~ file: DiscountTable.js:23 ~ DiscountTable ~ res:", res?._id)
//   // const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
//   const {
//     title,
//     itemId,
//     handleModalOpen,
//     handleUpdate,
//     isSubmitting,
//     serviceId
//   } = useToggleDrawer();
//   console.log(serviceId,"&&&&&&&&&&&&&&&&&&&&&&&&&&&")
//   const {
//     register,
//     handleSubmit,
//     onSubmit,
//     errors,
//     checked,
//     setChecked,
//   } = useDiscountSubmit(serviceId,res);
//   const handleClick = (e) => {
//     const { id, checked } = e.target;
//     console.log("id", id, checked);

//     setIsCheck([...isCheck, id]);
//     if (!checked) {
//       setIsCheck(isCheck.filter((item) => item !== id));
//     }
//   };
//   const handleUpdateDiscount =  async (id) => {
//     // Add the logic for updating discounts here
//     handleUpdate(id)
//     const res= await (DiscountServices.getDiscountById(id))
//     sertRes(res)
  
//   };
//   const handleDelDiscount =  async (id) => {
//     // Add the logic for updating discounts here
//     const res= await (DiscountServices.deleteDiscount(id))
//     sertResp(id)
  
//   };
//   const resp = useAsync(DiscountServices.getAllDiscount)
  
  
//   return (
//     <>
//       {isCheck?.length < 1 && <DeleteModal disId={res} title={title} />}

//       {isCheck?.length < 2 && (
//         <MainDrawer>
//           <DiscountDrawer id={serviceId} res={res}/>
//         </MainDrawer>
//       )}

//       <TableBody>
//         {Array.isArray(data?.discounts) &&
//           data?.discounts?.map((dis, i) => (
//             <TableRow key={i + 1}>
//               <TableCell>
//                 <CheckBox type="checkbox" />
//               </TableCell>
//               <TableCell>
//                 <span className="text-sm">
//                   {dis?.customers?.[0]?.name}
//                 </span>
//               </TableCell>
//               <TableCell>
//                 <span className="text-sm">{dis?.products?.[0]?.title?.en}</span>
//               </TableCell>

//               <TableCell>
//                 <span className="text-sm">{dis?.discountPrice}</span>
//               </TableCell>
//               <TableCell>
//                 <EditDeleteButton
//                   id={dis?._id}
//                   title={dis.title}
//                   handleModalOpen={handleModalOpen}
//                   isCheck={isCheck}
//                   discount={dis}
//                   handleUpdateDiscount={handleUpdateDiscount}
//                   handleDelDiscount={handleDelDiscount}
//                 />
               
//               </TableCell>
//             </TableRow>
//           ))}
//       </TableBody>
//     </>
//   );
// };

// export default DiscountTable;
import React, { useState } from "react";
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
import DiscountDrawer from "components/drawer/DiscountDrawer";
import useDiscountSubmit from "hooks/useDiscountSubmit";
import { notifySuccess } from "utils/toast";

const DiscountTable = ({ products, isCheck, setIsCheck, currency, lang, data }) => {
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const { title, itemId, handleModalOpen, handleUpdate, isSubmitting, serviceId } = useToggleDrawer();
  const { register, handleSubmit, onSubmit, errors, checked, setChecked } = useDiscountSubmit(serviceId, selectedDiscount);

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
    const discount = data.discounts.find((dis) => dis._id === id);
    setSelectedDiscount(discount);
    handleUpdate(id);
  };

  const handleDeleteDiscount = async (id) => {
    console.log("🚀 ~ file: DiscountTable.js:160 ~ handleDeleteDiscount ~ id:", id)
    await DiscountServices.deleteDiscount(id);
    notifySuccess("Deleted")
    // setIsCheck((prevIsCheck) => prevIsCheck.filter((item) => item !== id));
  };

  const resp = useAsync(DiscountServices.getAllDiscount);

  return (
    <>
      {isCheck?.length === 1 && (
        <DeleteModal disId={serviceId} title={title} handleDelete={handleDeleteDiscount} />
      )}

      {isCheck?.length < 2 && (
        <MainDrawer>
          <DiscountDrawer id={serviceId} data={data.discounts} />
        </MainDrawer>
      )}

      <TableBody>
        {Array.isArray(data?.discounts) &&
          data?.discounts?.map((dis, i) => (
            <TableRow key={i + 1}>
              <TableCell>
                <CheckBox
                  type="checkbox"
                  // id={dis._id}
                  // checked={isCheck.includes(dis._id)}
                  // onChange={handleClick}
                />
              </TableCell>
              <TableCell>
                <span className="text-sm">{dis?.customers?.[0]?.name}</span>
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
                  title={dis.title}
                  handleModalOpen={handleModalOpen}
                  isCheck={isCheck}
                  product={dis}
                  parent={data}
                  handleDelete={handleDeleteDiscount}
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
