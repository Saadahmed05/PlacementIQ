"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, ArrowRight, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Hero() {
  const router = useRouter();
  const [query, setQuery] = React.useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(query ? `/colleges?q=${encodeURIComponent(query)}` : "/colleges");
  }

  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:pt-24">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl animate-float" />

      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Live placement data · 30 colleges tracked
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-4xl font-bold tracking-tight sm:text-6xl"
        >
          Placement analytics,
          <br />
          <span className="gradient-text">reimagined for clarity.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg"
        >
          Explore verified placement percentages, average and highest packages,
          NIRF standing, and institutional insights across JNTUA-affiliated
          colleges — all in one beautifully simple dashboard.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          onSubmit={handleSearch}
          className="mx-auto mt-8 flex max-w-xl items-center gap-2"
        >
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search colleges by name or location..."
              className="h-14 pl-11 text-base"
            />
          </div>
          <Button type="submit" size="lg" className="shrink-0">
            Search
          </Button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-3"
        >
          <a href="/compare">
            <Button variant="secondary" size="lg">
              Compare Colleges
              <ArrowRight className="h-4 w-4" />
            </Button>
          </a>
          <a href="/analytics">
            <Button variant="outline" size="lg">
              <BarChart3 className="h-4 w-4" />
              Explore Analytics
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
