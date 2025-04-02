import { useQuery} from "@tanstack/react-query"
import { checkout, getTours, getToursBySlug, isLoggedIn } from "../services/api"

export function useTours(){
    return useQuery({
        queryKey:["tours"],
        queryFn: getTours,
        // refetchOnWindowFocus:false,
        // enabled:som
    })
}
export function useIsLogeedIn(){
    return useQuery({
        queryKey:["isLoggedin"],
        queryFn: isLoggedIn,
        // refetchOnWindowFocus:false,
        // enabled:som
    })
}
export function useSlugTours(slug:string){
    return useQuery({
        queryKey:["tours", {slug}],
        queryFn:() => getToursBySlug(slug),
        // refetchOnWindowFocus:false,
        // enabled:som
    })
}
export function useCheckoutTours(tourId:string){
    return useQuery({
        queryKey:["tours", {tourId}],
        queryFn:() => checkout(tourId),
        // refetchOnWindowFocus:false,
        // enabled:som
    })
}

// export function useToursIds(ids:string[] | undefined ){
    // return useQueries({
    //     queries:(ids ?? []).map((id)=>{
    //         return{
    //             queryKey: ["tour", id],
    //             quertFn : () => getToursById(id)
    //         }
    //     })
    // })
// }