"use client";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";

const Signout = () => {
	return (
		<button
			onClick={() => signOut()}
			className="text-gray-400 flex items-center space-x-1"
		>
			<LogOutIcon className="w-3 h-4" />
			<span>Signout</span>
		</button>
	);
};
export default Signout;
