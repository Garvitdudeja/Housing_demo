import { all, call, put, takeLatest } from "redux-saga/effects";
import { ApiClient } from "@/utilities/api";
import {
  onErrorStopLoad,setResendOTP,setUserLogin,setVerifyOTP,setLogout
} from "../../slices/auth";
import ApiPath from "@/constants/apiPath";
import { toast } from "react-toastify";
import cookie from 'js-cookie' 
import Cookies from "js-cookie";

// Worker saga will be fired on USER_FETCH_REQUESTED actions

function* userLogin(action) {
  try {
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.AuthApiPath.ADMIN_LOGIN),
      (action.payload = action.payload)
    );
   
    if (resp.status) {
      resp.data.email = action.payload.email
      yield put(setUserLogin(resp));
      yield call(action.payload.cb, (action.res = resp));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* verifyOTP(action) {
  try {
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.AuthApiPath.VERIFY_OTP),
      (action.payload = action.payload)
    );
    if (resp.status) {
      localStorage.setItem("adminAuthToken", resp.data?.payload?.token ?? "")
      cookie.set("authToken",resp.data?.payload?.token, {secure:true})
      yield put(setVerifyOTP(resp));
      yield call(action.payload.cb, (action.res = resp));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* resendOTP(action) {
  try {
    const resp = yield call(
      ApiClient.post,
      (action.url = ApiPath.AuthApiPath.RESEND_OTP),
      (action.payload = action.payload)
    );
    if (resp.status) {
      yield put(setResendOTP(resp));
      yield call(action.payload.cb, (action.res = resp));
      // toast.success(resp.data.message);
    } else {
      throw resp;
    }
  } catch (e) {
    yield put(onErrorStopLoad());
    toast.error(e?.response?.data?.msg);
  }
}

function* logout(action) {
  try {
    const resp = yield call(ApiClient.get, action.url = ApiPath.AuthApiPath.LOGOUT_ADMIN);
    if (resp.status) {
      yield call(action.payload.cb, action.res = resp)
      localStorage.clear();
      Cookies.remove('authToken');
      yield put(setLogout())
    }
    else {
      throw resp
    }
  } catch (e) {
    toast.error(e.response.data.msg);
  }
}






function* authSaga() {
  yield all([
    takeLatest("auth/userLogin", userLogin),
    takeLatest("auth/verifyOTP", verifyOTP),
    takeLatest("auth/resendOTP", resendOTP),
    takeLatest("auth/logout", logout),
  ]);
}

export default authSaga;
