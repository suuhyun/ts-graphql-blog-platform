import { ApolloClient, InMemoryCache, HttpLink, from, Observable } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { getNewAccessToken } from "./auth/auth";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

const errorLink = onError(
   ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        if (err?.extensions?.code === "UNAUTHENTICATED") {
          console.log("Detected UNAUTHENTICATED error");
          return new Observable(observer => {
            getNewAccessToken()
              .then(() => {
                console.log("Got new token");
                forward(operation).subscribe({
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer),
                });
              })
              .catch(() => {
                window.location.href = "/login";
                observer.error(err);
              });
          });
        }
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    }
  }
);

const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});

export default client;
