import type { LocationMap } from "$lib/maps";

/** One event during the best week. Fill in or duplicate the example entries. */
export type Event = {
  id: string;
  title: string;
  emoji: string;
  /** ISO date, e.g. "2026-06-02" — used for sorting and display */
  date: string;
  /** Optional time range shown on the card, e.g. "7:00 PM" or "10 AM – 5 PM" */
  time?: string;
  location: string;
  /**
   * Optional map links: `geo:` on touch devices, Google Maps search on desktop.
   * `query` is usually the same as `location` or a fuller address; add `lat`/`lng` when you have them.
   */
  locationMap?: LocationMap;
  /** Short line for the promo page */
  blurb: string;
  /** Link to tickets or official event page */
  url?: string;
  free?: boolean;
};

/** Week-level copy — adjust to match your real dates */
export const bestWeek = {
  label: "LNK @ ITS BEST",
  startDate: "2026-05-30",
  endDate: "2026-06-06",
  tagline:
    "This week is the ideal week in Lincoln. Invite your friends, family, crush, or that pesky situationship out to fun event while the weather is still nice! There's something for everyone, and it's your chance to set the tone for the summer.",
} as const;

export const events: Event[] = [
  {
    id: "soul-night",
    title: "Old Pub Soul Club",
    emoji: "🪩",
    date: "2026-05-30",
    time: "10:00 PM to 2:00 AM",
    location: "The Old Pub",
    locationMap: {
      query: "420 S 11th St, Lincoln, NE 68508",
      lat: 40.8098202,
      lng: -96.7077718,
    },
    blurb:
      "The best week in Lincoln kicks off with the best night of dance, music, and good vibes. Soul Club lands on the last Saturday of the month ($3 cover, 21+)—and this time it kicks off a full week of festivities.",
    url: "https://www.facebook.com/theoldpubllc/",
    free: false,
  },
  {
    id: "sunday-farmers-market",
    title: "Sunday Farmers' Market at College View",
    emoji: "🧺",
    date: "2026-05-31",
    time: "10:00 AM to 2:00 PM",
    location: "College View",
    locationMap: {
      query: "4801 Prescott Ave, Lincoln, NE",
      lat: 40.7724081,
      lng: -96.6554207,
    },
    blurb:
      "Shop farm fresh produce at the Sunday Farmers' Market to stock your shelves for the week. The market includes yoga at 10 AM and a musical performance from 11 AM to 1 PM.",
    url: "https://www.sundayfarmersmarket.org/",
    free: true,
  },
  {
    id: "jazz-june",
    title: "Jazz in June",
    emoji: "🎷",
    date: "2026-06-02",
    time: "5:00 PM to 8:45 PM",
    location: "UNL • Sheldon Sculpture Garden",
    locationMap: {
      query: "University of Nebraska-Lincoln, 451 N 12th St, Lincoln, NE 68588",
      lat: 40.8174833,
      lng: -96.705349,
    },
    blurb:
      "Jazz in June is a free event that brings world-class jazz musicians to perform at the Sheldon Sculpture Garden. This year it kicks off with Terell Stafford. Food festival at 5 PM followed by the live performance from 7 PM to 8:45 PM.",
    url: "https://www.jazzinjune.com/#artist1",
    free: true,
  },
  {
    id: "too-hot-tuesday",
    title: "Too Hot Tuesday",
    emoji: "🔥",
    date: "2026-06-02",
    time: "9:00 PM to 1:30 AM",
    location: "Duffy's Tavern",
    locationMap: {
      query: "Duffy's Tavern, 1412 E O St, Lincoln, NE 68508",
      lat: 40.813797922453865,
      lng: -96.70080000046681,
    },
    blurb:
      "Too Hot Tuesday is a free 21+ dance party with DJRUGBURN on the decks.",
    url: "https://www.instagram.com/p/DZD1xI5jicC/",
    free: true,
  },
  {
    id: "hub-farmers-market",
    title: "Hub Farmers' Market",
    emoji: "🍴",
    date: "2026-06-03",
    time: "5:00 PM to 7:00 PM",
    location: "The Hub Cafe",
    locationMap: {
      query: "250 N 21st St #3, Lincoln, NE 68503",
      lat: 40.8156829,
      lng: -96.693306,
    },
    blurb:
      "Lincoln's centrally located farmers market. Visit for farm fresh goods or just stop by to grab a bite and drink with a friend while you enjoy the outdoor seating and musical act.",
    url: "https://www.hubfarmersmarket.org/",
    free: true,
  },
  {
    id: "stransky-park",
    title: "Stransky Park Concert",
    emoji: "⛲",
    date: "2026-06-04",
    time: "7:00 PM to 9:00 PM",
    location: "Stransky Park",
    locationMap: {
      query: "17th St & Harrison Avenue, Lincoln, NE 68502",
      lat: 40.7868559,
      lng: -96.6989367,
    },
    blurb:
      "KZUM's summer concert series starts this year with Womanish Girl. Pack a blanket and snacks, or grab dinner from the food truck.",
    url: "https://www.instagram.com/p/DX62LnSFjZp/?img_index=1",
    free: true,
  },
  {
    id: "shit-hook",
    title: "Shithook Live Band Karaoke!",
    emoji: "🎤",
    date: "2026-06-04",
    time: "9:30 PM to 10:55 PM",
    location: "Zoo Bar",
    locationMap: {
      query: "136 N 14th St, Lincoln, NE 68508",
      lat: 40.8143882,
      lng: -96.7033783,
    },
    blurb:
      "Live band karaoke at the Zoo Bar with Sh*thook. If you catch a second-wind after the show at Stransky, you can belt your heart out on stage with live-band accompaniment. Shithook is a live band twist on Karaoke that has been at it for decades.",
    url: "https://zoobar.com/zooevents/",
    free: true,
  },
  {
    id: "first-friday",
    title: "First Friday",
    emoji: "🎨",
    date: "2026-06-05",
    time: "5:00 PM to 11:00 PM",
    location: "Downtown Lincoln, NE",
    locationMap: {
      query: "116 N 14th St, Lincoln, NE 68508",
      lat: 40.8138564,
      lng: -96.7009699,
    },
    blurb:
      "The first Friday of the month is a great time to enjoy the city's art scene and catch up with friends. You can spend the evening downtown or visit one of the city's many art galleries.",
    url: "https://downtownlincoln.org/explore/first-friday",
    free: true,
  },
  {
    id: "pepe-birthday-bash",
    title: "Pepe's Birthday Bash",
    emoji: "🎉",
    date: "2026-06-06",
    time: "12:00 PM to 4:00 PM",
    location: "Corner of 11th & B Streets, Lincoln, NE 68502",
    locationMap: {
      query: "1311 S 11th St, Lincoln, NE 68502",
      lat: 40.7999812,
      lng: -96.7084749,
    },
    blurb:
      "Celebrate local treasure Pepe Fierro of Pepe's Bistro with a combined Made Here Market and 402 Youth Market at 11th & B.",
    url: "https://www.instagram.com/madeheremarket/p/DXDE3KRDfHp/",
    free: true,
  },
];
