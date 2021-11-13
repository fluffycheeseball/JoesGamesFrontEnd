import http from "../http-common";
import IOrder from "../types/IOrder";

const getAll = () => {
  console.log('getting orders');
  const data =  http.get<Array<IOrder>>("/orders");
  return data;
};

const get = (id: any) => {
  return http.get<IOrder>(`/orders/${id}`);
};

const create = (data: IOrder) => {
  return http.post<IOrder>("/orders", data);
};

const update = (id: any, data: IOrder) => {
  return http.put<any>(`/orders/${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/orders/${id}`);
};

const removeAll = () => {
  return http.delete<any>(`/orders`);
};

const findByOrderName = (title: string) => {
  return http.get<Array<IOrder>>(`/orders?title=${title}`);
};

const OrderService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName: findByOrderName,
};

export default OrderService;
