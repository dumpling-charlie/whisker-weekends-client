function RatingSummary ({ratings}) {
 const totalRatings = ratings.length;
 const averageRating = totalRatings > 0 ? ratings.reduce((acc, curr) => acc + curr) / totalRatings : 0;

 return (
    <div>
        <p>{averageRating.toFixed(1)}</p>
    </div>
 );
}

export default RatingSummary