export interface ResearchNote {
  field: string | null;
  value: string | null;
  source: string | null;
  url: string | null;
  dateAccessed: string | null;
  confidence: string | null;
}

export interface College {
  slug: string;
  name: string;
  website: string | null;
  email: string | null;
  keyContact: string | null;
  phone: string | null;
  annualIntake: string | null;
  totalStudentsRaw: string | null;
  totalStudents: number | null;
  placementRaw: string | null;
  placementPercent: number | null;
  nirfRankRaw: string | null;
  nirfRank: number | null;
  naacGrade: string | null;
  iicRatingRaw: string | null;
  iicRating: number | null;
  nispPolicy: string | null;
  edcStatus: string | null;
  studentStartupsRaw: string | null;
  studentStartups: number | null;
  location: string | null;
  certificationNeeds: string | null;
  universityCode: string | null;
  counsellingCode: string | null;
  avgPackage: number | null;
  highestPackage: number | null;
  researchNotes: ResearchNote[];
}

export interface EliteBenchmark {
  slug: string;
  name: string;
  category: string | null;
  country: string | null;
  totalStudents: number | null;
  placementPercent: number | null;
  avgPackage: number | null;
  highestPackage: number | null;
  nirfRank: number | null;
  rankingType: string | null;
}

export interface CollegeDataset {
  colleges: College[];
  eliteBenchmarks: EliteBenchmark[];
}
