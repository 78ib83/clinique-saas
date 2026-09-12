// src/pages/BlocOperatoireChirurgie.jsx
import React, { useState } from "react";
import {
  Scissors,
  Search,
  Filter,
  Plus,
  X,
  User,
  Clock,
  Activity,
} from "lucide-react";

export default function BlocOperatoireChirurgie() {
  const [chirurgieList, setChirurgieList] = useState([
    {
      id: "CHIR-001",
      patient: "Moussa Diop",
      intervention: "Appendicectomie cœlioscopique",
      salle: "Bloc Opératoire 1",
      chirurgien: "Dr. Alou Diallo",
      heurePrevue: "09:00",
      statut: "En cours",
    },
    {
      id: "CHIR-002",
      patient: "Aminata Traoré",
      intervention: "Césarienne en urgence",
      salle: "Bloc Obstétrical 2",
      chirurgien: "Dr. Ibrahima",
      heurePrevue: "10:30",
      statut: "Terminé",
    },
    {
      id: "CHIR-003",
      patient: "Oumar Coulibaly",
      intervention: "Ostéosynthèse tibia",
      salle: "Bloc Opératoire 2",
      chirurgien: "Dr. Alou Diallo",
      heurePrevue: "14:00",
      statut: "Planifié",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatut, setFilterStatut] = useState("Tous");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // État du formulaire pour une nouvelle intervention chirurgicale
  const [newChirurgie, setNewChirurgie] = useState({
    patient: "",
    intervention: "",
    salle: "Bloc Opératoire 1",
    chirurgien: "Dr. Alou Diallo",
    heurePrevue: "11:00",
  });

  const handleAddChirurgie = (e) => {
    e.preventDefault();
    if (!newChirurgie.patient || !newChirurgie.intervention) return;

    const chirurgieObj = {
      id: `CHIR-00${chirurgieList.length + 1}`,
      ...newChirurgie,
      statut: "Planifié",
    };

    setChirurgieList([chirurgieObj, ...chirurgieList]);
    setIsModalOpen(false);
    setNewChirurgie({
      patient: "",
      intervention: "",
      salle: "Bloc Opératoire 1",
      chirurgien: "Dr. Alou Diallo",
      heurePrevue: "11:00",
    });
  };

  const filteredChirurgie = chirurgieList.filter((chir) => {
    const matchesSearch =
      chir.patient.toLowerCase().includes(searchQuery.toLowerCase())
      || chir.intervention.toLowerCase().includes(searchQuery.toLowerCase())
      || chir.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatut =
      filterStatut === "Tous" || chir.statut === filterStatut;
    return matchesSearch && matchesStatut;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* En-tête de la page */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <Scissors className="text-purple-600" size={22} /> Bloc Opératoire &
            Chirurgie
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Planification des interventions chirurgicales, gestion des salles
            d'opération et suivi des programmes opératoires.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-xs flex items-center gap-2 cursor-pointer w-fit">
          <Plus size={18} /> Programmer une Chirurgie
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
            placeholder="Rechercher patient, intervention, ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-purple-500 transition-colors"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-xs font-semibold text-slate-400 uppercase flex items-center gap-1.5">
            <Filter size={14} /> Statut :
          </span>
          <select
            value={filterStatut}
            onChange={(e) => setFilterStatut(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-4 py-2.5 outline-none focus:border-purple-500 transition-colors cursor-pointer w-full sm:w-auto">
            <option value="Tous">Tous les statuts</option>
            <option value="Planifié">Planifié</option>
            <option value="En cours">En cours</option>
            <option value="Terminé">Terminé</option>
          </select>
        </div>
      </div>

      {/* Tableau Bloc Opératoire & Chirurgie */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 font-semibold text-xs uppercase tracking-wider">
                <th className="py-3.5 px-6">ID & Patient</th>
                <th className="py-3.5 px-6">Intervention / Acte</th>
                <th className="py-3.5 px-6">Salle</th>
                <th className="py-3.5 px-6">Chirurgien Principal</th>
                <th className="py-3.5 px-6">Heure Prévue</th>
                <th className="py-3.5 px-6 text-right">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {filteredChirurgie.length > 0 ?
                filteredChirurgie.map((chir) => (
                  <tr
                    key={chir.id}
                    className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-bold text-slate-800">{chir.patient}</p>
                      <span className="text-xs text-purple-600 font-semibold">
                        {chir.id}
                      </span>
                    </td>
                    <td className="px-6 font-medium text-slate-700 max-w-xs truncate">
                      {chir.intervention}
                    </td>
                    <td className="px-6 text-xs font-semibold text-slate-600">
                      {chir.salle}
                    </td>
                    <td className="px-6 text-xs text-slate-600 flex items-center gap-1.5 pt-5">
                      <User size={13} className="text-slate-400" />{" "}
                      {chir.chirurgien}
                    </td>
                    <td className="px-6 text-xs text-slate-500 flex items-center gap-1 pt-5">
                      <Clock size={13} className="text-slate-400" />{" "}
                      {chir.heurePrevue}
                    </td>
                    <td className="px-6 text-right">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full border inline-block ${
                          chir.statut === "Terminé" ?
                            "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                          : chir.statut === "En cours" ?
                            "bg-purple-50 text-purple-700 border-purple-200/60"
                          : "bg-amber-50 text-amber-700 border-amber-200/60"
                        }`}>
                        {chir.statut}
                      </span>
                    </td>
                  </tr>
                ))
              : <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-400">
                    Aucune intervention chirurgicale trouvée.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* Modale de programmation d'une chirurgie */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Scissors className="text-purple-600" size={20} /> Programmer
                une Intervention
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddChirurgie} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Nom du Patient
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Fatoumata Konaté"
                  value={newChirurgie.patient}
                  onChange={(e) =>
                    setNewChirurgie({
                      ...newChirurgie,
                      patient: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Type d'Intervention / Chirurgie
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Hernectomie inguinale"
                  value={newChirurgie.intervention}
                  onChange={(e) =>
                    setNewChirurgie({
                      ...newChirurgie,
                      intervention: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Salle d'Opération
                  </label>
                  <select
                    value={newChirurgie.salle}
                    onChange={(e) =>
                      setNewChirurgie({
                        ...newChirurgie,
                        salle: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-purple-500 cursor-pointer">
                    <option value="Bloc Opératoire 1">Bloc Opératoire 1</option>
                    <option value="Bloc Opératoire 2">Bloc Opératoire 2</option>
                    <option value="Bloc Obstétrical 2">
                      Bloc Obstétrical 2
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Heure Prévue
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: 15:30"
                    value={newChirurgie.heurePrevue}
                    onChange={(e) =>
                      setNewChirurgie({
                        ...newChirurgie,
                        heurePrevue: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Chirurgien Principal
                </label>
                <select
                  value={newChirurgie.chirurgien}
                  onChange={(e) =>
                    setNewChirurgie({
                      ...newChirurgie,
                      chirurgien: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-purple-500 cursor-pointer">
                  <option value="Dr. Alou Diallo">Dr. Alou Diallo</option>
                  <option value="Dr. Ibrahima">Dr. Ibrahima</option>
                  <option value="Dr. Mariam Sidibé">Dr. Mariam Sidibé</option>
                </select>
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
                  className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-semibold transition-all shadow-xs cursor-pointer">
                  Enregistrer l'intervention
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
