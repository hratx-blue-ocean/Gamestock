--
-- PostgreSQL database dump
--

-- Dumped from database version 12.4 (Ubuntu 12.4-1.pgdg20.04+1)
-- Dumped by pg_dump version 12.4 (Ubuntu 12.4-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.items (
    id integer NOT NULL,
    title character varying(200) NOT NULL,
    console character varying(100),
    thumbnail character varying(300),
    front_view character varying(300),
    back_view character varying(300),
    is_console boolean,
    current_price money
);


ALTER TABLE public.items OWNER TO postgres;

--
-- Name: items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.items_id_seq OWNER TO postgres;

--
-- Name: items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.items_id_seq OWNED BY public.items.id;


--
-- Name: items_in_collection; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.items_in_collection (
    id integer NOT NULL,
    item_id integer NOT NULL,
    user_id integer NOT NULL,
    condition character varying(50) NOT NULL,
    comments character varying(300),
    starting_price money,
    date_of_purchase timestamp without time zone,
    tradeable boolean,
    complete_in_box boolean
);


ALTER TABLE public.items_in_collection OWNER TO postgres;

--
-- Name: items_in_collection_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.items_in_collection_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.items_in_collection_id_seq OWNER TO postgres;

--
-- Name: items_in_collection_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.items_in_collection_id_seq OWNED BY public.items_in_collection.id;


--
-- Name: items_value_by_date; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.items_value_by_date (
    id integer NOT NULL,
    date timestamp without time zone,
    current_value money,
    item_id integer NOT NULL
);


ALTER TABLE public.items_value_by_date OWNER TO postgres;

--
-- Name: items_value_by_date_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.items_value_by_date_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.items_value_by_date_id_seq OWNER TO postgres;

--
-- Name: items_value_by_date_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.items_value_by_date_id_seq OWNED BY public.items_value_by_date.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    avatar character varying(300),
    hashed_pw character varying(100),
    email character varying(80)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: items id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items ALTER COLUMN id SET DEFAULT nextval('public.items_id_seq'::regclass);


--
-- Name: items_in_collection id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items_in_collection ALTER COLUMN id SET DEFAULT nextval('public.items_in_collection_id_seq'::regclass);


--
-- Name: items_value_by_date id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items_value_by_date ALTER COLUMN id SET DEFAULT nextval('public.items_value_by_date_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.items (id, title, console, thumbnail, front_view, back_view, is_console, current_price) FROM stdin;
112	Zelda Link to the Past	Super Nintendo	https://thumbs3.ebaystatic.com/pict/2648050953184040_3.jpg	\N	\N	f	\N
113	Dark Souls Remastered	Playstation 4	https://thumbs3.ebaystatic.com/m/mYeSXp9aJdqlw8TCHJLZ9sQ/140.jpg	https://i.ebayimg.com/00/s/MTUwMFgxMjA0/z/AsYAAOSwm8hfWoXF/$_1.JPG	\N	f	\N
114	Darksiders	Xbox 360	https://thumbs3.ebaystatic.com/m/m2u6r8PGQrVW3U7pueNhDtw/140.jpg	https://i.ebayimg.com/00/s/MTYwMFgxMjAw/z/G~4AAOSw3lZevZO2/$_1.JPG	\N	f	\N
115	Zelda Majora's Mask [Not for Resale Gold]	Nintendo 64	https://thumbs1.ebaystatic.com/m/mbWtDAbdv7GoIo5QL9xeRew/140.jpg	https://i.ebayimg.com/00/s/MTAwMVgxMDAx/z/B54AAOSwPK1ZXRGO/$_1.JPG	\N	f	\N
\.


--
-- Data for Name: items_in_collection; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.items_in_collection (id, item_id, user_id, condition, comments, starting_price, date_of_purchase, tradeable, complete_in_box) FROM stdin;
20029	112	121	B	Gift from bob	$49.99	2020-09-17 00:00:00	t	f
20030	113	121	New	I love this game	$35.00	2017-02-16 00:00:00	t	\N
20031	114	121	C	I want it , I got it.	$45.00	2020-09-02 00:00:00	f	\N
20032	115	121	C	I got this on my trip to Canada	$25.00	2016-06-17 00:00:00	f	\N
\.


--
-- Data for Name: items_value_by_date; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.items_value_by_date (id, date, current_value, item_id) FROM stdin;
10012	2020-09-17 00:00:00	$39.43	112
10013	\N	$1,699.00	113
10014	2020-09-17 23:08:05	$5.79	114
10015	2020-09-17 23:11:54	$127.99	115
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, avatar, hashed_pw, email) FROM stdin;
119	Flexbaby	http://localhost:7711/resources/mario.jpg	$2b$12$5iOlCLbJ2AbfEFJ/nEC60ObKPi5ZTwUBnRTiZfBMICprhm6hBsFp6	\N
120	BoomBot	http://localhost:7711/resources/mario.jpg	$2b$12$NWiO65MBx0/l54G.C9l1xu02QYDpFBFqB/mreVmRAcLekWLoXFCFO	\N
121	BabyBat	http://localhost:7711/resources/mario.jpg	$2b$12$/c.6jkB6q.UOLQcVLoC1zOSNI/h.GoQ1lQmQ4KuXhq6KG9bcPHCHq	\N
122	BabyCat	http://localhost:7711/resources/mario.jpg	$2b$12$/2U20TyBIIQJ1g8bQkbUce35Tu2WoVR7ZIk2Tb4TrSEMuBKpdeyUq	\N
\.


--
-- Name: items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.items_id_seq', 115, true);


--
-- Name: items_in_collection_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.items_in_collection_id_seq', 20032, true);


--
-- Name: items_value_by_date_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.items_value_by_date_id_seq', 10015, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 122, true);


--
-- Name: items_in_collection items_in_collection_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items_in_collection
    ADD CONSTRAINT items_in_collection_pkey PRIMARY KEY (id);


--
-- Name: items items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);


--
-- Name: items_value_by_date items_value_by_date_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items_value_by_date
    ADD CONSTRAINT items_value_by_date_pkey PRIMARY KEY (id);


--
-- Name: items unq_title_console; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT unq_title_console UNIQUE (title, console);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: items_in_collection items_in_collection_item_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items_in_collection
    ADD CONSTRAINT items_in_collection_item_id_fkey FOREIGN KEY (item_id) REFERENCES public.items(id);


--
-- Name: items_in_collection items_in_collection_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items_in_collection
    ADD CONSTRAINT items_in_collection_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: items_value_by_date items_value_by_date_items_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.items_value_by_date
    ADD CONSTRAINT items_value_by_date_items_fkey FOREIGN KEY (item_id) REFERENCES public.items(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

