import { useMutation } from "@tanstack/react-query";
import { UserProps } from "../types/types";
import { createUser, loginUser, updateUser } from "./api";
import { toast } from "react-toastify";


export function useCreateUser(){
    // const queryClient = useQueryClient()
    return useMutation({
        mutationFn:(data:UserProps) =>createUser(data),

        onError: (data:UserProps) =>{
            toast.error(data?.response?.data.message)
         },
         // onSuccess:()=>{
        //     console.log("success")
        // },
        // onSettled : async (_, error) => {
        //     console.log("settled")
        //     if(error){
        //         console.log("error")
        //     }else{
        //         await queryClient.invalidateQueries({queryKey:["tour"]})
        //     }
        // }
    })
}
export function useUpdateUser(){
    // const queryClient = useQueryClient()
    return useMutation({
        mutationFn:(data:UserProps | FormData) =>updateUser(data, "User"),

        onError: (data:UserProps) =>{
            toast.error(data?.response?.data.message)
         },
         // onSuccess:()=>{
        //     console.log("success")
        // },
        // onSettled : async (_, error) => {
        //     console.log("settled")
        //     if(error){
        //         console.log("error")
        //     }else{
        //         await queryClient.invalidateQueries({queryKey:["tour"]})
        //     }
        // }
    })
}
export function useUpdateUserPassword(){
    // const queryClient = useQueryClient()
    return useMutation({
        mutationFn:(data:UserProps) =>updateUser(data, "password"),

        onError: (data:UserProps) =>{
            toast.error(data?.response?.data.message)
         },
         // onSuccess:()=>{
        //     console.log("success")
        // },
        // onSettled : async (_, error) => {
        //     console.log("settled")
        //     if(error){
        //         console.log("error")
        //     }else{
        //         await queryClient.invalidateQueries({queryKey:["tour"]})
        //     }
        // }
    })
}
export  function useLoginUser (){
    return  useMutation ({
        mutationFn: async (data:UserProps) => await loginUser(data),

        onError: (data:UserProps) =>{
           toast.error(data?.response?.data?.message)
        },
        onSuccess: async ()=>{
         
}
})
}
// export function useUpdateTour(){
//     const queryClient = useQueryClient()
//     return useMutation({
//         // mutationFn:(data:TourProps) =>updateTour(data),

//         onMutate:() =>{
//             console.log("mutate")
//         },
//         onError: () =>{
//             console.log("error")
//         },
//         onSuccess:()=>{
//             console.log("success")
//         },
//         onSettled : async (_, error, variable) => {
//             console.log("settled")
//             if(error){
//                 console.log("error")
//             }else{
//                 await queryClient.invalidateQueries({queryKey:["tours"]})
//                 // await queryClient.invalidateQueries({queryKey:["tour", {id:variable.data[0]._id}]})
//             }
//         }
//     })
// }