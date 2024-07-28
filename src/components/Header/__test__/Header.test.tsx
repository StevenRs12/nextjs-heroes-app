import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../Header";
import { useFavorites } from "@/hooks/useFavorites";
import { useRouter } from "next/navigation";

jest.mock("@/hooks/useFavorites", () => ({
  useFavorites: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockSetShowFavorites = jest.fn();

describe("Header", () => {
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    (useFavorites as jest.Mock).mockReturnValue({
      favorites: [],
      setShowFavorites: mockSetShowFavorites,
    });
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the header with logo and favorites", () => {
    render(<Header />);

    const logo = screen.getByAltText("Logo");
    expect(logo).toBeInTheDocument();

    const favoritesIcon = screen.getByAltText("Favorites");
    expect(favoritesIcon).toBeInTheDocument();
  });

  it("calls setShowFavorites and router.push on favorites click", () => {
    render(<Header />);

    const favoritesIcon = screen.getByAltText("Favorites");
    fireEvent.click(favoritesIcon);

    expect(mockSetShowFavorites).toHaveBeenCalledWith(true);
    expect(mockRouterPush).toHaveBeenCalledWith("/");
  });

  it("calls setShowFavorites to false and router.push on logo click", () => {
    render(<Header />);

    const logo = screen.getByAltText("Logo");
    fireEvent.click(logo);

    expect(mockSetShowFavorites).toHaveBeenCalledWith(false);
    expect(mockRouterPush).toHaveBeenCalledWith("/");
  });

  it("displays favorites count when there are favorites", () => {
    (useFavorites as jest.Mock).mockReturnValue({
      favorites: [{ id: 1 }, { id: 2 }, { id: 3 }],
      setShowFavorites: mockSetShowFavorites,
    });

    render(<Header />);

    const favoritesCount = screen.getByText("3");
    expect(favoritesCount).toBeInTheDocument();
  });
});
