import axios from "axios"
import { Session, TourProps, UserProps } from "../types/types"
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";

const TOUR_URL ="";
 axios.defaults.withCredentials=true
const axiosInstance = axios.create({baseURL:TOUR_URL, withCredentials:true})

export const getTours = async ()=>{
    return (await axiosInstance.get<TourProps[]>('/api/v1/tours')).data
    // try {
    //     // if(!res){}
    //     console.log(res)
    //     return res
    // } catch (error) {
    //     toast.error("Error getting request")    
    // }
}
export const signOut = async ()=>{
    return (await axiosInstance.post('/api/v1/users/signout')).data
    
    // try {
    //     console.log(res)
    //     return res
    // } catch (error) {
    // toast.error("Error getting request")    
    // }
}
export const isLoggedIn = async ()=>{
    return (await axiosInstance.get('/api/v1/users/isLoggedin'))?.data
    // try {
    //     console.log(res)
    //     return res
    // } catch (error) {
    // toast.error("Error getting request")   
    // }
}

export const getToursBySlug = async (slug:string)=>{
    try {
        const res = (await axiosInstance.get<TourProps>(`/api/v1/tours/tourslug/${slug}`)).data
        console.log(res)
        return res
    } catch (error) {
        toast.error("Error geting request")  
    }
}
export const checkout = async (tourId:string)=>{
    const stripe = await loadStripe("pk_test_51Q7EbhGp6rBCdY4fZEExYYOyNRpzDVUq1V3ZuspUCbFjDPtLfyOpNsHnOo0PduHrkiD77AlibVHUR7oeO5kw4BrL00onrohp8C")
    try {
        const res = (await axiosInstance.get<Session>(`/api/v1/bookings/checkout-session/${tourId}`)).data
        console.log(res.session.id)
        await stripe?.redirectToCheckout({
            sessionId:res.session.id
        })
    } catch (error) {
        toast.error("Error geting request")  
    }
}

export const createUser = async (data:UserProps)=>{
    return (await axiosInstance.post("/api/v1/users/signup", data)).data
    // try {
    //     return res
    // } catch (error) {
    //     toast.error(error)
    // }
}
export const updateUser = async (data:FormData | UserProps, type:string)=>{
    const url = type === 'password' ? "/api/v1/users/updateMyPassword" : "/api/v1/users/updateMe"
    return (await axiosInstance.patch(url, data)).data
    // try {
    //     return res
    // } catch (error) {
    //     toast.error(error)
    // }
}
export const loginUser = async (data:UserProps)=>{
    return (await axiosInstance.post("/api/v1/users/login", data)).data
    // try {
        
    //     // toast.success("user Loggedin successfully")
    //     return res
        
        
    // } catch (error) {
    //     toast.error("Invalid email or password")
    // }
}
