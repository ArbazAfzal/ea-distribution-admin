// import React from 'react'
// import { useState, useEffect } from "react";
// import LabelArea from "components/form/LabelArea";
// import { SidebarContext } from "context/SidebarContext";
// import useAsync from "hooks/useAsync";
// import { t } from "i18next";
// import Multiselect from "multiselect-react-dropdown";
// import { useContext } from "react";
// import CustomerServices from "services/CustomerServices";
// import ProductServices from "services/ProductServices";
// import DiscountServices from "services/DiscountServices";
// import { notifyError, notifySuccess } from 'utils/toast';
// import Title from 'components/form/Title';
// import { Scrollbars } from "react-custom-scrollbars-2";
// import DrawerButton from 'components/form/DrawerButton';
// import useDiscountSubmit from 'hooks/useDiscountSubmit';


// function DiscountDrawer() {
//   const [email, setEmail] = useState([]);
//   const [discount, setDiscount] = useState(0);
//   const [name, setName] = useState([]);
//   const {
//     toggleDrawer,
//     lang,
//     currentPage,
//     handleChangePage,
//     searchText,
//     category,
//     setCategory,
//     searchRef,
//     handleSubmitForAll,
//     sortedField,
//     setSortedField,
//     limitData,
//   } = useContext(SidebarContext);

//   const = useDiscountSubmit();
//   console.log("🚀 ~ file: DiscountDrawer.js:39 ~ DiscountDrawer ~ ", 


//   const resp = useAsync(DiscountServices.getAllDiscount)

//   const res = useAsync(CustomerServices.getAllCustomers);
//   const optionsForCustomer =
//     res.data?.map((item) => {
//       const obj = {
//         name: item.email,
//         _id: item._id,
//       };
//       return obj;
//     }) ?? [];

//   const { data, loading } = useAsync(() =>
//     ProductServices.getAllProducts({
//       page: currentPage,
//       limit: limitData,
//       category: category,
//       title: searchText,
//       price: sortedField,
//     }),
//     []
//   );
//   const products = data?.products;
//   const optionsForProducts = Array.isArray(products)
//     ? products.map(({ _id, slug }) => {
//       const object = {
//         namee: slug,
//         _id: _id,
//       };
//       return object;
//     })
//     : [];

//   const handleCustomerSelect = (selectedList) => {
//     setEmail(selectedList);
//   };
//   const handleCustomerRemove = (removedList) => {
//     setEmail(removedList);
//   };
//   const handleProductSelect = (selectedList) => {
//     setName(selectedList);
//   };
//   const handleProductRemove = (removedList) => {
//     setName(removedList);
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const selectedCustomerIds = email.map((item) => item._id);
//     const selectedProductIds = name.map((item) => item._id);
//     if (selectedCustomerIds.length === 0 || selectedProductIds.length === 0 || discount === 0) {
//       notifyError("All fields all require.!")
//       return;
//     } else {
//       notifySuccess("Discount added successfully")
//     }
//     const data = {
//       products: selectedProductIds,
//       customers: selectedCustomerIds,
//       discountPrice: discount,
//     };
//     const res = await DiscountServices.addDiscount(data);
//     console.log(":rocket: ~ file: UserDiscount.js:282 ~ handleSubmit ~ res:", res);
//     setEmail([]);
//     setName([]);
//     setDiscount(0);
//   };
//   const handleAddDiscount = () => {
//     setDiscount((prevDiscount) => prevDiscount + 1);
//   };
//   const handleSubtractDiscount = () => {
//     setDiscount((prevDiscount) => prevDiscount - 1);
//   };
//   const handleDiscountChange = (e) => {
//     const value = parseInt(e.target.value);
//     if (!isNaN(value)) {
//       setDiscount(value);
//     } else {
//       setDiscount("");
//     }
//   };


//   return (
//     <>

