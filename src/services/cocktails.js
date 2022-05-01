import * as tokenService from './tokenService'
const BASE_URL = `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/cocktails`

function create(cocktail){
    return fetch(BASE_URL, {
        method: 'POST',
        headers: { 
        'Authorization': `Bearer ${tokenService.getToken()}`
    },
        body: cocktail
                             
    })
    .then(res => res.json())
}

function getAll() {
    return fetch(BASE_URL)
    .then(res => res.json())
}

function getDetail(id) {
    return fetch (`${BASE_URL}/${id}}`)
    .then(res => res.json())
}

function deleteCocktail(id) {
    return fetch(`${BASE_URL}/${id}`, {method: 'DELETE'})
  .then(res => res.json())
}

function update(cocktail,cocktailId) {
    console.log("COKTAILID",cocktailId)
    return fetch(`${BASE_URL}/${cocktailId}`, {
        method: 'PUT',
        headers: {'Authorization': `Bearer ${tokenService.getToken()}`},
        body: cocktail
      })
        .then(res => res.json())
    }

 function createComment(comment, cocktailId, profileId){
    let commentObject = {}
    commentObject.comment = comment
    commentObject.profile = profileId
    console.log(commentObject)
    return fetch(`${BASE_URL}/${cocktailId}/comments`, {
        method: 'POST',
        headers: {
            Authorization: 
            `Bearer ${tokenService.getToken()}`,
            'content-type': 'application/json',
          },
        body: JSON.stringify(commentObject)
    })
    .then(res => res.json())
}
function createReview(rating, cocktailId, profileId){
    let ratingObject = {}
    ratingObject.rating = rating
    ratingObject.profile = profileId
    return fetch(`${BASE_URL}/${cocktailId}/reviews`, {
        method: 'POST',
        headers: {
            Authorization: 
            `Bearer ${tokenService.getToken()}`,
            'content-type': 'application/json',
          },
        body: JSON.stringify(ratingObject)
    })
    .then(res => res.json())
}

export {
    createComment,
    update,
    deleteCocktail,
    getDetail,
    create,
    getAll,
    createReview
}