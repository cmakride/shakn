import { React, useState } from 'react'
import { AiOutlineStar, AiFillStar } from 'react-icons/ai'

export const MakeReview = ({ reviews, profileId, cocktailId, handleAddRating }) => {

  const [yourReview, setYourReview] = useState(0)
 
  const myReview = reviews.find(c => c.profile === profileId)

  function handleRatingSubmit(evt) {
    evt.preventDefault()
    handleAddRating(yourReview, cocktailId, profileId)
  }


  return (
    reviews ?
      <>
        {myReview ?
          <>
            <div style={{ display: "flex" }}>
              {Array(5).fill().map((_, index) =>
                <div key={index}>
                  {myReview.rating >= index + 1 ?
                    <AiFillStar />
                    :
                    <AiOutlineStar />
                  }
                </div>
              )}
              <h5>Your Review</h5>

            </div>
          </>
          :
          <>
            <form onSubmit={handleRatingSubmit} style={{ display: "flex" }}>
              {Array(5).fill().map((_, index) =>
                <div key={index}>
                  {yourReview >= index + 1 ?
                    <AiFillStar onClick={() => setYourReview(index + 1)} />
                    :
                    <AiOutlineStar onClick={() => setYourReview(index + 1)} />
                  }
                </div>
              )}

              {yourReview > 0 ?
                <>
                  <button className="px-3 py-2 text-sm text-orange-100 bg-orange-600 rounded" type="submit" >Submit Review</button>
                </>
                :
                <>
                  <p>Click a star to make a review</p>
                </>
              }
            </form>
          </>
        }

      </>
      :
      <>
        <h3>Loading Reviews</h3>
      </>
  )
}

export default MakeReview
