import { APIGatewayProxyEvent } from "aws-lambda";
import axios from "axios";

import { formatJSONResponse } from "@/libs/api-gateway";
import { Deal } from "@/types/deal";

export const handler = async (event: APIGatewayProxyEvent) => {
  try {
    const { queryStringParameters = {} } = event;
    const { currency } = queryStringParameters;

    if (!currency) {
      return formatJSONResponse({
        statusCode: 400,
        data: {
          message: "Missing currency query parameter",
        },
      });
    }

    const deals = await axios
      .get<Deal[]>(
        "https://www.cheapshark.com/api/1.0/deals?upperPrice=15&pageSize=5"
      )
      .then((res) => res.data);
    const currencyRate = await axios
      .get(
        `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/${currency}.json`
      )
      .then((res) => res.data[currency]);

    const repricedDeals = deals.map((deal) => {
      const {
        title,
        storeID,
        salePrice,
        normalPrice,
        savings,
        steamRatingPercent,
        releaseDate,
        thumb,
      } = deal;

      return {
        title,
        storeID,
        steamRatingPercent: Number(steamRatingPercent),
        salePrice: Number(salePrice) * currencyRate,
        normalPrice: Number(normalPrice) * currencyRate,
        savingsPercent: Number(savings),
        releaseDate: new Date(releaseDate * 1000).toDateString(),
        thumb,
      };
    });

    return formatJSONResponse({
      data: repricedDeals,
    });
  } catch (error) {
    console.log("error", error);

    return formatJSONResponse({
      statusCode: 502,
      data: {
        message: error.message,
      },
    });
  }
};
