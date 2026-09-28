export interface Project {
  id: string;
  name: string;
  client: string;
  type: string;
  year: string;
  stack: string[];
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
  short: string;
  group: "Comercio" | "Diseño" | "Frontend" | "Backend" | "Infra" | "IA";
}

export interface ProcessStep {
  index: string;
  title: string;
  body: string;
  duration: string;
}

export const projects: Project[] = [
  {
    id: "tostado",
    name: "Tostado Sur",
    client: "Café de especialidad",
    type: "Ecommerce",
    year: "2024",
    stack: ["Shopify", "Liquid", "GSAP"],
    summary:
      "Tienda con suscripciones mensuales, catálogo por origen y checkout en un paso.",
    image: "https://v3b.fal.media/files/b/0aac2dbe/3LKi1vPlB1pTQjubgT9hf.jpg",
    url: "#",
  },
  {
    id: "estudio-norte",
    name: "Estudio Norte",
    client: "Arquitectura",
    type: "Institucional",
    year: "2024",
    stack: ["Astro", "Tailwind CSS", "Vercel"],
    summary:
      "Portfolio editorial con obras navegables y tiempos de carga menores a un segundo.",
    image: "https://v3b.fal.media/files/b/0aac2dbe/iyRjRGX14UoF0UpLfaqQa.jpg",
    url: "#",
  },
  {
    id: "metrica",
    name: "Métrica",
    client: "SaaS de logística",
    type: "Desarrollo",
    year: "2025",
    stack: ["Next.js", "PostgreSQL", "AWS"],
    summary:
      "Panel de operaciones en tiempo real para flotas, con reportes y roles por equipo.",
    image: "https://v3b.fal.media/files/b/0aac2dbe/EPFuM_LqJzrnB4_JC-jJp.jpg",
    url: "#",
  },
  {
    id: "lana",
    name: "Lana & Co.",
    client: "Indumentaria",
    type: "Ecommerce",
    year: "2023",
    stack: ["Shopify", "React", "Figma"],
    summary:
      "Rediseño completo de marca digital y tienda headless con lookbooks por temporada.",
    image: "https://v3b.fal.media/files/b/0aac2dbe/3NDxYyl9EaM1qysFshuOI.jpg",
    url: "#",
  },
  {
    id: "costa-alta",
    name: "Costa Alta",
    client: "Hotel boutique",
    type: "Institucional",
    year: "2023",
    stack: ["WordPress", "WooCommerce", "GSAP"],
    summary:
      "Sitio bilingüe con reservas directas integradas y gestor de contenidos a medida.",
    image: "https://v3b.fal.media/files/b/0aac2dbf/4nvLSijPRVae-eATW7kqf.jpg",
    url: "#",
  },
  {
    id: "lex",
    name: "Lex Asistente",
    client: "Estudio jurídico",
    type: "Consultoría + IA",
    year: "2025",
    stack: ["AI / ChatGPT", "Node.js", "Docker"],
    summary:
      "Asistente interno que busca en miles de expedientes y redacta borradores.",
    image: "https://v3b.fal.media/files/b/0aac2dbf/OP9g0pcX32QdKxJnn2Iml.jpg",
    url: "#",
  },
];

export const services: Service[] = [
  {
    id: "institucional",
    index: "01",
    title: "Sitios institucionales",
    lead: "La cara digital de tu empresa, rápida, clara y fácil de mantener.",
    deliverables: [
      "Arquitectura de contenido",
      "Diseño a medida",
      "CMS autoadministrable",
      "SEO técnico",
    ],
    tools: ["Astro", "WordPress", "Figma", "GSAP"],
  },
  {
    id: "ecommerce",
    index: "02",
    title: "Ecommerce",
    lead: "Tiendas que venden desde el primer día y escalan con tu catálogo.",
    deliverables: [
      "Tienda Shopify o WooCommerce",
      "Pasarelas de pago",
      "Integración con stock",
      "Headless commerce",
    ],
    tools: ["Shopify", "WooCommerce", "Next.js", "Vercel"],
  },
  {
    id: "desarrollo",
    index: "03",
    title: "Desarrollo a medida",
    lead: "Plataformas, paneles y productos digitales construidos para durar.",
    deliverables: [
      "Aplicaciones web",
      "APIs e integraciones",
      "Bases de datos",
      "Infraestructura cloud",
    ],
    tools: ["React", "TypeScript", "Node.js", "PostgreSQL"],
  },
  {
    id: "consultoria",
    index: "04",
    title: "Consultoría",
    lead: "Te ayudamos a decidir qué construir, con qué y en qué orden.",
    deliverables: [
      "Auditoría técnica",
      "Estrategia de producto",
      "Adopción de IA",
      "Migraciones",
    ],
    tools: ["AI / ChatGPT", "AWS", "Docker", "Figma"],
  },
];

export const tools: Tool[] = [
  { name: "WooCommerce", short: "Woo", group: "Comercio" },
  { name: "Shopify", short: "Sh", group: "Comercio" },
  { name: "AI / ChatGPT", short: "AI", group: "IA" },
  { name: "Figma", short: "Fg", group: "Diseño" },
  { name: "GSAP", short: "Gs", group: "Diseño" },
  { name: "PostgreSQL", short: "Pg", group: "Backend" },
  { name: "Vercel", short: "Vc", group: "Infra" },
  { name: "AWS", short: "Aw", group: "Infra" },
  { name: "Docker", short: "Dk", group: "Infra" },
  { name: "Astro", short: "As", group: "Frontend" },
  { name: "React", short: "Re", group: "Frontend" },
  { name: "Next.js", short: "Nx", group: "Frontend" },
  { name: "TypeScript", short: "Ts", group: "Frontend" },
  { name: "Tailwind CSS", short: "Tw", group: "Frontend" },
  { name: "Node.js", short: "No", group: "Backend" },
  { name: "WordPress", short: "Wp", group: "Comercio" },
];

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Descubrir",
    body: "Entendemos tu negocio, tus usuarios y lo que el sitio tiene que lograr.",
    duration: "1–2 semanas",
  },
  {
    index: "02",
    title: "Diseñar",
    body: "Prototipos navegables en Figma que validás antes de escribir código.",
    duration: "2–3 semanas",
  },
  {
    index: "03",
    title: "Construir",
    body: "Desarrollo por etapas con entregas semanales y un entorno de prueba siempre activo.",
    duration: "3–8 semanas",
  },
  {
    index: "04",
    title: "Lanzar y crecer",
    body: "Publicamos, medimos y seguimos iterando junto a tu equipo.",
    duration: "Continuo",
  },
];

export const stats = [
  { value: 120, suffix: "+", label: "Proyectos lanzados" },
  { value: 9, suffix: "", label: "Años construyendo web" },
  { value: 98, suffix: "%", label: "Clientes que vuelven" },
  { value: 16, suffix: "", label: "Tecnologías en producción" },
];

export const navLinks = [
  { label: "Trabajo", href: "#trabajo" },
  { label: "Servicios", href: "#servicios" },
  { label: "Stack", href: "#stack" },
  { label: "Proceso", href: "#proceso" },
  { label: "Contacto", href: "#contacto" },
];
