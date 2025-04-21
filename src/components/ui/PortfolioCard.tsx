"use client";

import { PortfolioItem } from "@/types/types";
import { useState } from "react";
import { motion } from 'framer-motion';
import Image from "next/image";

interface PortfolioCardProps {
    item: PortfolioItem;
    onClick: (item: PortfolioItem) => void;
}

export const PortfolioCard = ({item, onClick}: PortfolioCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return(
        <motion.div
        className="group relative overflow-hidden rounded-lg cursor-pointer h-64 md:h-72 w-full"
        initial={{opacity: 0, y:20}}
        whileInView={{opacity:1, y: 0}}
        transition={{duration: 0.5}}
        viewport={{once: true}}
        onClick={()=> onClick(item)}
        onMouseEnter={()=> setIsHovered(true)}
        onMouseLeave={()=> setIsHovered(false)}
        >
            {/* Image Container */}
            <div className="aspect-square w-full h-full overflow-hidden rounded-lg">
                <motion.div
                animate={{
                    scale: isHovered ? 1.1 : 1
                }}
                transition={{duration: 0.4}}
                className="w-full h-full relative"
                >
                    <Image 
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                    priority={true}
                    />
                </motion.div>
            </div>

            {/* Content Overlay */}
            <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end"
            initial={{opacity: 0}}
            animate={{opacity: isHovered ? 1 : 0.7}}
            transition={{duration: 0.3}}
            >
                <motion.h3
                className="text-white text-xl font-bold"
                initial={{y:20, opacity: 0}}
                animate={{y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0.8}}
                >
                    {item.title}
                </motion.h3>
                <p className="text-white">
                    {item.description}
                </p>
                <motion.p
                className="text-white/90 mt-2"
                initial={{y:20, opacity: 0}}
                animate={{y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0}}
                transition={{duration: 0.2, delay: 0.3}}
                >
                    {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                </motion.p>

                <motion.div
                className="flex flex-wrap gap-2 mt-3"
                initial={{y:20, opacity: 0}}
                animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                >
                {item.tags?.map((tag, index) => (
                    <span key={index} className="bg-white/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                        {tag}
                    </span>
                ))}
                </motion.div>
            </motion.div>
        </motion.div>
    )
}