import React, {useCallback, useContext, useEffect, useState} from "react";
import { Loader } from "../components/Loader/Loader";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import { CategoryTable } from "../components/CategoryTable";

export const SearchCategory = () => {
    const [categories, setCategories] = useState({});
    const {loading, request} = useHttp();
    const {token} = useContext(AuthContext);

    const fetchCategories = useCallback(async() => {
        try {
            const fetched = await request('/api/categories/search-category', "GET", null, {
                Authorization: `Bearer ${token}`
            });
            setCategories(fetched);
            console.log(fetched);
        } catch (e) {
            
        }
    }, [token, request]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    if (loading || categories.categories === undefined){
        return (<Loader />)
    }

    return (
        <div className="card">
            {!loading && <CategoryTable categories={categories.categories} />}
        </div>
    )
};
