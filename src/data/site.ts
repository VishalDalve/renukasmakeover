// Placeholder business data — replace every PLACEHOLDER value once real details are confirmed.
export const site = {
  brandName: "Renuka's Makeover",
  tagline: "Bridal & Editorial Makeup Artistry",
  city: "Pimpri-Chinchwad",
  citiesServed: ["Pimpri-Chinchwad", "Pune", "Mumbai"],
  phone: "+919767498164",
  whatsapp: "919767498164",
  email: "hello@renukasmakeover.com", // PLACEHOLDER
  instagramHandle: "renukasmakeover_", // unconfirmed per project context — verify before launch
  instagramUrl: "https://instagram.com/renukasmakeover_",
  youtubeUrl: "https://youtube.com/@renukasmakeover", // PLACEHOLDER
  address: {
    line1: "Legacy Millennia - C, A",
    locality: "Gaikwad Nagar Rd, Punawale",
    city: "Pimpri-Chinchwad",
    state: "Maharashtra",
    postalCode: "411033",
    country: "IN",
  },
  // From the Google Maps embed URL (site.googleMapsEmbedSrc) for this exact listing.
  geo: {
    lat: 18.6262856,
    lng: 73.7258347,
  },
  googlePlaceId: "", // PLACEHOLDER — real Places API Place ID (starts "ChIJ..."), needed for live reviews — see SETUP.md
  googleBusinessUrl: "https://www.google.com/maps/place/Renuka's+Makeover",
  // From Google Maps "Share > Embed a map" — no API key required, doesn't expire.
  googleMapsEmbedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.839541467781!2d73.7258347!3d18.6262856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa6662683f769f85%3A0xf02624b463c0c303!2sRenuka's%20Makeover!5e0!3m2!1sen!2sin!4v1784649539276!5m2!1sen!2sin",
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Classes", href: "/classes" },
  { label: "Pricing", href: "/services" },
  { label: "Contact", href: "/contact" },
] as const;
