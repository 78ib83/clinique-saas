// src/pages/PediatrieVaccination.jsx
import React, { useState } from "react";
import {
  Baby,
  Search,
  Filter,
  Calendar,
  Clock,
  Plus,
  X,
  User,
  ShieldCheck,
} from "lucide-react";

export default function PediatrieVaccination() {
  const [pediatrieList, setPediatrieList] = useState([
    {
      id: "PED-001",
      patient: "Junior Traoré",
      age: "9 mois",
      vaccinRequis: "RR1 (Rougeole-Rubéole 1) & Fièvre Jaune",
      pediatre: "Dr. Mariam Sidibé",
      dateProchainRdv: "15/10/2026",
      statut: "À jour",
    },
    {
      id: "PED-002",
      patient: "Aïcha Konaté",
      age: "6 semaines",
      vaccinRequis: "Pentavalent 1 + Polio 1 + VPI",
      pediatre: "Dr. Mariam Sidibé",
      dateProchainRdv: "18/09/2026",
      statut: "En attente",
    },
    {
      id: "PED-003",
      patient: "Ibrahim Cissé",
      age: "14 mois",
      vaccinRequis: "RR2 & Méningocoque A",
      pediatre: "Dr. Ibrahima",
      dateProchainRdv: "12/09/2026",
      statut: "Convoqué",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatut, setFilterStatut] = useState("Tous");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // État du formulaire pour l'enregistrement d'un dossier pédiatrique/vaccination
  const [newPediatrie, setNewPediatrie] = useState({
    patient: "",
    age: "",
    vaccinRequis: "BCG + VPO (Naissance)",
    pediatre: "Dr. Mariam Sidibé",
    dateProchainRdv: "",
  });

  const handleAddPediatrie = (e) => {
    e.preventDefault();
    if (!newPediatrie.patient || !newPediatrie.age) return;

    const pediatrieObj = {
      id: `PED-00${pediatrieList.length + 1}`,
      ...newPediatrie,
      statut: "En attente",
    };

    setPediatrieList([pediatrieObj, ...pediatrieList]);
    setIsModalOpen(false);
    setNewPediatrie({
      patient: "",
      age: "",
      vaccinRequis: "BCG + VPO (Naissance)",
      pediatre: "Dr. Mariam Sidibé",
      dateProchainRdv: "",
    });
  };

  const filteredPediatrie = pediatrieList.filter((ped) => {
    const matchesSearch =
      ped.patient.toLowerCase().includes(searchQuery.toLowerCase())
      || ped.id.toLowerCase().includes(searchQuery.toLowerCase())
      || ped.vaccinRequis.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatut =
      filterStatut === "Tous" || ped.statut === filterStatut;
    return matchesSearch && matchesStatut;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* En-tête de la page */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <Baby className="text-cyan-600" size={22} /> Pédiatrie & Vaccination
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Suivi de la croissance infantile, calendrier vaccinal élargi et
            registres des consultations pédiatriques.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-xs flex items-center gap-2 cursor-pointer w-fit">
          <Plus size={18} /> Nouveau Dossier Pédiatrique
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
            placeholder="Rechercher enfant, vaccin, ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-cyan-500 transition-colors"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-xs font-semibold text-slate-400 uppercase flex items-center gap-1.5">
            <Filter size={14} /> Statut :
          </span>
          <select
            value={filterStatut}
            onChange={(e) => setFilterStatut(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-4 py-2.5 outline-none focus:border-cyan-500 transition-colors cursor-pointer w-full sm:w-auto">
            <option value="Tous">Tous les statuts</option>
            <option value="À jour">À jour</option>
            <option value="En attente">En attente</option>
            <option value="Convoqué">Convoqué</option>
          </select>
        </div>
      </div>

      {/* Tableau Pédiatrie & Vaccination */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 font-semibold text-xs uppercase tracking-wider">
                <th className="py-3.5 px-6">ID & Enfant</th>
                <th className="py-3.5 px-6">Âge</th>
                <th className="py-3.5 px-6">Vaccin Requis / Acte</th>
                <th className="py-3.5 px-6">Pédiatre / Référent</th>
                <th className="py-3.5 px-6">Prochain RDV</th>
                <th className="py-3.5 px-6 text-right">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {filteredPediatrie.length > 0 ?
                filteredPediatrie.map((ped) => (
                  <tr
                    key={ped.id}
                    className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-bold text-slate-800">{ped.patient}</p>
                      <span className="text-xs text-cyan-600 font-semibold">
                        {ped.id}
                      </span>
                    </td>
                    <td className="px-6 font-semibold text-slate-700">
                      <span className="px-3 py-1 bg-cyan-50 text-cyan-700 text-xs rounded-lg">
                        {ped.age}
                      </span>
                    </td>
                    <td className="px-6 font-medium text-slate-700 max-w-xs truncate">
                      {ped.vaccinRequis}
                    </td>
                    <td className="px-6 text-xs text-slate-600 flex items-center gap-1.5 pt-5">
                      <User size={13} className="text-slate-400" />{" "}
                      {ped.pediatre}
                    </td>
                    <td className="px-6 text-xs text-slate-500">
                      {ped.dateProchainRdv || "Non planifié"}
                    </td>
                    <td className="px-6 text-right">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full border inline-block ${
                          ped.statut === "À jour" ?
                            "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                          : ped.statut === "En attente" ?
                            "bg-amber-50 text-amber-700 border-amber-200/60"
                          : "bg-blue-50 text-blue-700 border-blue-200/60"
                        }`}>
                        {ped.statut}
                      </span>
                    </td>
                  </tr>
                ))
              : <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-400">
                    Aucun dossier pédiatrique trouvé.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* Modale d'enregistrement Pédiatrie & Vaccination */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Baby className="text-cyan-600" size={20} /> Nouveau Dossier
                Pédiatrique
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddPediatrie} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Nom de l'Enfant
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Mohamed Traoré"
                  value={newPediatrie.patient}
                  onChange={(e) =>
                    setNewPediatrie({
                      ...newPediatrie,
                      patient: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Âge de l'Enfant
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: 3 mois"
                    value={newPediatrie.age}
                    onChange={(e) =>
                      setNewPediatrie({ ...newPediatrie, age: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Vaccin / Acte Requis
                  </label>
                  <select
                    value={newPediatrie.vaccinRequis}
                    onChange={(e) =>
                      setNewPediatrie({
                        ...newPediatrie,
                        vaccinRequis: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-cyan-500 cursor-pointer">
                    <option value="BCG + VPO (Naissance)">
                      BCG + VPO (Naissance)
                    </option>
                    <option value="Pentavalent 1 + Polio 1">
                      Pentavalent 1 + Polio 1
                    </option>
                    <option value="Pentavalent 2 + Polio 2">
                      Pentavalent 2 + Polio 2
                    </option>
                    <option value="Pentavalent 3 + Polio 3">
                      Pentavalent 3 + Polio 3
                    </option>
                    <option value="RR1 (Rougeole-Rubéole 1)">
                      RR1 (Rougeole-Rubéole 1)
                    </option>
                    <option value="RR2 & Fièvre Jaune">
                      RR2 & Fièvre Jaune
                    </option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Pédiatre Référent
                  </label>
                  <select
                    value={newPediatrie.pediatre}
                    onChange={(e) =>
                      setNewPediatrie({
                        ...newPediatrie,
                        pediatre: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-cyan-500 cursor-pointer">
                    <option value="Dr. Mariam Sidibé">Dr. Mariam Sidibé</option>
                    <option value="Dr. Ibrahima">Dr. Ibrahima</option>
                    <option value="Dr. Alou Diallo">Dr. Alou Diallo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Date Prochain RDV
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: 20/10/2026"
                    value={newPediatrie.dateProchainRdv}
                    onChange={(e) =>
                      setNewPediatrie({
                        ...newPediatrie,
                        dateProchainRdv: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-cyan-500"
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
                  className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl text-sm font-semibold transition-all shadow-xs cursor-pointer">
                  Enregistrer le dossier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
