// src/pages/HospitalisationLits.jsx
import React, { useState } from "react";
import {
  BedDouble,
  Search,
  Filter,
  Plus,
  X,
  User,
  Building2,
  Calendar,
} from "lucide-react";

export default function HospitalisationLits() {
  const [litsList, setLitsList] = useState([
    {
      id: "HOS-001",
      litNumero: "Lit 101 - A",
      service: "Chirurgie Générale",
      patient: "Moussa Diop",
      medecin: "Dr. Alou Diallo",
      dateEntree: "08/09/2026",
      statut: "Occupé",
    },
    {
      id: "HOS-002",
      litNumero: "Lit 102 - B",
      service: "Médecine Interne",
      patient: "Bintou Traoré",
      medecin: "Dr. Ibrahima",
      dateEntree: "10/09/2026",
      statut: "Occupé",
    },
    {
      id: "HOS-003",
      litNumero: "Lit 204 - A",
      service: "Pédiatrie",
      patient: "Libre",
      medecin: "-",
      dateEntree: "-",
      statut: "Disponible",
    },
    {
      id: "HOS-004",
      litNumero: "Lit Réa - 02",
      service: "Réanimation",
      patient: "Sekou Koné",
      medecin: "Dr. Alou Diallo",
      dateEntree: "11/09/2026",
      statut: "Occupé",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatut, setFilterStatut] = useState("Tous");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // État du formulaire pour l'attribution d'un lit ou hospitalisation
  const [newHospitalisation, setNewHospitalisation] = useState({
    litNumero: "Lit 103 - A",
    service: "Chirurgie Générale",
    patient: "",
    medecin: "Dr. Alou Diallo",
  });

  const handleAddHospitalisation = (e) => {
    e.preventDefault();
    if (!newHospitalisation.patient) return;

    const hospitalisationObj = {
      id: `HOS-00${litsList.length + 1}`,
      ...newHospitalisation,
      dateEntree: new Date().toLocaleDateString("fr-FR"),
      statut: "Occupé",
    };

    setLitsList([hospitalisationObj, ...litsList]);
    setIsModalOpen(false);
    setNewHospitalisation({
      litNumero: "Lit 103 - A",
      service: "Chirurgie Générale",
      patient: "",
      medecin: "Dr. Alou Diallo",
    });
  };

  const filteredLits = litsList.filter((lit) => {
    const matchesSearch =
      lit.patient.toLowerCase().includes(searchQuery.toLowerCase())
      || lit.litNumero.toLowerCase().includes(searchQuery.toLowerCase())
      || lit.service.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatut =
      filterStatut === "Tous" || lit.statut === filterStatut;
    return matchesSearch && matchesStatut;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* En-tête de la page */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <BedDouble className="text-indigo-600" size={22} /> Hospitalisation
            & Lits
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Gestion de l'occupation des lits par service, suivi des entrées,
            sorties et des patients hospitalisés.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-xs flex items-center gap-2 cursor-pointer w-fit">
          <Plus size={18} /> Assigner un Lit
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
            placeholder="Rechercher lit, patient, service..."
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
            <option value="Tous">Tous les lits</option>
            <option value="Occupé">Occupé</option>
            <option value="Disponible">Disponible</option>
          </select>
        </div>
      </div>

      {/* Tableau Hospitalisation & Lits */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 font-semibold text-xs uppercase tracking-wider">
                <th className="py-3.5 px-6">Lit & Service</th>
                <th className="py-3.5 px-6">Patient Actuel</th>
                <th className="py-3.5 px-6">Médecin Référent</th>
                <th className="py-3.5 px-6">Date d'Entrée</th>
                <th className="py-3.5 px-6 text-right">Statut du Lit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {filteredLits.length > 0 ?
                filteredLits.map((lit) => (
                  <tr
                    key={lit.id}
                    className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-bold text-slate-800">
                        {lit.litNumero}
                      </p>
                      <span className="text-xs text-indigo-600 font-semibold flex items-center gap-1 mt-0.5">
                        <Building2 size={12} /> {lit.service}
                      </span>
                    </td>
                    <td className="px-6 font-semibold text-slate-700">
                      {lit.patient}
                    </td>
                    <td className="px-6 text-xs text-slate-600 flex items-center gap-1.5 pt-5">
                      <User size={13} className="text-slate-400" />{" "}
                      {lit.medecin}
                    </td>
                    <td className="px-6 text-xs text-slate-500">
                      {lit.dateEntree}
                    </td>
                    <td className="px-6 text-right">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full border inline-block ${
                          lit.statut === "Occupé" ?
                            "bg-rose-50 text-rose-700 border-rose-200/60"
                          : "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                        }`}>
                        {lit.statut}
                      </span>
                    </td>
                  </tr>
                ))
              : <tr>
                  <td colSpan="5" className="py-12 text-center text-slate-400">
                    Aucun lit trouvé.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* Modale d'attribution de lit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <BedDouble className="text-indigo-600" size={20} /> Assigner un
                Lit / Hospitalisation
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleAddHospitalisation}
              className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Nom du Patient
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Mariam Doumbia"
                  value={newHospitalisation.patient}
                  onChange={(e) =>
                    setNewHospitalisation({
                      ...newHospitalisation,
                      patient: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Numéro de Lit
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Lit 104 - B"
                    value={newHospitalisation.litNumero}
                    onChange={(e) =>
                      setNewHospitalisation({
                        ...newHospitalisation,
                        litNumero: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Service Médical
                  </label>
                  <select
                    value={newHospitalisation.service}
                    onChange={(e) =>
                      setNewHospitalisation({
                        ...newHospitalisation,
                        service: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 cursor-pointer">
                    <option value="Chirurgie Générale">
                      Chirurgie Générale
                    </option>
                    <option value="Médecine Interne">Médecine Interne</option>
                    <option value="Pédiatrie">Pédiatrie</option>
                    <option value="Réanimation">Réanimation</option>
                    <option value="Maternité">Maternité</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Médecin Référent
                </label>
                <select
                  value={newHospitalisation.medecin}
                  onChange={(e) =>
                    setNewHospitalisation({
                      ...newHospitalisation,
                      medecin: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 cursor-pointer">
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
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-all shadow-xs cursor-pointer">
                  Confirmer l'hospitalisation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
