import { describe, expect, it } from "vitest";
import { getNextIdealWeek, toLocalIso } from "./week";

/** Noon-ish in Lincoln on the given calendar day (stable across DST). */
function lincolnDay(iso: string): Date {
  return new Date(`${iso}T18:00:00Z`);
}

describe("getNextIdealWeek", () => {
  it("returns the 2026 week before it starts", () => {
    expect(getNextIdealWeek(lincolnDay("2026-05-15"))).toEqual({
      startDate: "2026-05-30",
      endDate: "2026-06-06",
    });
  });

  it("returns the 2026 week while it is in progress", () => {
    expect(getNextIdealWeek(lincolnDay("2026-06-02"))).toEqual({
      startDate: "2026-05-30",
      endDate: "2026-06-06",
    });
  });

  it("returns the 2026 week on its last day", () => {
    expect(getNextIdealWeek(lincolnDay("2026-06-06"))).toEqual({
      startDate: "2026-05-30",
      endDate: "2026-06-06",
    });
  });

  it("skips to 2027 after the 2026 week ends", () => {
    expect(getNextIdealWeek(lincolnDay("2026-06-07"))).toEqual({
      startDate: "2027-05-29",
      endDate: "2027-06-05",
    });
  });

  it("skips runs of non-ideal years (2028–2030) to 2031", () => {
    expect(getNextIdealWeek(lincolnDay("2028-01-01"))).toEqual({
      startDate: "2031-05-31",
      endDate: "2031-06-07",
    });
  });

  it("uses the Lincoln calendar for today", () => {
    const now = lincolnDay("2026-06-07");
    expect(toLocalIso(now)).toBe("2026-06-07");
    expect(getNextIdealWeek(now).startDate).toBe("2027-05-29");
  });
});
