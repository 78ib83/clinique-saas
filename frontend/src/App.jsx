import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Admissions from "./pages/Admissions";
import RendezVous from "./pages/RendezVous";
import StatistiquesKPIs from "./pages/StatistiquesKPIs";
import CaisseFacturation from "./pages/CaisseFacturation";
import Login from "./pages/Login";
import Consultations from "./pages/Consultations";
import UrgencesTriage from "./pages/UrgencesTriage";
import MaterniteCPN from "./pages/MaterniteCPN";
import PediatrieVaccination from "./pages/PediatrieVaccination";
import HospitalisationLits from "./pages/HospitalisationLits";
import BlocOperatoireChirurgie from "./pages/BlocOperatoireChirurgie";
import LaboratoireExamens from "./pages/LaboratoireExamens";
import ImagerieRadio from "./pages/ImagerieRadio";
import PharmacieStock from "./pages/PharmacieStock";
import AssurancesTiersPayant from "./pages/AssurancesTiersPayant";
import RistournesReferants from "./pages/RistournesReferants";
import ComptabiliteRapports from "./pages/ComptabiliteRapports";
import PersonnelPlanning from "./pages/PersonnelPlanning";
import ParametresClinique from "./pages/ParametresClinique";
import SecuriteRoles from "./pages/SecuriteRoles";

// Le Layout principal mis en place pour gérer l'ouverture du menu mobile
const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar avec gestion de son état responsive mobile */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header avec la fonction pour déclencher l'ouverture du menu mobile */}
        <Header onToggleSidebar={() => setIsSidebarOpen(true)} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Page de connexion (sans la sidebar ni le header) */}
        <Route path="/login" element={<Login />} />

        {/* Pages du tableau de bord avec le layout principal */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />
        <Route
          path="/admissions"
          element={
            <MainLayout>
              <Admissions />
            </MainLayout>
          }
        />
        <Route
          path="/rendez-vous"
          element={
            <MainLayout>
              <RendezVous />
            </MainLayout>
          }
        />
        <Route
          path="/statistiques"
          element={
            <MainLayout>
              <StatistiquesKPIs />
            </MainLayout>
          }
        />
        <Route
          path="/facturation"
          element={
            <MainLayout>
              <CaisseFacturation />
            </MainLayout>
          }
        />
        <Route
          path="/consultations"
          element={
            <MainLayout>
              <Consultations />
            </MainLayout>
          }
        />
        <Route
          path="/urgences"
          element={
            <MainLayout>
              <UrgencesTriage />
            </MainLayout>
          }
        />
        <Route
          path="/maternite"
          element={
            <MainLayout>
              <MaterniteCPN />
            </MainLayout>
          }
        />
        <Route
          path="/pediatrie"
          element={
            <MainLayout>
              <PediatrieVaccination />
            </MainLayout>
          }
        />
        <Route
          path="/hospitalisation"
          element={
            <MainLayout>
              <HospitalisationLits />
            </MainLayout>
          }
        />
        <Route
          path="/chirurgie"
          element={
            <MainLayout>
              <BlocOperatoireChirurgie />
            </MainLayout>
          }
        />
        <Route
          path="/laboratoire"
          element={
            <MainLayout>
              <LaboratoireExamens />
            </MainLayout>
          }
        />
        <Route
          path="/imagerie"
          element={
            <MainLayout>
              <ImagerieRadio />
            </MainLayout>
          }
        />
        <Route
          path="/pharmacie"
          element={
            <MainLayout>
              <PharmacieStock />
            </MainLayout>
          }
        />
        <Route
          path="/assurances"
          element={
            <MainLayout>
              <AssurancesTiersPayant />
            </MainLayout>
          }
        />
        <Route
          path="/ristournes"
          element={
            <MainLayout>
              <RistournesReferants />
            </MainLayout>
          }
        />
        <Route
          path="/comptabilite"
          element={
            <MainLayout>
              <ComptabiliteRapports />
            </MainLayout>
          }
        />
        <Route
          path="/personnel"
          element={
            <MainLayout>
              <PersonnelPlanning />
            </MainLayout>
          }
        />
        <Route
          path="/parametres"
          element={
            <MainLayout>
              <ParametresClinique />
            </MainLayout>
          }
        />
        <Route
          path="/securite"
          element={
            <MainLayout>
              <SecuriteRoles />
            </MainLayout>
          }
        />

        {/* Redirection par défaut si la route n'existe pas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
