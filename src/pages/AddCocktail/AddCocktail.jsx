import React, { useState, useEffect, useRef } from 'react';
import { BsTrash } from 'react-icons/bs'

function AddCocktail(props) {

    const formElement = useRef()
    const formElementIng = useRef()
    const [validForm, setValidForm] = useState(false)

    // !alert Messages for ingredients and Name and eventually photo
    const [alertMessageName, setAlertMessageName] = useState("")
    const [alertMessageIngredient, setAlertMessageIngredient] = useState("")

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
        for (let i = 0; i < arrayIngredients.length; i++) {
            cocktailFormData.append('ingredients[]', arrayIngredients[i])
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
        if (arrayIngredients.length > 0 && formElement.current.checkValidity()) {
            setAlertMessageIngredient("")
            setAlertMessageName("")
            setValidForm(true)
        }
        else {
            setValidForm(false)
            if (arrayIngredients.length < 1) {
                setAlertMessageIngredient("Ingredients")
            } else {
                setAlertMessageIngredient("")
            }
            if (!formElement.current.checkValidity()) {
                setAlertMessageName("Name")
            } else {
                setAlertMessageName("")
            }
        }

    }, [formData, arrayIngredients])

    //!this will store photofile in formdata in state
    const handleChangePhoto = (evt) => {
        setFormData({ ...formData, photo: evt.target.files[0] })
    }


    return (
        <>
            <div className="max-w-2xl mx-auto bg-white px-16 py-10 rounded-md" >
                {validForm ?
                    <>
                        <div class="bg-green-100 rounded-md p-3 flex items-center">
                            <svg
                                class="stroke-2 stroke-current text-green-600 h-8 w-8 mr-2 flex-shrink-0"
                                viewBox="0 0 24 24"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M0 0h24v24H0z" stroke="none" />
                                <circle cx="12" cy="12" r="9" />
                                <path d="M9 12l2 2 4-4" />
                            </svg>
                            <div class="text-green-700">
                                <div class="font-bold text-l">Your Cocktail is ready to be submitted!</div>
                            </div>
                        </div>
                    </>
                    :
                    <>
                        <div class="bg-red-100 rounded-md p-3 flex items-center">

                            <div class="text-red-700">
                                <div class="font-bold text-l">
                                    Inputs required: {alertMessageName} {alertMessageIngredient}
                                </div>
                            </div>
                        </div>
                    </>
                }

                <h1 className="py-3 text-center text-3xl font-bold">New Cocktail</h1>
                <form autoComplete='off' ref={formElement} onSubmit={handleSubmit}>
                    <div className="grid gap-6 mb-6 lg:grid-cols-1">
                        <div>
                            <label className="mt-8 text text-l font-medium" htmlFor="name-input">Cocktail Name</label>
                            <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                type="text"
                                name="name"
                                onChange={handleChange}
                                value={formData.name}
                                required={true}
                            />
                        </div>

                        <div>
                            <label className="text text-l font-medium" htmlFor="method-input">Method</label>
                            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="method"
                                onChange={handleChange}
                                value={formData.method}>
                                <option></option>
                                <option>Shake</option>
                                <option>Mixing Glass</option>
                                <option>Build in Glass</option>
                            </select>
                        </div>

                        <div>
                            <label className="text text-l font-medium" htmlFor="garnish-input">Garnish</label>
                            <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                type="text"
                                name="garnish"
                                onChange={handleChange}
                                value={formData.garnish}
                            />
                        </div>

                        <div>
                            <label className="text text-l font-medium" htmlFor="servedin-input">Served in</label>
                            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                name="served_in"
                                onChange={handleChange}
                                value={formData.served_in}
                            >
                                <option></option>
                                <option>Martini Glass</option>
                                <option>Rocks Glass</option>
                                <option>Rocks Glass Ice</option>
                                <option>High Ball</option>
                                <option>Globe Glass</option>

                            </select>
                        </div>
                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type='submit'
                            disabled={!validForm}
                        >Add Cocktail</button>
                    </div>
                </form><br />
                <form
                    autoComplete='off'
                    ref={formElementIng}
                    onSubmit={handleIngredientAdd}>
                    <div className="grid gap-6 mb-6 lg:grid-cols-1">
                        <h4
                            hidden={enoughIngredients()} className="mt-8 text text-2xl font-bold">Ingredient Add</h4>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            name="ingredient"
                            value={inputValue}
                            onChange={handleIngredientChange}
                        />
                        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type='submit'
                        >
                            Add Ingredient
                        </button>
                    </div>
                </form>
                <h4 className="mt-8 text text-2xl font-bold">Ingredients</h4>
                <ul className='my-2'>
                    {arrayIngredients.map((ingredient, idx) => (
                        <li className="flex items-center gap-3" key={idx}>
                            <h2>{ingredient}</h2>
                            <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2 mr-1 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" type="button" onClick={() => handleRemoveIngredient(idx)}>
                                <BsTrash className="text-xl" />
                            </button>
                        </li>
                    ))}
                </ul>
                {/* Upload Photo Form */}
                <div className="grid gap-6 mb-6 lg:grid-cols-1">
                    <label htmlFor="photo-upload" className="mt-1 text text-2xl font-bold">
                        Upload Photo
                    </label>
                    <input className="mt-1 text text-xl font-bold bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 w-full box-border "
                        type="file"
                        id="photo-upload"
                        name="image"
                        onChange={handleChangePhoto}
                    />
                </div>
            </div >
        </>
    );
}

export default AddCocktail;