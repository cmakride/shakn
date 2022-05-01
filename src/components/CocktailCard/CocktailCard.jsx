import { Link } from "react-router-dom"
import { BsSuitHeart, BsSuitHeartFill, BsTrash } from 'react-icons/bs'
import { FiEdit } from 'react-icons/fi'

function CocktailCard({ cocktail, handleDeleteCocktail, handleRemoveCocktailFav, handleAddCocktailFav, profile }) {
    const cocktailId = cocktail._id
    const favoritesArray = profile.favoriteCocktails

    const inFavorites = favoritesArray?.find(i => i === cocktailId)


    return (
        <>
            <div>
                <Link to="/cocktail" state={{ cocktail }}>
                    <img src={cocktail.image} alt="cocktail" className="w-full h-80 object-cover object-center" />

                </Link>
            </div>
            <div id="buttons-container" className="flex justify-center h-16 content-center gap-5">

                {((cocktail.profile._id === profile._id) || (cocktail.profile === profile._id)) ?
                    <>  <button>
                        <Link className="text-2xl" to='/editcocktail' state={{ cocktail }}><FiEdit /></Link>
                    </button>
                        <button className="text-2xl" onClick={() => handleDeleteCocktail(cocktailId)} ><BsTrash /></button>
                    </>
                    :
                    <>
                    </>

                }
                {favoritesArray ?
                    <>
                        {inFavorites ?
                            <>
                                <button className="text-2xl" onClick={() => handleRemoveCocktailFav(cocktail)}><BsSuitHeartFill /></button>
                            </>
                            :
                            <>
                                <button className="text-2xl" onClick={() => handleAddCocktailFav(cocktail)}><BsSuitHeart /></button>
                            </>
                        }
                    </>
                    :
                    <>
                        <div id="name-container" className="flex mt-4">
                            <h3 className="font-cocktail-name" >{cocktail.name}</h3>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export {
    CocktailCard
}