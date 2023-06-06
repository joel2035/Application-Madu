import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    Root: {
      path: "root",
      screens: {
        Home: "home",
        Links: "links",
        Shop: "shop",
      },
    },
    Shop: {
      path: "shop",
      screens: {
        Shop: "shop",
        Feedback: "feedback",
        Greenscore: "greenscore",
        Confirmation: "confirmation",
      },
    },
  },
};
