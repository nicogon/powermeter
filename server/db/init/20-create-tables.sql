--
-- TOC entry 198 (class 1259 OID 426421)
-- Name: Meditions; Type: TABLE; Schema: public; Owner: powermeter
--


CREATE TABLE public."Meditions" (
    id integer NOT NULL,
    "ReportId" integer,
    name character varying(255),
    "puntualMeditions" jsonb,
    "averagePower" double precision,
    "maximumPower" double precision
);


ALTER TABLE public."Meditions" OWNER TO powermeter;

--
-- TOC entry 197 (class 1259 OID 426419)
-- Name: Meditions_id_seq; Type: SEQUENCE; Schema: public; Owner: powermeter
--

CREATE SEQUENCE public."Meditions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Meditions_id_seq" OWNER TO powermeter;

--
-- TOC entry 2981 (class 0 OID 0)
-- Dependencies: 197
-- Name: Meditions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: powermeter
--

ALTER SEQUENCE public."Meditions_id_seq" OWNED BY public."Meditions".id;


--
-- TOC entry 201 (class 1259 OID 426437)
-- Name: Reports; Type: TABLE; Schema: public; Owner: powermeter
--

CREATE TABLE public."Reports" (
    id integer NOT NULL,
    name character varying(255),
    "timeStart" bigint,
    "secondsDuration" integer,
    "averagePower" double precision,
    "maximumPower" double precision
);


ALTER TABLE public."Reports" OWNER TO powermeter;

--
-- TOC entry 200 (class 1259 OID 426435)
-- Name: Reports_id_seq; Type: SEQUENCE; Schema: public; Owner: powermeter
--

CREATE SEQUENCE public."Reports_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Reports_id_seq" OWNER TO powermeter;

--
-- TOC entry 2982 (class 0 OID 0)
-- Dependencies: 200
-- Name: Reports_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: powermeter
--

ALTER SEQUENCE public."Reports_id_seq" OWNED BY public."Reports".id;


--
-- TOC entry 199 (class 1259 OID 426430)
-- Name: Sensors; Type: TABLE; Schema: public; Owner: powermeter
--

CREATE TABLE public."Sensors" (
    id integer NOT NULL,
    name character varying(255),
    sensibility double precision,
    "currentMedition" double precision,
    "lastPush" bigint
);


ALTER TABLE public."Sensors" OWNER TO powermeter;

--
-- TOC entry 196 (class 1259 OID 426414)
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: powermeter
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO powermeter;

--
-- TOC entry 205 (class 1259 OID 426453)
-- Name: SimulationElements; Type: TABLE; Schema: public; Owner: powermeter
--

CREATE TABLE public."SimulationElements" (
    id integer NOT NULL,
    "SimulationId" integer,
    "useInHoursMedition" double precision,
    name character varying(255),
    "totalConsumption" double precision,
    "totalCostConsumption" double precision,
    percentage double precision
);


ALTER TABLE public."SimulationElements" OWNER TO powermeter;

--
-- TOC entry 204 (class 1259 OID 426451)
-- Name: SimulationElements_id_seq; Type: SEQUENCE; Schema: public; Owner: powermeter
--

CREATE SEQUENCE public."SimulationElements_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."SimulationElements_id_seq" OWNER TO powermeter;

--
-- TOC entry 2983 (class 0 OID 0)
-- Dependencies: 204
-- Name: SimulationElements_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: powermeter
--

ALTER SEQUENCE public."SimulationElements_id_seq" OWNED BY public."SimulationElements".id;


--
-- TOC entry 203 (class 1259 OID 426445)
-- Name: Simulations; Type: TABLE; Schema: public; Owner: powermeter
--

CREATE TABLE public."Simulations" (
    id integer NOT NULL,
    name character varying(255),
    "totalCost" double precision,
    "totalKwh" double precision,
    "fixedCost" double precision,
    "kwhCost" double precision,
    "durationInHours" double precision
);


ALTER TABLE public."Simulations" OWNER TO powermeter;

--
-- TOC entry 202 (class 1259 OID 426443)
-- Name: Simulations_id_seq; Type: SEQUENCE; Schema: public; Owner: powermeter
--

CREATE SEQUENCE public."Simulations_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Simulations_id_seq" OWNER TO powermeter;

--
-- TOC entry 2984 (class 0 OID 0)
-- Dependencies: 202
-- Name: Simulations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: powermeter
--

