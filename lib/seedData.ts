import type { Project } from "./types";

// Shown until real data streams in from Firestore (or if Firebase env vars
// are not configured yet). Replace/extend everything from the Admin Panel —
// once Firestore has documents, these are no longer used.

export const seedProjects: Project[] = [
  {
    id: "seed-blinkit",
    title: "Blinkit Clone & AI",
    description:
      "A sophisticated web architecture integrating artificial intelligence with modern UI components. Built entirely from scratch to handle intelligent automation and seamless data flow.",
    tags: ["Python", "Machine Learning", "Web Architecture"],
    imageUrl:
      "https://raw.githubusercontent.com/coderafroj/coderafroj.github.io/main/image/Ai.webp",
    sourceUrl: "https://github.com/coderafroj",
    featured: true,
    order: 0,
    createdAt: Date.now(),
    forSale: true,
    price: "Starts at ₹7,999",
  },
  {
    id: "seed-evigo",
    title: "Evigo.in",
    description:
      "A functional web application demonstrating hands-on experience with routing, database management, and robust front-end layout styling.",
    tags: ["MERN Stack", "SQL"],
    imageUrl:
      "https://raw.githubusercontent.com/coderafroj/coderafroj.github.io/main/image/Ml.webp",
    sourceUrl: "https://github.com/coderafroj",
    featured: false,
    order: 1,
    createdAt: Date.now(),
    forSale: false,
  },
  {
    id: "seed-profile-card",
    title: "Interactive Profile System",
    description:
      "A sleek, interactive UI component focusing strictly on raw HTML, CSS, and JS capabilities without relying on heavy frameworks.",
    tags: ["HTML", "CSS", "JavaScript"],
    imageUrl: "https://i.postimg.cc/C5txzdTX/Screenshot-20250518-194303-3.png",
    sourceUrl: "https://github.com/coderafroj",
    featured: false,
    order: 2,
    createdAt: Date.now(),
    forSale: true,
    price: "₹1,499",
  },
];
