import React, { ReactNode } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HomeLayout from "../HomeLayout";
import { useFavorites } from "@/hooks/useFavorites";

jest.mock("@/hooks/useFavorites", () => ({
  useFavorites: jest.fn(),
}));

const MockFavoriteProvider = ({ children }: { children: ReactNode }) => {
  const mockFavorites = {
    favorites: [1],
    setShowFavorites: jest.fn(),
    showFavorites: true,
  };
  (useFavorites as jest.Mock).mockReturnValue(mockFavorites);
  return <>{children}</>;
};

describe("HomeLayout", () => {
  beforeEach(() => {
    const mockCharacters = [
      {
        id: 1,
        name: "Spider-Man",
        description: "",
        thumbnail: { path: "/assets/images/spiderman", extension: "jpg" },
      },
      {
        id: 2,
        name: "Iron Man",
        description: "",
        thumbnail: { path: "/assets/images/ironman", extension: "jpg" },
      },
    ];

    render(
      <MockFavoriteProvider>
        <HomeLayout characters={mockCharacters} loading={false} error={null} />
      </MockFavoriteProvider>
    );
  });

  it("renders the loader while loading", () => {
    render(
      <MockFavoriteProvider>
        <HomeLayout characters={[]} loading={true} error={null} />
      </MockFavoriteProvider>
    );

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("displays an error message if there is an error", () => {
    render(
      <MockFavoriteProvider>
        <HomeLayout
          characters={[]}
          loading={false}
          error="Failed to fetch characters"
        />
      </MockFavoriteProvider>
    );

    expect(
      screen.getByText(
        /Error al cargar personajes: Failed to fetch characters/i
      )
    ).toBeInTheDocument();
  });

  it("filters characters based on search term", () => {
    const filterInput = screen.getByRole("textbox");
    fireEvent.change(filterInput, { target: { value: "spider" } });

    expect(screen.getByText("Spider-Man")).toBeInTheDocument();
    expect(screen.queryByText("Iron Man")).not.toBeInTheDocument();
  });
});
