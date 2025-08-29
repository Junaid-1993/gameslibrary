import FeatureExplain from "./FeatureExplain";

export default function AllFeaturesExplain() {
  const featuresExplainData = [
    {
      title: "Discover Your Next Favorite Game",
      Description:
        "Browse through a vast, curated library of video games across genres, platforms, and styles. Find hidden gems or trending titles easily with focused filters built for discovery.",
    },
    {
      title: "Game Overview & Player Insights",
      Description:
        "See detailed information about the game, explore community reviews, and manage your own experience — from adding it to your library to writing your personal journal.",
    },
    {
      title: "Create & Customize Game Lists",
      Description:
        "Organize games into your own custom lists like “Want to Play”, “Already Played”, or “Top Favorites.” Add, rename, duplicate, delete or sort lists to build your personal collection.",
    },
    {
      title: "Add Games to Your Library",
      Description:
        "Save any game to your Library. Wishlist it for later, add it to a specific list, or mark it as a favorite — it's your library, your way.",
    },
    {
      title: "Rate & Review Finished Games",
      Description:
        "Share your thoughts once you've completed a game. Leave a quick star rating or write a short or detailed review to reflect on your experience and help others discover great titles.",
    },
    {
      title: "Explore Reviews from Real Players",
      Description:
        "Read reviews from other players who share your taste in games. Discover new titles based on experiences, not just trailers or ratings.",
    },
    {
      title: "Pin Your Most Important Lists",
      Description:
        "Pin your most-used lists so they're always right where you need them. Keep key collections like Now Playing, Favorites, or custom lists at the top of your library for easy access.",
    },
    {
      title: "Track Your Gaming Stats & Progress",
      Description:
        "See how your library grows over time. Keep count of games added, reviews written, ratings given, and more — Monitor your activity with a personal stats dashboard.",
    },
    {
      title: "Share & Connect with Other Gamers",
      Description:
        "Make your reviews, lists, and profile page to inspire others. Discover new games through shared collections and see how others are playing.",
    },
  ];
  return (
    <>
      {featuresExplainData.map((feature, index) => (
        <FeatureExplain
          key={feature.title}
          title={feature.title}
          description={feature.Description}
          index={index}
        />
      ))}
    </>
  );
}
