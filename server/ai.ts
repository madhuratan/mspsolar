import Anthropic from "@anthropic-ai/sdk";
import type { CalcResult } from "../shared/schemas";

let client: Anthropic | null = null;
let disabled = false; // set after an auth failure so later requests skip the call

const SYSTEM = `You write short advice for MSP Solar Consultancy, a solar consultant in Jaipur, Rajasthan.
Given a household's monthly electricity use and a calculated solar estimate, write 2-3 sentences in simple Hindi (Devanagari) for the homeowner.
Use only the numbers provided; do not invent prices, brands or schemes. Mention the recommended system, the savings, and that a free site inspection gives exact figures.
Reply with the Hindi text only.`;

// Returns a Hindi summary written by Claude, or null so the caller can fall back
// to the template summary.
export async function aiSummary(
  units: number,
  backup: boolean,
  estimate: Omit<CalcResult, "summary_hindi">,
): Promise<string | null> {
  if (disabled) return null;
  try {
    client ??= new Anthropic();
    // Server-side fallback lets a refused request retry on a fallback model automatically.
    const response = await client.beta.messages.create({
      model: "claude-opus-5-5",
      max_tokens: 1024,
      output_config: { effort: "low" },
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system: SYSTEM,
      messages: [
        {
          role: "user",
          content: `Monthly units: ${units}\nBattery backup wanted: ${backup ? "yes" : "no"}\nEstimate: ${JSON.stringify(estimate)}`,
        },
      ],
    } as Anthropic.Beta.MessageCreateParamsNonStreaming);

    if (response.stop_reason === "refusal") return null;
    const text = response.content
      .flatMap((block) => (block.type === "text" ? [block.text] : []))
      .join("")
      .trim();
    return text || null;
  } catch (err) {
    if (err instanceof Anthropic.AuthenticationError) {
      disabled = true;
      console.warn("[ai] No valid Claude credentials; using template summaries.");
    } else if (err instanceof Anthropic.APIError) {
      console.warn(`[ai] Claude API error ${err.status}; using template summary.`);
    } else {
      // No credentials configured at all: stop trying until the server restarts.
      disabled = /authentication method/i.test((err as Error).message);
      console.warn("[ai] Claude request failed; using template summary.", (err as Error).message);
    }
    return null;
  }
}
