import { Star } from "lucide-react";

type RatingProps = {
  rating: number;
};

const Rating = ({ rating }: RatingProps) => {
  return [1, 2, 3, 4, 5].map((index) => (
    <Star
      key={index}
      color={index <= rating ? "#FFC107" : "#cccdcf"}
      className="w-8 h-8"
    />
  ));
};

export default Rating;
