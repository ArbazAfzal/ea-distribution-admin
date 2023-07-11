
// // import { useContext, useEffect, useState } from "react";
// // import { useForm } from "react-hook-form";
// // import { SidebarContext } from "context/SidebarContext";
// // import { notifyError, notifySuccess } from "utils/toast";
// // import DiscountServices from "services/DiscountServices";

// // const useDiscountSubmit = (id, data) => {
// //   console.log("🚀 ~ file: useDiscountSubmit.js:9 ~ useDiscountSubmit ~ id:", id)
// //   console.log("🚀 ~ *****************:", data)
// //   const { isDrawerOpen, closeDrawer, setIsUpdate, lang } =
// //     useContext(SidebarContext);
// //   const [resData, setResData] = useState({});
// //   const [checked, setChecked] = useState("");
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// //   const {
// //     register,
// //     handleSubmit,
// //     setValue,
// //     clearErrors,
// //     reset,
// //     formState: { errors },
// //   } = useForm();

// //   const onSubmit = async (data) => {
// //     try {
// //       setIsSubmitting(true);

// //       const discountData = {
// //         name: {
// //           [lang]: data.name,
// //         },
// //         email: data.email,
// //         discountPrice: data.discountPrice,
// //       };

// //       if (id) {
// //         const res = await DiscountServices.updateDiscount(id, discountData);
// //         setIsUpdate(true);
// //         setIsSubmitting(false);
// //         notifySuccess(res.message);
// //         closeDrawer();
// //         reset();
// //       } else {
// //         const res = await DiscountServices.createDiscount(discountData);
// //         setIsUpdate(true);
// //         setIsSubmitting(false);
// //         notifySuccess(res.message);
// //         closeDrawer();
// //       }
// //     } catch (err) {
// //       setIsSubmitting(false);
// //       notifyError(err ? err?.response?.data?.message : err?.message);
// //       closeDrawer();
// //     }
// //   };

// //   useEffect(() => {
// //     if (!isDrawerOpen) {
// //       setResData({});
// //       setValue("name", "");
// //       setValue("email", "");
// //       setValue("discountPrice", "");
// //       if (data !== undefined && data[0]?._id !== undefined) {
// //         setChecked(data[0]._id);
// //       }
// //       return;
// //     }
// //     if (id) {
// //       (async () => {
// //         try {
// //           const res = await DiscountServices.getDiscountById(id);
// //           console.log("res discount", res);

// //           if (res) {
// //             setResData(res);
// //             setValue("name", res.name[lang ? lang : "en"]);
// //             setValue("email", res.email);
// //             setValue("discountPrice", res.discountPrice);
// //           }
// //         } catch (err) {
// //           notifyError(err ? err.response.data.message : err.message);
// //         }
// //       })();
// //     }
// //   }, [id, setValue, isDrawerOpen, lang, clearErrors, data]);

  
// //   return {
// //     register,
// //     handleSubmit,
// //     onSubmit,
// //     errors,
// //     checked,
// //     setChecked,
// //     isSubmitting,
   
    
// //   };
// // };

// // export default useDiscountSubmit;
// // useDiscountSubmit.js
// import { useContext, useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { SidebarContext } from "context/SidebarContext";
// import { notifyError, notifySuccess } from "utils/toast";
// import DiscountServices from "services/DiscountServices";

// const useDiscountSubmit = (id, data) => {
//   console.log("🚀 ~ file: useDiscountSubmit.js:112 ~ useDiscountSubmit ~ id:", id)
//   const { isDrawerOpen, closeDrawer, setIsUpdate, lang } = useContext(SidebarContext);
//   const [resData, setResData] = useState({});
//   const [email, setEmail] = useState([]);
//   const [name, setName] = useState([]);
//   const [discount, setDiscount] = useState(0);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     clearErrors,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       setIsSubmitting(true);

//       const selectedCustomerIds = email.map((item) => item._id);
//       const selectedProductIds = name.map((item) => item._id);
//       const discountData = {
//         products: selectedProductIds,
//         customers: selectedCustomerIds,
//         discountPrice: discount,
//       };

