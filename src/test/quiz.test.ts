import { describe, expect, it } from "vitest";
import { quizResult } from "@/lib/quiz";

describe("credit quiz", () => {
  it("all prepared answers give the 'buen camino' result", () => {
    expect(quizResult({ pago: 0, enganche: 0, auto: 0, compara: 0 }).title).toBe("Vas por buen camino.");
  });
  it("all unprepared answers give the basic result", () => {
    expect(quizResult({ pago: 2, enganche: 1, auto: 2, compara: 1 }).title).toBe("Empieza por lo básico.");
  });
});
