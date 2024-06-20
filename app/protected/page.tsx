import AuthStatus from "@/components/AuthStatus";
import Signout from "@/components/Signout";

const ProtectedPage = () => {
	return (
		<div className="flex h-screen bg-black ">
			<div className="w-screen h-screen flex items-center justify-center flex-col space-y-5">
				<AuthStatus />
				<Signout />
			</div>
		</div>
	);
};
export default ProtectedPage;
