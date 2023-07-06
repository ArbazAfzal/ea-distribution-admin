import { useState } from "react";
import LabelArea from "components/form/LabelArea";
import { SidebarContext } from "context/SidebarContext";
import useAsync from "hooks/useAsync";
import { t } from "i18next";
import Multiselect from "multiselect-react-dropdown";
import React, { useContext } from "react";
import CustomerServices from "services/CustomerServices";
import DiscountServices from "services/DiscountServices";
import ProductServices from "services/ProductServices";
import axios from "axios";

const UserDiscount = () => {
  const [email, setEmail] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [name, setName] = useState([]);

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

  const res = useAsync( CustomerServices.getAllCustomers);
  const optionsForCustomer =
    res.data?.map((item) => {
      const obj = {
        name: item.email,
        _id: item._id,
      };
      return obj;
    }) ?? [];

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
    ? products.map(({ _id, slug }) => {
        const object = {
          namee: slug,
          _id: _id,
        };
        return object;
      })
    : [];

  const handleAddDiscount = () => {
    setDiscount((prevDiscount) => prevDiscount + 1);
  };

  const handleSubtractDiscount = () => {
    setDiscount((prevDiscount) => (prevDiscount > 0 ? prevDiscount - 1 : 0));
  };

  const handleDiscountChange = (e) => {
    setDiscount(parseInt(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the selected customer IDs
    const selectedCustomerIds = email.map((item) => item._id);

    // Get the selected product IDs
    const selectedProductIds = name.map((item) => item._id);

    const data = {
      products: selectedProductIds,
      customers: selectedCustomerIds,
      discountPrice: discount,
    };

    try {
      const response = await axios.post(
        "https://kachabazar-backend-jet.vercel.app/api/discount/add",
        data
      );

      console.log("Data posted successfully!", response.data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
        <LabelArea label={t("Customer Email")} />
        <div className="col-span-8 sm:col-span-4">
          <Multiselect
            displayValue="name"
            isObject={true}
            singleSelect={false}
            hidePlaceholder={false}
            onKeyPressFn={function noRefCheck() {}}
            onRemove={function noRefCheck() {}}
            onSearch={function noRefCheck() {}}
            onSelect={(e) => setEmail(e)}
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
            onKeyPressFn={function noRefCheck() {}}
            onRemove={function noRefCheck() {}}
            onSearch={function noRefCheck() {}}
            onSelect={(e) => setName(e)}
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
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default UserDiscount;
