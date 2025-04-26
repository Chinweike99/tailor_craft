'use client';

import { PortfolioItem } from "@/types/types";
import { useState } from "react";
import { PortfolioCard } from "./ui/PortfolioCard";


const PortfolioItems: PortfolioItem[] = [
    {
        id: "1",
        title: "Fashion",
        imageUrl: "/assets/images/Astronaut.png",
        category: 'native',
        description: "A modern twist on the classic fashion brand",
        tags: ["Tailoring", "Modern", "Landing Page"],
        featured: true
    },
    {
        id: "2",
        title: "Native styles",
        imageUrl: "/assets/images/Astronaut.png",
        category: 'native',
        description: "A modern twist on the classic fashion brand",
        tags: ["Fashion", "Modern", "Landing Page"],
        featured: true
    },
]

export const PortfolioGrid =() => {
    const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

    const handleCardClick = (item: PortfolioItem) => {
        setSelectedItem(item);
        console.log("Clicked item: ", item)
    }

    return (
        <div>
            <h1>Hello Nigeriansss</h1>
            <section  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {PortfolioItems.map((item) => (
                    <PortfolioCard key={item.id} item={item} onClick={handleCardClick} />
                ))}

                {selectedItem && (
                    <div  className="fixed bottom-16 left-4 bg-black text-white p-4 rounded-lg z-50">
                        selected: {selectedItem.title}
                    </div>
                )}

            </section>
        </div>
    )
}