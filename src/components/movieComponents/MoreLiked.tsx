import { Card, CardContent } from "@/components/ui/card";

export function CardDemo({
  title,
  image,
  rank,
}: {
  title: string;
  image: string;
  rank: number;
}) {
  return (
    <Card className="w-full max-w-sm">
      <CardContent>
        <img
          src={`https://image.tmdb.org/t/p/w400${image}`}
          className="w-full border-none rounded-md"
          alt="Poster"
        />
        <div className="flex items-center justify-start gap-2">
          <img src="./star.svg" alt="star" className="h-4" />
          <p className="text-xl">{Math.floor(rank)}/10</p>
        </div>
        <h1>{title}</h1>
      </CardContent>
    </Card>
  );
}
