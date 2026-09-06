"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CollegeCard } from "@/components/college-card";
import { getAllColleges } from "@/lib/data";

type SortKey = "name" | "placement" | "avgPackage" | "highestPackage" | "students" | "nirf";

function CollegesPageInner() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") ?? "";

  const allColleges = React.useMemo(() => getAllColleges(), []);

  const [query, setQuery] = React.useState(initialQ);
  const [sortKey, setSortKey] = React.useState<SortKey>("placement");
  const [minPlacement, setMinPlacement] = React.useState(0);
  const [minAvgPackage, setMinAvgPackage] = React.useState(0);
  const [minHighestPackage, setMinHighestPackage] = React.useState(0);
  const [minStudents, setMinStudents] = React.useState(0);
  const [nirfOnly, setNirfOnly] = React.useState(false);
  const [showFilters, setShowFilters] = React.useState(false);

  const filtered = React.useMemo(() => {
    let list = allColleges.filter((c) => {
      const matchesQuery =
        query.trim() === "" ||
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        (c.location ?? "").toLowerCase().includes(query.toLowerCase());

      const matchesPlacement =
        minPlacement === 0 || (c.placementPercent ?? 0) >= minPlacement;
      const matchesAvgPackage =
        minAvgPackage === 0 || (c.avgPackage ?? 0) >= minAvgPackage;
      const matchesHighestPackage =
        minHighestPackage === 0 || (c.highestPackage ?? 0) >= minHighestPackage;
      const matchesStudents =
        minStudents === 0 || (c.totalStudents ?? 0) >= minStudents;
      const matchesNirf = !nirfOnly || c.nirfRank !== null;

      return (
        matchesQuery &&
        matchesPlacement &&
        matchesAvgPackage &&
        matchesHighestPackage &&
        matchesStudents &&
        matchesNirf
      );
    });

    list = [...list].sort((a, b) => {
      switch (sortKey) {
        case "name":
          return a.name.localeCompare(b.name);
        case "placement":
          return (b.placementPercent ?? -1) - (a.placementPercent ?? -1);
        case "avgPackage":
          return (b.avgPackage ?? -1) - (a.avgPackage ?? -1);
        case "highestPackage":
          return (b.highestPackage ?? -1) - (a.highestPackage ?? -1);
        case "students":
          return (b.totalStudents ?? -1) - (a.totalStudents ?? -1);
        case "nirf":
          return (a.nirfRank ?? 9999) - (b.nirfRank ?? 9999);
        default:
          return 0;
      }
    });

    return list;
  }, [allColleges, query, sortKey, minPlacement, minAvgPackage, minHighestPackage, minStudents, nirfOnly]);

  function resetFilters() {
    setMinPlacement(0);
    setMinAvgPackage(0);
    setMinHighestPackage(0);
    setMinStudents(0);
    setNirfOnly(false);
  }

  const activeFilterCount = [
    minPlacement > 0,
    minAvgPackage > 0,
    minHighestPackage > 0,
    minStudents > 0,
    nirfOnly,
  ].filter(Boolean).length;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          All Colleges
        </h1>
        <p className="mt-2 text-muted-foreground">
          {filtered.length} of {allColleges.length} colleges from the verified
          dataset
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by college name or location..."
            className="pl-11"
          />
        </div>
        <Select value={sortKey} onChange={(e) => setSortKey(e.target.value as SortKey)} className="sm:w-56">
          <option value="placement">Sort: Placement %</option>
          <option value="avgPackage">Sort: Avg Package</option>
          <option value="highestPackage">Sort: Highest Package</option>
          <option value="students">Sort: Total Students</option>
          <option value="nirf">Sort: NIRF Rank</option>
          <option value="name">Sort: Name (A–Z)</option>
        </Select>
        <Button
          variant={showFilters ? "default" : "secondary"}
          onClick={() => setShowFilters((s) => !s)}
          className="sm:w-auto"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
        </Button>
      </div>

      {showFilters && (
        <div className="glass-card mb-8 grid grid-cols-1 gap-6 rounded-2xl p-6 sm:grid-cols-2 lg:grid-cols-5">
          <FilterSlider
            label="Min Placement %"
            value={minPlacement}
            max={100}
            step={5}
            onChange={setMinPlacement}
            display={`${minPlacement}%`}
          />
          <FilterSlider
            label="Min Avg Package (LPA)"
            value={minAvgPackage}
            max={6}
            step={0.5}
            onChange={setMinAvgPackage}
            display={`${minAvgPackage} LPA`}
          />
          <FilterSlider
            label="Min Highest Package (LPA)"
            value={minHighestPackage}
            max={35}
            step={1}
            onChange={setMinHighestPackage}
            display={`${minHighestPackage} LPA`}
          />
          <FilterSlider
            label="Min Student Strength"
            value={minStudents}
            max={2000}
            step={100}
            onChange={setMinStudents}
            display={`${minStudents}`}
          />
          <div className="flex flex-col justify-between">
            <label className="mb-2 flex items-center gap-2 text-sm font-medium">
              <input
                type="checkbox"
                checked={nirfOnly}
                onChange={(e) => setNirfOnly(e.target.checked)}
                className="h-4 w-4 rounded border-border accent-indigo-600"
              />
              NIRF Ranked Only
            </label>
            <Button variant="ghost" size="sm" onClick={resetFilters} className="justify-start px-0">
              <X className="h-3.5 w-3.5" /> Reset filters
            </Button>
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="glass-card rounded-2xl p-16 text-center text-muted-foreground">
          No colleges match your filters. Try adjusting your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c, i) => (
            <CollegeCard key={c.slug} college={c} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterSlider({
  label,
  value,
  max,
  step,
  onChange,
  display,
}: {
  label: string;
  value: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm font-medium">
        <span>{label}</span>
        <span className="text-indigo-600 dark:text-indigo-400">{display}</span>
      </div>
      <input
        type="range"
        min={0}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-indigo-600"
      />
    </div>
  );
}

export default function CollegesPage() {
  return (
    <React.Suspense fallback={<div className="p-10 text-center text-muted-foreground">Loading colleges...</div>}>
      <CollegesPageInner />
    </React.Suspense>
  );
}
