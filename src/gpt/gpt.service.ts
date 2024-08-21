import { Injectable, NotFoundException } from '@nestjs/common';

import OpenAI from 'openai';

import {
  TranslateUseCase,
  audioToTextUseCase,
  orthographyCheckUseCase,
  prosConsDiscusserUseCase,
  prosConsStreamUseCase,
  textToAudioUseCase,
} from './use-cases';
import { OrthographyDto, TextToAudioDto, TranslateDto } from './dtos';
import { ProsConsDiscusserDto } from './dtos/pros-cons-discusser.dto';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class GptService {
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async orthographyCheck(orthographyDto: OrthographyDto) {
    return await orthographyCheckUseCase(this.openai, {
      prompt: orthographyDto.prompt,
    });
  }

  async prosConsDiscusser({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDiscusserUseCase(this.openai, { prompt });
  }

  async prosConsDiscusserStream({ prompt }: ProsConsDiscusserDto) {
    return await prosConsStreamUseCase(this.openai, { prompt });
  }

  async translateText({ prompt, lang }: TranslateDto) {
    return await TranslateUseCase(this.openai, { prompt, lang });
  }

  async textToAudio({ prompt, voice }: TextToAudioDto) {
    return await textToAudioUseCase(this.openai, { prompt, voice });
  }

  async textToAudioGetter(filename: string) {
    const filePath = path.resolve(
      __dirname,
      '../../generated/audios/',
      `${filename}.mp3`,
    );

    const wasFound = fs.existsSync(filePath);

    if (!wasFound) throw new NotFoundException(`File ${filename} not found`);

    return filePath;
  }

  async audioToText(audioFile: Express.Multer.File, prompt?: string) {
    return await audioToTextUseCase(this.openai, { audioFile, prompt });
  }
}
