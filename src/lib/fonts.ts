import localFont from "next/font/local";

// Polices auto-hébergées (ticket T-017) : aucune requête vers un service externe.
// Licences : src/fonts/OFL-*.txt

export const grandHotel = localFont({
  src: "../fonts/grand-hotel.woff2",
  weight: "400",
  display: "swap",
  variable: "--font-grand-hotel",
});

export const rubik = localFont({
  src: "../fonts/rubik-variable.woff2",
  weight: "300 900",
  display: "swap",
  variable: "--font-rubik",
});

export const atkinson = localFont({
  src: [
    { path: "../fonts/atkinson-regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/atkinson-bold.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-atkinson",
});

export const fontVariables = `${grandHotel.variable} ${rubik.variable} ${atkinson.variable}`;
