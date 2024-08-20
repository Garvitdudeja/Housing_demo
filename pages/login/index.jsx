import React, { useEffect, useState } from "react";
import Image from "next/image";
import * as images from "@/utilities/images.js";
import { useDispatch } from "react-redux";
import { userLogin } from "@/redux/slices/auth";
import { toast } from "react-toastify";
import { emailREgex } from "@/utilities/Regex.js";
import Spinner from "@/Components/Common/Spinner";
import { useAuthSelector } from "@/redux/selector/auth";
import { useRouter } from "next/router";
import withOutAuth from "@/authentication/withOutAuth";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const authSelector = useAuthSelector();
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogin = (event, email) => {
    event.preventDefault();
    const params = {
      email,
    };
    if (!emailREgex.test(params.email)) {
      toast.error("Enter a valid Email!");
      return;
    }
    dispatch(
      userLogin({
        ...params,
        cb(res) {
          if (res.status == 200) {
            router.push("/otp");
          }
        },
      })
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 gx-0">
          <div className="authCommonBg">
            <div className="loginCard text-center">
              {/* <Image src={images.logo} className="logo" alt="logo" /> */}
              <h3 style={{"color":"#05a1ab"}} className="pb-4">TenantLink</h3>
              <h2 className="heading24">Login</h2>
              <p className="text14 mb-4">
                Welcome! Enter the below details to login
              </p>
              <form
                onSubmit={(event) => {
                  handleLogin(event, email.trim());
                }}
              >
                <div className="form-group mb-5">
                  <div className="position-relative">
                    <input
                      className="customInput"
                      type="email"
                      required
                      value={email}
                      placeholder="Email Address"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    <Image
                      className="msgIcon"
                      src={images.msgIcon}
                      alt="email icon"
                    />
                  </div>
                </div>
                {props?.isClient && (
                  <button
                    className={`authBtn ${
                      authSelector.loading ? "inactiveBtn" : ""
                    }`}
                    disabled={authSelector?.loading}
                  >
                    {authSelector?.loading ? <Spinner /> : "Login"}
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
