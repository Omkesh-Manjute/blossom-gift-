# BLOSSOM GIFT – E-Commerce Storefront & Admin Portal MVP

An end-to-end gifting e-commerce platform and store management portal for **BLOSSOM GIFT** (Gondia, Maharashtra), featuring a personalized gift builder with live photo and message customization, streamlined Cash on Delivery checkout, instant order tracking, and an authorized merchant operations dashboard.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> The following operational decisions and technical foundations are established based on your preferences:

- **Confirmed Decision 1 – Order Confirmation & Tracking**: Customers receive an immediate on-screen order confirmation featuring a unique tracking code (e.g. `BG-2026-XXXX`), itemized receipt, delivery timeline, and a direct status lookup page with customer phone verification. A one-click WhatsApp message button is also provided for quick store communication.
- **Confirmed Decision 2 – Personalization Workflow**: Product detail pages (PDP) for customizable items feature an interactive customization module: photo upload with thumbnail preview, recipient name, custom greeting message, and selectable gift wrap options with clear pricing deltas.
- **Confirmed Decision 3 – Backend & Database Architecture**: A robust full-stack architecture running an Express API backend with transactional persistence and server-side validation. Complete, production-ready Supabase PostgreSQL migration files (with Row Level Security policies, tables, constraints, and indexes) will be created in `/supabase/migrations/` so the database can be deployed directly to Supabase with zero schema rework.
- **Confirmed Store Credentials**: 
  - Business: Blossom Gift
  - Location: Gupta Complex, Near N.M.D. College, Gondia (M.S.)
  - Contact / WhatsApp: +91 8208589775 / +91 9673155741

---

### 1. Overview & Core Concept

