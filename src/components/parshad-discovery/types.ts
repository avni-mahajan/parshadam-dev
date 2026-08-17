export type Faith = "all" | "hindu" | "sikh";

export type ParshadDiscovery = {
  id: string;
  name: string;
  shrineName: string;
  shrineId: string;
  faith: Exclude<Faith, "all">;
  state: string;
  deity: string;
  shortDesc: string;
  tagline: string;
  legend: string;
  image: string;
  items: string[];
  giftingRecommendation: string;
  prayer: string;
  blessingPower: string;
  sacredConnection: string;
  morningPrayer: string;
  /** Visual variant for layout rhythm */
  variant: "hero" | "standard";
};
