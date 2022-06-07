import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from "react-router-dom"
import { BsTrash } from 'react-icons/bs'

function EditCocktail({handleUpdateCocktail}) {
    const location = useLocation()
    const [formData, setFormData] = useState(location.state.cocktail)
    const [validForm, setValidForm] = useState(true)
    const formElement = useRef()

    const cocktailId = location.state.cocktail._id

    //?Ingredient States
    const formElementIng = useRef()
    const [inputValue, setInputValue] = useState("");
    const [formDataIngredient, setformDataIngredient] = useState({})
    const [arrayIngredients, setArrayIngredients] = useState([])

    const handleChange = evt => {
        setFormData({...formData, [evt.target.name]: evt.target.value })
    }
    
    useEffect(() => {
        formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
    }, [formData])
    
    const handleChangePhoto = (evt) => {
        setFormData({...formData, photo: evt.target.files[0]})
    }

    //! Ingredient Functions
    const handleIngredientAdd = (evt) => {
        evt.preventDefault()
        //!adding the ingredient in form to the arrayIngredients in state
        setArrayIngredients(arrayIngredients => [...arrayIngredients, formDataIngredient.ingredient])
        setInputValue("")    
    }
    const handleRemoveIngredient = (id) => {
        const newArray = arrayIngredients

        setArrayIngredients(newArray.filter((item, index) => index !== id));
    }
    const handleIngredientChange = (evt) => {
        setInputValue(evt.target.value)
        setformDataIngredient({ ...formDataIngredient, [evt.target.name]: evt.target.value });
    };
    //!End of Ingredient Functions

    const handleSubmit = evt => {
        evt.preventDefault()
        const cocktailFormData = new FormData()
        cocktailFormData.append('image', formData.photo)
        cocktailFormData.append('name', formData.name)
        cocktailFormData.append('method', formData.method)
        cocktailFormData.append('served_in', formData.served_in)
        cocktailFormData.append('garnish', formData.garnish)
        

        for(let i = 0 ; i < arrayIngredients.length; i++){
            cocktailFormData.append('ingredients[]',arrayIngredients[i])
        }
        handleUpdateCocktail(cocktailFormData,cocktailId)
    }

    return (
        <div className="max-w-2xl mx-auto bg-white px-16 py-10 rounded-md">
        <h1 className="py-3 text-center text-3xl font-bold">Edit Cocktail</h1>
        <form className="grid gap-6 mb-6 lg:grid-cols-1" autoComplete="off" ref={formElement} onSubmit={handleSubmit}>
            <div>
            <label className="mt-8 text text-l font-medium" htmlFor="name-input">Cocktail Name:</label>
                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={formData.name}
                />

                <br />
                <label className="mt-8 text text-2xl font-bold" htmlFor="method-input">Method:</label>
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="method"
                    onChange={handleChange}
                    value={formData.method}>
                    <option></option>
                    <option>Shake</option>
                    <option>Mixing Glass</option>
                    <option>Build in Glass</option>
                </select> <br />
                <label className="mt-8 text text-2xl font-bold" htmlFor="garnish-input">Garnish:</label>
                <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    name="garnish"
                    onChange={handleChange}
                    value={formData.garnish}
                    required
                /> <br />
                <label  className="mt-8 text text-2xl font-bold" htmlFor="servedin-input">Served in:</label>
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    name="served_in"
                    onChange={handleChange}
                    value={formData.served_in}
                    required
                >
                    <option></option>
                    <option>Martini Glass</option>
                    <option>Rocks Glass</option>
                    <option>Rocks Glass Ice</option>
                    <option>High Ball</option>
                    <option>Globe Glass</option>
                    
                </select> <br />
                
            </div>
           
            <div>
            <div className="grid gap-6 mb-6 lg:grid-cols-1">
                <label className="mt-1 text text-2xl font-bold" htmlFor="photo-upload">
                    Upload Photo:
                </label>
                <input
                    type="file"
                    className="mt-1 text text-xl font-bold bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 w-full box-border"
                    id="photo-upload"
                    name="image"
                    onChange={handleChangePhoto}
                />
            </div>
            </div>
            <div>
                <button className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" type="submit" disabled={!validForm}>
                    Save Cocktail
                </button>
            </div>
        </form>

        <form
                autoComplete='off'
                ref={formElementIng}
                onSubmit={handleIngredientAdd}>
                <h4
                    className="mt-8 text text-2xl font-bold">Please Add an Ingredient</h4>
                <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    name="ingredient"
                    value={inputValue}
                    onChange={handleIngredientChange}
                /> <br />
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type='submit'

                >
                    Add Ingredient
                </button>
            </form>
            <h4 className="mt-8 text text-2xl font-bold">Ingredients</h4>
            <ul>
                {arrayIngredients.map((ingredient, idx) => (
                    <li className="flex items-center gap-3" key={idx}>
                        <h2>{ingredient}</h2>
                        <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2 mr-1 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" type="button" onClick={() => handleRemoveIngredient(idx)}>
                        <BsTrash className="text-xl" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export {
    EditCocktail
}