//       {/* <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
//         {id ? (
//           <Title title={t("Update Discount")} description={t("Update Discount")} />
//         ) : (
//           <Title title={t("Add Discount")} description={t("Add Discount")} />
//         )}
//       </div> */}
//       <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
//         <form onSubmit={handleSubmit}>
//           <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//             <LabelArea label={t("Customer Email")} />
//             <div className="col-span-8 sm:col-span-4">
//               <Multiselect
//                 displayValue="name"
//                 isObject={true}
//                 singleSelect={false}
//                 hidePlaceholder={false}
//                 onKeyPressFn={function noRefCheck() { }}
//                 onRemove={handleCustomerRemove} // Update the onRemove callback
//                 onSearch={function noRefCheck() { }}
//                 onSelect={handleCustomerSelect} // Update the onSelect callback
//                 selectedValues={email}
//                 options={optionsForCustomer}
//                 placeholder={"Customer Email"}
//               ></Multiselect>
//             </div>
//           </div>
//           <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//             <LabelArea label={t("Product Name")} />
//             <div className="col-span-8 sm:col-span-4">
//               <Multiselect
//                 displayValue="namee"
//                 isObject={true}
//                 singleSelect={false}
//                 hidePlaceholder={false}
//                 onKeyPressFn={function noRefCheck() { }}
//                 onRemove={handleProductRemove} // Update the onRemove callback
//                 onSearch={function noRefCheck() { }}
//                 onSelect={handleProductSelect} // Update the onSelect callback
//                 selectedValues={name}
//                 options={optionsForProducts}
//                 placeholder={"Enter product name"}
//               ></Multiselect>
//             </div>
//           </div>
//           <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//             <LabelArea label={t("Discount")} />
//             <div className="col-span-8 sm:col-span-4">
//               <div className="flex items-center">
//                 <button
//                   type="button"
//                   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                   onClick={handleSubtractDiscount}
//                 >
//                   -
//                 </button>
//                 <input
//                   type="number"
//                   value={discount}
//                   onChange={handleDiscountChange}
//                   className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white px-3"
//                 />
//                 <button
//                   type="button"
//                   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                   onClick={handleAddDiscount}
//                 >
//                   +
//                 </button>
//               </div>
//             </div>
//           </div>
//           <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//             <div className="col-span-8 sm:col-span-4">
//               {/* <button
//             type="submit"
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           >
//             Submit
//           </button> */}
//               <DrawerButton title="Discount" />
//             </div>
//           </div>
//         </form>

//       </Scrollbars>
//     </>
//   )
// }

// export default DiscountDrawer
// DiscountDrawer.js
import { useState, useContext, useEffect } from "react";
import { SidebarContext } from "context/SidebarContext";
import LabelArea from "components/form/LabelArea";
import Multiselect from "multiselect-react-dropdown";
import CustomerServices from "services/CustomerServices";
import ProductServices from "services/ProductServices";
import DiscountServices from "services/DiscountServices";
import { notifyError, notifySuccess } from 'utils/toast';
import Title from 'components/form/Title';
import { Scrollbars } from "react-custom-scrollbars-2";
import DrawerButton from 'components/form/DrawerButton';
import useDiscountSubmit from 'hooks/useDiscountSubmit';
import { t } from "i18next";
import useAsync from "hooks/useAsync";

