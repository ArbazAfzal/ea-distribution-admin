import { Input } from "@windmill/react-ui";
import LabelArea from "components/form/LabelArea";
import { SidebarContext } from "context/SidebarContext";
import useAsync from "hooks/useAsync";
import { t } from "i18next";
import Multiselect from "multiselect-react-dropdown";
import React, { useContext, useState } from "react";
import CustomerServices from "services/CustomerServices";
import DiscountServices from "services/DiscountServices";
import ProductServices from "services/ProductServices";

const UserDiscount = () => {
  const [email, setEmail] = useState([]);
  const [disPrice, setDisPrice] = useState(0);
  const [name, setName] = useState([]);
  const [cusId, setCusId] = useState([]);
  const [proId, setProId] = useState([]);

  const res = useAsync(CustomerServices.getAllCustomers);
  const optionsForCustomer =
    res.data?.map(({email,_id}) => {
      const obj = {
        name: email,
      };
      return obj;
    }) ?? [];

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

  const { data, loading } = useAsync(() =>
    ProductServices.getAllProducts({
      page: currentPage,
      limit: limitData,
      category: category,
      title: searchText,
      price: sortedField,
    })
  );
  const products = data?.products;
  const optionsForProducts = Array.isArray(products)
    ? products.map(({ _id, slug }) => {
        const object = {
          namee: slug,
        };
        return object;
      })
    : [];
const {dat} = useAsync(DiscountServices.addDiscount())
console.log(dat,"add")
  return (
    <>
      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
        <LabelArea label={t("Customer Email")} />
        <div className="col-span-8 sm:col-span-4">
          <Multiselect
            displayValue="name"
            isObject={true}
            singleSelect={false} // Enable multiple selections
            // ref={resetRefTwo}
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
            singleSelect={false} // Enable multiple selections
            // ref={resetRefTwo}
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
          <Input
            type="number"
            placeholder="Enter discount price"
            onChange={(e) => setDisPrice(e.target.value)}
            defaultValue={0.0}
            className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
          />
          {/* <Error errorName={errors?.dis} /> */}
        </div>
      </div>
    </>
  );
};

export default UserDiscount;
