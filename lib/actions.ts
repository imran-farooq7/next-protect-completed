"use server";

import { redirect } from "next/navigation";

export const signUp = async (prevState: any, formData: FormData) => {
	try {
		const res = await fetch("http://localhost:3002/api/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: formData.get("email"),
				password: formData.get("password"),
			}),
		});
		if (res.ok) {
			return {
				success: true,
				message: "User created successfully",
			};
		} else {
			return {
				message: "Something went wrong",
				success: false,
			};
		}
	} catch (error) {
		return {
			message: "Something went wrong",
			success: false,
		};
	}
};
