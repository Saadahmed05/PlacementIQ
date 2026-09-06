"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { ArrowLeftRight, MapPin, TrendingUp, Award, Users, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { getAllColleges } from "@/lib/data";
import { fmtNumber, NA } from "@/lib/utils";
import type { College } from "@/lib/types";

function CompareInner() {
  const params = useSearchParams();
  const colleges = React.useMemo(() => getAllColleges(), []);

  const [slugA, setSlugA] = React.useState(
    params.get("a") || colleges[0]?.slug || ""
  );
  const [slugB, setSlugB] = React.useState(
    params.get("b") || colleges[1]?.slug || ""
  );

  const collegeA = colleges.find((c) => c.slug === slugA);
  const collegeB = colleges.find((c) => c.slug === slugB);

  const barData = [
    {
      metric: "Placement %",
      [collegeA?.name ?? "College A"]: collegeA?.placementPercent ?? 0,
      [collegeB?.name ?? "College B"]: collegeB?.placementPercent ?? 0,
    },
    {
      metric: "Avg Package",
      [collegeA?.name ?? "College A"]: collegeA?.avgPackage ?? 0,
      [collegeB?.name ?? "College B"]: collegeB?.avgPackage ?? 0,
    },
    {
      metric: "Highest Package",
      [collegeA?.name ?? "College A"]: collegeA?.highestPackage ?? 0,
      [collegeB?.name ?? "College B"]: collegeB?.highestPackage ?? 0,
    },
  ];

  function normalize(college: College | undefined, field: keyof College, max: number) {
    if (!college) return 0;
    const v = college[field];
    if (typeof v !== "number") return 0;
    return Math.min(100, Math.round((v / max) * 100));
  }

  const radarData = [
    {
      metric: "Placement %",
      A: normalize(collegeA, "placementPercent", 100),
      B: normalize(collegeB, "placementPercent", 100),
    },
    {
      metric: "Avg Package",
      A: normalize(collegeA, "avgPackage", 6),
      B: normalize(collegeB, "avgPackage", 6),
    },
    {
      metric: "Highest Package",
      A: normalize(collegeA, "highestPackage", 35),
      B: normalize(collegeB, "highestPackage", 35),
    },
    {
      metric: "Student Strength",
      A: normalize(collegeA, "totalStudents", 2000),
      B: normalize(collegeB, "totalStudents", 2000),
    },
    {
      metric: "IIC Rating",
      A: normalize(collegeA, "iicRating", 5),
      B: normalize(collegeB, "iicRating", 5),
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Compare Colleges
        </h1>
        <p className="mt-2 text-muted-foreground">
          Select any two colleges to compare their placement performance side by side
        </p>
      </div>

      <div className="mb-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Select value={slugA} onChange={(e) => setSlugA(e.target.value)} className="sm:w-72">
          {colleges.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </Select>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-white">
          <ArrowLeftRight className="h-4 w-4" />
        </div>
        <Select value={slugB} onChange={(e) => setSlugB(e.target.value)} className="sm:w-72">
          {colleges.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </Select>
      </div>

      <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {[collegeA, collegeB].map((c, idx) => (
          <Card key={idx} className="overflow-hidden p-0">
            <div className="relative h-20 bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500">
              <div className="absolute inset-0 bg-grid-pattern bg-[length:22px_22px] opacity-30" />
            </div>
            <CardContent className="pt-5">
              <h3 className="mb-2 font-semibold leading-snug">{c?.name ?? NA}</h3>
              <div className="mb-4 flex items-start gap-1.5 text-xs text-muted-foreground">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span className="line-clamp-2">{c?.location ?? NA}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <MetricPill icon={TrendingUp} label="Placement" value={c?.placementPercent !== null && c?.placementPercent !== undefined ? `${c.placementPercent}%` : NA} />
                <MetricPill icon={Award} label="Avg Package" value={c?.avgPackage !== null && c?.avgPackage !== undefined ? `${c.avgPackage} LPA` : NA} />
                <MetricPill icon={Trophy} label="Highest Package" value={c?.highestPackage !== null && c?.highestPackage !== undefined ? `${c.highestPackage} LPA` : NA} />
                <MetricPill icon={Users} label="Students" value={fmtNumber(c?.totalStudents)} />
              </div>
              {c?.nirfRank !== null && c?.nirfRank !== undefined && (
                <Badge className="mt-4">NIRF Rank #{c.nirfRank}</Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Key Metrics Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="metric" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "none",
                      boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey={collegeA?.name ?? "College A"}
                    fill="#6366f1"
                    radius={[6, 6, 0, 0]}
                  />
                  <Bar
                    dataKey={collegeB?.name ?? "College B"}
                    fill="#a855f7"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Overall Profile (Normalized)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid opacity={0.2} />
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11 }} />
                  <PolarRadiusAxis tick={{ fontSize: 10 }} domain={[0, 100]} />
                  <Radar
                    name={collegeA?.name ?? "College A"}
                    dataKey="A"
                    stroke="#6366f1"
                    fill="#6366f1"
                    fillOpacity={0.35}
                  />
                  <Radar
                    name={collegeB?.name ?? "College B"}
                    dataKey="B"
                    stroke="#a855f7"
                    fill="#a855f7"
                    fillOpacity={0.35}
                  />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MetricPill({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-secondary/60 p-3">
      <div className="mb-1 flex items-center gap-1.5 text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        <span className="text-[11px]">{label}</span>
      </div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}

export default function ComparePage() {
  return (
    <React.Suspense fallback={<div className="p-10 text-center text-muted-foreground">Loading comparison...</div>}>
      <CompareInner />
    </React.Suspense>
  );
}
