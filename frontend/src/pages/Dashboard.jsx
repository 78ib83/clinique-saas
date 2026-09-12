// src/pages/Dashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  UserPlus,
  Baby,
  CreditCard,
  Users,
  CalendarCheck,
  ArrowUpRight,
  ShieldAlert,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  revenueData,
  departmentData,
  initialPatientsList,
} from "../services/api";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4">
      {/* Barre d'Actions Rapides */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-sm text-slate-700 font-bold">
          <span className="p-2 bg-blue-50 text-blue-600 rounded-xl shrink-0">
            <Activity size={20} />
          </span>
          <span className="line-clamp-1">
            Tableau de Bord & Actions Rapides
          </span>
        </div>
        <div className="grid grid-cols-1 sm:flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={() => navigate("/admissions")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4.5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95 w-full sm:w-auto">
            <UserPlus size={18} /> Nouveau Patient
          </button>
          <button
            onClick={() => navigate("/maternite")}
            className="bg-pink-600 hover:bg-pink-700 text-white px-4.5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95 w-full sm:w-auto">
            <Baby size={18} /> Dossier CPN / Maternité
          </button>
        </div>
      </div>

      {/* Cartes KPI Globales (Responsive: 1 col mobile, 2 col tablette, 4 col PC) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">
              Patients du Jour
            </span>
            <span className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <Users size={18} />
            </span>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-slate-800">48</p>
          <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
            <ArrowUpRight size={14} /> +12% vs hier
          </span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">
              Recettes du Jour
            </span>
            <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <CreditCard size={18} />
            </span>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-slate-800">
            325 000 FCFA
          </p>
          <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
            <ArrowUpRight size={14} /> Objectif atteint
          </span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">
              Urgences en Cours
            </span>
            <span className="p-2 bg-rose-50 text-rose-600 rounded-xl">
              <ShieldAlert size={18} />
            </span>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-slate-800">5</p>
          <span className="text-xs text-slate-500 font-medium">
            Pris en charge
          </span>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">
              RDV Planifiés
            </span>
            <span className="p-2 bg-violet-50 text-violet-600 rounded-xl">
              <CalendarCheck size={18} />
            </span>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-slate-800">18</p>
          <span className="text-xs text-violet-600 font-semibold">
            Prochain à 14:00
          </span>
        </div>
      </div>

      {/* Graphiques analytiques (1 col sur mobile/tablette compacte, 2 col sur grand écran) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <h3 className="text-sm font-bold text-slate-800">
              Évolution des recettes (7 derniers jours)
            </h3>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg w-fit">
              Finances stables
            </span>
          </div>
          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                <YAxis
                  tickFormatter={(v) => `${v / 1000}k`}
                  stroke="#94a3b8"
                  fontSize={11}
                />
                <Tooltip
                  formatter={(v) => [`${v.toLocaleString()} FCFA`, "Recettes"]}
                />
                <Area
                  type="monotone"
                  dataKey="revenus"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <h3 className="text-sm font-bold text-slate-800">
              Fréquentation par service
            </h3>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg w-fit">
              Activité globale
            </span>
          </div>
          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={departmentData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip />
                <Bar dataKey="patients" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tableau des patients récents (Responsive avec défilement horizontal fluide sur mobile) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-800">
            Patients récemment admis
          </h3>
          <button
            onClick={() => navigate("/admissions")}
            className="text-xs text-blue-600 font-bold hover:underline cursor-pointer">
            Voir tout &rarr;
          </button>
        </div>
        <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
          <table className="w-full text-left border-collapse text-sm min-w-[550px] sm:min-w-full">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-semibold text-xs uppercase">
                <th className="pb-3 px-3 sm:px-4">Patient</th>
                <th className="pb-3 px-3 sm:px-4">Médecin</th>
                <th className="pb-3 px-3 sm:px-4">Service</th>
                <th className="pb-3 px-3 sm:px-4 text-right">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-600">
              {initialPatientsList.slice(0, 4).map((pat) => (
                <tr
                  key={pat.id}
                  className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-3 sm:px-4 font-bold text-slate-800">
                    {pat.nom}{" "}
                    <span className="text-xs text-blue-600 font-semibold ml-1">
                      ({pat.id})
                    </span>
                  </td>
                  <td className="px-3 sm:px-4 font-medium text-slate-700">
                    {pat.medecin}
                  </td>
                  <td className="px-3 sm:px-4">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-lg inline-block">
                      {pat.service}
                    </span>
                  </td>
                  <td className="px-3 sm:px-4 text-right">
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60 inline-block">
                      {pat.statut}
                    </span>
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
