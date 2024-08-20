import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthSelector } from "@/redux/selector/auth";

export default function withAuth(Component,type) {
  return function WithAuth(props) {
    const authSelector = useAuthSelector();
    var { userInfo, isLoggedIn } = authSelector;
    const router = useRouter();
    useEffect(() => {
      async function checkAuth() {
        if (!userInfo || !isLoggedIn) {
          // router.push("/login");
        }
      }
      checkAuth();
    }, []);
    return <Component {...props} />;
  };
}
