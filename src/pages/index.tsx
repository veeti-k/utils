import type { NextPage } from "next";
import dynamic from "next/dynamic";

const Page = dynamic(() => import("../components/HomePage"), { ssr: false });

const Home: NextPage = () => {
	return <Page />;
};

export default Home;
