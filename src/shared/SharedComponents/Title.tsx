import type { ReactNode } from "react";

type Props = {
	children: ReactNode;
};

export const Title = ({ children }: Props) => {
	return <h1 className="pb-1 text-3xl font-medium">{children}</h1>;
};
