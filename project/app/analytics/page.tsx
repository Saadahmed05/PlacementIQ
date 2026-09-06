"use client";

import * as React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
  Treemap,
  Cell,
} from "recharts";
import { TrendingUp, Award, Trophy, Users, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import { StatCard } from "@/components/stat-card";
import { getAllColleges, getDatasetStats, getEliteBenchmarks } from "@/lib/data";
import { NA } from "@/lib/utils";

const COLORS = [
  "#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899",
  "#f43f5e", "#f97316", "#eab308", "#22c55e", "#14b8a6",
  "#06b6d4", "#3b82f6",
];

type MetricKey = "placementPercent" | "avgPackage" | "highestPackage" | "totalStudents";

const METRIC_OPTIONS: { key: MetricKey; label: string; suffix: string }[] = [
  { key: "placementPercent", label: "Placement %", suffix: "%" },
  { key: "avgPackage", label: "Average Package", suffix: " LPA" },
  { key: "highestPackage", label: "Highest Package", suffix: " LPA" },
  { key: "totalStudents", label: "Total Students", suffix: "" },
];

export default function AnalyticsPage() {
  const stats = getDatasetStats();
  const colleges = React.useMemo(() => getAllColleges(), []);
  const elite = React.useMemo(() => getEliteBenchmarks(), []);

  const [metric, setMetric] = React.useState<MetricKey>("placementPercent");
  const activeMetric = METRIC_OPTIONS.find((m) => m.key === metric)!;

  const barData = React.useMemo(() => {
    return colleges
      .filter((c) => c[metric] !== null)
      .sort((a, b) => (b[metric] as number) - (a[metric] as number))
      .slice(0, 15)
      .map((c) => ({
        name: c.name.length > 18 ? c.name.slice(0, 18) + "…" : c.name,
        fullName: c.name,
        value: c[metric] as number,
      }));
  }, [colleges, metric]);

  const scatterData = colleges
    .filter((c) => c.totalStudents !== null && c.placementPercent !== null)
    .map((c) => ({
      name: c.name,
      students: c.totalStudents,
      placement: c.placementPercent,
      avgPackage: c.avgPackage ?? 1,
    }));

  const treemapData = colleges
    .filter((c) => c.avgPackage !== null)
    .map((c) => ({
      name: c.name,
      size: c.avgPackage,
    }));

  const nirfRanked = colleges
    .filter((c) => c.nirfRank !== null)
    .sort((a, b) => (a.nirfRank ?? 0) - (b.nirfRank ?? 0));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Analytics Dashboard
        </h1>
        <p className="mt-2 text-muted-foreground">
          KPIs and charts recreated from the placement Power BI dashboard, backed
          by the live Excel dataset
        </p>
      </div>

      <div className="mb-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Avg. Placement %" value={stats.avgPlacementPercent ?? "—"} suffix="%" icon={<TrendingUp />} accent="emerald" />
        <StatCard label="Avg. Package" value={stats.avgPackage ?? "—"} suffix=" LPA" icon={<Award />} accent="indigo" />
        <StatCard label="Top Highest Package" value={stats.topHighestPackage ?? "—"} suffix=" LPA" icon={<Trophy />} accent="violet" />
        <StatCard label="Total Students Tracked" value={stats.totalStudentsTracked.toLocaleString("en-IN")} icon={<Users />} accent="amber" />
      </div>

      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>College Comparison by Metric</CardTitle>
            <CardDescription>Top 15 colleges, ranked by selected metric</CardDescription>
          </div>
          <Select
            value={metric}
            onChange={(e) => setMetric(e.target.value as MetricKey)}
            className="w-56"
          >
            {METRIC_OPTIONS.map((m) => (
              <option key={m.key} value={m.key}>
                {m.label}
              </option>
            ))}
          </Select>
        </CardHeader>
        <CardContent>
          <div className="h-[420px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="vertical" margin={{ left: 10, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={150}
                  tick={{ fontSize: 11 }}
                />
                <Tooltip
                  formatter={(value: number) => [`${value}${activeMetric.suffix}`, activeMetric.label]}
                  labelFormatter={(_, payload) => payload?.[0]?.payload?.fullName ?? ""}
                  contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
                />
                <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                  {barData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Students vs. Placement Rate</CardTitle>
            <CardDescription>Bubble size represents average package (LPA)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis type="number" dataKey="students" name="Students" tick={{ fontSize: 12 }} />
                  <YAxis type="number" dataKey="placement" name="Placement %" tick={{ fontSize: 12 }} />
                  <ZAxis type="number" dataKey="avgPackage" range={[60, 400]} name="Avg Package" />
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    formatter={(value: number, name: string) => [value, name]}
                    contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
                  />
                  <Scatter data={scatterData} fill="#6366f1" fillOpacity={0.7} />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Package Distribution</CardTitle>
            <CardDescription>Treemap sized by average package (LPA)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <Treemap
                  data={treemapData}
                  dataKey="size"
                  stroke="#fff"
                  content={<TreemapContent />}
                />
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-4 w-4" /> NIRF Ranked Colleges
          </CardTitle>
          <CardDescription>
            Colleges with an official NIRF Innovation Rank reported in the dataset
          </CardDescription>
        </CardHeader>
        <CardContent>
          {nirfRanked.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">{NA}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left text-muted-foreground">
                    <th className="pb-3 pr-4 font-medium">NIRF Rank</th>
                    <th className="pb-3 pr-4 font-medium">College</th>
                    <th className="pb-3 pr-4 font-medium">Placement %</th>
                    <th className="pb-3 font-medium">Avg Package</th>
                  </tr>
                </thead>
                <tbody>
                  {nirfRanked.map((c) => (
                    <tr key={c.slug} className="border-b border-border/50 last:border-0">
                      <td className="py-3 pr-4 font-semibold text-indigo-600 dark:text-indigo-400">
                        #{c.nirfRank}
                      </td>
                      <td className="py-3 pr-4">{c.name}</td>
                      <td className="py-3 pr-4">
                        {c.placementPercent !== null ? `${c.placementPercent}%` : NA}
                      </td>
                      <td className="py-3">
                        {c.avgPackage !== null ? `${c.avgPackage} LPA` : NA}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {elite.length > 0 && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Elite Global Benchmark</CardTitle>
            <CardDescription>
              How the tracked colleges&apos; average package compares to IITs, Oxford,
              and Cambridge (from the reference dataset)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={elite.map((e) => ({ name: e.name, value: e.avgPackage ?? 0 }))}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    formatter={(v: number) => [`${v} LPA`, "Avg Package"]}
                    contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
                  />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                    {elite.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function TreemapContent(props: any) {
  const { x, y, width, height, index, depth, name } = props;
  if (width < 0 || height < 0) return null;

  // Recharts' Treemap always wraps the flat `data` array we pass in inside a
  // synthetic root/container node before laying out the leaves — see
  // getDerivedStateFromProps in recharts' Treemap.js, which builds
  // `{ children: data, x: 0, y: 0, width, height }` and computes it at
  // depth 0. That root node has no `name`/`size` of its own (only
  // `children`), but it is still passed through to this content renderer
  // because renderNode() invokes `content` for every node in the tree, not
  // just the leaves. Our actual college data only ever appears at depth 1.
  // Rendering that depth-0 wrapper as if it were a leaf is what produced
  // `Cannot read properties of undefined (reading 'length')` on `name`.
  const isRootContainer = depth === 0;

  if (isRootContainer) {
    // Nothing to label here — it's the invisible bounding box for the
    // whole chart, not a college. Render it fully transparent so it can't
    // tint or outline the real cells sitting on top of it.
    return (
      <rect x={x} y={y} width={width} height={height} fill="transparent" stroke="none" />
    );
  }

  // Defensive guard for genuine leaf nodes: our data pipeline (see
  // `treemapData` above) only ever includes colleges with a real `name`
  // string, so this branch should not trigger in practice. It exists so
  // that if a future dataset ever contains a record with a missing name,
  // the chart degrades gracefully (still shows the correctly-sized/colored
  // cell) instead of crashing the whole Analytics page.
  const hasValidName = typeof name === "string" && name.length > 0;
  const displayName = hasValidName
    ? name.length > 16
      ? name.slice(0, 16) + "…"
      : name
    : "Unnamed college";

  const color = COLORS[index % COLORS.length];
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{ fill: color, stroke: "#fff", strokeWidth: 2, fillOpacity: 0.85 }}
      />
      {width > 60 && height > 30 && (
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#fff"
          fontSize={10}
          fontWeight={600}
        >
          {displayName}
        </text>
      )}
    </g>
  );
}
