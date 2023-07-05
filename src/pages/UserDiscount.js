import { Input } from '@windmill/react-ui';
import Error from 'components/form/Error';
import LabelArea from 'components/form/LabelArea';
import useAsync from 'hooks/useAsync';
import { t } from 'i18next';
import Multiselect from 'multiselect-react-dropdown';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import CustomerServices from 'services/CustomerServices';

const UserDiscount = () => {

//   const { id } = useParams();


    const { data } = useAsync(CustomerServices.getAllCustomers);
    console.log("🚀 ~ file: UserDiscount.js:18 ~ UserDiscount ~ data:", data)
    const options = data.map((item) => {
        const obj = {
          // _id: item.email,
          name: item.email,
        };
        return obj;
      });
    const [email, setEmail] = useState([]);
  const [disPrice, setDisPrice] = useState(0);
  return (
   <>
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
                        options={options}
                        placeholder={"Customer Email"}
                      ></Multiselect>
                    </div>
                  </div>
                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Product Name")} />
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
                        options={options}
                        placeholder={"Emter product name"}
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

   
   
   </>
  )
}

export default UserDiscount
