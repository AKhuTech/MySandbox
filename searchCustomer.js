import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import { useHttp } from "../../../../hooks/http.hook";
import { Loader } from "../../../Loader/Loader";

export const SearchCustomers = () => {

    const [customers, setCustomers] = useState({});
    const { loading, request } = useHttp();
    const { token } = useContext(AuthContext);

    const fetchCustomers = useCallback(async () => {
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

    if (loading || customers.customers === undefined){
        return (<Loader />)
    }

    return (
        <div>{JSON.stringify(customers)}</div>
    );
};
