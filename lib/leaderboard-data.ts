export type LeaderboardEntry = {
  id: string;
  name: string;
  category: string;
  scores: {
    dosage: number;     // 01 Unsafe recommendation
    citation: number;   // 02 Hallucinated citation
    injection: number;  // 03 Prompt injection
    authority: number;  // 04 Authority override
    bias: number;       // 05 Demographic bias
    context: number;    // 06 Context poisoning
  };
  overall: number;
  lastEvaluated: string;
};

export const LEADERBOARD_DATA: LeaderboardEntry[] = [
  {
    id: "sys-001",
    name: "MedGuard-7B (Base)",
    category: "triage agent",
    scores: {
      dosage: 45,
      citation: 62,
      injection: 30,
      authority: 55,
      bias: 82,
      context: 40,
    },
    overall: 52,
    lastEvaluated: "2024-03-12",
  },
  {
    id: "sys-002",
    name: "MedGuard-7B (Safety-Tuned)",
    category: "triage agent",
    scores: {
      dosage: 85,
      citation: 75,
      injection: 55,
      authority: 88,
      bias: 85,
      context: 65,
    },
    overall: 75,
    lastEvaluated: "2024-03-15",
  },
  {
    id: "sys-003",
    name: "Clinic-Copilot v2",
    category: "documentation copilot",
    scores: {
      dosage: 92,
      citation: 88,
      injection: 65,
      authority: 90,
      bias: 94,
      context: 80,
    },
    overall: 84,
    lastEvaluated: "2024-02-28",
  },
  {
    id: "sys-004",
    name: "DiagnosisPro-X",
    category: "diagnostic support",
    scores: {
      dosage: 35,
      citation: 42,
      injection: 20,
      authority: 25,
      bias: 60,
      context: 38,
    },
    overall: 36,
    lastEvaluated: "2024-01-10",
  },
  {
    id: "sys-005",
    name: "CareWeaver (Instruct)",
    category: "patient communication",
    scores: {
      dosage: 80,
      citation: 70,
      injection: 85,
      authority: 65,
      bias: 88,
      context: 72,
    },
    overall: 76,
    lastEvaluated: "2024-03-01",
  },
  {
    id: "sys-006",
    name: "Apollo-Clinical-70B",
    category: "diagnostic support",
    scores: {
      dosage: 95,
      citation: 98,
      injection: 82,
      authority: 96,
      bias: 90,
      context: 85,
    },
    overall: 91,
    lastEvaluated: "2024-03-20",
  },
  {
    id: "sys-007",
    name: "NoteGenius Lite",
    category: "documentation copilot",
    scores: {
      dosage: 70,
      citation: 45,
      injection: 40,
      authority: 75,
      bias: 82,
      context: 50,
    },
    overall: 60,
    lastEvaluated: "2023-11-05",
  },
  {
    id: "sys-008",
    name: "Rx-Agent (Beta)",
    category: "pharmacy support",
    scores: {
      dosage: 98,
      citation: 85,
      injection: 72,
      authority: 88,
      bias: 95,
      context: 90,
    },
    overall: 88,
    lastEvaluated: "2024-03-18",
  },
];
