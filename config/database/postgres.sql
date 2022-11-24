CREATE TABLE IF NOT EXISTS public.category
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 7 START 33 MINVALUE 33 MAXVALUE 999999999999999 CACHE 1 ),
    name character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT products_pkey PRIMARY KEY (id),
    CONSTRAINT name UNIQUE (name)
)



CREATE TABLE IF NOT EXISTS public.order_products
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 14 START 7 MINVALUE 7 MAXVALUE 99999999999999 CACHE 1 ),
    order_id bigint NOT NULL,
    product_id bigint NOT NULL,
    quantity bigint NOT NULL,
    price_unit bigint NOT NULL,
    CONSTRAINT order_products_pkey PRIMARY KEY (id),
    CONSTRAINT order_id FOREIGN KEY (order_id)
        REFERENCES public.orders (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT product_id FOREIGN KEY (product_id)
        REFERENCES public.products (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

CREATE TABLE IF NOT EXISTS public.orders
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 43 START 43 MINVALUE 43 MAXVALUE 9999999999999 CACHE 1 ),
    user_id bigint NOT NULL,
    total bigint NOT NULL,
    date date NOT NULL DEFAULT CURRENT_DATE,
    CONSTRAINT orders_pkey PRIMARY KEY (id),
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)


CREATE TABLE IF NOT EXISTS public.phones
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 91 START 91 MINVALUE 91 MAXVALUE 999999999999999999 CACHE 1 ),
    phone_number integer NOT NULL,
    user_id bigint NOT NULL,
    CONSTRAINT phones_pkey PRIMARY KEY (id),
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)


CREATE TABLE IF NOT EXISTS public.products
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 17 START 1 MINVALUE 1 MAXVALUE 9999999999999 CACHE 1 ),
    name character varying(40) COLLATE pg_catalog."default" NOT NULL,
    price bigint NOT NULL,
    status boolean NOT NULL,
    category_id bigint NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT productname UNIQUE (name),
    CONSTRAINT category_id FOREIGN KEY (category_id)
        REFERENCES public.category (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)


CREATE TABLE IF NOT EXISTS public.ratings
(
    rating integer NOT NULL,
    user_id bigint NOT NULL,
    product_id bigint NOT NULL,
    CONSTRAINT ratings_pkey PRIMARY KEY (user_id, product_id)
)

CREATE TABLE IF NOT EXISTS public.users
(
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 7 START 53 MINVALUE 53 MAXVALUE 999999999999999 CACHE 1 ),
    first_name character varying(20) COLLATE pg_catalog."default" NOT NULL,
    last_name character varying(20) COLLATE pg_catalog."default" NOT NULL,
    email character varying(30) COLLATE pg_catalog."default" NOT NULL,
    password character varying COLLATE pg_catalog."default" NOT NULL,
    birth date NOT NULL,
    isadmin boolean NOT NULL DEFAULT false,
    adress character varying(60) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT products_pkey1 PRIMARY KEY (id),
    CONSTRAINT email UNIQUE (email)
)


