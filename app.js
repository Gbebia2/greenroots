const express = require("express");
const path = require("path");
const session = require("express-session");
const flash = require("express-flash");
const productsData = [
  { id: 1, name: "Herbal Tea", image: "/images/herbal-tea.jpg" },
  { id: 2, name: "Fertility Tonic", image: "/images/tonic.jpg" },
  { id: 3, name: "Herbal Capsules", image: "/images/capsules.jpg" }
];

const app = express();

// Set EJS as the template engine
app.set("view engine", "ejs");

// Set views folder
app.set("views", path.join(__dirname, "views"));

// Serve static files (CSS, images, JS)
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
  secret: "someSecretKey",
  resave: false,
  saveUninitialized: true
}));

app.use(flash());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index", { page: "home" });
});

app.get("/about", (req, res) => {
  res.render("about", { page: "about" });
});

app.get("/products", (req, res) => {
  res.render("products", { page: "products", products: productsData });
});


app.get("/contact", (req, res) => {
  res.render("contact", { page: "contact", messages: req.flash("success") })
});

app.post("/contact", (req, res) => {
  req.flash("success", "Your message has been sent successfully!");
  res.redirect("/contact");
});

app.get("/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = productsData.find(p => p.id === productId);

  if (!product) {
    return res.status(404).send("Product not found");
  }

  res.render("product-detail", { page: "products", product });
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
