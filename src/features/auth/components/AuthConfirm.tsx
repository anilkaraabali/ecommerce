import { createComponentClient } from '@/utils/supabase';
import { Alert, Button, Link } from '@heroui/react';
import { useTranslations } from 'next-intl';
import { FC, useEffect, useState } from 'react';
import { LiaArrowLeftSolid } from 'react-icons/lia';
import { useCountdown } from 'usehooks-ts';

interface AuthConfirmProps {
  email: string;
  onBack: () => void;
}

const AuthConfirm: FC<AuthConfirmProps> = ({ email, onBack }) => {
  const t = useTranslations('Auth');

  const [count, { resetCountdown, startCountdown }] = useCountdown({
    countStart: 120,
  });

  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const supabase = createComponentClient();

  const resendOtp = async () => {
    resetCountdown();
    startCountdown();

    try {
      const { error } = await supabase.auth.signInWithOtp({ email });

      if (error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(null);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error resending OTP:', error);
    }
  };

  useEffect(() => {
    startCountdown();
  }, [startCountdown]);

  return (
    <>
      <Button
        isIconOnly
        onPress={onBack}
        radius='full'
        size='sm'
        variant='faded'
      >
        <LiaArrowLeftSolid />
      </Button>
      <h1 className='text-center text-4xl font-bold'>{t('confirm.title')}</h1>
      <p className='text-default-500'>{t('confirm.description')}</p>
      {!!errorMessage && <Alert color='danger' title={errorMessage} />}
      <div className='mt-4 flex items-center gap-1'>
        <p className='w-[200px] text-xs'>
          {t('confirm.resendIn', { time: count })}
        </p>
        <Link
          className='text-xs'
          isDisabled={count !== 0}
          onPress={resendOtp}
          size='sm'
          underline='always'
        >
          {t('confirm.resend')}
        </Link>
      </div>
    </>
  );
};

export { AuthConfirm };
