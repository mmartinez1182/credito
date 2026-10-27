export type QuizAnswers = Record<string, number>; // option index per question; 0 = most prepared

export const quizQuestions = [
  { id: "pago", q: "¿Ya sabes cuánto puedes pagar al mes?", options: ["Sí", "Más o menos", "No"] },
  { id: "enganche", q: "¿Tienes contemplado un enganche?", options: ["Sí", "Aún no"] },
  { id: "auto", q: "¿Ya sabes qué auto buscas?", options: ["Sí", "Tengo algunas opciones", "Aún no"] },
  { id: "compara", q: "¿Ya comparaste opciones de CRÉDITO?", options: ["Sí", "No"] },
];

export function quizScore(answers: QuizAnswers): number {
  return quizQuestions.reduce((sum, item) => {
    const idx = answers[item.id];
    if (idx === undefined) return sum;
    const max = item.options.length - 1;
    return sum + (max - idx) / max;
  }, 0);
}

export function quizResult(answers: QuizAnswers) {
  const score = quizScore(answers);
  if (score >= 3)
    return {
      title: "Vas por buen camino.",
      text: "Antes de contactar una agencia, revisa CAT, tasa, plazo y costo total.",
    };
  if (score >= 1.5)
    return {
      title: "Ya tienes una base.",
      text: "Define tu pago mensual y tu enganche antes de preguntar por opciones de CRÉDITO.",
    };
  return {
    title: "Empieza por lo básico.",
    text: "Calcula cuánto puedes pagar al mes y explora autos para darte una idea de precios.",
  };
}
