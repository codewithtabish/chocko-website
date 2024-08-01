import GoogleProvider from "next-auth/providers/google";
import { db } from "../db";
import { Users } from "../schema";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      async profile(profile, token: any) {
        // console.log(profile.id);

        const data = {
          fname: profile.given_name,
          lname: profile.family_name, // Correct field name if needed
          email: profile.email,
          provider: "GOOGLE",
          externalId: profile.sub,
          image: profile.picture,
        };

        try {
          // Replace with your database insertion logic
          const user = await db
            .insert(Users)
            .values({ ...data })
            .onConflictDoUpdate({ target: Users.email, set: data })
            .returning();

          return {
            ...data,
            id: String(user[0].id),
            role: user[0].role,
          };
        } catch (error) {
          console.log(error);
          return {
            id: "",
          };
        }
      },
    }),
  ],
  callbacks: {
    async session(data: any) {
      console.log(data);
      // session?.user?.id = token.id;
      // session?.user?.role = token.role;
      return data;
    },
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
  },
};
