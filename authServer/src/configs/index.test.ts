import { adminAppConfig, appConfig, serverConfig } from ".";

describe("Configs", () => {
  it("Server Config", () => {
    expect(serverConfig().serverId).toBe("1");
  });
  it("Admin Config", () => {
    expect(adminAppConfig().name).toBe("Auth-AdminApp");
  });
  it("App Config", () => {
    expect(appConfig().name).toBe("Auth-UserApp");
  });
});
