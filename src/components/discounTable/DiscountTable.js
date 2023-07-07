// import {  
//     TableBody,
//     TableCell,
//     TableRow,
// } from "@windmill/react-ui";
// import MainDrawer from "components/drawer/MainDrawer";
// import ProductDrawer from "components/drawer/ProductDrawer";
// import CheckBox from "components/form/CheckBox";
// import DeleteModal from "components/modal/DeleteModal";
// import EditDeleteButton from "components/table/EditDeleteButton";
// import useToggleDrawer from "hooks/useToggleDrawer";


// //internal import

// const DiscountTable = ({ products, isCheck, setIsCheck, currency, lang, data }) => {
//     const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

//     const handleClick = (e) => {
//         const { id, checked } = e.target;
//         console.log("id", id, checked);

//         setIsCheck([...isCheck, id]);
//         if (!checked) {
//             setIsCheck(isCheck.filter((item) => item !== id));
//         }
//     };
//     console.log(data, "============table")
//     return (
//         <>
//             {isCheck?.length < 1 && <DeleteModal id={serviceId} title={title} />}

//             {isCheck?.length < 2 && (
//                 <MainDrawer>
//                     <ProductDrawer currency={currency} id={serviceId} />
//                 </MainDrawer>
//             )}

//             <TableBody>
//                 {Array.isArray(data?.discounts) &&
//                     data?.discounts?.map((dis, i) => (
//                         <TableRow key={i + 1}>
                           
//                             <TableCell>
//                                 <CheckBox type="checkbox" />
//                             </TableCell>

//                             <TableCell>
//                             <span className="text-sm">
//                                 {dis?.customers?.[0]?.name}
//                                 </span>
//                                 </TableCell>
//                             <TableCell>
//                                 <span className="text-sm">{dis?.products?.[0]?.title?.en}</span>
//                             </TableCell>

//                             <TableCell> 
//                                 <span  className="text-sm">
//                                  {dis?.discountPrice}
//                                  </span>
//                                  </TableCell>
//                             <TableCell>
//                                 <EditDeleteButton />
//                             </TableCell>
//                         </TableRow>
//                     ))}
//             </TableBody>
//         </>
//     );
// };

// export default DiscountTable;
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

const DiscountTable = ({ products, isCheck, setIsCheck, currency, lang, data }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  console.log("🚀 ~ file: DiscountTable.js:91 ~ DiscountTable ~ serviceId:", serviceId)

  const handleClick = (e) => {
    const { id, checked } = e.target;
    console.log("id", id, checked);

    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };
  const handleUpdateDiscount = (id) => {
    // Add the logic for updating discounts here
  };
  const resp= useAsync(DiscountServices.getAllDiscount)
  const Ids=Array.isArray(resp.data.discounts)&&resp.data.discounts.map((i)=>{

    return i?._id
  
  }
  )
  console.log("🚀 ~ file: DiscountTable.js:113 ~ Ids ~ Ids:", Ids)
  
  return (
    <>
      {isCheck?.length < 1 && <DeleteModal id={serviceId} title={title} />}

      {isCheck?.length < 2 && (
        <MainDrawer>
          <ProductDrawer currency={currency} id={serviceId} />
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
                  id={dis.id} // Replace with the appropriate discount ID prop
                  title={dis.title} // Replace with the appropriate discount title prop
                  handleUpdate={handleUpdate} // Replace with the appropriate update function prop
                  handleModalOpen={handleModalOpen} // Replace with the appropriate modal open function prop
                  isCheck={isCheck} // Replace with the appropriate isCheck prop
                  product={dis} // Replace with the appropriate discount object prop
                  parent={parent} // Replace with the appropriate parent prop
                  handleUpdateDiscount={handleUpdateDiscount} // Pass the handleUpdateDiscount function prop
                />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </>
  );
};

export default DiscountTable;
