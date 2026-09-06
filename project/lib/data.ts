import raw from "@/data/data.json";
import type { College, EliteBenchmark, CollegeDataset } from "@/lib/types";

const dataset = raw as unknown as CollegeDataset;

export function getAllColleges(): College[] {
  return dataset.colleges;
}

export function getEliteBenchmarks(): EliteBenchmark[] {
  return dataset.eliteBenchmarks;
}

export function getCollegeBySlug(slug: string): College | undefined {
  return dataset.colleges.find((c) => c.slug === slug);
}

export function getAllSlugs(): string[] {
  return dataset.colleges.map((c) => c.slug);
}

// ---- Derived, dataset-wide stats (used for landing page + analytics KPIs) ----

function avg(nums: number[]): number | null {
  const valid = nums.filter((n) => typeof n === "number" && !Number.isNaN(n));
  if (valid.length === 0) return null;
  return Math.round((valid.reduce((a, b) => a + b, 0) / valid.length) * 10) / 10;
}

export function getDatasetStats() {
  const colleges = getAllColleges();

  const placements = colleges
    .map((c) => c.placementPercent)
    .filter((v): v is number => v !== null);
  const avgPackages = colleges
    .map((c) => c.avgPackage)
    .filter((v): v is number => v !== null);
  const highestPackages = colleges
    .map((c) => c.highestPackage)
    .filter((v): v is number => v !== null);
  const students = colleges
    .map((c) => c.totalStudents)
    .filter((v): v is number => v !== null);

  return {
    totalColleges: colleges.length,
    avgPlacementPercent: avg(placements),
    avgPackage: avg(avgPackages),
    topHighestPackage: highestPackages.length ? Math.max(...highestPackages) : null,
    totalStudentsTracked: students.reduce((a, b) => a + b, 0),
    collegesWithPlacementData: placements.length,
    collegesWithPackageData: avgPackages.length,
  };
}
