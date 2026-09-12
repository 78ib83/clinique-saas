// src/pages/UrgencesTriage.jsx
import React, { useState } from "react";
import {
  AlertCircle,
  Search,
  Filter,
  Activity,
  Clock,
  Plus,
  X,
  ShieldAlert,
  CheckCircle2,
  Printer,
  FileText,
  Phone,
  User,
} from "lucide-react";

export default function UrgencesTriage() {
  const [urgences, setUrgences] = useState([
    {
      id: "URG-2026-001",
      patient: "Sekou Koné",
      telephone: "+223 70 98 76 54",
      niveauUrgence: "Niveau 1 - Critique",
      motif: "Détresse respiratoire aiguë - Cyanose",
      box: "Box Réanimation 1",
      medecin: "Dr. Alou Diallo",
      heureArrivee: "11:00",
      statut: "En cours",
      constantes: {
        temperature: "39.0°C",
        tension: "140/90 mmHg",
        saturation: "88%",
      },
    },
    {
      id: "URG-2026-002",
      patient: "Aissata Cissé",
      telephone: "+223 65 43 21 09",
      niveauUrgence: "Niveau 2 - Urgent",
      motif: "Traumatisme crânien léger suite à une chute",
      box: "Box 3",
      medecin: "Dr. Ibrahima",
      heureArrivee: "11:20",
      statut: "En attente d'examen",
      constantes: {
        temperature: "37.2°C",
        tension: "125/80 mmHg",
        saturation: "98%",
      },
    },
    {
      id: "URG-2026-003",
      patient: "Oumar Dembélé",
      telephone: "+223 76 11 22 33",
      niveauUrgence: "Niveau 3 - Non urgent",
      motif: "Douleurs abdominales modérées",
      box: "Salle d'attente U",
      medecin: "Dr. Mariam Sidibé",
      heureArrivee: "11:45",
      statut: "Stabilisé",
      constantes: {
        temperature: "37.8°C",
        tension: "120/75 mmHg",
        saturation: "99%",
      },
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterNiveau, setFilterNiveau] = useState("Tous");
  const [filterStatut, setFilterStatut] = useState("Tous");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedUrgence, setSelectedUrgence] = useState(null);

  // État du formulaire d'admission aux urgences enrichi
  const [newUrgence, setNewUrgence] = useState({
    patient: "",
    telephone: "",
    niveauUrgence: "Niveau 2 - Urgent",
    motif: "",
    box: "Box 1",
    medecin: "Dr. Alou Diallo",
    temperature: "",
    tension: "",
    saturation: "",
  });

  const handleAddUrgence = (e) => {
    e.preventDefault();
    if (!newUrgence.patient || !newUrgence.motif) return;

    const urgenceObj = {
      id: `URG-2026-${String(urgences.length + 1).padStart(3, "0")}`,
      patient: newUrgence.patient,
      telephone: newUrgence.telephone || "+223 XX XX XX XX",
      niveauUrgence: newUrgence.niveauUrgence,
      motif: newUrgence.motif,
      box: newUrgence.box,
      medecin: newUrgence.medecin,
      heureArrivee: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      statut: "En cours",
      constantes: {
        temperature:
          newUrgence.temperature ? `${newUrgence.temperature}°C` : "N/C",
        tension: newUrgence.tension || "N/C",
        saturation: newUrgence.saturation ? `${newUrgence.saturation}%` : "N/C",
      },
    };

    setUrgences([urgenceObj, ...urgences]);
    setIsModalOpen(false);
    setSelectedUrgence(urgenceObj);
    setDetailsModalOpen(true);

    setNewUrgence({
      patient: "",
      telephone: "",
      niveauUrgence: "Niveau 2 - Urgent",
      motif: "",
      box: "Box 1",
      medecin: "Dr. Alou Diallo",
      temperature: "",
      tension: "",
      saturation: "",
    });
  };

  const handleUpdateStatus = (id, newStatut) => {
    setUrgences(
      urgences.map((urg) =>
        urg.id === id ? { ...urg, statut: newStatut } : urg,
      ),
    );
  };

  // Filtrage multicritères avancé
  const filteredUrgences = urgences.filter((urg) => {
    const matchesSearch =
      urg.patient.toLowerCase().includes(searchQuery.toLowerCase())
      || urg.id.toLowerCase().includes(searchQuery.toLowerCase())
      || urg.motif.toLowerCase().includes(searchQuery.toLowerCase())
      || urg.telephone.includes(searchQuery);
    const matchesNiveau =
      filterNiveau === "Tous" || urg.niveauUrgence.includes(filterNiveau);
    const matchesStatut =
      filterStatut === "Tous" || urg.statut === filterStatut;

    return matchesSearch && matchesNiveau && matchesStatut;
  });

  // Indicateurs clés (KPI)
  const totalUrgences = urgences.length;
  const critiquesCount = urgences.filter((u) =>
    u.niveauUrgence.includes("Niveau 1"),
  ).length;
  const enCoursCount = urgences.filter(
    (u) => u.statut === "En cours" || u.statut === "En attente d'examen",
  ).length;

  return (
    <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4">
      {/* En-tête de la page */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-rose-600 block mb-0.5">
            Service des Urgences & Réanimation
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight flex items-center gap-2">
            <ShieldAlert className="text-rose-600" size={22} /> Urgences &
            Triage
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Gestion de l'accueil critique, hiérarchisation par niveau de gravité
            et suivi en temps réel des boxes.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95 shrink-0">
          <Plus size={18} /> Admission Urgence
        </button>
      </div>

      {/* Mini-cartes KPI d'urgences */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Total Admissions du Jour
              </p>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 mt-1.5 tracking-tight">
                {totalUrgences} Patients
              </h3>
            </div>
            <div className="bg-blue-50 text-blue-600 p-2.5 rounded-xl border border-blue-100">
              <Activity size={20} />
            </div>
          </div>
          <p className="mt-3 text-[11px] sm:text-xs font-semibold text-blue-600 bg-blue-50/60 w-fit px-2.5 py-1 rounded-lg">
            Registre global actif
          </p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Cas Critiques (Niveau 1)
              </p>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 mt-1.5 tracking-tight">
                {critiquesCount} Réanimation
              </h3>
            </div>
            <div className="bg-rose-50 text-rose-600 p-2.5 rounded-xl border border-rose-100">
              <ShieldAlert size={20} />
            </div>
          </div>
          <p className="mt-3 text-[11px] sm:text-xs font-semibold text-rose-600 bg-rose-50/60 w-fit px-2.5 py-1 rounded-lg">
            Intervention prioritaire
          </p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">
                En Cours / Surveillance
              </p>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 mt-1.5 tracking-tight">
                {enCoursCount} Actifs
              </h3>
            </div>
            <div className="bg-amber-50 text-amber-600 p-2.5 rounded-xl border border-amber-100">
              <Clock size={20} />
            </div>
          </div>
          <p className="mt-3 text-[11px] sm:text-xs font-semibold text-amber-600 bg-amber-50/60 w-fit px-2.5 py-1 rounded-lg">
            Suivi boxes en cours
          </p>
        </div>
      </div>

      {/* Barre de recherche et filtres multicritères */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        <div className="relative md:col-span-5">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Rechercher patient, motif, ID ou téléphone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-rose-500 transition-colors"
          />
        </div>

        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <select
            value={filterNiveau}
            onChange={(e) => setFilterNiveau(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm font-medium rounded-xl px-3 py-2.5 outline-none focus:border-rose-500 transition-colors cursor-pointer w-full">
            <option value="Tous">Tous les niveaux de gravité</option>
            <option value="Niveau 1">Niveau 1 (Critique)</option>
            <option value="Niveau 2">Niveau 2 (Urgent)</option>
            <option value="Niveau 3">Niveau 3 (Non urgent)</option>
          </select>

          <select
            value={filterStatut}
            onChange={(e) => setFilterStatut(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm font-medium rounded-xl px-3 py-2.5 outline-none focus:border-rose-500 transition-colors cursor-pointer w-full">
            <option value="Tous">Tous les statuts</option>
            <option value="En cours">En cours</option>
            <option value="En attente d'examen">En attente d'examen</option>
            <option value="Stabilisé">Stabilisé</option>
          </select>
        </div>
      </div>

      {/* Tableau des urgences responsive */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 font-bold text-[10px] sm:text-xs uppercase tracking-wider">
                <th className="py-3.5 px-4 sm:px-6">ID & Patient</th>
                <th className="py-3.5 px-4 sm:px-6">Niveau de Triage</th>
                <th className="py-3.5 px-4 sm:px-6">Motif d'Admission</th>
                <th className="py-3.5 px-4 sm:px-6">Box & Constantes</th>
                <th className="py-3.5 px-4 sm:px-6">Arrivée</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">
                  Statut / Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {filteredUrgences.length > 0 ?
                filteredUrgences.map((urg) => (
                  <tr
                    key={urg.id}
                    className="hover:bg-slate-50/85 transition-colors">
                    <td className="py-4 px-4 sm:px-6">
                      <p className="font-bold text-slate-800">{urg.patient}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] text-rose-600 font-extrabold">
                          {urg.id}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {urg.telephone}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6">
                      <span
                        className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg border inline-block ${
                          urg.niveauUrgence.includes("Niveau 1") ?
                            "bg-rose-50 text-rose-700 border-rose-200/60"
                          : urg.niveauUrgence.includes("Niveau 2") ?
                            "bg-amber-50 text-amber-700 border-amber-200/60"
                          : "bg-blue-50 text-blue-700 border-blue-200/60"
                        }`}>
                        {urg.niveauUrgence}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 font-medium text-slate-700 max-w-xs">
                      <p className="truncate">{urg.motif}</p>
                      <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">
                        Médecin: {urg.medecin}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6">
                      <p className="font-bold text-slate-800 text-xs">
                        {urg.box}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1 text-[10px] text-slate-400 font-semibold">
                        <span>T°: {urg.constantes.temperature}</span>
                        <span>•</span>
                        <span>SpO2: {urg.constantes.saturation}</span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 text-xs text-slate-500">
                      <div className="flex items-center gap-1 font-medium text-slate-700">
                        <Clock size={13} className="text-slate-400 shrink-0" />
                        <span>{urg.heureArrivee}</span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 text-right">
                      <div className="flex flex-col items-end gap-1.5">
                        <span
                          className={`px-2.5 py-0.5 text-[10px] sm:text-xs font-bold rounded-full border inline-flex items-center gap-1 ${
                            urg.statut === "Stabilisé" ?
                              "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                            : urg.statut === "En cours" ?
                              "bg-rose-50 text-rose-700 border-rose-200/60"
                            : "bg-amber-50 text-amber-700 border-amber-200/60"
                          }`}>
                          {urg.statut === "Stabilisé" && (
                            <CheckCircle2 size={11} />
                          )}
                          {urg.statut === "En cours" && <Activity size={11} />}
                          {urg.statut}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedUrgence(urg);
                              setDetailsModalOpen(true);
                            }}
                            className="text-[11px] text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-0.5 cursor-pointer">
                            <FileText size={12} /> Fiche
                          </button>
                          {urg.statut !== "Stabilisé" && (
                            <button
                              onClick={() =>
                                handleUpdateStatus(urg.id, "Stabilisé")
                              }
                              className="text-[11px] text-emerald-600 hover:text-emerald-800 font-semibold flex items-center gap-0.5 cursor-pointer bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                              Stabiliser
                            </button>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              : <tr>
                  <td
                    colSpan="6"
                    className="py-12 text-center text-slate-400 text-sm">
                    Aucune urgence trouvée correspondant aux critères.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* MODALE 1 : Admission Urgence */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
              <h3 className="text-base sm:text-lg font-extrabold text-slate-800 flex items-center gap-2">
                <ShieldAlert className="text-rose-600" size={20} /> Nouvelle
                Admission aux Urgences
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl bg-slate-100 cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddUrgence} className="space-y-4 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                    Nom du Patient *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Aminata Touré"
                    value={newUrgence.patient}
                    onChange={(e) =>
                      setNewUrgence({ ...newUrgence, patient: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                    Téléphone
                  </label>
                  <input
                    type="text"
                    placeholder="+223 XX XX XX XX"
                    value={newUrgence.telephone}
                    onChange={(e) =>
                      setNewUrgence({
                        ...newUrgence,
                        telephone: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                    Niveau d'Urgence
                  </label>
                  <select
                    value={newUrgence.niveauUrgence}
                    onChange={(e) =>
                      setNewUrgence({
                        ...newUrgence,
                        niveauUrgence: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-rose-500 cursor-pointer">
                    <option value="Niveau 1 - Critique">
                      Niveau 1 - Critique
                    </option>
                    <option value="Niveau 2 - Urgent">Niveau 2 - Urgent</option>
                    <option value="Niveau 3 - Non urgent">
                      Niveau 3 - Non urgent
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                    Box / Localisation
                  </label>
                  <select
                    value={newUrgence.box}
                    onChange={(e) =>
                      setNewUrgence({ ...newUrgence, box: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-rose-500 cursor-pointer">
                    <option value="Box Réanimation 1">Box Réanimation 1</option>
                    <option value="Box 1">Box 1</option>
                    <option value="Box 2">Box 2</option>
                    <option value="Box 3">Box 3</option>
                    <option value="Salle d'attente U">Salle d'attente U</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                    Médecin Référent
                  </label>
                  <select
                    value={newUrgence.medecin}
                    onChange={(e) =>
                      setNewUrgence({ ...newUrgence, medecin: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-rose-500 cursor-pointer">
                    <option value="Dr. Alou Diallo">Dr. Alou Diallo</option>
                    <option value="Dr. Ibrahima">Dr. Ibrahima</option>
                    <option value="Dr. Mariam Sidibé">Dr. Mariam Sidibé</option>
                  </select>
                </div>
              </div>

              {/* Constantes vitales d'urgence */}
              <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                    Température (°C)
                  </label>
                  <input
                    type="text"
                    placeholder="38.5"
                    value={newUrgence.temperature}
                    onChange={(e) =>
                      setNewUrgence({
                        ...newUrgence,
                        temperature: e.target.value,
                      })
                    }
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                    Tension (TA)
                  </label>
                  <input
                    type="text"
                    placeholder="120/80"
                    value={newUrgence.tension}
                    onChange={(e) =>
                      setNewUrgence({ ...newUrgence, tension: e.target.value })
                    }
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                    Saturation SpO2 (%)
                  </label>
                  <input
                    type="text"
                    placeholder="95"
                    value={newUrgence.saturation}
                    onChange={(e) =>
                      setNewUrgence({
                        ...newUrgence,
                        saturation: e.target.value,
                      })
                    }
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  Motif d'admission / Symptômes *
                </label>
                <textarea
                  rows="3"
                  required
                  placeholder="Décrire brièvement le tableau clinique d'urgence..."
                  value={newUrgence.motif}
                  onChange={(e) =>
                    setNewUrgence({ ...newUrgence, motif: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-rose-500 resize-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer">
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer active:scale-95">
                  Valider l'admission d'urgence
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODALE 2 : Fiche d'Urgence Détaillée & Impression */}
      {detailsModalOpen && selectedUrgence && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-dashed border-slate-200">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-rose-50 rounded-xl text-rose-600">
                  <ShieldAlert size={22} />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-800 text-sm">
                    FICHE DE TRIAGE & URGENCE
                  </h4>
                  <p className="text-[10px] text-slate-400">
                    Réf : {selectedUrgence.id}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setDetailsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex justify-between">
                <span className="font-semibold text-slate-400">
                  Heure d'arrivée :
                </span>
                <span className="font-bold text-slate-800">
                  {selectedUrgence.heureArrivee}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-400">Patient :</span>
                <span className="font-bold text-slate-800">
                  {selectedUrgence.patient} ({selectedUrgence.telephone})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-400">
                  Niveau de Gravité :
                </span>
                <span className="font-bold text-rose-600">
                  {selectedUrgence.niveauUrgence}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-400">
                  Localisation / Box :
                </span>
                <span className="font-bold text-slate-800">
                  {selectedUrgence.box}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-400">
                  Médecin Référent :
                </span>
                <span className="font-bold text-slate-800">
                  {selectedUrgence.medecin}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <span className="font-bold text-slate-700 block mb-1">
                  Constantes d'Entrée :
                </span>
                <div className="grid grid-cols-3 gap-2 bg-white p-2.5 rounded-lg border border-slate-200 text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 block">
                      Température
                    </span>
                    <span className="font-bold text-slate-800">
                      {selectedUrgence.constantes.temperature}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">
                      Tension
                    </span>
                    <span className="font-bold text-slate-800">
                      {selectedUrgence.constantes.tension}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">
                      Saturation SpO2
                    </span>
                    <span className="font-bold text-slate-800">
                      {selectedUrgence.constantes.saturation}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <span className="font-bold text-slate-700 block mb-1">
                  Motif d'Admission & Symptômes :
                </span>
                <p className="bg-white p-3 rounded-lg border border-slate-200 text-slate-700 font-medium">
                  {selectedUrgence.motif}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDetailsModalOpen(false)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer">
                Fermer
              </button>
              <button
                onClick={() => {
                  window.print();
                }}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer">
                <Printer size={16} /> Imprimer la Fiche Urgence
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
