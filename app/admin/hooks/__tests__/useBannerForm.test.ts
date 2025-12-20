// __tests__/useBannerForm.test.ts
import { renderHook, act } from "@testing-library/react";
import useBannerForm from "../useBannerForm";
import { BannerFormData } from "../../schemas/bannerSchema";

describe("useBannerForm hook", () => {
  const mockOnSubmitForm = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with default values and loading false", () => {
    const { result } = renderHook(() =>
      useBannerForm({ onSubmitForm: mockOnSubmitForm })
    );

    expect(result.current.form.getValues()).toEqual({
      url: "",
      image: "",
      startTime: "",
      endTime: "",
    });
    expect(result.current.loading).toBe(false);
  });

  it("should call onSubmitForm and reset form on submit", async () => {
    mockOnSubmitForm.mockResolvedValue(undefined);

    const { result } = renderHook(() =>
      useBannerForm({ onSubmitForm: mockOnSubmitForm })
    );

    const data: BannerFormData = {
      url: "https://site.com",
      image: "https://img.com/banner.png",
      startTime: "10:00",
      endTime: "12:00",
    };

    await act(async () => {
      await result.current.onSubmit(data);
    });

    expect(mockOnSubmitForm).toHaveBeenCalledWith({
      url: "https://site.com",
      image: "https://img.com/banner.png",
      startTime: "10:00",
      endTime: "12:00",
    });

    expect(result.current.form.getValues()).toEqual({
      url: "",
      image: "",
      startTime: "",
      endTime: "",
    });
    expect(result.current.loading).toBe(false);
  });

  it("should set error when onInvalidTime is called", async () => {
    const { result } = renderHook(() =>
      useBannerForm({ onSubmitForm: mockOnSubmitForm })
    );

    const fakeEvent = {
      preventDefault: jest.fn(),
    } as unknown as React.FormEvent<HTMLInputElement>;

    act(() => {
      result.current.onInvalidTime(fakeEvent, "startTime");
    });

    const error = result.current.form.getFieldState("startTime")?.error;

    expect(fakeEvent.preventDefault).toHaveBeenCalled();
    expect(error).toBeDefined();
    expect(error?.message).toBe(
      "Informe um horário válido no formato HH:mm ou deixe em branco"
    );
  });
});
