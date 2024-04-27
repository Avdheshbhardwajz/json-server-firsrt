// Function to add a product to the cart
async function addToCart(productId) {
  try {
    // Get the logged-in user's information from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    // Fetch the user's cart data
    let response = await fetch(
      `http://localhost:3000/allUsersCart/${loggedInUser.id}`
    );
    let userCart = await response.json();

    // Add the product to the user's cart
    userCart = userCart || []; // Ensure userCart is an array
    userCart.push({ productId });

    // Update the user's cart data on the server
    response = await fetch(
      `http://localhost:3000/allUsersCart/${loggedInUser.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCart),
      }
    );

    if (response.ok) {
      alert("Product added to cart successfully!");
    } else {
      throw new Error("Failed to add product to cart.");
    }
  } catch (error) {
    console.error("Error adding product to cart:", error);
  }
}

// Function to remove a product from the cart
async function deleteFromCart(productId) {
  try {
    // Get the logged-in user's information from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("user"));

    // Fetch the user's cart data
    let response = await fetch(
      `http://localhost:3000/allUsersCart/${loggedInUser.id}`
    );
    let userCart = await response.json();

    // Remove the product from the user's cart
    userCart = userCart.filter((item) => item.productId !== productId);

    // Update the user's cart data on the server
    response = await fetch(
      `http://localhost:3000/allUsersCart/${loggedInUser.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCart),
      }
    );

    if (response.ok) {
      alert("Product removed from cart successfully!");
    } else {
      throw new Error("Failed to remove product from cart.");
    }
  } catch (error) {
    console.error("Error removing product from cart:", error);
  }
}

// Function to render products
function renderProducts(products) {
  const prodcontainer = document.querySelector(".producthere");
  prodcontainer.innerHTML = "";
  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
            <img class="product-image" src="${product.src}" alt="${product.title}">
            <h2 class="product-title">${product.title}</h2>
            <p class="product-price">Price: ${product.price}</p>
            <p class="product-ratings">Ratings: ${product.ratings}</p>
            <div>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
                <button onclick="deleteFromCart(${product.id})">Remove from Cart</button>
            </div>
        `;
    prodcontainer.appendChild(productCard);
  });
}

// Function to fetch products from the server
async function fetchProducts(url) {
  try {
    const response = await fetch(url);
    const products = await response.json();
    renderProducts(products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Fetch products when the page loads
fetchProducts("http://localhost:3000/products");
