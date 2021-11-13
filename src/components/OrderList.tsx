import React, { useState, useEffect, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import OrderService from "../services/OrderService";
import IOrder from '../types/IOrder';

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Array<IOrder>>([]);
  const [currentOrder, setCurrentOrder] = useState<IOrder | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [searchName, setSearchOrderName] = useState<string>("");

  useEffect(() => {
    retrieveOrders();
  }, []);

  const onChangeSearchName = (e: ChangeEvent<HTMLInputElement>) => {
    const searchOrderName = e.target.value;
    setSearchOrderName(searchOrderName);
  };

  const retrieveOrders = () => {
    OrderService.getAll()
      .then((response: any) => {
        setOrders(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveOrders();
    setCurrentOrder(null);
    setCurrentIndex(-1);
  };

  const setActiveOrder = (tutorial: IOrder, index: number) => {
    setCurrentOrder(tutorial);
    setCurrentIndex(index);
  };

  const removeAllOrders = () => {
    OrderService.removeAll()
      .then((response: any) => {
        console.log(response.data);
        refreshList();
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    OrderService.findByName(searchName)
      .then((response: any) => {
        setOrders(response.data);
        setCurrentOrder(null);
        setCurrentIndex(-1);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchName}
            onChange={onChangeSearchName}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Orders List</h4>

        <ul className="list-group">
          {orders &&
            orders.map((order, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveOrder(order, index)}
                key={index}
              >
                {order.Name}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllOrders}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentOrder ? (
          <div>
            <h4>Tutorial</h4>
            <div>
              <label>
                <strong>Name:</strong>
              </label>{" "}
              {currentOrder.Name}
            </div>

            <Link
              to={"/orders/" + currentOrder.Id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on an Order...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderList;
