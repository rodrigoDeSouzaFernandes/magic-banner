import { BannerApi } from "../banner.api";
import { Banner, BannerId, Url, ImageUrl } from "@/lib/banner/banner.types";

describe("BannerApi service", () => {
  const api = new BannerApi();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create banner successfully", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
    } as Response);

    await api.create({
      url: "url" as Url,
      image: "img" as ImageUrl,
    });

    expect(fetch).toHaveBeenCalledWith("/api/banners", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url: "url",
        image: "img",
      }),
    });
  });

  it("should throw error with api message when create fails", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Erro customizado" }),
    } as Response);

    await expect(
      api.create({
        url: "url" as Url,
        image: "img" as ImageUrl,
      })
    ).rejects.toThrow("Erro customizado");
  });

  it("should throw default error when create fails without message", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({}),
    } as Response);

    await expect(
      api.create({
        url: "url" as Url,
        image: "img" as ImageUrl,
      })
    ).rejects.toThrow("Erro ao criar banner");
  });

  it("should list banners", async () => {
    const banners: Banner[] = [
      {
        id: "1" as BannerId,
        url: "url" as Url,
        image: "img" as ImageUrl,
      },
    ];

    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => banners,
    } as Response);

    const result = await api.list();

    expect(fetch).toHaveBeenCalledWith("/api/banners");
    expect(result).toEqual(banners);
  });

  it("should throw error when list fails", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    } as Response);

    await expect(api.list()).rejects.toThrow("Erro ao carregar banners");
  });

  it("should delete banner successfully", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
    } as Response);

    await api.delete("1" as BannerId);

    expect(fetch).toHaveBeenCalledWith("/api/banners?id=1", {
      method: "DELETE",
    });
  });

  it("should throw error with api message when delete fails", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: "Erro delete" }),
    } as Response);

    await expect(api.delete("1" as BannerId)).rejects.toThrow("Erro delete");
  });
});
