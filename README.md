# Neesees-Continuous-Load
This replaces the default pagination of a collection page with an infinite loading functionality, so the user never needs to reload the page.

It runs on collection pages (PLP) that are paginated. Shopify resticts the number of products that can display at once on the PLP. So, this hides that initial pagination and keeps track of how far down the page the visitor has scrolled. When the visitor has only a couple rows of products left on the page to scroll through, the script pulls in the products from the next sequential page in the collection. It then writes the new products to the DOM.

This is a test that runs after the DOM loads.
