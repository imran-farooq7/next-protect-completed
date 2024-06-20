import { getServerSession } from "next-auth";

const AuthStatus = async () => {
	const session = await getServerSession();

	return (
		<div className="absolute w-full top-5 flex items-center justify-center">
			{session && (
				<p className="text-white text-xl">Signed in as {session.user?.email}</p>
			)}
		</div>
	);
};
export default AuthStatus;
