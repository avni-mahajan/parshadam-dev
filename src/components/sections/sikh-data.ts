export type SikhShrine = {
  id: string;
  name: string;
  guru: string;
  location: string;
  state: string;
  tagline: string;
  gurbani: string;
  gurbaniMeaning: string;
  description: string;
  history: string;
  langarNote: string;
  offerings: string[];
  timings: string;
  festivals: string;
  image: string;
  featured?: boolean;
  accentColor: string;
  // Cosmic orbital system metadata
  orbitalLayer?: number;
  orbitEccentricity?: number;
  orbitSpeed?: number;
  orbitPhase?: number;
  energyType?: string;
  cosmicGlow?: string;
};

export const sikhShrines: SikhShrine[] = [
  {
    id: "golden-temple",
    name: "Sri Harmandir Sahib",
    guru: "Guru Arjan Dev Ji — Fifth Sikh Guru",
    location: "Amritsar",
    state: "Punjab",
    tagline: "Where the divine light of Waheguru illuminates all souls equally.",
    gurbani: "ੴ ਸਤਿ ਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ ਨਿਰਭਉ ਨਿਰਵੈਰੁ ਅਕਾਲ ਮੂਰਤਿ ਅਜੂਨੀ ਸੈਭੰ ਗੁਰ ਪ੍ਰਸਾਦਿ॥",
    gurbaniMeaning: "One Universal Creator God. Truth is His Name. Creative Being. Without Fear. Without Hatred. Timeless Form. Beyond Birth. Self-Existent. By Guru's Grace.",
    description: "Sri Harmandir Sahib, known as the Golden Temple, is the holiest shrine in Sikhism. Built around the sacred Amrit Sarovar (Pool of Nectar), it welcomes all regardless of caste, creed, or religion. The temple's four doors symbolize openness to all directions, and its golden dome reflects the divine light that illuminates every soul equally.",
    history: "The sacred Sarovar was excavated in 1577 by Guru Ram Das Ji, the fourth Sikh Guru. Guru Arjan Dev Ji completed the Harmandir Sahib in 1604, installing the Adi Granth (the first version of Guru Granth Sahib) as the eternal Guru. The temple was rebuilt in marble and copper with gold foil overlay by Maharaja Ranjit Singh in the 19th century, earning it the name Golden Temple.",
    langarNote: "The Golden Temple's langar serves approximately 100,000 people daily, making it the world's largest free kitchen. Volunteers prepare simple vegetarian meals in massive cauldrons, embodying the Sikh principle of seva (selfless service) and equality before God.",
    offerings: [
      "Karah Parshad — sacred offering of wheat flour, ghee, and sugar blessed at the Harmandir",
      "Amrit Jal — holy water from the sacred Sarovar, collected in a copper vessel",
      "Rumala Sahib — sacred cloth offered to drape the Guru Granth Sahib",
      "Chaur Sahib — whisk made of yak hair used to honor the Guru Granth Sahib",
    ],
    timings: "Open 24 hours daily. Main ceremonies: Amrit Vela (early morning) at 2:00 AM, Rehras Sahib (evening prayer) at sunset, Kirtan throughout the day.",
    festivals: "Vaisakhi (April), Guru Nanak Gurpurab (November), Diwali (Bandi Chhor Divas), Hola Mohalla",
    image: "https://images.unsplash.com/photo-1589476038537-aef2a0e3bbf8?q=80&w=1200&auto=format&fit=crop",
    featured: true,
    accentColor: "#D4AF37",
    orbitalLayer: 0,
    orbitEccentricity: 0.1,
    orbitSpeed: 1.0,
    orbitPhase: 0,
    energyType: "divine",
    cosmicGlow: "#FFD700",
  },
];
