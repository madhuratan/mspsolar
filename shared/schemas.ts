import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().trim().min(1, "नाम भरें").max(100),
  mobile: z
    .string()
    .trim()
    .regex(/^[+0-9 -]{10,15}$/, "सही मोबाइल नंबर भरें"),
  city: z.string().trim().min(1, "शहर भरें").max(100),
  monthly_bill: z.string().trim().min(1, "बिल / यूनिट्स भरें").max(50),
});

export type Lead = z.infer<typeof leadSchema>;

export const calcRequestSchema = z.object({
  units: z.number().finite().min(20).max(20000),
  backup: z.boolean(),
});

export type CalcResult = {
  system_type: string;
  system_kw: number;
  panels: number;
  roof_area_sqft: number;
  monthly_generation_units: number;
  monthly_savings_inr: number;
  yearly_savings_inr: number;
  approx_cost_inr: number;
  subsidy_inr: number;
  payback_years: number;
  summary_hindi: string;
};

export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string };
