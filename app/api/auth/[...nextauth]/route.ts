import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/app/lib/db";
import User from "@/app/models/User";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Step 1 - connect to the database
        await connectToDatabase();

        // Step 2 - find the user by email
        const user = await User.findOne({ email: credentials?.email });

        // Step 3 - if no user found, return null (login fails)
        if (!user) return null;

        // Step 4 - compare the password they typed to the hashed password
        const isValid = await bcrypt.compare(credentials?.password ?? "", user.password);

        // Step 5 - if passwords don't match, return null (login fails)
        if (!isValid) return null;

        // Step 6 - return the user object (login succeeds)
        return { id: user._id.toString(), name: user.name, email: user.email };
      },
    }),
  ],
  session: {
    strategy: "jwt", // use a token to remember who is logged in
  },
  pages: {
    signIn: "/login", // send users to your login page
  },
});

export { handler as GET, handler as POST };