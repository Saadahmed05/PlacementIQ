"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, TrendingUp, Users, Award, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fmtNumber, fmtPackage, NA } from "@/lib/utils";
import type { College } from "@/lib/types";

export function CollegeCard({ college, index = 0 }: { college: College; index?: number }) {
  const placement =
    college.placementPercent !== null ? `${college.placementPercent}%` : NA;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.4) }}
    >
      <Card className="group flex h-full flex-col overflow-hidden p-0 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
        <div className="relative h-24 bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500">
          <div className="absolute inset-0 bg-grid-pattern bg-[length:24px_24px] opacity-30" />
          {college.nirfRank !== null && (
            <Badge className="absolute right-3 top-3 bg-white/90 text-indigo-700">
              NIRF #{college.nirfRank}
            </Badge>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="line-clamp-2 min-h-[3rem] text-base font-semibold leading-snug">
            {college.name}
          </h3>

          <div className="mt-2 flex items-start gap-1.5 text-xs text-muted-foreground">
            <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span className="line-clamp-2">{college.location ?? NA}</span>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg bg-secondary/60 p-2">
              <div className="flex items-center justify-center gap-1 text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="h-3 w-3" />
                <span className="text-sm font-bold">{placement}</span>
              </div>
              <div className="text-[10px] text-muted-foreground">Placed</div>
            </div>
            <div className="rounded-lg bg-secondary/60 p-2">
              <div className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                {college.avgPackage !== null ? college.avgPackage : NA}
              </div>
              <div className="text-[10px] text-muted-foreground">Avg LPA</div>
            </div>
            <div className="rounded-lg bg-secondary/60 p-2">
              <div className="text-sm font-bold text-violet-600 dark:text-violet-400">
                {college.highestPackage !== null ? college.highestPackage : NA}
              </div>
              <div className="text-[10px] text-muted-foreground">Top LPA</div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Users className="h-3.5 w-3.5" />
            <span>{fmtNumber(college.totalStudents)} students</span>
          </div>

          <div className="mt-auto pt-4">
            <Link href={`/colleges/${college.slug}`}>
              <Button variant="secondary" className="w-full group-hover:bg-indigo-600 group-hover:text-white">
                View Details
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
