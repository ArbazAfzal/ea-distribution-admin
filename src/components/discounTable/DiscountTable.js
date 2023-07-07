import {  
    TableBody,
    TableCell,
    TableRow,
} from "@windmill/react-ui";
import MainDrawer from "components/drawer/MainDrawer";
import ProductDrawer from "components/drawer/ProductDrawer";
import CheckBox from "components/form/CheckBox";
import DeleteModal from "components/modal/DeleteModal";
import EditDeleteButton from "components/table/EditDeleteButton";
import useToggleDrawer from "hooks/useToggleDrawer";


//internal import

const DiscountTable = ({ products, isCheck, setIsCheck, currency, lang, data }) => {
    const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

    const handleClick = (e) => {
        const { id, checked } = e.target;
        console.log("id", id, checked);

        setIsCheck([...isCheck, id]);
        if (!checked) {
            setIsCheck(isCheck.filter((item) => item !== id));
        }
    };
    console.log(data, "============table")
    return (
        <>
            {isCheck?.length < 1 && <DeleteModal id={serviceId} title={title} />}

            {isCheck?.length < 2 && (
                <MainDrawer>
                    <ProductDrawer currency={currency} id={serviceId} />
                </MainDrawer>
            )}

            <TableBody>
                {Array.isArray(data?.discounts) &&
                    data?.discounts?.map((dis, i) => (
                        <TableRow key={i + 1}>
                           
                            <TableCell>
                                <CheckBox type="checkbox" />
                            </TableCell>

                            <TableCell>
                            <span className="text-sm">
                                {dis?.customers?.[0]?.name}
                                </span>
                                </TableCell>
                            <TableCell>
                                <span className="text-sm">{dis?.products?.[0]?.title?.en}</span>
                            </TableCell>

                            <TableCell> 
                                <span  className="text-sm">
                                 {dis?.discountPrice}
                                 </span>
                                 </TableCell>
                            <TableCell>
                                <EditDeleteButton />
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </>
    );
};

export default DiscountTable;
