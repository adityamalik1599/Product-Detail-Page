Product-Detail-Page
A single product detail page (PDP) built with React 18, TypeScript, SCSS modules and Vite.
Product data comes from the Fake Store API.

Main things it does:
-> Image gallery with thumbnail switching and zoom on hover (desktop)
-> Colour swatches + size selector with stock states (available / low stock / sold out)
-> Quantity picker capped at available stock for the selected variant
-> Add to Cart — cart survives a page refresh via localStorage
-> Variant selection (colour + size) reflected in the URL so links are shareable
-> Responsive — two columns on desktop, stacks on mobile

Live Demo
https://productdetailpagenua.netlify.app

Setup Instructions
1. Clone the repository
git clone https://github.com/adityamalik1599/Product-Detail-Page.git

2. Navigate to project
cd Toxic-Message-Tagging/toxic-message-tagging

3. Install dependencies
npm install

4. Run locally
npm run dev

5. Open in browser
http://localhost:5173

Design decisions
- Context API over Redux/Zustand — the cart is the only shared state here.

- Tabs over accordion for the product details section — the three panels (Description, Specifications, Reviews)
are mutually exclusive — you are reading one at a time, not all at one time.

- SCSS modules over global styles — Avoids class name collisions as the component tree grows.

Things I can fix with more time
- The Fake Store API doesn't have variant data (colours, sizes, stock levels), so I mocked that locally in /src/data. In a real product you'd get this from the API and the mock would go away.

- Error state handling is minimal — If the API fails you get a message but there is no retry logic.

- No skeleton loading screens — Used a simple spinner. Skeletons would feel more good.

- No tests written — I will add unit tests for the variant selector and the cart hook if time allowed.
