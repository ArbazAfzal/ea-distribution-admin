
import requests from "./httpService";



const DiscountServices = {
    // getAllDiscount: async (body) => {
    //     return requests.get("/api/discount",body);
    // },


    getAllDiscount: async (res) => {
        console.log(res.data,"=============== all========================")
        return requests.get("/api/discount/", );
    },

    addDiscount: async (body) => {
        console.log(body,"=============== ")
        return requests.post("/api/discount/add", body)
    }
    ,

    updateDiscount: async (id, body) => {
        return requests.put(`/api/discount/update/${id}`, body)
    },
    deleteDiscount: async (id, body) => {
        return requests.delete(`/apa/discount/delete${id}`, body)
    }

}

export default DiscountServices;