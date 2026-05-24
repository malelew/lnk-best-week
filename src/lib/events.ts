/** One event during the best week. Fill in or duplicate the example entries. */
export type Event = {
  id: string;
  title: string;
  /** ISO date, e.g. "2026-06-02" — used for sorting and display */
  date: string;
  /** Optional time range shown on the card, e.g. "7:00 PM" or "10 AM – 5 PM" */
  time?: string;
  location: string;
  /** Short line for the promo page */
  blurb: string;
  /** Link to tickets or official event page */
  url?: string;
  free?: boolean;
};

/** Week-level copy — adjust to match your real dates */
export const bestWeek = {
  label: "Best week in LNK",
  startDate: "2026-05-30",
  endDate: "2026-06-06",
  tagline: "It only comes once every few years and it starts now.",
} as const;

export const events: Event[] = [
  {
    id: "soul-night",
    title: "Old Pub Soul Club",
    date: "2026-05-30",
    time: "10:00 PM to 2:00 AM",
    location: "The Old Pub",
    blurb:
      "The best week in Lincoln kicks off with the best night of dance, music, and good vibes. Soul Club lands on the last Saturday of the month ($3 cover, 21+)—and this time it kicks off a full week of festivities.",
    url: "https://www.facebook.com/theoldpubllc/",
    free: false,
  },
  {
    id: "sunday-farmers-market",
    title: "Sunday Farmers' Market at College View",
    date: "2026-05-31",
    time: "10:00 AM to 2:00 PM",
    location: "4801 Prescott Ave, Lincoln, NE",
    blurb:
      "Shop farm fresh produce at the Sunday Farmers' Market to stock your shelves for the week. The market includes yoga at 10 AM and a musical performance from 11 AM to 1 PM.",
    url: "https://www.sundayfarmersmarket.org/",
    free: true,
  },
  {
    id: "jazz-june",
    title: "Jazz in June",
    date: "2026-06-02",
    time: "5:00 PM to 8:45 PM",
    location: "University of Nebraska-Lincoln • Sheldon Sculpture Garden",
    blurb:
      "Jazz in June is a free event that brings world-class jazz musicians to perform at the Sheldon Sculpture Garden. This year it kicks off with Terell Stafford. Food festival at 5 PM followed by the live performance from 7 PM to 8:45 PM.",
    url: "https://www.jazzinjune.com/#artist1",
    free: true,
  },
  {
    id: "hub-farmers-market",
    title: "Hub Farmers' Market",
    date: "2026-06-03",
    time: "5:00 PM to 7:00 PM",
    location: "The Hub",
    blurb:
      "Lincoln's centrally located farmers market. Visit for fresh produce and farm goods or just stop by to grab a bite or drink with a friend while you enjoy the outdoor seating and musical act.",
    url: "https://www.hubfarmersmarket.org/",
    free: true,
  },
  {
    id: "stransky-park",
    title: "Stransky Park Concert",
    date: "2026-06-04",
    time: "7:00 PM to 9:00 PM",
    location: "Stransky Park (17th & Harrison), Lincoln, NE",
    blurb:
      "KZUM's summer concert series kicks off with Womanish Girl. Pack a blanket and snacks, or grab dinner from the food truck.",
    url: "https://www.instagram.com/p/DX62LnSFjZp/?img_index=1",
    free: true,
  },
  {
    id: "shit-hook",
    title: "Shithook Live Band Karaoke!",
    date: "2026-06-04",
    time: "9:30 PM to 10:55 PM",
    location: "Zoo Bar",
    blurb:
      "Live band karaoke at the Zoo Bar with Sh*thook. If you catch a second-wind after the show at Stransky, grab a few friends and belt your heart out on stage with live-band accompaniment. Shithook is a live band twist on Karaoke that has been at it for decades.",
    url: "https://zoobar.com/zooevents/",
    free: true,
  },
  {
    id: "first-friday",
    title: "First Friday",
    date: "2026-06-05",
    time: "5:00 PM to 11:00 PM",
    location: "Lincoln, NE",
    blurb:
      "The first Friday of the month is a great time to enjoy the city's art scene and catch up with friends. You can spend the evening downtown or visit one of the city's many art galleries.",
    url: "https://downtownlincoln.org/explore/first-friday",
    free: true,
  },
  {
    id: "pepe-birthday-bash",
    title: "Pepe's Birthday Bash",
    date: "2026-06-06",
    time: "12:00 PM to 4:00 PM",
    location: "Corner of 11th & B Streets, Lincoln, NE 68502",
    blurb:
      "Celebrate local treasure Pepe Fierro of Pepe's Bistro with a combined Made Here Market and 402 Youth Market at 11th & B.",
    url: "https://www.instagram.com/madeheremarket/p/DXDE3KRDfHp/",
    free: true,
  },
];
