import { createComponentClient } from '@/utils/supabase';
import { Button } from '@heroui/react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { AbstractIntlMessages, useTranslations } from 'next-intl';

import { useAuth } from '../../providers/auth-provider';

interface AccountPageProps {
  messages: AbstractIntlMessages;
}

const AccountPage: NextPage<AccountPageProps> = () => {
  const t = useTranslations('Account');
  const router = useRouter();
  const { user } = useAuth();

  const supabase = createComponentClient();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Error signing out:', err);

      throw err;
    }
  };

  return (
    <div className='pt-8'>
      <div className='container flex flex-col items-start gap-4'>
        <h1>{t('welcome.title', { name: user?.email })}</h1>
        <Button color='danger' onPress={handleSignOut} variant='flat'>
          {t('signOut.cta')}
        </Button>
      </div>
    </div>
  );
};

export type { AccountPageProps };
export default AccountPage;
