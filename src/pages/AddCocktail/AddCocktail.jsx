import React, { useState, useEffect, useRef } from 'react';

function AddCocktail(props) {
    const formElement = useRef()
    const formElementIng = useRef()
    const [validForm, setValidForm] = useState(false)

    const [formData, setFormData] = useState({
        name: ""
    })

    //!individual ingredient in the form
    const [formDataIngredient, setformDataIngredient] = useState({})
    const [inputValue, setInputValue] = useState("");

    //! Ingredients Array stored as a state
    const [arrayIngredients, setArrayIngredients] = useState([])

    const handleIngredientChange = (evt) => {
        setInputValue(evt.target.value)
        setformDataIngredient({ ...formDataIngredient, [evt.target.name]: evt.target.value });
    };

    //!For Form
    const handleChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault()
        const cocktailFormData = new FormData()
        cocktailFormData.append('image', formData.photo)
        cocktailFormData.append('name', formData.name)
        cocktailFormData.append('method', formData.method)
        cocktailFormData.append('served_in', formData.served_in)
        cocktailFormData.append('garnish', formData.garnish)

        //! Have to do it this way to get proper array of ingredients in formdata
        for(let i = 0 ; i < arrayIngredients.length; i++){
            cocktailFormData.append('ingredients[]',arrayIngredients[i])
        }
       
        props.handleAddCocktail(cocktailFormData)

        // //! How to view a formData these elements
        // for (var key of cocktailFormData.entries()) {
        //     console.log(key[0] + ', ' + key[1]);
        // }

        //!what had before created formdata instance
        // formData.ingredients = arrayIngredients
        // props.handleAddCocktail(formData)          
    }

    //! add to the state which is an array of ingredients
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

    function enoughIngredients() {
        const tempArray = arrayIngredients
        if (tempArray.length > 0) {
            return true
        }
        else {
            return false
        }

    }

    useEffect(() => {

        //!Make sure have at least 1 ingredient added and form is valid, name, garnish right now
        if (enoughIngredients() && formElement.current.checkValidity()) { setValidForm(true) }
        else {
            setValidForm(false)
        }
    }, [formData, arrayIngredients])

    //!this will store photofile in formdata in state
    const handleChangePhoto = (evt) => {
        setFormData({...formData, photo: evt.target.files[0]})
      }


    return (
        <>
        <div className="container mx-auto px-4" >
            <h1 className="mt-8 text-center text-3xl font-bold">New Cocktail</h1>
            <form autoComplete='off' ref={formElement} onSubmit={handleSubmit}>
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
                <button className="text-white bg-yellow-500 p-2 rounded-md" type='submit'
                    disabled={!validForm}
                >Add Cocktail</button>
            </form><br />
            <form
                autoComplete='off'
                ref={formElementIng}
                onSubmit={handleIngredientAdd}>
                <h4
                    hidden={enoughIngredients()} className="mt-8 text text-2xl font-bold">Please Add an Ingredient</h4>
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
                        <button type="button" onClick={() => handleRemoveIngredient(idx)}>
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
            {/* Upload Photo Form */}
            <div className="form-group mb-4 mt-1 text-sm">
                <label htmlFor="photo-upload" className="mt-8 text text-2xl font-bold">
                    Upload Photo
                </label>
                <input className="mt-8 text text-2xl font-bold bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    type="file"
                    // className="form-control"
                    id="photo-upload"
                    name="image"
                    onChange={handleChangePhoto}
                />
            </div>
    </div>
        </>
    );
}

export default AddCocktail;