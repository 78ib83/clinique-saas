// src/pages/Admissions.jsx
import React, { useState } from "react";
import {
  UserPlus,
  Search,
  Filter,
  Phone,
  MapPin,
  X,
  Ticket,
  ShieldCheck,
  CreditCard,
  Printer,
  Baby,
  User,
} from "lucide-react";
import { initialPatientsList } from "../services/api";

export default function Admissions() {
  const [patients, setPatients] = useState(initialPatientsList);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterService, setFilterService] = useState("Tous");
  const [filterTypeAdmission, setFilterTypeAdmission] = useState("Tous");
  const [filterTrancheAge, setFilterTrancheAge] = useState("Tous");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [selectedPatientForTicket, setSelectedPatientForTicket] =
    useState(null);

  // État enrichi du formulaire d'admission avec distinction Enfant/Adulte et choix manuel possible
  const [newPatient, setNewPatient] = useState({
    nom: "",
    age: "",
    trancheAge: "Adulte", // Modifiable manuellement ou automatiquement via l'âge
    sexe: "Masculin",
    telephone: "",
    adresse: "",
    typeAdmission: "Consultation Externe",
    service: "Médecine Générale",
    medecin: "Dr. Ibrahima",
    assurance: "Privé (Cash)",
    numeroAssure: "",
    typeTicket: "Consultation Générale",
    montantTicket: 5000,
    modePaiement: "Espèces",
    tuteurNom: "",
    antecedents: "",
  });

  // Gestion intelligente de l'âge : pré-sélectionne la catégorie mais permet de la modifier manuellement
  const handleAgeChange = (val) => {
    const numAge = Number(val);
    let tranche = newPatient.trancheAge;
    let serviceSuggere = newPatient.service;

    if (val !== "" && !isNaN(numAge)) {
      if (numAge < 18) {
        tranche = "Enfant";
        if (serviceSuggere === "Médecine Générale") {
          serviceSuggere = "Pédiatrie";
        }
      } else {
        tranche = "Adulte";
      }
    }

    setNewPatient({
      ...newPatient,
      age: val,
      trancheAge: tranche,
      service: serviceSuggere,
    });
  };

  // Permet de changer manuellement la catégorie (Adulte / Enfant) via le sélecteur
  const handleTrancheAgeChange = (val) => {
    let serviceSuggere = newPatient.service;
    let typeTkt = newPatient.typeTicket;
    let montant = newPatient.montantTicket;

    if (val === "Enfant") {
      if (serviceSuggere === "Médecine Générale") serviceSuggere = "Pédiatrie";
      if (typeTkt === "Consultation Générale") {
        typeTkt = "Consultation Pédiatrique";
        montant = 4000;
      }
    } else {
      if (serviceSuggere === "Pédiatrie") serviceSuggere = "Médecine Générale";
      if (typeTkt === "Consultation Pédiatrique") {
        typeTkt = "Consultation Générale";
        montant = 5000;
      }
    }

    setNewPatient({
      ...newPatient,
      trancheAge: val,
      service: serviceSuggere,
      typeTicket: typeTkt,
      montantTicket: montant,
    });
  };

  const handleServiceOrTicketChange = (field, value) => {
    let updatedState = { ...newPatient, [field]: value };

    if (field === "typeTicket") {
      let prix = 5000;
      if (value === "Consultation Spécialisée") prix = 10000;
      else if (value === "Urgence / Triage") prix = 7500;
      else if (value === "Bilan Laboratoire Standard") prix = 15000;
      else if (value === "Imagerie / Échographie") prix = 20000;
      else if (value === "Visite Maternité / CPN") prix = 6000;
      else if (value === "Consultation Pédiatrique") prix = 4000;
      updatedState.montantTicket = prix;
    }

    setNewPatient(updatedState);
  };

  const handleAddPatient = (e) => {
    e.preventDefault();
    if (!newPatient.nom || !newPatient.telephone) return;

    const patientToAdd = {
      id: `PAT-2026-${String(patients.length + 1).padStart(3, "0")}`,
      ...newPatient,
      age: Number(newPatient.age) || 30,
      dateAdmission: new Date().toLocaleDateString("fr-FR"),
      heure: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      statut: "En attente",
      ticketVendu: true,
      referenceTicket: `TKT-${Math.floor(100000 + Math.random() * 900000)}`,
    };

    setPatients([patientToAdd, ...patients]);
    setIsModalOpen(false);
    setSelectedPatientForTicket(patientToAdd);
    setTicketModalOpen(true);

    setNewPatient({
      nom: "",
      age: "",
      trancheAge: "Adulte",
      sexe: "Masculin",
      telephone: "",
      adresse: "",
      typeAdmission: "Consultation Externe",
      service: "Médecine Générale",
      medecin: "Dr. Ibrahima",
      assurance: "Privé (Cash)",
      numeroAssure: "",
      typeTicket: "Consultation Générale",
      montantTicket: 5000,
      modePaiement: "Espèces",
      tuteurNom: "",
      antecedents: "",
    });
  };

  const filteredPatients = patients.filter((pat) => {
    const matchesSearch =
      pat.nom?.toLowerCase().includes(searchQuery.toLowerCase())
      || pat.id?.toLowerCase().includes(searchQuery.toLowerCase())
      || pat.telephone?.includes(searchQuery);
    const matchesService =
      filterService === "Tous" || pat.service === filterService;
    const matchesType =
      filterTypeAdmission === "Tous"
      || pat.typeAdmission === filterTypeAdmission;
    const matchesTranche =
      filterTrancheAge === "Tous" || pat.trancheAge === filterTrancheAge;
    return matchesSearch && matchesService && matchesType && matchesTranche;
  });

  return (
    <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4">
      {/* En-tête de la page */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-600 block mb-0.5">
            Accueil & Guichet Unique
          </span>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-800 tracking-tight">
            Registre des Admissions & Vente de Tickets
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Gestion complète du parcours patient (Adultes & Enfants),
            billetterie et files d'attente.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95 shrink-0">
          <UserPlus size={18} /> Nouvelle Admission & Ticket
        </button>
      </div>

      {/* Barre de recherche et filtres multicritères corrigée (grille fluide au lieu de flex-wrap cassé) */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        <div className="relative md:col-span-4">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Rechercher par nom, ID ou tél..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {/* Filtre Adulte / Enfant */}
          <select
            value={filterTrancheAge}
            onChange={(e) => setFilterTrancheAge(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm font-medium rounded-xl px-3 py-2.5 outline-none focus:border-blue-500 transition-colors cursor-pointer w-full">
            <option value="Tous">Toutes les catégories</option>
            <option value="Adulte">Adultes uniquement</option>
            <option value="Enfant">Enfants uniquement</option>
          </select>

          {/* Filtre Type d'Admission */}
          <select
            value={filterTypeAdmission}
            onChange={(e) => setFilterTypeAdmission(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm font-medium rounded-xl px-3 py-2.5 outline-none focus:border-blue-500 transition-colors cursor-pointer w-full">
            <option value="Tous">Tous les types</option>
            <option value="Consultation Externe">Consultation Externe</option>
            <option value="Urgence">Urgence</option>
            <option value="Hospitalisation">Hospitalisation</option>
            <option value="Maternité (CPN)">Maternité (CPN)</option>
          </select>

          {/* Filtre Service */}
          <select
            value={filterService}
            onChange={(e) => setFilterService(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm font-medium rounded-xl px-3 py-2.5 outline-none focus:border-blue-500 transition-colors cursor-pointer w-full">
            <option value="Tous">Tous les services</option>
            <option value="Médecine Générale">Médecine Générale</option>
            <option value="Pédiatrie">Pédiatrie</option>
            <option value="Maternité (CPN)">Maternité (CPN)</option>
            <option value="Urgences & Triage">Urgences & Triage</option>
            <option value="Laboratoire & Examens">Laboratoire & Examens</option>
          </select>
        </div>
      </div>

      {/* Tableau interactif complet */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 font-bold text-[10px] sm:text-xs uppercase tracking-wider">
                <th className="py-3.5 px-4 sm:px-6">Patient & ID</th>
                <th className="py-3.5 px-4 sm:px-6">Profil (Adulte/Enfant)</th>
                <th className="py-3.5 px-4 sm:px-6">Contact & Adresse</th>
                <th className="py-3.5 px-4 sm:px-6">Ticket & Caisse</th>
                <th className="py-3.5 px-4 sm:px-6">Service & Médecin</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">
                  Statut / Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {filteredPatients.length > 0 ?
                filteredPatients.map((pat) => (
                  <tr
                    key={pat.id}
                    className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-4 sm:px-6">
                      <p className="font-bold text-slate-800">{pat.nom}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[11px] text-blue-600 font-extrabold">
                          {pat.id}
                        </span>
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-medium">
                          {pat.typeAdmission || "Externe"}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6">
                      <div className="flex items-center gap-1.5">
                        {pat.trancheAge === "Enfant" ?
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200/60">
                            <Baby size={13} /> Enfant ({pat.age} ans)
                          </span>
                        : <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/60">
                            <User size={13} /> Adulte ({pat.age} ans)
                          </span>
                        }
                      </div>
                      {pat.trancheAge === "Enfant" && pat.tuteurNom && (
                        <p className="text-[10px] text-slate-400 mt-1">
                          Tuteur :{" "}
                          <span className="font-medium text-slate-600">
                            {pat.tuteurNom}
                          </span>
                        </p>
                      )}
                    </td>
                    <td className="px-4 sm:px-6">
                      <p className="flex items-center gap-1.5 text-xs text-slate-700 font-medium">
                        <Phone size={13} className="text-slate-400 shrink-0" />{" "}
                        {pat.telephone}
                      </p>
                      <p className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
                        <MapPin size={13} className="shrink-0" />{" "}
                        {pat.adresse || "Bamako"}
                      </p>
                    </td>
                    <td className="px-4 sm:px-6">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                        <Ticket size={14} className="text-blue-600" />
                        {pat.typeTicket || "Consultation"}
                      </div>
                      <p className="text-[11px] font-semibold text-emerald-600 mt-0.5">
                        {pat.montantTicket ?
                          `${pat.montantTicket.toLocaleString()} FCFA`
                        : "5 000 FCFA"}
                      </p>
                    </td>
                    <td className="px-4 sm:px-6">
                      <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-[11px] font-semibold rounded-lg inline-block mb-1">
                        {pat.service}
                      </span>
                      <p className="text-[11px] text-slate-500 font-medium">
                        {pat.medecin}
                      </p>
                    </td>
                    <td className="px-4 sm:px-6 text-right">
                      <div className="flex flex-col items-end gap-1.5">
                        <span
                          className={`px-2.5 py-0.5 text-[10px] sm:text-xs font-bold rounded-full border ${
                            pat.statut === "Consulté" ?
                              "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                            : pat.statut === "En cours" ?
                              "bg-blue-50 text-blue-700 border-blue-200/60"
                            : "bg-amber-50 text-amber-700 border-amber-200/60"
                          }`}>
                          {pat.statut || "En attente"}
                        </span>
                        <button
                          onClick={() => {
                            setSelectedPatientForTicket(pat);
                            setTicketModalOpen(true);
                          }}
                          className="text-[11px] text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 cursor-pointer">
                          <Printer size={12} /> Voir Ticket
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              : <tr>
                  <td
                    colSpan="6"
                    className="py-12 text-center text-slate-400 text-sm">
                    Aucun patient enregistré ou trouvé pour ces critères.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* MODALE 1 : Enregistrement complet avec sélecteur interactif modifiable */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-5 sm:p-6 shadow-xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
              <h3 className="text-base sm:text-lg font-extrabold text-slate-800 flex items-center gap-2">
                <UserPlus className="text-blue-600" size={20} /> Nouvelle
                Admission & Vente de Ticket
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl bg-slate-100 cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={handleAddPatient}
              className="space-y-4 pt-4 max-h-[75vh] overflow-y-auto pr-1">
              {/* Informations Personnelles & Sélecteur Catégorie Modifiable */}
              <div>
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
                  1. État Civil, Catégorie (Enfant / Adulte) & Contact
                </p>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                        Nom complet du Patient *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Fatoumata Diarra ou petit Moussa"
                        value={newPatient.nom}
                        onChange={(e) =>
                          setNewPatient({ ...newPatient, nom: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                        Catégorie *
                      </label>
                      <select
                        value={newPatient.trancheAge}
                        onChange={(e) => handleTrancheAgeChange(e.target.value)}
                        className="w-full px-3 py-2.5 bg-blue-50/70 border border-blue-200 rounded-xl text-xs sm:text-sm font-bold text-blue-800 outline-none focus:border-blue-500 cursor-pointer">
                        <option value="Adulte">👤 Adulte</option>
                        <option value="Enfant">👶 Enfant (&lt;18 ans)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                        Âge exact *
                      </label>
                      <input
                        type="number"
                        required
                        placeholder="Ex: 5 ou 34"
                        value={newPatient.age}
                        onChange={(e) => handleAgeChange(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                        Sexe *
                      </label>
                      <select
                        value={newPatient.sexe}
                        onChange={(e) =>
                          setNewPatient({ ...newPatient, sexe: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-blue-500 cursor-pointer">
                        <option value="Masculin">Masculin</option>
                        <option value="Féminin">Féminin</option>
                      </select>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                        Téléphone (Parent/Patient) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="+223 XX XX XX XX"
                        value={newPatient.telephone}
                        onChange={(e) =>
                          setNewPatient({
                            ...newPatient,
                            telephone: e.target.value,
                          })
                        }
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Champ conditionnel si c'est un enfant */}
                  {newPatient.trancheAge === "Enfant" && (
                    <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/60">
                      <label className="block text-[11px] font-bold text-amber-800 uppercase mb-1">
                        Nom du Tuteur / Parent responsable (Obligatoire pour
                        mineur)
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: M. Oumar Diarra (Père)"
                        value={newPatient.tuteurNom}
                        onChange={(e) =>
                          setNewPatient({
                            ...newPatient,
                            tuteurNom: e.target.value,
                          })
                        }
                        className="w-full px-3.5 py-2 bg-white border border-amber-200 rounded-xl text-xs sm:text-sm outline-none"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                      Adresse / Quartier
                    </label>
                    <input
                      type="text"
                      placeholder="Quartier ou Ville"
                      value={newPatient.adresse}
                      onChange={(e) =>
                        setNewPatient({
                          ...newPatient,
                          adresse: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Critères Cliniques & Orientation */}
              <div className="pt-2 border-t border-slate-100">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">
                  2. Orientation Médicale & Type d'Admission
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                      Type d'Admission
                    </label>
                    <select
                      value={newPatient.typeAdmission}
                      onChange={(e) =>
                        setNewPatient({
                          ...newPatient,
                          typeAdmission: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-blue-500 cursor-pointer">
                      <option value="Consultation Externe">
                        Consultation Externe
                      </option>
                      <option value="Urgence">Urgence</option>
                      <option value="Hospitalisation">Hospitalisation</option>
                      <option value="Maternité (CPN)">Maternité (CPN)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                      Département / Service
                    </label>
                    <select
                      value={newPatient.service}
                      onChange={(e) =>
                        setNewPatient({
                          ...newPatient,
                          service: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-blue-500 cursor-pointer">
                      <option value="Médecine Générale">
                        Médecine Générale
                      </option>
                      <option value="Pédiatrie">Pédiatrie</option>
                      <option value="Maternité (CPN)">Maternité (CPN)</option>
                      <option value="Urgences & Triage">
                        Urgences & Triage
                      </option>
                      <option value="Laboratoire & Examens">
                        Laboratoire & Examens
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                      Médecin Référent Attitré
                    </label>
                    <select
                      value={newPatient.medecin}
                      onChange={(e) =>
                        setNewPatient({
                          ...newPatient,
                          medecin: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-blue-500 cursor-pointer">
                      <option value="Dr. Ibrahima">Dr. Ibrahima</option>
                      <option value="Dr. Mariam Sidibé">
                        Dr. Mariam Sidibé
                      </option>
                      <option value="Dr. Alou Diallo">Dr. Alou Diallo</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                      Couverture Assurance / Tiers-Payant
                    </label>
                    <select
                      value={newPatient.assurance}
                      onChange={(e) =>
                        setNewPatient({
                          ...newPatient,
                          assurance: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-blue-500 cursor-pointer">
                      <option value="Privé (Cash)">
                        Privé (Cash / Direct)
                      </option>
                      <option value="AMO">
                        AMO (Assurance Maladie Obligatoire)
                      </option>
                      <option value="INPS">INPS</option>
                      <option value="Saham / Sanlam Assurance">
                        Assurance Privée
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Billetterie et Encaissement */}
              <div className="pt-2 border-t border-slate-100 bg-blue-50/50 p-3.5 rounded-xl border border-blue-100">
                <p className="text-xs font-bold text-blue-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Ticket size={14} /> 3. Billetterie Médicale & Caisse
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                      Type de Ticket / Prestation
                    </label>
                    <select
                      value={newPatient.typeTicket}
                      onChange={(e) =>
                        handleServiceOrTicketChange(
                          "typeTicket",
                          e.target.value,
                        )
                      }
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-blue-500 cursor-pointer font-semibold">
                      <option value="Consultation Générale">
                        Consultation Générale (5 000F)
                      </option>
                      <option value="Consultation Pédiatrique">
                        Consultation Pédiatrique (4 000F)
                      </option>
                      <option value="Consultation Spécialisée">
                        Consultation Spécialisée (10 000F)
                      </option>
                      <option value="Urgence / Triage">
                        Urgence & Triage (7 500F)
                      </option>
                      <option value="Bilan Laboratoire Standard">
                        Bilan Laboratoire (15 000F)
                      </option>
                      <option value="Imagerie / Échographie">
                        Imagerie & Écho (20 000F)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                      Montant (FCFA)
                    </label>
                    <input
                      type="number"
                      value={newPatient.montantTicket}
                      onChange={(e) =>
                        setNewPatient({
                          ...newPatient,
                          montantTicket: Number(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-blue-600 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                      Mode de Règlement
                    </label>
                    <select
                      value={newPatient.modePaiement}
                      onChange={(e) =>
                        setNewPatient({
                          ...newPatient,
                          modePaiement: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-blue-500 cursor-pointer">
                      <option value="Espèces">Espèces (Caisse)</option>
                      <option value="Orange Money / Moov">Mobile Money</option>
                      <option value="Carte Bancaire">
                        Carte Bancaire (TPE)
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Boutons d'action */}
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
                  <CreditCard size={16} /> Valider l'admission & Imprimer le
                  ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODALE 2 : Reçu / Ticket de Caisse imprimable */}
      {ticketModalOpen && selectedPatientForTicket && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-dashed border-slate-200">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                  <Ticket size={22} />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-800 text-sm">
                    TICKET DE CAISSE CLINIQUE
                  </h4>
                  <p className="text-[10px] text-slate-400">
                    Réf :{" "}
                    {selectedPatientForTicket.referenceTicket || "TKT-984201"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setTicketModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex justify-between">
                <span className="font-semibold text-slate-400">
                  Date & Heure :
                </span>
                <span className="font-bold text-slate-800">
                  {selectedPatientForTicket.dateAdmission || "12/09/2026"} -{" "}
                  {selectedPatientForTicket.heure || "14:00"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-400">Patient :</span>
                <span className="font-bold text-slate-800">
                  {selectedPatientForTicket.nom} (
                  {selectedPatientForTicket.trancheAge},{" "}
                  {selectedPatientForTicket.age} ans)
                </span>
              </div>
              {selectedPatientForTicket.trancheAge === "Enfant"
                && selectedPatientForTicket.tuteurNom && (
                  <div className="flex justify-between">
                    <span className="font-semibold text-slate-400">
                      Tuteur :
                    </span>
                    <span className="font-bold text-slate-800">
                      {selectedPatientForTicket.tuteurNom}
                    </span>
                  </div>
                )}
              <div className="flex justify-between">
                <span className="font-semibold text-slate-400">
                  ID Dossier :
                </span>
                <span className="font-bold text-blue-600">
                  {selectedPatientForTicket.id}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-400">Service :</span>
                <span className="font-bold text-slate-800">
                  {selectedPatientForTicket.service}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-400">Médecin :</span>
                <span className="font-bold text-slate-800">
                  {selectedPatientForTicket.medecin}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-400">
                  Prestation / Ticket :
                </span>
                <span className="font-bold text-slate-800">
                  {selectedPatientForTicket.typeTicket
                    || "Consultation Générale"}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 text-sm">
                <span className="font-extrabold text-slate-800">
                  Montant Payé :
                </span>
                <span className="font-extrabold text-emerald-600">
                  {selectedPatientForTicket.montantTicket ?
                    `${selectedPatientForTicket.montantTicket.toLocaleString()} FCFA`
                  : "5 000 FCFA"}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setTicketModalOpen(false)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer">
                Fermer
              </button>
              <button
                onClick={() => {
                  window.print();
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer">
                <Printer size={16} /> Imprimer le Ticket
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
