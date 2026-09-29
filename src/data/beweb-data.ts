export interface Project {
  id: string;
  name: string;
  type: "Institucional" | "E-commerce" | "Landing";
  domain: string;
  /** Full-page screenshot, 1280px wide (the card scrolls through it on hover) */
  image: string;
  /** Screenshot height in px at 1280px width */
  imageHeight: number;
  url: string;
}

export interface Service {
  id: string;
  index: string;
  title: string;
  lead: string;
}

export interface Tool {
  name: string;
}

export interface ProcessStep {
  index: string;
  title: string;
  body: string;
}

export const projects: Project[] = [
  {
    id: "telpin",
    name: "Telpin",
    type: "Institucional",
    domain: "telpin.com.ar",
    image: "/img/proyectos/telpin.webp",
    imageHeight: 5110,
    url: "https://telpin.com.ar/",
  },
  {
    id: "cestel",
    name: "Cestel",
    type: "Institucional",
    domain: "cestel.com.ar",
    image: "/img/proyectos/cestel.webp",
    imageHeight: 4101,
    url: "https://cestel.com.ar/",
  },
  {
    id: "realstep",
    name: "Real Step",
    type: "Institucional",
    domain: "realstep.com.ar",
    image: "/img/proyectos/realstep.webp",
    imageHeight: 5607,
    url: "https://realstep.com.ar/",
  },
  {
    id: "starvie",
    name: "StarVie Argentina",
    type: "E-commerce",
    domain: "starvie.com.ar",
    image: "/img/proyectos/starvie.webp",
    imageHeight: 4866,
    url: "https://starvie.com.ar/",
  },
  {
    id: "hit-creativo",
    name: "Hit Creativo",
    type: "Institucional",
    domain: "hitcreativo.com",
    image: "/img/proyectos/hit-creativo.webp",
    imageHeight: 5973,
    url: "https://hitcreativo.com/",
  },
  {
    id: "exactian",
    name: "Exactian",
    type: "Institucional",
    domain: "exactian.com",
    image: "/img/proyectos/exactian.webp",
    imageHeight: 5708,
    url: "https://exactian.com/",
  },
  {
    id: "bibar",
    name: "Bibar Bag in Box",
    type: "Landing",
    domain: "bibar.com.ar",
    image: "/img/proyectos/bibar.webp",
    imageHeight: 6276,
    url: "https://bibar.com.ar/ar/baginbox/",
  },
  {
    id: "beniplast",
    name: "Grupo Beniplast",
    type: "Institucional",
    domain: "beniplast.com",
    image: "/img/proyectos/beniplast.webp",
    imageHeight: 3318,
    url: "https://beniplast.com/",
  },
  {
    id: "tango-y-pampa",
    name: "Tango y Pampa",
    type: "Landing",
    domain: "tangoypampa.com",
    image: "/img/proyectos/tango-y-pampa.webp",
    imageHeight: 7987,
    url: "https://tangoypampa.com/",
  },
];

export const services: Service[] = [
  {
    id: "institucional",
    index: "01",
    title: "Sitios Institucionales",
    lead: "Presencia digital profesional que comunica tu marca con diseño moderno, rendimiento excepcional y las mejores prácticas de SEO.",
  },
  {
    id: "landing",
    index: "02",
    title: "Landing pages",
    lead: "Páginas de alto impacto, rápidas y efectivas. Cada pixel cuenta, cada segundo importa.",
  },
  {
    id: "tiendas",
    index: "03",
    title: "Catálogos & Tiendas Online",
    lead: "E-commerce completo y catálogos digitales que convierten visitantes en clientes, con las mejores plataformas del mercado.",
  },
  {
    id: "desarrollo",
    index: "04",
    title: "Desarrollo & Consultoría",
    lead: "Soluciones a medida con las últimas tecnologías, frameworks modernos e inteligencia artificial aplicada a tu negocio.",
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
  "TiendaNube",
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
  },
  {
    index: "02",
    title: "Diseño",
    body: "Creamos diseños que reflejan tu marca, con estética moderna y funcional.",
  },
  {
    index: "03",
    title: "Desarrollo",
    body: "Construimos tu sitio con tecnología actual: rápido, seguro y fácil de usar.",
  },
  {
    index: "04",
    title: "Lanzamiento",
    body: "Publicamos, probamos y te acompañamos con soporte continuo para que todo funcione perfecto.",
  },
];

export const navLinks = [
  { label: "Proyectos", href: "#proyectos" },
  { label: "Servicios", href: "#servicios" },
  { label: "Proceso", href: "#proceso" },
  { label: "Contacto", href: "#contacto" },
];
