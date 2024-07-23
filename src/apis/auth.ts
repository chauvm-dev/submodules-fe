import { client } from '@/libs/axios';

export const authTelegramService = async (
  init_data: string,
  ref_code: string,
) => {
  const {
    data: { data },
  } = await client.post('auth/auth/telegram', {
    init_data,
    ref_code,
  });

  return data;
};
