// src/pages/SecuriteRoles.jsx
import React, { useState } from "react";
import {
  ShieldAlert,
  Search,
  Filter,
  Plus,
  X,
  Lock,
  UserCog,
  CheckCircle2,
  KeyRound,
  ShieldCheck,
} from "lucide-react";

export default function SecuriteRoles() {
  const [roleList, setRoleList] = useState([
    {
      id: "ROL-001",
      titre: "Administrateur Système",
      description:
        "Accès complet à tous les modules, configurations et gestion de la base de données.",
      utilisateursAssocies: 2,
      niveauAcces: "Niveau 1 (Total)",
      statut: "Actif",
    },
    {
      id: "ROL-002",
      titre: "Médecin / Praticien",
      description:
        "Gestion des dossiers patients, consultations, prescriptions, examens et téléversement de documents médicaux.",
      utilisateursAssocies: 6,
      niveauAcces: "Niveau 2 (Médical)",
      statut: "Actif",
    },
    {
      id: "ROL-003",
      titre: "Caissier(ère) / Facturation",
      description:
        "Gestion de la caisse, encaissements, édition des reçus et suivi des dossiers d'assurances & tiers-payant.",
      utilisateursAssocies: 3,
      niveauAcces: "Niveau 3 (Financier)",
      statut: "Actif",
    },
    {
      id: "ROL-004",
      titre: "Réceptionniste / Accueil",
      description:
        "Enregistrement des nouveaux patients, prise de rendez-vous et gestion du planning d'attente.",
      utilisateursAssocies: 4,
      niveauAcces: "Niveau 4 (Accueil)",
      statut: "Actif",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterNiveau, setFilterNiveau] = useState("Tous");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // État du formulaire pour l'ajout d'un nouveau rôle / profil RBAC
  const [newRole, setNewRole] = useState({
    titre: "",
    description: "",
    niveauAcces: "Niveau 2 (Médical)",
    utilisateursAssocies: "1",
  });

  const handleAddRole = (e) => {
    e.preventDefault();
    if (!newRole.titre || !newRole.description) return;

    const roleObj = {
      id: `ROL-00${roleList.length + 1}`,
      titre: newRole.titre,
      description: newRole.description,
      utilisateursAssocies: parseInt(newRole.utilisateursAssocies, 10),
      niveauAcces: newRole.niveauAcces,
      statut: "Actif",
    };

    setRoleList([roleObj, ...roleList]);
    setIsModalOpen(false);
    setNewRole({
      titre: "",
      description: "",
      niveauAcces: "Niveau 2 (Médical)",
      utilisateursAssocies: "1",
    });
  };

  const filteredRoles = roleList.filter((role) => {
    const matchesSearch =
      role.titre.toLowerCase().includes(searchQuery.toLowerCase())
      || role.description.toLowerCase().includes(searchQuery.toLowerCase())
      || role.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesNiveau =
      filterNiveau === "Tous" || role.niveauAcces.includes(filterNiveau);
    return matchesSearch && matchesNiveau;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* En-tête de la page */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <ShieldAlert className="text-rose-600" size={22} /> Sécurité & Rôles
            (RBAC)
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Gestion des rôles, des permissions d'accès granulaires et de la
            sécurité des profils utilisateurs.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-xs flex items-center gap-2 cursor-pointer w-fit">
          <Plus size={18} /> Créer un Nouveau Rôle
        </button>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Rechercher rôle, description, ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-rose-500 transition-colors"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-xs font-semibold text-slate-400 uppercase flex items-center gap-1.5">
            <Filter size={14} /> Niveau :
          </span>
          <select
            value={filterNiveau}
            onChange={(e) => setFilterNiveau(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-4 py-2.5 outline-none focus:border-rose-500 transition-colors cursor-pointer w-full sm:w-auto">
            <option value="Tous">Tous les niveaux</option>
            <option value="Niveau 1">Niveau 1 (Total)</option>
            <option value="Niveau 2">Niveau 2 (Médical)</option>
            <option value="Niveau 3">Niveau 3 (Financier)</option>
            <option value="Niveau 4">Niveau 4 (Accueil)</option>
          </select>
        </div>
      </div>

      {/* Tableau Sécurité & Rôles */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 font-semibold text-xs uppercase tracking-wider">
                <th className="py-3.5 px-6">ID & Intitulé du Rôle</th>
                <th className="py-3.5 px-6">Description & Permissions</th>
                <th className="py-3.5 px-6">Niveau d'Accès</th>
                <th className="py-3.5 px-6">Utilisateurs</th>
                <th className="py-3.5 px-6 text-right">Statut Profil</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {filteredRoles.length > 0 ?
                filteredRoles.map((role) => (
                  <tr
                    key={role.id}
                    className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-bold text-slate-800 flex items-center gap-1.5">
                        <KeyRound size={16} className="text-rose-600" />{" "}
                        {role.titre}
                      </p>
                      <span className="text-xs text-rose-600 font-semibold">
                        {role.id}
                      </span>
                    </td>
                    <td className="px-6 font-medium text-slate-700 max-w-md">
                      {role.description}
                    </td>
                    <td className="px-6">
                      <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg">
                        {role.niveauAcces}
                      </span>
                    </td>
                    <td className="px-6 font-bold text-slate-800 text-center">
                      <span className="px-2.5 py-1 bg-rose-50 text-rose-700 rounded-lg text-xs">
                        {role.utilisateursAssocies} actifs
                      </span>
                    </td>
                    <td className="px-6 text-right">
                      <span className="px-3 py-1 text-xs font-semibold rounded-full border bg-emerald-50 text-emerald-700 border-emerald-200/60 inline-block">
                        {role.statut}
                      </span>
                    </td>
                  </tr>
                ))
              : <tr>
                  <td colSpan="5" className="py-12 text-center text-slate-400">
                    Aucun rôle de sécurité trouvé.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* Modale d'ajout de rôle */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <ShieldAlert className="text-rose-600" size={20} /> Créer un
                Nouveau Rôle RBAC
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddRole} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Intitulé du Rôle
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Pharmacien Chef"
                  value={newRole.titre}
                  onChange={(e) =>
                    setNewRole({ ...newRole, titre: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Description & Permissions
                </label>
                <textarea
                  rows="3"
                  required
                  placeholder="Ex: Gestion des stocks de pharmacie, délivrance des ordonnances..."
                  value={newRole.description}
                  onChange={(e) =>
                    setNewRole({ ...newRole, description: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-rose-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Niveau d'Accès
                  </label>
                  <select
                    value={newRole.niveauAcces}
                    onChange={(e) =>
                      setNewRole({ ...newRole, niveauAcces: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-rose-500 cursor-pointer">
                    <option value="Niveau 1 (Total)">Niveau 1 (Total)</option>
                    <option value="Niveau 2 (Médical)">
                      Niveau 2 (Médical)
                    </option>
                    <option value="Niveau 3 (Financier)">
                      Niveau 3 (Financier)
                    </option>
                    <option value="Niveau 4 (Accueil)">
                      Niveau 4 (Accueil)
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Utilisateurs Initiaux
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newRole.utilisateursAssocies}
                    onChange={(e) =>
                      setNewRole({
                        ...newRole,
                        utilisateursAssocies: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-semibold transition-colors cursor-pointer">
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-semibold transition-all shadow-xs cursor-pointer">
                  Enregistrer le rôle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
