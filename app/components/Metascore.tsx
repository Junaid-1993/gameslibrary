export default function Metascore({ score }: { score: number }) {
  let scoreColor = "";

  if (score < 55) {
    scoreColor = "252, 120, 120";
  } else if (score < 75) {
    scoreColor = "250, 240, 137";
  } else {
    scoreColor = "154, 230, 180";
  }

  return (
    <span
      style={{ color: `rgb(${scoreColor})`, backgroundColor: `rgb(${scoreColor}, 20%)` }}
      className="rounded-sm p-1.5 leading-none font-semibold md:rounded-md md:p-2 md:text-lg"
    >
      {score}
    </span>
  );
}
