
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SidebarContext } from "context/SidebarContext";
import { notifyError, notifySuccess } from "utils/toast";
import DiscountServices from "services/DiscountServices";

const useDiscountSubmit = (id, data) => {
  const { isDrawerOpen, closeDrawer, setIsUpdate, lang } =
    useContext(SidebarContext);
  const [resData, setResData] = useState({});
  const [checked, setChecked] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      const discountData = {
        name: {
          [lang]: data.name,
        },
        email: data.email,
        discountPrice: data.discountPrice,
      };

      if (id) {
        const res = await DiscountServices.updateDiscount(id, discountData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
        closeDrawer();
        reset();
      } else {
        const res = await DiscountServices.createDiscount(discountData);
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

  useEffect(() => {
    if (!isDrawerOpen) {
      setResData({});
      setValue("name", "");
      setValue("email", "");
      setValue("discountPrice", "");
      if (data !== undefined && data[0]?._id !== undefined) {
        setChecked(data[0]._id);
      }
      return;
    }
    if (id) {
      (async () => {
        try {
          const res = await DiscountServices.getDiscountById(id);
          console.log("res discount", res);

          if (res) {
            setResData(res);
            setValue("name", res.name[lang ? lang : "en"]);
            setValue("email", res.email);
            setValue("discountPrice", res.discountPrice);
          }
        } catch (err) {
          notifyError(err ? err.response.data.message : err.message);
        }
      })();
    }
  }, [id, setValue, isDrawerOpen, lang, clearErrors, data]);

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    checked,
    setChecked,
    isSubmitting,
  };
};

export default useDiscountSubmit;
