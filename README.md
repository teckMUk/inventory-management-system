This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

##Use case
Add item
remove item
modify item 
view item with details 
notify on expiry of item 
notify on items when on low allow user to keep min low point 
generate shopping list 
generate recipe from avaiable item 
#item category 
#manage category section to allow user to add more category
 1) Spices and seasonings
 2) condiments and sauces
 3) Beverages
 4) Frozen Foods
 5) Produce
 6) Dairy Products
 7) Meat and Seafood
 8) Miscellaneous
 9) Canned Goods

## Table
Inventory Storage Table
Column Name	Data Type	Description
id	Integer	Unique identifier for each item. (Primary Key)
item_name	String	Name of the pantry item.
category	String	Category of the item (e.g., Canned Goods, Spices).
quantity	Integer	Number of units available in stock.
unit_type	String	Measurement unit (e.g., pcs, kg, liters).
purchase_date	Date	Date when the item was purchased.
expiry_date	Date	Expiration date of the item.
location	String	Storage location (e.g., Pantry Shelf 1, Freezer).
barcode	String	Barcode number for the item (if applicable).
image_url	String	URL to an image of the item (optional, for visual reference).
notes	Text	Additional notes or details about the item.
created_at	DateTime	Timestamp when the item was added to the inventory.
updated_at	DateTime	Timestamp when the item was last updated.
is_perishable	Boolean	Indicates if the item is perishable (true/false). 
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