- **What It Does**: Blossom Gift is an online gift shop where shoppers browse gifts categorized by recipient and occasion (Birthdays, Anniversaries, Valentine's, Corporate, Festivals), customize items (custom photo mugs, engraved nameframes, hampers, greeting cards), place Cash on Delivery orders, and monitor real-time order fulfillment.
- **Target Audience / Persona**: Local and regional gift shoppers in Gondia and across India seeking thoughtful, personalized presents with fast fulfillment, transparent pricing, and reliable offline cash payment.
- **Admin Value**: Store staff can manage catalog inventory, review uploaded photos and custom messages, update order status through a 5-stage fulfillment pipeline, and configure delivery charges and announcements.

---

### 2. User Experience & Visual Design

#### Visual Identity & Theme
- **Color Palette (60-30-10 Rule)**:
  - **60% Dominant Canvas**: Warm porcelain white (`#FAFAF8`) and crisp white surfaces with subtle warm-stone dividers (`#F1EFEA`).
  - **30% Structural Surfaces**: Warm Cream (`#FFF8E8`), Charcoal ink for legible typography (`#292525` and `#1C1917`), and card backgrounds (`#FFFFFF`).
  - **10% Accent Budget**: Gift Yellow (`#F4C62E`) and Gift Pink (`#E95D79`) strictly reserved for primary CTA buttons, selection highlights, and price emphasis.
- **Vengeance UI Inspired Visual Flourish**: Subtle, hardware-accelerated animated ray effects in the hero banner and delicate luminous borders for featured gift spotlights, designed to create a magical gifting atmosphere without degrading shopping performance or layout stability.
- **Zero-Pill Discipline**: Occasions, categories, delivery times, and inventory statuses are displayed as crisp, unboxed text separated by elegant bullet glyphs (`·`), eliminating clutter.
- **Typography**:
  - *Display / Hero / Brand*: Elegant editorial serif (`Playfair Display`) paired with clean modern geometric sans (`Plus Jakarta Sans`).
  - *Data & Pricing*: Tabular figures (`font-mono tabular-nums`) for prices, order numbers, and stock quantities.

#### Key User Flows
1. **Explore & Filter**:
   - Hero campaign with animated ray accents and direct "Shop Personalized Gifts" CTA.
   - Occasion selector: Birthday, Anniversary, Valentine's Day, Wedding, Festivals.
   - Live search bar and price/category sorting with instant UI response.
2. **Personalization & Purchase (PDP)**:
   - High-fidelity product gallery, stock indicator, and size/variant selector.
   - Personalization builder: file dropzone for photo upload, custom message input with character counter, recipient name, and gift packaging options with real-time price updates.
3. **Cart Drawer & COD Checkout**:
   - Slide-over cart displaying thumbnail previews of uploaded images and custom text snippets.
   - 1-step checkout collecting recipient address, phone number, pincode, and delivery notes.
   - Server-side inventory and price verification before order generation.
4. **Order Tracking**:
   - Customer enters Order ID (`BG-XXXX`) and phone number to inspect fulfillment stages:
     `Order Placed` → `Confirmed` → `Preparing / Customized` → `Ready for Pickup / Shipped` → `Delivered`.
5. **Staff Admin Dashboard**:
   - Key operational metrics: Total Revenue, Pending Orders, Today's Deliveries, Low Stock Alerts.
   - Order review drawer with photo download and full customization breakdown.
   - Product catalog editor: title, slug, price, discount, stock, category, tags, and images.

---

### 3. Key Product Decisions & Trade-Offs

- **Decision 1: Cash on Delivery with Server Verification**
  - *Chosen Approach*: Streamlined Cash on Delivery with mandatory customer phone verification and address validation.
  - *Why*: Eliminates payment gateway drop-offs for local gift shoppers in India while keeping transaction records strictly authenticated.
  - *Alternative Considered*: Paid online payment gateways (Razorpay/Stripe) deferred to Phase 2 as specified in the PRD.
- **Decision 2: High-Quality In-App Customization Preview**
  - *Chosen Approach*: Instant client-side photo crop/preview with live rendering onto mock gift canvases (mugs, frames, greeting cards) prior to adding to cart.
  - *Why*: Gives customers immediate visual confidence that their gift will look great before placing the order.
- **Decision 3: Dual Compatibility (Express REST API + Supabase PostgreSQL Export)**
  - *Chosen Approach*: Full-stack Express backend serving secure REST endpoints with server-side validation and local storage persistence, coupled with an exportable, audited Supabase PostgreSQL schema file containing Row Level Security (RLS) policies.
  - *Why*: Ensures the application runs immediately inside the preview container without blocking on external cloud database credentials, while remaining 100% ready for Supabase production migration.

---

### 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        BLOSSOM GIFT STOREFRONT                         │
├────────────────────────────────┬───────────────────────────────────────┤
│ Customer Experience            │ Merchant Admin Console                │
│ ├─ Hero with Animated Rays     │ ├─ Analytics Dashboard                │
│ ├─ Product Catalog & Filters   │ ├─ Order Pipeline & Status Manager    │
│ ├─ Customization PDP (Photos)  │ ├─ Customization Specs & Downloads    │
│ ├─ Cart Drawer & COD Checkout  │ ├─ Inventory & Product CRUD           │
│ └─ Order Tracking Portal       │ └─ Store Settings & Delivery Fees     │
└────────────────────────────────┴───────────────────────────────────────┘
                                 │
                                 ▼
┌────────────────────────────────────────────────────────────────────────┐
│                       EXPRESS SERVER-SIDE API                          │
├────────────────────────────────────────────────────────────────────────┤
│ ├─ /api/products               (GET, POST, PUT, DELETE with auth)      │
│ ├─ /api/orders                 (POST order with validation, GET status)│
│ ├─ /api/customizations/upload  (Photo upload & asset storage)          │
│ └─ /api/admin/orders/:id/status (Fulfillment lifecycle transitions)    │
└────────────────────────────────────────────────────────────────────────┘
                                 │
                                 ▼
┌────────────────────────────────────────────────────────────────────────┐
│                 DATA PERSISTENCE & SUPABASE MIGRATION                  │
├────────────────────────────────────────────────────────────────────────┤
│ ├─ Server Database / State Store (JSON / SQLite persistent store)      │
│ └─ /supabase/migrations/20261017_blossom_gift_init.sql                │
│    (products, categories, variants, orders, order_items, RLS policies) │
└────────────────────────────────────────────────────────────────────────┘
```

#### Core Data Entities
1. `products`: `id`, `name`, `slug`, `description`, `price`, `compare_price`, `stock`, `category_id`, `occasions`, `is_customizable`, `images`, `status`
2. `categories`: `id`, `name`, `slug`, `description`, `image_url`
3. `product_variants`: `id`, `product_id`, `name`, `options` (e.g., Mug Color, Frame Size, Gift Box Tier)
4. `orders`: `id`, `order_number`, `customer_name`, `customer_phone`, `customer_email`, `delivery_address`, `city`, `pincode`, `total_amount`, `payment_method`, `status`, `created_at`
5. `order_items`: `id`, `order_id`, `product_id`, `product_snapshot`, `quantity`, `unit_price`, `customization` (photo URL, custom text, gift wrap)
6. `order_status_history`: `id`, `order_id`, `from_status`, `to_status`, `notes`, `created_at`
7. `store_settings`: `business_name`, `address`, `phones`, `whatsapp`, `cod_enabled`, `delivery_fee`, `free_delivery_threshold`

---

### 5. Verification Plan

- **Compilation**: Run `compile_applet` to verify zero TypeScript errors and clean bundling.
- **End-to-End Workflow**:
  1. Add a personalized gift to cart with custom photo, recipient name, and gift packaging.
  2. Complete Cash on Delivery checkout with address and contact info.
  3. Verify order confirmation page displays the unique order number.
  4. Test the customer order tracking tool with the generated order ID and phone number.
  5. Log into the Admin panel, inspect the new order, view uploaded customization details, and update the status from `Order Placed` to `Confirmed` and `Delivered`.
  6. Verify updated status is reflected in the tracking portal.
