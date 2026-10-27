import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowDown,
  Wallet,
  PiggyBank,
  Receipt,
  Search,
  MessageCircle,
  HandCoins,
  Scale,
  MapPin,
  Gauge,
  CalendarDays,
  TrendingDown,
  Percent,
  BadgeDollarSign,
  Calculator,
  FileText,
  Shuffle,
  Info,
  RotateCcw,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { track } from "@/lib/analytics";
import { quizQuestions, quizResult, type QuizAnswers } from "@/lib/quiz";
import heroCar from "@/assets/hero-car.jpg";
import carSedan from "@/assets/car-sedan.jpg";
import carPickup from "@/assets/car-pickup.jpg";
import carHatch from "@/assets/car-hatch.jpg";

const TITLE = "Autos a CRÉDITO: entiende tus opciones | Seminuevos.com";
const DESC =
  "Explora autos publicados por agencias y dealers en México y aprende qué revisar antes de elegir una opción de CRÉDITO.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const btn =
  "inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-7 text-base font-semibold transition-all active:scale-[0.98]";
const btnPrimary = `${btn} bg-primary text-primary-foreground hover:brightness-110 shadow-card`;
const btnGhost = `${btn} border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground`;

function cta(location: string) {
  track("credit_cta_click", { location });
}

