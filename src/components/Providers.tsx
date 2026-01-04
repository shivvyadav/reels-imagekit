"use client";

import {SessionProvider} from "next-auth/react";
import {ImageKitProvider} from "@imagekit/next";

export function Providers({children}: {children: React.ReactNode}) {
  return (
    <SessionProvider refetchInterval={5 * 60}>
      <ImageKitProvider urlEndpoint={process.env.IMAGEKIT_URL_ENDPOINT}>
        {children}
      </ImageKitProvider>
    </SessionProvider>
  );
}
