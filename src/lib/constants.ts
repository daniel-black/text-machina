export const TURBO = 'gpt-3.5-turbo';
export const DAVINCI = 'text-davinci-003';
export const CODE_DAVINCI = 'code-davinci-002';

export const MAX_TOKENS = 500;
export const TEMPERATURE = 0.0;

export const COMPLETIONS_URL = 'https://api.openai.com/v1/chat/completions';

export const SYSTEM_MESSAGE = {
  role: 'system',
  content: 'You are NeoGPT. You have matrix-like knowledge of the world. Follow the user\'s instructions carefully.'
} as const;