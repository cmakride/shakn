import { CocktailCard } from "../../components/CocktailCard/CocktailCard";


const Collection = ({cocktails,profile, handleAddCocktailFav,handleRemoveCocktailFav,handleDeleteCocktail}) => {

  const favoritesArray = profile.favoriteCocktails
  const cocktailFavoritesArray = getFavorites(cocktails)

  function getFavorites(array){
    let tempArray = []
    favoritesArray.forEach(id => {
      cocktails.forEach(cocktail=>{
        if(cocktail._id === id){
          tempArray.push(cocktail)
          
        }
      })
    })
    return tempArray
  }
  


 //!function checking if in the collection or not

  
  return ( 
    <>
     <h1 className="mt-8 text-center text-3xl font-bold">Favorites List</h1>
        <div className="grid grid-cols-1 gap-4 mx-5 justify-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {cocktailFavoritesArray.map((cocktail,idx) => (
                
                <div className="h-96 w-96 max-w-xs border-2 border-gray-200 border-opacity-600 rounded-lg overflow-hidden bg-gradient-to-r from-light-100 to-dark-100" key={idx} >
                   <CocktailCard profile={profile} cocktail={cocktail}
                   handleRemoveCocktailFav={handleRemoveCocktailFav}
                   handleAddCocktailFav ={handleAddCocktailFav}
                   handleDeleteCocktail={handleDeleteCocktail}
                   />
                </div>
            ))}
        </div>
    
    </>
   );
}
 
export default Collection;