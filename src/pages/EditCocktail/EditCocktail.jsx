import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from "react-router-dom"

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
        <>
        <h1>Edit Cocktail</h1>
        <form autoComplete="off" ref={formElement} onSubmit={handleSubmit}>
            <div>
            <label className="mt-8 text text-2xl font-bold" htmlFor="name-input">Cocktail Name:</label>
                <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={formData.name}
                />

                <br />
                <label className="mt-8 text text-2xl font-bold" htmlFor="method-input">Method:</label>
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="method"
                    onChange={handleChange}
                    value={formData.method}>
                    <option></option>
                    <option>Shake</option>
                    <option>Mixing Glass</option>
                    <option>Build in Glass</option>
                </select> <br />
                <label className="mt-8 text text-2xl font-bold" htmlFor="garnish-input">Garnish:</label>
                <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    name="garnish"
                    onChange={handleChange}
                    value={formData.garnish}
                    required
                /> <br />
                <label  className="mt-8 text text-2xl font-bold" htmlFor="servedin-input">Served in:</label>
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            <div>
                <label htmlFor="photo-upload">
                    Upload Photo:
                </label>
                <input
                    type="file"
                    className="form-control"
                    id="photo-upload"
                    name="image"
                    onChange={handleChangePhoto}
                />
            </div>
            </div>
            <div>
                <button type="submit" disabled={!validForm}>
                    Save
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    type="text"
                    name="ingredient"
                    value={inputValue}
                    onChange={handleIngredientChange}
                /> <br />
                <button className="text-white bg-yellow-500 p-2 rounded-md" type='submit'

                >
                    Add Ingredient
                </button>
            </form>
            <h4 className="mt-8 text text-2xl font-bold">Ingredients</h4>
            <ul>
                {arrayIngredients.map((ingredient, idx) => (
                    <li key={idx}>
                        <h2>{ingredient}</h2>
                        <button className="text-white bg-red-500 p-2 rounded-md"type="button" onClick={() => handleRemoveIngredient(idx)}>
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </>
    )
}

export {
    EditCocktail
}