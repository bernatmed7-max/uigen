import { test, expect, afterEach } from "vitest";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { PreviewPanel } from "../PreviewPanel";

afterEach(() => {
  cleanup();
});

test("renders Preview tab as active by default", () => {
  render(<PreviewPanel />);

  const previewButton = screen.getByRole("button", { name: "Preview" });
  const codeButton = screen.getByRole("button", { name: "Code" });

  expect(previewButton.className).toContain("bg-white");
  expect(codeButton.className).not.toContain("bg-white");
});

test("shows preview content by default", () => {
  render(<PreviewPanel preview={<div>My Component</div>} />);

  expect(screen.getByTestId("preview-content")).toBeDefined();
  expect(screen.getByText("My Component")).toBeDefined();
});

test("clicking Code tab switches to code view", () => {
  render(<PreviewPanel code="const x = 1;" />);

  fireEvent.click(screen.getByRole("button", { name: "Code" }));

  expect(screen.getByTestId("code-content")).toBeDefined();
  expect(screen.getByText("const x = 1;")).toBeDefined();
});

test("clicking Preview tab switches back to preview view", () => {
  render(<PreviewPanel preview={<div>My Component</div>} code="const x = 1;" />);

  fireEvent.click(screen.getByRole("button", { name: "Code" }));
  expect(screen.queryByTestId("preview-content")).toBeNull();

  fireEvent.click(screen.getByRole("button", { name: "Preview" }));
  expect(screen.getByTestId("preview-content")).toBeDefined();
});

test("Code button becomes active after clicking it", () => {
  render(<PreviewPanel />);

  fireEvent.click(screen.getByRole("button", { name: "Code" }));

  const codeButton = screen.getByRole("button", { name: "Code" });
  const previewButton = screen.getByRole("button", { name: "Preview" });

  expect(codeButton.className).toContain("bg-white");
  expect(previewButton.className).not.toContain("bg-white");
});

test("shows fallback message when no preview is provided", () => {
  render(<PreviewPanel />);

  expect(screen.getByText("No preview available")).toBeDefined();
});

test("shows fallback code when no code is provided", () => {
  render(<PreviewPanel />);

  fireEvent.click(screen.getByRole("button", { name: "Code" }));

  expect(screen.getByText("// No code generated yet")).toBeDefined();
});
