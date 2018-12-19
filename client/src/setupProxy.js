const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/auth/google", { target: "http://localhost:5000" }));
  app.use(proxy("/auth/*", { target: "http://localhost:5000" }));
  app.use(proxy("/api/events/*", { target: "http://localhost:5000" }));
  app.use(proxy("/api/events/category/*", { target: "http://localhost:5000" }));
  app.use(
    proxy("/api/events/category/*/*", { target: "http://localhost:5000" })
  );
  app.use(
    proxy("/api/events/category/join/*", { target: "http://localhost:5000" })
  );
  app.use(
    proxy("/api/events/category/join/*/*", { target: "http://localhost:5000" })
  );
  app.use(proxy("/api/events/update/*", { target: "http://localhost:5000" }));
};
