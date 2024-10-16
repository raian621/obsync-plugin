import { Client } from "@/client";
import { test, expect } from "vitest";

test("constructor", () => {
  const serverURL = "https://localhost:8000";
  const key = "1234567890";
  const client = new Client(serverURL, key);
  expect(client.serverURL).toBe(serverURL);
  expect(client.key).toBe(key);
});
