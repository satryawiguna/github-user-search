import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { HeroUIProvider } from "@heroui/react";
import { ErrorMessage } from "../../src/components/ErrorMessage";

const renderWithProvider = (component: React.ReactElement) => {
  return render(<HeroUIProvider>{component}</HeroUIProvider>);
};

describe("ErrorMessage", () => {
  it("should render error message with retry button", () => {
    const onRetry = vi.fn();
    renderWithProvider(
      <ErrorMessage message="Network error occurred" onRetry={onRetry} />
    );

    expect(screen.getByText("Network error occurred")).toBeInTheDocument();
    expect(screen.getByText("Try Again")).toBeInTheDocument();
  });

  it("should call onRetry when retry button is clicked", () => {
    const onRetry = vi.fn();
    renderWithProvider(<ErrorMessage message="Error" onRetry={onRetry} />);

    const retryButton = screen.getByText("Try Again");
    fireEvent.click(retryButton);

    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it("should render without retry button when onRetry is not provided", () => {
    renderWithProvider(<ErrorMessage message="Error occurred" />);

    expect(screen.getByText("Error occurred")).toBeInTheDocument();
    expect(screen.queryByText("Try Again")).not.toBeInTheDocument();
  });
});
