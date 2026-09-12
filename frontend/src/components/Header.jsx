// src/components/Header.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import { Bell, Menu, Search, ShieldCheck } from "lucide-react";

export default function Header({ onToggleSidebar }) {
  const location = useLocation();

  // Dictionnaire pour associer chaque route à son titre propre
  const titles = {
    "/": "Tableau de bord",
    "/statistiques": "Statistiques & KPIs",
    "/admissions": "Admissions & Patients",
    "/rendez-vous": "Prise de Rendez-vous",
    "/facturation": "Caisse & Facturation",
    "/consultations": "Consultations & Spécialités",
    "/urgences": "Urgences & Triage",
    "/maternite": "Maternité & CPN",
    "/pediatrie": "Pédiatrie & Vaccination",
    "/hospitalisation": "Hospitalisation & Lits",
    "/chirurgie": "Bloc Opératoire & Chirurgie",
    "/laboratoire": "Laboratoire & Examens",
    "/imagerie": "Imagerie & Radio",
    "/pharmacie": "Pharmacie & Stock",
    "/assurances": "Assurances & Tiers-Payant",
    "/ristournes": "Ristournes & Référants",
    "/comptabilite": "Comptabilité & Rapports",
    "/personnel": "Personnel & Planning",
    "/parametres": "Paramètres Clinique",
    "/securite": "Sécurité & Rôles (RBAC)",
  };

  const currentTitle = titles[location.pathname] || "Administration";

  // Récupération sécurisée de l'utilisateur (depuis le localStorage ou valeur par défaut)
  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "Dr. Ibrahima",
    role: "Administrateur Clinique",
  };

  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/80 h-16 sm:h-20 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-20 shadow-xs transition-all">
      {/* Partie Gauche : Bouton Menu + Titre de la page active */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Le bouton s'affiche uniquement sur mobile et disparaît dès la tablette (md:hidden) */}
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="md:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer shrink-0"
            aria-label="Ouvrir le menu">
            <Menu size={20} />
          </button>
        )}

        <div>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-600 block mb-0.5">
            Espace Clinique
          </span>
          <h2 className="text-sm sm:text-lg font-extrabold text-slate-800 tracking-tight truncate">
            {currentTitle}
          </h2>
        </div>
      </div>

      {/* Partie Droite : Recherche (masquée sur tablette intermédiaire si besoin) & Profil */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Barre de recherche (ajustée en largeur pour éviter l'étirement) */}
        <div className="hidden lg:flex items-center bg-slate-100/80 border border-slate-200 rounded-xl px-3 py-1.5 w-48 xl:w-60 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
          <Search size={16} className="text-slate-400 mr-2 shrink-0" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="bg-transparent border-none text-xs text-slate-700 placeholder-slate-400 focus:outline-none w-full"
          />
        </div>

        {/* Bouton de Notifications */}
        <button
          aria-label="Notifications"
          className="relative p-2.5 rounded-xl bg-slate-100/80 hover:bg-slate-200/80 text-slate-600 transition-colors cursor-pointer shrink-0">
          <Bell size={18} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
        </button>

        <div className="h-6 w-[1px] bg-slate-200 mx-0.5 hidden sm:block"></div>

        {/* Bloc Profil Utilisateur */}
        <div className="flex items-center gap-2.5 pl-1">
          <div className="relative shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-sm">
              {user.name ? user.name[0] : "U"}
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white"></span>
          </div>

          <div className="hidden md:block text-left">
            <div className="flex items-center gap-1">
              <p className="text-xs sm:text-sm font-bold text-slate-800 leading-tight">
                {user.name}
              </p>
              <ShieldCheck size={14} className="text-blue-600 shrink-0" />
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              {user.role || "Administrateur"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
