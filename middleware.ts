import withAuth from "next-auth/middleware";
import { redirect } from "next/navigation";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      console.log("token here is ", token);
      if (req.nextUrl.pathname.startsWith("/admin")) {
        return token?.role === "admin";
      }
      return true;
    },
  },
});

export const config = {
  matcher: ["/admin(/.*)?"],
};
