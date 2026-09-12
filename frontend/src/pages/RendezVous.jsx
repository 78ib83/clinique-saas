// src/pages/RendezVous.jsx
import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  Plus,
  Clock,
  User,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Search,
  Filter,
  Phone,
  X,
  CalendarDays,
  FileText,
  Check,
} from "lucide-react";

export default function RendezVous() {
  const [rdvList, setRdvList] = useState([
    {
      id: 1,
      patient: "Fatoumata Diop",
      telephone: "+223 76 54 32 10",
      date: "2026-06-10",
      heure: "09:30",
      medecin: "Dr. Ibrahima",
      motif: "Consultation générale",
      statut: "Confirmé",
      type: "Présentiel",
    },
    {
      id: 2,
      patient: "Oumar Cissé",
      telephone: "+223 66 12 34 56",
      date: "2026-06-10",
      heure: "11:00",
      medecin: "Dr. Mariam Sidibé",
      motif: "Suivi CPN",
      statut: "En attente",
      type: "Présentiel",
    },
    {
      id: 3,
      patient: "Aïssata Traoré",
      telephone: "+223 70 98 76 54",
      date: "2026-06-11",
      heure: "14:15",
      medecin: "Dr. Alou Diallo",
      motif: "Pédiatrie - Contrôle",
      statut: "Confirmé",
      type: "Urgence mineure",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatut, setFilterStatut] = useState("Tous");
  const [filterMedecin, setFilterMedecin] = useState("Tous");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // État du formulaire de planification de nouveau RDV
  const [newRdv, setNewRdv] = useState({
    patient: "",
    telephone: "",
    date: new Date().toISOString().split("T")[0],
    heure: "09:00",
    medecin: "Dr. Ibrahima",
    motif: "Consultation générale",
    type: "Présentiel",
    statut: "Confirmé",
  });

  const handleAddRdv = (e) => {
    e.preventDefault();
    if (!newRdv.patient || !newRdv.telephone) return;

    const rdvToAdd = {
      id: rdvList.length + 1,
      ...newRdv,
    };

    setRdvList([rdvToAdd, ...rdvList]);
    setIsModalOpen(false);
    setNewRdv({
      patient: "",
      telephone: "",
      date: new Date().toISOString().split("T")[0],
      heure: "09:00",
      medecin: "Dr. Ibrahima",
      motif: "Consultation générale",
      type: "Présentiel",
      statut: "Confirmé",
    });
  };

  const handleUpdateStatus = (id, newStatut) => {
    setRdvList(
      rdvList.map((rdv) =>
        rdv.id === id ? { ...rdv, statut: newStatut } : rdv,
      ),
    );
  };

  // Filtrage intelligent des rendez-vous
  const filteredRdv = rdvList.filter((rdv) => {
    const matchesSearch =
      rdv.patient.toLowerCase().includes(searchQuery.toLowerCase())
      || rdv.motif.toLowerCase().includes(searchQuery.toLowerCase())
      || rdv.telephone.includes(searchQuery);
    const matchesStatut =
      filterStatut === "Tous" || rdv.statut === filterStatut;
    const matchesMedecin =
      filterMedecin === "Tous" || rdv.medecin === filterMedecin;

    return matchesSearch && matchesStatut && matchesMedecin;
  });

  return (
    <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4">
      {/* En-tête élégant et responsive */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-600 block mb-0.5">
            Gestion du Planning & Agenda
          </span>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-800 tracking-tight">
            Prise de Rendez-vous & Suivi des Consultations
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Planifiez, filtrez et suivez l'agenda médical de la clinique en
            temps réel.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95 shrink-0">
          <Plus size={18} /> Nouveau rendez-vous
        </button>
      </div>

      {/* Barre de recherche et filtres multicritères */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        <div className="relative md:col-span-5">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Rechercher par patient, motif ou téléphone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {/* Filtre par Statut */}
          <select
            value={filterStatut}
            onChange={(e) => setFilterStatut(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm font-medium rounded-xl px-3 py-2.5 outline-none focus:border-blue-500 transition-colors cursor-pointer w-full">
            <option value="Tous">Tous les statuts</option>
            <option value="Confirmé">Confirmé</option>
            <option value="En attente">En attente</option>
            <option value="Annulé">Annulé</option>
            <option value="Terminé">Terminé</option>
          </select>

          {/* Filtre par Médecin */}
          <select
            value={filterMedecin}
            onChange={(e) => setFilterMedecin(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm font-medium rounded-xl px-3 py-2.5 outline-none focus:border-blue-500 transition-colors cursor-pointer w-full">
            <option value="Tous">Tous les médecins</option>
            <option value="Dr. Ibrahima">Dr. Ibrahima</option>
            <option value="Dr. Mariam Sidibé">Dr. Mariam Sidibé</option>
            <option value="Dr. Alou Diallo">Dr. Alou Diallo</option>
          </select>
        </div>
      </div>

      {/* Liste des Rendez-vous sous forme de cartes élégantes */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="font-bold text-slate-800 flex items-center gap-2 text-xs sm:text-sm">
            <CalendarIcon size={18} className="text-blue-600" /> Agenda Général
            & Consultations
          </h3>
          <span className="text-[11px] sm:text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-lg">
            {filteredRdv.length} rendez-vous affichés
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredRdv.length > 0 ?
            filteredRdv.map((rdv) => (
              <div
                key={rdv.id}
                className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 font-bold text-sm sm:text-base border border-blue-100/60 shadow-xs">
                    <Clock size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-extrabold text-slate-800 text-sm sm:text-base">
                        {rdv.patient}
                      </h4>
                      <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                        {rdv.type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                        {rdv.motif}
                      </span>
                      <span>•</span>
                      <span className="text-blue-600 font-semibold">
                        {rdv.medecin}
                      </span>
                    </p>
                    <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                      <Phone size={12} /> {rdv.telephone}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                  <div className="text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200/60 px-3 py-2 rounded-xl flex items-center gap-1.5 shadow-xs">
                    <CalendarDays size={14} className="text-blue-600" />
                    {rdv.date} à{" "}
                    <span className="text-blue-600">{rdv.heure}</span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
                    {/* Badge de Statut */}
                    <span
                      className={`px-3 py-1.5 text-xs font-bold rounded-xl border flex items-center gap-1.5 ${
                        rdv.statut === "Confirmé" ?
                          "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                        : rdv.statut === "En attente" ?
                          "bg-amber-50 text-amber-700 border-amber-200/60"
                        : rdv.statut === "Terminé" ?
                          "bg-blue-50 text-blue-700 border-blue-200/60"
                        : "bg-rose-50 text-rose-700 border-rose-200/60"
                      }`}>
                      {rdv.statut === "Confirmé" && <CheckCircle2 size={13} />}
                      {rdv.statut === "En attente" && <AlertCircle size={13} />}
                      {rdv.statut === "Annulé" && <XCircle size={13} />}
                      {rdv.statut === "Terminé" && <Check size={13} />}
                      {rdv.statut}
                    </span>

                    {/* Menu rapide de modification de statut */}
                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                      {rdv.statut !== "Confirmé" && (
                        <button
                          onClick={() => handleUpdateStatus(rdv.id, "Confirmé")}
                          title="Confirmer"
                          className="p-1.5 bg-white text-emerald-600 hover:bg-emerald-50 rounded-lg shadow-xs text-xs font-bold cursor-pointer transition-all">
                          <Check size={14} />
                        </button>
                      )}
                      {rdv.statut !== "Terminé" && (
                        <button
                          onClick={() => handleUpdateStatus(rdv.id, "Terminé")}
                          title="Marquer comme terminé"
                          className="p-1.5 bg-white text-blue-600 hover:bg-blue-50 rounded-lg shadow-xs text-xs font-bold cursor-pointer transition-all">
                          <CheckCircle2 size={14} />
                        </button>
                      )}
                      {rdv.statut !== "Annulé" && (
                        <button
                          onClick={() => handleUpdateStatus(rdv.id, "Annulé")}
                          title="Annuler"
                          className="p-1.5 bg-white text-rose-600 hover:bg-rose-50 rounded-lg shadow-xs text-xs font-bold cursor-pointer transition-all">
                          <XCircle size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          : <div className="py-12 text-center text-slate-400 text-sm">
              Aucun rendez-vous trouvé correspondant à vos critères de
              recherche.
            </div>
          }
        </div>
      </div>

      {/* MODALE : Formulaire de Nouveau Rendez-vous */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
              <h3 className="text-base sm:text-lg font-extrabold text-slate-800 flex items-center gap-2">
                <CalendarDays className="text-blue-600" size={20} /> Planifier
                un Nouveau Rendez-vous
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl bg-slate-100 cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddRdv} className="space-y-4 pt-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  Nom complet du Patient *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Aminata Konaté"
                  value={newRdv.patient}
                  onChange={(e) =>
                    setNewRdv({ ...newRdv, patient: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                    Téléphone *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="+223 XX XX XX XX"
                    value={newRdv.telephone}
                    onChange={(e) =>
                      setNewRdv({ ...newRdv, telephone: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                    Type de Consultation
                  </label>
                  <select
                    value={newRdv.type}
                    onChange={(e) =>
                      setNewRdv({ ...newRdv, type: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-blue-500 cursor-pointer">
                    <option value="Présentiel">Présentiel</option>
                    <option value="Urgence mineure">Urgence mineure</option>
                    <option value="Suivi / Contrôle">Suivi / Contrôle</option>
                    <option value="Téléconsultation">Téléconsultation</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                    Date du Rendez-vous *
                  </label>
                  <input
                    type="date"
                    required
                    value={newRdv.date}
                    onChange={(e) =>
                      setNewRdv({ ...newRdv, date: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                    Heure *
                  </label>
                  <input
                    type="time"
                    required
                    value={newRdv.heure}
                    onChange={(e) =>
                      setNewRdv({ ...newRdv, heure: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                    Médecin Attitré
                  </label>
                  <select
                    value={newRdv.medecin}
                    onChange={(e) =>
                      setNewRdv({ ...newRdv, medecin: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-blue-500 cursor-pointer">
                    <option value="Dr. Ibrahima">Dr. Ibrahima</option>
                    <option value="Dr. Mariam Sidibé">Dr. Mariam Sidibé</option>
                    <option value="Dr. Alou Diallo">Dr. Alou Diallo</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                    Statut initial
                  </label>
                  <select
                    value={newRdv.statut}
                    onChange={(e) =>
                      setNewRdv({ ...newRdv, statut: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-blue-500 cursor-pointer">
                    <option value="Confirmé">Confirmé</option>
                    <option value="En attente">En attente</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  Motif de la Consultation *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Consultation générale, Paludisme, CPN..."
                  value={newRdv.motif}
                  onChange={(e) =>
                    setNewRdv({ ...newRdv, motif: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-blue-500"
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
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer active:scale-95 flex items-center gap-2">
                  <Plus size={16} /> Enregistrer le rendez-vous
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
