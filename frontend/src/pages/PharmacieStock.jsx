// src/pages/PharmacieStock.jsx
import React, { useState } from "react";
import {
  Pill,
  Search,
  Filter,
  Plus,
  X,
  Package,
  AlertTriangle,
  ArrowUpDown,
} from "lucide-react";

export default function PharmacieStock() {
  const [stockList, setStockList] = useState([
    {
      id: "PHA-001",
      medicament: "Paracétamol 500mg (Boîte de 100)",
      categorie: "Analgésique / Antipyretique",
      quantite: 1250,
      seuilAlerte: 200,
      unite: "Comprimés",
      statut: "Stock Normal",
    },
    {
      id: "PHA-002",
      medicament: "Amoxicilline 500mg",
      categorie: "Antibiotique",
      quantite: 180,
      seuilAlerte: 150,
      unite: "Gélules",
      statut: "Stock Faible",
    },
    {
      id: "PHA-003",
      medicament: "Arteméther / Luméfantrine (Paludisme)",
      categorie: "Antipaludique",
      quantite: 850,
      seuilAlerte: 300,
      unite: "Boîtes",
      statut: "Stock Normal",
    },
    {
      id: "PHA-004",
      medicament: "Sérum Salé Physiologique 0.9% 500ml",
      categorie: "Soluté de perfusion",
      quantite: 45,
      seuilAlerte: 100,
      unite: "Poches",
      statut: "Rupture Imminente",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatut, setFilterStatut] = useState("Tous");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // État du formulaire pour l'ajout d'un médicament ou lot en stock
  const [newStock, setNewStock] = useState({
    medicament: "",
    categorie: "Analgésique",
    quantite: "",
    seuilAlerte: 50,
    unite: "Unités",
  });

  const handleAddStock = (e) => {
    e.preventDefault();
    if (!newStock.medicament || !newStock.quantite) return;

    const qty = parseInt(newStock.quantite, 10);
    const alertThreshold = parseInt(newStock.seuilAlerte, 10);
    let statutCalculé = "Stock Normal";
    if (qty <= alertThreshold) {
      statutCalculé = "Stock Faible";
    }
    if (qty <= alertThreshold / 2) {
      statutCalculé = "Rupture Imminente";
    }

    const stockObj = {
      id: `PHA-00${stockList.length + 1}`,
      ...newStock,
      quantite: qty,
      seuilAlerte: alertThreshold,
      statut: statutCalculé,
    };

    setStockList([stockObj, ...stockList]);
    setIsModalOpen(false);
    setNewStock({
      medicament: "",
      categorie: "Analgésique",
      quantite: "",
      seuilAlerte: 50,
      unite: "Unités",
    });
  };

  const filteredStock = stockList.filter((item) => {
    const matchesSearch =
      item.medicament.toLowerCase().includes(searchQuery.toLowerCase())
      || item.categorie.toLowerCase().includes(searchQuery.toLowerCase())
      || item.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatut =
      filterStatut === "Tous" || item.statut === filterStatut;
    return matchesSearch && matchesStatut;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* En-tête de la page */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <Pill className="text-emerald-600" size={22} /> Pharmacie & Stock
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Gestion des stocks de médicaments, suivi des seuils d'alerte et
            traçabilité des dotations pharmaceutiques.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-xs flex items-center gap-2 cursor-pointer w-fit">
          <Plus size={18} /> Ajouter un Médicament
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
            placeholder="Rechercher médicament, catégorie, ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-500 transition-colors"
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-xs font-semibold text-slate-400 uppercase flex items-center gap-1.5">
            <Filter size={14} /> État du stock :
          </span>
          <select
            value={filterStatut}
            onChange={(e) => setFilterStatut(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-4 py-2.5 outline-none focus:border-emerald-500 transition-colors cursor-pointer w-full sm:w-auto">
            <option value="Tous">Tous les statuts</option>
            <option value="Stock Normal">Stock Normal</option>
            <option value="Stock Faible">Stock Faible</option>
            <option value="Rupture Imminente">Rupture Imminente</option>
          </select>
        </div>
      </div>

      {/* Tableau Pharmacie & Stock */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 font-semibold text-xs uppercase tracking-wider">
                <th className="py-3.5 px-6">ID & Médicament</th>
                <th className="py-3.5 px-6">Catégorie</th>
                <th className="py-3.5 px-6">Quantité en Stock</th>
                <th className="py-3.5 px-6">Seuil d'Alerte</th>
                <th className="py-3.5 px-6 text-right">Statut Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {filteredStock.length > 0 ?
                filteredStock.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-bold text-slate-800">
                        {item.medicament}
                      </p>
                      <span className="text-xs text-emerald-600 font-semibold">
                        {item.id}
                      </span>
                    </td>
                    <td className="px-6 font-medium text-slate-700">
                      <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-lg">
                        {item.categorie}
                      </span>
                    </td>
                    <td className="px-6 font-bold text-slate-800">
                      {item.quantite}{" "}
                      <span className="text-xs font-normal text-slate-500">
                        {item.unite}
                      </span>
                    </td>
                    <td className="px-6 text-xs font-semibold text-slate-500">
                      {item.seuilAlerte} {item.unite}
                    </td>
                    <td className="px-6 text-right">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full border inline-block ${
                          item.statut === "Stock Normal" ?
                            "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                          : item.statut === "Stock Faible" ?
                            "bg-amber-50 text-amber-700 border-amber-200/60"
                          : "bg-rose-50 text-rose-700 border-rose-200/60"
                        }`}>
                        {item.statut}
                      </span>
                    </td>
                  </tr>
                ))
              : <tr>
                  <td colSpan="5" className="py-12 text-center text-slate-400">
                    Aucun médicament trouvé dans le stock.
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* Modale d'ajout de stock */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <Pill className="text-emerald-600" size={20} /> Ajouter un
                Médicament au Stock
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddStock} className="space-y-4 pt-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                  Nom du Médicament & Dosage
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Ibuprofène 400mg"
                  value={newStock.medicament}
                  onChange={(e) =>
                    setNewStock({ ...newStock, medicament: e.target.value })
                  }
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Catégorie
                  </label>
                  <select
                    value={newStock.categorie}
                    onChange={(e) =>
                      setNewStock({ ...newStock, categorie: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-500 cursor-pointer">
                    <option value="Analgésique / Antipyretique">
                      Analgésique / Antipyretique
                    </option>
                    <option value="Antibiotique">Antibiotique</option>
                    <option value="Antipaludique">Antipaludique</option>
                    <option value="Soluté de perfusion">
                      Soluté de perfusion
                    </option>
                    <option value="Anti-inflammatoire">
                      Anti-inflammatoire
                    </option>
                    <option value="Vaccin / Sérum">Vaccin / Sérum</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Unité de Mesure
                  </label>
                  <select
                    value={newStock.unite}
                    onChange={(e) =>
                      setNewStock({ ...newStock, unite: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-500 cursor-pointer">
                    <option value="Comprimés">Comprimés</option>
                    <option value="Gélules">Gélules</option>
                    <option value="Boîtes">Boîtes</option>
                    <option value="Poches">Poches</option>
                    <option value="Ampoules">Ampoules</option>
                    <option value="Flacons">Flacons</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Quantité Initiale
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="Ex: 500"
                    value={newStock.quantite}
                    onChange={(e) =>
                      setNewStock({ ...newStock, quantite: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
                    Seuil d'Alerte
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="Ex: 100"
                    value={newStock.seuilAlerte}
                    onChange={(e) =>
                      setNewStock({ ...newStock, seuilAlerte: e.target.value })
                    }
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-emerald-500"
                  />
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
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-semibold transition-all shadow-xs cursor-pointer">
                  Enregistrer en stock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
