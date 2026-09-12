// src/pages/ImagerieRadio.jsx
import React, { useState } from "react";
import {
  FileScan,
  Search,
  Filter,
  Plus,
  X,
  User,
  Clock,
  Image as ImageIcon,
} from "lucide-react";

export default function ImagerieRadio() {
  const [imagerieList, setImagerieList] = useState([
    {
      id: "IMG-001",
      patient: "Aissata Cissé",
      examen: "Radiographie Crâne (Face + Profil)",
      service: "Urgences",
      prescripteur: "Dr. Ibrahima",
      heureDemande: "11:35",
      statut: "En attente",
    },
    {
      id: "IMG-002",
      patient: "Moussa Diop",
      examen: "Échographie Abdominale",
      service: "Chirurgie Générale",
      prescripteur: "Dr. Alou Diallo",
      heureDemande: "09:10",
      statut: "Réalisé",
    },
    {
      id: "IMG-003",
      patient: "Fatoumata Diallo",
      examen: "Échographie Obstétricale T2",
      service: "Maternité & CPN",
      prescripteur: "Awa Traoré",
      heureDemande: "08:45",
      statut: "Validé",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatut, setFilterStatut] = useState("Tous");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // État du formulaire pour une nouvelle demande d'imagerie
  const [newImagerie, setNewImagerie] = useState({
    patient: "",
    examen: "",
    service: "Urgences",
    prescripteur: "Dr. Alou Diallo",
  });

  const handleAddImagerie = (e) => {
    e.preventDefault();
    if (!newImagerie.patient || !newImagerie.examen) return;

    const imagerieObj = {
      id: `IMG-00${imagerieList.length + 1}`,
      ...newImagerie,
      heureDemande: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      statut: "En attente",
    };

    setImagerieList([imagerieObj, ...imagerieList]);
    setIsModalOpen(false);
    setNewImagerie({
      patient: "",
      examen: "",
      service: "Urgences",
      prescripteur: "Dr. Alou Diallo",
    });
  };

  const filteredImagerie = imagerieList.filter((img) => {
    const matchesSearch =
      img.patient.toLowerCase().includes(searchQuery.toLowerCase())
      || img.examen.toLowerCase().includes(searchQuery.toLowerCase())
      || img.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatut =
      filterStatut === "Tous" || img.statut === filterStatut;
    return matchesSearch && matchesStatut;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* En-tête de la page */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <FileScan className="text-orange-600" size={22} /> Imagerie & Radio
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Gestion des examens d'imagerie médicale (Radiographie, Échographie),
            plannings de passage et comptes rendus.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-xs flex items-center gap-2 cursor-pointer w-fit">
          <Plus size={18} /> Nouvelle Demande Radio
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
            placeholder="Rechercher patient, examen, ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange-500 transition-colors"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-xs font-semibold text-slate-400 uppercase flex items-center gap-1.5">
            <Filter size={14} /> Statut :
          </span>
          <select
            value={filterStatut}
            onChange={(e) => setFilterStatut(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-4 py-2.5 outline-none focus:border-orange-500 transition-colors cursor-pointer w-full sm:w-auto">
            <option value="Tous">Tous les statuts</option>
            <option value="En attente">En attente</option>
            <option value="Réalisé">Réalisé</option>
            <option value="Validé">Validé</option>
          </select>
        </div>
      </div>

      {/* Tableau Imagerie & Radio */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 font-semibold text-xs uppercase tracking-wider">
                <th className="py-3.5 px-6">ID & Patient</th>
                <th className="py-3.5 px-6">Examen d'Imagerie</th>
                <th className="py-3.5 px-6">Service Demandeur</th>
                <th className="py-3.5 px-6">Prescripteur</th>
                <th className="py-3.5 px-6">Heure</th>
                <th className="py-3.5 px-6 text-right">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {filteredImagerie.length > 0 ?
                filteredImagerie.map((img) => (
                  <tr
                    key={img.id}
                    className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-bold text-slate-800">{img.patient}</p>
                      <span className="text-xs text-orange-600 font-semibold">
                        {img.id}
                      </span>
                    </td>
                    <td className="px-6 font-medium text-slate-700 max-w-xs truncate">
                      {img.examen}
                    </td>
                    <td className="px-6 text-xs font-semibold text-slate-600">
                      {img.service}
                    </td>
                    <td className="px-6 text-xs text-slate-600 flex items-center gap-1.5 pt-5">
                      <User size={13} className="text-slate-400" />{" "}
                      {img.prescripteur}
                    </td>
                    <td className="px-6 text-xs text-slate-500 flex items-center gap-1 pt-5">
                      <Clock size={13} className="text-slate-400" />{" "}
                      {img.heureDemande}
                    </td>
                    <td className="px-6 text-right">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full border inline-block ${
                          img.statut === "Validé" ?
                            "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                          : img.statut === "Réalisé" ?
                            "bg-blue-50 text-blue-700 border-blue-200/60"
                          : "bg-amber-50 text-amber-700 border-amber-200/60"
                        }`}>
                        {img.statut}
                      </span>
                    </td>
                  </tr>
                ))
              : <tr>
                  <td colSpan="6" className="py-12 text-center text-slate-400">
                    Aucun examen d'imagerie trouvé.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* Modale de demande d'imagerie */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <FileScan className="text-orange-600" size={20} /> Nouvelle
                Demande d'Imagerie
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddImagerie} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Nom du Patient
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Mariam Doumbia"
                  value={newImagerie.patient}
                  onChange={(e) =>
                    setNewImagerie({ ...newImagerie, patient: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Examen d'Imagerie Requis
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Radiographie Thorax, Échographie Pelvienne..."
                  value={newImagerie.examen}
                  onChange={(e) =>
                    setNewImagerie({ ...newImagerie, examen: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Service Demandeur
                  </label>
                  <select
                    value={newImagerie.service}
                    onChange={(e) =>
                      setNewImagerie({
                        ...newImagerie,
                        service: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange-500 cursor-pointer">
                    <option value="Urgences">Urgences</option>
                    <option value="Chirurgie Générale">
                      Chirurgie Générale
                    </option>
                    <option value="Médecine Interne">Médecine Interne</option>
                    <option value="Maternité & CPN">Maternité & CPN</option>
                    <option value="Pédiatrie">Pédiatrie</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Médecin Prescripteur
                  </label>
                  <select
                    value={newImagerie.prescripteur}
                    onChange={(e) =>
                      setNewImagerie({
                        ...newImagerie,
                        prescripteur: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-orange-500 cursor-pointer">
                    <option value="Dr. Alou Diallo">Dr. Alou Diallo</option>
                    <option value="Dr. Ibrahima">Dr. Ibrahima</option>
                    <option value="Dr. Mariam Sidibé">Dr. Mariam Sidibé</option>
                    <option value="Awa Traoré">Awa Traoré (Sage-femme)</option>
                  </select>
                </div>
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
                  className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-sm font-semibold transition-all shadow-xs cursor-pointer">
                  Transmettre la demande
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
