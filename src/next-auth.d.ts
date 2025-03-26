import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            _id: number;
            email: string;
            name: string;
            role: string;
            token: string;
        }
    }
}