function Eyebrow({ children, tone = "primary" }: { children: React.ReactNode; tone?: "primary" | "accent" }) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest ${
        tone === "primary" ? "bg-primary-soft text-primary" : "bg-accent-soft text-accent"
      }`}
    >
      {children}
    </span>
  );
}

function Index() {
  useEffect(() => {
    track("credit_landing_view");
  }, []);

  return (
    <div className="min-h-screen bg-background pb-24 font-sans text-foreground md:pb-0">
      <Header />
      <Hero />
      <ThreeThings />
      <Structure />
      <Quiz />
      <Inventory />
      <NextSteps />
      <Comparison />
      <Mistakes />
      <Faq />
      <FinalCta />
      <Footer />
      <StickyCta />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <a href="#" className="font-display text-xl font-extrabold tracking-tight text-secondary">
          seminuevos<span className="text-primary">.com</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          <a href="#estructura" className="hover:text-primary">Entender el CRÉDITO</a>
          <a href="#quiz" className="hover:text-primary">Quiz</a>
          <a href="#faq" className="hover:text-primary">Preguntas</a>
          <a href="#autos" onClick={() => cta("header")} className="rounded-full bg-secondary px-5 py-2.5 text-secondary-foreground hover:bg-primary">
            Explorar autos
          </a>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-5 pt-10 pb-20 md:grid-cols-12 md:pt-20">
      <div className="md:col-span-6 md:pt-8">
        <Eyebrow>Autos a CRÉDITO</Eyebrow>
        <h1 className="mt-6 text-[2.6rem] leading-[1.02] font-extrabold text-secondary md:text-7xl">
          Tu próximo auto puede empezar con una buena decisión de <span className="text-primary">CRÉDITO</span>
        </h1>
        <p className="mt-6 max-w-lg text-lg text-muted-foreground">
          Explora autos publicados por agencias y dealers y conoce qué debes revisar antes de elegir una opción de CRÉDITO.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#autos" onClick={() => cta("hero_primary")} className={btnPrimary}>
            Explorar autos <ArrowRight className="size-5" />
          </a>
          <a href="#estructura" onClick={() => cta("hero_secondary")} className={btnGhost}>
            Entender el CRÉDITO
          </a>
        </div>
      </div>

      <div className="relative md:col-span-6">
        <div className="relative ml-auto w-[88%] overflow-hidden rounded-[2rem] shadow-card">
          <img src={heroCar} alt="SUV roja estacionada en una calle de la Ciudad de México" width={1024} height={1280} className="aspect-[4/5] w-full object-cover" />
        </div>
        {/* listing fragment */}
        <div className="absolute top-8 left-0 w-56 rounded-2xl bg-background p-4 shadow-card">
          <p className="text-xs font-semibold text-muted-foreground">Publicado por Agencia</p>
          <p className="mt-1 font-display text-lg font-bold text-secondary">SUV Compacta 2021</p>
          <div className="mt-2 flex gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><Gauge className="size-3.5" />42,000 km</span>
            <span className="flex items-center gap-1"><MapPin className="size-3.5" />CDMX</span>
          </div>
          <p className="mt-3 font-display text-xl font-extrabold text-primary">$389,000</p>
        </div>
        <div className="absolute bottom-28 -left-1 rounded-2xl bg-secondary px-5 py-4 text-secondary-foreground shadow-card md:-left-6">
          <p className="text-xs uppercase tracking-widest opacity-70">Enganche</p>
          <p className="font-display text-2xl font-bold">¿Cuánto?</p>
        </div>
        <div className="absolute right-4 bottom-36 rounded-2xl bg-accent px-5 py-4 text-accent-foreground shadow-card">
          <p className="text-xs uppercase tracking-widest opacity-80">Plazo</p>
          <p className="font-display text-2xl font-bold">¿Meses?</p>
        </div>
        <div className="absolute bottom-6 left-[18%] rounded-2xl bg-primary px-5 py-4 text-primary-foreground shadow-card">
          <p className="text-xs uppercase tracking-widest opacity-80">CAT</p>
          <p className="font-display text-2xl font-bold">Compáralo</p>
        </div>
        <p className="mt-6 flex items-center justify-end gap-2 text-sm text-muted-foreground">
          <Info className="size-4 text-accent" /> Seminuevos.com no otorga CRÉDITOS.
        </p>
      </div>
    </section>
  );
}

function SectionTitle({ eyebrow, title, tone }: { eyebrow: string; title: React.ReactNode; tone?: "primary" | "accent" }) {
  return (
    <div className="max-w-3xl">
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2 className="mt-4 text-4xl leading-[1.05] font-extrabold text-secondary md:text-6xl">{title}</h2>
    </div>
  );
}

function ThreeThings() {
  const items = [
    { icon: Wallet, t: "Cuánto puedes pagar", d: "No pienses solo en el precio del auto. Considera también el pago mensual que puedes asumir.", c: "bg-card" },
    { icon: PiggyBank, t: "Cuánto darás de enganche", d: "Un enganche mayor puede reducir el monto que necesitas solicitar a CRÉDITO.", c: "bg-accent-soft md:translate-y-10" },
    { icon: Receipt, t: "Cuánto terminarás pagando", d: "Compara tasa, CAT, plazo, comisiones y costo total.", c: "bg-primary-soft md:translate-y-20" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-20">
      <SectionTitle eyebrow="3 cosas" title="Antes de elegir un CRÉDITO, revisa esto" />
      <div className="mt-12 grid gap-5 md:grid-cols-3 md:pb-20">
        {items.map((it, i) => (
          <article key={it.t} className={`rounded-[2rem] p-8 md:p-10 ${it.c}`}>
            <div className="flex items-center justify-between">
              <it.icon className="size-10 text-secondary" strokeWidth={1.5} />
              <span className="font-display text-6xl font-extrabold text-secondary/15">0{i + 1}</span>
            </div>
            <h3 className="mt-10 text-2xl font-bold text-secondary md:text-3xl">{it.t}</h3>
            <p className="mt-3 text-muted-foreground">{it.d}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Structure() {
  const steps = [
    { label: "Precio del auto", ex: "$300,000", cls: "bg-card text-secondary" },
    { op: "menos" },
    { label: "Enganche", ex: "$60,000", cls: "bg-accent-soft text-secondary" },
    { op: "igual" },
    { label: "Monto a CRÉDITO", ex: "$240,000", cls: "bg-secondary text-secondary-foreground" },
    { op: "más" },
    { label: "Intereses y costos", ex: "Según la oferta", cls: "bg-primary-soft text-secondary" },
    { op: "igual" },
    { label: "Pagos durante el plazo", ex: "Costo total", cls: "bg-primary text-primary-foreground" },
  ] as const;
  return (
    <section id="estructura" className="bg-muted py-20">
      <div className="mx-auto max-w-7xl px-5">
        <SectionTitle eyebrow="Explicación visual" tone="accent" title="Así se estructura un CRÉDITO" />
        <div className="mt-12 flex flex-col items-stretch gap-2 lg:flex-row lg:items-center">
          {steps.map((s, i) =>
            "op" in s ? (
              <div key={i} className="flex items-center justify-center py-1 text-sm font-bold uppercase tracking-widest text-muted-foreground lg:px-1">
                {s.op}
              </div>
            ) : (
              <div key={i} className={`flex-1 rounded-3xl p-6 ${s.cls}`}>
                <p className="text-xs font-semibold uppercase tracking-widest opacity-70">{s.label}</p>
                <p className="mt-2 font-display text-2xl font-bold">{s.ex}</p>
              </div>
            ),
          )}
        </div>
        <p className="mt-8 max-w-3xl text-sm text-muted-foreground">
          * Ejemplo conceptual con cifras ilustrativas. No representa una oferta real. Las tasas, plazos, enganches y
          condiciones las define el dealer, agencia o institución que ofrece el CRÉDITO.
        </p>
      </div>
    </section>
  );
}

function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const started = useRef(false);
  const done = step >= quizQuestions.length;

  function answer(idx: number) {
    if (!started.current) {
      started.current = true;
      track("credit_quiz_start");
    }
    const q = quizQuestions[step];
    const next = { ...answers, [q.id]: idx };
    setAnswers(next);
    setStep(step + 1);
    if (step + 1 === quizQuestions.length) track("credit_quiz_complete", { title: quizResult(next).title });
  }

  const result = done ? quizResult(answers) : null;

  return (
    <section id="quiz" className="mx-auto max-w-7xl px-5 py-20">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <SectionTitle eyebrow="Quiz · 4 preguntas" title="¿Qué tan preparado estás para buscar un auto a CRÉDITO?" />
          <p className="mt-5 text-muted-foreground">Sin registro. No pedimos datos personales.</p>
        </div>
        <div className="md:col-span-7">
          <div className="rounded-[2rem] bg-secondary p-6 text-secondary-foreground md:p-10">
            <div className="flex gap-2">
              {quizQuestions.map((_, i) => (
                <div key={i} className={`h-1.5 flex-1 rounded-full ${i < step ? "bg-primary" : "bg-secondary-foreground/20"}`} />
              ))}
            </div>
            {!done ? (
              <div className="mt-8">
                <p className="text-sm opacity-60">Pregunta {step + 1} de {quizQuestions.length}</p>
                <h3 className="mt-2 text-3xl font-bold md:text-4xl">{quizQuestions[step].q}</h3>
                <div className="mt-8 grid gap-3">
                  {quizQuestions[step].options.map((o, i) => (
                    <button
                      key={o}
                      onClick={() => answer(i)}
                      className="min-h-16 rounded-2xl border-2 border-secondary-foreground/20 px-6 text-left text-lg font-semibold transition-colors hover:border-primary hover:bg-primary"
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mt-8">
                <p className="text-sm font-semibold uppercase tracking-widest text-accent">Tu resultado</p>
                <h3 className="mt-2 text-3xl font-bold md:text-5xl">{result!.title}</h3>
                <p className="mt-4 text-lg opacity-80">{result!.text}</p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a href="#autos" onClick={() => cta("quiz_result")} className={btnPrimary}>
                    Ver autos <ArrowRight className="size-5" />
                  </a>
                  <button
                    onClick={() => { setStep(0); setAnswers({}); }}
                    className={`${btn} border-2 border-secondary-foreground/30 hover:border-secondary-foreground`}
                  >
                    <RotateCcw className="size-4" /> Repetir
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const cars = [
  { img: heroCar, name: "SUV Compacta Premium", year: 2021, km: "42,000 km", loc: "CDMX", price: "$389,000", type: "SUV", seller: "Agencia Polanco" },
  { img: carSedan, name: "Sedán Mediano LE", year: 2016, km: "88,500 km", loc: "Guadalajara, Jal.", price: "$219,000", type: "Sedán", seller: "Dealer Occidente" },
  { img: carPickup, name: "Pickup Doble Cabina 4x4", year: 2017, km: "96,000 km", loc: "Monterrey, N.L.", price: "$459,000", type: "Pickup", seller: "Autos del Norte" },
  { img: carHatch, name: "Hatchback Sense", year: 2019, km: "51,200 km", loc: "Puebla, Pue.", price: "$165,000", type: "Hatchback", seller: "Agencia Angelópolis" },
];

function Inventory() {
  const ref = useRef<HTMLElement>(null);
  const [type, setType] = useState("Todos");
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { track("credit_inventory_view"); io.disconnect(); }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const filters = ["Marca", "Precio", "Año", "Tipo de auto", "Ubicación"];
  const types = ["Todos", "SUV", "Sedán", "Pickup", "Hatchback"];
  const list = type === "Todos" ? cars : cars.filter((c) => c.type === type);

  return (
    <section id="autos" ref={ref} className="bg-muted py-20">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle eyebrow="Inventario destacado" title="Explora autos disponibles" />
          <a href="#autos" onClick={() => cta("inventory_all")} className={`${btnGhost} hidden md:inline-flex`}>
            Ver todo el inventario
          </a>
        </div>
        <div className="no-scrollbar -mx-5 mt-10 flex gap-3 overflow-x-auto px-5">
          {filters.map((f) => (
            <button key={f} className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold">
              {f} <ArrowDown className="size-3.5" />
            </button>
          ))}
        </div>
        <div className="no-scrollbar -mx-5 mt-3 flex gap-2 overflow-x-auto px-5">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${t === type ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:text-secondary"}`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {list.map((c, i) => (
            <article key={c.name} className={`group overflow-hidden rounded-[2rem] bg-background shadow-card ${i % 2 === 1 ? "sm:translate-y-10" : ""}`}>
              <div className="overflow-hidden">
                <img src={c.img} alt={c.name} loading="lazy" width={1024} height={768} className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6 md:p-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-accent">Publicado por {c.seller}</p>
                <h3 className="mt-2 text-2xl font-bold text-secondary">{c.name}</h3>
                <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><CalendarDays className="size-4" />{c.year}</span>
                  <span className="flex items-center gap-1.5"><Gauge className="size-4" />{c.km}</span>
                  <span className="flex items-center gap-1.5"><MapPin className="size-4" />{c.loc}</span>
                </div>
                <div className="mt-6 flex items-center justify-between gap-4">
                  <p className="font-display text-3xl font-extrabold text-secondary">{c.price}</p>
                  <a href="#autos" onClick={() => track("credit_vehicle_click", { vehicle: c.name })} className="inline-flex min-h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-primary-foreground hover:brightness-110">
                    Ver auto <ArrowRight className="size-4" />
                  </a>
                </div>
                <button onClick={() => track("credit_dealer_contact", { vehicle: c.name })} className="mt-4 text-sm font-semibold text-accent underline-offset-4 hover:underline">
                  Preguntar al dealer por opciones de CRÉDITO
                </button>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-16 text-center">
          <a href="#autos" onClick={() => cta("inventory_all")} className={btnPrimary}>
            Ver todo el inventario <ArrowRight className="size-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

function NextSteps() {
  const steps = [
    { icon: Search, t: "Revisa el vehículo", d: "Consulta precio, año, kilometraje y ubicación." },
    { icon: MessageCircle, t: "Contacta al dealer", d: "Pregunta por disponibilidad." },
    { icon: HandCoins, t: "Pregunta por opciones de CRÉDITO", d: "Consulta qué opciones tienen para ese vehículo." },
    { icon: Scale, t: "Compara antes de decidir", d: "Revisa tasa, CAT, plazo y costo total." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-20">
      <SectionTitle eyebrow="Cuando encuentres un auto" tone="accent" title="¿Qué sigue?" />
      <ol className="mt-12 grid gap-4 md:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.t} className="relative rounded-[2rem] border border-border p-7">
            <span className="font-display text-5xl font-extrabold text-primary">{i + 1}</span>
            <s.icon className="absolute top-8 right-7 size-7 text-accent" strokeWidth={1.5} />
            <h3 className="mt-6 text-xl font-bold text-secondary">{s.t}</h3>
            <p className="mt-2 text-muted-foreground">{s.d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Comparison() {
  const rows = [
    ["Enganche", "Monto mínimo y si puedes aportar más.", "Reduce el monto que solicitas a CRÉDITO."],
    ["Plazo", "Número de meses para pagar.", "Más plazo puede bajar la mensualidad, pero subir el costo total."],
    ["Tasa", "Tasa de interés anual y si es fija o variable.", "Define cuánto pagas por el dinero prestado."],
    ["CAT", "Costo Anual Total informado.", "Integra intereses, comisiones y otros costos para comparar."],
    ["Comisiones", "Apertura, administración, pago anticipado.", "Pueden sumar un costo importante."],
    ["Seguro", "Si es obligatorio, quién lo elige y su costo.", "Puede estar incluido o cobrarse aparte."],
    ["Costo total", "Suma de todo lo que pagarás.", "Es la forma más clara de comparar opciones."],
  ];
  return (
    <section className="bg-secondary py-20 text-secondary-foreground">
      <div className="mx-auto max-w-7xl px-5">
        <span className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-widest">Tabla comparativa</span>
        <h2 className="mt-4 max-w-3xl text-4xl leading-[1.05] font-extrabold md:text-6xl">No compares solo la mensualidad</h2>
        <div className="mt-12 overflow-hidden rounded-[2rem] border border-secondary-foreground/15">
          <div className="hidden grid-cols-3 bg-secondary-foreground/5 px-8 py-4 text-xs font-bold uppercase tracking-widest opacity-70 md:grid">
            <span>Elemento</span><span>Qué revisar</span><span>Por qué importa</span>
          </div>
          {rows.map(([a, b, c]) => (
            <div key={a} className="grid gap-1 border-t border-secondary-foreground/10 px-6 py-5 first:border-t-0 md:grid-cols-3 md:gap-6 md:px-8">
              <span className="font-display text-xl font-bold text-primary md:text-lg">{a}</span>
              <span className="opacity-90">{b}</span>
              <span className="opacity-60">{c}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Mistakes() {
  const items = [
    { icon: TrendingDown, t: "Elegir solo por mensualidad baja" },
    { icon: Percent, t: "No revisar el CAT" },
    { icon: BadgeDollarSign, t: "No preguntar por comisiones" },
    { icon: Calculator, t: "No revisar el costo total" },
    { icon: FileText, t: "No leer condiciones" },
    { icon: Shuffle, t: "Pensar que todos los autos tienen las mismas opciones de CRÉDITO" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-5 py-20">
      <SectionTitle eyebrow="Ojo" title="Errores que conviene evitar" />
      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3">
        {items.map((m, i) => (
          <div key={m.t} className={`rounded-[1.75rem] p-6 md:p-8 ${i === 5 ? "col-span-2 md:col-span-1 bg-primary text-primary-foreground" : "bg-card"}`}>
            <m.icon className={`size-8 ${i === 5 ? "" : "text-primary"}`} strokeWidth={1.5} />
            <p className="mt-6 font-display text-lg leading-tight font-bold md:text-2xl">{m.t}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Faq() {
  const faqs = [
    ["¿Qué es un CRÉDITO automotriz?", "Es un préstamo para comprar un auto que pagas en mensualidades durante un plazo, con intereses y posibles comisiones."],
    ["¿Seminuevos.com otorga CRÉDITOS?", "No. Seminuevos.com es un portal de anuncios. Las opciones de CRÉDITO las ofrece el dealer, agencia o institución correspondiente."],
    ["¿Todos los autos publicados tienen CRÉDITO?", "No necesariamente. Cada dealer o agencia decide qué opciones ofrece para cada vehículo. Pregunta directamente al vendedor."],
    ["¿Qué es el CAT?", "El Costo Anual Total incluye intereses, comisiones y otros costos. Sirve para comparar opciones de CRÉDITO de forma más completa."],
    ["¿Qué es el enganche?", "Es el pago inicial que das al comprar el auto. El resto del precio es lo que se solicita a CRÉDITO."],
    ["¿Cómo sé si una opción de CRÉDITO me conviene?", "Compara tasa, CAT, plazo, comisiones, seguro y, sobre todo, el costo total. Asegúrate de que la mensualidad cabe en tu presupuesto."],
    ["¿Quién aprueba mi CRÉDITO?", "La institución que otorga el CRÉDITO, según sus propios criterios. Seminuevos.com no participa ni garantiza la aprobación."],
  ];
  return (
    <section id="faq" className="bg-muted py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-12">
        <div className="md:col-span-4">
          <SectionTitle eyebrow="FAQ" tone="accent" title="Preguntas frecuentes" />
        </div>
        <Accordion
          type="single"
          collapsible
          className="md:col-span-8"
          onValueChange={(v) => v && track("credit_faq_open", { question: v })}
        >
          {faqs.map(([q, a]) => (
            <AccordionItem key={q} value={q} className="border-border">
              <AccordionTrigger className="py-6 text-left font-display text-lg font-bold text-secondary hover:no-underline md:text-xl">
                {q}
              </AccordionTrigger>
              <AccordionContent className="pb-6 text-base text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20">
      <div className="rounded-[2.5rem] bg-primary px-7 py-14 text-primary-foreground md:px-16 md:py-24">
        <h2 className="text-5xl leading-[0.98] font-extrabold md:text-8xl">
          Encuentra el auto.<br />Pregunta por el CRÉDITO.
        </h2>
        <p className="mt-6 max-w-xl text-lg opacity-90">
          Explora autos publicados por agencias y dealers y consulta directamente las opciones disponibles.
        </p>
        <a href="#autos" onClick={() => cta("final")} className={`${btn} mt-10 bg-background text-primary hover:bg-secondary hover:text-secondary-foreground`}>
          Explorar autos <ArrowRight className="size-5" />
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-5 py-12">
        <p className="font-display text-xl font-extrabold text-secondary">seminuevos<span className="text-primary">.com</span></p>
        <p className="mt-4 max-w-3xl text-sm text-muted-foreground">
          Seminuevos.com es un portal de anuncios. No otorga CRÉDITOS, no garantiza aprobaciones y no determina tasas,
          plazos, enganches o condiciones.
        </p>
        <p className="mt-2 max-w-3xl text-xs text-muted-foreground">
          Los vehículos son publicados por agencias, dealers y vendedores. Las opciones de CRÉDITO son responsabilidad
          del dealer, agencia o institución correspondiente. © {new Date().getFullYear()} Seminuevos.com México.
        </p>
      </div>
    </footer>
  );
}

function StickyCta() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 p-3 backdrop-blur md:hidden">
      <a href="#autos" onClick={() => cta("sticky_mobile")} className={`${btnPrimary} w-full`}>
        Explorar autos <ArrowRight className="size-5" />
      </a>
    </div>
  );
}
