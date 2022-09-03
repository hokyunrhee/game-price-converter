import type { AWS } from "@serverless/typescript";

export const functions: AWS["functions"] = {
  combination: {
    handler: "src/functions/convert-game-price.handler",
    events: [
      {
        httpApi: {
          path: "/game-deals",
          method: "get",
        },
      },
    ],
  },
};
