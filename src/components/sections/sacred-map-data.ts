export type Shrine = {
  id: string;
  name: string;
  type: "jyotirlinga" | "shrine" | "sacred-center";
  state: string;
  shortDesc: string;
  sacredConnection: string;
  available: boolean;
  // Real geographic coordinates [longitude, latitude]
  coordinates: [number, number];
};

export const shrines: Shrine[] = [
  {
    id: "somnath",
    name: "Somnath",
    type: "jyotirlinga",
    state: "Gujarat",
    shortDesc:
      "The first among the twelve Jyotirlingas, Somnath stands where the moon god himself sought liberation. Its shores carry blessings older than memory.",
    sacredConnection:
      "Prasadam from Somnath carries the lunar grace of Shiva — woven into shagun offerings for weddings and annaprashan ceremonies across Gujarat and beyond.",
    available: true,
    coordinates: [70.4013, 20.887],
  },
  {
    id: "nageshwar",
    name: "Nageshwar",
    type: "jyotirlinga",
    state: "Gujarat",
    shortDesc:
      "Nestled near the sacred Gomti Ghat of Dwarka, Nageshwar is the guardian of all serpent energy — a place of deep, primal devotion.",
    sacredConnection:
      "Blessings from Nageshwar are traditionally sought before naming ceremonies and thread rituals, forming a protective beginning for every new chapter.",
    available: false,
    coordinates: [69.0744, 22.3486],
  },
  {
    id: "mahakaleshwar",
    name: "Mahakaleshwar",
    type: "jyotirlinga",
    state: "Madhya Pradesh",
    shortDesc:
      "The lord of time himself resides in Ujjain — the only south-facing Jyotirlinga. To receive his blessing is to transcend the limits of time.",
    sacredConnection:
      "Prasadam from Mahakaleshwar graces the most significant milestones — births, weddings, and new beginnings — as an invocation of timeless auspiciousness.",
    available: true,
    coordinates: [75.7685, 23.1765],
  },
  {
    id: "omkareshwar",
    name: "Omkareshwar",
    type: "jyotirlinga",
    state: "Madhya Pradesh",
    shortDesc:
      "An island shaped like the sacred syllable OM — Omkareshwar is where the divine geometry of existence meets the flowing Narmada.",
    sacredConnection:
      "The sacred offerings here, marked by the sound of OM, become part of family puja thalis during housewarming rituals and annual prayers.",
    available: true,
    coordinates: [76.1462, 22.2483],
  },
  {
    id: "bhimashankar",
    name: "Bhimashankar",
    type: "jyotirlinga",
    state: "Maharashtra",
    shortDesc:
      "Rising from the misty Sahyadri hills, Bhimashankar is the source of the Bhima River — where nature itself becomes the sanctum.",
    sacredConnection:
      "Blessings from Bhimashankar accompany engagement rituals and promise ceremonies, invoking strength and steady love for new unions.",
    available: false,
    coordinates: [73.5358, 19.0735],
  },
  {
    id: "trimbakeshwar",
    name: "Trimbakeshwar",
    type: "jyotirlinga",
    state: "Maharashtra",
    shortDesc:
      "The sacred source of the Godavari river, Trimbakeshwar is one of the few shrines with three faces — Brahma, Vishnu, and Shiva as one.",
    sacredConnection:
      "Prasadam from this trinity shrine is offered during Navchandi homams and family pujas, invoking the three cosmic forces for prosperity.",
    available: true,
    coordinates: [73.5458, 19.9392],
  },
  {
    id: "grishneshwar",
    name: "Grishneshwar",
    type: "jyotirlinga",
    state: "Maharashtra",
    shortDesc:
      "The last of the twelve Jyotirlingas, Grishneshwar stands near the ancient caves of Ellora — completing the sacred circle of Shiva across India.",
    sacredConnection:
      "Blessings from Grishneshwar mark the completion of family cycles — offered during vastu pujas and annual ancestral remembrances.",
    available: false,
    coordinates: [75.1685, 20.0247],
  },
  {
    id: "mallikarjuna",
    name: "Mallikarjuna",
    type: "jyotirlinga",
    state: "Andhra Pradesh",
    shortDesc:
      "Atop the Nallamalai hills, Srisailam is where Shiva and Parvati reside together — a testament that love and divinity are inseparable.",
    sacredConnection:
      "Prasadam from Mallikarjuna is specially sought for wedding blessings — an invocation of the divine couple for new marriages.",
    available: true,
    coordinates: [78.8654, 16.0754],
  },
  {
    id: "kashi-vishwanath",
    name: "Kashi Vishwanath",
    type: "jyotirlinga",
    state: "Uttar Pradesh",
    shortDesc:
      "Varanasi, the city of light — where Shiva himself whispers the Taraka mantra into the ears of those who pass. The most sacred city on earth.",
    sacredConnection:
      "A blessing from Kashi Vishwanath is considered the highest auspicious beginning. It graces every major family ceremony — from birth to marriage.",
    available: true,
    coordinates: [83.0076, 25.3102],
  },
  {
    id: "kedarnath",
    name: "Kedarnath",
    type: "jyotirlinga",
    state: "Uttarakhand",
    shortDesc:
      "Above the clouds, near the Mandakini glacier, Kedarnath stands eternal — a pilgrimage that transforms the heart forever.",
    sacredConnection:
      "Prasadam from Kedarnath is offered during Griha Pravesh and milestone pujas, bringing the purity of the Himalayas into every home.",
    available: true,
    coordinates: [79.0669, 30.7352],
  },
  {
    id: "vaidyanath",
    name: "Vaidyanath",
    type: "jyotirlinga",
    state: "Jharkhand",
    shortDesc:
      "Baidyanath Dham — the physician of the gods. Legend holds that even Ravana could not claim this linga fully. A shrine of healing and surrender.",
    sacredConnection:
      "Blessings from Vaidyanath are offered during recovery pujas, baby showers, and ceremonies that mark new health and new life.",
    available: false,
    coordinates: [86.6946, 24.4867],
  },
  {
    id: "ramanathaswamy",
    name: "Ramanathaswamy",
    type: "jyotirlinga",
    state: "Tamil Nadu",
    shortDesc:
      "On the sacred island of Rameswaram, Ram installed this linga himself before crossing to Lanka. A pilgrimage here washes away every past karma.",
    sacredConnection:
      "Prasadam from Rameswaram is offered during pitru tarpan and family ancestral ceremonies, honoring the sacred duty of remembrance.",
    available: false,
    coordinates: [79.3132, 9.2881],
  },
  {
    id: "vaishno-devi",
    name: "Vaishno Devi",
    type: "sacred-center",
    state: "Jammu & Kashmir",
    shortDesc:
      "The eternal cave of Mata Vaishno Devi in the Trikuta mountains — where millions seek the divine mother's unconditional love.",
    sacredConnection:
      "Prasadam from Vaishno Devi is especially gifted during daughter's weddings and new birth ceremonies — the mother's blessing for life's most tender moments.",
    available: true,
    coordinates: [74.9523, 32.9942],
  },
  {
    id: "tirupati",
    name: "Tirumala Tirupati",
    type: "sacred-center",
    state: "Andhra Pradesh",
    shortDesc:
      "The richest and most visited temple on earth — Venkateswara's grace on the seven hills of Tirumala is said to fulfill every sincere wish.",
    sacredConnection:
      "The legendary ladoo prasadam from Tirupati is gifted at births, weddings, and achievements — a tangible piece of divine generosity.",
    available: true,
    coordinates: [79.3747, 13.6833],
  },
  {
    id: "puri-jagannath",
    name: "Jagannath Puri",
    type: "sacred-center",
    state: "Odisha",
    shortDesc:
      "Lord Jagannath — the Lord of the Universe — resides in Puri with open arms, welcoming all, transcending every boundary of caste and creed.",
    sacredConnection:
      "The mahaprasad of Jagannath is unique — cooked in massive clay pots, it is offered during community feasts and joyful family gatherings.",
    available: false,
    coordinates: [85.8312, 19.8048],
  },
];

export const defaultShrine = shrines[0];
