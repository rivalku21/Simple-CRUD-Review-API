--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

-- Started on 2021-09-27 21:15:45

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
-- TOC entry 202 (class 1259 OID 16888)
-- Name: review; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.review (
    id uuid NOT NULL,
    id_wisata uuid NOT NULL,
    id_users uuid NOT NULL,
    calender timestamp without time zone,
    rating numeric,
    review character varying,
    images character varying[]
);


ALTER TABLE public.review OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 16872)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    name character varying NOT NULL,
    username character varying NOT NULL,
    password character varying NOT NULL,
    images character varying,
    create_at timestamp without time zone NOT NULL,
    update_at timestamp without time zone,
    last_login timestamp without time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 16880)
-- Name: wisata; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.wisata (
    id uuid NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.wisata OWNER TO postgres;

--
-- TOC entry 2997 (class 0 OID 16888)
-- Dependencies: 202
-- Data for Name: review; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.review (id, id_wisata, id_users, calender, rating, review, images) VALUES ('1502ad64-93b0-4b5b-a8e7-37992429b0ec', 'acac82e4-9f9a-4f6d-878d-ba9850d430cb', 'a613c05c-ec7a-49b4-ae9e-a6e088910a2e', '2021-09-26 21:26:12.271735', 4, 'sangat suka sekali', '{}');


--
-- TOC entry 2995 (class 0 OID 16872)
-- Dependencies: 200
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (id, name, username, password, images, create_at, update_at, last_login) VALUES ('a613c05c-ec7a-49b4-ae9e-a6e088910a2e', 'Rival Fauzi', 'rivalku21', '$2b$10$vL/i895jWd3YwuKBOz/.X.DXuwRPL3iIKAUKWICzsLg4FZWGTJ3ki', 'http://127.0.0.1:3000/images/18c4c647b12f1b436f374029aeaa10e8e84a.jpeg', '2021-09-26 17:57:15.105633', NULL, '2021-09-26 23:15:12.684723');


--
-- TOC entry 2996 (class 0 OID 16880)
-- Dependencies: 201
-- Data for Name: wisata; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.wisata (id, name) VALUES ('acac82e4-9f9a-4f6d-878d-ba9850d430cb', 'Gunung Merapi');
INSERT INTO public.wisata (id, name) VALUES ('533d85e5-11b6-41dd-a8a5-b6fdbcf6f742', 'Gunung Merbabu');


--
-- TOC entry 2864 (class 2606 OID 16895)
-- Name: review review_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT review_pkey PRIMARY KEY (id);


--
-- TOC entry 2860 (class 2606 OID 16879)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2862 (class 2606 OID 16887)
-- Name: wisata wisata_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.wisata
    ADD CONSTRAINT wisata_pkey PRIMARY KEY (id);


-- Completed on 2021-09-27 21:15:46

--
-- PostgreSQL database dump complete
--

