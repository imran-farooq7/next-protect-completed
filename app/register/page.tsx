import { UserPlusIcon } from "lucide-react";
import Link from "next/link";
import Form from "../components/Form";

const RegisterPage = () => {
	return (
		<div className="flex h-screen justify-center items-center w-screen bg-gray-100">
			<div className="z-10 max-w-md w-full overflow-hidden rounded-2xl border-gray-200 shadow-xl">
				<div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 px-4 py-6 pb-6 pt-8 text-center sm:px-16">
					<Link href={"/"}>
						<UserPlusIcon className="h-10 w-10 text-black" />
					</Link>
					<h3 className="text-xl font-semibold text-black">Register</h3>
					<p className="text-sm text-gray-500">
						Create an account with your email and password
					</p>
					<Form type="register" />
				</div>
			</div>
		</div>
	);
};
export default RegisterPage;
