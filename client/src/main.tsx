import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"
import { persistor, store } from './services/redux/app/store.ts'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Overview from './pages/overview/Overview.tsx'
import TourDetail from './pages/tour/TourDetails.tsx'
import SignUp from './pages/auth/SignUp.tsx'
import SignIn from './pages/auth/SignIn.tsx'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import PrivateRoute from './components/PrivateRoute.tsx'
import Profile from './pages/profile/profile.tsx'
// import Checkout from './pages/stripe/Checkout.tsx'
const queryClient = new QueryClient({
  defaultOptions:{queries:{retry:5, retryDelay:1000}}
})

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
          <Route path='/' index={true} element={<Overview/>}/>
          <Route path='/sign-up' index={true} element={<SignUp/>}/>
          <Route path='/sign-in' index={true} element={<SignIn/>}/>
          
           <Route path='' element={<PrivateRoute/>}> 
          <Route path="/tour/:slug" element={<TourDetail/>}/>
          {/* <Route path="/my-tour" element={<Checkout/>}/> */}
          <Route path="/profile" element={<Profile/>}/>
          </Route>
          
          
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
    </PersistGate>
    </Provider>
  </React.StrictMode>,
)
