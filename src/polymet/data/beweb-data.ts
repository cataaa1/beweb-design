export interface Project {
  id: string;
  name: string;
  type: "Institucional" | "E-commerce" | "Landing";
  domain: string;
  summary: string;
  image: string;
  url: string;
}

export interface Service {
  id: string;
  index: string;
  title: string;
  lead: string;
  deliverables: string[];
  tools: string[];
}

export interface Tool {
  name: string;
}

export interface ProcessStep {
  index: string;
  title: string;
  body: string;
  duration: string;
}

const img = (n: number) => `https://beweb.com.ar/img/proyecto-${n}.webp?v=20260818`;

export const projects: Project[] = [
  {
    id: "rollpix",
    name: "Rollpix",
    type: "Institucional",
    domain: "rollpix.com",
    summary: "Sitio institucional que presenta la empresa y sus servicios de forma clara y profesional.",
    image: img(1),
    url: "https://rollpix.com/",
  },
  {
    id: "starvie",
    name: "StarVie Argentina",
    type: "E-commerce",
    domain: "starvie.com.ar",
    summary: "Tienda online de pádel con catálogo completo, pagos y envíos a todo el país.",
    image: img(2),
    url: "https://starvie.com.ar/",
  },
  {
    id: "hit-creativo",
    name: "Hit Creativo",
    type: "Institucional",
    domain: "hitcreativo.com",
    summary: "Presencia digital para una agencia creativa, con foco en su trabajo y su identidad.",
    image: img(3),
    url: "https://hitcreativo.com/",
  },
  {
    id: "exactian",
    name: "Exactian",
    type: "Institucional",
    domain: "exactian.com",
    summary: "Sitio para una plataforma de gestión de contratistas, pensado para generar consultas.",
    image: img(4),
    url: "https://exactian.com/",
  },
  {
    id: "tango-y-pampa",
    name: "Tango y Pampa",
    type: "Landing",
    domain: "tangoypampa.com",
    summary: "Landing page de alto impacto, rápida y enfocada en una sola acción.",
    image: img(5),
    url: "https://tangoypampa.com/",
  },
  {
    id: "telpin",
    name: "Telpin",
    type: "Institucional",
    domain: "telpin.com.ar",
    summary: "Sitio de una cooperativa de telecomunicaciones, con información clara para sus socios.",
    image: img(6),
    url: "https://telpin.com.ar/",
  },
  {
    id: "cestel",
    name: "Cestel",
    type: "Institucional",
    domain: "cestel.com.ar",
    summary: "Sitio institucional moderno que comunica la marca y sus servicios.",
    image: img(7),
    url: "https://cestel.com.ar/",
  },
  {
    id: "bibar",
    name: "Bibar Bag in Box",
    type: "Landing",
    domain: "bibar.com.ar",
    summary: "Landing de producto con un mensaje directo para convertir visitas en contactos.",
    image: img(8),
    url: "https://bibar.com.ar/ar/baginbox/",
  },
  {
    id: "beniplast",
    name: "Grupo Beniplast",
    type: "Institucional",
    domain: "beniplast.com",
    summary: "Sitio corporativo para un grupo industrial, ordenado y fácil de recorrer.",
    image: img(9),
    url: "https://beniplast.com/",
  },
];

export const services: Service[] = [
  {
    id: "institucional",
    index: "01",
    title: "Sitios institucionales",
    lead: "Presencia digital profesional que comunica tu marca con diseño moderno, gran velocidad y bien posicionada en Google.",
    deliverables: ["Diseño a medida", "Autoadministrable", "Adaptado a celulares", "Posicionamiento en Google"],
    tools: ["WordPress", "Astro"],
  },
  {
    id: "landing",
    index: "02",
    title: "Landing pages",
    lead: "Páginas de alto impacto, rápidas y efectivas. Cada pixel cuenta, cada segundo importa.",
    deliverables: ["Mensaje claro y directo", "Carga ultrarrápida", "Formularios de contacto", "Pensadas para convertir"],
    tools: ["Velocidad", "Conversión"],
  },
  {
    id: "tiendas",
    index: "03",
    title: "Catálogos & tiendas online",
    lead: "E-commerce completo y catálogos digitales que convierten visitantes en clientes. Tu negocio abierto 24/7.",
    deliverables: ["Catálogo de productos", "Medios de pago", "Gestión de stock", "Envíos"],
    tools: ["WooCommerce", "TiendaNube", "Shopify"],
  },
  {
    id: "desarrollo",
    index: "04",
    title: "Desarrollo & consultoría",
    lead: "Soluciones a medida e inteligencia artificial aplicada a tu negocio, con acompañamiento en cada decisión.",
    deliverables: ["Proyectos a medida", "Inteligencia artificial", "Asesoramiento", "Mejora de sitios existentes"],
    tools: ["A medida", "IA"],
  },
];

export const tools: Tool[] = [
  "Astro",
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "WordPress",
  "WooCommerce",
  "Shopify",
  "AI / ChatGPT",
  "Figma",
  "GSAP",
  "PostgreSQL",
  "Vercel",
  "AWS",
  "Docker",
].map((name) => ({ name }));

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Descubrimiento",
    body: "Entendemos tu negocio, tus objetivos y tu audiencia para definir la estrategia perfecta.",
    duration: "1–2 semanas",
  },
  {
    index: "02",
    title: "Diseño",
    body: "Creamos diseños que reflejan tu marca, con estética moderna y funcional.",
    duration: "2–3 semanas",
  },
  {
    index: "03",
    title: "Desarrollo",
    body: "Construimos tu sitio con tecnología actual: rápido, seguro y fácil de usar.",
    duration: "3–6 semanas",
  },
  {
    index: "04",
    title: "Lanzamiento",
    body: "Publicamos, probamos y te acompañamos con soporte continuo para que todo funcione perfecto.",
    duration: "Continuo",
  },
];

export const stats = [
  { value: 9, suffix: "+", label: "Proyectos destacados" },
  { value: 3, suffix: "", label: "Formas de estar online" },
  { value: 24, suffix: "hs", label: "Tiempo de respuesta" },
  { value: 100, suffix: "%", label: "Diseño a medida" },
];

export const navLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Proceso", href: "#proceso" },
  { label: "Contacto", href: "#contacto" },
];
