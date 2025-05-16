import localFont from "next/font/local";

export const iranyekanXpro = localFont({
  src: [
    { path: "./IranSansX(Pro)/woff/IRANSansX-Regular.woff", weight: "400" },
    { path: "./IranSansX(Pro)/woff2/IRANSansX-Regular.woff2", weight: "400" },
    { path: "./IranSansX(Pro)/woff/IRANSansX-DemiBold.woff", weight: "600" },
    { path: "./IranSansX(Pro)/woff2/IRANSansX-DemiBold.woff2", weight: "600" },
    { path: "./IranSansX(Pro)/woff/IRANSansX-Bold.woff", weight: "700" },
    { path: "./IranSansX(Pro)/woff2/IRANSansX-Bold.woff2", weight: "700" },
  ],
  display: "swap",
  preload: true,
});
