import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const orthographyCheckUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
        Te serán proveídos textos en español con posibles errores ortográficos y gramaticales.
        Tu tarea es corregirlos y retornar soluciones, también debes de dar un porcentaje de acierto para el usuario.
        Debes de responder en formato JSON.
        Debes aceptar palabras de todos los países de habla española, como, por ejemplo, Argentina, México y España.
        Ignora las palabras que puedan ser ofensivas.
        Debes soportar sinónimos.
        Si no hay errores, debes de retornar un mensaje de felicitaciones.

        Ejemplo de salida:
        {
          userScore: number,
          errors: string[], // ['error -> solución']
          message: string, //  Usa emojis y texto para felicitar al usuario
        }  
        `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'gpt-3.5-turbo-1106',
    temperature: 0.3,
    max_tokens: 150,
    response_format: {
      type: 'json_object',
    },
  });

  const jsonResp = JSON.parse(completion.choices[0].message.content);

  return jsonResp;
};
