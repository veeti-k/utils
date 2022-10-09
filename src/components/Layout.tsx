import Head from "next/head";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const name = "Salary thing";
const desc = "Salary thing";

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title>Salary thing</title>

        <meta property="og:site_name" content={name} key="og:site_name" />
        <meta name="description" content={desc} />

        <meta property="og:image:type" content="image/png" key="og:image:type" />
        <meta property="og:image:width" content="256" key="og:image:width" />
        <meta property="og:image:height" content="256" key="og:image:width" />
        <meta property="og:image:alt" content="Money bag emoji" key="og:image:alt" />
        <meta property="og:image" content={"/favicon.png"} key="og:image" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={name} />
        <meta name="twitter:description" content={desc} />

        <meta property="og:type" content="website" key="og:type" />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}
    </>
  );
};
