import { LockKeyholeIcon } from "lucide-react";
import Link from "next/link";
import Form from "../components/Form";

const LoginPage = () => {
	return (
		<div className="flex h-screen justify-center items-center w-screen bg-gray-100">
			<div className="z-10 max-w-md w-full overflow-hidden rounded-2xl border-gray-200 shadow-xl">
				<div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 px-4 py-6 pb-6 pt-8 text-center sm:px-16">
					<Link href={"/"}>
						<LockKeyholeIcon className="h-10 w-10 text-black" />
					</Link>
					<h3 className="text-xl font-semibold text-black">Login</h3>
					<p className="text-sm text-gray-500">
						Sign in with your email and password
					</p>
					<Form type="login" />
				</div>
			</div>
		</div>
	);
};
export default LoginPage;
