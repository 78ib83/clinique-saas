// src/pages/LaboratoireExamens.jsx
import React, { useState } from "react";
import {
  FlaskConical,
  Search,
  Filter,
  Plus,
  X,
  User,
  Clock,
  CheckCircle2,
} from "lucide-react";

export default function LaboratoireExamens() {
  const [labList, setLabList] = useState([
    {
      id: "LAB-001",
      patient: "Sekou Koné",
      examen: "Gaz du sang & NFS complet",
      service: "Urgences",
      prescripteur: "Dr. Alou Diallo",
      heureDemande: "11:15",
      statut: "En cours",
    },
    {
      id: "LAB-002",
      patient: "Fatoumata Diallo",
      examen: "Bilan prénatal (Glycémie, Albuminurie, TDR Malaria)",
      service: "Maternité & CPN",
      prescripteur: "Awa Traoré",
      heureDemande: "10:00",
      statut: "Validé",
    },
    {
      id: "LAB-003",
      patient: "Moussa Diop",
      examen: "CRP, Créatinine & Groupage sanguin",
      service: "Chirurgie Générale",
      prescripteur: "Dr. Alou Diallo",
      heureDemande: "08:30",
      statut: "Validé",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatut, setFilterStatut] = useState("Tous");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // État du formulaire pour une nouvelle prescription d'examen de laboratoire
  const [newLab, setNewLab] = useState({
    patient: "",
    examen: "",
    service: "Médecine Interne",
    prescripteur: "Dr. Ibrahima",
  });

  const handleAddLab = (e) => {
    e.preventDefault();
    if (!newLab.patient || !newLab.examen) return;

    const labObj = {
      id: `LAB-00${labList.length + 1}`,
      ...newLab,
      heureDemande: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      statut: "En attente",
    };

    setLabList([labObj, ...labList]);
    setIsModalOpen(false);
    setNewLab({
      patient: "",
      examen: "",
      service: "Médecine Interne",
      prescripteur: "Dr. Ibrahima",
    });
  };

  const filteredLab = labList.filter((lab) => {
    const matchesSearch =
      lab.patient.toLowerCase().includes(searchQuery.toLowerCase())
      || lab.examen.toLowerCase().includes(searchQuery.toLowerCase())
      || lab.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatut =
      filterStatut === "Tous" || lab.statut === filterStatut;
    return matchesSearch && matchesStatut;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* En-tête de la page */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <FlaskConical className="text-teal-600" size={22} /> Laboratoire &
            Examens
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Gestion des prescriptions biologiques, suivi des prélèvements et
            validation des résultats d'analyses médicales.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-xs flex items-center gap-2 cursor-pointer w-fit">
          <Plus size={18} /> Nouvelle Prescription Labo
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
            placeholder="Rechercher patient, examen, ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-teal-500 transition-colors"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-xs font-semibold text-slate-400 uppercase flex items-center gap-1.5">
            <Filter size={14} /> Statut :
          </span>
          <select
            value={filterStatut}
            onChange={(e) => setFilterStatut(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-4 py-2.5 outline-none focus:border-teal-500 transition-colors cursor-pointer w-full sm:w-auto">
            <option value="Tous">Tous les statuts</option>
            <option value="En attente">En attente</option>
            <option value="En cours">En cours</option>
            <option value="Validé">Validé</option>
          </select>
        </div>
      </div>

      {/* Tableau Laboratoire & Examens */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 font-semibold text-xs uppercase tracking-wider">
                <th className="py-3.5 px-6">ID & Patient</th>
                <th className="py-3.5 px-6">Examen(s) Demandé(s)</th>
                <th className="py-3.5 px-6">Service Demandeur</th>
                <th className="py-3.5 px-6">Prescripteur</th>
                <th className="py-3.5 px-6">Heure</th>
                <th className="py-3.5 px-6 text-right">Statut Résultat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {filteredLab.length > 0 ?
                filteredLab.map((lab) => (
                  <tr
                    key={lab.id}
                    className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-bold text-slate-800">{lab.patient}</p>
                      <span className="text-xs text-teal-600 font-semibold">
                        {lab.id}
                      </span>
                    </td>
                    <td className="px-6 font-medium text-slate-700 max-w-xs truncate">
                      {lab.examen}
                    </td>
                    <td className="px-6 text-xs font-semibold text-slate-600">
                      {lab.service}
                    </td>
                    <td className="px-6 text-xs text-slate-600 flex items-center gap-1.5 pt-5">
                      <User size={13} className="text-slate-400" />{" "}
                      {lab.prescripteur}
                    </td>
                    <td className="px-6 text-xs text-slate-500 flex items-center gap-1 pt-5">
                      <Clock size={13} className="text-slate-400" />{" "}
                      {lab.heureDemande}
                    </td>
                    <td className="px-6 text-right">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full border inline-block ${
                          lab.statut === "Validé" ?
                            "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                          : lab.statut === "En cours" ?
                            "bg-teal-50 text-teal-700 border-teal-200/60"
                          : "bg-amber-50 text-amber-700 border-amber-200/60"
                        }`}>
                        {lab.statut}
                      </span>
                    </td>
                  </tr>
                ))
              : <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-400">
                    Aucun examen de laboratoire trouvé.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* Modale de prescription d'examen */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <FlaskConical className="text-teal-600" size={20} /> Nouvelle
                Prescription Labo
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddLab} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Nom du Patient
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Cheick Oumar"
                  value={newLab.patient}
                  onChange={(e) =>
                    setNewLab({ ...newLab, patient: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Examen(s) Demandé(s)
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Hémogramme, Paludisme (Goutte épaisse)"
                  value={newLab.examen}
                  onChange={(e) =>
                    setNewLab({ ...newLab, examen: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Service Demandeur
                  </label>
                  <select
                    value={newLab.service}
                    onChange={(e) =>
                      setNewLab({ ...newLab, service: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-teal-500 cursor-pointer">
                    <option value="Urgences">Urgences</option>
                    <option value="Médecine Interne">Médecine Interne</option>
                    <option value="Chirurgie Générale">
                      Chirurgie Générale
                    </option>
                    <option value="Maternité & CPN">Maternité & CPN</option>
                    <option value="Pédiatrie">Pédiatrie</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Médecin / Prescripteur
                  </label>
                  <select
                    value={newLab.prescripteur}
                    onChange={(e) =>
                      setNewLab({ ...newLab, prescripteur: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-teal-500 cursor-pointer">
                    <option value="Dr. Alou Diallo">Dr. Alou Diallo</option>
                    <option value="Dr. Ibrahima">Dr. Ibrahima</option>
                    <option value="Dr. Mariam Sidibé">Dr. Mariam Sidibé</option>
                    <option value="Awa Traoré">Awa Traoré (Sage-femme)</option>
                  </select>
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
                  className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-sm font-semibold transition-all shadow-xs cursor-pointer">
                  Envoyer au laboratoire
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
