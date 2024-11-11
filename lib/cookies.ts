import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

export async function getOrCreateUserId() {
  const cookieStore = await cookies();
  let userId =  cookieStore.get('userId')?.value;

  if (!userId) {
    userId = uuidv4();
     cookieStore.set('userId', userId, {
      path: '/', 
      httpOnly: true, 
      maxAge: 60 * 60 * 24 * 365, 
    });
  }

  return userId;
}
