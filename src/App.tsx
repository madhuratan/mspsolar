import { useState, type FormEvent } from "react";
import { leadSchema, type CalcResult } from "../shared/schemas";
import { estimate, templateSummary } from "../shared/solar";

const PHONE_DISPLAY = "+91-7357562365";
const PHONE_TEL = "tel:+917357562365";
const WHATSAPP_NUMBER = "917357562365";
const EMAIL = "ratanmadhupareek@gmail.com";
const WHATSAPP_INSPECTION = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("नमस्ते, मुझे Free Site Inspection चाहिए।")}`;

const services = [
  {
    icon: "☀️",
    title: "Complete Solution",
    text: "3kW से लेकर 50kW+ तक के ऑन-ग्रिड, ऑफ-ग्रिड (Off-Grid) और हाइब्रिड (Hybrid) सोलर सिस्टम्स का इंस्टॉलेशन।",
  },
  {
    icon: "📑",
    title: "Subsidy Assistance",
    text: "पीएम-सूर्य घर मुफ्त बिजली योजना के तहत ₹78,000 तक की सरकारी सब्सिडी (DCR) की पूरी कागज़ी कार्रवाई।",
  },
  {
    icon: "🏦",
    title: "Easy Bank Loan Finance",
    text: "0-डाउन पेमेंट और आसान मासिक किश्तों (EMI) पर बैंकों के माध्यम से सोलर लोन की सुविधा।",
  },
  {
    icon: "🛠️",
    title: "Brands We Work With",
    text: "TATA, ADANI, और WAAREE के अधिकृत कंपोनेंट्स की उपलब्धता।",
  },
];

const inr = (n: number) => "₹" + Math.round(n).toLocaleString("en-IN");

function Logo({ className = "" }: { className?: string }) {
  // white badge keeps the blue/green logo readable on the dark header and footer
  return (
    <span className={`inline-flex items-center rounded-xl bg-white px-3 py-2 shadow-md ${className}`}>
      <img src={`${import.meta.env.BASE_URL}logo.webp`} alt="Potaliya Enterprises Pvt. Ltd." width={640} height={183} className="h-11 w-auto sm:h-14" />
    </span>
  );
}

function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5">
        <Logo />
        <a href={PHONE_TEL} className="hidden text-sm font-semibold text-primary-foreground sm:block">
          📱 {PHONE_DISPLAY}
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden">
      <img
        src={`${import.meta.env.BASE_URL}hero.jpg`}
        alt="जयपुर में छत पर सोलर पैनल"
        width={1600}
        height={912}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="hero-overlay absolute inset-0" />
      <div className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-center px-5 pt-24 pb-16">
        <span className="mb-5 w-fit rounded-full bg-sun/20 px-4 py-1 text-sm font-semibold text-sun">
          5+ वर्षों का अनुभव • Jaipur
        </span>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight text-primary-foreground md:text-6xl">
          5+ वर्षों के अटूट विश्वास के साथ—जयपुर के सबसे भरोसेमंद <span className="text-sun">सोलर कंसलटेंट</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-primary-foreground/85 md:text-xl">
          On-Grid, Off-Grid और Hybrid सोलर सिस्टम्स के साथ अपने बिजली के बिल में करें भारी बचत।
        </p>
        <a
          href={WHATSAPP_INSPECTION}
          target="_blank"
          rel="noreferrer"
          className="sun-glow mt-9 w-fit rounded-full bg-sun px-8 py-4 text-lg font-bold text-sun-foreground transition hover:scale-105"
        >
          Get Free Site Inspection →
        </a>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <p className="font-semibold text-sun">Our Expertise &amp; Services</p>
      <h2 className="mt-2 text-3xl font-extrabold text-primary md:text-4xl">हमारी सेवाएँ</h2>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => (
          <div key={s.title} className="rounded-2xl border bg-card p-6 transition hover:-translate-y-1 hover:border-sun">
            <div className="text-4xl">{s.icon}</div>
            <h3 className="mt-4 text-lg font-bold text-primary">{s.title}</h3>
            <p className="mt-2 text-muted-foreground">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-[1fr_2fr]">
        <div className="text-center">
          <div className="text-8xl font-extrabold text-sun">5+</div>
          <div className="mt-2 text-lg">वर्षों का तजुर्बा</div>
        </div>
        <div>
          <p className="font-semibold text-sun">About the Expert</p>
          <h2 className="mt-2 text-3xl font-extrabold">मधुसूदन पारीक</h2>
          <blockquote className="mt-6 space-y-4 border-l-4 border-sun pl-5 text-lg leading-relaxed text-primary-foreground/90">
            <p>
              "मैं मधुसूदन पारीक, पिछले 5+ वर्षों से सेल्स, मार्केटिंग और सौर ऊर्जा के क्षेत्र में कार्यरत हूँ। मेरा उद्देश्य है कि हर
              ग्राहक को उसके बजट और ज़रूरत के अनुसार बेहतरीन गुणवत्ता वाला सोलर सिस्टम मिले, वह भी पूरी ईमानदारी, पारदर्शिता और
              बिना किसी परेशानी के।
            </p>
            <p>
              मेरा मानना है कि बाज़ार में पहचान केवल वादों से नहीं, बल्कि भरोसे, अनुभव और बेहतर सेवाओं से बनती है। मेरे लिए आपकी
              संतुष्टि सिर्फ़ एक लक्ष्य नहीं, बल्कि मेरी सबसे बड़ी उपलब्धि और असली कमाई है।"
            </p>
          </blockquote>
        </div>
      </div>
    </section>
  );
}

function WhyUs() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <p className="font-semibold text-sun">Why Choose Us?</p>
      <h2 className="mt-2 text-3xl font-extrabold text-primary md:text-4xl">ग्राहकों की नगद बचत का गणित</h2>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl bg-accent p-8">
          <h3 className="text-xl font-bold text-primary">🤝 No Company Pressure</h3>
          <p className="mt-3 text-accent-foreground/80">
            हम किसी एक कंपनी के बंधे हुए कर्मचारी नहीं हैं, इसलिए हम ग्राहक को वही ब्रांड (Tata/Adani/Waaree) और वही रेट रिकमेंड
            करते हैं जो ग्राहक के बजट और फायदे में हो।
          </p>
        </div>
        <div className="rounded-2xl bg-accent p-8">
          <h3 className="text-xl font-bold text-primary">🔄 End-to-End Support</h3>
          <p className="mt-3 text-accent-foreground/80">
            साइट सर्वे से लेकर, नेट-मीटरिंग, सब्सिडी फाइलिंग और बैंक लोन पास कराने तक का पूरा काम हमारी बैक-एंड टीम संभालती है।
          </p>
        </div>
      </div>
    </section>
  );
}

function Calculator() {
  const [units, setUnits] = useState("");
  const [backup, setBackup] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<CalcResult | null>(null);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const n = Number(units);
    if (!Number.isFinite(n) || n < 20 || n > 20000) {
      setError("कृपया 20 से 20000 के बीच यूनिट्स भरें।");
      return;
    }
    setError("");
    const est = estimate(n, backup);
    setResult({ ...est, summary_hindi: templateSummary(n, est) });
  }

  const rows: [string, string][] = result
    ? [
        ["सिस्टम साइज़", `${result.system_kw} kW`],
        ["पैनल्स", `${result.panels}`],
        ["छत की जगह", `~${Math.round(result.roof_area_sqft)} sq ft`],
        ["मासिक उत्पादन", `~${Math.round(result.monthly_generation_units)} units`],
        ["मासिक बचत", inr(result.monthly_savings_inr)],
        ["सालाना बचत", inr(result.yearly_savings_inr)],
        ["अनुमानित लागत", inr(result.approx_cost_inr)],
        ["सब्सिडी", inr(result.subsidy_inr)],
        ["पेबैक", `~${result.payback_years.toFixed(1)} वर्ष`],
      ]
    : [];

  return (
    <section id="calculator" className="mx-auto max-w-6xl px-5 py-20">
      <p className="font-semibold text-sun">AI Solar Calculator</p>
      <h2 className="mt-2 text-3xl font-extrabold text-primary md:text-4xl">आपके घर के लिए कितना सोलर?</h2>
      <p className="mt-3 text-muted-foreground">
        अपनी मासिक बिजली यूनिट्स डालें — AI आपके लिए सही सिस्टम और बचत का अनुमान बताएगा।
      </p>
      <form
        onSubmit={onSubmit}
        className="mt-8 flex flex-col gap-4 rounded-2xl border bg-card p-6 md:flex-row md:items-center"
      >
        <input
          type="number"
          inputMode="numeric"
          value={units}
          onChange={(e) => setUnits(e.target.value)}
          placeholder="मासिक यूनिट्स (जैसे 400)"
          className="flex-1 rounded-xl border bg-background px-4 py-3 outline-none focus:border-sun"
        />
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={backup}
            onChange={(e) => setBackup(e.target.checked)}
            className="h-4 w-4 accent-sun"
          />
          बैटरी बैकअप चाहिए (Hybrid)
        </label>
        <button className="rounded-xl bg-sun px-6 py-3 font-bold text-sun-foreground">सुझाव पाएँ</button>
      </form>
      {error && <p className="mt-4 text-destructive">{error}</p>}
      {result && (
        <div className="mt-8 rounded-2xl bg-primary p-7 text-primary-foreground">
          <div className="text-sm text-sun">सुझाया गया: {result.system_type}</div>
          <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3">
            {rows.map(([label, value]) => (
              <div key={label} className="rounded-xl bg-primary-foreground/10 p-4">
                <div className="text-xs text-primary-foreground/70">{label}</div>
                <div className="mt-1 text-xl font-extrabold">{value}</div>
              </div>
            ))}
          </div>
          <p className="mt-6 leading-relaxed text-primary-foreground/90">{result.summary_hindi}</p>
          <p className="mt-3 text-xs text-primary-foreground/60">
            * ये अनुमान हैं। सटीक जानकारी के लिए Free Site Inspection बुक करें।
          </p>
        </div>
      )}
    </section>
  );
}

function Contact() {
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const parsed = leadSchema.safeParse(Object.fromEntries(new FormData(form)));
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "जानकारी जाँचें");
      return;
    }
    setError("");
    const lead = parsed.data;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      `नमस्ते, मुझे सोलर कंसल्टेशन चाहिए।\nनाम: ${lead.name}\nमोबाइल: ${lead.mobile}\nशहर: ${lead.city}\nपिछला बिल: ${lead.monthly_bill}`,
    )}`;
    setWhatsappUrl(url);
    setDone(true);
    window.open(url, "_blank", "noopener");
    form.reset();
  }

  const input =
    "w-full rounded-xl border bg-background px-4 py-3 outline-none focus:border-sun focus:ring-2 focus:ring-ring/40";

  return (
    <section id="contact" className="bg-secondary">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-2">
        <div>
          <p className="font-semibold text-sun">Contact &amp; Consultation</p>
          <h2 className="mt-2 text-3xl font-extrabold text-primary md:text-4xl">संपर्क करें और अपनी फाइल प्रोसेस करें</h2>
          <p className="mt-4 text-muted-foreground">अपनी जानकारी भरें, हम जल्द आपसे संपर्क करेंगे। या सीधे WhatsApp करें।</p>
          <a
            href={WHATSAPP_INSPECTION}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-block rounded-full border-2 border-primary px-6 py-3 font-bold text-primary hover:bg-primary hover:text-primary-foreground"
          >
            WhatsApp पर बात करें
          </a>
        </div>
        <form onSubmit={onSubmit} className="space-y-4 rounded-2xl bg-card p-7 shadow-lg">
          <input name="name" placeholder="आपका नाम" maxLength={100} className={input} />
          <input name="mobile" type="tel" placeholder="मोबाइल नंबर" maxLength={15} className={input} />
          <input name="city" placeholder="शहर" maxLength={100} className={input} />
          <input name="monthly_bill" placeholder="पिछले महीने का बिल (₹ / Units / kW)" maxLength={50} className={input} />
          {error && <p className="text-sm text-destructive">{error}</p>}
          {done && (
            <div className="space-y-2">
              <p className="text-sm font-semibold text-primary">धन्यवाद! आपकी जानकारी मिल गई है।</p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="block rounded-xl border-2 border-primary py-3 text-center font-bold text-primary hover:bg-primary hover:text-primary-foreground"
              >
                WhatsApp पर भेजें →
              </a>
            </div>
          )}
          <button className="w-full rounded-xl bg-sun py-3.5 text-lg font-bold text-sun-foreground transition hover:opacity-90">
            Submit करें
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-12 md:grid-cols-2">
        <div>
          <Logo />
          <a href="https://www.potaliyaenterprises.com/" target="_blank" rel="noreferrer" className="mt-2 block text-primary-foreground/70 hover:text-sun">
            www.potaliyaenterprises.com
          </a>
        </div>
        <ul className="space-y-2">
          <li>
            📱 Mobile:{" "}
            <a href={PHONE_TEL} className="hover:text-sun">
              {PHONE_DISPLAY}
            </a>
          </li>
          <li>
            📧 Email:{" "}
            <a href={`mailto:${EMAIL}`} className="hover:text-sun">
              {EMAIL}
            </a>
          </li>
          <li>📍 Location: Jaipur, Rajasthan</li>
        </ul>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header />
      <Hero />
      <Services />
      <About />
      <WhyUs />
      <Calculator />
      <Contact />
      <Footer />
    </div>
  );
}
