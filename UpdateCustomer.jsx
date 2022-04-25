import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { Loader } from "./Loader/Loader";

export const UpdateCustomer = () => {
    const { token } = useContext(AuthContext);
    const { loading, error, request, clearError } = useHttp();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState({
        name: "",
        description: "",
        comment: ""
    });
    const message = useMessage();

    const url = window.location.href;
    const customerId = new URL(url).pathname.split("/")[2];

    const backHandler = () => {
        navigate("/search-customer", { replace: true });
    };

    const fetchCustomer = useCallback(async () => {
        try {
            const fetched = await request(`/api/customers/customer/${customerId}`, "GET", null, {
                Authorization: `Bearer ${token}`
            });
            console.log(fetched);
            setCustomer({ ...fetched });
        } catch (error) {

        }
    }, [token, request, customerId]);

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    useEffect(() => {
        fetchCustomer();
    }, [fetchCustomer]);

    const changeHandler = (event) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value });
    };

    const updateCustomer = async () => {
        try {
            console.log({ ...customer });
            const updCustomer = await request(
                `../api/customers/update-customer/${customerId}`,
                "PUT",
                { ...customer },
                { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
            );
            console.log(updCustomer);
            message(`Customer ${JSON.stringify(updCustomer.name)} successfully updated`);
            //navigate
        } catch (error) {

        }
    };

    if (loading) {
        return <Loader />
    }


    if (customer) {
        return (
            <div className="card blue lighten-5">
                <div className="card-content black-text">
                    <div>
                        <button className="waves-effect waves-light blue darken-4 btn" onClick={backHandler}>Back to customers list</button>
                    </div>

                    <span className="card-title"><br />Update Customer</span>
                    <div className="input-field">
                        <input
                            id="customer-name"
                            type="text"
                            className="validate"
                            name="name"
                            onChange={changeHandler}
                            value={customer.name}
                        />
                        <label htmlFor="customer-name" className="active">Customer Name</label>
                    </div>
                    <div className="input-field">
                        <input
                            id="customer-description"
                            type="text"
                            className="validate"
                            name="description"
                            onChange={changeHandler}
                            value={customer.description}
                        />
                        <label htmlFor="customer-description" className="active">Customer Name</label>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <textarea
                                id="customer-comment"
                                className="materialize-textarea"
                                data-length="120"
                                name="comment"
                                onChange={changeHandler}
                                value={customer.comment}
                            >
                            </textarea>
                            <label htmlFor="customer-comment" className="active">Customer Comment</label>
                        </div>
                    </div>

                    <div className="card-action">
                        <button
                            className='waves-effect waves-light btn blue darken-4'
                            onClick={() => updateCustomer()}
                            disabled={loading}
                        >
                            Save changes
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="card">
            <div className="card-content black-text">
                <div>
                    <button className="waves-effect waves-light blue darken-4 btn" onClick={backHandler}>Back to customers list</button>
                </div>
                <div>
                    Customer not found
                </div>
            </div>
        </div>
    );
};
