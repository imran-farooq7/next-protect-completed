"use client";
import { signUp } from "@/lib/actions";
import { RotateCwIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

interface Props {
	type: "register" | "login";
}

const Form = ({ type }: Props) => {
	const router = useRouter();
	const [formState, formAction, isPending] = useActionState(signUp, {
		message: "",
		success: false,
	});

	useEffect(() => {
		if (formState?.success) {
			toast.success(`${formState.message} redirecting to login`);
			router.push("/login");
		} else if (formState.message === "Something went wrong") {
			toast.error(formState.message);
		}
	}, [formState?.success, formState.message]);

	return (
		<form
			className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
			action={formAction}
		>
			<div>
				<label
					htmlFor="email"
					className="text-xs block text-gray-600 uppercase"
				>
					Email Address
				</label>
				<input
					type="email"
					name="email"
					required
					placeholder="me@example.com"
					autoComplete="off"
					className="text-black mt-1 block w-full appearance-none rounded-md border-gray-200 border px-3 py-2 placeholder:text-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
				/>
			</div>
			<div>
				<label
					htmlFor="password"
					className="text-xs block text-gray-600 uppercase"
				>
					Password
				</label>
				<input
					type="password"
					name="password"
					placeholder="password"
					required
					className="text-black mt-1 block w-full appearance-none rounded-md border-gray-200 border px-3 py-2 placeholder:text-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
				/>
			</div>
			<button
				className="flex h-10 w-full items-center justify-center rounded-md border text-sm transition-all focus:outline-none border-black bg-black text-white hover:bg-gray-900"
				disabled={isPending}
			>
				{isPending ? (
					<RotateCwIcon />
				) : (
					<span>{type === "login" ? "Login" : "Register"}</span>
				)}
			</button>
			{type === "login" ? (
				<p className="text-center text-sm text-gray-600">
					Don't have an account?{" "}
					<Link href={"/register"} className="  font-semibold text-gray-800">
						Register
					</Link>{" "}
					for free
				</p>
			) : (
				<p className="text-center text-sm text-gray-600">
					Already have an account?{" "}
					<Link href={"/login"} className=" font-semibold text-gray-800">
						Login
					</Link>{" "}
					instead
				</p>
			)}
			{formState?.success && (
				<>
					<p className="text-green-500">
						{formState.message} redirecting to login
					</p>
				</>
			)}
		</form>
	);
};
export default Form;
