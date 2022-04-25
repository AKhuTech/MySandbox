import React, {useCallback, useContext, useEffect, useState} from "react";
import { Loader } from "../components/Loader/Loader";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { CustomerTable } from "../components/CustomerTable";

export const SearchCustomer = () => {
    const [customers, setCustomers] = useState({});
    const {loading, request} = useHttp();
    const {token} = useContext(AuthContext);

    const fetchCustomers = useCallback(async() => {
        try {
            const fetched = await request('/api/customers/search-customer', "GET", null, {
                Authorization: `Bearer ${token}`
            });
            setCustomers(fetched);
            console.log(fetched);
        } catch (e) {
            
        }
    }, [token, request]);

    useEffect(() => {
        fetchCustomers();
    }, [fetchCustomers]);

    if (loading || !customers.customers){
        return (<Loader />)
    }

    return (
        <div className="card">
            {!loading && <CustomerTable customers={customers.customers} />}
        </div>
    )
};
