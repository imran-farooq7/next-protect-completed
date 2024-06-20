"use client";
import { RotateCwIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

interface Props {
	type: "register" | "login";
}

const Form = ({ type }: Props) => {
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (type === "register") {
			setIsLoading(true);
			const res = await fetch("/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: e.currentTarget.email.value,
					password: e.currentTarget.password.value,
				}),
			});
			if (res.ok) {
				toast.success("user created successfully redirecting to");
				setIsLoading(false);
				setTimeout(() => {
					router.push("/login");
				}, 2000);
			} else {
				const { error } = await res.json();
				setIsLoading(false);
				toast.error(error);
			}
		} else {
			setIsLoading(true);
			const res = await signIn("credentials", {
				email: e.currentTarget.email.value,
				password: e.currentTarget.password.value,
				redirect: false,
			});
			if (res?.ok) {
				setIsLoading(false);
				router.push("/protected");
			} else {
				const error = res?.error;
				toast.error(error!);
			}
		}
	};
	return (
		<form
			className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
			onSubmit={handleFormSubmit}
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
				disabled={isLoading}
			>
				{isLoading ? (
					<RotateCwIcon className="animate-spin" />
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
		</form>
	);
};
export default Form;
