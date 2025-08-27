import Feature from "./Feature";

export default function AllFeatures() {
  const featuresData = [
    {
      icon: { src: "icons/feature-icon-gear.svg", alt: "Game controller icon" },
      title: "Games Discovery",
      description: "Browse thousands of games by genre, rating & more.",
    },
    {
      icon: { src: "icons/feature-icon-library.svg", alt: "Library icon" },
      title: "My Library",
      description: "Build and manage your custom game lists your way.",
    },
    {
      icon: { src: "icons/feature-icon-star.svg", alt: "Star icon" },
      title: "Ratings & Reviews",
      description: "Leave ratings and share short or detailed reviews.",
    },
    {
      icon: { src: "icons/feature-icon-book.svg", alt: "Book icon" },
      title: "Game Journal",
      description: "Privately log your thoughts, progress, and memorable moments as you play.",
    },
    {
      icon: { src: "icons/feature-icon-share.svg", alt: "Share icon" },
      title: "Review Sharing",
      description: "Share your reviews with other gamers or on social platforms.",
    },
    {
      icon: { src: "icons/feature-icon-tags.svg", alt: "Tags icon" },
      title: "Smart Tags",
      description:
        "Use genre and custom tags to filter your library, reviews, and journal entries.",
    },
  ];
  return (
    <>
      {featuresData.map((data) => (
        <Feature
          key={data.title}
          icon={data.icon}
          title={data.title}
          description={data.description}
        />
      ))}
    </>
  );
}
