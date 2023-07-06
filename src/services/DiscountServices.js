import requests from "./httpService";

const DiscountServices = {
  getAllDiscount: async () => {
    return requests.get("/discount");
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
};

export default DiscountServices;
