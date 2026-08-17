import type { ParshadDiscovery } from "./types";

const parshadImages = [
  "/images/dryfruit.jpg.png",
  "/images/pinkladdu.png",
  "/images/milletkheer..png",
  "/images/coconutladdu.png",
  "/images/panjirithali.png",
];

const parshadNames = [
  { name: "Dry Fruit Prasadam", shrine: "Somnath", state: "Gujarat", deity: "Shiva", shrineId: "somnath" },
  { name: "Pink Laddu Offering", shrine: "Mahakaleshwar", state: "Madhya Pradesh", deity: "Shiva", shrineId: "mahakaleshwar" },
  { name: "Millet Kheer Blessing", shrine: "Kashi Vishwanath", state: "Uttar Pradesh", deity: "Shiva", shrineId: "kashi-vishwanath" },
  { name: "Coconut Laddu Prasad", shrine: "Kedarnath", state: "Uttarakhand", deity: "Shiva", shrineId: "kedarnath" },
  { name: "Panjiri Thali Sacred", shrine: "Vaishno Devi", state: "Jammu & Kashmir", deity: "Durga", shrineId: "vaishno-devi" },
  { name: "Dry Fruit Sacred Box", shrine: "Tirumala Tirupati", state: "Andhra Pradesh", deity: "Vishnu", shrineId: "tirupati" },
  { name: "Pink Laddu Divine Gift", shrine: "Omkleshwar", state: "Madhya Pradesh", deity: "Shiva", shrineId: "omkareshwar" },
  { name: "Millet Kheer Harmony", shrine: "Trimbakeshwar", state: "Maharashtra", deity: "Shiva", shrineId: "trimbakeshwar" },
  { name: "Coconut Laddu Grace", shrine: "Sri Harmandir Sahib", state: "Punjab", deity: "Waheguru", shrineId: "harmandir-sahib" },
];

function buildAllParshads(): ParshadDiscovery[] {
  return parshadNames.map((p, i) => ({
    id: `parshad-${i}`,
    name: p.name,
    shrineName: p.shrine,
    shrineId: p.shrineId,
    faith: "hindu" as const,
    state: p.state,
    deity: p.deity,
    shortDesc: `Sacred offering from ${p.shrine}`,
    tagline: `Blessings from the divine at ${p.shrine}`,
    legend: `The sacred tradition of ${p.name} has been passed down through generations.`,
    image: parshadImages[i % parshadImages.length],
    items: [p.name],
    giftingRecommendation: `The '${p.name}' Box — A sacred collection from ${p.shrine}`,
    prayer: "Om Namah Shivaya",
    blessingPower: "Grants peace, prosperity, and divine connection.",
    sacredConnection: `Prasadam from ${p.shrine} carries the blessings of ${p.deity}.`,
    morningPrayer: "Om Namah Shivaya",
    variant: i % 5 === 0 ? ("hero" as const) : ("standard" as const),
  }));
}

export const allParshads = buildAllParshads();
