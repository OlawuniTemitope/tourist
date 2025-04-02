

export interface Session {
  session: {
      id:string
    
  }
}
export interface TourProps {
  _id:string;
    name:  string;
  slug: string,
  duration: number,
  maxGroupSize: number,
      
    difficulty: string,
      
    ratingsAverage:number,
      
    ratingsQuantity: number,
      
    price: number,
      
    priceDiscount:number,
      
    summary:string,
      
    description: string,
      
    imageCover:string,
      
    images: string[],
    createdAt: Date,
      
    startDates: [string],
    secretTour: boolean,
      
    startLocation: {
      type: {
        type: string,
        default: 'Point',
        enum: ['Point']
      },
      coordinates: [number],
      address: string,
      description: string
    },
    locations: [
      {
        type: {
          type: string,
          default: 'Point',
          enum: ['Point']
        },
        coordinates: [number],
        address: string,
        description: string,
        day: number
      }
    ],
    guides: [{name:string, role:string, photo:string}],
    reviews:[{tour:string, user:[{name:string, photo:string}], review:string, rating:number}]

}

export interface UserProps{
  response?: {
    data:{message:string
}  };
  name?:string,
  email?:string,
  photo?:File | string,
  password?:string,
  passwordConfirm?:string
}