import { useParams} from "react-router-dom"
import { useGetToursBySlug } from "../../Hooks/useApisServices"
import ReviewCard from "./ReviewCard"
import { checkout } from "../../services/api"


const TourDetail = () => {
  const params = useParams()
  console.log(params)
  const tourParams = (params.slug)
  console.log(tourParams)
  const tourd = useGetToursBySlug(`${tourParams}`)?.data
  const tourId =tourd?._id
  // console.log(tourd?.reviews.map(rev=>rev.user.map(users=>users.name)))
  if(!tourd){
    return;
  }
  
  function checkOut(e:React.MouseEvent<HTMLButtonElement, MouseEvent>, tourId:string) {
    e.preventDefault()
    checkout(tourId)
  }
  return (
    <div className="bg-gradient-to-tr from-gray-100 z-40 to-gray-50  w-[90vw] sm:ml-8"> 
    <section className="  my-auto h-auto gap-28 m-auto">
    <div className="overflow-hidden flex flex-col transition-all
     duration-[0.3s] rounded ">
      <div
      className="bg-gradient-to-tl from-green-400 z-40
       to-green-300 transform card w-full h-[60rem] relative">
        {/* <div className="w-full h-full "/> */}
        <div className="w-full h-full">
        <div className="opacity-30">
           <img src={`/img/tours/${tourd?.imageCover}`} alt="logo" />
        </div>
          <div className=" absolute top-[30%] sm:left-[10%] lg:left-[25%] right-1 ">
            <div className="bg-clip-border border-none
             bg-green-300 text-white font-bold
              text-lgz-10 sm:text-7xl uppercase text-center
             pr-4 py-5 sm:w-[28rem] -left-80  sm:left-56 lg:left-64 top-1 absolute">
            {tourd?.name}
            </div>
            <div className="absolute -left-96 top-28 sm:left-72 sm:top-56">
              <div className="space-x-5 justify-center flex text-center  
              font-semibold w-full text-white text-3xl">
              <div className="flex space-x-2"> 
              <span >{tourd.duration}</span> <span>days</span>
              </div >
              <div>{tourd.startLocation.description}</div>
              </div>
            </div>
          </div>
          </div>
      </div>
      </div>
    </section>
    <section className="mx-52 h-full text-gray-500 lg:mx-96">
    <div className="grid sm:grid-cols-1 gap-32 lg:grid-cols-2">
      <div >
      <div className="mt-20">
        <h2 className="text-4xl font-extrabold mb-9 text-green-400">QUICK FACTS</h2>
        <div className="my-5 text-2xl  space-y-4">
          <div className=" space-x-3 sm:space-x-6" >
            <span className="font-semibold">Next date </span>
            <span className="font-medium">{new Date(tourd.startDates[0]).toLocaleDateString('en-US',{month:'long', year:'numeric'})}</span>
          </div>
          <div className=" space-x-6">
            <span className="font-semibold">Difficulty</span>
            <span className="font-medium">{tourd.difficulty}</span>
          </div>
          <div className=" space-x-6">
            <span className="font-semibold">Participant</span>
            <span className="font-medium">{tourd.maxGroupSize} people</span>
          </div>
          <div className=" space-x-6">
            <span className="font-semibold">Rating</span>
            <span className="font-medium">{tourd.ratingsAverage.toFixed(1)}/5</span>
          </div>
        </div>
        <div className="mt-10">
          <h2 className="text-4xl font-extrabold mb-9 mt-28 text-green-400">
            YOUR TOUR GUIDES
          </h2>
          
            {tourd.guides.map(guide=>(
              <div key={guide.name} >
                <div className=" flex items-center content-center my-5 space-x-4">
                <img className="rounded-full w-16 h-16" src={`/img/users/${guide.photo}`}/>
                <div className="flex space-x-5  text-2xl">
                  <div className="font-semibold uppercase">{guide.role === "guide" && "Tour "}{guide.role}</div>
                  <div className="font-medium">{guide.name}</div>
                </div>
                
                </div>
                </div>
            ))}
            
        </div>
      </div>
      </div>
      <div className="mt-20 font-normal font-sans  text-2xl">
        <h2>About {tourd.name} tour</h2>
        <div>
        {tourd.description.split('\n').map(p=>(<p key={p} className="mb-8">{p}</p>))}
        </div>
      </div>
    </div>
    </section>

    <section className="mt-28 pb-10 pt-12">
    <div className="flex w-[95vw] -skew-y-3 space-x-1">
      {tourd.images.map(img=>(
        
        <img key={img} className="w-[29.8vw]" src={`/img/tours/${img}`}/>
       
      )
      )}
      </div>
   </section>
   <section className=" w-[90vw]  my-36 relative xl:block hidden" >  
       <div className="bg-gradient-to-tl h-[60rem] from-green-400
       to-green-300 mb-3 pt-28 -skew-y-6"/>    
    <div className="right-[1%] 2xl:left-72 sm:left-[1%] top-[25%] transform t
    ranslate-y-[50] z-50 absolute 2xl:space-x-16 space-x-10 flex">
      {tourd?.reviews.slice(0,5).map(rev=>
      <div className=" bg-white w-96">
      <ReviewCard key={rev.user[0].name} review={rev}/>
    </div>)}
    </div>
   </section>
   <div className="w-[45rem] overflow-hidden h-48"></div>
   <section className="pb-40 mb-4 -bottom-[20rem]">
    <div className="bg-white overflow-hidden py-28 m-auto flex items-center 
    w-[75vw]  border rounded-xl">
     <div className=" relative w-56">
      <img src="/img/logo-green-round.png" className="rounded-full h-44 absolute 
      w-44 z-50 -left-[50%] translate-y-[50%] transform -bottom-[50%] translate-x-[40%] "  alt="Natours" />
      <img src={`/img/tours/${tourd.images[0]}`} className="rounded-full
       -left-[15%]  translate-y-[50%] transform -bottom-[50%] translate-x-[40%] h-44 w-44 bg-green-400 absolute" alt="" />
      <img src={`/img/tours/${tourd.images[1]}`} className="rounded-full
       absolute -left-[35%] translate-y-[50%] transform -bottom-[50%] translate-x-[40%] h-44  w-44" alt="" /> 
      </div>  
    <div className="text-gray-500 ml-11 ">
      <h2 className="uppercase text-green-500 font-semibold text-4xl">
        What are you waiting for?
      </h2>
      <p className="text-3xl font-medium">
        10 days. 1 adventure infinite memories make it your's today!
        </p>
    </div>
    <button onClick={e => checkOut(e, tourId!)} className="ml-28 text-2xl text-white px-9 py-4 rounded-full bg-green-400">
       BOOK TOUR NOW 
    </button>
    </div>
   </section>
    </div>


    
  )
    
  
}

export default TourDetail