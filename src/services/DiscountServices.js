import requests from "./httpService";

const DiscountServices = {
  getAllDiscount: async ( page, limit,title, price,customerName) => {
    const searchTitle = title !== null ? title : "";
    const searchPrice = price !== null ? price : "";
    const searchCustomerName = customerName !== null ? customerName : "";
    return requests.get(`/discount?page=${page}&limit=${limit}&title=${searchTitle}&price=${searchPrice}&customerName=${searchCustomerName}`);
  },

  addDiscount: async (body) => {
    return requests.post("/discount/add", body);
  },

  updateDiscount: async (id, body) => {
    return requests.patch(`/discount/update/${id}`, body);
  },

  deleteDiscount: async (id, body) => {
    return requests.delete(`/discount/${id}`, body);
  },
  getDiscountById: async(id,body)=>{
    return requests.get(`/discount/get/${id}`,body)
  }
};

export default DiscountServices;
