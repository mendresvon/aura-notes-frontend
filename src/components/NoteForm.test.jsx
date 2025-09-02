import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import NoteForm from "./NoteForm";

describe("NoteForm", () => {
  it("renders the form fields and buttons", () => {
    // Render the component
    render(<NoteForm onSave={() => {}} onCancel={() => {}} />);

    // Assert that the title input is on the screen
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();

    // Assert that the content textarea is on the screen
    expect(screen.getByLabelText(/content/i)).toBeInTheDocument();

    // Assert that the "Save Note" button is on the screen
    expect(screen.getByRole("button", { name: /save note/i })).toBeInTheDocument();
  });
});
