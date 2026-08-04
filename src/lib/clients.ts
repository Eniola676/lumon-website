export type Client = {
  name: string;
  title: string;
  href: string;
  image: string;
};

export const CLIENTS: Client[] = [
  {
    name: "Lacy Philips",
    title: "Founder @ TBM",
    href: "https://tobemagnetic.com/the-pathway-membership",
    image: "/clients/lacy-phillips.jpeg",
  },
  {
    name: "Tony Jefferies",
    title: "Olympic Medalist, Founder @ Boxing Fitness Academy",
    href: "https://boxingfitness.com/online-boxing-fitness-academy",
    image: "/clients/tony-jefferies.jpeg",
  },
  {
    name: "Sophia Amoruso",
    title: "Founder @ Businessclass",
    href: "https://www.businessclass.co/",
    image: "/clients/sophia-amoruso.webp",
  },
  {
    name: "Irene",
    title: "Co-Founder & CEO of Chiyo",
    href: "https://wearechiyo.com/",
    image: "/clients/irene.jpg",
  },
  {
    name: "Autumn Beam",
    title: "Founder @ Hopewella",
    href: "https://hopewella.com/practice-growth-lab/",
    image: "/clients/autumn-beam.jpeg",
  },
  {
    name: "Melanie Murphy",
    title: "Wholistic Dietitian",
    href: "https://melaniemurphyrd.com/",
    image: "/clients/melanie-murphy.jpg",
  },
];

// Remaining clients, held out of the homepage grid — used as featured
// case-study cards on the Launch and Scale pages instead.
export const CASE_STUDY_CLIENTS: Client[] = [
  {
    name: "Dr Ally Eruemulor",
    title: "Founder @ Physicians Keepers",
    href: "https://www.physicianskeepers.com/",
    image: "/clients/ally-eruemulor.jpeg",
  },
  {
    name: "Canela Eatman",
    title: "Founder @ HBCU Pa'lante",
    href: "https://hbcupalante.com/course/",
    image: "/clients/canela-eatman.jpg",
  },
  {
    name: "Cory Schlesinger",
    title: "NBA Coach & Founder @ NDY",
    href: "https://www.notdoneyetndy.com/",
    image: "/clients/cory-schlesinger.jpeg",
  },
];
