import "@testing-library/jest-dom";

jest.mock("ioredis", () => require("ioredis-mock"));
