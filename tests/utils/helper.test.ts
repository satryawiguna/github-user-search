import { describe, it, expect } from "vitest";
import {
  formatDate,
  formatNumber,
  truncateText,
  debounce,
} from "../../src/utils/helper";

describe("Helper Functions", () => {
  describe("formatDate", () => {
    it("should format a date string correctly", () => {
      const date = "2023-12-01T10:30:00Z";
      const formatted = formatDate(date);
      expect(formatted).toMatch(/Dec 1, 2023/);
    });

    it("should handle invalid date", () => {
      const formatted = formatDate("invalid-date");
      expect(formatted).toBe("Invalid Date");
    });
  });

  describe("formatNumber", () => {
    it("should format numbers with k suffix for thousands", () => {
      expect(formatNumber(1234)).toBe("1.2k");
      expect(formatNumber(1000)).toBe("1.0k");
    });

    it("should handle zero and small numbers without k suffix", () => {
      expect(formatNumber(0)).toBe("0");
      expect(formatNumber(42)).toBe("42");
      expect(formatNumber(999)).toBe("999");
    });
  });

  describe("truncateText", () => {
    it("should truncate text longer than maxLength", () => {
      const text = "This is a very long text that should be truncated";
      const truncated = truncateText(text, 20);
      expect(truncated).toBe("This is a very long ...");
    });

    it("should not truncate text shorter than maxLength", () => {
      const text = "Short text";
      const truncated = truncateText(text, 20);
      expect(truncated).toBe("Short text");
    });
  });

  describe("debounce", () => {
    it("should debounce function calls", async () => {
      let callCount = 0;
      const fn = () => callCount++;
      const debouncedFn = debounce(fn, 100);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      expect(callCount).toBe(0);

      await new Promise((resolve) => setTimeout(resolve, 150));
      expect(callCount).toBe(1);
    });
  });
});
