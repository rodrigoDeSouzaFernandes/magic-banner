/**
 * @jest-environment node
 */

import { GET, POST, DELETE } from "../route";
import { bannerService } from "../../../../lib/banner/banner.service";

jest.mock("../../../../lib/banner/banner.service", () => ({
  bannerService: {
    list: jest.fn(),
    getByUrl: jest.fn(),
    create: jest.fn(),
    remove: jest.fn(),
  },
}));

jest.mock("next/server", () => ({
  NextResponse: {
    json: (data: any, init?: { status?: number; headers?: any }) => ({
      data,
      status: init?.status ?? 200,
      headers: init?.headers,
      json: async () => data,
    }),
  },
}));

type MockedResponse<T = any> = {
  data: T;
  status: number;
  headers?: any;
  json: () => Promise<T>;
};

const makeRequest = (path = "", options?: RequestInit) =>
  new Request(`http://test${path}`, options);

describe("API /api/banners", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET", () => {
    it("returns all banners when no url param", async () => {
      const banners = [{ id: "1", url: "home", image: "img" }];
      (bannerService.list as jest.Mock).mockReturnValue(banners);

      const request = makeRequest("/api/banners");
      const response = (await GET(request)) as unknown as MockedResponse;

      expect(response.status).toBe(200);
      expect(response.data).toEqual(banners);
    });

    it("returns banner by url", async () => {
      const banner = { id: "1", url: "home", image: "img" };
      (bannerService.getByUrl as jest.Mock).mockReturnValue(banner);

      const request = makeRequest("/api/banners?url=home");
      const response = (await GET(request)) as unknown as MockedResponse;

      expect(response.status).toBe(200);
      expect(response.data).toEqual(banner);
    });

    it("returns 404 when banner not found", async () => {
      (bannerService.getByUrl as jest.Mock).mockReturnValue(undefined);

      const request = makeRequest("/api/banners?url=home");
      const response = (await GET(request)) as unknown as MockedResponse;

      expect(response.status).toBe(404);
      expect(response.data.error).toContain("Nenhum banner encontrado");
    });

    it("returns 500 on unexpected error", async () => {
      (bannerService.list as jest.Mock).mockImplementation(() => {
        throw new Error("Erro interno");
      });

      const request = makeRequest("/api/banners");
      const response = (await GET(request)) as unknown as MockedResponse;

      expect(response.status).toBe(500);
      expect(response.data.error).toContain("Ocorreu um erro");
    });
  });

  describe("POST", () => {
    it("creates banner with valid payload", async () => {
      const body = { url: "home", image: "img" };

      const request = makeRequest("/api/banners", {
        method: "POST",
        body: JSON.stringify(body),
      });

      const response = (await POST(request)) as unknown as MockedResponse;

      expect(response.status).toBe(200);
      expect(response.data.ok).toBe(true);
      expect(bannerService.create).toHaveBeenCalled();
    });

    it("returns 400 when required fields are missing", async () => {
      const request = makeRequest("/api/banners", {
        method: "POST",
        body: JSON.stringify({}),
      });

      const response = (await POST(request)) as unknown as MockedResponse;

      expect(response.status).toBe(400);
      expect(response.data.error).toContain("Campos obrigatórios");
    });

    it("returns 500 on unexpected error", async () => {
      const request = makeRequest("/api/banners", {
        method: "POST",
        body: "invalid-json",
      });

      const response = (await POST(request)) as unknown as MockedResponse;

      expect(response.status).toBe(500);
      expect(response.data.error).toContain("Ocorreu um erro");
    });
  });

  describe("DELETE", () => {
    it("deletes banner when id exists", async () => {
      (bannerService.remove as jest.Mock).mockReturnValue(true);

      const request = makeRequest("/api/banners?id=1", {
        method: "DELETE",
      });

      const response = (await DELETE(request)) as unknown as MockedResponse;

      expect(response.status).toBe(200);
      expect(response.data.ok).toBe(true);
      expect(bannerService.remove).toHaveBeenCalledWith("1");
    });

    it("returns 400 when id is missing", async () => {
      const request = makeRequest("/api/banners", {
        method: "DELETE",
      });

      const response = (await DELETE(request)) as unknown as MockedResponse;

      expect(response.status).toBe(400);
      expect(response.data.error).toContain("ID obrigatório");
    });

    it("returns 404 when banner not found", async () => {
      (bannerService.remove as jest.Mock).mockReturnValue(false);

      const request = makeRequest("/api/banners?id=999", {
        method: "DELETE",
      });

      const response = (await DELETE(request)) as unknown as MockedResponse;

      expect(response.status).toBe(404);
      expect(response.data.error).toContain("não encontrado");
    });

    it("returns 500 on unexpected error", async () => {
      (bannerService.remove as jest.Mock).mockImplementation(() => {
        throw new Error("boom");
      });

      const request = makeRequest("/api/banners?id=1", {
        method: "DELETE",
      });

      const response = (await DELETE(request)) as unknown as MockedResponse;

      expect(response.status).toBe(500);
      expect(response.data.error).toContain("Ocorreu um erro");
    });
  });
});
