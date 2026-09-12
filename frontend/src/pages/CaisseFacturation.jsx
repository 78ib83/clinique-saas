// src/pages/CaisseFacturation.jsx
import React, { useState } from "react";
import {
  CreditCard,
  Plus,
  Search,
  Filter,
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  Download,
  X,
  Printer,
  DollarSign,
  Receipt,
  Check,
  Calendar,
  Phone,
  User,
  Tag,
  Percent,
} from "lucide-react";

export default function CaisseFacturation() {
  // Liste initiale des factures / encaissements enrichie
  const [factures, setFactures] = useState([
    {
      id: "FAC-2026-001",
      patient: "Fatoumata Diallo",
      telephone: "+223 76 54 32 10",
      service: "Maternité (CPN)",
      montant: 25000,
      modePaiement: "Assurance (AMO)",
      statut: "Payée",
      date: "12/09/2026",
      remise: 0,
      netAPayer: 25000,
    },
    {
      id: "FAC-2026-002",
      patient: "Moussa Traoré",
      telephone: "+223 66 12 34 56",
      service: "Laboratoire",
      montant: 12500,
      modePaiement: "Espèces",
      statut: "Payée",
      date: "12/09/2026",
      remise: 0,
      netAPayer: 12500,
    },
    {
      id: "FAC-2026-003",
      patient: "Sekou Koné",
      telephone: "+223 70 98 76 54",
      service: "Urgences",
      montant: 45000,
      modePaiement: "Carte Bancaire",
      statut: "En attente",
      date: "11/09/2026",
      remise: 5000,
      netAPayer: 40000,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatut, setFilterStatut] = useState("Tous");
  const [filterService, setFilterService] = useState("Tous");
  const [filterMode, setFilterMode] = useState("Tous");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [selectedFacture, setSelectedFacture] = useState(null);

  // État du formulaire pour une nouvelle facture / encaissement
  const [newFacture, setNewFacture] = useState({
    patient: "",
    telephone: "",
    service: "Médecine Générale",
    montant: "",
    remise: 0,
    modePaiement: "Espèces",
  });

  const handleAddFacture = (e) => {
    e.preventDefault();
    if (!newFacture.patient || !newFacture.montant) return;

    const montantNum = Number(newFacture.montant);
    const remiseNum = Number(newFacture.remise) || 0;
    const netAPayer = Math.max(0, montantNum - remiseNum);

    const factureObj = {
      id: `FAC-2026-${String(factures.length + 1).padStart(3, "0")}`,
      patient: newFacture.patient,
      telephone: newFacture.telephone || "+223 XX XX XX XX",
      service: newFacture.service,
      montant: montantNum,
      remise: remiseNum,
      netAPayer: netAPayer,
      modePaiement: newFacture.modePaiement,
      statut: "Payée",
      date: new Date().toLocaleDateString("fr-FR"),
    };

    setFactures([factureObj, ...factures]);
    setIsModalOpen(false);
    setSelectedFacture(factureObj);
    setReceiptModalOpen(true);

    setNewFacture({
      patient: "",
      telephone: "",
      service: "Médecine Générale",
      montant: "",
      remise: 0,
      modePaiement: "Espèces",
    });
  };

  const handleUpdateStatus = (id, newStatut) => {
    setFactures(
      factures.map((fac) =>
        fac.id === id ? { ...fac, statut: newStatut } : fac,
      ),
    );
  };

  // Filtrage intelligent multicritères (Recherche + Statut + Service + Mode)
  const filteredFactures = factures.filter((fac) => {
    const matchesSearch =
      fac.patient.toLowerCase().includes(searchQuery.toLowerCase())
      || fac.id.toLowerCase().includes(searchQuery.toLowerCase())
      || fac.telephone.includes(searchQuery);
    const matchesStatut =
      filterStatut === "Tous" || fac.statut === filterStatut;
    const matchesService =
      filterService === "Tous" || fac.service === filterService;
    const matchesMode =
      filterMode === "Tous" || fac.modePaiement === filterMode;

    return matchesSearch && matchesStatut && matchesService && matchesMode;
  });

  // Calculs KPI financiers basés sur le net à payer
  const totalEncaisse = factures
    .filter((f) => f.statut === "Payée")
    .reduce((acc, curr) => acc + (curr.netAPayer ?? curr.montant), 0);

  const totalEnAttente = factures
    .filter((f) => f.statut === "En attente")
    .reduce((acc, curr) => acc + (curr.netAPayer ?? curr.montant), 0);

  return (
    <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4">
      {/* En-tête de la page */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-600 block mb-0.5">
            Trésorerie & Encaissements
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight">
            Caisse & Facturation Médicale
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Suivi des encaissements en temps réel, édition de reçus certifiés et
            gestion des règlements patients.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95 shrink-0">
          <Plus size={18} /> Nouvelle Facture / Encaissement
        </button>
      </div>

      {/* Mini-cartes KPI financières */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Total Encaissé (Validé)
              </p>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 mt-1.5 tracking-tight">
                {totalEncaisse.toLocaleString()} FCFA
              </h3>
            </div>
            <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-xl border border-emerald-100">
              <DollarSign size={20} />
            </div>
          </div>
          <p className="mt-3 text-[11px] sm:text-xs font-semibold text-emerald-600 bg-emerald-50/60 w-fit px-2.5 py-1 rounded-lg">
            Règlements sécurisés
          </p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Factures en Attente
              </p>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 mt-1.5 tracking-tight">
                {totalEnAttente.toLocaleString()} FCFA
              </h3>
            </div>
            <div className="bg-amber-50 text-amber-600 p-2.5 rounded-xl border border-amber-100">
              <Clock size={20} />
            </div>
          </div>
          <p className="mt-3 text-[11px] sm:text-xs font-semibold text-amber-600 bg-amber-50/60 w-fit px-2.5 py-1 rounded-lg">
            Paiements non soldés
          </p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Total Transactions
              </p>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 mt-1.5 tracking-tight">
                {factures.length} Factures
              </h3>
            </div>
            <div className="bg-blue-50 text-blue-600 p-2.5 rounded-xl border border-blue-100">
              <CreditCard size={20} />
            </div>
          </div>
          <p className="mt-3 text-[11px] sm:text-xs font-semibold text-blue-600 bg-blue-50/60 w-fit px-2.5 py-1 rounded-lg">
            Registre global actif
          </p>
        </div>
      </div>

      {/* Barre de recherche et filtres multicritères avancés */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
        <div className="relative md:col-span-4">
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Rechercher par patient, ID ou téléphone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {/* Filtre Statut */}
          <select
            value={filterStatut}
            onChange={(e) => setFilterStatut(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm font-medium rounded-xl px-3 py-2.5 outline-none focus:border-blue-500 transition-colors cursor-pointer w-full">
            <option value="Tous">Tous les statuts</option>
            <option value="Payée">Payée</option>
            <option value="En attente">En attente</option>
            <option value="Annulée">Annulée</option>
          </select>

          {/* Filtre Service */}
          <select
            value={filterService}
            onChange={(e) => setFilterService(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm font-medium rounded-xl px-3 py-2.5 outline-none focus:border-blue-500 transition-colors cursor-pointer w-full">
            <option value="Tous">Tous les services</option>
            <option value="Médecine Générale">Médecine Générale</option>
            <option value="Maternité (CPN)">Maternité (CPN)</option>
            <option value="Urgences">Urgences</option>
            <option value="Laboratoire">Laboratoire</option>
            <option value="Imagerie & Radio">Imagerie & Radio</option>
            <option value="Pharmacie">Pharmacie</option>
          </select>

          {/* Filtre Mode de Paiement */}
          <select
            value={filterMode}
            onChange={(e) => setFilterMode(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm font-medium rounded-xl px-3 py-2.5 outline-none focus:border-blue-500 transition-colors cursor-pointer w-full">
            <option value="Tous">Tous les modes</option>
            <option value="Espèces">Espèces</option>
            <option value="Assurance (AMO)">Assurance (AMO)</option>
            <option value="Carte Bancaire">Carte Bancaire</option>
            <option value="Mobile Money">Mobile Money</option>
          </select>
        </div>
      </div>

      {/* Tableau des factures entièrement responsive (Mobile & Desktop) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 font-bold text-[10px] sm:text-xs uppercase tracking-wider">
                <th className="py-3.5 px-4 sm:px-6">N° Facture & Patient</th>
                <th className="py-3.5 px-4 sm:px-6">Service / Prestation</th>
                <th className="py-3.5 px-4 sm:px-6">Montant & Net</th>
                <th className="py-3.5 px-4 sm:px-6">Mode de Paiement</th>
                <th className="py-3.5 px-4 sm:px-6">Date</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">
                  Statut / Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {filteredFactures.length > 0 ?
                filteredFactures.map((fac) => (
                  <tr
                    key={fac.id}
                    className="hover:bg-slate-50/85 transition-colors">
                    <td className="py-4 px-4 sm:px-6">
                      <p className="font-bold text-slate-800">{fac.patient}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] text-blue-600 font-extrabold">
                          {fac.id}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {fac.telephone}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 font-semibold text-slate-700">
                      {fac.service}
                    </td>
                    <td className="px-4 sm:px-6">
                      <p className="font-extrabold text-slate-800">
                        {(fac.netAPayer ?? fac.montant).toLocaleString()} FCFA
                      </p>
                      {fac.remise > 0 && (
                        <p className="text-[10px] text-rose-500 font-medium">
                          Remise : -{fac.remise.toLocaleString()} F
                        </p>
                      )}
                    </td>
                    <td className="px-4 sm:px-6">
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-[11px] font-semibold rounded-lg inline-block">
                        {fac.modePaiement}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 text-xs text-slate-500">
                      {fac.date}
                    </td>
                    <td className="px-4 sm:px-6 text-right">
                      <div className="flex flex-col items-end gap-1.5">
                        <span
                          className={`px-2.5 py-0.5 text-[10px] sm:text-xs font-bold rounded-full border inline-flex items-center gap-1 ${
                            fac.statut === "Payée" ?
                              "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                            : fac.statut === "En attente" ?
                              "bg-amber-50 text-amber-700 border-amber-200/60"
                            : "bg-rose-50 text-rose-700 border-rose-200/60"
                          }`}>
                          {fac.statut === "Payée" && <CheckCircle2 size={11} />}
                          {fac.statut === "En attente" && <Clock size={11} />}
                          {fac.statut}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedFacture(fac);
                              setReceiptModalOpen(true);
                            }}
                            className="text-[11px] text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 cursor-pointer">
                            <Printer size={12} /> Reçu
                          </button>
                          {fac.statut === "En attente" && (
                            <button
                              onClick={() =>
                                handleUpdateStatus(fac.id, "Payée")
                              }
                              className="text-[11px] text-emerald-600 hover:text-emerald-800 font-semibold flex items-center gap-0.5 cursor-pointer bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                              <Check size={11} /> Encaisser
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
                    Aucune facture trouvée correspondant aux critères.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* MODALE 1 : Création / Encaissement de Facture */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-5 sm:p-6 shadow-xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
              <h3 className="text-base sm:text-lg font-extrabold text-slate-800 flex items-center gap-2">
                <CreditCard className="text-blue-600" size={20} /> Nouvelle
                Facture & Encaissement
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl bg-slate-100 cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddFacture} className="space-y-4 pt-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  Nom complet du Patient *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Aminata Touré"
                  value={newFacture.patient}
                  onChange={(e) =>
                    setNewFacture({ ...newFacture, patient: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                    Téléphone du Patient
                  </label>
                  <input
                    type="text"
                    placeholder="+223 XX XX XX XX"
                    value={newFacture.telephone}
                    onChange={(e) =>
                      setNewFacture({
                        ...newFacture,
                        telephone: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                    Service / Prestation *
                  </label>
                  <select
                    value={newFacture.service}
                    onChange={(e) =>
                      setNewFacture({ ...newFacture, service: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-blue-500 cursor-pointer">
                    <option value="Médecine Générale">Médecine Générale</option>
                    <option value="Maternité (CPN)">Maternité (CPN)</option>
                    <option value="Urgences">Urgences</option>
                    <option value="Laboratoire">Laboratoire</option>
                    <option value="Imagerie & Radio">Imagerie & Radio</option>
                    <option value="Pharmacie">Pharmacie</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                    Montant Brut (FCFA) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="Ex: 15000"
                    value={newFacture.montant}
                    onChange={(e) =>
                      setNewFacture({ ...newFacture, montant: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-blue-500 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                    Remise (FCFA)
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={newFacture.remise}
                    onChange={(e) =>
                      setNewFacture({ ...newFacture, remise: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                    Mode de Paiement
                  </label>
                  <select
                    value={newFacture.modePaiement}
                    onChange={(e) =>
                      setNewFacture({
                        ...newFacture,
                        modePaiement: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm outline-none focus:border-blue-500 cursor-pointer">
                    <option value="Espèces">Espèces</option>
                    <option value="Assurance (AMO)">Assurance (AMO)</option>
                    <option value="Carte Bancaire">Carte Bancaire</option>
                    <option value="Mobile Money">Mobile Money</option>
                  </select>
                </div>
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
                  Encaisser & Éditer le Reçu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODALE 2 : Reçu de Caisse / Facture Imprimable */}
      {receiptModalOpen && selectedFacture && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-dashed border-slate-200">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                  <Receipt size={22} />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-800 text-sm">
                    REÇU DE PAIEMENT CLINIQUE
                  </h4>
                  <p className="text-[10px] text-slate-400">
                    Réf : {selectedFacture.id}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setReceiptModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer">
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div className="flex justify-between">
                <span className="font-semibold text-slate-400">
                  Date d'émission :
                </span>
                <span className="font-bold text-slate-800">
                  {selectedFacture.date}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-400">Patient :</span>
                <span className="font-bold text-slate-800">
                  {selectedFacture.patient}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-400">
                  Téléphone :
                </span>
                <span className="font-bold text-slate-800">
                  {selectedFacture.telephone}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-400">
                  Service concerné :
                </span>
                <span className="font-bold text-slate-800">
                  {selectedFacture.service}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-400">
                  Mode de règlement :
                </span>
                <span className="font-bold text-blue-600">
                  {selectedFacture.modePaiement}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-400">
                  Montant Brut :
                </span>
                <span className="font-bold text-slate-800">
                  {selectedFacture.montant.toLocaleString()} FCFA
                </span>
              </div>
              {selectedFacture.remise > 0 && (
                <div className="flex justify-between text-rose-600">
                  <span className="font-semibold">Remise accordée :</span>
                  <span className="font-bold">
                    -{selectedFacture.remise.toLocaleString()} FCFA
                  </span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-slate-200 text-sm">
                <span className="font-extrabold text-slate-800">
                  Net à Payer :
                </span>
                <span className="font-extrabold text-emerald-600">
                  {(
                    selectedFacture.netAPayer ?? selectedFacture.montant
                  ).toLocaleString()}{" "}
                  FCFA
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setReceiptModalOpen(false)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer">
                Fermer
              </button>
              <button
                onClick={() => {
                  window.print();
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer">
                <Printer size={16} /> Imprimer le Reçu
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
