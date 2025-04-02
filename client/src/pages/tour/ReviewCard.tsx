import Rating from "../../components/Ratings"

interface RecviewCardProps{
  review: {tour:string, user:[{name:string, photo:string}], review:string, rating:number}
}

const ReviewCard = ({review}:RecviewCardProps) => {
  return (
    <div className="mx-8">   
     <div className="mt-12 mb-9">
      {review.user.map(users=>(
      <div  className=" flex items-center content-center
       m-5 space-x-4">
      <div>
        <img className="rounded-full w-16 h-16" src={`/img/users/${users.photo}`} alt="user images" />
      </div>
      <div className="text-2xl font-semibold">{users.name}</div>
      </div>
    ))}</div>
    <div className="space-y-3 mb-11">
    <div className="text-2xl font-medium">{review.review}</div>
    <div className="flex space-x-5 ">
    <Rating  rating={review.rating || 0} />
    </div>
    </div>
    </div>

  )
}

export default ReviewCard