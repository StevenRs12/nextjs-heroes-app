import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HomeLayout from "../HomeLayout";
import { useCharacters } from "@/hooks/useCharacters";
import { useFavorites } from "@/hooks/useFavorites";

jest.mock("@/hooks/useCharacters");
jest.mock("@/hooks/useFavorites");

const mockCharacters = [
  {
    id: 1,
    name: "Spider-Man",
    thumbnail: { path: "/assets/images/spiderman", extension: "jpg" },
  },
  {
    id: 2,
    name: "Iron Man",
    thumbnail: { path: "/assets/images/ironman", extension: "jpg" },
  },
];

describe("HomeLayout", () => {
  beforeEach(() => {
    (useCharacters as jest.Mock).mockReturnValue({
      characters: mockCharacters,
      loading: false,
      error: null,
    });

    (useFavorites as jest.Mock).mockReturnValue({
      favorites: [1],
      showFavorites: true,
    });
  });

  it("renders the loader while loading", () => {
    (useCharacters as jest.Mock).mockReturnValueOnce({
      characters: [],
      loading: true,
      error: null,
    });

    render(<HomeLayout />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("displays an error message if there is an error", () => {
    (useCharacters as jest.Mock).mockReturnValueOnce({
      characters: [],
      loading: false,
      error: "Failed to fetch characters",
    });

    render(<HomeLayout />);
    expect(
      screen.getByText(
        /Error al cargar personajes: Failed to fetch characters/i
      )
    ).toBeInTheDocument();
  });

  it("filters characters based on search term", () => {
    render(<HomeLayout />);

    const filterInput = screen.getByRole("textbox");
    fireEvent.change(filterInput, { target: { value: "spider" } });

    expect(screen.getByText("Spider-Man")).toBeInTheDocument();
    expect(screen.queryByText("Iron Man")).not.toBeInTheDocument();
  });
});
