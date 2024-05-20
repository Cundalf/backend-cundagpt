import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const prosConsDiscusserUseCase = async (
  openai: OpenAI,
  { prompt }: Options,
) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
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

  console.log('Tokens utilizados:', response.usage?.total_tokens);
  console.log('Razón de finalización:', response.choices[0].finish_reason);
  return response.choices[0].message;
};
