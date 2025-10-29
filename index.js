import express from "express";
import jsonServer from "json-server";
import auth from "json-server-auth";

const server = express();

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

const router = jsonServer.router("./data/db.json");
const middlewares = jsonServer.defaults();

// 🧩 auth rules
const rules = auth.rewriter({
  products: 444,
  featured_products: 444,
  users: 600,
  orders: 660,
});

// ✅ ترتيب الميدل وير الصحيح
server.use(middlewares);
server.use(rules);
server.use(auth);
server.use(router);

server.db = router.db;

server.listen(8000, () => {
  console.log("🚀 JSON Server running on http://localhost:8000");
});
