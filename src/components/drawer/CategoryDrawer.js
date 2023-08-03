import { image } from "@cloudinary/url-gen/qualifiers/source";
import { Input } from "@windmill/react-ui";
import DrawerButton from "components/form/DrawerButton";
import Error from "components/form/Error";
import InputArea from "components/form/InputArea";
import LabelArea from "components/form/LabelArea";
import SwitchToggle from "components/form/SwitchToggle";
import TextAreaCom from "components/form/TextAreaCom";
import Title from "components/form/Title";
import Uploader from "components/image-uploader/Uploader";
import RSelect from "components/select";
import useCategorySubmit from "hooks/useCategorySubmit";
import Tree from "rc-tree";
import React, { useState } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import { useTranslation } from "react-i18next";

//internal import
import CategoryServices from "services/CategoryServices";
import { notifyError } from "utils/toast";
import { showingTranslateValue } from "utils/translate";


const CategoryDrawer = ({ id, data, lang }) => {
  const { t } = useTranslation();

  const {
    checked,
    register,
    onSubmit,
    handleSubmit,
    errors,
    imageUrl,
    setImageUrl,
    published,
    setPublished,
    setChecked,
    selectCategoryName,
    setSelectCategoryName,
    handleSelectLanguage,
    isSubmitting,
    setCatName,
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
    catName
  } = useCategorySubmit(id, data);

console.log(catName?.en,"name")
  const STYLE = `
  .rc-tree-child-tree {
    display: hidden;
  }
  .node-motion {
    transition: all .3s;
    overflow-y: hidden;
  }
`;

  const motion = {
    motionName: "node-motion",
    motionAppear: false,
    onAppearStart: (node) => {
      return { height: 0 };
    },
    onAppearActive: (node) => ({ height: node.scrollHeight }),
    onLeaveStart: (node) => ({ height: node.offsetHeight }),
    onLeaveActive: () => ({ height: 0 }),
  };

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push({
        title: showingTranslateValue(category.name, lang),
        key: category._id,
        children:
          category.children.length > 0 && renderCategories(category.children),
      });
    }

    return myCategories;
  };

  const findObject = (obj, target) => {
    return obj._id === target
      ? obj
      : obj?.children?.reduce(
        (acc, obj) => acc ?? findObject(obj, target),
        undefined
      );
  };

  const handleSelect = async (key) => {
    // console.log('key', key, 'id', id);
    if (key === undefined) return;
    if (id) {
      const parentCategoryId = await CategoryServices.getCategoryById(key);

      if (id === key) {
        return notifyError("This can't be select as a parent category!");
      } else if (id === parentCategoryId.parentId) {
        return notifyError("This can't be select as a parent category!");
      } else {
        if (key === undefined) return;
        setChecked(key);

        const obj = data[0];
        const result = findObject(obj, key);

        setSelectCategoryName(showingTranslateValue(result?.name, lang));
      }
    } else {
      if (key === undefined) return;
      setChecked(key);

      const obj = data[0];
      const result = findObject(obj, key);

      setSelectCategoryName(showingTranslateValue(result?.name, lang));
    }
  };

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ];



  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            register={register}
            // handleSelectLanguage={handleSelectLanguage}
            title={t("UpdateCategory")}
          // description={t("UpdateCategoryDescription")}
          />
        ) : (
          <Title
            register={register}
            // handleSelectLanguage={handleSelectLanguage}
            title={t("Category information")}
          //description={t("AddCategoryDescription")}
          />
        )}
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-6 flex-grow scrollbar-hide w-full max-h-full pb-40">
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Name")} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="name"
                  name="name"
                  type="text"
                  value={catName?.en}
                  onChange={(e) => setCatName(e.target.value)}
                  
                  placeholder="Name"
                //  placeholder={t("ParentCategoryPlaceholder")}

                />
                <Error errorName={errors.name} />
              </div>
            </div>



            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Parent Category")} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="parentname"
                  name="parentname"
                  type="text"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="parent Category"

                />
                <Error errorName={errors.parentname} />
              </div>
            </div>


            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Order Number")} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="orderNumber"
                  name="orderNumber"
                  type="number"
                  value={orderNo}
                  onChange={(e) => setOrderNo(e.target.value)}
                  placeholder="Order Level"

                />
                <span>Higher number has high priarity </span>
                <Error errorName={errors.orderNumber} />
              </div>
            </div>



            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Type")} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="type"
                  name="type"
                  type="text"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  placeholder="Type"

                />
                <Error errorName={errors.type} />
              </div>
            </div>


            <div className="">
              <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("Banner (200x200)")} />
                <div className="col-span-8 sm:col-span-4">
                  <div className="border-gray">
                    {/* <div className="border-solid border-2 bg-gray-200 p-2 inline-block">
                    <label htmlFor="baner">
                      Browse
                    </label>
                  </div> */}
                    {/* <input type="file" id="baner" multiple={true} onChange={(e) => handleUploadBaner(e, "photos")} /> */}
                    <Uploader
                      imageUrl={bannerImage}
                      setImageUrl={setBannerImage}
                      folder="category"
                    />

                  </div>

                </div>
              </div>
            </div>



            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Icon (32x32)")} />
              <div className="col-span-8 sm:col-span-4">
                <div className="border-gray">
                  {/* <div className="border-solid border-2 bg-gray-200 p-2 inline-block">
                    <label htmlFor="premiumPhoto">
                      Browse
                    </label>
                  </div> */}
                  {/* <input
                    type="file"
                    id="premiumPhoto"
                    multiple={false}
                    onChange={(e) => handleUploadMultipleImages(e, "photos")}
                  /> */}

                  <Uploader
                    imageUrl={imageUrl}
                    setImageUrl={setImageUrl}
                    folder="category"
                  />
                </div>

              </div>
            </div>


            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Cover Image (250x250)")} />
              <div className="col-span-8 sm:col-span-4">
                <div className=" border-gray">
                  {/* <div className="border-solid border-2 bg-gray-200 p-2 inline-block">
                    <label htmlFor="photo">
                      Browse
                    </label>
                  </div> */}
                  {/* <input
                    type="file"
                    id="photo"
                    onChange={(e) => handleUploadImages(e, "photos")}
                  /> */}
                  <Uploader
                    imageUrl={metaImage}
                    setImageUrl={setMetaImage}
                    folder="metaimage"
                  />
                  {/* <p>{metaImage}</p> */}
                </div>

              </div>
            </div>

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Meta Title")} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="metaTitle"
                  name="metaTitle"
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  placeholder='Meta Title'

                />
                <Error errorName={errors.metaTitle} />
              </div>
            </div>



            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t(" Meta Description")} />
              <div className="col-span-8 sm:col-span-4">
                <TextAreaCom
                  required
                  register={register}
                  label="description"
                  name="description"
                  type="text"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e?.target?.value)}

                />
                <Error errorName={errors.description} />
              </div>
            </div>

            {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("ParentCategory")} />
              <div className="col-span-8 sm:col-span-4 relative">
                <Input
                  readOnly
                  {...register(`parent`, {
                    required: false,
                  })}
                  name="parent"
                  value={selectCategoryName ? selectCategoryName : "Home"}
                  placeholder={t("ParentCategory")}
                  type="text"
                  className="border h-12 w-full text-sm focus:outline-none block bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                />

                <div className="draggable-demo capitalize">
                  <style dangerouslySetInnerHTML={{ __html: STYLE }} />
                  <Tree
                    expandAction="click"
                    treeData={renderCategories(data)}
                    selectedKeys={[checked]}
                    onSelect={(v) => handleSelect(v[0])}
                    motion={motion}
                    animation="slide-up"
                  />
                </div>
              </div>
            </div> */}



            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Filtering Attributes")} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="attributes"
                  name="attributes"
                  type="text"
                  placeholder="Attributes"
                  value={attributes}
                  onChange={(e) => setAttributes(e.target.value)}
                />
                <Error errorName={errors.attributes} />
              </div>
            </div>

            {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("CategoryIcon")} />
              <div className="col-span-8 sm:col-span-4">
                <Uploader
                  imageUrl={imageUrl}
                  setImageUrl={setImageUrl}
                  folder="category"
                />
              </div>


            </div> */}

            {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={t("Published")} />
              <div className="col-span-8 sm:col-span-4">
                <SwitchToggle
                  handleProcess={setPublished}
                  processOption={published}
                />
              </div>
            </div> */}
          </div>

          <DrawerButton id={id} title="Save" isSubmitting={isSubmitting} />
        </form>
      </Scrollbars>
    </>
  );
};

export default CategoryDrawer;
