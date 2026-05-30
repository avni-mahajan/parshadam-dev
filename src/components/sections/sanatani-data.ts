export type FaithShrine = {
  id: string;
  name: string;
  deity: string;
  location: string;
  state: string;
  tagline: string;
  shloka: string;
  slokaMeaning: string;
  description: string;
  legend: string;
  offerings: string[];
  timings: string;
  festivals: string;
  image: string;
  featured?: boolean;
  accentColor: string;
  // Cosmic orbital system metadata
  orbitalLayer?: number;      // 0 = inner, 1 = middle, 2 = outer
  orbitEccentricity?: number;  // 0 = circular, higher = more elliptical (0-0.5)
  orbitSpeed?: number;         // Relative speed multiplier
  orbitPhase?: number;         // Starting angle offset in degrees
  chakra?: string;             // Associated chakra
  energyType?: string;         // e.g., "divine", "fierce", "nurturing"
  cosmicGlow?: string;         // Glow color for cosmic effects
};

export const sanataniShrines: FaithShrine[] = [
  {
    id: "badrinath",
    name: "Badrinath",
    deity: "Lord Vishnu — Badrinarayan, the Eternal Protector",
    location: "Chamoli District",
    state: "Uttarakhand",
    tagline: "Where Vishnu meditates eternally in the lap of the Himalayas.",
    shloka:
      "बदरीनाथ महाबाहो नारायण जनार्दन। दयासागर विश्वेश लक्ष्मीकान्त नमोस्तुते॥",
    slokaMeaning:
      "O mighty-armed Badrinarayan, O Narayana who removes the sorrows of all, O ocean of compassion, Lord of the Universe, beloved of Lakshmi — I bow to you.",
    description:
      "Perched at 10,279 feet in the Garhwal Himalayas, Badrinath is among the holiest of the four Char Dhams of India. Lord Vishnu is said to have meditated here for thousands of years, protected by two mountains — Nar and Narayana — and surrounded by the celestial Alakananda river. A pilgrimage here washes away sins of a thousand lifetimes.",
    legend:
      "Lord Vishnu, while meditating at this sacred spot, was protected from snow and rain by a Badri (jujube) tree. Goddess Lakshmi herself took the form of the tree to shelter her lord. When Vishnu awakened, he named this sacred land Badrika Ashrama — the hermitage of Badri — in gratitude. Adi Shankaracharya later found the idol of Badrinarayan in the Alakananda river and enshrined it in the temple in the 8th century AD.",
    offerings: [
      "Panchamrit abhishek — bathing the deity with milk, curd, ghee, honey, and sugar",
      "Tulsi dal and Badri prashad blessed at the inner sanctum",
      "Charnodak — sacred water touched to the Lord's feet",
      "Sacred thread (janeu) offered with Vishnu Sahasranama chanting",
    ],
    timings:
      "Open May to November (closes for winter). Daily from 4:30 AM to 9:00 PM with multiple aarti timings.",
    festivals: "Badri-Kedar Festival, Mata Murti Ka Mela, Dev Deepawali",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1200&auto=format&fit=crop",
    featured: true,
    accentColor: "#4A90E2",
    orbitalLayer: 0,
    orbitEccentricity: 0.1,
    orbitSpeed: 1.0,
    orbitPhase: 0,
    chakra: "Crown (Sahasrara)",
    energyType: "divine",
    cosmicGlow: "#6DAEDB",
  },
  {
    id: "rameswaram",
    name: "Rameswaram",
    deity: "Lord Shiva — Ramanathaswamy, Eternal Witness",
    location: "Pamban Island",
    state: "Tamil Nadu",
    tagline: "Where Ram himself worshipped Shiva on the shores of the ocean.",
    shloka:
      "रामेश्वरं महादेवं रामचन्द्रार्चितं प्रभुम्। श्रीरामनाथं देवेशं प्रणमामि शिवं सदा॥",
    slokaMeaning:
      "I bow to the great Mahadeva of Rameswaram, worshipped by Ramachandra — the Lord Ramanathaswamy, ruler of all gods, ever auspicious Shiva.",
    description:
      "Rameswaram, on the southernmost tip of India, is where Lord Rama himself installed and worshipped the Shivalingam after his victorious battle in Lanka. The temple's magnificent corridor — over 1,200 metres in length — is the longest temple corridor in the world, lined with magnificent stone pillars carved with divine figures.",
    legend:
      "After slaying Ravana, Lord Rama wished to purify himself of the sin of brahmahatya (killing of a brahmin). Sage Agastya advised him to install a Shivalingam here at the southernmost tip of India and worship Lord Shiva. Rama sent Hanuman to Kashi to bring a sacred Shivalingam. When Hanuman was delayed, Goddess Sita herself fashioned a lingam from the sacred sand of the beach — and this lingam, installed by Sita's own hands, is the one worshipped at Rameswaram today.",
    offerings: [
      "Abhishek with 22 sacred wells of the temple — each with distinct properties",
      "Sea water from the Ram Setu channel offered to the Shivalingam",
      "Sacred ash (vibhuti) and bilva leaves offered at the inner sanctum",
      "Lighting the eternal lamp with pure sesame oil",
    ],
    timings:
      "Open daily 5:00 AM to 1:00 PM and 3:00 PM to 9:00 PM. Special abhishek at 5:00 AM.",
    festivals: "Maha Shivaratri, Brahmotsavam, Thirukalyanam",
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1200&auto=format&fit=crop",
    featured: true,
    accentColor: "#E8C87A",
    orbitalLayer: 1,
    orbitEccentricity: 0.2,
    orbitSpeed: 0.85,
    orbitPhase: 90,
    chakra: "Throat (Vishuddha)",
    energyType: "eternal",
    cosmicGlow: "#F5D78E",
  },
  {
    id: "jagannath-puri",
    name: "Shri Jagannath Puri",
    deity: "Lord Jagannath — Lord of the Universe",
    location: "Puri",
    state: "Odisha",
    tagline: "The universe resides in his infinite gaze.",
    shloka:
      "नीलाद्रिनिलये नित्यं नीलमेघसमप्रभ। नीलकण्ठप्रियः श्रीमान् जगन्नाथः प्रसीदतु॥",
    slokaMeaning:
      "He who dwells on the Blue Mountain, who shines like the blue cloud, beloved of Neelkantha — may Lord Jagannath, the gracious, be ever pleased.",
    description:
      "One of the four sacred Dhams of India, Shri Jagannath Puri holds the divine cosmic form of Lord Vishnu. The legendary Rath Yatra — the grand chariot festival — draws millions who believe even a single glimpse of the Lord bestows liberation from the cycle of birth and death.",
    legend:
      "Lord Jagannath's form is deliberately unfinished — no feet, no hands fully formed. When King Indradyumna commissioned the divine artisan Vishwakarma to craft the Lord's idol, Vishwakarma set one absolute condition: no one may enter until the work is complete. Overcome with anticipation, the King opened the doors early. The idol stood — unfinished, yet radiating an unearthly completeness. As if the Lord himself had chosen this form to remind us: divinity transcends the need for perfection.",
    offerings: [
      "Mahaprasad — rice, dal, and vegetables cooked in 56 earthen pots stacked over sacred fire",
      "Chhappan Bhog — 56 sacred food preparations offered at the divine altar",
      "Tulsi garland touched to the deity's chest",
      "Sacred flower petals swept from the sanctum floor",
    ],
    timings:
      "Open from 5:00 AM to 12:00 PM and 4:00 PM to 8:00 PM. Entry for Hindus only.",
    festivals: "Rath Yatra (June–July), Snana Yatra, Janmashtami, Diwali",
    image:
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1200&auto=format&fit=crop",
    featured: true,
    accentColor: "#E8A020",
    orbitalLayer: 0,
    orbitEccentricity: 0.15,
    orbitSpeed: 1.0,
    orbitPhase: 0,
    chakra: "Crown (Sahasrara)",
    energyType: "fierce",
    cosmicGlow: "#E8A020",
  },
  {
    id: "maa-mangla",
    name: "Maa Mangla",
    deity: "Goddess Mangla — Divine Mother of Auspiciousness",
    location: "Kakatpur, Puri District",
    state: "Odisha",
    tagline: "She who blesses every sacred beginning.",
    shloka:
      "सर्वमंगलमांगल्ये शिवे सर्वार्थसाधिके। शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तुते॥",
    slokaMeaning:
      "O Goddess, auspiciousness of all auspicious things, fulfiller of every desire, O Gauri — to you, Narayani, I bow in surrender.",
    description:
      "Maa Mangla, enshrined at Kakatpur near Puri, is believed to have guided Lord Jagannath himself in a vision to reveal his divine form to the world. She is the eternal mother who consecrates every beginning — before any sacred ceremony, pilgrims seek her blessing first.",
    legend:
      "King Indradyumna received a divine dream in which Maa Mangla personally directed him to the sacred log of Daru wood floating on the ocean — the wood from which Lord Jagannath's form was to be carved. Every twelve years, during the sacred Nabakalebara ceremony — the renewal of Jagannath's form — it is Maa Mangla who is consulted first, making her the eternal divine counsellor of Puri.",
    offerings: [
      "Sacred red sindoor applied to the goddess's feet",
      "Fragrant red hibiscus flower garlands",
      "Freshly made khichdi prasad cooked in pure ghee",
      "Mango leaf torans blessed in the sanctum",
    ],
    timings: "Open daily from 5:00 AM to 8:30 PM. Grand aarti at dawn and dusk.",
    festivals: "Navratri, Durga Puja, Nabakalebara",
    image:
      "https://images.unsplash.com/photo-1590073844006-33379778ae09?q=80&w=1200&auto=format&fit=crop",
    featured: false,
    accentColor: "#C2185B",
    orbitalLayer: 1,
    orbitEccentricity: 0.25,
    orbitSpeed: 0.8,
    orbitPhase: 72,
    chakra: "Sacral (Svadhishthana)",
    energyType: "nurturing",
    cosmicGlow: "#C2185B",
  },
  {
    id: "maa-chamunda-devi",
    name: "Maa Chamunda Devi",
    deity: "Maa Chamunda — Fierce Goddess of the Dhauladhar",
    location: "Kangra District",
    state: "Himachal Pradesh",
    tagline: "Fierce grace descends from Himalayan heights.",
    shloka:
      "या देवी सर्वभूतेषु शक्तिरूपेण संस्थिता। नमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः॥",
    slokaMeaning:
      "Salutations to the Goddess present in all beings as pure power. Bow to her, bow to her, bow to her — again and again.",
    description:
      "Nestled within the Dhauladhar ranges of Himachal Pradesh, Maa Chamunda Devi is one of the most revered Shakti shrines of North India. She is the fierce mother — destroyer of ignorance and evil, and the fiercest protector of those who surrender to her with pure hearts.",
    legend:
      "After the mighty demons Chanda and Munda threatened the cosmic order, the Goddess Durga manifested in her terrifying form — Chamunda — and slew them both. Pleased by her fierce compassion, Lord Brahma named her Chamunda. She chose the Kangra hills as her eternal abode, promising all who climb these mountains with faith that she would remove every obstacle from their path.",
    offerings: [
      "Red chunri and bangles offered at the deity's feet",
      "Sindoor and kumkum sacred to the goddess",
      "Coconut blessed at the inner sanctum fire",
      "Sacred spring water from the Himalayan source",
    ],
    timings:
      "Open from 5:00 AM to 9:00 PM. Special morning aarti at 6:00 AM.",
    festivals: "Navratri (Chaitra and Sharad), Dussehra, Ashtami Puja",
    image:
      "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=1200&auto=format&fit=crop",
    featured: false,
    accentColor: "#8B1A1A",
    orbitalLayer: 2,
    orbitEccentricity: 0.35,
    orbitSpeed: 0.6,
    orbitPhase: 144,
    chakra: "Root (Muladhara)",
    energyType: "fierce",
    cosmicGlow: "#8B1A1A",
  },
  {
    id: "chintpurni",
    name: "Chintpurni",
    deity: "Maa Chintpurni — She Who Dissolves Every Worry",
    location: "Una District",
    state: "Himachal Pradesh",
    tagline: "Leave every burden at her sacred feet.",
    shloka:
      "जय माता दी। माँ चिंतपूर्णी, सब चिंता हरो। कृपा करो, आशीष भरो।",
    slokaMeaning:
      "Victory to the Divine Mother. O Maa Chintpurni — take away all worries. Grant your grace and fill every heart with your blessings.",
    description:
      "Maa Chintpurni — she who fulfills all worries — is a Chhinnamasta manifestation of Shakti at the Shivalik foothills. Millions arrive here carrying the weight of life's heaviest moments, and every single one leaves lighter. The Goddess has promised that anyone who surrenders their troubles here, she absorbs them herself.",
    legend:
      "A devoted woman, broken by grief and unable to bear her family's suffering, sat at this very spot and prayed without rest. The Goddess appeared and made her a sacred promise: whoever comes to this place and truly surrenders their worry, I will take it as my own. The temple marks where the Goddess's celestial feet (pindis) touched the earth — and every pilgrim who walks this ground walks away with a lighter soul.",
    offerings: [
      "Sacred laddoo prasad from the temple kitchen",
      "Blue lotus flower placed before the pindis",
      "A wish thread tied at the divine sacred tree",
      "Sacred ash from the eternal fire ceremony",
    ],
    timings:
      "Open from 4:30 AM to 9:30 PM. Aarti at 5:00 AM and 8:30 PM.",
    festivals: "Navratri, Shravan Ashtami, Mela Chintpurni",
    image:
      "https://images.unsplash.com/photo-1598977123418-45f04b615aa0?q=80&w=1200&auto=format&fit=crop",
    featured: false,
    accentColor: "#7B1FA2",
    orbitalLayer: 1,
    orbitEccentricity: 0.2,
    orbitSpeed: 0.9,
    orbitPhase: 216,
    chakra: "Third Eye (Ajna)",
    energyType: "nurturing",
    cosmicGlow: "#7B1FA2",
  },
  {
    id: "jawali-ji",
    name: "Jawali Ji",
    deity: "Maa Jawala Ji — Goddess of the Eternal Sacred Flame",
    location: "Kangra District",
    state: "Himachal Pradesh",
    tagline: "An eternal flame that no force on earth can extinguish.",
    shloka:
      "ज्वाला मुखे सदा देवि ज्वालाज्वलित विग्रहे। महादेव प्रिये देवि सर्वपापहरे नमः॥",
    slokaMeaning:
      "O Goddess who dwells in the sacred flame, whose form is ablaze with divine fire, O beloved of Mahadev, destroyer of all sins — to you I bow.",
    description:
      "Jawala Ji (Jwalamukhi) is a unique Shakti Pitha where no carved idol is worshipped — the Goddess manifests herself as nine eternal natural flames that have burned for thousands of years without any external fuel. No science can explain them. No force has ever extinguished them. They simply burn — because the Goddess wills it.",
    legend:
      "This is one of the 51 Shakti Pithas — where the tongue of Goddess Sati fell as Lord Vishnu divided her body after her self-immolation. The flames here are not ordinary fire; they are the living breath of the Goddess herself. Emperor Akbar once dispatched armies to divert river water and extinguish the flames — they burned on, unchanged. Humbled, he offered a gold umbrella. It turned to a different metal — an offering the Goddess chose to transform, not to accept with pride.",
    offerings: [
      "Pure cow ghee lamp offered before the nine eternal flames",
      "Gold-leaf garland draped at the sacred flame pillar",
      "Sacred incense sticks lit from the eternal fire",
      "Vibhuti — sacred ash collected from the eternal flame",
    ],
    timings:
      "Open from 5:00 AM to 10:00 PM. Most mystical experience at night when flames glow visibly.",
    festivals: "Navratri, Maha Ashtami, Durgashtami",
    image:
      "https://images.unsplash.com/photo-1667932181221-14893a54a6d8?q=80&w=1200&auto=format&fit=crop",
    featured: false,
    accentColor: "#F57C00",
    orbitalLayer: 2,
    orbitEccentricity: 0.3,
    orbitSpeed: 0.7,
    orbitPhase: 288,
    chakra: "Solar Plexus (Manipura)",
    energyType: "fierce",
    cosmicGlow: "#F57C00",
  },
  {
    id: "kashi-vishwanath",
    name: "Kashi Vishwanath",
    deity: "Lord Shiva — Vishwanath, Lord of the Universe",
    location: "Varanasi",
    state: "Uttar Pradesh",
    tagline: "The city where Shiva himself dissolves all karma at life's end.",
    shloka:
      "विश्वनाथं महादेवं त्रिलोकेशं त्रयम्बकम्। गङ्गाधरं महादेवं काशीनाथं नमाम्यहम्॥",
    slokaMeaning:
      "I bow to Vishwanath the great Mahadeva, lord of the three worlds, the three-eyed one, bearer of the Ganga — I salute Kashinath, the eternal lord of Kashi.",
    description:
      "Kashi Vishwanath stands at the heart of Varanasi — the oldest living city on earth. Lord Shiva himself is said to reside here in the form of Jyotirlinga, one of the 12 most sacred Shiva shrines. Dying in Kashi is believed to grant instant liberation (moksha), as Shiva himself whispers the Taraka mantra into the ear of those who depart from this sacred soil.",
    legend:
      "When Lord Vishnu asked Brahma where one could attain liberation without lifetimes of tapas, Shiva appeared before them both at Kashi and revealed: this is my city. Whoever dies here, I myself grant them moksha — directly, without condition. This sacred promise is the reason Kashi has been the destination of dying pilgrims for over 3,000 years. The eternal flames of the Manikarnika Ghat have not been extinguished in recorded human history.",
    offerings: [
      "Gangajal — sacred Ganga water poured over the Shivalingam at dawn",
      "Bilva leaves offered in the sacred pattern of three leaves together",
      "Dhatura flowers sacred to Lord Shiva",
      "Bhasma — sacred ash from the Manikarnika cremation ghat",
    ],
    timings:
      "Open daily 2:30 AM to 11:00 PM. Mangala aarti at 3:00 AM is the most mystical experience.",
    festivals: "Maha Shivaratri, Dev Deepawali, Shravan Month, Nag Panchami",
    image:
      "https://images.unsplash.com/photo-1561361513-2d000a45f0d2?q=80&w=1200&auto=format&fit=crop",
    featured: true,
    accentColor: "#8B6C42",
    orbitalLayer: 0,
    orbitEccentricity: 0.12,
    orbitSpeed: 0.9,
    orbitPhase: 270,
    chakra: "Third Eye (Ajna)",
    energyType: "liberating",
    cosmicGlow: "#C4A05A",
  },
];
