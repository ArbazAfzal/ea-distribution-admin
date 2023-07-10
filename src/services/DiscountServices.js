import requests from "./httpService";

const DiscountServices = {
  getAllDiscount: async ( page, limit) => {
    return requests.get(`/discount?page=${page}&limit=${limit}`);
  },

  addDiscount: async (body) => {
    return requests.post("/discount/add", body);
  },

  updateDiscount: async (id, body) => {
    return requests.put(`/discount/update/${id}`, body);
  },

  deleteDiscount: async (id, body) => {
    return requests.delete(`/discount/delete${id}`, body);
  },
  getDiscountById: async(id,body)=>{
    return requests.get(`/discount/get/${id}`,body)
  }
};

export default DiscountServices;
