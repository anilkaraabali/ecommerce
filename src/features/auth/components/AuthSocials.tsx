import { Button } from '@heroui/react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

interface AuthSocialsProps {
  onClick: (provider: 'apple' | 'email' | 'google') => void;
}

const AuthSocials: FC<AuthSocialsProps> = ({ onClick }) => {
  const t = useTranslations('Auth');

  return (
    <div className='flex w-full flex-col gap-2'>
      <Button
        fullWidth
        onPress={() => onClick('google')}
        size='lg'
        startContent={
          <Image alt='' height={24} src='/icons/google.svg' width={24} />
        }
        variant='faded'
      >
        {t('social.google')}
      </Button>
      <Button
        fullWidth
        onPress={() => onClick('apple')}
        size='lg'
        startContent={
          <Image alt='' height={24} src='/icons/apple.svg' width={24} />
        }
        variant='faded'
      >
        {t('social.apple')}
      </Button>
      <Button
        fullWidth
        onPress={() => onClick('email')}
        size='lg'
        startContent={
          <Image alt='' height={24} src='/icons/email.svg' width={24} />
        }
        variant='faded'
      >
        {t('social.email')}
      </Button>
    </div>
  );
};

export { AuthSocials };
