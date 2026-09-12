// src/pages/StatistiquesKPIs.jsx
import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Activity,
  Clock,
  ShieldCheck,
  Download,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { performanceData, specialtyShare } from "../services/api";

export default function StatistiquesKPIs() {
  const [periode, setPeriode] = useState("6mois");

  return (
    <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4">
      {/* En-tête de la page corrigé pour les écrans intermédiaires */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="max-w-xl">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-blue-600 block mb-0.5">
            Analytique & Performances
          </span>
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-800 tracking-tight">
            Statistiques & Indicateurs Clés (KPIs)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Analyse globale des performances cliniques, financières et
            opérationnelles.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 shrink-0">
          <select
            value={periode}
            onChange={(e) => setPeriode(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs sm:text-sm font-semibold rounded-xl px-3.5 py-2.5 outline-none focus:border-blue-500 transition-colors cursor-pointer w-full sm:w-auto">
            <option value="7jours">Les 7 derniers jours</option>
            <option value="30jours">Ce mois-ci</option>
            <option value="6mois">Les 6 derniers mois</option>
            <option value="1an">Cette année</option>
          </select>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95 w-full sm:w-auto">
            <Download size={16} /> Exporter le rapport
          </button>
        </div>
      </div>

      {/* Grille des KPIs Avancés */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
                Taux d'occupation lits
              </p>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 mt-1 tracking-tight">
                84.2%
              </h3>
            </div>
            <div className="bg-blue-50 text-blue-600 p-2.5 rounded-xl shrink-0">
              <Activity size={20} />
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50/80 w-fit px-2.5 py-1 rounded-lg">
            <TrendingUp size={14} /> <span>+4.1% vs mois dernier</span>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
                Délai moyen d'attente
              </p>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 mt-1 tracking-tight">
                14 min
              </h3>
            </div>
            <div className="bg-amber-50 text-amber-600 p-2.5 rounded-xl shrink-0">
              <Clock size={20} />
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50/80 w-fit px-2.5 py-1 rounded-lg">
            <TrendingDown size={14} /> <span>-3 min d'attente</span>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
                Recouvrement Assurances
              </p>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 mt-1 tracking-tight">
                92.8%
              </h3>
            </div>
            <div className="bg-emerald-50 text-emerald-600 p-2.5 rounded-xl shrink-0">
              <ShieldCheck size={20} />
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50/80 w-fit px-2.5 py-1 rounded-lg">
            <TrendingUp size={14} /> <span>Stable</span>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">
                Satisfaction Patients
              </p>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 mt-1 tracking-tight">
                4.8 / 5
              </h3>
            </div>
            <div className="bg-purple-50 text-purple-600 p-2.5 rounded-xl shrink-0">
              <Users size={20} />
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-600 bg-purple-50/80 w-fit px-2.5 py-1 rounded-lg">
            <span>Basé sur 450 avis</span>
          </div>
        </div>
      </div>

      {/* Graphiques Principaux */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs lg:col-span-2 flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <h3 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight">
              Croissance du Chiffre d'Affaires
            </h3>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-xl w-fit">
              Vue consolidée
            </span>
          </div>
          <div className="h-64 sm:h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={performanceData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCa" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="mois"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 11 }}
                  tickFormatter={(v) => `${v / 1000000}M`}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                    backgroundColor: "#1e293b",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                  formatter={(value) => [
                    `${value.toLocaleString()} FCFA`,
                    "Chiffre d'affaires",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="ca"
                  stroke="#3b82f6"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorCa)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight mb-0.5">
              Répartition par Spécialité
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Part des consultations par département
            </p>
            <div className="space-y-3">
              {specialtyShare.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-semibold text-slate-700">
                      {item.name}
                    </span>
                  </div>
                  <span className="font-extrabold text-slate-800">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-slate-100">
            <button className="w-full bg-slate-50 hover:bg-slate-100 text-slate-700 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors cursor-pointer active:scale-95">
              Voir les détails par médecin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
