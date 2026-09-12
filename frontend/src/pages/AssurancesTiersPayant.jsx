// src/pages/AssurancesTiersPayant.jsx
import React, { useState } from "react";
import {
  ShieldCheck,
  Search,
  Filter,
  Plus,
  X,
  FileText,
  Clock,
  CheckCircle2,
} from "lucide-react";

export default function AssurancesTiersPayant() {
  const [assuranceList, setAssuranceList] = useState([
    {
      id: "TP-001",
      patient: "Sekou Koné",
      compagnie: "AMO (Assurance Maladie Obligatoire)",
      tauxPriseEnCharge: "80%",
      montantTotal: "45 000 FCFA",
      partAssurance: "36 000 FCFA",
      partPatient: "9 000 FCFA",
      statut: "En attente de validation",
    },
    {
      id: "TP-002",
      patient: "Fatoumata Diallo",
      compagnie: "SUNU Assurances",
      tauxPriseEnCharge: "100%",
      montantTotal: "25 000 FCFA",
      partAssurance: "25 000 FCFA",
      partPatient: "0 FCFA",
      statut: "Validé & Transmis",
    },
    {
      id: "TP-003",
      patient: "Moussa Diop",
      compagnie: "NSIA Assurances",
      tauxPriseEnCharge: "70%",
      montantTotal: "120 000 FCFA",
      partAssurance: "84 000 FCFA",
      partPatient: "36 000 FCFA",
      statut: "Remboursé",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatut, setFilterStatut] = useState("Tous");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // État du formulaire pour une nouvelle prise en charge Tiers-Payant
  const [newAssurance, setNewAssurance] = useState({
    patient: "",
    compagnie: "AMO (Assurance Maladie Obligatoire)",
    tauxPriseEnCharge: "80%",
    montantTotal: "",
  });

  const handleAddAssurance = (e) => {
    e.preventDefault();
    if (!newAssurance.patient || !newAssurance.montantTotal) return;

    const montant = parseFloat(newAssurance.montantTotal);
    const tauxNum = parseInt(newAssurance.tauxPriseEnCharge, 10);
    const partAssur = (montant * tauxNum) / 100;
    const partPat = montant - partAssur;

    const assuranceObj = {
      id: `TP-00${assuranceList.length + 1}`,
      patient: newAssurance.patient,
      compagnie: newAssurance.compagnie,
      tauxPriseEnCharge: newAssurance.tauxPriseEnCharge,
      montantTotal: `${montant.toLocaleString()} FCFA`,
      partAssurance: `${partAssur.toLocaleString()} FCFA`,
      partPatient: `${partPat.toLocaleString()} FCFA`,
      statut: "En attente de validation",
    };

    setAssuranceList([assuranceObj, ...assuranceList]);
    setIsModalOpen(false);
    setNewAssurance({
      patient: "",
      compagnie: "AMO (Assurance Maladie Obligatoire)",
      tauxPriseEnCharge: "80%",
      montantTotal: "",
    });
  };

  const filteredAssurance = assuranceList.filter((item) => {
    const matchesSearch =
      item.patient.toLowerCase().includes(searchQuery.toLowerCase())
      || item.compagnie.toLowerCase().includes(searchQuery.toLowerCase())
      || item.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatut =
      filterStatut === "Tous" || item.statut === filterStatut;
    return matchesSearch && matchesStatut;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* En-tête de la page */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <ShieldCheck className="text-indigo-600" size={22} /> Assurances &
            Tiers-Payant
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Gestion des dossiers d'assurance, calcul des parts patient/compagnie
            et suivi des remboursements (AMO, Privés).
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-xs flex items-center gap-2 cursor-pointer w-fit">
          <Plus size={18} /> Nouveau Dossier Tiers-Payant
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
            placeholder="Rechercher patient, compagnie, ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-xs font-semibold text-slate-400 uppercase flex items-center gap-1.5">
            <Filter size={14} /> Statut :
          </span>
          <select
            value={filterStatut}
            onChange={(e) => setFilterStatut(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-4 py-2.5 outline-none focus:border-indigo-500 transition-colors cursor-pointer w-full sm:w-auto">
            <option value="Tous">Tous les statuts</option>
            <option value="En attente de validation">
              En attente de validation
            </option>
            <option value="Validé & Transmis">Validé & Transmis</option>
            <option value="Remboursé">Remboursé</option>
          </select>
        </div>
      </div>

      {/* Tableau Assurances & Tiers-Payant */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 font-semibold text-xs uppercase tracking-wider">
                <th className="py-3.5 px-6">ID & Patient</th>
                <th className="py-3.5 px-6">Compagnie d'Assurance</th>
                <th className="py-3.5 px-6">Prise en charge</th>
                <th className="py-3.5 px-6">Montant Total</th>
                <th className="py-3.5 px-6">Part Assurance / Patient</th>
                <th className="py-3.5 px-6 text-right">Statut Dossier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {filteredAssurance.length > 0 ?
                filteredAssurance.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-bold text-slate-800">{item.patient}</p>
                      <span className="text-xs text-indigo-600 font-semibold">
                        {item.id}
                      </span>
                    </td>
                    <td className="px-6 font-medium text-slate-700">
                      {item.compagnie}
                    </td>
                    <td className="px-6 font-semibold text-indigo-600">
                      {item.tauxPriseEnCharge}
                    </td>
                    <td className="px-6 font-bold text-slate-800">
                      {item.montantTotal}
                    </td>
                    <td className="px-6 text-xs">
                      <p className="font-semibold text-emerald-600">
                        Assur: {item.partAssurance}
                      </p>
                      <p className="text-slate-500">
                        Patient: {item.partPatient}
                      </p>
                    </td>
                    <td className="px-6 text-right">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full border inline-block ${
                          item.statut === "Remboursé" ?
                            "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                          : item.statut === "Validé & Transmis" ?
                            "bg-blue-50 text-blue-700 border-blue-200/60"
                          : "bg-amber-50 text-amber-700 border-amber-200/60"
                        }`}>
                        {item.statut}
                      </span>
                    </td>
                  </tr>
                ))
              : <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-400">
                    Aucun dossier d'assurance trouvé.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* Modale d'ajout de dossier assurance */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <ShieldCheck className="text-indigo-600" size={20} /> Nouveau
                Dossier Tiers-Payant
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddAssurance} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Nom du Patient
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Aminata Traoré"
                  value={newAssurance.patient}
                  onChange={(e) =>
                    setNewAssurance({
                      ...newAssurance,
                      patient: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Compagnie d'Assurance / Mutuelle
                </label>
                <select
                  value={newAssurance.compagnie}
                  onChange={(e) =>
                    setNewAssurance({
                      ...newAssurance,
                      compagnie: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 cursor-pointer">
                  <option value="AMO (Assurance Maladie Obligatoire)">
                    AMO (Assurance Maladie Obligatoire)
                  </option>
                  <option value="SUNU Assurances">SUNU Assurances</option>
                  <option value="NSIA Assurances">NSIA Assurances</option>
                  <option value="Allianz Mali">Allianz Mali</option>
                  <option value="La Médicale">La Médicale</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Taux de Prise en Charge
                  </label>
                  <select
                    value={newAssurance.tauxPriseEnCharge}
                    onChange={(e) =>
                      setNewAssurance({
                        ...newAssurance,
                        tauxPriseEnCharge: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 cursor-pointer">
                    <option value="100%">100%</option>
                    <option value="80%">80%</option>
                    <option value="70%">70%</option>
                    <option value="50%">50%</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Montant Total (FCFA)
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="Ex: 35000"
                    value={newAssurance.montantTotal}
                    onChange={(e) =>
                      setNewAssurance({
                        ...newAssurance,
                        montantTotal: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500"
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
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-all shadow-xs cursor-pointer">
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
