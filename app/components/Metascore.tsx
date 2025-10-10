export default function Metascore({ score, solidColor }: { score: number; solidColor?: boolean }) {
  let scoreColor = "";

  if (score < 55) {
    scoreColor = solidColor ? "242, 105, 105" : "252, 120, 120";
  } else if (score < 75) {
    scoreColor = solidColor ? "250, 204, 21" : "250, 240, 137";
  } else {
    scoreColor = solidColor ? "34, 197, 94" : "154, 230, 180";
  }

  return (
    <span
      style={{
        color: solidColor ? `rgb(0,0,0)` : `rgb(${scoreColor})`,
        backgroundColor: solidColor ? `rgb(${scoreColor})` : `rgb(${scoreColor}, 20%)`,
      }}
      className="rounded-sm p-1.5 leading-5 font-semibold md:rounded-md md:p-2 md:text-[18px]"
    >
      {score}
    </span>
  );
}
