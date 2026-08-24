import { describe, it, expect, } from "vitest";
import { useState } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import JobDescriptionInput from "./JobDescriptionInput";
import { MAX_JOB_DESCRIPTION_LENGTH, JOB_DESCRIPTION_ERROR_MESSAGES } from "./jobDescriptionConstants";

const JOB_DeSCRIPTION_VALID_TEST_STRING = "We are looking for a software engineer with experience in React and TypeScript. The ideal candidate will have a strong understanding of front-end development, as well as experience with back-end technologies such as Node.js and Express. The candidate should also be familiar with database management systems such as MongoDB and SQL. Additionally, the candidate should have experience with version control systems such as Git and be comfortable working in an Agile development environment.";
const JOB_DESCRIPTION_MAX_LENGTH_STRING = "A".repeat(MAX_JOB_DESCRIPTION_LENGTH + 1);

describe("JobDescriptionInput", () => {
    it("should render job description heading", () => {
        // Arrange
            render(
                <JobDescriptionInput
                    value=""
                    onChange={() => {}}
                />
            )    
        // Assert
        expect(screen.getByRole("heading", { name: /job description/i})).toBeInTheDocument();
    });
    it("should render job description input field", () => {
        // Arrange
        render(
            <JobDescriptionInput 
            value="" 
            onChange={() => {}} />
        );
        // Assert
        expect(
            screen.getByRole("textbox", { name: /job description/i})
        ).toBeInTheDocument();
    });
    it("should display the intial character count", () => {
        // Arrange
        render(
            <JobDescriptionInput 
                value="" 
                onChange={() => {}} 
            />
        );
        // Assert
        expect(
            screen.getByText(`0 / ${MAX_JOB_DESCRIPTION_LENGTH}`)
        ).toBeInTheDocument();
    });
    it("should update the character count when user types in the input field", async () => {
        // Arrange
        const user = userEvent.setup();
        const TestWrapper = () => {
            const [value, setValue] = useState("");

            return (
                <JobDescriptionInput
                    value={value}
                    onChange={setValue}
                />
            );
        };
        render(<TestWrapper />);
        const textbox = screen.getByRole("textbox", {name: /job description/i});
        // Act
        await user.click(textbox);
        await user.paste(JOB_DeSCRIPTION_VALID_TEST_STRING);
        // Assert
        expect(
            screen.getByText(`${JOB_DeSCRIPTION_VALID_TEST_STRING.length} / ${MAX_JOB_DESCRIPTION_LENGTH}`)
        ).toBeInTheDocument();
    });
    it("should not allow more than the maximum job description length", async () => {
        // Arrange
        const user = userEvent.setup();
        const TestWrapper = () => {
            const [value, setValue] = useState("");

            return (
                <JobDescriptionInput
                    value={value}
                    onChange={setValue}
                />
            );
        };

        render(<TestWrapper />);

        const textbox = screen.getByRole("textbox", {
            name: /Job Description/i,
        });

        // Act
        await user.click(textbox);
        await user.paste(JOB_DESCRIPTION_MAX_LENGTH_STRING);

        // Assert
        expect(
            screen.getByText(
                `${MAX_JOB_DESCRIPTION_LENGTH} / ${MAX_JOB_DESCRIPTION_LENGTH}`
            )
        ).toBeInTheDocument();
    });
    it("should display an error when an empty job description is blurred", async () => {
        // Arrange
        const user = userEvent.setup();

        const TestWrapper = () => {
            const [value, setValue] = useState("");

            return (
                <JobDescriptionInput
                    value={value}
                    onChange={setValue}
                />
            );
        };

        render(<TestWrapper />);

        const textbox = screen.getByRole("textbox", {
            name: /Job Description/i,
        });

        // Act
        await user.click(textbox);
        await user.tab();

        // Assert
        expect(
            screen.getByText(JOB_DESCRIPTION_ERROR_MESSAGES.REQUIRED)
        ).toBeInTheDocument();
    });
    it("should clear the validation error when a valid job description is entered", async () => {
        // Arrange
        const user = userEvent.setup();

        const TestWrapper = () => {
            const [value, setValue] = useState("");

            return (
                <JobDescriptionInput
                    value={value}
                    onChange={setValue}
                />
            );
        };

        render(<TestWrapper />);

        const textbox = screen.getByRole("textbox", {
            name: /Job Description/i,
        });

        // Act 1 — trigger validation error
        await user.click(textbox);
        await user.tab();

        // Assert 1
        expect(
            screen.getByText(JOB_DESCRIPTION_ERROR_MESSAGES.REQUIRED)
        ).toBeInTheDocument();

        // Act 2 — enter valid job description
        await user.click(textbox);
        await user.type(textbox, "Senior React Developer");

        // Assert 2
        expect(
            screen.queryByText(JOB_DESCRIPTION_ERROR_MESSAGES.REQUIRED)
        ).not.toBeInTheDocument();
    });
});