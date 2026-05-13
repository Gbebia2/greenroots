const express = require("express");
const path = require("path");
const session = require("express-session");
const flash = require("express-flash");
const productsData = [
  {
    id: 1,
    name: "Smoker's Detox",
    image: "/images/smokers-detox.png",
    description: "This potent herbal blend is specifically formulated to support respiratory health, helping to clear and soothe the lungs using natural mullein and peppermint."
  },
  {
    id: 2,
    name: "Blood and Lungs Detox",
    image: "/images/blood-lungs.png",
    description: "A dual-action formula designed to purify the bloodstream and reinforce lung function through a selection of deep-cleansing organic herbs."
  },
  {
    id: 3,
    name: "Male Libido Super Charge",
    image: "/images/male-libido.jfif",
    description: "Experience renewed energy and vitality with this powerful stamina-boosting blend, crafted to support natural hormone balance and performance."
  },
  {
    id: 4,
    name: "Female Fertility Treatment",
    image: "/images/female-fertility.jfif",
    description: "A gentle, nurturing herbal treatment designed to support reproductive wellness and hormonal harmony for women."
  }
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
  res.render("index", { page: "home", products: productsData });
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
