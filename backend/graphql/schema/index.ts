import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import path from "path";

const schemaPath = path.join(__dirname, "schema.graphql");
const typeDefs = loadSchemaSync(schemaPath, {
  loaders: [new GraphQLFileLoader()],
});

export default typeDefs;
