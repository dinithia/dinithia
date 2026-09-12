import { Test } from "@nestjs/testing";
import { describe, expect, it } from "vitest";
import { AppController } from "./app.controller";

describe("AppController", () => {
  it("returns health with module list", async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    const controller = moduleRef.get(AppController);
    const health = controller.health();

    expect(health.status).toBe("ok");
    expect(health.modules).toEqual([
      "tenants",
      "customers",
      "workflows",
      "users",
      "notifications",
      "audit",
    ]);
  });
});
