function RatingSummary ({ratings, index}) {
 const totalRatings = ratings.length;
 const averageRating = totalRatings > 0 ? ratings.reduce((acc, curr) => acc + curr) / totalRatings : 0;

 return (
    <>
        {averageRating.toFixed(1)}
    </>
 );
}

export default RatingSummary