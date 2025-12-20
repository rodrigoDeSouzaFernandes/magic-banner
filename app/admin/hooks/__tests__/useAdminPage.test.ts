import { renderHook, act, waitFor } from "@testing-library/react";
import { useAdminPage } from "../useAdminPage";
import { bannerApi } from "../../services/banner.api";
import { toast } from "sonner";
import { Banner, BannerId, ImageUrl, Url } from "@/lib/banner.types";

jest.mock("../../services/banner.api");
jest.mock("sonner");

describe("useAdminPage hook", () => {
  const mockedBannerApi = bannerApi as jest.Mocked<typeof bannerApi>;
  const mockedToast = toast as jest.Mocked<typeof toast>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should load banners on mount", async () => {
    const mockData: Banner[] = [
      { id: "1" as BannerId, url: "url" as Url, image: "img" as ImageUrl },
    ];
    mockedBannerApi.list.mockResolvedValue(mockData);

    const { result } = renderHook(() => useAdminPage());

    await waitFor(() => expect(result.current.banners).toEqual(mockData));

    expect(result.current.bannerListLoading).toBe(false);
  });

  it("should handle error when loading banners", async () => {
    mockedBannerApi.list.mockRejectedValue(new Error("fail"));

    const { result } = renderHook(() => useAdminPage());

    await waitFor(() =>
      expect(mockedToast.error).toHaveBeenCalledWith("Erro ao carregar banners")
    );

    expect(result.current.bannerListLoading).toBe(false);
  });

  it("should delete a banner and reload list", async () => {
    mockedBannerApi.delete.mockResolvedValue(undefined);
    mockedBannerApi.list.mockResolvedValue([]);

    const { result } = renderHook(() => useAdminPage());

    await waitFor(() => expect(result.current.banners).toEqual([]));

    await act(async () => {
      await result.current.deleteBanner("1" as BannerId);
    });

    expect(mockedBannerApi.delete).toHaveBeenCalledWith("1");
    expect(mockedToast.success).toHaveBeenCalledWith(
      "Banner excluído com sucesso"
    );
  });

  it("should create a banner and reload list", async () => {
    mockedBannerApi.create.mockResolvedValue(undefined);
    mockedBannerApi.list.mockResolvedValue([]);

    const { result } = renderHook(() => useAdminPage());

    await waitFor(() => expect(result.current.banners).toEqual([]));

    await act(async () => {
      await result.current.createBanner({ url: "url", image: "img" } as Banner);
    });

    expect(mockedBannerApi.create).toHaveBeenCalledWith({
      url: "url",
      image: "img",
    });
    expect(mockedToast.success).toHaveBeenCalledWith(
      "Banner criado com sucesso"
    );
  });

  it("should handle error on createBanner", async () => {
    mockedBannerApi.create.mockRejectedValue(new Error("fail"));
    mockedBannerApi.list.mockResolvedValue([]);

    const { result } = renderHook(() => useAdminPage());

    await waitFor(async () => {
      await act(async () => {
        await result.current.createBanner({ url: "url", image: "img" } as Banner);
      });
      expect(mockedToast.error).toHaveBeenCalledWith("fail");
    });
  });
});
