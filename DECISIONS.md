-> Cart state: localStorage + custom events vs Context API
This was the main call I had to make. The obvious choice for cart state would have been Context API or Redux — that's what we generally do in case if state needs to be shared between components.

I looked at the cart there were no deeply nested components and no complex derived state. So instead of wrapping the whole app in a CartContext, I write directly to localStorage in ProductInfo and fire a custom cartUpdated window event. CartDrawer listens for that event and re-reads localStorage.

If the cart logic grows more complex (coupon codes, stock validation), I would probably move it to Context, but what this page needs, it felt like the right call.

I used Context API only for product data (ProductContext) because the product is read by multiple components — Gallery, ProductInfo, ProductTabs and passing it as props through every layer would have been messy.

-> Tabs over Accordion for Product details
The three panels — Description, Specifications, Reviews — are things you look at one at a time. So Tabs make mote sense than using Accordion

-> What I would clean up with more time
Variant data is hardcoded. The Fake Store API doesn't return colour options, sizes, stock levels, so I put that in /src/data/productConfig.js. In a real project this comes from the backend.

No tests. Skipped them entirely. If I came back to this, I would write test cases.

ProductInfo is too long. The colour swatches, size buttons, quantity picker are all in one file. Each of those is big enough to be its own component. I would split them out.
