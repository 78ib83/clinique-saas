// src/components/Sidebar.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  PieChart,
  Users,
  Calendar,
  CreditCard,
  Stethoscope,
  AlertCircle,
  Baby,
  ShieldAlert,
  BedDouble,
  Activity,
  FlaskConical,
  Radio,
  Pill,
  FileText,
  Receipt,
  DollarSign,
  Settings,
  Building2,
  LogOut,
  X,
} from "lucide-react";

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  // Gestion du clic sur un lien (ferme le tiroir automatiquement sur mobile)
  const handleNavigation = (path) => {
    navigate(path);
    if (onClose) onClose();
  };

  const navItemClass = (path) => `
    w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer relative group
    ${
      isActive(path) ?
        "bg-blue-50/90 text-blue-600 shadow-2xs font-bold"
      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium"
    }
  `;

  return (
    <>
      {/* Fond assombri (Overlay) pour mobile/tablette lorsque la sidebar est ouverte */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-40 md:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Conteneur principal de la Sidebar (Fixe sur PC, Tiroir glissant sur Mobile) */}
      <aside
        className={`
          fixed md:static inset-y-0 left-0 z-50
          w-72 bg-white border-r border-slate-200/80 flex flex-col shadow-xl md:shadow-none select-none h-screen
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}>
        {/* En-tête de la Sidebar */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <span className="p-2.5 bg-blue-50 rounded-2xl text-blue-600 shadow-inner">
              <Building2 size={22} />
            </span>
            <div>
              <h1 className="text-base font-extrabold text-slate-800 tracking-tight">
                Clinique SaaS
              </h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Multi-tenant Admin
              </p>
            </div>
          </div>

          {assureCloseButton(onClose)}
        </div>

        {/* Liste des menus de navigation */}
        <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-3">
              Général
            </p>
            <div className="space-y-1">
              <button
                onClick={() => handleNavigation("/")}
                className={navItemClass("/")}>
                <LayoutDashboard size={18} /> Tableau de bord
              </button>
              <button
                onClick={() => handleNavigation("/statistiques")}
                className={navItemClass("/statistiques")}>
                <PieChart size={18} /> Statistiques & KPIs
              </button>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-3">
              Guichet & Accueil
            </p>
            <div className="space-y-1">
              <button
                onClick={() => handleNavigation("/admissions")}
                className={navItemClass("/admissions")}>
                <Users size={18} /> Admissions & Patients
              </button>
              <button
                onClick={() => handleNavigation("/rendez-vous")}
                className={navItemClass("/rendez-vous")}>
                <Calendar size={18} /> Prise de Rendez-vous
              </button>
              <button
                onClick={() => handleNavigation("/facturation")}
                className={navItemClass("/facturation")}>
                <CreditCard size={18} /> Caisse & Facturation
              </button>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-3">
              Médical & Soins
            </p>
            <div className="space-y-1">
              <button
                onClick={() => handleNavigation("/consultations")}
                className={navItemClass("/consultations")}>
                <Stethoscope size={18} /> Consultations & Spécialités
              </button>
              <button
                onClick={() => handleNavigation("/urgences")}
                className={navItemClass("/urgences")}>
                <AlertCircle size={18} /> Urgences & Triage
              </button>
              <button
                onClick={() => handleNavigation("/maternite")}
                className={navItemClass("/maternite")}>
                <Baby size={18} /> Maternité & CPN
              </button>
              <button
                onClick={() => handleNavigation("/pediatrie")}
                className={navItemClass("/pediatrie")}>
                <ShieldAlert size={18} /> Pédiatrie & Vaccination
              </button>
              <button
                onClick={() => handleNavigation("/hospitalisation")}
                className={navItemClass("/hospitalisation")}>
                <BedDouble size={18} /> Hospitalisation & Lits
              </button>
              <button
                onClick={() => handleNavigation("/chirurgie")}
                className={navItemClass("/chirurgie")}>
                <Activity size={18} /> Bloc Opératoire & Chirurgie
              </button>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-3">
              Plateau Technique
            </p>
            <div className="space-y-1">
              <button
                onClick={() => handleNavigation("/laboratoire")}
                className={navItemClass("/laboratoire")}>
                <FlaskConical size={18} /> Laboratoire & Examens
              </button>
              <button
                onClick={() => handleNavigation("/imagerie")}
                className={navItemClass("/imagerie")}>
                <Radio size={18} /> Imagerie & Radio
              </button>
              <button
                onClick={() => handleNavigation("/pharmacie")}
                className={navItemClass("/pharmacie")}>
                <Pill size={18} /> Pharmacie & Stock
              </button>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-3">
              Finances & Gestion
            </p>
            <div className="space-y-1">
              <button
                onClick={() => handleNavigation("/assurances")}
                className={navItemClass("/assurances")}>
                <FileText size={18} /> Assurances & Tiers-Payant
              </button>
              <button
                onClick={() => handleNavigation("/ristournes")}
                className={navItemClass("/ristournes")}>
                <Receipt size={18} /> Ristournes & Référants
              </button>
              <button
                onClick={() => handleNavigation("/comptabilite")}
                className={navItemClass("/comptabilite")}>
                <DollarSign size={18} /> Comptabilité & Rapports
              </button>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-3">
              Administration
            </p>
            <div className="space-y-1">
              <button
                onClick={() => handleNavigation("/personnel")}
                className={navItemClass("/personnel")}>
                <Users size={18} /> Personnel & Planning
              </button>
              <button
                onClick={() => handleNavigation("/parametres")}
                className={navItemClass("/parametres")}>
                <Settings size={18} /> Paramètres Clinique
              </button>
              <button
                onClick={() => handleNavigation("/securite")}
                className={navItemClass("/securite")}>
                <ShieldAlert size={18} /> Sécurité & Rôles (RBAC)
              </button>
            </div>
          </div>
        </nav>

        {/* Bouton de Déconnexion en bas */}
        <div className="p-4 border-t border-slate-100 shrink-0 bg-white">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3.5 py-2.5 text-rose-600 hover:bg-rose-50 rounded-xl font-semibold transition-colors text-sm cursor-pointer">
            <LogOut size={18} /> Déconnexion
          </button>
        </div>
      </aside>
    </>
  );
}

// Petite fonction utilitaire interne pour afficher la croix de fermeture sur mobile
function assureCloseButton(onClose) {
  if (!onClose) return null;
  return (
    <button
      onClick={onClose}
      className="md:hidden p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
      aria-label="Fermer le menu">
      <X size={20} />
    </button>
  );
}
