// import { useState, useContext, useEffect } from "react";
// import { SidebarContext } from "context/SidebarContext";
// import LabelArea from "components/form/LabelArea";
// import Multiselect from "multiselect-react-dropdown";
// import CustomerServices from "services/CustomerServices";
// import ProductServices from "services/ProductServices";
// import DiscountServices from "services/DiscountServices";
// import { notifyError, notifySuccess } from "utils/toast";
// import Title from "components/form/Title";
// import { Scrollbars } from "react-custom-scrollbars-2";
// import DrawerButton from "components/form/DrawerButton";
// import { t } from "i18next";
// import useAsync from "hooks/useAsync";

// const DiscountDrawer = ({ id }) => {
//   const {
//     toggleDrawer,
//     lang,
//     currentPage,
//     handleChangePage,
//     searchText,
//     category,

//     sortedField,
//     limitData,
//   } = useContext(SidebarContext);

//   const [email, setEmail] = useState([]);
//   const [name, setName] = useState([]);
//   const [discount, setDiscount] = useState(0);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [isUpdate, setIsUpdate] = useState(false);

//   const res = useAsync(CustomerServices.getAllCustomers);
//   const optionsForCustomer =
//     res.data?.map((item) => ({
//       name: item.email,
//       _id: item._id,
//     })) ?? [];
//   const { data, loading } = useAsync(
//     () =>
//       ProductServices.getAllProducts({
//         page: currentPage,
//         limit: limitData,
//         category: category,
//         title: searchText,
//         price: sortedField,
//       }),
//     []
//   );

//   const products = data?.products;
//   const optionsForProducts = Array.isArray(products)
//     ? products.map(({ _id, slug }) => ({
//         namee: slug,
//         _id: _id,
//       }))
//     : [];

//   useEffect(() => {
//     if (id) {
//       (async () => {
//         try {
//           const resdis = await DiscountServices.getDiscountById(id);

//           if (resdis) {
//             setEmail(
//               resdis.customers?.map((item) => ({
//                 name: item.email,
//                 _id: item._id,
//               })) ?? []
//             );
//             setName(
//               Array.isArray(resdis.products)
//                 ? resdis.products.map(({ _id, slug }) => ({
//                     namee: slug,
//                     _id: _id,
//                   }))
//                 : []
//             );
//             setDiscount(resdis.discountPrice);
//           }
//         } catch (err) {
//           // notifyError(err ? err.response.data.message : err.message);
//         }
//       })();
//     } else {
//       setName([]);
//       setEmail([]);
//       setDiscount(0);
//     }
//   }, [id]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const selectedCustomerIds = email.map((item) => item._id);
//     const selectedProductIds = name.map((item) => item._id);

//     if (
//       selectedCustomerIds.length === 0 ||
//       selectedProductIds.length === 0 ||
//       discount === 0
//     ) {
//       notifyError("All fields are required!");
//       return;
//     } else {
//       id
//         ? notifySuccess("Discount Updated successfully")
//         : notifySuccess("Discount added successfully");
//     }

//     const discountData = {
//       products: selectedProductIds,
//       customers: selectedCustomerIds,
//       discountPrice: discount,
//     };

//     try {
//       setIsSubmitting(true);

//       if (id) {
//         const res = await DiscountServices.updateDiscount(id, discountData);
//         setIsUpdate(true);
//         setIsSubmitting(false);
//         notifySuccess(res.message);
//       } else {
//         const res = await DiscountServices.addDiscount(discountData);
//         setIsUpdate(true);
//         setIsSubmitting(false);
//         notifySuccess(res.message);
//       }

//       toggleDrawer(); // Close the drawer
//     } catch (err) {
//       setIsSubmitting(false);
//       notifyError(err ? err?.response?.data?.message : err?.message);
//     }
//   };

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
//       <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
//         {id ? (
//           <Title
//             register={() => {}}
//             title={t("DrawerUpdateDiscount")}
//             description={t("UpdateDiscount")}
//           />
//         ) : (
//           <Title
//             register={() => {}}
//             title={t("DrawerAddDiscount")}
//             description={t("AddDiscount")}
//           />
//         )}
//       </div>
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
//                 onRemove={handleCustomerRemove}
//                 onSelect={handleCustomerSelect}
//                 selectedValues={email}
//                 options={optionsForCustomer}
//                 placeholder={t("Customer Email")}
//               />
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
//                 onRemove={handleProductRemove}
//                 onSelect={handleProductSelect}
//                 selectedValues={name}
//                 options={optionsForProducts}
//                 placeholder={t("Enter product name")}
//               />
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
//               <DrawerButton
//                 id={id}
//                 title="Discount"
//                 isSubmitting={isSubmitting}
//               />
//             </div>
//           </div>
//         </form>
//       </Scrollbars>
//     </>
//   );
// };

