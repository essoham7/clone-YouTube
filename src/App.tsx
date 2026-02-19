import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import LeftNav from "./components/LeftNav";
import Feed from "./pages/Feed";
import SearchResult from "./pages/SearchResult";
import VideoDetails from "./pages/VideoDetails";
import Channel from "./pages/Channel";
import Playlist from "./pages/Playlist";

export default function App() {
  const { pathname } = useLocation();
  const isVideoDetails = pathname.startsWith("/watch/");

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="mx-auto flex max-w-[1600px]">
        {/* Toujours inclure LeftNav pour gérer le menu mobile, mais masquer la partie desktop si nécessaire */}
        <div className={isVideoDetails ? "lg:hidden" : ""}>
          <LeftNav />
        </div>
        <main className="min-h-[calc(100vh-56px)] flex-1">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/search/:query" element={<SearchResult key={pathname} />} />
            <Route path="/watch/:id" element={<VideoDetails key={pathname} />} />
            <Route path="/channel/:id" element={<Channel key={pathname} />} />
            <Route path="/playlist/:id" element={<Playlist key={pathname} />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
