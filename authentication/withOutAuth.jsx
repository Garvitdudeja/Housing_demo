import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthSelector } from "@/redux/selector/auth";

export default function withOutAuth(Component) {
  return function WithAuth(props) {
    const authSelector = useAuthSelector();
    const { userInfo, isLoggedIn } = authSelector;
    console.log(isLoggedIn)
    
    const router = useRouter();
    useEffect(() => {
      async function checkAuth() {
        if (userInfo && Object.keys(userInfo).length > 0 && isLoggedIn) {
          router.push("/");
        }
      }
      checkAuth();
    }, []);
    return <Component {...props} />;
  };
}
