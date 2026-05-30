export type SikhiShrine = {
  id: string;
  name: string;
  gurudwaraTitle: string;
  location: string;
  state: string;
  tagline: string;
  gurbani: string;
  gurbaniMeaning: string;
  description: string;
  history: string;
  langarNote: string;
  image: string;
  available: boolean;
};

export type ComingSoonShrine = {
  id: string;
  name: string;
  location: string;
  tagline: string;
  image: string;
};

export const sikhiShrines: SikhiShrine[] = [
  {
    id: "golden-temple",
    name: "Harmandir Sahib",
    gurudwaraTitle: "Sri Harmandir Sahib — The Golden Temple",
    location: "Amritsar",
    state: "Punjab",
    tagline: "The house of God, open to all, for all eternity.",
    gurbani:
      "ਏਕ ਓਅੰਕਾਰ ਸਤਿ ਨਾਮੁ ਕਰਤਾ ਪੁਰਖੁ ਨਿਰਭਉ ਨਿਰਵੈਰੁ ਅਕਾਲ ਮੂਰਤਿ ਅਜੂਨੀ ਸੈਭੰ ਗੁਰ ਪ੍ਰਸਾਦਿ",
    gurbaniMeaning:
      "One Universal Creator God. The Name Is Truth. Creative Being Personified. No Fear. No Hatred. Image of the Timeless Being. Beyond Birth. Self-Existent. By Guru's Grace.",
    description:
      "Sri Harmandir Sahib — the Golden Temple — is the holiest Gurdwara of Sikhism and one of the most sacred sites on earth. Built by Guru Arjan Dev Ji, the fifth Sikh Guru, it sits at the centre of Amrit Sarovar — the Pool of Divine Nectar — its gold-plated dome reflecting eternally in the still sacred waters below. Here, the Guru Granth Sahib — the eternal, living Guru — is recited day and night without interruption.",
    history:
      "The site was originally a sacred pool of water at the edge of a forest. Guru Ram Das Ji, the fourth Sikh Guru, began excavating Amrit Sarovar. His successor, Guru Arjan Dev Ji, then designed and personally built Harmandir Sahib at the heart of this pool. He made a profound choice: the Gurdwara would stand lower than the surrounding land — a symbol of humility — with four entrances on each side, welcoming all people from all directions, of all faiths. Maharaja Ranjit Singh later covered the sanctum with pure gold, giving it the name the world knows today.",
    langarNote:
      "The Langar — the free community kitchen — at Harmandir Sahib serves over 100,000 people every single day, regardless of faith, caste, creed, or status. It is the world's largest free community kitchen, and it has never stopped for war, famine, or plague.",
    image:
      "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?q=80&w=1200&auto=format&fit=crop",
    available: true,
  },
];

export const comingSoonSikhiShrines: ComingSoonShrine[] = [
  {
    id: "hemkund-sahib",
    name: "Hemkund Sahib",
    location: "Chamoli, Uttarakhand",
    tagline: "The highest Gurdwara, cradled among eternal glaciers.",
    image:
      "https://images.unsplash.com/photo-1667932181221-14893a54a6d8?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "bangla-sahib",
    name: "Gurudwara Bangla Sahib",
    location: "New Delhi",
    tagline: "The sacred pool of healing that has never run dry.",
    image:
      "https://images.unsplash.com/photo-1609137144813-f61cf1b9cf2a?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "anandpur-sahib",
    name: "Anandpur Sahib",
    location: "Rupnagar, Punjab",
    tagline: "The city of bliss where the Khalsa was born.",
    image:
      "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=800&auto=format&fit=crop",
  },
];
