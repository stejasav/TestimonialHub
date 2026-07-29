function RatingStars({ rating }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <svg
        key={i}
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill={i <= rating ? "#B8863D" : "none"}
        stroke={i <= rating ? "#B8863D" : "#D3D0C6"}
        strokeWidth="1.5"
        className="transition-colors duration-150"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    );
  }

  return <div className="flex items-center gap-0.5">{stars}</div>;
}

export default RatingStars;