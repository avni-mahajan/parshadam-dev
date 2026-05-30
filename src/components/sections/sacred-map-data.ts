export type Shrine = {
  id: string;
  name: string;
  type: "jyotirlinga" | "shrine" | "sacred-center";
  state: string;
  deity: string;
  tagline: string;
  shortDesc: string;
  sacredConnection: string;
  legend: string;
  rituals: string[];
  offerings: string[];
  timings: string;
  festivals: string;
  pilgrimageQuote: string;
  giftingRecommendation: string;
  image: string;
  available: boolean;
  coordinates: [number, number];
};

export const shrines: Shrine[] = [
  {
    id: "somnath",
    name: "Somnath",
    type: "jyotirlinga",
    state: "Gujarat",
    deity: "Someshwara Mahadev (Lord of the Moon)",
    tagline: "Some journeys begin with faith.",
    shortDesc: "The first among the twelve Jyotirlingas, Somnath stands where the moon god himself sought liberation. Its shores carry blessings older than memory.",
    sacredConnection: "Prasadam from Somnath carries the lunar grace of Shiva — woven into shagun offerings for weddings and annaprashan ceremonies across Gujarat and beyond.",
    legend: "Legend whispers that Chandra, the moon god, was cursed to lose his light. He carved a golden lingam here, bathed in the Triveni Sangam, and prayed. Moved by his devotion, Lord Shiva blessed him with waxing and waning cycles, restoring his radiance. For eternity, this shore represents regeneration, hope, and the light that outlives darkness.",
    rituals: [
      "Pratah Mahapuja at dawn as the ocean tides crash against the sanctum",
      "Somnath Som Ganga Abhishekam with pure waters",
      "Twilight Maha Aarti accompanied by massive ancient brass bells"
    ],
    offerings: [
      "Traditional Somnath Dry Fruit Ladoo",
      "Sacred Ganga Jal in a small copper container",
      "Roli, Sandalwood paste, and a dried Bilva leaf touched to the lingam",
      "Maha-mrityunjay thread blessed in the sanctum"
    ],
    timings: "Open daily from 6:00 AM to 9:30 PM. Light and Sound Show at 8:00 PM.",
    festivals: "Maha Shivratri, Kartik Purnima, Shravan Month Pujas",
    pilgrimageQuote: "“Standing at the edge of the infinite sea, watching the temple spire glow at sunset, I realized that some lights can never be extinguished.” — Pilgrim Aditi",
    giftingRecommendation: "The 'Chandra Grace' Shagun Box — Curated with Somnath dry-fruit prasad, sand from the Triveni banks, and holy threads.",
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=1200&auto=format&fit=crop",
    available: true,
    coordinates: [70.4013, 20.887],
  },
  {
    id: "mahakaleshwar",
    name: "Mahakaleshwar",
    type: "jyotirlinga",
    state: "Madhya Pradesh",
    deity: "Mahakala (The Lord of Time and Death)",
    tagline: "Where generations come to pray together.",
    shortDesc: "The lord of time himself resides in Ujjain — the only south-facing Jyotirlinga. To receive his blessing is to transcend the limits of time.",
    sacredConnection: "Prasadam from Mahakaleshwar graces the most significant milestones — births, weddings, and new beginnings — as an invocation of timeless auspiciousness.",
    legend: "In Ujjain, Lord Shiva appeared as Mahakala to slay a demon who tormented the devoted. Having conquered death itself, Shiva established himself facing South—the direction of Yama, the god of death—to protect his children. It is believed that no king or ruler can spend a night in Ujjain, for Mahakala is the sole, supreme King of this timeless city.",
    rituals: [
      "Bhasma Aarti at 4:00 AM, where the deity is worshipped with sacred ash",
      "Rudrabhishek with pure milk, honey, and sacred herbs",
      "Shringar Darshan in the evening with silver crowns and saffron layers"
    ],
    offerings: [
      "Authentic Ujjain Besan Ladoo cooked in pure cow ghee",
      "Sacred ashes (Bhasmit Vibhuti) from the legendary morning aarti",
      "Rudraksha bead blessed directly on the south-facing Lingam",
      "Handcrafted brass diya carrying Ujjain's sanctum oil"
    ],
    timings: "Open from 4:00 AM to 11:00 PM. Bhasma Aarti requires early registration.",
    festivals: "Maha Shivratri, Shravan Mondays, Sawari of Mahakal",
    pilgrimageQuote: "“The sound of the damru during the Bhasma Aarti reverberated in my chest. In that smoke and fire, time stood completely still.” — Pilgrim Ramesh",
    giftingRecommendation: "The 'Timeless Protection' Hamper — Featuring Ujjain ghee prasadam, blessed Bhasma vibhuti, and a rare panchmukhi rudraksha.",
    image: "https://images.unsplash.com/photo-1545128485-c400e7702796?q=80&w=1200&auto=format&fit=crop",
    available: true,
    coordinates: [75.7685, 23.1765],
  },
  {
    id: "kashi-vishwanath",
    name: "Kashi Vishwanath",
    type: "jyotirlinga",
    state: "Uttar Pradesh",
    deity: "Vishweswara (The Lord of the Universe)",
    tagline: "A place where silence feels divine.",
    shortDesc: "Varanasi, the city of light — where Shiva himself whispers the Taraka mantra into the ears of those who pass. The most sacred city on earth.",
    sacredConnection: "A blessing from Kashi Vishwanath is considered the highest auspicious beginning. It graces every major family ceremony — from birth to marriage.",
    legend: "Kashi is said to rest on the tip of Lord Shiva's Trishul, untouched by the cosmic cycles of creation and destruction. When the Ganges descended to earth, Shiva caught her powerful waters in his matted hair, letting them flow gently through Varanasi to wash away the karma of all souls. It is a city where life and eternity meet in absolute surrender.",
    rituals: [
      "Mangala Aarti at dawn as the Ganges mist rises",
      "Ganga Jal Abhishekam with chanting of the Vedic hymns",
      "Saptarishi Aarti where seven priests offer sacred incensings simultaneously"
    ],
    offerings: [
      "Ancient Kashi Lal Peda made of condensed milk and cardamom",
      "Sacred Ganga Jal collected from the midstream of the holy river",
      "Sandalwood powder and a copper coin touched to the golden spire",
      "Blessed Ganga clay and tulsi seeds in a velvet pouch"
    ],
    timings: "Open from 3:00 AM to 11:00 PM. Best experienced during the Ganga Aarti at dusk.",
    festivals: "Dev Deepawali, Maha Shivratri, Rangbhari Ekadashi",
    pilgrimageQuote: "“In the narrow, incense-laden alleyways of Kashi, I felt a deep quiet that I had searched for my entire life.” — Pilgrim Meera",
    giftingRecommendation: "The 'Mukti & Light' Box — Curated with cardamom peda, Ganga Jal in a brass flask, and blessed sandalwood paste.",
    image: "https://images.unsplash.com/photo-1561361513-2d000a45f0d2?q=80&w=1200&auto=format&fit=crop",
    available: true,
    coordinates: [83.0076, 25.3102],
  },
  {
    id: "kedarnath",
    name: "Kedarnath",
    type: "jyotirlinga",
    state: "Uttarakhand",
    deity: "Kedarनाथ (The Lord of the Mountains)",
    tagline: "Not just a temple — a feeling remembered forever.",
    shortDesc: "Above the clouds, near the Mandakini glacier, Kedarnath stands eternal — a pilgrimage that transforms the heart forever.",
    sacredConnection: "Prasadam from Kedarnath is offered during Griha Pravesh and milestone pujas, bringing the purity of the Himalayas into every home.",
    legend: "After the Kurukshetra war, the Pandavas sought Shiva to seek absolution for their sins. Shiva, wanting to test their resolve, took the form of a bull and hid in the ground. Bhima caught the hump of the bull as it submerged, and Shiva, pleased by their persistence, manifested as the triangular stone lingam in Kedarnath. It remains a monument of divine surrender and enduring strength.",
    rituals: [
      "Mahabhishek at dawn with melted Himalayan snow and ghee",
      "Shiva Sahasranamam Path by the temple head priests",
      "Twilight Aarti in freezing alpine stillness"
    ],
    offerings: [
      "Himalayan Honey and wild dry fruits",
      "Pure Mandakini river water in a glass vial",
      "Dry pine leaves and sacred stone powder from the glacier mountain",
      "Woolen temple thread blessed under the ancient dome"
    ],
    timings: "Open from May to November (closed in winters). Timing: 4:00 AM to 9:00 PM.",
    festivals: "Badri Kedar Utsav, Shravan Purnima",
    pilgrimageQuote: "“At 11,000 feet, surrounded by snow peaks, the bells rang. Every breath was a prayer, and the cold was washed away by tears of joy.” — Pilgrim Sanjay",
    giftingRecommendation: "The 'Alpine Sanctum' Hamper — Blessed mountain honey, glacier water, and Himalayan woolen threads.",
    image: "https://images.unsplash.com/photo-1667932181221-14893a54a6d8?q=80&w=1200&auto=format&fit=crop",
    available: true,
    coordinates: [79.0669, 30.7352],
  },
  {
    id: "vaishno-devi",
    name: "Vaishno Devi",
    type: "sacred-center",
    state: "Jammu & Kashmir",
    deity: "Mata Vaishno Devi (The Eternal Mother)",
    tagline: "Carry motherly blessings home.",
    shortDesc: "The eternal cave of Mata Vaishno Devi in the Trikuta mountains — where millions seek the divine mother's unconditional love.",
    sacredConnection: "Prasadam from Vaishno Devi is especially gifted during daughter's weddings and new birth ceremonies — the mother's blessing for life's most tender moments.",
    legend: "Vaishnavi, a beautiful princess born out of the collective energies of Mahakali, Mahalakshmi, and Mahasaraswati, retreated to these mountains to perform intense meditation. When pursued by a demon, she struck him down in the sacred cave and merged into three natural rock formations (Pindis), promising to stay forever to bless her children with unconditional, maternal shelter.",
    rituals: [
      "Atka Aarti inside the sacred natural cave at twilight",
      "Chunri Shringar where the mother is draped in fine red silks",
      "Pindi Snan with holy spring waters that flow inside the cave"
    ],
    offerings: [
      "Blessed puffed rice (makhana), coconut, and walnuts",
      "A piece of the sacred red silk chunri touched to the mother's pindis",
      "Sacred cave spring water (Charan Paduka Jal)",
      "Silver coin engraved with the three holy Pindis"
    ],
    timings: "Open 24 hours daily. In-cave darshan is continuous except during aarti times.",
    festivals: "Navratri (Chaitra and Sharad), Diwali",
    pilgrimageQuote: "“Walking all night in the misty mountain cold, the moment I saw the lights of the cave, I felt as if my mother was wrapping her arms around me.” — Pilgrim Priya",
    giftingRecommendation: "The 'Mata Chunri' Shagun Box — Authentic puffed rice prasad, blessed red chunri silk, and cave spring water.",
    image: "https://images.unsplash.com/photo-1590073844006-33379778ae09?q=80&w=1200&auto=format&fit=crop",
    available: true,
    coordinates: [74.9523, 32.9942],
  },
  {
    id: "tirupati",
    name: "Tirumala Tirupati",
    type: "sacred-center",
    state: "Andhra Pradesh",
    deity: "Lord Venkateswara (Sri Balaji)",
    tagline: "A threshold of infinite gratitude.",
    shortDesc: "The richest and most visited temple on earth — Venkateswara's grace on the seven hills of Tirumala is said to fulfill every sincere wish.",
    sacredConnection: "The legendary ladoo prasadam from Tirupati is gifted at births, weddings, and achievements — a tangible piece of divine generosity.",
    legend: "Lord Vishnu descended to earth in search of Goddess Lakshmi and married Princess Padmavati on the Tirumala hills. To pay off a celestial loan to Kubera for the wedding, the Lord remains in Tirupati, accepting the humble offerings of his devotees. It is believed that whoever offers their hair or wealth here is relieved of all debt and blessed with infinite abundance.",
    rituals: [
      "Suprabhata Seva at 3:00 AM to gently awaken the Lord with songs",
      "Kalyanotsavam (Celestial Marriage Ritual) celebrated daily",
      "Ekanta Seva at midnight where the Lord is put to rest in a velvet swing"
    ],
    offerings: [
      "The legendary GI-tagged Tirupati Besan Ladoo rich in cardamom and raisins",
      "Sreevari Seshaprasadam (sacred saffron yellow rice)",
      "Blessed Tulsi leaves and camphor paste from the main deity",
      "Kalyana Thread blessed during the celestial wedding"
    ],
    timings: "Open daily from 2:00 AM to 11:30 PM. Crowds are continuous; booking ahead is recommended.",
    festivals: "Srivari Brahmotsavam, Vaikunta Ekadashi, Rathasapthami",
    pilgrimageQuote: "“In the split second I stood before the giant black stone deity, covered in diamonds and sandalwood, I forgot every prayer I came with. I just wept in gratitude.” — Pilgrim Kiran",
    giftingRecommendation: "The 'Srivari Abundance' Box — Curated with Tirupati Ladoo prasad, sacred Kalyan wedding threads, and holy tulsi seeds.",
    image: "https://images.unsplash.com/photo-1608958416715-4ba8b6f3c1b6?q=80&w=1200&auto=format&fit=crop",
    available: true,
    coordinates: [79.3747, 13.6833],
  },
  {
    id: "omkareshwar",
    name: "Omkareshwar",
    type: "jyotirlinga",
    state: "Madhya Pradesh",
    deity: "Omkareshwar (Lord of the Sound OM)",
    tagline: "Where the cosmic sound takes form.",
    shortDesc: "An island shaped like the sacred syllable OM — Omkareshwar is where the divine geometry of existence meets the flowing Narmada.",
    sacredConnection: "The sacred offerings here, marked by the sound of OM, become part of family puja thalis during housewarming rituals and annual prayers.",
    legend: "When the Vindhya mountain performed intense penance to please Lord Shiva, the Lord divided his presence into two parts: Omkareshwar (the lord of the OM sound) and Mamleshwar (the lord of the material world). The island itself is carved by the river Narmada into the physical visual shape of the Sanskrit symbol OM, connecting geography with divinity.",
    rituals: [
      "Narmada River Jal Abhishekam at morning hours",
      "Panchamrit Snan with milk, curd, honey, sugar, and ghee",
      "Shayan Aarti with traditional sitar and flute hymns"
    ],
    offerings: [
      "Narmada sand-shaped Shiva Lingam (Narmadeshwar) pocket token",
      "Omkareshwar peda infused with dry saffron",
      "Sacred river sand blessed at the Om-point ghats",
      "Bilva leaves and holy red threads"
    ],
    timings: "Open from 5:00 AM to 10:00 PM. Boat rides are available around the OM island.",
    festivals: "Maha Shivratri, Narmada Jayanti",
    pilgrimageQuote: "“Sitting in a wooden boat, seeing the OM-shaped island illuminated with small oil lamps, the word 'peace' acquired a whole new meaning.” — Pilgrim Lakshmi",
    giftingRecommendation: "The 'Cosmic Sound' Kit — Features a Narmadeshwar stone token, Omkareshwar saffron peda, and Narmada ghat sand.",
    image: "https://images.unsplash.com/photo-1609137144813-f61cf1b9cf2a?q=80&w=1200&auto=format&fit=crop",
    available: true,
    coordinates: [76.1462, 22.2483],
  },
  {
    id: "trimbakeshwar",
    name: "Trimbakeshwar",
    type: "jyotirlinga",
    state: "Maharashtra",
    deity: "Trimbakeshwara (The Three-Eyed Lord)",
    tagline: "A union of Brahma, Vishnu, and Mahesh.",
    shortDesc: "The sacred source of the Godavari river, Trimbakeshwar is one of the few shrines with three faces — Brahma, Vishnu, and Shiva as one.",
    sacredConnection: "Prasadam from this trinity shrine is offered during Navchandi homams and family pujas, invoking the three cosmic forces for prosperity.",
    legend: "Sage Gautama was falsely accused of killing a cow. To purify himself, he prayed intensely for Shiva to bring the Ganges to his hermitage. Shiva appeared and released the River Godavari (Gautami Ganga) from his matted locks. Since the sage desired Shiva, Brahma, and Vishnu to reside there, the divine lingam formed with three distinct faces inside a water-filled depression.",
    rituals: [
      "Rudrabhishek using pure Godavari water",
      "Kala Dhaga Abhishekam for protection from planetary lines",
      "Sahasra Trishul offering puja at evening"
    ],
    offerings: [
      "Trimbak Besan Ladoo made of select black chana flour",
      "Blessed black cotton protection thread (Kala Dhaga)",
      "Godavari River water in a tiny brass copper pitcher",
      "Sacred ash (vibhuti) from the ancient havan kund"
    ],
    timings: "Open from 5:30 AM to 9:00 PM. Special entry is available for abhishek tickets.",
    festivals: "Maha Shivratri, Sinhastha Kumbh Mela (once in 12 years)",
    pilgrimageQuote: "“In the small water-filled hollow of the lingam, seeing the three distinct faces of the trinity, I felt a deep relief. My past and future were in safe hands.” — Pilgrim Vijay",
    giftingRecommendation: "The 'Trinity Harmony' Box — Curated with Godavari water, protective black thread, and Trimbak prasad ladoo.",
    image: "https://images.unsplash.com/photo-1598977123418-45f04b615aa0?q=80&w=1200&auto=format&fit=crop",
    available: true,
    coordinates: [73.5458, 19.9392],
  }
];

export const defaultShrine = shrines[0];
