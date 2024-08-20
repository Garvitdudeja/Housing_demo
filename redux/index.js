import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import storage from "redux-persist/lib/storage";
import { createWrapper } from "next-redux-wrapper";
import rootReducer from "./slices";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const persistConfig = {
  key: "root",
  transforms: [
    encryptTransform({
      secretKey:
        "4226452948404D635166546A576D5A7134743777217A25432A462D4A614E6452",
      onError: function (error) {},
    }),
  ],
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const makeStore = () => {
  const createdStore = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }).concat(middleware),
    devTools: process.env.NODE_ENV !== "production",
  });
  // Enable persistence
  createdStore.__persistor = persistStore(createdStore);
  sagaMiddleware.run(rootSaga);
  return createdStore;
};

const store = makeStore();

export const wrapper = createWrapper(() => store, { debug: true });
export { store };
