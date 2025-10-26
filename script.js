'use strict';
const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}

const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const navToggler = document.querySelector("[data-nav-toggler]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  navToggler.classList.toggle("active");
  document.body.classList.toggle("active");
}

addEventOnElem(navToggler, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
  document.body.classList.remove("active");
}

addEventOnElem(navbarLinks, "click", closeNavbar);

const header = document.querySelector("[data-header]");

const activeHeader = function () {
  if (window.scrollY > 300) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", activeHeader);

const addToFavBtns = document.querySelectorAll("[data-add-to-fav]");

const toggleActive = function () {
  this.classList.toggle("active");
}

addEventOnElem(addToFavBtns, "click", toggleActive);

const sections = document.querySelectorAll("[data-section]");

const scrollReveal = function () {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top < window.innerHeight / 1.5) {
      sections[i].classList.add("active");
    } else {
      sections[i].classList.remove("active");
    }
  }
}

scrollReveal();
addEventOnElem(window, "scroll", scrollReveal);

const trendCards = document.querySelectorAll('.trend-card');
const trendStocks = [
  { name: 'Apple', symbol: 'AAPL/USD', basePrice: 232.14, volatility: 0.5 },
  { name: 'Microsoft', symbol: 'MSFT/USD', basePrice: 431.75, volatility: 0.4 },
  { name: 'Tesla', symbol: 'TSLA/USD', basePrice: 245.50, volatility: 1.2 },
  { name: 'Reliance', symbol: 'RELIANCE/INR', basePrice: 2755.00, volatility: 0.8 },
  { name: 'Infosys', symbol: 'INFY/INR', basePrice: 1718.40, volatility: 0.6 }
];
function updateTrendPrices() {
  trendCards.forEach((card, index) => {
    if (index < trendStocks.length) {
      const stock = trendStocks[index];
      const priceElement = card.querySelector('.current-price');
      const cardValue = card.querySelector('.card-value');
      const badge = card.querySelector('.badge');
      
      if (priceElement && cardValue && badge) {
        const change = (Math.random() - 0.5) * stock.volatility;
        const newPrice = stock.basePrice + change;
        const percentChange = ((newPrice - stock.basePrice) / stock.basePrice) * 100;
        
       
        const currency = stock.symbol.includes('INR') ? 'INR ' : '$';
        priceElement.textContent = newPrice.toFixed(2);
        cardValue.textContent = `${currency}${newPrice.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        
        
        badge.textContent = `${percentChange >= 0 ? '+' : ''}${percentChange.toFixed(2)}%`;
        badge.className = 'badge ' + (percentChange >= 0 ? 'green' : 'red');
        
        card.style.transform = 'scale(1.02)';
        setTimeout(() => {
          card.style.transform = 'scale(1)';
        }, 200);
      }
    }
  });
}

if (trendCards.length > 0) {
  setInterval(updateTrendPrices, 3000);
}

/**
 * MARKET SECTION - Tab Filtering
 */
const tabButtons = document.querySelectorAll('.tab-btn');
const tableRows = document.querySelectorAll('.table-body .table-row');

const stockSectors = {
  'Apple': 'Tech',
  'Microsoft': 'Tech',
  'Tesla': 'Auto',
  'Reliance': 'Energy',
  'Infosys': 'Tech',
  'HDFC Bank': 'Banking',
  'ICICI Bank': 'Banking',
  'TCS': 'Tech',
  'Sun Pharma': 'Pharma',
  'Maruti Suzuki': 'Auto',
  'Wipro': 'Tech',
  'HCL Tech': 'Tech',
  'Axis Bank': 'Banking',
  'Kotak Bank': 'Banking',
  'Asian Paints': 'FMCG',
  'ITC': 'FMCG',
  'Hindustan Unilever': 'FMCG'
};


function filterMarketTable(sector) {
  tableRows.forEach(row => {
    const stockName = row.querySelector('.coin-name');
    if (stockName) {
      const name = stockName.textContent.trim().split(' ')[0]; // Get first word
      const stockSector = stockSectors[name] || 'Tech';
      
      if (sector === 'View All' || stockSector === sector) {
        row.style.display = '';
        row.style.animation = 'fadeIn 0.5s ease-in';
      } else {
        row.style.display = 'none';
      }
    }
  });
}

tabButtons.forEach(button => {
  button.addEventListener('click', function() {
    tabButtons.forEach(btn => btn.classList.remove('active'));
    this.classList.add('active');
    const sector = this.textContent.trim();
    filterMarketTable(sector);
  });
});

/**
 * MARKET SECTION - Live Price Updates
 */
const marketPrices = document.querySelectorAll('.last-price');
const marketChanges = document.querySelectorAll('.last-update');

function updateMarketPrices() {
  tableRows.forEach(row => {
    const priceElement = row.querySelector('.last-price');
    const changeElement = row.querySelector('.last-update');
    
    if (priceElement && changeElement) {
      const currentPriceText = priceElement.textContent.replace(/[₹$,]/g, '');
      const currentPrice = parseFloat(currentPriceText);
      
      if (!isNaN(currentPrice)) {
        const changePercent = (Math.random() - 0.5) * 0.3;
        const newPrice = currentPrice * (1 + changePercent / 100);
        const currentChange = parseFloat(changeElement.textContent.replace(/[+%]/g, ''));
        const newChange = currentChange + changePercent;
        const currency = priceElement.textContent.includes('₹') ? '₹' : '$';
        priceElement.textContent = `${currency}${newPrice.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
        changeElement.textContent = `${newChange >= 0 ? '+' : ''}${newChange.toFixed(2)}%`;
        changeElement.className = 'last-update ' + (newChange >= 0 ? 'green' : 'red');
      }
    }
  });
}

if (tableRows.length > 0) {
  setInterval(updateMarketPrices, 5000);
}

const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .trend-card {
    transition: transform 0.2s ease;
  }
  
  .table-row {
    transition: all 0.3s ease;
  }
`;
document.head.appendChild(style);