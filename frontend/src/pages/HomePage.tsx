import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePlayerSearch } from "../hooks/usePlayers";

export default function HomePage() {
    // State to hold the search query entered by the user
    const [ query, setQuery ] = useState("");
    // Hook to navigate programmatically to different routes
    const navigate = useNavigate();
    // Custom hook to fetch player search results based on the query
    const { data: players, isLoading, isError } = usePlayerSearch(query);
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-bold mb-2">StatTrack</h1>
            <p className="text-lg mb-4">Search for any player</p>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search players..."
                className="border border-gray-300 rounded px-4 py-2 w-full max-w-md mb-4"
            />
            {isLoading && <p>Loading...</p>}
            {isError && <p>Something went wrong.</p>}
            {players?.map(result => (
                <div
                    key={result.player.id}
                    onClick={() => navigate(`/player/${result.player.id}`)}
                    className="flex items-center space-x-4 cursor-pointer mb-4"
                >
                    <img src={result.player.photo} alt={result.player.name} className="w-16 h-16 rounded-full" />
                    <div>

                        <p className="text-lg font-semibold">{result.player.name}</p>
                        <p className="text-sm text-gray-500">{result.statistics[0]?.team.name}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}   
