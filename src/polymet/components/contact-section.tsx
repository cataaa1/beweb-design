import { useState, type FormEvent } from "react";
import { ArrowRightIcon, CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { SplitLines } from "@/polymet/components/reveal";

const TYPES = ["Institucional", "Ecommerce", "Desarrollo", "Consultoría"];
const BUDGETS = ["< USD 3k", "3k – 10k", "10k – 30k", "30k +"];

function Field({
  label,
  id,
  type = "text",
  value,
  onChange,
  required,
}: {
  label: string;
  id: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <label htmlFor={id} className="group block border-b border-bruma/20 pb-3 transition-colors focus-within:border-crema">
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-crema/50 group-focus-within:text-ladrillo">
        {label}
      </span>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 block w-full bg-transparent text-xl text-crema outline-none placeholder:text-crema/25"
      />
    </label>
  );
}

function Choice({
  options,
  value,
  onChange,
  label,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  label: string;
}) {
  return (
    <fieldset>
      <legend className="font-mono text-[10px] uppercase tracking-[0.14em] text-crema/50">{label}</legend>
      <div className="mt-3 grid grid-cols-2 gap-px bg-bruma/15 sm:grid-cols-4">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            aria-pressed={value === o}
            className={cn(
              "bg-marino px-3 py-3 text-left text-sm transition-colors",
              value === o ? "bg-crema text-marino" : "text-crema/70 hover:bg-marino-2 hover:text-crema"
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [type, setType] = useState("Ecommerce");
  const [budget, setBudget] = useState("3k – 10k");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1200);
  };

  return (
    <section id="contacto" className="relative overflow-hidden bg-marino py-28 md:py-40">
      <div className="mx-auto grid max-w-[1440px] grid-cols-12 gap-x-10 gap-y-16 px-5 md:px-10">
        <div className="col-span-12 lg:col-span-5">
          <h2 className="text-6xl font-medium uppercase leading-[0.88] tracking-[-0.055em] text-crema md:text-8xl">
            <SplitLines lines={["¿Qué", "lanzamos", "ahora?"]} />
          </h2>
          <div className="mt-14 space-y-6">
            <a
              href="mailto:hola@beweb.dev"
              className="group inline-flex items-center gap-3 text-2xl tracking-[-0.02em] text-crema md:text-3xl"
            >
              <span className="relative">
                hola@beweb.dev
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-ladrillo transition-transform duration-500 group-hover:scale-x-100" />
              </span>
              <ArrowRightIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <div className="grid grid-cols-2 gap-6 font-mono text-[11px] leading-5 text-crema/50">
              <div>
                WhatsApp<br />
                <span className="text-crema/80">+54 11 0000 0000</span>
              </div>
              <div>
                Estudio<br />
                <span className="text-crema/80">Buenos Aires, AR</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6 lg:col-start-7">
          {status === "sent" ? (
            <div className="flex h-full min-h-[420px] flex-col justify-center border border-bruma/15 bg-marino-2 p-10 animate-in fade-in zoom-in-95 duration-500">
              <span className="grid h-12 w-12 place-items-center bg-ladrillo text-crema">
                <CheckIcon className="h-5 w-5" />
              </span>
              <p className="mt-8 text-3xl font-medium tracking-[-0.03em] text-crema">
                Gracias{name ? `, ${name.split(" ")[0]}` : ""}.
              </p>
              <p className="mt-3 max-w-sm text-crema/60">
                Te respondemos en menos de 24 horas hábiles con los próximos pasos.
              </p>
              <button
                type="button"
                onClick={() => {
                  setStatus("idle");
                  setMessage("");
                }}
                className="mt-10 self-start font-mono text-[11px] uppercase tracking-[0.14em] text-bruma hover:text-crema"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-10">
              <div className="grid gap-10 sm:grid-cols-2">
                <Field id="name" label="Nombre" value={name} onChange={setName} required />
                <Field id="email" label="Email" type="email" value={email} onChange={setEmail} required />
              </div>
              <Field id="company" label="Empresa" value={company} onChange={setCompany} />
              <Choice label="Tipo de proyecto" options={TYPES} value={type} onChange={setType} />
              <Choice label="Presupuesto" options={BUDGETS} value={budget} onChange={setBudget} />
              <label htmlFor="message" className="group block border-b border-bruma/20 pb-3 focus-within:border-crema">
                <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-crema/50 group-focus-within:text-ladrillo">
                  Contanos sobre el proyecto
                </span>
                <textarea
                  id="message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-2 block w-full resize-none bg-transparent text-lg text-crema outline-none"
                />
              </label>
              <button
                type="submit"
                disabled={status === "sending"}
                className="group relative flex w-full items-center justify-between overflow-hidden bg-ladrillo px-6 py-5 text-left text-crema disabled:opacity-70"
              >
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-crema transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
                <span className="relative text-xl font-medium tracking-[-0.02em] transition-colors duration-300 group-hover:text-marino">
                  {status === "sending" ? "Enviando…" : "Enviar proyecto"}
                </span>
                <ArrowRightIcon className="relative h-5 w-5 transition-all duration-300 group-hover:translate-x-1 group-hover:text-marino" />
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
