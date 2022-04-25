import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { Loader } from "./Loader/Loader";

export const CustomerTable = ({ customers }) => {

    const auth = useContext(AuthContext);
    const message = useMessage();
    const navigate = useNavigate();
    const { loading, error, request, clearError } = useHttp();

    const [cmpCustomers, setCustomers] = useState(customers);

    useEffect( () => {
        message(error);
        clearError(); 
     }, [error, message, clearError]);

    const deleteCustomer = async (id) => {
        console.log(id);
        try {
            const del = await request(
                `api/customers/delete-customer/${id}`,
                "DELETE",
                {id},
                {"Content-Type": "application/json", "Authorization": `Bearer ${auth.token}`}
            );
            console.log(del);
            let newCmpCustomers = cmpCustomers.filter(item => {
                if (item._id !== id){
                    return item;                    
                }
                return null;
            });
            console.log(newCmpCustomers);
            setCmpCustomers([...newCmpCustomers]);
            message(`Customer ${id} deleted`);
        } catch (error) {
            console.log(error);
        }
    };

    const editHandler = (id) => {
        navigate(`../update-customer/${id}`, {replace: true});
    };

    const deleteHandler = (id) => {
        const del = window.confirm("Are you sure? This action cannot be canceled.");
        if (del){
            deleteCustomer(id);
        }
    };

    if (loading){
        return <Loader />
    }

    if (!cmpCustomers.length) {
        return <p className="center">No categories available</p>
    }

    return (
        <table className="highlight">
            <thead className="blue lighten-5">
                <tr>
                    <th>#</th>
                    <th>Customer Name</th>
                    <th>Customer Description</th>
                    <th>Customer Address</th>
                    <th>Customer TaxPayerNumber</th>
                    <th>Customer Comment</th>
                    <th colSpan="2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    cmpCustomers.map((customer, index) => {
                        return (
                            <tr key={customer._id}>
                                <td>{index + 1}</td>
                                <td>{customer.name}</td>
                                <td>{customer.description}</td>
                                <td>{customer.comment}</td>
                                <td>
                                    <button className="waves-effect waves-light blue darken-4 btn" onClick={() => editHandler(customer._id)}>
                                        Edit
                                    </button>
                                </td>
                                <td>
                                    <button className="waves-effect waves-light red lighten-1 btn" onClick={() => deleteHandler(customer._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    );
};
