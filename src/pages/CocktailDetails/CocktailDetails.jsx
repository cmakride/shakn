import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Comments from '../../components/Comments/Comments';
import Reviews from '../../components/Reviews/Reviews';
import MakeReview from '../../components/MakeReview/MakeReview';

function CocktailDetail({ cocktails, handleAddRating, handleAddCocktailFav, handleAddComment, profile }) {
    //!As cocktails are being updated by the adding of a comment, 
    //! cocktails details is being refreshed because cocktails is a prop

    const formElement = useRef()
    const location = useLocation()

    const cocktailId = location.state.cocktail._id

    const profileId = profile?._id

    const currentCocktail = cocktails.find(c => c._id === cocktailId)

    const commentsArray = currentCocktail?.comments
    //!Array of Comments for this cocktail


    const reviewsArray = currentCocktail?.reviews
    //!Array of Reviews for this cocktail

    const [formData, setFormData] = useState({
        comment: ''
    })



    const handleTextChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value })
    }

    function handleCommentSubmit(evt) {
        evt.preventDefault()
        handleAddComment(formData, currentCocktail._id, profile._id)
    }



    //! this ternary is saying if current cocktail exists this will be loaded, if does not exists it will go to a loading text and react will wait and check if it does load
    return (

        currentCocktail ?
            <>
                <div className='py-8 w-full flex justify-center items-center'>
                    <div className="bg-white rounded w-11/12 shadow hover:shadow-md duration-4 flex flex-col justify-center items-center">
                        <div className="flex flex-row justify-between uppercase font-bold border-b p-6">
                            <p>{currentCocktail.name}</p>
                        </div>

                        <div className="p-6 flex flex-col items-center gap-1 mb-3">
                            <img className="w-96 flex self-center rounded shadow-lg mb-6" src={currentCocktail.image} alt="Cocktail" />
                            <div className='flex gap-3 items-center'>
                                <h2>Reviews:</h2>
                                <Reviews reviews={reviewsArray} />
                            </div>
                            <h2>Method: {currentCocktail.method}</h2>
                            <h2>Garnish: {currentCocktail.garnish}</h2>
                            <h2>Served in: {currentCocktail.served_in}</h2>
                            <h2>Ingredients:</h2>
                            {currentCocktail.ingredients.map((ingredient, idx) => (
                                <div key={idx} >
                                    {ingredient}
                                </div>

                            ))}

                            <br />
                            <MakeReview handleAddRating={handleAddRating} reviews={reviewsArray} profileId={profileId} cocktailId={currentCocktail._id} />
                        </div>

                        <div className="max-w-lg shadow-md">
                            <form className="w-full p-4"
                                autoComplete='off'
                                ref={formElement}
                                onSubmit={handleCommentSubmit}
                            >
                                <div className="mb-2">
                                    <label htmlFor="comment" className="text-lg text-gray-600">Add a comment</label>

                                    <textarea
                                        name="comment" cols="40" rows="5" className="w-full h-20 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1"
                                        onChange={handleTextChange}>
                                    </textarea>
                                </div>
                                <button className="px-3 py-2 text-sm text-blue-100 bg-blue-600 rounded" type="submit" >Comment</button>
                            </form>
                        </div>


                        <br></br>
                        <Comments comments={commentsArray} />
                    </div>
                </div>
            </>
            :
            <h4>
                Cocktail is loading
            </h4>
    );
}

export default CocktailDetail;