import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user }) {

            const isAdmin = user.email === process.env.ADMIN_EMAIL || user.email === process.env.ADMIN_EMAIL_2;

            if (isAdmin) {
                return true;
            } else {
                return false;
            }
        },
        async session({ session, token }) {

            return session;
        },
    },
    pages: {
        signIn: '/api/auth/signin',
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };