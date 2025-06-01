import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToDoProvider } from "~/toDoContext";
import "@testing-library/jest-dom";

import Home from "app/routes/home";

describe("Home component", () => {
  const renderComponent = () => {
    render(
      <ToDoProvider>
        <Home />
      </ToDoProvider>
    );

    return {
      input: screen.getByPlaceholderText(/task/i),
      sliders: screen.getAllByRole("slider"),
      button: screen.getByRole("button"),
    };
  };

  it("should render text input", () => {
    const { input } = renderComponent();

    expect(input).toBeInTheDocument();
  });

  it("should render 2 sliders", () => {
    const { sliders } = renderComponent();
    expect(sliders.length).toBeGreaterThanOrEqual(2);

    sliders.forEach((slider) => {
      expect(slider).toBeInTheDocument();
    });
  });

  it("should render button for adding tasks", () => {
    const { button } = renderComponent();
    expect(button).toHaveTextContent(/add/i);
  });
});
