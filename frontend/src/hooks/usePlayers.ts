import { useQuery } from "@tanstack/react-query";
import { getPlayerById, getPlayerStats, searchPlayers } from "../services/api";

// Custom hook to search for players based on a query string
export function usePlayerSearch(query: string, league: number) {
    return useQuery({
        queryKey: ['players', query, league],
        queryFn: () => searchPlayers(query, league),
        enabled: !!query && !!league,
    });
}

// Custom hook to fetch player data based on player ID
export function usePlayer(id: number) {
    return useQuery({
        queryKey: ['player', id],
        queryFn: () => getPlayerById(id),
        enabled: !!id,
    });
}

// Custom hook to fetch player statistics based on player ID
export function usePlayerStats(id: number) {
    return useQuery({
        queryKey: ['playerStats', id],
        queryFn: () => getPlayerStats(id),
        enabled: !!id,
    });
}

