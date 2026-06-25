import { Star } from "lucide-react";

interface StarRatingProps {
  rate: number;
  count?: number;
  size?: "sm" | "md";
}

export default function StarRating({
  rate,
  count,
  size = "sm",
}: StarRatingProps) {
  const full = Math.floor(rate);
  const half = rate - full >= 0.5;
  const starSize = size === "sm" ? 14 : 20;

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, index) => {
          if (index < full) {
            return (
              <Star
                key={index}
                size={starSize}
                className="fill-yellow-400 text-yellow-400"
              />
            );
          }

          if (index === full && half) {
            return (
              <div
                key={index}
                className="relative"
                style={{ width: starSize, height: starSize }}
              >
                <Star
                  size={starSize}
                  className="absolute text-gray-300"
                />

                <div
                  className="absolute overflow-hidden"
                  style={{ width: "50%" }}
                >
                  <Star
                    size={starSize}
                    className="fill-yellow-400 text-yellow-400"
                  />
                </div>
              </div>
            );
          }

          return (
            <Star
              key={index}
              size={starSize}
              className="text-gray-300"
            />
          );
        })}
      </div>

      <span className="text-xs text-gray-500 font-medium">
        {rate.toFixed(1)}
        {count !== undefined && (
          <span className="text-gray-400"> ({count})</span>
        )}
      </span>
    </div>
  );
}