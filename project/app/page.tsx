import { Hero } from "@/components/hero";
import { StatCard } from "@/components/stat-card";
import { CollegeCard } from "@/components/college-card";
import { Button } from "@/components/ui/button";
import { getAllColleges, getDatasetStats } from "@/lib/data";
import { GraduationCap, TrendingUp, Award, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const stats = getDatasetStats();
  const colleges = getAllColleges();
  const featured = colleges
    .filter((c) => c.placementPercent !== null)
    .sort((a, b) => (b.placementPercent ?? 0) - (a.placementPercent ?? 0))
    .slice(0, 6);

  return (
    <div>
      <Hero />

      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <StatCard
            label="Colleges Tracked"
            value={stats.totalColleges}
            icon={<GraduationCap />}
            accent="indigo"
            delay={0}
          />
          <StatCard
            label="Avg. Placement Rate"
            value={stats.avgPlacementPercent ?? "—"}
            suffix="%"
            icon={<TrendingUp />}
            accent="emerald"
            delay={0.05}
          />
          <StatCard
            label="Avg. Package"
            value={stats.avgPackage ?? "—"}
            suffix=" LPA"
            icon={<Award />}
            accent="violet"
            delay={0.1}
          />
          <StatCard
            label="Students Tracked"
            value={stats.totalStudentsTracked.toLocaleString("en-IN")}
            icon={<Users />}
            accent="amber"
            delay={0.15}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Top Performing Colleges
            </h2>
            <p className="mt-1 text-muted-foreground">
              Ranked by reported campus placement percentage
            </p>
          </div>
          <Link href="/colleges" className="hidden sm:block">
            <Button variant="outline">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((c, i) => (
            <CollegeCard key={c.slug} college={c} index={i} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/colleges">
            <Button variant="outline">
              View All Colleges <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
