// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;

export const revenueData = [
  { name: "Lun", revenus: 150000 },
  { name: "Mar", revenus: 230000 },
  { name: "Mer", revenus: 180000 },
  { name: "Jeu", revenus: 290000 },
  { name: "Ven", revenus: 320000 },
  { name: "Sam", revenus: 410000 },
  { name: "Dim", revenus: 120000 },
];

export const departmentData = [
  { name: "Général", patients: 120 },
  { name: "Maternité", patients: 95 },
  { name: "Pédiatrie", patients: 85 },
  { name: "Labo", patients: 110 },
];

export const performanceData = [
  { mois: "Jan", consultations: 1200, urgences: 340, ca: 1800000 },
  { mois: "Fév", consultations: 1400, urgences: 410, ca: 2100000 },
  { mois: "Mar", consultations: 1350, urgences: 390, ca: 1950000 },
  { mois: "Avr", consultations: 1600, urgences: 480, ca: 2450000 },
  { mois: "Mai", consultations: 1750, urgences: 520, ca: 2800000 },
  { mois: "Juin", consultations: 1900, urgences: 590, ca: 3100000 },
];

export const specialtyShare = [
  { name: "Médecine Générale", value: 35, color: "#3b82f6" },
  { name: "Maternité / CPN", value: 25, color: "#ec4899" },
  { name: "Pédiatrie", value: 20, color: "#8b5cf6" },
  { name: "Urgences", value: 12, color: "#f59e0b" },
  { name: "Chirurgie / Spécialités", value: 8, color: "#10b981" },
];

export const initialPatientsList = [
  {
    id: "PAT-001",
    nom: "Fatoumata Diallo",
    age: 28,
    sexe: "Féminin",
    telephone: "+223 76 54 32 10",
    adresse: "Badalabougou, Bamako",
    medecin: "Dr. Mariam Sidibé",
    service: "Maternité (CPN)",
    heure: "08:30",
    statut: "Consulté",
  },
  {
    id: "PAT-002",
    nom: "Moussa Traoré",
    age: 42,
    sexe: "Masculin",
    telephone: "+223 66 11 22 33",
    adresse: "Hamdallaye ACI 2000",
    medecin: "Dr. Alou Diallo",
    service: "Laboratoire",
    heure: "09:15",
    statut: "En cours",
  },
  {
    id: "PAT-003",
    nom: "Sekou Koné",
    age: 35,
    sexe: "Masculin",
    telephone: "+223 75 88 99 00",
    adresse: "Kalaban Coro, Bamako",
    medecin: "Dr. Ibrahima",
    service: "Urgences",
    heure: "09:45",
    statut: "En attente",
  },
];