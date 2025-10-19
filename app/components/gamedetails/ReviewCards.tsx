import ReviewCard from "./ReviewCard";

export default function ReviewCards({ id }: { id: string }) {
  const reviews = [
    {
      id: 1,
      author: "Alex Martinez",
      avatarUrl: "/avatars/avatar.png",
      rating: 8,
      reviewTitle: "An Epic Adventure!",
      dateAdded: "April 15, 2024",
      content:
        "An incredible game with a vast open world and deep lore. Highly recommended to any RPG fan. The graphics are stunning, and the storyline kept me hooked from start to finish.",
    },
    {
      id: 2,
      author: "Emma Johnson",
      avatarUrl: "/avatars/avatar_2.png",
      rating: 8,
      reviewTitle: "Impressive World-Building",
      dateAdded: "April 10, 2024",
      content:
        "The game's world is incredibly detailed and immersive. However, the combat can be a bit repetitive at times. Still, a must-play for RPG enthusiasts.",
    },
    {
      id: 3,
      author: "Daniel Roberts",
      avatarUrl: "/avatars/avatar_3.png",
      rating: 7,
      reviewTitle: "Challenging but rewarding",
      dateAdded: "April 5, 2024",
      content:
        "This game is tough but fair. It took me sometime to get used to the mechanics, but once I did, I was very rewarding. The story is engaging, and the side quests are worth exploring.",
    },
  ];

  return (
    <section className="mt-2 flex flex-wrap gap-6 lg:mt-8">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} id={id} />
      ))}
    </section>
  );
}
