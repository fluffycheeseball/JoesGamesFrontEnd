import React, { useState, useEffect, ChangeEvent } from "react";
import { RouteComponentProps } from 'react-router-dom';
import OrderService from "../services/OrderService";
import IOrder from "../types/IOrder";

interface RouterProps { // type for `match.params`
  id: string; // must be type `string` since value comes from the URL
}

type Props = RouteComponentProps<RouterProps>;

const Order: React.FC<Props> = (props: Props) => {
  const initialOrderState = {
    Id: null,
    Name: "",
    Items:[],
  };
  const [currentOrder, setCurrentOrder] = useState<IOrder>(initialOrderState);
  const [message, setMessage] = useState<string>("");

  const getTutorial = (id: string) => {
    OrderService.get(id)
      .then((response: any) => {
        setCurrentOrder(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTutorial(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCurrentOrder({ ...currentOrder, Name: value });
  };

  const updateOrder = () => {
    OrderService.update(currentOrder.Id, currentOrder)
      .then((response: any) => {
        console.log(response.data);
        setMessage("The order was updated successfully!");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const deleteOrder = () => {
    OrderService.remove(currentOrder.Id)
      .then((response: any) => {
        console.log(response.data);
        props.history.push("/orders");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentOrder ? (
        <div className="edit-form">
          <h4>Tutorial</h4>
          <form>
            <div className="form-group">
              <label htmlFor="ordername">Name</label>
              <input
                type="text"
                className="form-control"
                id="ordername"
                name="ordername"
                value={currentOrder.Name}
                onChange={handleInputChange}
              />
            </div>
          </form>

          <button className="badge badge-danger mr-2" onClick={deleteOrder}>
            Delete
          </button>

          <button
            type="submit"
            className="badge badge-success"
            onClick={updateOrder}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on an Order...</p>
        </div>
      )}
    </div>
  );
};

export default Order;
