import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async signIn({ user }) {

            const isAdmin = user.email === process.env.ADMIN_EMAIL;

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
});


export { handler as GET, handler as POST };