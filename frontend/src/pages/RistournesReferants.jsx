// src/pages/RistournesReferants.jsx
import React, { useState } from "react";
import {
  Percent,
  Search,
  Filter,
  Plus,
  X,
  Users,
  Award,
  DollarSign,
  CheckCircle2,
  Clock,
} from "lucide-react";

export default function RistournesReferants() {
  const [ristourneList, setRistourneList] = useState([
    {
      id: "RST-001",
      referant: "Dr. Alou Diallo",
      specialite: "Médecin Généraliste (Cabinet Privé Externe)",
      patientsReferes: 14,
      chiffreAffairesGenere: "350 000 FCFA",
      tauxRistourne: "15%",
      montantDu: "52 500 FCFA",
      statut: "Payé",
    },
    {
      id: "RST-002",
      referant: "Dr. Mariam Sidibé",
      specialite: "Pédiatre / Libérale",
      patientsReferes: 8,
      chiffreAffairesGenere: "180 000 FCFA",
      tauxRistourne: "15%",
      montantDu: "27 000 FCFA",
      statut: "En attente de versement",
    },
    {
      id: "RST-003",
      referant: "Centre de Santé Communautaire (CSCom Niono)",
      specialite: "Structure Partenaire",
      patientsReferes: 25,
      chiffreAffairesGenere: "750 000 FCFA",
      tauxRistourne: "10%",
      montantDu: "75 000 FCFA",
      statut: "Validé",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatut, setFilterStatut] = useState("Tous");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // État du formulaire pour l'ajout d'un médecin/structure référent(e)
  const [newRistourne, setNewRistourne] = useState({
    referant: "",
    specialite: "Médecin Généraliste",
    patientsReferes: "",
    chiffreAffairesGenere: "",
    tauxRistourne: "15%",
  });

  const handleAddRistourne = (e) => {
    e.preventDefault();
    if (!newRistourne.referant || !newRistourne.chiffreAffairesGenere) return;

    const ca = parseFloat(newRistourne.chiffreAffairesGenere);
    const tauxNum = parseInt(newRistourne.tauxRistourne, 10);
    const montantCalcule = (ca * tauxNum) / 100;

    const ristourneObj = {
      id: `RST-00${ristourneList.length + 1}`,
      referant: newRistourne.referant,
      specialite: newRistourne.specialite,
      patientsReferes: parseInt(newRistourne.patientsReferes || "1", 10),
      chiffreAffairesGenere: `${ca.toLocaleString()} FCFA`,
      tauxRistourne: newRistourne.tauxRistourne,
      montantDu: `${montantCalcule.toLocaleString()} FCFA`,
      statut: "En attente de versement",
    };

    setRistourneList([ristourneObj, ...ristourneList]);
    setIsModalOpen(false);
    setNewRistourne({
      referant: "",
      specialite: "Médecin Généraliste",
      patientsReferes: "",
      chiffreAffairesGenere: "",
      tauxRistourne: "15%",
    });
  };

  const filteredRistournes = ristourneList.filter((item) => {
    const matchesSearch =
      item.referant.toLowerCase().includes(searchQuery.toLowerCase())
      || item.specialite.toLowerCase().includes(searchQuery.toLowerCase())
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
            <Percent className="text-violet-600" size={22} /> Ristournes &
            Référants
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Suivi des médecins et structures partenaires référents, calcul des
            commissions et gestion des ristournes.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-xs flex items-center gap-2 cursor-pointer w-fit">
          <Plus size={18} /> Ajouter un Référant / Partenaire
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
            placeholder="Rechercher référant, spécialité, ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-violet-500 transition-colors"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-xs font-semibold text-slate-400 uppercase flex items-center gap-1.5">
            <Filter size={14} /> Statut :
          </span>
          <select
            value={filterStatut}
            onChange={(e) => setFilterStatut(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-4 py-2.5 outline-none focus:border-violet-500 transition-colors cursor-pointer w-full sm:w-auto">
            <option value="Tous">Tous les statuts</option>
            <option value="En attente de versement">
              En attente de versement
            </option>
            <option value="Validé">Validé</option>
            <option value="Payé">Payé</option>
          </select>
        </div>
      </div>

      {/* Tableau Ristournes & Référants */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 font-semibold text-xs uppercase tracking-wider">
                <th className="py-3.5 px-6">ID & Médecin / Référant</th>
                <th className="py-3.5 px-6">Spécialité / Structure</th>
                <th className="py-3.5 px-6">Patients Référés</th>
                <th className="py-3.5 px-6">CA Généré</th>
                <th className="py-3.5 px-6">Taux & Montant Dû</th>
                <th className="py-3.5 px-6 text-right">Statut Versement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {filteredRistournes.length > 0 ?
                filteredRistournes.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-bold text-slate-800">
                        {item.referant}
                      </p>
                      <span className="text-xs text-violet-600 font-semibold">
                        {item.id}
                      </span>
                    </td>
                    <td className="px-6 font-medium text-slate-700">
                      {item.specialite}
                    </td>
                    <td className="px-6 font-semibold text-slate-800 text-center">
                      <span className="px-2.5 py-1 bg-slate-100 rounded-lg text-xs">
                        {item.patientsReferes} patients
                      </span>
                    </td>
                    <td className="px-6 font-medium text-slate-700">
                      {item.chiffreAffairesGenere}
                    </td>
                    <td className="px-6">
                      <p className="text-xs font-semibold text-violet-600">
                        Taux : {item.tauxRistourne}
                      </p>
                      <p className="font-bold text-slate-800">
                        Dû : {item.montantDu}
                      </p>
                    </td>
                    <td className="px-6 text-right">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full border inline-block ${
                          item.statut === "Payé" ?
                            "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                          : item.statut === "Validé" ?
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
                    Aucun référant ou ristourne trouvé.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* Modale d'ajout de référant */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Percent className="text-violet-600" size={20} /> Ajouter un
                Médecin Référant
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddRistourne} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Nom du Médecin ou Structure Partenaire
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Dr. Oumar Cissé"
                  value={newRistourne.referant}
                  onChange={(e) =>
                    setNewRistourne({
                      ...newRistourne,
                      referant: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Spécialité / Structure
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Cardiologue / Cabinet Privé"
                  value={newRistourne.specialite}
                  onChange={(e) =>
                    setNewRistourne({
                      ...newRistourne,
                      specialite: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-violet-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Patients Référés
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="Ex: 5"
                    value={newRistourne.patientsReferes}
                    onChange={(e) =>
                      setNewRistourne({
                        ...newRistourne,
                        patientsReferes: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-violet-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Taux de Ristourne
                  </label>
                  <select
                    value={newRistourne.tauxRistourne}
                    onChange={(e) =>
                      setNewRistourne({
                        ...newRistourne,
                        tauxRistourne: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-violet-500 cursor-pointer">
                    <option value="10%">10%</option>
                    <option value="15%">15%</option>
                    <option value="20%">20%</option>
                    <option value="25%">25%</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Chiffre d'Affaires Généré (FCFA)
                </label>
                <input
                  type="number"
                  required
                  placeholder="Ex: 120000"
                  value={newRistourne.chiffreAffairesGenere}
                  onChange={(e) =>
                    setNewRistourne({
                      ...newRistourne,
                      chiffreAffairesGenere: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-violet-500"
                />
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
                  className="px-5 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-sm font-semibold transition-all shadow-xs cursor-pointer">
                  Enregistrer le référant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
