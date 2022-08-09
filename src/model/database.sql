CREATE DATABASE personalbudget IF NOT EXISTS

CREATE TABLE envelopes IF NOT EXISTS(
  id          INT     PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
  name        VARCHAR(30),
  description VARCHAR(90),
  amount      NUMERIC(12,2)
)

CREATE TABLE expenses IF NOT EXISTS(
  id          INT     PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
  name        VARCHAR(30),
  detail      VARCHAR(90),
  amount      NUMERIC(12,2),
  date        BIGINT
)

CREATE TABLE balance IF NOT EXISTS(
  budget      NUMERIC(12,2),
)