import { React, useState, useEffect } from 'react'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'

const Reviews = ({ reviews }) => {
  const [number, setNumber] = useState(0)

  const total = reviews.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue.rating
  }, 0)
  

  useEffect(()=>{
    const average = total/reviews.length
    setNumber(average)
  },[total])
  

  return (

    <div style={{ display: "flex" }}>
      {Array(5).fill().map((_, index) =>
        <div key={index}>

          {(number >= (index + 1)) ?

            <>
              <BsStarFill />
            </>

            :

            <>
              {(number >= (index + .5)) ?
                <>
                  <BsStarHalf />
                </>
                :
                <>
                  <BsStar />
                </>

              }
            </>
          }


        </div>
      )}

    </div>
  )
}



export default Reviews
