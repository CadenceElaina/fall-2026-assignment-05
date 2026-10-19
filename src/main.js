import products from './data/products.json';

const PRODUCTS_PER_PAGE = 5;

const grid = document.querySelector('#product-grid');

// Only the store page has a product grid; the other pages load this file for nothing else.
if (grid) {
  const prevButton = document.querySelector('#prev-button');
  const nextButton = document.querySelector('#next-button');
  const pageIndicator = document.querySelector('#page-indicator');

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  let currentPage = 1;

  function createProductCard(product) {
    const card = document.createElement('article');
    card.className = 'product-card';

    const image = document.createElement('img');
    image.src = product.imageUrl;
    image.alt = product.name;

    const body = document.createElement('div');
    body.className = 'product-body';

    const badge = document.createElement('span');
    badge.className = 'category-badge';
    badge.textContent = product.category;

    const title = document.createElement('h3');
    title.textContent = product.name;

    const description = document.createElement('p');
    description.textContent = product.description;

    const price = document.createElement('p');
    price.className = 'product-price';
    price.textContent = `$${product.price.toFixed(2)}`;

    body.append(badge, title, description, price);
    card.append(image, body);
    return card;
  }

  function renderPage() {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const pageProducts = products.slice(start, start + PRODUCTS_PER_PAGE);

    grid.replaceChildren(...pageProducts.map(createProductCard));

    pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
  }

  prevButton.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage -= 1;
      renderPage();
    }
  });

  nextButton.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage += 1;
      renderPage();
    }
  });

  renderPage();
}
