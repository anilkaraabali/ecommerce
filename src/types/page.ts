import { User } from '@supabase/supabase-js';
import { AbstractIntlMessages } from 'next-intl';

interface PageProps {
  messages: AbstractIntlMessages;
  user: User | null;
}

export type { PageProps };
