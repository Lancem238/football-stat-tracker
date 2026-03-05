import { useParams } from "react-router-dom";
import { usePlayer, usePlayerStats } from "../hooks/usePlayers";

export default function PlayerPage() {
    // Get the player ID from the URL parameters
    const { id } = useParams();
    // Fetch player data using the custom hook
    const { data: player, isLoading: playerLoading, isError: playerError } = usePlayer(Number(id));
    // Fetch player statistics using the custom hook
    const { data: stats, isLoading: statsLoading, isError: statsError } = usePlayerStats(Number(id));

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            {playerLoading || statsLoading ? (
                <p>Loading...</p>
            ) : playerError || statsError ? (
                <p>Something went wrong.</p>
            ) : (
                <>
                    <h1 className="text-4xl font-bold mb-2">{player?.player.name}</h1>
                    <img src={player?.player.photo} alt={player?.player.name} className="w-32 h-32 rounded-full mb-4" />
                    <p className="text-lg mb-4">{stats?.statistics[0]?.team.name}</p>
                    <div className="w-full max-w-md bg-white rounded shadow p-4">
                        <h2 className="text-2xl font-bold mb-4">Statistics</h2>
                        <p><strong>Games Played:</strong> {stats?.statistics[0]?.games.appearances}</p>
                        <p><strong>Goals:</strong> {stats?.statistics[0]?.goals.total}</p>
                        <p><strong>Assists:</strong> {stats?.statistics[0]?.goals.assists}</p>
                        {/* <p><strong>Yellow Cards:</strong> {stats?.statistics[0]?.cards.yellow}</p> */}
                        {/* <p><strong>Red Cards:</strong> {stats?.statistics[0]?.cards.red}</p> */}
                    </div> 
                </>
            )}
        </div>
    )
}
