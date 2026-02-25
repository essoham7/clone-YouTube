import LeftNavMenuItem from "./LeftNavMenuItem";
import {
  Home,
  Music,
  Newspaper,
  Gamepad2,
  Film,
  Clock,
  ThumbsUp,
  PlaySquare,
  History,
  Flame,
  Trophy,
  Lightbulb,
  Clapperboard,
  ListVideo,
  ChevronRight,
  Settings,
  HelpCircle,
  Flag,
} from "lucide-react";
import { useLayout } from "../../context/LayoutContext";

export default function LeftNav() {
  const { sidebarCollapsed, mobileMenuOpen, setMobileMenuOpen } = useLayout();

  const content = (
    <nav className="flex flex-col gap-0.5 pb-4">
      {/* Section Principale */}
      <div className="flex flex-col gap-0.5 border-b border-white/10 pb-2 mb-2">
        <LeftNavMenuItem
          to="/"
          icon={<Home className="h-5 w-5" />}
          label="Accueil"
        />
        <LeftNavMenuItem
          to="/shorts"
          icon={<Film className="h-5 w-5" />}
          label="Shorts"
        />
        <LeftNavMenuItem
          to="/feed/subscriptions"
          icon={<ListVideo className="h-5 w-5" />}
          label="Abonnements"
        />
      </div>

      {/* Section "Vous" */}
      <div className="flex flex-col gap-0.5 border-b border-white/10 pb-2 mb-2">
        {!sidebarCollapsed && (
          <div className="flex items-center gap-2 px-3 py-2 text-base font-semibold hover:bg-white/10 rounded-lg cursor-pointer">
            Vous <ChevronRight className="h-4 w-4" />
          </div>
        )}
        <LeftNavMenuItem
          to="/feed/history"
          icon={<History className="h-5 w-5" />}
          label="Historique"
        />
        <LeftNavMenuItem
          to="/playlist?list=WL"
          icon={<Clock className="h-5 w-5" />}
          label="À regarder plus tard"
        />
        <LeftNavMenuItem
          to="/playlist?list=LL"
          icon={<ThumbsUp className="h-5 w-5" />}
          label="Vidéos 'J\'aime'"
        />
        <LeftNavMenuItem
          to="/feed/playlists"
          icon={<PlaySquare className="h-5 w-5" />}
          label="Vos vidéos"
        />
      </div>

      {/* Section "Abonnements" (Simulée) */}
      {!sidebarCollapsed && (
        <div className="flex flex-col gap-0.5 border-b border-white/10 pb-2 mb-2">
          <div className="px-3 py-2 text-base font-semibold">Abonnements</div>
          {/* Mock Subscriptions */}
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center gap-4 px-3 py-2 hover:bg-white/10 rounded-lg cursor-pointer"
            >
              <div className="h-6 w-6 rounded-full bg-gray-600" />
              <span className="text-sm truncate">Chaîne {i}</span>
            </div>
          ))}
        </div>
      )}

      {/* Section "Explorer" */}
      <div className="flex flex-col gap-0.5 border-b border-white/10 pb-2 mb-2">
        {!sidebarCollapsed && (
          <div className="px-3 py-2 text-base font-semibold">Explorer</div>
        )}
        <LeftNavMenuItem
          to="/feed/trending"
          icon={<Flame className="h-5 w-5" />}
          label="Tendances"
        />
        <LeftNavMenuItem
          to="/channel/music"
          icon={<Music className="h-5 w-5" />}
          label="Musique"
        />
        <LeftNavMenuItem
          to="/channel/movies"
          icon={<Clapperboard className="h-5 w-5" />}
          label="Films et TV"
        />
        <LeftNavMenuItem
          to="/channel/gaming"
          icon={<Gamepad2 className="h-5 w-5" />}
          label="Jeux vidéo"
        />
        <LeftNavMenuItem
          to="/channel/news"
          icon={<Newspaper className="h-5 w-5" />}
          label="Actualités"
        />
        <LeftNavMenuItem
          to="/channel/sports"
          icon={<Trophy className="h-5 w-5" />}
          label="Sport"
        />
        <LeftNavMenuItem
          to="/channel/learning"
          icon={<Lightbulb className="h-5 w-5" />}
          label="Savoirs & Cultures"
        />
      </div>

      {/* Section "Autres" */}
      <div className="flex flex-col gap-0.5">
        <LeftNavMenuItem
          to="/settings"
          icon={<Settings className="h-5 w-5" />}
          label="Paramètres"
        />
        <LeftNavMenuItem
          to="/report"
          icon={<Flag className="h-5 w-5" />}
          label="Historique des signalements"
        />
        <LeftNavMenuItem
          to="/help"
          icon={<HelpCircle className="h-5 w-5" />}
          label="Aide"
        />
      </div>

      {!sidebarCollapsed && (
        <div className="px-3 py-4 text-xs font-semibold text-gray-400">
          <p className="mb-2">
            À propos Presse Droits d'auteur Nous contacter Créateurs Publicité
            Développeurs
          </p>
          <p className="mb-2">
            Conditions d'utilisation Confidentialité Règles et sécurité Premiers
            pas sur YouTube
          </p>
          <p>© 2024 Google LLC</p>
        </div>
      )}
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`sticky top-[56px] hidden h-[calc(100vh-56px)] flex-shrink-0 overflow-y-auto border-r border-white/10 p-2 md:block ${sidebarCollapsed ? "w-20" : "w-56 lg:w-60"}`}
      >
        {content}
      </aside>

      {/* Mobile Modal Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <aside className="relative w-64 bg-[#0f0f0f] p-2 h-full overflow-y-auto">
            <div className="mb-4 pl-4 pt-2">
              {/* Close button or Logo here if needed */}
            </div>
            <div onClick={() => setMobileMenuOpen(false)}>{content}</div>
          </aside>
        </div>
      )}
    </>
  );
}