// export default DiscountDrawer;
import { useState, useContext, useEffect } from "react";
import { SidebarContext } from "context/SidebarContext";
import LabelArea from "components/form/LabelArea";
import Multiselect from "multiselect-react-dropdown";
import CustomerServices from "services/CustomerServices";
import ProductServices from "services/ProductServices";
import DiscountServices from "services/DiscountServices";
import { notifyError, notifySuccess } from "utils/toast";
import Title from "components/form/Title";
import { Scrollbars } from "react-custom-scrollbars-2";
import DrawerButton from "components/form/DrawerButton";
import { t } from "i18next";
import useAsync from "hooks/useAsync";
import { reset } from "react-tabs/lib/helpers/uuid";
const DiscountDrawer = ({ id }) => {
  const {
    toggleDrawer,
    lang,
    currentPage,
    handleChangePage,
    searchText,
    category,
    searchCustomerName,
    sortedField,
    limitData,
    setSearchText,
    setSortedField,
    setSearchCustomerName
  } = useContext(SidebarContext);
  const [email, setEmail] = useState([]);
  const [name, setName] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const res = useAsync(CustomerServices.getAllCustomers);
  const optionsForCustomer =
    res.data?.map((item) => ({
      name: item.email,
      _id: item._id,
    })) ?? [];
  const { data, loading } = useAsync(
    () =>
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
  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const resdis = await DiscountServices.getDiscountById(id);
          if (resdis) {
            setEmail(
              resdis.customers?.map((item) => ({
                name: item.email,
                _id: item._id,
              })) ?? []
            );
            setName(
              Array.isArray(resdis.products)
                ? resdis.products.map(({ _id, slug }) => ({
                    namee: slug,
                    _id: _id,
                  }))
                : []
            );
            setDiscount(resdis.discountPrice);
          }
        } catch (err) {
          // notifyError(err ? err.response.data.message : err.message);
        }
      })();
    } else {
      setName([]);
      setEmail([]);
      setDiscount(0);
    }
  }, [id]);
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const selectedCustomerIds = email.map((item) => item._id);
  //   const selectedProductIds = name.map((item) => item._id);
  //   if (
  //     selectedCustomerIds.length === 0 ||
  //     selectedProductIds.length === 0 ||
  //     discount === 0
  //   ) {
  //     notifyError("All fields are required!");
  //     return;
  //   } else {
  //     id
  //       ? notifySuccess("Discount Updated successfully")
  //       : notifySuccess("Discount added successfully");
  //   }
  //   const discountData = {
  //     products: selectedProductIds,
  //     customers: selectedCustomerIds,
  //     discountPrice: discount,
  //   };

  //   try {
  //     setIsSubmitting(true);

  //     if (id) {
  //       const res = await DiscountServices.updateDiscount(id, discountData);
  //       setIsUpdate(true);
  //       setIsSubmitting(false);
  //       notifySuccess(res.message);
  //     } else {
  //       const res = await DiscountServices.addDiscount(discountData);
  //       console.log(res,"add")
  //       if(res){
  //         const re =await DiscountServices.getAllDiscount(currentPage, limitData, searchText, sortedField,searchCustomerName)
  //         console.log(re,"gll")
  //       }
  //       setIsUpdate(true);
  //       setIsSubmitting(false);
  //       notifySuccess(res.message);
  //     }

  //     toggleDrawer(); // Close the drawer
     
  //   } catch (err) {
  //     setIsSubmitting(false);
  //     notifyError(err ? err?.response?.data?.message : err?.message);
  //   }
    
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedCustomerIds = email.map((item) => item._id);
    const selectedProductIds = name.map((item) => item._id);
  
    if (
      selectedCustomerIds.length === 0 ||
      selectedProductIds.length === 0 ||
      discount === 0
    ) {
      notifyError("All fields are required!");
      return;
    } else {
      id
        ? notifySuccess("Discount Updated successfully")
        : notifySuccess("Discount added successfully");
    }
  
    const discountData = {
      products: selectedProductIds,
      customers: selectedCustomerIds,
      discountPrice: discount,
    };
  
    try {
      setIsSubmitting(true);
  
      if (id) {
        const res = await DiscountServices.updateDiscount(id, discountData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
            if (res) {
          const getDiscounts = await DiscountServices.getAllDiscount(
            currentPage,
            limitData,
            searchText,
            sortedField,
            searchCustomerName
          );
          handleChangePage(1);
          setSearchText('');
          setSortedField('');
          setSearchCustomerName('');
          setName([]);
          setEmail([]);
          setDiscount(0);
        }
      } else {
        const res = await DiscountServices.addDiscount(discountData);
        if (res) {
          const updatedDiscounts = await DiscountServices.getAllDiscount(
            currentPage,
            limitData,
            searchText,
            sortedField,
            searchCustomerName
          );

          handleChangePage(1); 
          setSearchText(''); 
          setSortedField(''); 
          setSearchCustomerName(''); 
          setName([]);
          setEmail([]);
          setDiscount(0);
        }
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
      }
  
      toggleDrawer(); // Close the drawer
  
    } catch (err) {
      setIsSubmitting(false);
      notifyError(err ? err?.response?.data?.message : err?.message);
    }
  };
  

  const handleCustomerSelect = (selectedList) => {
    setEmail(selectedList);
  };
  const handleCustomerRemove = (removedList) => {
    setEmail(removedList);
  };
  const handleProductSelect = (selectedList) => {
    setName(selectedList);
  };
  const handleProductRemove = (removedList) => {
    setName(removedList);
  };
  const handleAddDiscount = () => {
    setDiscount((prevDiscount) => prevDiscount + 1);
  };
  const handleSubtractDiscount = () => {
    setDiscount((prevDiscount) => prevDiscount - 1);
  };
  const handleDiscountChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setDiscount(value);
    } else {
      setDiscount("");
    }
  };

  
  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            register={() => {}}
            title={t("DrawerUpdateDiscount")}
            description={t("UpdateDiscount")}
          />
        ) : (
          <Title
            register={() => {}}
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
                onRemove={handleCustomerRemove}
                onSelect={handleCustomerSelect}
                selectedValues={email}
                options={optionsForCustomer}
                placeholder={t("Customer Email")}
              />
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
                onRemove={handleProductRemove}
                onSelect={handleProductSelect}
                selectedValues={name}
                options={optionsForProducts}
                placeholder={t("Enter product name")}
              />
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
              <DrawerButton
                id={id}
                title="Discount"
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        </form>
      </Scrollbars>
    </>
  );
};
export default DiscountDrawer;