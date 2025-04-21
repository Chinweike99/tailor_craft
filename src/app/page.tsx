"use client";
import { BookingForm } from "@/components/BookingForm";
import { PortfolioGrid } from "@/components/PortfolioSection";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const handleClick = () => {
    alert("Booking started!");
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <section className="flex flex-col items-center justify-center h-[200px] text-center p-6  bg-gray-100 dark:bg-gray-900 mb-32">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Welcome to TailorCraft ✂️
        </h1>
        <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
          Crafting premium fits for every occasion. Book your style session now!
        </p>
        <div className="flex gap-4 ">
          <Button
            variant="outline"
            size="xl"
            onClick={handleClick}
            rightIcon={<ArrowRight size={30} />}
            className="w-full"
          >
            Book Now
          </Button>

          <Button
            variant="outline"
            size="xl"
            onClick={() => console.log("Learn more")}
            className="w-full"
          >
            Learn More
          </Button>
        </div>

        
      </section>
      <BookingForm />
      <PortfolioGrid />
    </div>
  );
}
