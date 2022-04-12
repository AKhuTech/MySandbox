import React from "react";

export const CategoryTable = ({ categories }) => {

    const deleteCategory = () => {
        alert ("Deleted");
    };

    const editHandler = () => {
        alert("EDITED!");
    };

    const deleteHandler = () => {
        const del = window.confirm("Are you sure? This action cannot be canceled.");
        if (del){
            deleteCategory();
        }
    };

    if (!categories.length) {
        return <p className="center">No categories available</p>
    }

    return (
        <table className="highlight">
            <thead className="grey lighten-1">
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
                    categories.map((category, index) => {
                        return (
                            <tr key={category._id}>
                                <td>{index + 1}</td>
                                <td>{category.name}</td>
                                <td>{category.description}</td>
                                <td>{category.comment}</td>
                                <td>
                                    <button className="waves-effect waves-light green darken-1 btn" onClick={editHandler}>
                                        Edit
                                    </button>
                                </td>
                                <td>
                                    <button className="waves-effect waves-light red lighten-1 btn" onClick={deleteHandler}>
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
