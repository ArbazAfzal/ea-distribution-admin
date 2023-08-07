

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
import { Card, CardBody, Input } from "@windmill/react-ui";
import InputArea from "components/form/InputArea";
import Uploader from "components/image-uploader/Uploader";
const UnitDrawer = ({ id, add, handleAdd, handleUpd, update }) => {
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
    setSearchCustomerName,
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

        notifySuccess(res.message);
        if (res) {
          handleUpd(true);
        }
      } else {
        const res = await DiscountServices.addDiscount(discountData);

        if (res) {
          handleAdd(true);

          if (add === false) {
            setName([]);
            setEmail([]);
            setDiscount(0);
          }
        }

        notifySuccess(res.message);
      }
  
      toggleDrawer(); // Close the drawer
      const res = console.log(res, "========");
    } catch (err) {
      setIsSubmitting(false);
      notifyError(err ? err?.response?.data?.message : err?.message);
    }
  };

  
  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            register={() => { }}
            title={t("Update Unit")}
          //  description={t("UpdateDiscount")}
          />
        ) : (
          <Title
            register={() => { }}
            title={t("Add Unit")}
           // description={t("AddDiscount")}
          />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
      <Card className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full">
          <CardBody>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <LabelArea label={t("Unit Name")} />
            <div className="col-span-8 sm:col-span-4">
             <InputArea
             register={()=>{}}
             name="name"
             label="name"
             placeholder="Brand Name"
             />
            </div>
          </div>
          
         

        
    
          <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
            <div className="col-span-8 sm:col-span-4">
              <DrawerButton
                id={id}
                title="Unit"
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        </form>
        </CardBody>
        </Card>
      </Scrollbars>
    </>
  );
};
export default UnitDrawer;

