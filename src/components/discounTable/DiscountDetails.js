import { Table, TableBody, TableCell, TableContainer, TableHeader, TableRow } from '@windmill/react-ui'
import PageTitle from 'components/Typography/PageTitle'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import DiscountServices from 'services/DiscountServices'

const DiscountDetails = () => {
  const ID = useSelector((state) => state.viewId);
  console.log("🚀 ~ file: DiscountDetails.js:9 ~ DiscountDetails ~ ID:", ID)
  const [discountdata, setDiscount] = useState({ customers: [], products: [] });

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const data = await DiscountServices.getDiscountById(ID);
        setDiscount(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchdata();
  }, [ID]);

  return (
    <div>
      <PageTitle>Discount Details</PageTitle>

      <TableContainer>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell>Product Name</TableCell>
              <TableCell>DISCOUNT</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {discountdata.customers.map((customer, index) => (
              <TableRow key={index}>
                <TableCell>{customer.name}</TableCell>
                {discountdata.products.map((item) => (
                  
                   <TableRow key={item.productId}>
                    <TableCell>{item?.title.en}</TableCell>
                     <TableCell>
                      <img 
                      width={50}
                      src={item.image}
                      />
                     </TableCell>
                   
                   </TableRow>
                ))}
                <TableCell>{discountdata?.discountPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default DiscountDetails