function DiscountDrawer(id) {
  const {
    toggleDrawer,
    lang,
    currentPage,
    handleChangePage,
    searchText,
    category,
    setCategory,
    searchRef,
    handleSubmitForAll,
    sortedField,
    setSortedField,
    limitData,
  } = useContext(SidebarContext);

  const {
    register,
    onSubmit,
    errors,
    email,
    handleCustomerSelect,
    handleCustomerRemove,
    name,
    handleProductSelect,
    handleProductRemove,
    discount,
    handleAddDiscount,
    handleSubtractDiscount,
    handleDiscountChange,
    isSubmitting,
    setEmail,
    setDiscount,
    // handleSubmit,
    setName,
  }
    = useDiscountSubmit(id);

  console.log("id============", id)
  console.log("discount:::", discount)
  console.log("name:::", name)
  const res = useAsync(CustomerServices.getAllCustomers);
  const optionsForCustomer =
    res.data?.map((item) => ({
      name: item.email,
      _id: item._id,
    })) ?? [];
  useEffect(() => { }, [discount])
  const { data, loading } = useAsync(() =>
    ProductServices.getAllProducts({
      page: currentPage,
      limit: limitData,
      category: category,
      title: searchText,
      price: sortedField,
    }),
    []
  );
  const products = data?.products;
  const optionsForProducts = Array.isArray(products)
    ? products.map(({ _id, slug }) => ({
      namee: slug,
      _id: _id,
    }))
    : [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedCustomerIds = email.map((item) => item._id);
    const selectedProductIds = name.map((item) => item._id);
    if (selectedCustomerIds.length === 0 || selectedProductIds.length === 0 || discount === 0) {
      notifyError("All fields are required!");
      return;
    } else {
      notifySuccess("Discount added successfully");
    }
    const discountData = {
      products: selectedProductIds,
      customers: selectedCustomerIds,
      discountPrice: discount,
    };
    const res = await DiscountServices.addDiscount(discountData);

  };

  return (
    <>

      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            register={register}

            title={t("UpdateDiscount")}
            description={t("UpdateDiscountDescription")}
          />
        ) : (
          <Title
            register={register}

            title={t("DrawerAddDiscount")}
            description={t("AddDiscount")}
          />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <LabelArea label={t("Customer Email")} />
            <div className="col-span-8 sm:col-span-4">
              <Multiselect
                displayValue="name"
                isObject={true}
                singleSelect={false}
                hidePlaceholder={false}
                onKeyPressFn={function noRefCheck() { }}
                onRemove={handleCustomerRemove}
                onSearch={function noRefCheck() { }}
                onSelect={handleCustomerSelect}
                selectedValues={email}
                options={optionsForCustomer}
                placeholder={"Customer Email"}
              ></Multiselect>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <LabelArea label={t("Product Name")} />
            <div className="col-span-8 sm:col-span-4">
              <Multiselect
                displayValue="namee"
                isObject={true}
                singleSelect={false}
                hidePlaceholder={false}
                onKeyPressFn={function noRefCheck() { }}
                onRemove={handleProductRemove}
                onSearch={function noRefCheck() { }}
                onSelect={handleProductSelect}
                selectedValues={name}
                options={optionsForProducts}
                placeholder={"Enter product name"}
              ></Multiselect>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <LabelArea label={t("Discount")} />
            <div className="col-span-8 sm:col-span-4">
              <div className="flex items-center">
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleSubtractDiscount}
                >
                  -
                </button>
                <input
                  type="number"
                  value={discount}
                  onChange={handleDiscountChange}
                  className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white px-3"
                />
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleAddDiscount}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <div className="col-span-8 sm:col-span-4">
              <DrawerButton title="Discount" />
            </div>
          </div>
        </form>
      </Scrollbars>
    </>
  );
}

export default DiscountDrawer
// import React from "react";
// import { Scrollbars } from "react-custom-scrollbars-2";
// import { Card, CardBody, Input } from "@windmill/react-ui";
// import { useTranslation } from "react-i18next";
// import useDiscountSubmit from "hooks/useDiscountSubmit";
// import Title from "components/form/Title";
// import LabelArea from "components/form/LabelArea";
// import Uploader from "components/image-uploader/Uploader";
// import InputArea from "components/form/InputArea";
// import Error from "components/form/Error";
// import DrawerButton from "components/form/DrawerButton";

// const DiscountDrawer = ({ id }) => {
//   const {
//     register,
//     handleSubmit,
//     onSubmit,
//     errors,
//     checked,
//     setChecked,
//     isSubmitting,
//   } = useDiscountSubmit(id);
//   const { t } = useTranslation();
//   console.log(id)

//   return (
//     <>
//       <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
//         {id ? (
//           <Title
//             register={register}
//             title={t("UpdateDiscount")}
//             description={t("Update Discount")}
//           />
//         ) : (
//           <Title
//             register={register}
//             title={t("AddDiscount")}
//             description={t("Add Discount")}
//           />
//         )}
//       </div>
//       <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
//         <Card className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full">
//           <CardBody>
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
//                 <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//                   <LabelArea label="Name" />
//                   <div className="col-span-8 sm:col-span-4">
//                     <InputArea
//                       register={register}
//                       label="Name"
//                       name="name"
//                       type="text"
//                       placeholder="Discount name"
//                     />
//                     <Error errorName={errors.name} />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//                   <LabelArea label="Email" />
//                   <div className="col-span-8 sm:col-span-4">
//                     <InputArea
//                       register={register}
//                       label="Email"
//                       name="email"
//                       type="text"
//                       placeholder="Email"
//                     />
//                     <Error errorName={errors.email} />
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
//                   <LabelArea label="Discount Price" />
//                   <div className="col-span-8 sm:col-span-4">
//                     <InputArea
//                       register={register}
//                       label="Discount Price"
//                       name="discountPrice"
//                       type="number"
//                       placeholder="Discount price"
//                     />
//                     <Error errorName={errors.discountPrice} />
//                   </div>
//                 </div>
//               </div>

//               <DrawerButton
//                 id={id}
//                 title="Discount"
//                 isSubmitting={isSubmitting}
//               />
//             </form>
//           </CardBody>
//         </Card>
//       </Scrollbars>
//     </>
//   );
// };

// export default DiscountDrawer;
