import express from "express";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { calcRequestSchema, leadSchema } from "../shared/schemas";
import { estimate, templateSummary } from "./solar";
import { aiSummary } from "./ai";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const leadsFile = path.join(root, "data", "leads.json");
// API_PORT wins so a host-provided PORT for the dev web server cannot collide with it.
const port = Number(process.env.API_PORT ?? process.env.PORT ?? 3011);

const app = express();
app.use(express.json({ limit: "10kb" }));

app.post("/api/calculate", async (req, res) => {
  const parsed = calcRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.json({ ok: false, error: "कृपया 20 से 20000 के बीच यूनिट्स भरें।" });
  }
  const { units, backup } = parsed.data;
  const result = estimate(units, backup);
  const summary = (await aiSummary(units, backup, result)) || templateSummary(units, result);
  res.json({ ok: true, data: { ...result, summary_hindi: summary } });
});

app.post("/api/consultation", async (req, res) => {
  const parsed = leadSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ ok: false, error: parsed.error.issues[0]?.message ?? "जानकारी जाँचें" });
  }
  try {
    let leads: unknown[] = [];
    try {
      leads = JSON.parse(await fs.readFile(leadsFile, "utf8"));
    } catch {
      // first lead: file does not exist yet
    }
    leads.push({ ...parsed.data, created_at: new Date().toISOString() });
    await fs.mkdir(path.dirname(leadsFile), { recursive: true });
    await fs.writeFile(leadsFile, JSON.stringify(leads, null, 2));
    res.json({ ok: true, data: null });
  } catch (err) {
    console.error("[leads] Could not save lead", err);
    res.status(500).json({ ok: false, error: "save_failed" });
  }
});

if (process.env.NODE_ENV === "production") {
  const dist = path.join(root, "dist");
  app.use(express.static(dist));
  app.get("*", (_req, res) => res.sendFile(path.join(dist, "index.html")));
}

app.listen(port, () => {
  console.log(`MSP Solar API on http://localhost:${port}`);
});
