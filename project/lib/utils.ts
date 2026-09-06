import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const NA = "Data Not Available";

export function fmt(
  value: string | number | null | undefined,
  suffix = ""
): string {
  if (value === null || value === undefined || value === "") return NA;
  return `${value}${suffix}`;
}

export function fmtNumber(
  value: number | null | undefined,
  suffix = ""
): string {
  if (value === null || value === undefined || Number.isNaN(value)) return NA;
  return `${value.toLocaleString("en-IN")}${suffix}`;
}

export function fmtPackage(value: number | null | undefined): string {
  if (value === null || value === undefined) return NA;
  return `${value} LPA`;
}

export function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
