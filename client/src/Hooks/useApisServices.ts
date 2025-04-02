import { useIsLogeedIn, useSlugTours, useTours } from "../services/queries";



export const useGetToursApi =()=>{
    const tours =  useTours()
    const doc = tours
    if(!doc) return;
    return doc
}
export const useGetIsLogeedIn =()=>{
    const isLogedIn =  useIsLogeedIn()
    const doc = isLogedIn
    if(!doc) return;
    return doc
}
export const useGetToursBySlug =(slug:string)=>{
    const tours =  useSlugTours(slug)
    const doc = tours
    if(!doc) return;
    return doc
}
