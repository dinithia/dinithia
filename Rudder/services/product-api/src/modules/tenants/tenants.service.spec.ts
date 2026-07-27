import { describe, expect, it } from "vitest";
import { TenantsService } from "./tenants.service";

describe("TenantsService", () => {
  it("creates and lists tenants", () => {
    const service = new TenantsService();
    const created = service.create({ name: "Acme", slug: "acme" });

    expect(created.id).toMatch(/^ten_/);
    expect(created.status).toBe("active");
    expect(service.list()).toHaveLength(1);
    expect(service.get(created.id).slug).toBe("acme");
  });

  it("updates tenant status", () => {
    const service = new TenantsService();
    const created = service.create({ name: "Acme", slug: "acme" });
    const updated = service.update(created.id, { status: "suspended" });

    expect(updated.status).toBe("suspended");
  });
});
