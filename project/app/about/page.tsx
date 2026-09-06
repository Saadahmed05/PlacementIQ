import { Card, CardContent } from "@/components/ui/card";
import { getDatasetStats } from "@/lib/data";
import { GraduationCap, Database, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  const stats = getDatasetStats();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">About PlacementIQ</h1>
      <p className="mt-4 text-muted-foreground leading-relaxed">
        PlacementIQ is a placement analytics portal built to make campus
        placement data — packages, placement percentages, rankings, and
        institutional profiles — easy to explore, compare, and understand
        across {stats.totalColleges} JNTUA-affiliated colleges.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <GraduationCap className="mb-3 h-6 w-6 text-indigo-600" />
            <h3 className="font-semibold">{stats.totalColleges} Colleges</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Engineering, management, and pharmacy institutions tracked.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <Database className="mb-3 h-6 w-6 text-violet-600" />
            <h3 className="font-semibold">Source-Verified Data</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Every figure traces back to the underlying dataset — nothing is
              invented or estimated silently.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <ShieldCheck className="mb-3 h-6 w-6 text-emerald-600" />
            <h3 className="font-semibold">Transparent Gaps</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Missing fields are clearly labeled &ldquo;Data Not Available&rdquo; rather
              than guessed at.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 text-sm text-muted-foreground leading-relaxed">
        <p>
          This portal is an informational analytics tool. Placement figures
          are self-reported by institutions or compiled from public sources
          and should be independently verified before making admission
          decisions.
        </p>
      </div>
    </div>
  );
}
