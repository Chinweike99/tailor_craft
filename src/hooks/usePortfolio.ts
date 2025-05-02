import { portfolioItems } from "@/data/services";
import { useAppStore } from "@/store";
import { ServiceCategory } from "@/types/types";
import { useMemo, useState } from "react";




export function usePortfolio(){
    const [filter, setFilter] = useState<ServiceCategory | 'all'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const {favoriteItems, toggleFavorite, isFavourite, addToRecentlyViewed} = useAppStore();

    const filteredItems = useMemo(()=>{
        let items = [...portfolioItems];

        //Apply category filter
        if(filter !== 'all'){
            items = items.filter(item => item.category === filter);
        }
        
        // Aplly Search filter if search query exists
        if(searchQuery.trim() !== ""){
            const query = searchQuery.toLowerCase();
            items = items.filter(item => 
                item.title.toLowerCase().includes(query) || item.description.toLowerCase().includes(query) || (item.tags && item.tags.some(tag => tag.toLowerCase().includes(query))) 
            )
        }
        return items;
    }, [filter, searchQuery])


    const featuredItems = useMemo(( )=> {
        return portfolioItems.filter(item=> item.featured)
    }, []);


     // Functions to handle filtering
  const handleFilterChange = (newFilter: ServiceCategory | 'all') => {
    setFilter(newFilter);
  };

    //Function to handle search
    const handleSearch = (query: string) => {
        setSearchQuery(query)
    };

    return{
        allItems: portfolioItems,
        filteredItems,
        featuredItems,
        filter,
        searchQuery,
        handleFilterChange,
        handleSearch,
        favoriteItems: portfolioItems.filter(item => favoriteItems.includes(item.id)),
        toggleFavorite,
        isFavourite,
        addToRecentlyViewed
    }
}



