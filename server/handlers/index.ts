import auth from "./auth";
import poll from "./poll";

export default {
  ...auth,
  ...poll,
  // error: (err, req, res, next) => {
  //   res.status(err.status || 500).json({
  //     success: false,
  //     error: {
  //       message: err.message || "Something went wrong.",
  //     },
  //   });
  // },
};
