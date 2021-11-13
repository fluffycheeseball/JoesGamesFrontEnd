import React, { useState, ChangeEvent } from "react";
import OrderService from "../services/OrderService";
import IOrder from '../types/IOrder';

const AddOrder: React.FC = () => {
  const initialOrderState = {
    Id: null,
    Name: "",
    Items: [],
  };
  const [order, setOrder] = useState<IOrder>(initialOrderState);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(`event`, event);
    const { value } = event.target;
    setOrder({ ...order, Name: value });
  };

  const saveOrder = () => {
    var data = {
      Name: order.Name,
      Items:order.Items,
 
    };

    OrderService.create(data)
      .then((response: any) => {
        setOrder({
          Id: response.data.Id,
          Name: response.data.Name,
          Items: response.dta.Items,
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

  const newTutorial = () => {
    setOrder(initialOrderState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTutorial}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="ordername">Name</label>
            <input
              type="text"
              className="form-control"
              id="ordername"
              required
              value={order.Name}
              onChange={handleInputChange}
              name="ordername"
            />
          </div>

          <button onClick={saveOrder} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddOrder;
