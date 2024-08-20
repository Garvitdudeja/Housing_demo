import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import OtpInput from 'react-otp-input';
import * as images from "@/utilities/images"
import Image from 'next/image';
import { useAuthSelector } from '@/redux/selector/auth';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { resendOTP, verifyOTP } from '@/redux/slices/auth';
import withOutAuth from '@/authentication/withOutAuth';
import Spinner from '@/Components/Common/Spinner';
import { toast } from 'react-toastify';


const otp = (props) => {
    const [otp, setOtp] = useState("")
    const authSelcetor = useAuthSelector()
    const router = useRouter()
    const dispatch = useDispatch();

    const handleOTPSubmit = ()=>{
      const params = {
        email: authSelcetor?.userInfo?.data?.email,
        otp: Number(otp),
      }
      if(otp.trim()== ""){
        toast.error("Enter a OTP!");  
        return;
      }
      if(isNaN(otp)){
        toast.error("OTP can be a Number Only!")
        return;
      }
      dispatch(verifyOTP({...params,cb(res){
        if(res?.status == 200){
          router.push('/')
        }
      }}))
    }
    const handleResendOTP = ()=>{
      const params = {
        email: authSelcetor?.userInfo?.data?.email,
      }
      dispatch(resendOTP({...params,cb(res){
        if(res?.status == 200){
          toast.success("OTP Sent Successfully!")
        }
      }}))
    }
    useEffect(()=>{
      if(!authSelcetor?.userInfo?.data?.email){
        console.log("i am Pushing")
        // router.push("/login")
      }
    })
    const authSelector = useAuthSelector()
  return (
    <div className="container-fluid">
    <div className="row">
      <div className="col-md-12 gx-0">
        <div className="authCommonBg">
          <div className="loginCard otp text-center">
            <Link href="/login" className="backArrow"> 
            <Image src={images.backArrow}  alt="logo" />
            </Link>
            {/* <Image src={images.logo} className="logo" alt="logo" /> */}
            <h3 style={{"color":"#05a1ab"}} className="pb-4">TenantLink</h3>

            <h2 className="heading24">One Time Password</h2>
            <p className="text14 mb-4">Enter the OTP we just sent you on your <br/>email address to login.</p>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              // className={{otp}}
              renderInput={(props) => <input {...props} />}
            />
             {props?.isClient && 
                <button className={`authBtn mb-3  ${authSelector.loading ? "inactiveBtn": ""}`}  onClick={handleOTPSubmit} disabled={authSelector?.loading}>{authSelector?.loading ? <Spinner/>: "Verify OTP"}</button>
              }
             <p className="text14">Didn't get the OTP? <button className="resendBtn" onClick={handleResendOTP}> Resend </button></p>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default otp