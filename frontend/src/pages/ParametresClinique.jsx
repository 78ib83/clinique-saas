// src/pages/ParametresClinique.jsx
import React, { useState } from "react";
import {
  Settings,
  Building2,
  Bell,
  Lock,
  UserCheck,
  Save,
  CheckCircle2,
  Shield,
  Database,
  Globe,
} from "lucide-react";

export default function ParametresClinique() {
  const [activeTab, setActiveTab] = useState("general");
  const [savedSuccess, setSavedSuccess] = useState(false);

  // État des paramètres de l'établissement
  const [settings, setSettings] = useState({
    nomClinique: "Clinique Médicale Lafia",
    adresse: "Avenue de l'Indépendance, Ségou, Mali",
    telephone: "+223 21 32 00 00",
    email: "contact@cliniquelafia.ml",
    devise: "FCFA",
    tva: "18%",
    notificationsEmail: true,
    notificationsSMS: true,
    modeMaintenance: false,
    langue: "Français",
  });

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* En-tête de la page */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <Settings className="text-slate-700" size={22} /> Paramètres de la
            Clinique
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Configuration générale de l'établissement, gestion des préférences,
            notifications et sécurité.
          </p>
        </div>
        {savedSuccess && (
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-sm font-semibold border border-emerald-200 animate-fade-in">
            <CheckCircle2 size={18} /> Paramètres enregistrés avec succès !
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation des paramètres */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs h-fit space-y-1">
          <button
            onClick={() => setActiveTab("general")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "general" ?
                "bg-indigo-50 text-indigo-600"
              : "text-slate-600 hover:bg-slate-50"
            }`}>
            <Building2 size={18} /> Informations Générales
          </button>
          <button
            onClick={() => setActiveTab("notifications")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "notifications" ?
                "bg-indigo-50 text-indigo-600"
              : "text-slate-600 hover:bg-slate-50"
            }`}>
            <Bell size={18} /> Notifications & Alertes
          </button>
          <button
            onClick={() => setActiveTab("securite")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "securite" ?
                "bg-indigo-50 text-indigo-600"
              : "text-slate-600 hover:bg-slate-50"
            }`}>
            <Shield size={18} /> Sécurité & Accès
          </button>
          <button
            onClick={() => setActiveTab("systeme")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "systeme" ?
                "bg-indigo-50 text-indigo-600"
              : "text-slate-600 hover:bg-slate-50"
            }`}>
            <Database size={18} /> Système & Données
          </button>
        </div>

        {/* Contenu principal des paramètres */}
        <div className="lg:col-span-3 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <form onSubmit={handleSave} className="space-y-6">
            {activeTab === "general" && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-800 pb-2 border-b border-slate-100">
                  Informations de l'Établissement
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                      Nom de la Clinique
                    </label>
                    <input
                      type="text"
                      value={settings.nomClinique}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          nomClinique: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                      Adresse Email Officielle
                    </label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) =>
                        setSettings({ ...settings, email: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                      Téléphone
                    </label>
                    <input
                      type="text"
                      value={settings.telephone}
                      onChange={(e) =>
                        setSettings({ ...settings, telephone: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                      Devise Financière
                    </label>
                    <select
                      value={settings.devise}
                      onChange={(e) =>
                        setSettings({ ...settings, devise: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 cursor-pointer">
                      <option value="FCFA">FCFA (XOF)</option>
                      <option value="EUR">Euro (€)</option>
                      <option value="USD">Dollar US ($)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Adresse Postale / Géographique
                  </label>
                  <input
                    type="text"
                    value={settings.adresse}
                    onChange={(e) =>
                      setSettings({ ...settings, adresse: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-800 pb-2 border-b border-slate-100">
                  Préférences de Notification
                </h3>
                <div className="space-y-4 pt-2">
                  <label className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200/60 cursor-pointer">
                    <div>
                      <p className="font-bold text-slate-800 text-sm">
                        Notifications par Email
                      </p>
                      <p className="text-xs text-slate-500">
                        Recevoir les rapports de caisse et alertes de stock par
                        email.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notificationsEmail}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          notificationsEmail: e.target.checked,
                        })
                      }
                      className="w-5 h-5 accent-indigo-600 rounded-md cursor-pointer"
                    />
                  </label>

                  <label className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200/60 cursor-pointer">
                    <div>
                      <p className="font-bold text-slate-800 text-sm">
                        Notifications SMS / Rappels Patients
                      </p>
                      <p className="text-xs text-slate-500">
                        Activer l'envoi automatique des rappels de rendez-vous
                        aux patients.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notificationsSMS}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          notificationsSMS: e.target.checked,
                        })
                      }
                      className="w-5 h-5 accent-indigo-600 rounded-md cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            )}

            {activeTab === "securite" && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-800 pb-2 border-b border-slate-100">
                  Sécurité & Politiques d'Accès
                </h3>
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                      Politique de mot de passe administrateur
                    </label>
                    <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-indigo-500 cursor-pointer">
                      <option value="standard">
                        Standard (Minimum 6 caractères)
                      </option>
                      <option value="renforce">
                        Renforcé (Majuscules, chiffres, caractères spéciaux)
                      </option>
                    </select>
                  </div>
                  <div className="p-4 bg-amber-50 border border-amber-200/60 rounded-xl text-amber-800 text-xs font-medium">
                    ⚠️ La double authentification (2FA) est active pour tous les
                    comptes connectés aux dossiers médicaux sensibles.
                  </div>
                </div>
              </div>
            )}

            {activeTab === "systeme" && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-slate-800 pb-2 border-b border-slate-100">
                  Système & Maintenance
                </h3>
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200/60">
                    <div>
                      <p className="font-bold text-slate-800 text-sm">
                        Sauvegarde Automatique de la Base de Données
                      </p>
                      <p className="text-xs text-slate-500">
                        Dernière sauvegarde réussie aujourd'hui à 04:00 AM.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        alert("Sauvegarde manuelle déclenchée avec succès !")
                      }
                      className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-semibold transition-colors cursor-pointer">
                      Lancer une sauvegarde
                    </button>
                  </div>

                  <label className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200/60 cursor-pointer">
                    <div>
                      <p className="font-bold text-slate-800 text-sm">
                        Mode Maintenance
                      </p>
                      <p className="text-xs text-slate-500">
                        Bloquer temporairement l'accès aux utilisateurs
                        non-administrateurs.
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.modeMaintenance}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          modeMaintenance: e.target.checked,
                        })
                      }
                      className="w-5 h-5 accent-rose-600 rounded-md cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            )}

            <div className="pt-6 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-xs flex items-center gap-2 cursor-pointer">
                <Save size={18} /> Enregistrer les modifications
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
