import type { DotQueries } from "@polkadot-api/descriptors";
import type { Binary, TypedApi } from "polkadot-api";

const dataToString = (value: number | string | Binary | undefined) =>
  typeof value === "object" ? value.asText() : value ?? "";

const mapRawIdentity = (
  rawIdentity?: DotQueries["Identity"]["IdentityOf"]["Value"]
) => {
  if (!rawIdentity) return rawIdentity;
  const {
    info: { additional, display, email, legal, riot, twitter, web, github },
  } = rawIdentity[0];

  const display_id = dataToString(display.value);
  const additionalInfo = Object.fromEntries(
    additional.map(([key, { value }]) => [
      dataToString(key.value!),
      dataToString(value),
    ])
  );

  return {
    ...additionalInfo,
    display: display_id,
    web: dataToString(web.value),
    email: dataToString(email.value),
    legal: dataToString(legal.value),
    riot: dataToString(riot.value),
    github: dataToString(github.value),
    twitter: dataToString(twitter.value),
  };
};

export const getFellowshipAddresses = async (
  api: {
    query: {
      Identity: { IdentityOf: { getValues: (arg0: any[]) => Promise<any[]> } };
    };
  },
  coll_api: {
    query: {
      FellowshipCollective: { Members: { getEntries: () => Promise<any[]> } };
    };
  }
) => {
  return await coll_api?.query.FellowshipCollective.Members.getEntries().then(
    (mems: any[]) =>
      api.query.Identity?.IdentityOf?.getValues(
        mems.map((m) => m.keyArgs)
      ).then((identities: any[]) =>
        identities.map((identity, idx) => ({
          address: mems[idx].keyArgs[0],
          rank: mems[idx].value,
          ...mapRawIdentity(identity),
        }))
      )
  );
};
