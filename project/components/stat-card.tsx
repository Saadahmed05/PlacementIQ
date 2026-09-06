"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function StatCard({
  label,
  value,
  icon,
  suffix,
  delay = 0,
  accent = "indigo",
}: {
  label: string;
  value: string | number;
  icon: React.ReactElement;
  suffix?: string;
  delay?: number;
  accent?: "indigo" | "violet" | "emerald" | "amber";
}) {
  const accents: Record<string, { wrap: string; icon: string }> = {
    indigo: { wrap: "bg-indigo-500/10", icon: "text-indigo-600 dark:text-indigo-400" },
    violet: { wrap: "bg-violet-500/10", icon: "text-violet-600 dark:text-violet-400" },
    emerald: { wrap: "bg-emerald-500/10", icon: "text-emerald-600 dark:text-emerald-400" },
    amber: { wrap: "bg-amber-500/10", icon: "text-amber-600 dark:text-amber-400" },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="glass-card rounded-2xl p-6"
    >
      <div
        className={cn(
          "mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl",
          accents[accent].wrap
        )}
      >
        {React.cloneElement(icon as React.ReactElement<{ className?: string }>, {
          className: cn("h-5 w-5", accents[accent].icon),
        })}
      </div>
      <div className="text-3xl font-bold tracking-tight">
        {value}
        {suffix && <span className="text-lg text-muted-foreground">{suffix}</span>}
      </div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </motion.div>
  );
}
