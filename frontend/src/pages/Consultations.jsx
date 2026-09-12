// src/pages/Consultations.jsx
import React, { useState } from "react";
import {
  Stethoscope,
  Search,
  Filter,
  User,
  Calendar,
  Clock,
  Plus,
  X,
  FileText,
  CheckCircle2,
  AlertCircle,
  Activity,
  Printer,
  ChevronRight,
} from "lucide-react";

export default function Consultations() {
  const [consultations, setConsultations] = useState([
    {
      id: "CONS-2026-001",
      patient: "Fatoumata Diallo",
      telephone: "+223 76 54 32 10",
      specialite: "Médecine Générale",
      medecin: "Dr. Ibrahima",
      date: "12/09/2026",
      heure: "09:30",
      statut: "Terminée",
      diagnostic: "Paludisme simple - Traitement prescrit (Artéméther)",
      constantes: {
        temperature: "38.5°C",
        tension: "120/80 mmHg",
        poids: "65 kg",
      },
    },
    {
      id: "CONS-2026-002",
      patient: "Moussa Traoré",
      telephone: "+223 66 12 34 56",
      specialite: "Pédiatrie & Vaccination",
      medecin: "Dr. Mariam Sidibé",
      date: "12/09/2026",
      heure: "10:15",
      statut: "En cours",
      diagnostic: "Contrôle vaccinal de routine - BCG et Polio",
      constantes: {
        temperature: "37.1°C",
        tension: "100/60 mmHg",
        poids: "12 kg",
      },
    },
    {
      id: "CONS-2026-003",
      patient: "Sekou Koné",
      telephone: "+223 70 98 76 54",
      specialite: "Urgences & Triage",
      medecin: "Dr. Alou Diallo",
      date: "12/09/2026",
      heure: "11:00",
      statut: "En attente",
      diagnostic: "En attente d'évaluation clinique et bilan biologique",
      constantes: {
        temperature: "39.0°C",
        tension: "140/90 mmHg",
        poids: "78 kg",
      },
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterSpecialite, setFilterSpecialite] = useState("Tous");
  const [filterStatut, setFilterStatut] = useState("Tous");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState(null);

  // État du formulaire pour une nouvelle consultation enrichie
  const [newConsultation, setNewConsultation] = useState({
    patient: "",
    telephone: "",
    specialite: "Médecine Générale",
    medecin: "Dr. Ibrahima",
    diagnostic: "",
    temperature: "",
    tension: "",
    poids: "",
  });

  const handleAddConsultation = (e) => {
    e.preventDefault();
    if (!newConsultation.patient) return;

    const consultationObj = {
      id: `CONS-2026-${String(consultations.length + 1).padStart(3, "0")}`,
      patient: newConsultation.patient,
      telephone: newConsultation.telephone || "+223 XX XX XX XX",
      specialite: newConsultation.specialite,
      medecin: newConsultation.medecin,
      date: new Date().toLocaleDateString("fr-FR"),
      heure: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      statut: "En cours",
      diagnostic:
        newConsultation.diagnostic || "En attente de diagnostic approfondi",
      constantes: {
        temperature:
          newConsultation.temperature ?
            `${newConsultation.temperature}°C`
          : "N/C",
        tension: newConsultation.tension || "N/C",
        poids: newConsultation.poids ? `${newConsultation.poids} kg` : "N/C",
      },
    };

    setConsultations([consultationObj, ...consultations]);
    setIsModalOpen(false);
    setSelectedConsultation(consultationObj);
    setDetailsModalOpen(true);

    setNewConsultation({
      patient: "",
      telephone: "",
      specialite: "Médecine Générale",
      medecin: "Dr. Ibrahima",
      diagnostic: "",
      temperature: "",
      tension: "",
      poids: "",
    });
  };

  const handleUpdateStatus = (id, newStatut) => {
    setConsultations(
      consultations.map((cons) =>
        cons.id === id ? { ...cons, statut: newStatut } : cons,
      ),
    );
  };

  // Filtrage multicritères intelligent
  const filteredConsultations = consultations.filter((cons) => {
    const matchesSearch =
      cons.patient.toLowerCase().includes(searchQuery.toLowerCase())
      || cons.id.toLowerCase().includes(searchQuery.toLowerCase())
      || cons.medecin.toLowerCase().includes(searchQuery.toLowerCase())
      || cons.telephone.includes(searchQuery);
    const matchesSpecialite =
      filterSpecialite === "Tous" || cons.specialite === filterSpecialite;
    const matchesStatut =
      filterStatut === "Tous" || cons.statut === filterStatut;

    return matchesSearch && matchesSpecialite && matchesStatut;
  });

  // Indicateurs clés (KPI)
  const totalConsultations = consultations.length;
  const enCoursCount = consultations.filter(
    (c) => c.statut === "En cours",
  ).length;
  const termineesCount = consultations.filter(
    (c) => c.statut === "Terminée",
  ).length;

  return (
    <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4">
      {/* En-tête de la page */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-600 block mb-0.5">
            Suivi Clinique & Dossiers
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight">
            Consultations & Spécialités Médicales
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Gestion centralisée des actes médicaux, des diagnostics cliniques et
            des constantes vitales des patients.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95 shrink-0">
          <Plus size={18} /> Nouvelle Consultation
        </button>
      </div>

      {/* Mini-cartes KPI d'activité */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Total Consultations
              </p>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 mt-1.5 tracking-tight">
                {totalConsultations} Enregistrées
              </h3>
            </div>
            <div className="bg-blue-50 text-blue-600 p-2.5 rounded-xl border border-blue-100">
              <Activity size={20} />
            </div>
          </div>
          <p className="mt-3 text-[11px] sm:text-xs font-semibold text-blue-600 bg-blue-50/60 w-fit px-2.5 py-1 rounded-lg">
            Registre actif du jour
          </p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">
                En Cours / Triage
              </p>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 mt-1.5 tracking-tight">
                {enCoursCount} Actives
              </h3>
            </div>
            <div className="bg-blue-50 text-blue-600 p-2.5 rounded-xl border border-blue-100">
              <Clock size={20} />
            </div>
          </div>
          <p className="mt-3 text-[11px] sm:text-xs font-semibold text-blue-600 bg-blue-50/60 w-fit px-2.5 py-1 rounded-lg">
            Prises en charge immédiates
          </p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Terminées & Prescrites
              </p>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 mt-1.5 tracking-tight">
                {termineesCount} Clôturées
              </h3>
            </div>
            <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-xl border border-emerald-100">
              <CheckCircle2 size={20} />
            </div>
          </div>
          <p className="mt-3 text-[11px] sm:text-xs font-semibold text-emerald-600 bg-emerald-50/60 w-fit px-2.5 py-1 rounded-lg">
            Dossiers validés
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
            placeholder="Rechercher patient, médecin, ID ou téléphone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <select
            value={filterSpecialite}
            onChange={(e) => setFilterSpecialite(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm font-medium rounded-xl px-3 py-2.5 outline-none focus:border-blue-500 transition-colors cursor-pointer w-full">
            <option value="Tous">Toutes les spécialités</option>
            <option value="Médecine Générale">Médecine Générale</option>
            <option value="Pédiatrie & Vaccination">
              Pédiatrie & Vaccination
            </option>
            <option value="Urgences & Triage">Urgences & Triage</option>
            <option value="Maternité & CPN">Maternité & CPN</option>
          </select>

          <select
            value={filterStatut}
            onChange={(e) => setFilterStatut(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm font-medium rounded-xl px-3 py-2.5 outline-none focus:border-blue-500 transition-colors cursor-pointer w-full">
            <option value="Tous">Tous les statuts</option>
            <option value="En cours">En cours</option>
            <option value="En attente">En attente</option>
            <option value="Terminée">Terminée</option>
          </select>
        </div>
      </div>

      {/* Tableau des consultations responsive */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 font-bold text-[10px] sm:text-xs uppercase tracking-wider">
                <th className="py-3.5 px-4 sm:px-6">ID & Patient</th>
                <th className="py-3.5 px-4 sm:px-6">Spécialité</th>
                <th className="py-3.5 px-4 sm:px-6">Médecin Référent</th>
                <th className="py-3.5 px-4 sm:px-6">Diagnostic / Constantes</th>
                <th className="py-3.5 px-4 sm:px-6">Date & Heure</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">
                  Statut / Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {filteredConsultations.length > 0 ?
                filteredConsultations.map((cons) => (
                  <tr
                    key={cons.id}
                    className="hover:bg-slate-50/85 transition-colors">
                    <td className="py-4 px-4 sm:px-6">
                      <p className="font-bold text-slate-800">{cons.patient}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] text-blue-600 font-extrabold">
                          {cons.id}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {cons.telephone}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 font-semibold text-slate-700">
                      <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-[11px] font-semibold rounded-lg inline-block">
                        {cons.specialite}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 font-medium text-slate-700">
                      <div className="flex items-center gap-1.5">
                        <User size={13} className="text-slate-400 shrink-0" />
                        <span>{cons.medecin}</span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 text-xs text-slate-600 max-w-xs">
                      <p className="truncate font-medium text-slate-800">
                        {cons.diagnostic}
                      </p>
                      <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400 font-semibold">
                        <span>T°: {cons.constantes.temperature}</span>
                        <span>•</span>
                        <span>TA: {cons.constantes.tension}</span>
                        <span>•</span>
                        <span>Poids: {cons.constantes.poids}</span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 text-xs text-slate-500">
                      <p className="font-medium text-slate-700">{cons.date}</p>
                      <p className="text-slate-400 text-[11px]">{cons.heure}</p>
                    </td>
                    <td className="px-4 sm:px-6 text-right">
                      <div className="flex flex-col items-end gap-1.5">
                        <span
                          className={`px-2.5 py-0.5 text-[10px] sm:text-xs font-bold rounded-full border inline-flex items-center gap-1 ${
                            cons.statut === "Terminée" ?
                              "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                            : cons.statut === "En cours" ?
                              "bg-blue-50 text-blue-700 border-blue-200/60"
                            : "bg-amber-50 text-amber-700 border-amber-200/60"
                          }`}>
                          {cons.statut === "Terminée" && (
                            <CheckCircle2 size={11} />
                          )}
                          {cons.statut === "En cours" && <Activity size={11} />}
                          {cons.statut === "En attente" && <Clock size={11} />}
                          {cons.statut}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedConsultation(cons);
                              setDetailsModalOpen(true);
                            }}
                            className="text-[11px] text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-0.5 cursor-pointer">
                            <FileText size={12} /> Fiche
                          </button>
                          {cons.statut !== "Terminée" && (
                            <button
                              onClick={() =>
                                handleUpdateStatus(cons.id, "Terminée")
                              }
                              className="text-[11px] text-emerald-600 hover:text-emerald-800 font-semibold flex items-center gap-0.5 cursor-pointer bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                              Clôturer
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
                    Aucune consultation trouvée correspondant aux critères.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* MODALE 1 : Nouvelle Consultation */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
              <h3 className="text-base sm:text-lg font-extrabold text-slate-800 flex items-center gap-2">
                <Stethoscope className="text-blue-600" size={20} /> Nouvelle
                Consultation Clinique
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl bg-slate-100 cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddConsultation} className="space-y-4 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                    Nom du Patient *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Aminata Touré"
                    value={newConsultation.patient}
                    onChange={(e) =>
                      setNewConsultation({
                        ...newConsultation,
                        patient: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                    Téléphone
                  </label>
                  <input
                    type="text"
                    placeholder="+223 XX XX XX XX"
                    value={newConsultation.telephone}
                    onChange={(e) =>
                      setNewConsultation({
                        ...newConsultation,
                        telephone: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                    Spécialité Médicale
                  </label>
                  <select
                    value={newConsultation.specialite}
                    onChange={(e) =>
                      setNewConsultation({
                        ...newConsultation,
                        specialite: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-blue-500 cursor-pointer">
                    <option value="Médecine Générale">Médecine Générale</option>
                    <option value="Pédiatrie & Vaccination">
                      Pédiatrie & Vaccination
                    </option>
                    <option value="Urgences & Triage">Urgences & Triage</option>
                    <option value="Maternité & CPN">Maternité & CPN</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                    Médecin Référent
                  </label>
                  <select
                    value={newConsultation.medecin}
                    onChange={(e) =>
                      setNewConsultation({
                        ...newConsultation,
                        medecin: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-blue-500 cursor-pointer">
                    <option value="Dr. Ibrahima">Dr. Ibrahima</option>
                    <option value="Dr. Mariam Sidibé">Dr. Mariam Sidibé</option>
                    <option value="Dr. Alou Diallo">Dr. Alou Diallo</option>
                  </select>
                </div>
              </div>

              {/* Constantes vitales rapides */}
              <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                    Température (°C)
                  </label>
                  <input
                    type="text"
                    placeholder="37.5"
                    value={newConsultation.temperature}
                    onChange={(e) =>
                      setNewConsultation({
                        ...newConsultation,
                        temperature: e.target.value,
                      })
                    }
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                    Tension (TA)
                  </label>
                  <input
                    type="text"
                    placeholder="120/80"
                    value={newConsultation.tension}
                    onChange={(e) =>
                      setNewConsultation({
                        ...newConsultation,
                        tension: e.target.value,
                      })
                    }
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                    Poids (kg)
                  </label>
                  <input
                    type="text"
                    placeholder="70"
                    value={newConsultation.poids}
                    onChange={(e) =>
                      setNewConsultation({
                        ...newConsultation,
                        poids: e.target.value,
                      })
                    }
                    className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  Diagnostic Préliminaire / Notes cliniques
                </label>
                <textarea
                  rows="3"
                  placeholder="Saisir les observations cliniques et la prescription..."
                  value={newConsultation.diagnostic}
                  onChange={(e) =>
                    setNewConsultation({
                      ...newConsultation,
                      diagnostic: e.target.value,
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-blue-500 resize-none"
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
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer active:scale-95">
                  Enregistrer la consultation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODALE 2 : Fiche détaillée de Consultation & Impression */}
      {detailsModalOpen && selectedConsultation && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-dashed border-slate-200">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                  <FileText size={22} />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-800 text-sm">
                    FICHE DE CONSULTATION MÉDICALE
                  </h4>
                  <p className="text-[10px] text-slate-400">
                    Réf : {selectedConsultation.id}
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
                  Date et Heure :
                </span>
                <span className="font-bold text-slate-800">
                  {selectedConsultation.date} à {selectedConsultation.heure}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-400">Patient :</span>
                <span className="font-bold text-slate-800">
                  {selectedConsultation.patient} (
                  {selectedConsultation.telephone})
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-400">
                  Spécialité :
                </span>
                <span className="font-bold text-blue-600">
                  {selectedConsultation.specialite}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-400">
                  Médecin Référent :
                </span>
                <span className="font-bold text-slate-800">
                  {selectedConsultation.medecin}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <span className="font-bold text-slate-700 block mb-1">
                  Constantes Vitales :
                </span>
                <div className="grid grid-cols-3 gap-2 bg-white p-2.5 rounded-lg border border-slate-200 text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 block">
                      Température
                    </span>
                    <span className="font-bold text-slate-800">
                      {selectedConsultation.constantes.temperature}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">
                      Tension
                    </span>
                    <span className="font-bold text-slate-800">
                      {selectedConsultation.constantes.tension}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">
                      Poids
                    </span>
                    <span className="font-bold text-slate-800">
                      {selectedConsultation.constantes.poids}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200">
                <span className="font-bold text-slate-700 block mb-1">
                  Diagnostic & Prescriptions :
                </span>
                <p className="bg-white p-3 rounded-lg border border-slate-200 text-slate-700 font-medium">
                  {selectedConsultation.diagnostic}
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
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer">
                <Printer size={16} /> Imprimer la Fiche
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