//       if (id) {
//         const res = await DiscountServices.updateDiscount(id, discountData);
//         setIsUpdate(true);
//         setIsSubmitting(false);
//         notifySuccess(res.message);
//         closeDrawer();
//         reset();
//       } else {
//         const res = await DiscountServices.addDiscount(discountData);
//         setIsUpdate(true);
//         setIsSubmitting(false);
//         notifySuccess(res.message);
//         closeDrawer();
//       }
//     } catch (err) {
//       setIsSubmitting(false);
//       notifyError(err ? err?.response?.data?.message : err?.message);
//       closeDrawer();
//     }
//   };

//   useEffect(() => {
//     if (!isDrawerOpen) {
//       setResData({});
//       setEmail([]);
//       setName([]);
//       setDiscount(0);
//       // if (data !== undefined && data[0]?._id !== undefined) {
//       //   setChecked(data[0]._id);
//       // }
//       // return;
//     }
//     if (id) {
//       (async () => {
//         try {
//           const res = await DiscountServices.getDiscountById(id);
//           console.log("🚀 ~ file: useDiscountSubmit.js:176 ~ res:", res)

//           if (res) {
//             setResData(res);
//             setEmail(res.customers.map((i)=>i?.email));
//             setName(res.products.map((i)=>i?.slug));
//             setDiscount(res.discountPrice);
//           }
//         } catch (err) {
//           notifyError(err ? err.response.data.message : err.message);
//         }
//       })();
//     }
//   }, [id, isDrawerOpen, lang, clearErrors, data]);

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

//   return {
//     register,
//     handleSubmit,
//     onSubmit,
//     errors,
//     email,
//     handleCustomerSelect,
//     handleCustomerRemove,
//     name,
//     handleProductSelect,
//     handleProductRemove,
//     discount,
//     handleAddDiscount,
//     handleSubtractDiscount,
//     handleDiscountChange,
//     isSubmitting,
//   };
// };

// export default useDiscountSubmit;
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SidebarContext } from "context/SidebarContext";
import { notifyError, notifySuccess } from "utils/toast";
import DiscountServices from "services/DiscountServices";

const useDiscountSubmit = (id, data) => {
 console.log("🚀 ~ file: useDiscountSubmit.js:252 ~ useDiscountSubmit ~ id:", id)
 
  const { isDrawerOpen, closeDrawer, setIsUpdate, lang } = useContext(SidebarContext);
  const [resData, setResData] = useState({});

  const [email, setEmail] = useState([]);
  const [name, setName] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!isDrawerOpen) {
      setResData({});
      setEmail(data?.customers || []);
      setName(data?.products || []);
      setDiscount(data?.discountPrice || 0);
      return;
    }

    if (id && isDrawerOpen) {
      (async () => {
        try {
          const res = await DiscountServices.getDiscountById(id);

          if (res) {
            setResData(res);
       
            setEmail( res.customers?.map((item) => ({
              name: item.email,
              _id: item._id,
            })) ?? [])
            setName( Array.isArray(res.products)
            ? res.products.map(({ _id, slug }) => ({
              namee: slug,
              _id: _id,
            }))
            : []);
            setDiscount(res.discountPrice);
          }
        } catch (err) {
          notifyError(err ? err.response.data.message : err.message);
        }
      })();
    }
  }, [id, isDrawerOpen, lang, clearErrors, data]);

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      const selectedCustomerIds = email.map((item) => item._id);
      const selectedProductIds = name.map((item) => item._id);
      const discountData = {
        products: selectedProductIds,
        customers: selectedCustomerIds,
        discountPrice: discount,
      };

      if (id) {
        const res = await DiscountServices.updateDiscount(id, discountData);     
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
        closeDrawer();
        // reset();
      } else {
        const res = await DiscountServices.addDiscount(discountData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
        closeDrawer();
      }
    } catch (err) {
      setIsSubmitting(false);
      notifyError(err ? err?.response?.data?.message : err?.message);
      closeDrawer();
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
  
  return {
    register,
    handleSubmit,
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
    setName,
    id
  };
};

export default useDiscountSubmit;
