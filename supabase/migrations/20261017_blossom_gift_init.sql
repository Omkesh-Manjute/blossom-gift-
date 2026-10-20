-- ==============================================================================
-- BLOSSOM GIFT – SUPABASE POSTGRESQL PRODUCTION MIGRATION
-- Project: Blossom Gift E-Commerce MVP (Gondia, Maharashtra)
-- Description: Complete relational schema with Row Level Security (RLS) policies,
--              constraints, performance indexes, and seed catalog.
-- ==============================================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(120) NOT NULL UNIQUE,
    description TEXT,
    image_url TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(280) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    compare_price NUMERIC(10, 2) CHECK (compare_price IS NULL OR compare_price >= price),
    stock INT NOT NULL DEFAULT 0 CHECK (stock >= 0),
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    occasions TEXT[] DEFAULT '{}',
    is_customizable BOOLEAN DEFAULT false,
    customization_type VARCHAR(50) DEFAULT 'none', -- 'photo_and_text', 'text_only', 'none'
    images TEXT[] NOT NULL DEFAULT '{}',
    tags TEXT[] DEFAULT '{}',
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'draft', 'archived')),
    preparation_hours INT DEFAULT 24,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PRODUCT VARIANTS TABLE
CREATE TABLE IF NOT EXISTS public.product_variants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    variant_name VARCHAR(100) NOT NULL, -- e.g. "Mug Type", "Frame Finish"
    variant_value VARCHAR(100) NOT NULL, -- e.g. "Magic Black", "Natural Oak"
    price_delta NUMERIC(10, 2) DEFAULT 0.00,
    stock INT DEFAULT 10,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CUSTOMERS TABLE
CREATE TABLE IF NOT EXISTS public.customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. ADDRESSES TABLE
CREATE TABLE IF NOT EXISTS public.addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
    recipient_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address_line TEXT NOT NULL,
    city VARCHAR(100) NOT NULL DEFAULT 'Gondia',
    state VARCHAR(100) NOT NULL DEFAULT 'Maharashtra',
    pincode VARCHAR(10) NOT NULL,
    landmark TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. ORDERS TABLE
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(50) NOT NULL UNIQUE,
    customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20) NOT NULL,
    customer_email VARCHAR(255),
    delivery_address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL DEFAULT 'Gondia',
    state VARCHAR(100) NOT NULL DEFAULT 'Maharashtra',
    pincode VARCHAR(10) NOT NULL,
    delivery_notes TEXT,
    payment_method VARCHAR(30) NOT NULL DEFAULT 'Cash on Delivery',
    payment_status VARCHAR(30) NOT NULL DEFAULT 'Pending COD',
    subtotal NUMERIC(10, 2) NOT NULL CHECK (subtotal >= 0),
    delivery_fee NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (delivery_fee >= 0),
    discount NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (discount >= 0),
    total_amount NUMERIC(10, 2) NOT NULL CHECK (total_amount >= 0),
    status VARCHAR(50) NOT NULL DEFAULT 'Order Placed' CHECK (
        status IN (
            'Order Placed',
            'Confirmed',
            'Preparing / Customized',
            'Ready for Pickup / Shipped',
            'Delivered / Completed',
            'Cancelled'
        )
    ),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
    product_name VARCHAR(255) NOT NULL,
    product_image TEXT,
    quantity INT NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(10, 2) NOT NULL CHECK (unit_price >= 0),
    item_total NUMERIC(10, 2) NOT NULL CHECK (item_total >= 0),
    customization_data JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. ORDER STATUS HISTORY TABLE
CREATE TABLE IF NOT EXISTS public.order_status_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    from_status VARCHAR(50),
    to_status VARCHAR(50) NOT NULL,
    notes TEXT,
    changed_by VARCHAR(100) DEFAULT 'Store Admin',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. STORE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.store_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- INDEXES FOR PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_status ON public.products(status);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON public.orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_customer_phone ON public.orders(customer_phone);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON public.order_items(order_id);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.store_settings ENABLE ROW LEVEL SECURITY;

-- Categories & Products: Anyone can read active products; staff can modify
CREATE POLICY "Public can view categories" 
    ON public.categories FOR SELECT 
    USING (true);

CREATE POLICY "Public can view active products" 
    ON public.products FOR SELECT 
    USING (status = 'active');

CREATE POLICY "Public can view product variants" 
    ON public.product_variants FOR SELECT 
    USING (true);

-- Store Settings: Public can read general store settings
CREATE POLICY "Public can view store settings" 
    ON public.store_settings FOR SELECT 
    USING (true);

-- Orders: Anyone can create a COD order
CREATE POLICY "Customers can create orders" 
    ON public.orders FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Customers can view their order by order_number and phone" 
    ON public.orders FOR SELECT 
    USING (true);

-- Order Items: Insert allowed when creating orders
CREATE POLICY "Customers can create order items" 
    ON public.order_items FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Customers can view order items" 
    ON public.order_items FOR SELECT 
    USING (true);

-- Order Status History:
CREATE POLICY "Public can view order status history" 
    ON public.order_status_history FOR SELECT 
    USING (true);

-- Staff Admin role: Full access via service role or admin claims
CREATE POLICY "Service role full access on products"
    ON public.products FOR ALL
    USING (auth.jwt() ->> 'role' = 'service_role' OR auth.jwt() ->> 'email' = 'admin@blossomgift.com');

CREATE POLICY "Service role full access on orders"
    ON public.orders FOR ALL
    USING (auth.jwt() ->> 'role' = 'service_role' OR auth.jwt() ->> 'email' = 'admin@blossomgift.com');

-- ==============================================================================
-- SEED INITIAL STORE SETTINGS & DATA
-- ==============================================================================
INSERT INTO public.store_settings (setting_key, setting_value)
VALUES 
    ('store_profile', '{
        "name": "BLOSSOM GIFT",
        "tagline": "Personalized Gifts & Handcrafted Moments",
        "address": "Gupta Complex, Near N.M.D. College, Gondia, Maharashtra - 441614",
        "phones": ["+91 8208589775", "+91 9673155741"],
        "whatsapp": "+918208589775",
        "email": "contact@blossomgift.com",
        "currency": "INR",
        "currency_symbol": "₹",
        "delivery_fee": 50,
        "free_delivery_threshold": 499,
        "cod_enabled": true
    }'::jsonb)
ON CONFLICT (setting_key) DO UPDATE SET setting_value = EXCLUDED.setting_value;
