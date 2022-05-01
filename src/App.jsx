import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import AddCocktail from './pages/AddCocktail/AddCocktail'
import CocktailList from './pages/CocktailList/CocktailList'
import CocktailDetail from './pages/CocktailDetails/CocktailDetails'
import { EditCocktail } from './pages/EditCocktail/EditCocktail'
import Collection from './pages/Collection/Collection'
import NavBar from './components/NavBar/NavBar'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Profiles from './pages/Profiles/Profiles'
import ProfileDetails from './pages/ProfileDetails/ProfileDetails'
import ProfileEditForm from './pages/ProfileEditForm/ProfileEditForm'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import * as authService from './services/authService'
import * as cocktailService from './services/cocktails'
import * as profileService from './services/profileService'

const App = () => {
  const [cocktails, setCocktails] = useState([])
  
  const [profiles, setProfiles] = useState({})
  

  const [profile, setProfile] = useState({})

  const [user, setUser] = useState(authService.getUser())
  const navigate = useNavigate()

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

  const handleAddCocktail = newCocktailData => {
    cocktailService.create(newCocktailData)
      .then(newCocktail => setCocktails([...cocktails, newCocktail]))
      navigate('/cocktails')
  }

  const handleDeleteCocktail = id => {
    cocktailService.deleteCocktail(id)
      .then(deletedCocktail => setCocktails(cocktails.filter(cocktail => cocktail._id !== deletedCocktail._id)))
  }

  const handleUpdateCocktail = (updatedCocktailData,cocktailId) => {
    
    cocktailService.update(updatedCocktailData,cocktailId)
      .then(updatedCocktail => {
        const newCocktailArray = cocktails.map(cocktail =>
          cocktail._id === updatedCocktail._id ? updatedCocktail : cocktail
        )
        setCocktails(newCocktailArray)
        navigate('/cocktails')
      })
  }

  const handleEditProfile = updatedProfileData => {
    profileService.editProfile(updatedProfileData)
    .then(updatedProfile => {
      console.log(updatedProfile)
      setProfile(updatedProfile)
      const newProfileArray = profiles.map(profile =>
        profile._id === updatedProfile._id ? updatedProfile : profile)
        setProfiles(newProfileArray)
        navigate('/profiles')
    })
  }

  

  const handleAddCocktailFav = cocktail => {
    profileService.addCocktailToCollection(cocktail)
      .then(updatedProfile => {
        setProfile(updatedProfile)
      })
  }

  const handleRemoveCocktailFav = cocktail => {
    profileService.removeCocktailFromCollection(cocktail)
      .then(updatedProfile => {
        setProfile(updatedProfile)
      })
  }

  const handleAddComment = (comment, cocktailId, profileId) => {
    cocktailService.createComment(comment.comment, cocktailId, profileId)
    .then(updatedCocktail=>{
      const newCocktailArray = cocktails.map(cocktail =>
        cocktail._id === updatedCocktail._id ? updatedCocktail : cocktail)
        setCocktails(newCocktailArray)
    })
}

const handleAddRating = (rating, cocktailId,profileId)=>{
  cocktailService.createReview(rating,cocktailId,profileId)
  .then(updatedCocktail=>{
    const newCocktailArray = cocktails.map(cocktail =>
      cocktail._id === updatedCocktail._id ? updatedCocktail : cocktail)
      setCocktails(newCocktailArray)
  })
}

  useEffect(() => {
    cocktailService.getAll()
      .then(allCocktails => setCocktails(allCocktails))
  }, [])

  useEffect(() => {
    profileService.getAllProfiles()
      .then(allProfiles => setProfiles(allProfiles))
  }, [profile])

  useEffect(() => {
    if (user) {
      profileService.getProfileDetail(user.profile)
        .then(profileData => {
          setProfile(profileData)
        })
    }
  }, [user])

  
  return (
    <>
      <div>
        <NavBar user={user} handleLogout={handleLogout} />

        <Routes className="container mx-auto mb-8 px-8">
          <Route path="/" element={
            <CocktailList
            cocktails={cocktails}
            handleDeleteCocktail={handleDeleteCocktail}
            handleAddCocktailFav={handleAddCocktailFav}
            handleRemoveCocktailFav={handleRemoveCocktailFav}
            profile={profile} />}
          />

          <Route
            path="/signup"
            element={<Signup handleSignupOrLogin={handleSignupOrLogin} />}
          />

          <Route
            path="/login"
            element={<Login handleSignupOrLogin={handleSignupOrLogin} />}
          />

          <Route
            path="/profiles"
            element={
              user ? <Profiles /> : <Navigate to="/login" />}
          />

          <Route  path='/profile' element={
            <ProfileDetails 
            profile={profile}
            user={user} />}
          />

          <Route
            path='/favorites'
            element={
              <Collection
                cocktails={cocktails}
                handleAddCocktailFav={handleAddCocktailFav}
                handleRemoveCocktailFav={handleRemoveCocktailFav}
                handleDeleteCocktail={handleDeleteCocktail}
                profile={profile} />}
          />

          <Route path='/add' element={
            <AddCocktail handleAddCocktail={handleAddCocktail} />}
          />

          <Route path='/cocktails' element={
            <CocktailList
              cocktails={cocktails}
              handleDeleteCocktail={handleDeleteCocktail}
              handleAddCocktailFav={handleAddCocktailFav}
              handleRemoveCocktailFav={handleRemoveCocktailFav}
              profile={profile} />}
          />

          <Route path='/cocktail' element={
            <CocktailDetail 
            handleAddComment={handleAddComment}
            cocktails ={cocktails}
            profile={profile}
            user={user}
            handleAddRating ={handleAddRating}
            />}
          />

          <Route path='/editcocktail' element={
            <EditCocktail handleUpdateCocktail={handleUpdateCocktail}
            />}
          />

          <Route path='/editprofile' element={<ProfileEditForm handleEditProfile={handleEditProfile}/>} />

          <Route
            path="/changePassword"
            element={user ? <ChangePassword handleSignupOrLogin={handleSignupOrLogin} /> : <Navigate to="/login" />}
          />

        </Routes>
      </div>
    </>
  )
}

export default App
