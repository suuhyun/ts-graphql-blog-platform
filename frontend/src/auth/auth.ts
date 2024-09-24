import { GraphQLError } from "graphql";
import client from "../apollo-client";
import { REFRESH_TOKEN } from "../graphql/mutations/authMutaions";

export const getNewAccessToken = async () => {
    try {
        console.log("Trying to get a new access token");
      const response = await client.mutate({
        mutation: REFRESH_TOKEN,
      });
      console.log(response)
      return true
    } catch (err) {
        return Promise.reject(false);
    }
  };