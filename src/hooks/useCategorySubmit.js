import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SidebarContext } from "context/SidebarContext";
import CategoryServices from "services/CategoryServices";
import { notifyError, notifySuccess } from "utils/toast";

const useCategorySubmit = (id, data) => {
  const { isDrawerOpen, closeDrawer, setIsUpdate, lang } =
    useContext(SidebarContext);
  const [resData, setResData] = useState({});
  const [checked, setChecked] = useState("");
  const [imageUrl, setImageUrl] = useState();
  const [orderNo, setOrderNo] = useState("")
  const [catName, setCatName] = useState()
  const [parentName, setParentName] = useState("")
  const [bannerImage, setBannerImage] = useState([])
  const [metaImage, setMetaImage] = useState()
  const [metaTitle, setMetaTitle] = useState("")
  const [metaDescription, setMetaDescription] = useState("")
  const [attributes, setAttributes] = useState("")
  const [type, setType] = useState("")
  const [children, setChildren] = useState([]);
  const [language, setLanguage] = useState(lang);
  const [published, setPublished] = useState(true);
  const [selectCategoryName, setSelectCategoryName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log(metaImage, "-----", bannerImage, "++++++++++++", imageUrl, "))))))))))))")
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm();



  const onSubmit = async ({ name, description }) => {
    try {
      setIsSubmitting(true);
      const categoryData = {
        // name: {
        //   [catName.en]: name,
        // },

        name: {
          [language]: name,
        },
        description: { [language]: description ? description : "" },
        parentId: checked ? checked : undefined,
        parentName: selectCategoryName ? selectCategoryName : "Home",
        orderNo: orderNo ? orderNo : "",
        parentName: parentName,
        type: type ? type : "main",
        bannerImage: [bannerImage],
        icon: imageUrl,
        metaImage: metaImage,
        metaTitle: metaTitle,
        metaDescription: metaDescription,
        attributes: attributes,
        status: published ? "show" : "hide",
        lang: language,
      };

      console.log(categoryData, "meta")

      if (id) {
        const res = await CategoryServices.updateCategory(id, categoryData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
        closeDrawer();
        reset();
      } else {
        const res = await CategoryServices.addCategory(categoryData);
        console.log(res, "category")
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

  const handleSelectLanguage = (lang) => {
    setLanguage(lang);
    if (Object.keys(resData).length > 0) {
      setValue("name", resData.name[lang ? lang : "en"]);
      setValue("description", resData.description[lang ? lang : "en"]);
    }
  };

 

  useEffect(() => {
    if (!isDrawerOpen) {
      setResData({});
      setValue("name");
      setValue("parentId");
      setValue("parentName");
      setValue("metadescription");
      setValue("icon");
      // setValue("imageUrl")
      // setValue("metaImage")
      // setValue("bannerImage")
      setValue("")
      setImageUrl(null);
      setOrderNo("");
      setParentName('');
      setBannerImage(null)
      setMetaImage(null)
      setMetaTitle("")
      setMetaDescription("")
      setAttributes("")
      setType("")
      setCatName('')
      setPublished(true);
      clearErrors("name");
      clearErrors("attributes")
      clearErrors("orderNumber")
      clearErrors("type")
      clearErrors('metaTitle')
      clearErrors("parentId");
      clearErrors("parentname");
      clearErrors("metadescription");
      setSelectCategoryName("Home");
      setLanguage(lang);
      setValue("language", language);


      if (data !== undefined && data[0]?._id !== undefined) {
        setChecked(data[0]._id);
      }
      return;
    }
    if (id) {
      (async () => {
        try {
          const res = await CategoryServices.getCategoryById(id);
          console.log("res category", res);

          if (res) {
            setResData(res);
           // setValue("name", res.name.en[catName ? catName : "en"]);
             setValue("name", res.name[language ? language : "en"]);
            setValue(
              "description",
              res.description[language ? language : "en"]
            );
            
            setValue("language", language);
            setValue("parentId", res.parentId);
            setValue("parentname", res.parentName);
            setValue("type", res.type)
            setValue("metaTitle",res.metaTitle)
            setValue("attributes", res.attributes)
            setValue("orderNumber",res.orderNo)
           // setValue("name",res.name.en)
            setSelectCategoryName(res.parentName);
            setChecked(res.parentId);
            setImageUrl(res?.icon);
            setOrderNo(res?.orderNo)
            setParentName(res?.parentName)
            setBannerImage(res.bannerImage)
            setMetaImage(res.metaImage)
            setCatName(res.catName)
            setMetaTitle(res.metaTitle)
            setMetaDescription(res.metaDescription)
            setAttributes(res.attributes)
            setType(res.type)
            setPublished(res.status === "show" ? true : false);
          }
        } catch (err) {
          notifyError(err ? err.response.data.message : err.message);
        }
      })();
    }
  }, [id, setValue, isDrawerOpen, language, clearErrors, data, lang,]);

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
    orderNo,
    setOrderNo,
    parentName,
    setParentName,
    type,
    setType,
    bannerImage,
    setBannerImage,
    metaTitle,
    setMetaTitle,
    metaDescription,
    setMetaDescription,
    metaImage,
    setMetaImage,
    attributes,
    setAttributes,
    children,
    setChildren,
    published,
    setPublished,
    checked,
    setChecked,
    isSubmitting,
    selectCategoryName,
    setSelectCategoryName,
    handleSelectLanguage,
    setCatName, catName
  };
};

export default useCategorySubmit;