ALTER SEQUENCE public."Simulations_id_seq" OWNED BY public."Simulations".id;


--
-- TOC entry 2828 (class 2604 OID 426424)
-- Name: Meditions id; Type: DEFAULT; Schema: public; Owner: powermeter
--

ALTER TABLE ONLY public."Meditions" ALTER COLUMN id SET DEFAULT nextval('public."Meditions_id_seq"'::regclass);


--
-- TOC entry 2829 (class 2604 OID 426440)
-- Name: Reports id; Type: DEFAULT; Schema: public; Owner: powermeter
--

ALTER TABLE ONLY public."Reports" ALTER COLUMN id SET DEFAULT nextval('public."Reports_id_seq"'::regclass);


--
-- TOC entry 2831 (class 2604 OID 426456)
-- Name: SimulationElements id; Type: DEFAULT; Schema: public; Owner: powermeter
--

ALTER TABLE ONLY public."SimulationElements" ALTER COLUMN id SET DEFAULT nextval('public."SimulationElements_id_seq"'::regclass);


--
-- TOC entry 2830 (class 2604 OID 426448)
-- Name: Simulations id; Type: DEFAULT; Schema: public; Owner: powermeter
--

ALTER TABLE ONLY public."Simulations" ALTER COLUMN id SET DEFAULT nextval('public."Simulations_id_seq"'::regclass);

--
-- TOC entry 2985 (class 0 OID 0)
-- Dependencies: 197
-- Name: Meditions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: powermeter
--

SELECT pg_catalog.setval('public."Meditions_id_seq"', 214, true);


--
-- TOC entry 2986 (class 0 OID 0)
-- Dependencies: 200
-- Name: Reports_id_seq; Type: SEQUENCE SET; Schema: public; Owner: powermeter
--

SELECT pg_catalog.setval('public."Reports_id_seq"', 169, true);


--
-- TOC entry 2987 (class 0 OID 0)
-- Dependencies: 204
-- Name: SimulationElements_id_seq; Type: SEQUENCE SET; Schema: public; Owner: powermeter
--

SELECT pg_catalog.setval('public."SimulationElements_id_seq"', 56, true);


--
-- TOC entry 2988 (class 0 OID 0)
-- Dependencies: 202
-- Name: Simulations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: powermeter
--

SELECT pg_catalog.setval('public."Simulations_id_seq"', 14, true);


--
-- TOC entry 2835 (class 2606 OID 426429)
-- Name: Meditions Meditions_pkey; Type: CONSTRAINT; Schema: public; Owner: powermeter
--

ALTER TABLE ONLY public."Meditions"
    ADD CONSTRAINT "Meditions_pkey" PRIMARY KEY (id);


--
-- TOC entry 2839 (class 2606 OID 426442)
-- Name: Reports Reports_pkey; Type: CONSTRAINT; Schema: public; Owner: powermeter
--

ALTER TABLE ONLY public."Reports"
    ADD CONSTRAINT "Reports_pkey" PRIMARY KEY (id);


--
-- TOC entry 2837 (class 2606 OID 426434)
-- Name: Sensors Sensors_pkey; Type: CONSTRAINT; Schema: public; Owner: powermeter
--

ALTER TABLE ONLY public."Sensors"
    ADD CONSTRAINT "Sensors_pkey" PRIMARY KEY (id);


--
-- TOC entry 2833 (class 2606 OID 426418)
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: powermeter
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- TOC entry 2843 (class 2606 OID 426458)
-- Name: SimulationElements SimulationElements_pkey; Type: CONSTRAINT; Schema: public; Owner: powermeter
--

ALTER TABLE ONLY public."SimulationElements"
    ADD CONSTRAINT "SimulationElements_pkey" PRIMARY KEY (id);


--
-- TOC entry 2841 (class 2606 OID 426450)
-- Name: Simulations Simulations_pkey; Type: CONSTRAINT; Schema: public; Owner: powermeter
--

ALTER TABLE ONLY public."Simulations"
    ADD CONSTRAINT "Simulations_pkey" PRIMARY KEY (id);


--
-- TOC entry 2844 (class 2606 OID 426459)
-- Name: SimulationElements SimulationElements_SimulationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: powermeter
--

ALTER TABLE ONLY public."SimulationElements"
    ADD CONSTRAINT "SimulationElements_SimulationId_fkey" FOREIGN KEY ("SimulationId") REFERENCES public."Simulations"(id) ON DELETE CASCADE;
