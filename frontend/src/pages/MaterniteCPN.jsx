// src/pages/MaterniteCPN.jsx
import React, { useState } from "react";
import {
  HeartPulse,
  Search,
  Filter,
  Calendar,
  Clock,
  Plus,
  X,
  User,
} from "lucide-react";

export default function MaterniteCPN() {
  const [materniteList, setMaterniteList] = useState([
    {
      id: "MAT-001",
      patient: "Fatoumata Diallo",
      semainesAmenorrhee: "28 SA",
      typeVisite: "CPN 4 (Consultation Prénatale)",
      sageFemme: "Awa Traoré",
      dateProchainRdv: "12/10/2026",
      statut: "Suivi Régulier",
    },
    {
      id: "MAT-002",
      patient: "Kankou Coulibaly",
      semainesAmenorrhee: "16 SA",
      typeVisite: "CPN 2",
      sageFemme: "Awa Traoré",
      dateProchainRdv: "25/09/2026",
      statut: "En attente",
    },
    {
      id: "MAT-003",
      patient: "Mariam Cissé",
      semainesAmenorrhee: "36 SA",
      typeVisite: "CPN 7 (Pré-accouchement)",
      sageFemme: "Fatima Sidibé",
      dateProchainRdv: "19/09/2026",
      statut: "Termme Proche",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterVisite, setFilterVisite] = useState("Tous");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // État du formulaire pour l'enregistrement d'une patiente CPN / Maternité
  const [newMaternite, setNewMaternite] = useState({
    patient: "",
    semainesAmenorrhee: "",
    typeVisite: "CPN 1",
    sageFemme: "Awa Traoré",
    dateProchainRdv: "",
  });

  const handleAddMaternite = (e) => {
    e.preventDefault();
    if (!newMaternite.patient || !newMaternite.semainesAmenorrhee) return;

    const materniteObj = {
      id: `MAT-00${materniteList.length + 1}`,
      ...newMaternite,
      statut: "Suivi Régulier",
    };

    setMaterniteList([materniteObj, ...materniteList]);
    setIsModalOpen(false);
    setNewMaternite({
      patient: "",
      semainesAmenorrhee: "",
      typeVisite: "CPN 1",
      sageFemme: "Awa Traoré",
      dateProchainRdv: "",
    });
  };

  const filteredMaternite = materniteList.filter((mat) => {
    const matchesSearch =
      mat.patient.toLowerCase().includes(searchQuery.toLowerCase())
      || mat.id.toLowerCase().includes(searchQuery.toLowerCase())
      || mat.sageFemme.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVisite =
      filterVisite === "Tous" || mat.typeVisite.includes(filterVisite);
    return matchesSearch && matchesVisite;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* En-tête de la page */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <HeartPulse className="text-pink-600" size={22} /> Maternité & CPN
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Suivi des consultations prénatales (CPN), gestion de la grossesse et
            planification des visites obstétricales.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-xs flex items-center gap-2 cursor-pointer w-fit">
          <Plus size={18} /> Nouvelle Patiente CPN
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
            placeholder="Rechercher patiente, sage-femme, ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-pink-500 transition-colors"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-xs font-semibold text-slate-400 uppercase flex items-center gap-1.5">
            <Filter size={14} /> Type de visite :
          </span>
          <select
            value={filterVisite}
            onChange={(e) => setFilterVisite(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-4 py-2.5 outline-none focus:border-pink-500 transition-colors cursor-pointer w-full sm:w-auto">
            <option value="Tous">Toutes les CPN</option>
            <option value="CPN 1">CPN 1</option>
            <option value="CPN 2">CPN 2</option>
            <option value="CPN 4">CPN 4</option>
            <option value="CPN 7">CPN 7</option>
          </select>
        </div>
      </div>

      {/* Tableau Maternité & CPN */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 font-semibold text-xs uppercase tracking-wider">
                <th className="py-3.5 px-6">ID & Patiente</th>
                <th className="py-3.5 px-6">Âge de la Grossesse (SA)</th>
                <th className="py-3.5 px-6">Type de Visite</th>
                <th className="py-3.5 px-6">Sage-Femme / Référente</th>
                <th className="py-3.5 px-6">Prochain RDV</th>
                <th className="py-3.5 px-6 text-right">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {filteredMaternite.length > 0 ?
                filteredMaternite.map((mat) => (
                  <tr
                    key={mat.id}
                    className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-bold text-slate-800">{mat.patient}</p>
                      <span className="text-xs text-pink-600 font-semibold">
                        {mat.id}
                      </span>
                    </td>
                    <td className="px-6 font-semibold text-slate-700">
                      <span className="px-3 py-1 bg-pink-50 text-pink-700 text-xs rounded-lg">
                        {mat.semainesAmenorrhee}
                      </span>
                    </td>
                    <td className="px-6 font-medium text-slate-700">
                      {mat.typeVisite}
                    </td>
                    <td className="px-6 text-xs text-slate-600 flex items-center gap-1.5 pt-5">
                      <User size={13} className="text-slate-400" />{" "}
                      {mat.sageFemme}
                    </td>
                    <td className="px-6 text-xs text-slate-500">
                      {mat.dateProchainRdv || "Non planifié"}
                    </td>
                    <td className="px-6 text-right">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full border inline-block ${
                          mat.statut === "Suivi Régulier" ?
                            "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                          : mat.statut === "Termme Proche" ?
                            "bg-pink-50 text-pink-700 border-pink-200/60"
                          : "bg-amber-50 text-amber-700 border-amber-200/60"
                        }`}>
                        {mat.statut}
                      </span>
                    </td>
                  </tr>
                ))
              : <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-400">
                    Aucune patiente trouvée pour ce registre CPN.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* Modale d'enregistrement CPN */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <HeartPulse className="text-pink-600" size={20} /> Nouvelle
                Patiente CPN
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddMaternite} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Nom de la Patiente
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Aminata Touré"
                  value={newMaternite.patient}
                  onChange={(e) =>
                    setNewMaternite({
                      ...newMaternite,
                      patient: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-pink-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Grossesse (en SA)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: 24 SA"
                    value={newMaternite.semainesAmenorrhee}
                    onChange={(e) =>
                      setNewMaternite({
                        ...newMaternite,
                        semainesAmenorrhee: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Type de Visite CPN
                  </label>
                  <select
                    value={newMaternite.typeVisite}
                    onChange={(e) =>
                      setNewMaternite({
                        ...newMaternite,
                        typeVisite: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-pink-500 cursor-pointer">
                    <option value="CPN 1">CPN 1</option>
                    <option value="CPN 2">CPN 2</option>
                    <option value="CPN 3">CPN 3</option>
                    <option value="CPN 4">CPN 4</option>
                    <option value="CPN 5">CPN 5</option>
                    <option value="CPN 6">CPN 6</option>
                    <option value="CPN 7">CPN 7 (Pré-accouchement)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Sage-Femme Référente
                  </label>
                  <select
                    value={newMaternite.sageFemme}
                    onChange={(e) =>
                      setNewMaternite({
                        ...newMaternite,
                        sageFemme: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-pink-500 cursor-pointer">
                    <option value="Awa Traoré">Awa Traoré</option>
                    <option value="Fatima Sidibé">Fatima Sidibé</option>
                    <option value="Oumou Diarra">Oumou Diarra</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Date Prochain RDV
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: 15/10/2026"
                    value={newMaternite.dateProchainRdv}
                    onChange={(e) =>
                      setNewMaternite({
                        ...newMaternite,
                        dateProchainRdv: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-pink-500"
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
                  className="px-5 py-2.5 bg-pink-600 hover:bg-pink-700 text-white rounded-xl text-sm font-semibold transition-all shadow-xs cursor-pointer">
                  Enregistrer le suivi CPN
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
