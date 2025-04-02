import { Link } from "react-router-dom"
// import backgroundImage from '../../public/assets/img/tours/tour-2-1.jpg'
interface OverviewCardProps{
  name:string,
  duration:number,
  imageCover:string,
  difficulty:string,
  startLocation:string,
  summary:string,
  startDate:[string],
  numLocation:[object],
  maxGroupSize:number,
  price:number,
  ratingsAverage:number,
  ratingsQuantity:number,
  slug:string
}

const OverviewCard = ({name,duration,
  difficulty,startLocation,
  summary,startDate,maxGroupSize,
  imageCover,numLocation,
  price,ratingsAverage,
  ratingsQuantity, slug
}:OverviewCardProps) => {

  // const image = 
    return (

    <div className="max-w-[40rem] my-auto h-auto gap-28 m-auto">
    <div className="overflow-hidden flex flex-col transition-all
     duration-[0.3s] rounded ">
      <div
      className="bg-gradient-to-tl from-green-400 z-40 to-green-300 
      transform card relative w-full h-full">
        {/* <div className="w-full h-full "/> */}
        <div className=" opacity-35 w-full h-full">
           <img src={`/img/tours/${imageCover}`} alt="logo" />
           </div>
          <div className=" text-right absolute 
           text-white text-4xl top-72 rounded-lg p-8">
            <div className="bg-green-400 z-10 px-11 py-5 w-[19rem] left-72 top-1 absolute">
            {name}
            </div>
          </div>
              </div>
    </div>
    <div>
          <div className="p-8"> 
            <div className="text-3xl font-semibold">{difficulty} {duration}-day tour</div>
            <div className="text-3xl py-3">
              <div>
              <div className="pb-1">
              {summary}
              </div>
              </div>
               </div>
            <div>
            <div className="grid text-2xl gap-y-8 mt-8 grid-cols-2 
            gap-x-36">
            <div> 
              <span>{startLocation}</span>       
              </div>
              <div>
              <span>
                {new Date(startDate[0]).toLocaleDateString('en-US',{month:'long', year:'numeric'})}
                </span>
              </div>
              <div>
              <span>{numLocation.length} stops</span>
              </div>
              <div>
              <span>{maxGroupSize} people</span>
              </div>            
              </div>
              <div className="mt-10 text-2xl font-medium gap-x-36 grid grid-cols-2">
               <div>
                <div className="mb-2">
                  <span className="mr-2">${price}</span>  
                  <span>per person</span>
                </div>
                  <div className="mt-6 space-x-1">
                  <span>{ratingsAverage} ratings </span>
                 <span> ({ratingsQuantity})</span>
                  </div>
                </div>   
                <div>
                  <button className=" rounded-full py-5 text-2xl text-white px-10 bg-green-400">
                   <Link to={`/tour/${slug}`}>Details</Link>
              </button>
                </div>
              </div>
            </div>
          </div>
          
        </div>
    </div>
    
  )
}

export default OverviewCard