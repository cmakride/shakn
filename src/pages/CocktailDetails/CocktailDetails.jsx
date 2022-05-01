import React, { useState,useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Comments from '../../components/Comments/Comments';
import Reviews from '../../components/Reviews/Reviews';
import MakeReview from '../../components/MakeReview/MakeReview';

function CocktailDetail({ cocktails, handleAddRating,handleAddCocktailFav, handleAddComment, profile }) {
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
            <div>
                <img className="object-scale-down h-48 w-96, w-40 p-2 m-1 bg-white rounded-xl md:flex md:flex-wrap shadow-lg float-left" src={currentCocktail.image} alt="Cocktail" />
                <h1>{currentCocktail.name}</h1>
                <Reviews reviews={reviewsArray}/>
                <h2>Method: {currentCocktail.method}</h2>
                <h2>Garnish: {currentCocktail.garnish}</h2>
                <h2>Served in: {currentCocktail.served_in}</h2>
                <h2>Ingredients:</h2> 
                {currentCocktail.ingredients.map((ingredient,idx)=>(
                    <div key={idx} >
                        {ingredient}
                        </div>

                ))}
                <br />
                <MakeReview handleAddRating={handleAddRating}reviews={reviewsArray} profileId = {profileId} cocktailId={currentCocktail._id}/>
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
                <Comments comments = {commentsArray}/>
            
        </div>
            </>
            :
            <h4>
                Cocktail is loading
            </h4>
    );
}

export default CocktailDetail;