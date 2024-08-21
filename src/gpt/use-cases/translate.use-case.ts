import OpenAI from 'openai';

interface Options {
  prompt: string;
  lang: string;
}

export const TranslateUseCase = async (
  openai: OpenAI,
  { prompt, lang }: Options,
) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `
                Se te brindara un texto en cualquier idioma y debes traducirlo al idioma ${lang}.
            `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.2,
    max_tokens: 350,
  });

  console.log('Tokens utilizados:', response.usage?.total_tokens);
  console.log('Razón de finalización:', response.choices[0].finish_reason);
  return { message: response.choices[0].message.content };
};
