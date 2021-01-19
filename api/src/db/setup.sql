--
-- RUN SCRIPT TO SETUP TABLES IN DATABASE
--

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

CREATE TABLE public.answers (
    id character varying(100) NOT NULL,
    answer text NOT NULL,
    is_correct boolean NOT NULL,
    question_id character varying(100)
);

ALTER TABLE public.answers OWNER TO postgres;

CREATE TABLE public.questions (
    category character varying(100) NOT NULL,
    difficulty character varying(100) NOT NULL,
    id character varying(100) NOT NULL,
    question text NOT NULL,
    times_answered integer NOT NULL,
    type character varying(100) NOT NULL,
    times_correct integer NOT NULL,
    last_answer_correct boolean NOT NULL,
    session_id character varying(100) NOT NULL
);


ALTER TABLE public.questions OWNER TO postgres;

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT answers_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT unique_answer UNIQUE (question_id, answer);

ALTER TABLE ONLY public.answers
    ADD CONSTRAINT question_id FOREIGN KEY (question_id) REFERENCES public.questions(id);

REVOKE ALL ON SCHEMA public FROM rdsadmin;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;