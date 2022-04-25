import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { Loader } from "./Loader/Loader";

export const CategoryTable = ({ categories }) => {

    const auth = useContext(AuthContext);
    const message = useMessage();
    const navigate = useNavigate();
    const { loading, error, request, clearError } = useHttp();

    const [cats, setCats] = useState(categories);

    useEffect( () => {
        message(error);
        clearError(); 
     }, [error, message, clearError]);

    const deleteCategory = async (id) => {
        console.log(id);
        try {
            const del = await request(
                `api/categories/delete-category/${id}`,
                "DELETE",
                {id},
                {"Content-Type": "application/json", "Authorization": `Bearer ${auth.token}`}
            );
            console.log(del);
            let newCats = cats.filter(item => {
                if (item._id !== id){
                    return item;                    
                }
                return null;
            });
            console.log(newCats);
            setCats([...newCats]);
            message(`Category ${id} deleted`);
        } catch (error) {
            console.log(error);
        }
    };

    const editHandler = (id) => {
        navigate(`../update-category/${id}`, {replace: true});
    };

    const deleteHandler = (id) => {
        const del = window.confirm("Are you sure? This action cannot be canceled.");
        if (del){
            deleteCategory(id);
        }
    };

    if (loading){
        return <Loader />
    }

    if (!cats.length) {
        return <p className="center">No categories available</p>
    }

    return (
        <table className="highlight">
            <thead className="blue lighten-5">
                <tr>
                    <th>#</th>
                    <th>Category Name</th>
                    <th>Category Description</th>
                    <th>Category Comment</th>
                    <th colSpan="2">Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    cats.map((category, index) => {
                        return (
                            <tr key={category._id}>
                                <td>{index + 1}</td>
                                <td>{category.name}</td>
                                <td>{category.description}</td>
                                <td>{category.comment}</td>
                                <td>
                                    <button className="waves-effect waves-light blue darken-4 btn" onClick={() => editHandler(category._id)}>
                                        Edit
                                    </button>
                                </td>
                                <td>
                                    <button className="waves-effect waves-light red lighten-1 btn" onClick={() => deleteHandler(category._id)}>
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
