import prisma from "@/lib/Client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		Credentials({
			credentials: {
				email: { label: "email", type: "email" },
				password: { label: "password", type: "password" },
			},
			async authorize(credentials) {
				const { email, password } = credentials ?? {};
				if (!email || !password) {
					throw new Error("email or password is missing");
				}
				const user = await prisma.user.findUnique({
					where: {
						email: email,
					},
				});
				if (!user) {
					throw new Error("User does not exist");
				}
				const isValidPassword = await compare(password, user.password);
				if (!isValidPassword) {
					throw new Error("Invalid password");
				}
				return user;
			},
		}),
	],
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
