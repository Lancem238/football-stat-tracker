import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePlayerSearch } from "../hooks/usePlayers";

const LEAGUES = [
    { id: 39,  name: "Premier League" },
    { id: 140, name: "La Liga" },
    { id: 78,  name: "Bundesliga" },
    { id: 135, name: "Serie A" },
    { id: 61,  name: "Ligue 1" },
];

export default function HomePage() {
    const [ input, setInput ] = useState("");
    const [ query, setQuery ] = useState("");
    const [ league, setLeague ] = useState(39);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => setQuery(input), 500);
        return () => clearTimeout(timer);
    }, [input]);

    const { data: players, isLoading, isError } = usePlayerSearch(query, league);
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-bold mb-2">StatTrack</h1>
            <p className="text-lg mb-4">Search for any player</p>
            <select
                value={league}
                onChange={(e) => setLeague(Number(e.target.value))}
                className="border border-gray-300 rounded px-4 py-2 w-full max-w-md mb-2"
            >
                {LEAGUES.map(l => (
                    <option key={l.id} value={l.id}>{l.name}</option>
                ))}
            </select>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
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
