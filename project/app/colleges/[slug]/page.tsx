import * as React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Globe,
  Mail,
  Phone,
  User,
  TrendingUp,
  Award,
  Users,
  BadgeCheck,
  Rocket,
  ShieldCheck,
  BookOpen,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllSlugs, getCollegeBySlug } from "@/lib/data";
import { fmt, fmtNumber, NA } from "@/lib/utils";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function CollegeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const college = getCollegeBySlug(slug);
  if (!college) notFound();

  const metrics = [
    {
      label: "Campus Placement",
      value: college.placementPercent !== null ? `${college.placementPercent}%` : NA,
      icon: TrendingUp,
      color: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
    },
    {
      label: "Average Package",
      value: college.avgPackage !== null ? `${college.avgPackage} LPA` : NA,
      icon: Award,
      color: "text-indigo-600 dark:text-indigo-400 bg-indigo-500/10",
    },
    {
      label: "Highest Package",
      value: college.highestPackage !== null ? `${college.highestPackage} LPA` : NA,
      icon: Award,
      color: "text-violet-600 dark:text-violet-400 bg-violet-500/10",
    },
    {
      label: "Total Students",
      value: fmtNumber(college.totalStudents),
      icon: Users,
      color: "text-amber-600 dark:text-amber-400 bg-amber-500/10",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Link href="/colleges" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="h-4 w-4" /> Back to all colleges
      </Link>

      <div className="glass-card mb-8 overflow-hidden rounded-2xl">
        <div className="relative h-36 bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500">
          <div className="absolute inset-0 bg-grid-pattern bg-[length:28px_28px] opacity-30" />
        </div>
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {college.name}
              </h1>
              <div className="mt-2 flex items-start gap-1.5 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{college.location ?? NA}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {college.nirfRank !== null && (
                <Badge variant="default">NIRF Rank #{college.nirfRank}</Badge>
              )}
              {college.naacGrade && (
                <Badge variant="secondary">NAAC: {college.naacGrade}</Badge>
              )}
              {college.universityCode && (
                <Badge variant="muted">Code: {college.universityCode}</Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {metrics.map((m) => (
          <Card key={m.label} className="p-6">
            <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${m.color}`}>
              <m.icon className="h-5 w-5" />
            </div>
            <div className="text-2xl font-bold">{m.value}</div>
            <div className="mt-1 text-xs text-muted-foreground">{m.label}</div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BadgeCheck className="h-5 w-5 text-indigo-600" />
                Institutional Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <DetailRow label="Annual Student Intake" value={fmt(college.annualIntake)} />
              <DetailRow label="Total Students (reported)" value={fmt(college.totalStudentsRaw)} />
              <DetailRow label="Placement Detail" value={fmt(college.placementRaw)} />
              <DetailRow label="NIRF Innovation Rank" value={fmt(college.nirfRankRaw)} />
              <DetailRow label="NAAC Accreditation" value={fmt(college.naacGrade)} />
              <DetailRow
                label="MHRD IIC Star Rating"
                value={fmt(college.iicRatingRaw)}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Rocket className="h-5 w-5 text-violet-600" />
                Innovation & Entrepreneurship
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <DetailRow label="NISP Policy Adoption" value={fmt(college.nispPolicy)} />
              <DetailRow label="EDC Status" value={fmt(college.edcStatus)} />
              <DetailRow label="Current Student Startups" value={fmt(college.studentStartupsRaw)} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-amber-600" />
                Industry Certification Needs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {fmt(college.certificationNeeds)}
              </p>
            </CardContent>
          </Card>

          {college.researchNotes.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                  Verified Research Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {college.researchNotes.map((note, i) => (
                  <div key={i} className="rounded-xl bg-secondary/60 p-4 text-sm">
                    <div className="mb-1 font-medium">{note.field ?? NA}</div>
                    <div className="text-muted-foreground">{note.value ?? NA}</div>
                    <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                      <span>Source: {note.source ?? NA}</span>
                      {note.url && (
                        <a
                          href={note.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-indigo-600 hover:underline dark:text-indigo-400"
                        >
                          View <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                      {note.dateAccessed && <span>· Accessed {note.dateAccessed}</span>}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <ContactRow icon={User} label="Key Decision Maker" value={fmt(college.keyContact)} />
              <ContactRow icon={Phone} label="Phone" value={fmt(college.phone)} />
              <ContactRow icon={Mail} label="Email" value={fmt(college.email)} />
              <ContactRow
                icon={Globe}
                label="Website"
                value={college.website ?? NA}
                href={college.website ?? undefined}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Codes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <DetailRow label="University Code" value={fmt(college.universityCode)} />
              <DetailRow label="Counselling Code" value={fmt(college.counsellingCode)} />
            </CardContent>
          </Card>

          <Link href={`/compare?a=${college.slug}`}>
            <Button className="w-full" size="lg">
              Compare This College
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-border/60 pb-3 last:border-0 last:pb-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <span className="text-sm sm:max-w-[60%] sm:text-right">{value}</span>
    </div>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
}) {
  const content = href ? (
    <a
      href={href.startsWith("http") ? href : `https://${href}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-indigo-600 hover:underline dark:text-indigo-400 break-all"
    >
      {value}
    </a>
  ) : (
    <span className="break-all">{value}</span>
  );

  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="mt-0.5">{content}</div>
      </div>
    </div>
  );
}
