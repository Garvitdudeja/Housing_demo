import { all, spawn } from "redux-saga/effects";
import authSaga from "./auth";
import webSaga from "./web";

export default function* rootSaga() {
  yield all([spawn(authSaga),spawn(webSaga)]);
}
