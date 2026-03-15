import { withAuth } from "next-auth/middleware";

export default withAuth({
    callbacks: {
        authorized: ({ token }) => {
            return token?.email === process.env.ADMIN_EMAIL || token?.email === process.env.ADMIN_EMAIL_2;
        },
    },
});

export const config = {
    matcher: ["/admin/:path*"]
};
