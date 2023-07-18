import { useEffect, useState } from "react";
import { SidebarContext } from "context/SidebarContext";
import useAsync from "hooks/useAsync";
import React, { useContext } from "react";
import ProductServices from "services/ProductServices";
import DiscountServices from "services/DiscountServices";
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Select,
  Input,
  Button,
  Card,
  CardBody,
  Pagination,
} from "@windmill/react-ui";

import useToggleDrawer from "hooks/useToggleDrawer";
import NotFound from "components/table/NotFound";

import MainDrawer from "components/drawer/MainDrawer";

import {  FiPlus} from "react-icons/fi";
import DeleteModal from "components/modal/DeleteModal";
import BulkActionDrawer from "components/drawer/BulkActionDrawer";
import TableLoading from "components/preloader/TableLoading";
import DiscountTable from "components/discounTable/DiscountTable";
import DiscountDrawer from "components/drawer/DiscountDrawer";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
const UserDiscount = () => {
  const { title, allId, serviceId, handleDeleteMany, handleUpdateMany } =
    useToggleDrawer();
  
  const { t } = useTranslation();
  const {
    isUpdate,
    toggleDrawer,
    currentPage,
    handleChangePage,
    searchText,
    category,
    searchRef,
    handleSubmitForAll,
    sortedField,
    setSortedField,
    limitData,
    searchCustomerName,
    searchCustomerRef,
    setSearchCustomerName

  } = useContext(SidebarContext);

const [add,setAdd]=useState(false)
const [update,setUpdate]=useState(false)
console.log("🚀 ~ file: UserDiscount.js:63 ~ UserDiscount ~ update:", update)
const handleAdd=()=>{
  setAdd(true)
}
const handleUpdate=()=>{
  setUpdate(true)
}
const [resp,setRes]=useState(false)
useEffect(() => {
  const fetchDiscounts = async () => {
    try {
      const response = await DiscountServices.getAllDiscount(
        currentPage,
        limitData,
        searchText,
        sortedField,
        searchCustomerName
      );
      setRes(response)
    resp?setAdd(false):"";
    resp?setUpdate(false):"";

      // Handle the response, e.g., update state with the fetched data
    } catch (error) {
      // Handle the error, e.g., display an error message
    }
  };

  fetchDiscounts();

  
}, [currentPage, limitData, searchText, sortedField, searchCustomerName,add,update]);

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
  


 
  const ID = useSelector((state) => state.id)

  return (
    <>
      <>{t("Discount Page")}</>
      <DeleteModal id={ID} title={title} />
      <BulkActionDrawer ids={ID} title="Discount" />
      <MainDrawer>
        <DiscountDrawer id={ID}  handleUpd={()=>handleUpdate()} update={update}  handleAdd={()=>handleAdd()} add={add} />
      </MainDrawer>
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody className="">
          <form
            onSubmit={handleSubmitForAll}
            className="py-3 md:pb-0 grid gap-4 lg:gap-6 xl:gap-6  xl:flex"
          >
            <div className="flex justify-start xl:w-1/2  md:w-full">
             
            </div>
            <div className="lg:flex  md:flex xl:justify-end xl:w-1/2  md:w-full md:justify-start flex-grow-0"> 
              <div className="w-full md:w-48 lg:w-48 xl:w-48">
                <Button
                  onClick={toggleDrawer}
                  className="w-full rounded-md h-12"
                >
                  <span className="mr-2">
                    <FiPlus />
                  </span>
                  {t("Add Discount")}
                </Button>
              </div>
            </div>
          </form>
        </CardBody>
      </Card>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0 mb-4">
        <CardBody>
          <form
            onSubmit={handleSubmitForAll}
            className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
          >
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Input
                value={searchCustomerName}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                type="search"
                name="search"
                placeholder={t("Customer Name")}
                onChange={(e) => setSearchCustomerName(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-5 mr-1"
              ></button>
            </div>
            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Input
                ref={searchRef}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                type="search"
                name="search"
                placeholder="Search Product"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-5 mr-1"
              ></button>
            </div>

            <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
              <Select
                onChange={(e) => setSortedField(e.target.value)}
                className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
              >
                <option value="All" defaultValue hidden>
                  {t("Price")}
                </option>
                <option value="low">{t("LowtoHigh")}</option>
                <option value="high">{t("HightoLow")}</option>
                <option value="date-added-asc">{t("DateAddedAsc")}</option>
                <option value="date-added-desc">{t("DateAddedDesc")}</option>
                <option value="date-updated-asc">{t("DateUpdatedAsc")}</option>
                <option value="date-updated-desc">
                  {t("DateUpdatedDesc")}
                </option>
              </Select>
            </div>
          </form>
        </CardBody>
      </Card>

      {loading ? (
        <TableLoading row={12} col={7} width={160} height={20} />
      ) : (
        resp?.data?.discounts?.length !== 0 && (
          <TableContainer className="mb-8 rounded-b-lg">
            <Table>
              <TableHeader>
                <tr>
               
                  <TableCell>Customer Email</TableCell>
                  <TableCell>Product Name</TableCell>
                  <TableCell> Discount</TableCell>
                  <TableCell> Details</TableCell>
                </tr>
              </TableHeader>
              <DiscountTable data={resp} />
            </Table>
            <TableFooter>
              <Pagination
                totalResults={resp?.totalDoc}
                resultsPerPage={limitData}
                onChange={handleChangePage}
                label="Discount page Navigation"
              />
            </TableFooter>
          </TableContainer>
        )
      )}

      {!loading && resp?.data?.discounts?.length === 0 && (
        <NotFound title="Discount page not found" />
      )}
    </>
  );
};

export default UserDiscount;
