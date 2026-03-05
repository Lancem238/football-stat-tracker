import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PlayerPage from "./pages/PlayerPage";

const queryClient = new QueryClient();

// Root component of the app, sets up the query client and routing
// Wires together the QueryClientProvider and BrowserRouter and then 
// declare the page-level routes
function App(){
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
        {/* Define routes for the home page and player page */}
          <Route path="/" element={<HomePage />} />
          <Route path="/player/:id" element={<PlayerPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App;