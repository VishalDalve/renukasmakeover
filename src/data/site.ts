// Placeholder business data — replace every PLACEHOLDER value once real details are confirmed.
export const site = {
  brandName: "Renuka's Makeover",
  tagline: "Bridal & Editorial Makeup Artistry",
  city: "Pune", // PLACEHOLDER — confirm primary city
  citiesServed: ["Pune", "Mumbai"], // PLACEHOLDER
  phone: "+919999999999", // PLACEHOLDER — E.164 format, used for tel: and wa.me
  whatsapp: "919999999999", // PLACEHOLDER — digits only, no +, for wa.me links
  email: "hello@renukasmakeover.com", // PLACEHOLDER
  instagramHandle: "renukasmakeover_", // unconfirmed per project context — verify before launch
  instagramUrl: "https://instagram.com/renukasmakeover_",
  youtubeUrl: "https://youtube.com/@renukasmakeover", // PLACEHOLDER
  address: {
    line1: "PLACEHOLDER Studio Address, Street",
    locality: "PLACEHOLDER Locality",
    city: "Pune",
    state: "Maharashtra",
    postalCode: "411001",
    country: "IN",
  },
  geo: {
    // PLACEHOLDER — replace with real studio lat/lng once confirmed
    lat: 18.5204,
    lng: 73.8567,
  },
  googlePlaceId: "", // PLACEHOLDER — fill in once Google Business Profile is set up, see SETUP.md
  googleMapsEmbedSrc: "", // PLACEHOLDER — Google Maps Embed API URL, see SETUP.md
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services & Pricing", href: "/services" },
  { label: "Classes", href: "/classes" },
  { label: "Gallery & Press", href: "/gallery" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;
