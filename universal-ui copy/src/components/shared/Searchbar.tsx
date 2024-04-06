import React, { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import axios from "axios";

interface Props {
    onSearch: (data: any) => void; // Define the type of onSearch as a function that accepts any data and returns void
}

const Searchbar: React.FC<Props> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault(); // Prevent the default form submission behavior
        try {
            const response = await axios.get(`http://127.0.0.1:8000/Account/api/course/filter/?search=${searchQuery}`);
            onSearch(response.data); // Pass the fetched data to the parent component
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    return (
        <form className='w-[400px] relative' onSubmit={handleSearch}>
            <div className="relative">
                <input
                    type="search"
                    placeholder='Search Here'
                    className='w-full p-2 bg-slate-600'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className='absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-slate-600 rounded-full'>
                    <AiOutlineSearch />
                </button>
            </div>
        </form>
    );
};

export default Searchbar;
