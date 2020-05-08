// import { createProxyMiddleware } from "http-proxy-middleware";

// export default function (app) {
//   app.use(
//     createProxyMiddleware("/auth/google", { target: "http://localhost:5000" })
//   );
//   app.use(
//     createProxyMiddleware("/api/**", { target: "http://localhost:5000" })
//   );
// }
if (process.env.NODE_ENV !== "production") {
  const { createProxyMiddleware } = require("http-proxy-middleware");

  module.exports = function (app) {
    app.use(
      createProxyMiddleware("/auth", { target: "http://localhost:5000" })
    );
    app.use(
      createProxyMiddleware("/polls", { target: "http://localhost:5000" })
    );
  };
}
