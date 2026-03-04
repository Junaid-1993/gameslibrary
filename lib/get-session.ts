import { headers } from "next/headers";
import { auth } from "./auth";
import { cache } from "react";

// We only want to call this function once to get the session.
export const getServerSession = cache(async () => {
  console.log("Getting server session.");

  return await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
});
