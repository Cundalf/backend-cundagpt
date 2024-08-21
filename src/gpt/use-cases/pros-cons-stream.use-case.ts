import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const prosConsStreamUseCase = async (
  openai: OpenAI,
  { prompt }: Options,
) => {
  return await openai.chat.completions.create({
    stream: true,
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `
                Se te dará una pregunta y tu tarea es dar una respuesta con pros y contras.
                La respuesta debe de ser en formato markdown.
                Los pros y contras deben de estar en una lista.
                Debes responder en el mismo dialecto con el cual fue hecha la pregunta.
            `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.8,
    max_tokens: 700,
  });
};
