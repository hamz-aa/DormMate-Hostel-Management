// src/redux/middleware/resetStore.js
import { logout } from "../slices/authSlice";
import { resetStore } from "../slices/resetSlice";

const resetStoreMiddleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (action.type === logout.type) {
      dispatch(resetStore());
    }
    return next(action);
  };

export default resetStoreMiddleware;
