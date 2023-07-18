import { TableCell, TableRow } from "@windmill/react-ui";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import DiscountServices from "services/DiscountServices";

const DiscountDetails = () => {
  const ID = useSelector((state) => state.id);
  const [res, setRes] = useState();
  console.log("🚀 ~ file: DiscountDetails.js:10 ~ DiscountDetails ~ res:", res)
  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const response = await DiscountServices.getDiscountById(ID);
     
        setRes(response);

        // Handle the response, e.g., update state with the fetched data
      } catch (error) {
        // Handle the error, e.g., display an error message
      }
    };
    fetchDiscounts();
  }, [ID]);

  return <>
hi
  </>
  ;
};

export default DiscountDetails;
