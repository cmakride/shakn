const Comments = ({comments}) => {



  return ( 
    <>
    {comments.length ?
    <>
    {comments.map((comment,idx)=>
  <div className= "w-full h-20 p-2 border rounded focus:outline-none focus:ring-gray-300 focus:ring-1" key={idx}>
    <p>user: {comment.profile.name}</p>
    <p>{comment.comment}</p>
    

  </div>

    )}
    </>
    :
    <>
    <h3>Loading Comments</h3>
    </>
}
    </>
   );
}
 
export default Comments;