// src/pages/ComptabiliteRapports.jsx
import React, { useState } from "react";
import {
  BarChart3,
  Download,
  Calendar,
  TrendingUp,
  DollarSign,
  FileSpreadsheet,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
} from "lucide-react";

export default function ComptabiliteRapports() {
  const [periode, setPeriode] = useState("Ce mois");

  // Données financières simulées
  const statsFinancieres = {
    recettesTotales: "4 850 000 FCFA",
    depensesTotales: "1 920 000 FCFA",
    beneficeNet: "2 930 000 FCFA",
    totalPatients: "412 patients",
  };

  const [transactionsRecentes, setTransactionsRecentes] = useState([
    {
      id: "TRX-104",
      date: "12/09/2026",
      type: "Recette",
      libelle: "Consultations & Actes Médicaux (Journée)",
      montant: "+ 185 000 FCFA",
      categorie: "Soins & Prestations",
    },
    {
      id: "TRX-103",
      date: "11/09/2026",
      type: "Recette",
      libelle: "Règlement Tiers-Payant AMO",
      montant: "+ 650 000 FCFA",
      categorie: "Assurances",
    },
    {
      id: "TRX-102",
      date: "10/09/2026",
      type: "Dépense",
      libelle: "Achat consommables laboratoire & pharmacie",
      montant: "- 320 000 FCFA",
      categorie: "Approvisionnement",
    },
    {
      id: "TRX-101",
      date: "09/09/2026",
      type: "Dépense",
      libelle: "Maintenance équipements biomédicaux",
      montant: "- 150 000 FCFA",
      categorie: "Maintenance",
    },
  ]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* En-tête de la page */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <BarChart3 className="text-emerald-600" size={22} /> Comptabilité &
            Rapports
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Suivi des flux financiers, analyse des recettes, des dépenses et
            génération des rapports comptables.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={periode}
            onChange={(e) => setPeriode(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 transition-colors cursor-pointer">
            <option value="Aujourd'hui">Aujourd'hui</option>
            <option value="Cette semaine">Cette semaine</option>
            <option value="Ce mois">Ce mois</option>
            <option value="Cette année">Cette année</option>
          </select>
          <button
            onClick={() =>
              alert("Exportation du rapport comptable en cours...")
            }
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-xs flex items-center gap-2 cursor-pointer">
            <Download size={18} /> Exporter Bilan
          </button>
        </div>
      </div>

      {/* Cartes de Synthèse Financière */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">
              Recettes Totales
            </span>
            <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <ArrowUpRight size={18} />
            </span>
          </div>
          <p className="text-2xl font-bold text-slate-800">
            {statsFinancieres.recettesTotales}
          </p>
          <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
            +12% par rapport au mois dernier
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">
              Dépenses Totales
            </span>
            <span className="p-2 bg-rose-50 text-rose-600 rounded-xl">
              <ArrowDownRight size={18} />
            </span>
          </div>
          <p className="text-2xl font-bold text-slate-800">
            {statsFinancieres.depensesTotales}
          </p>
          <span className="text-xs text-rose-500 font-semibold flex items-center gap-1">
            -4% d'optimisation des coûts
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">
              Bénéfice Net
            </span>
            <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <TrendingUp size={18} />
            </span>
          </div>
          <p className="text-2xl font-bold text-slate-800">
            {statsFinancieres.beneficeNet}
          </p>
          <span className="text-xs text-indigo-600 font-semibold flex items-center gap-1">
            Marge saine et stable
          </span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">
              Patients Enregistrés
            </span>
            <span className="p-2 bg-cyan-50 text-cyan-600 rounded-xl">
              <FileSpreadsheet size={18} />
            </span>
          </div>
          <p className="text-2xl font-bold text-slate-800">
            {statsFinancieres.totalPatients}
          </p>
          <span className="text-xs text-cyan-600 font-semibold flex items-center gap-1">
            Flux constant de fréquentation
          </span>
        </div>
      </div>

      {/* Section des transactions récentes */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-800">
            Journal des Dernières Transactions
          </h3>
          <span className="text-xs text-slate-400 uppercase font-semibold">
            Mise à jour en temps réel
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 font-semibold text-xs uppercase tracking-wider">
                <th className="py-3.5 px-6">ID & Date</th>
                <th className="py-3.5 px-6">Type</th>
                <th className="py-3.5 px-6">Libellé / Description</th>
                <th className="py-3.5 px-6">Catégorie</th>
                <th className="py-3.5 px-6 text-right">Montant</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {transactionsRecentes.map((trx) => (
                <tr
                  key={trx.id}
                  className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6">
                    <p className="font-bold text-slate-800">{trx.id}</p>
                    <span className="text-xs text-slate-400">{trx.date}</span>
                  </td>
                  <td className="px-6">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full border inline-block ${
                        trx.type === "Recette" ?
                          "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                        : "bg-rose-50 text-rose-700 border-rose-200/60"
                      }`}>
                      {trx.type}
                    </span>
                  </td>
                  <td className="px-6 font-medium text-slate-700">
                    {trx.libelle}
                  </td>
                  <td className="px-6">
                    <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg">
                      {trx.categorie}
                    </span>
                  </td>
                  <td
                    className={`px-6 text-right font-bold ${
                      trx.type === "Recette" ?
                        "text-emerald-600"
                      : "text-rose-600"
                    }`}>
                    {trx.montant}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
