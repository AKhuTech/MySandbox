import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { Loader } from "./Loader/Loader";

export const UpdateCategory = () => {
    const { token } = useContext(AuthContext);
    const { loading, error, request, clearError } = useHttp();
    const navigate = useNavigate();
    const [category, setCategory] = useState({
        name: "",
        description: "",
        comment: ""
    });
    const message = useMessage();

    const url = window.location.href;
    const categoryId = new URL(url).pathname.split("/")[2];

    const backHandler = () => {
        navigate("/search-category", { replace: true });
    };

    const fetchCategory = useCallback(async () => {
        try {
            const fetched = await request(`/api/categories/category/${categoryId}`, "GET", null, {
                Authorization: `Bearer ${token}`
            });
            console.log(fetched);
            setCategory({ ...fetched });
        } catch (error) {

        }
    }, [token, request, categoryId]);

    useEffect(() => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    useEffect(() => {
        fetchCategory();
    }, [fetchCategory]);

    const changeHandler = (event) => {
        setCategory({ ...category, [event.target.name]: event.target.value });
    };

    const updateCategory = async () => {
        try {
            console.log({ ...category });
            const updCategory = await request(
                `../api/categories/update-category/${categoryId}`,
                "PUT",
                { ...category },
                { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
            );
            console.log(updCategory);
            message(`Category ${JSON.stringify(updCategory.name)} successfully updated`);
            //navigate
        } catch (error) {

        }
    };

    if (loading) {
        return <Loader />
    }


    if (category) {
        return (
            <div className="card blue lighten-5">
                <div className="card-content black-text">
                    <div>
                        <button className="waves-effect waves-light blue darken-4 btn" onClick={backHandler}>Back to categories list</button>
                    </div>

                    <span className="card-title"><br />Update Category</span>
                    <div className="input-field">
                        <input
                            id="category-name"
                            type="text"
                            className="validate"
                            name="name"
                            onChange={changeHandler}
                            value={category.name}
                        />
                        <label htmlFor="category-name" className="active">Category Name</label>
                    </div>
                    <div className="input-field">
                        <input
                            id="category-description"
                            type="text"
                            className="validate"
                            name="description"
                            onChange={changeHandler}
                            value={category.description}
                        />
                        <label htmlFor="category-description" className="active">Category Name</label>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <textarea
                                id="category-comment"
                                className="materialize-textarea"
                                data-length="120"
                                name="comment"
                                onChange={changeHandler}
                                value={category.comment}
                            >
                            </textarea>
                            <label htmlFor="category-comment" className="active">Category Comment</label>
                        </div>
                    </div>

                    <div className="card-action">
                        <button
                            className='waves-effect waves-light btn blue darken-4'
                            onClick={() => updateCategory()}
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
                    <button className="waves-effect waves-light blue darken-4 btn" onClick={backHandler}>Back to categories list</button>
                </div>
                <div>
                    Category not found
                </div>
            </div>
        </div>
    );
};
