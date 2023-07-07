import {
    Avatar,
    Badge,
    TableBody,
    TableCell,
    TableRow,
  } from "@windmill/react-ui";
  import MainDrawer from "components/drawer/MainDrawer";
  import ProductDrawer from "components/drawer/ProductDrawer";
  import CheckBox from "components/form/CheckBox";
  import DeleteModal from "components/modal/DeleteModal";
  import EditDeleteButton from "components/table/EditDeleteButton";
  import ShowHideButton from "components/table/ShowHideButton";
  import Tooltip from "components/tooltip/Tooltip";
  import useToggleDrawer from "hooks/useToggleDrawer";
  import { t } from "i18next";
  import { FiZoomIn } from "react-icons/fi";
  import { Link } from "react-router-dom";
  import { showingTranslateValue } from "utils/translate";
  
  //internal import
  
  const DiscountTable = ({ products, isCheck, setIsCheck, currency, lang }) => {
    const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  
    const handleClick = (e) => {
      const { id, checked } = e.target;
      console.log("id", id, checked);
  
      setIsCheck([...isCheck, id]);
      if (!checked) {
        setIsCheck(isCheck.filter((item) => item !== id));
      }
    };
  
    return (
      <>
        {isCheck?.length < 1 && <DeleteModal id={serviceId} title={title} />}
  
        {isCheck?.length < 2 && (
          <MainDrawer>
            <ProductDrawer currency={currency} id={serviceId} />
          </MainDrawer>
        )}
  
        <TableBody>
         
            <TableRow>
              <TableCell>
              <CheckBox
                type="checkbox"
             
              />
              
              </TableCell>
  
              
  
              <TableCell>
                <span className="text-sm">
                 jkerfhk
                </span>
              </TableCell>
  
             
  
          
  
              
              {/* <TableCell>
               
                  <Badge type="success">{t("Selling")}</Badge>
                
                  <Badge type="danger">{t("SoldOut")}</Badge>
                
              </TableCell> */}
              {/* <TableCell>
                <Link
                  to={`/product/$`}
                  className="flex justify-center text-gray-400 hover:text-green-600"
                >
                  <Tooltip
                    id="view"
                    Icon={FiZoomIn}
                    title={t("DetailsTbl")}
                    bgColor="#10B981"
                  />
                </Link>
              </TableCell> */}
              {/* <TableCell className="text-center"> */}
                {/* <ShowHideButton  /> */}
                {/* {product.status} */}
              {/* </TableCell> */}
              <TableCell>
                <EditDeleteButton
                //   id={product._id}
                //   product={product}
                //   isCheck={isCheck}
                //   handleUpdate={handleUpdate}
                //   handleModalOpen={handleModalOpen}
                //   title={showingTranslateValue(product?.title, lang)}
                />
              </TableCell>
            </TableRow>
        
        </TableBody>
      </>
    );
  };
  
  export default DiscountTable;
  