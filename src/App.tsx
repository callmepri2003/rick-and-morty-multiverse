import { Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HomePage } from "@/pages/HomePage";
import { CharactersPage } from "@/pages/CharactersPage";
import { CharacterDetailPage } from "@/pages/CharacterDetailPage";
import { EpisodesPage } from "@/pages/EpisodesPage";
import { LocationsPage } from "@/pages/LocationsPage";
import { StatsPage } from "@/pages/StatsPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-portal-dark">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/characters" element={<CharactersPage />} />
          <Route path="/characters/:id" element={<CharacterDetailPage />} />
          <Route path="/episodes" element={<EpisodesPage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/stats" element={<StatsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
