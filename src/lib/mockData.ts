export type Severity = "critical" | "high" | "medium" | "low";

export interface Ward {
  id: string;
  name: string;
  type: "ICU" | "General" | "Emergency" | "Pediatric" | "Maternity";
  total: number;
  occupied: number;
  pendingDischarge: number;
}

export interface OperationTheatre {
  id: string;
  name: string;
  status: "in-use" | "idle" | "cleaning" | "scheduled";
  procedure?: string;
  surgeon?: string;
  endsInMin?: number;
  nextStartInMin?: number;
}

export interface Ambulance {
  id: string;
  callsign: string;
  status: "available" | "dispatched" | "returning" | "maintenance";
  driver: string;
  etaMin?: number;
  destination?: string;
  x: number; // 0-100 map coords
  y: number;
}

export interface BloodUnit {
  type: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  units: number;
  minRequired: number;
  expiringSoon: number;
}

export interface Alert {
  id: string;
  message: string;
  severity: Severity;
  category: "beds" | "ot" | "ambulance" | "blood";
  ageMin: number;
}

export const wards: Ward[] = [
  { id: "icu-1", name: "ICU - Tower A", type: "ICU", total: 24, occupied: 22, pendingDischarge: 3 },
  { id: "icu-2", name: "ICU - Tower B", type: "ICU", total: 18, occupied: 17, pendingDischarge: 1 },
  { id: "er-1", name: "Emergency", type: "Emergency", total: 30, occupied: 26, pendingDischarge: 5 },
  { id: "gen-1", name: "General Ward 3", type: "General", total: 60, occupied: 41, pendingDischarge: 8 },
  { id: "ped-1", name: "Pediatric", type: "Pediatric", total: 22, occupied: 12, pendingDischarge: 2 },
  { id: "mat-1", name: "Maternity", type: "Maternity", total: 28, occupied: 19, pendingDischarge: 1 },
];

export const operationTheatres: OperationTheatre[] = [
  { id: "ot-1", name: "OT-1", status: "in-use", procedure: "Appendectomy", surgeon: "Dr. Mehra", endsInMin: 22 },
  { id: "ot-2", name: "OT-2", status: "in-use", procedure: "Cardiac Bypass", surgeon: "Dr. Iyer", endsInMin: 95 },
  { id: "ot-3", name: "OT-3", status: "cleaning", nextStartInMin: 12 },
  { id: "ot-4", name: "OT-4", status: "idle" },
  { id: "ot-5", name: "OT-5", status: "scheduled", procedure: "Knee Replacement", surgeon: "Dr. Kapoor", nextStartInMin: 35 },
  { id: "ot-6", name: "OT-6", status: "in-use", procedure: "Hernia Repair", surgeon: "Dr. Rao", endsInMin: 10 },
];

export const ambulances: Ambulance[] = [
  { id: "amb-1", callsign: "MD-101", status: "dispatched", driver: "Suresh K.", etaMin: 6, destination: "Sector 14", x: 28, y: 35 },
  { id: "amb-2", callsign: "MD-102", status: "available", driver: "Rakesh P.", x: 55, y: 50 },
  { id: "amb-3", callsign: "MD-103", status: "returning", driver: "Anil J.", etaMin: 12, destination: "Hospital", x: 70, y: 28 },
  { id: "amb-4", callsign: "MD-104", status: "dispatched", driver: "Vikram S.", etaMin: 3, destination: "MG Road", x: 42, y: 65 },
  { id: "amb-5", callsign: "MD-105", status: "available", driver: "Deepak M.", x: 60, y: 70 },
  { id: "amb-6", callsign: "MD-106", status: "maintenance", driver: "—", x: 50, y: 50 },
];

export const bloodInventory: BloodUnit[] = [
  { type: "O+", units: 42, minRequired: 30, expiringSoon: 4 },
  { type: "O-", units: 8, minRequired: 15, expiringSoon: 2 },
  { type: "A+", units: 28, minRequired: 20, expiringSoon: 1 },
  { type: "A-", units: 6, minRequired: 10, expiringSoon: 0 },
  { type: "B+", units: 22, minRequired: 18, expiringSoon: 3 },
  { type: "B-", units: 4, minRequired: 8, expiringSoon: 1 },
  { type: "AB+", units: 11, minRequired: 6, expiringSoon: 0 },
  { type: "AB-", units: 2, minRequired: 4, expiringSoon: 0 },
];

export const alerts: Alert[] = [
  { id: "a1", message: "ICU Tower A at 92% — 3 beds blocked >4h post-discharge", severity: "critical", category: "beds", ageMin: 8 },
  { id: "a2", message: "O- blood below minimum (8 of 15 units)", severity: "high", category: "blood", ageMin: 22 },
  { id: "a3", message: "OT-3 cleaning overdue by 6 min", severity: "medium", category: "ot", ageMin: 6 },
  { id: "a4", message: "Ambulance MD-106 in maintenance — only 2 available", severity: "high", category: "ambulance", ageMin: 45 },
  { id: "a5", message: "Emergency ward intake spike predicted in 30 min", severity: "high", category: "beds", ageMin: 2 },
];

export const inflowTrend = [
  { time: "06:00", admissions: 4, discharges: 2 },
  { time: "08:00", admissions: 9, discharges: 3 },
  { time: "10:00", admissions: 14, discharges: 7 },
  { time: "12:00", admissions: 18, discharges: 11 },
  { time: "14:00", admissions: 22, discharges: 15 },
  { time: "16:00", admissions: 19, discharges: 18 },
  { time: "18:00", admissions: 25, discharges: 14 },
  { time: "20:00", admissions: 17, discharges: 9 },
];
