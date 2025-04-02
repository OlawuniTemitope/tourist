import { useGetToursApi} from "../../Hooks/useApisServices"
import OverviewCard from "./OverviewCard"

const Overview = () => {
    const tourData =  useGetToursApi()
    const tour = tourData?.data
    console.log(tour)
 if(!tour) return;
  return (
   <div  className="grid lg:grid-cols-2 xl:grid-cols-3 sm:gap-y-16 grid-cols-1 p-11 sm:gap-x-11 
   sm:grid-cols-1 lg:gap-x-24 lg:gap-y-28 justify-center items-center">
     {tour?.map((data)=>(
        <OverviewCard
        key={data._id}
        name={data.name}
        duration={data.duration}
        imageCover={data.imageCover}
        difficulty={data.difficulty}
        startLocation={data.startLocation.description}
        summary={data.summary}
        startDate={data.startDates}
        numLocation={data.locations}
        maxGroupSize={data.maxGroupSize}
        price={data.price}
        ratingsAverage ={data.ratingsAverage}
        ratingsQuantity={data.ratingsQuantity}
        slug={data.slug}
        />
     ))}
   </div>
  )
}

export default Overview