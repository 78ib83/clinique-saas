// src/pages/PersonnelPlanning.jsx
import React, { useState } from "react";
import {
  Users,
  Calendar,
  Clock,
  Plus,
  X,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Briefcase,
} from "lucide-react";

export default function PersonnelPlanning() {
  const [personnelList, setPersonnelList] = useState([
    {
      id: "PER-001",
      nom: "Dr. Alassane Touré",
      role: "Médecin Urgentiste",
      departement: "Urgences & Gardes",
      shift: "Matin (08:00 - 16:00)",
      statut: "Présent",
      contact: "+223 76 54 32 10",
    },
    {
      id: "PER-002",
      nom: "Awa Maïga",
      role: "Infirmière / Caissière",
      departement: "Accueil & Caisse",
      shift: "Journée Continue (08:00 - 17:00)",
      statut: "Présent",
      contact: "+223 66 77 88 99",
    },
    {
      id: "PER-003",
      nom: "Dr. Fatoumata Bocoum",
      role: "Pédiatre",
      departement: "Consultations Externes",
      shift: "Soir (16:00 - 00:00)",
      statut: "De Garde",
      contact: "+223 70 12 34 56",
    },
    {
      id: "PER-004",
      nom: "Mamadou Traoré",
      role: "Technicien de Labo",
      departement: "Laboratoire d'Analyses",
      shift: "Repos",
      statut: "Absent / Repos",
      contact: "+223 75 89 63 21",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterDepartement, setFilterDepartement] = useState("Tous");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // État du formulaire pour l'ajout d'un membre du personnel / planification
  const [newPersonnel, setNewPersonnel] = useState({
    nom: "",
    role: "Médecin Généraliste",
    departement: "Urgences & Gardes",
    shift: "Matin (08:00 - 16:00)",
    contact: "",
  });

  const handleAddPersonnel = (e) => {
    e.preventDefault();
    if (!newPersonnel.nom || !newPersonnel.contact) return;

    const personnelObj = {
      id: `PER-00${personnelList.length + 1}`,
      nom: newPersonnel.nom,
      role: newPersonnel.role,
      departement: newPersonnel.departement,
      shift: newPersonnel.shift,
      statut: "Présent",
      contact: newPersonnel.contact,
    };

    setPersonnelList([personnelObj, ...personnelList]);
    setIsModalOpen(false);
    setNewPersonnel({
      nom: "",
      role: "Médecin Généraliste",
      departement: "Urgences & Gardes",
      shift: "Matin (08:00 - 16:00)",
      contact: "",
    });
  };

  const filteredPersonnel = personnelList.filter((item) => {
    const matchesSearch =
      item.nom.toLowerCase().includes(searchQuery.toLowerCase())
      || item.role.toLowerCase().includes(searchQuery.toLowerCase())
      || item.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept =
      filterDepartement === "Tous" || item.departement === filterDepartement;
    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* En-tête de la page */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <Users className="text-blue-600" size={22} /> Personnel & Planning
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Gestion des équipes médicales et paramédicales, plannings de garde,
            shifts et suivi des présences.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-xs flex items-center gap-2 cursor-pointer w-fit">
          <Plus size={18} /> Ajouter un Membre / Planning
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
            placeholder="Rechercher nom, rôle, ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-xs font-semibold text-slate-400 uppercase flex items-center gap-1.5">
            <Filter size={14} /> Département :
          </span>
          <select
            value={filterDepartement}
            onChange={(e) => setFilterDepartement(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-4 py-2.5 outline-none focus:border-blue-500 transition-colors cursor-pointer w-full sm:w-auto">
            <option value="Tous">Tous les départements</option>
            <option value="Urgences & Gardes">Urgences & Gardes</option>
            <option value="Accueil & Caisse">Accueil & Caisse</option>
            <option value="Consultations Externes">
              Consultations Externes
            </option>
            <option value="Laboratoire d'Analyses">
              Laboratoire d'Analyses
            </option>
          </select>
        </div>
      </div>

      {/* Tableau Personnel & Planning */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 font-semibold text-xs uppercase tracking-wider">
                <th className="py-3.5 px-6">ID & Personnel</th>
                <th className="py-3.5 px-6">Rôle / Fonction</th>
                <th className="py-3.5 px-6">Département</th>
                <th className="py-3.5 px-6">Shift / Horaire</th>
                <th className="py-3.5 px-6">Contact</th>
                <th className="py-3.5 px-6 text-right">Statut Présence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {filteredPersonnel.length > 0 ?
                filteredPersonnel.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-bold text-slate-800">{item.nom}</p>
                      <span className="text-xs text-blue-600 font-semibold">
                        {item.id}
                      </span>
                    </td>
                    <td className="px-6 font-medium text-slate-700">
                      {item.role}
                    </td>
                    <td className="px-6">
                      <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg">
                        {item.departement}
                      </span>
                    </td>
                    <td className="px-6 font-medium text-slate-700 flex items-center gap-1.5 py-5">
                      <Clock size={14} className="text-slate-400" />{" "}
                      {item.shift}
                    </td>
                    <td className="px-6 text-xs text-slate-500 font-medium">
                      {item.contact}
                    </td>
                    <td className="px-6 text-right">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full border inline-block ${
                          item.statut === "Présent" ?
                            "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                          : item.statut === "De Garde" ?
                            "bg-blue-50 text-blue-700 border-blue-200/60"
                          : "bg-slate-100 text-slate-500 border-slate-200"
                        }`}>
                        {item.statut}
                      </span>
                    </td>
                  </tr>
                ))
              : <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-400">
                    Aucun membre du personnel trouvé.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* Modale d'ajout de personnel / planning */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Users className="text-blue-600" size={20} /> Ajouter un Membre
                & Planning
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddPersonnel} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Nom Complet du Personnel
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Dr. Mariam Traoré"
                  value={newPersonnel.nom}
                  onChange={(e) =>
                    setNewPersonnel({ ...newPersonnel, nom: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Rôle / Fonction
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Médecin Généraliste"
                    value={newPersonnel.role}
                    onChange={(e) =>
                      setNewPersonnel({ ...newPersonnel, role: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Département
                  </label>
                  <select
                    value={newPersonnel.departement}
                    onChange={(e) =>
                      setNewPersonnel({
                        ...newPersonnel,
                        departement: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 cursor-pointer">
                    <option value="Urgences & Gardes">Urgences & Gardes</option>
                    <option value="Accueil & Caisse">Accueil & Caisse</option>
                    <option value="Consultations Externes">
                      Consultations Externes
                    </option>
                    <option value="Laboratoire d'Analyses">
                      Laboratoire d'Analyses
                    </option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Shift / Horaire
                  </label>
                  <select
                    value={newPersonnel.shift}
                    onChange={(e) =>
                      setNewPersonnel({
                        ...newPersonnel,
                        shift: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500 cursor-pointer">
                    <option value="Matin (08:00 - 16:00)">
                      Matin (08:00 - 16:00)
                    </option>
                    <option value="Journée Continue (08:00 - 17:00)">
                      Journée Continue (08:00 - 17:00)
                    </option>
                    <option value="Soir (16:00 - 00:00)">
                      Soir (16:00 - 00:00)
                    </option>
                    <option value="Nuit (00:00 - 08:00)">
                      Nuit (00:00 - 08:00)
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Numéro de Téléphone
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: +223 70 00 00 00"
                    value={newPersonnel.contact}
                    onChange={(e) =>
                      setNewPersonnel({
                        ...newPersonnel,
                        contact: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-blue-500"
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
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-all shadow-xs cursor-pointer">
                  Enregistrer le membre
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
