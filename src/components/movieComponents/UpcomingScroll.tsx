import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function CarouselDemo(props: Record<string, unknown>) {
  return (
    <Carousel className="w-full ">
      <CarouselContent>
        {Array.from({ length: 8 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent>
                  <div
                    className="w-full h-[900px] bg-center bg-no-repeat bg-cover"
                    style={{
                      backgroundImage: `url("https://image.tmdb.org/t/p/w400${props.backdrop_path}")`,
                    }}
                  ></div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
