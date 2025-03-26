import { createComponentClient } from '@/utils/supabase';
import { Alert, Button, Form, Input } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { FC, useCallback, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { Controller, useForm } from 'react-hook-form';
import { LiaTimesSolid } from 'react-icons/lia';
import { ZodType, z } from 'zod';

import { AuthProvider } from './types';

type FormData = {
  email: string;
};

interface AuthEmailFormProps {
  onCancel: () => void;
  setEmail: (email: string) => void;
  setStep: (step: AuthProvider) => void;
}

const AuthEmailForm: FC<AuthEmailFormProps> = ({
  onCancel,
  setEmail,
  setStep,
}) => {
  const t = useTranslations();

  const { executeRecaptcha } = useGoogleReCaptcha();
  const supabase = createComponentClient();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const schema: ZodType<FormData> = z.object({
    email: z
      .string()
      .min(1, { message: t('Common.form.required') })
      .email(t('Common.form.email.errorMessage')),
  });

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(schema),
  });

  const verifyRecaptcha = useCallback(async () => {
    if (!executeRecaptcha) {
      // eslint-disable-next-line no-console
      console.info('Execute recaptcha not yet available');

      return;
    }

    return await executeRecaptcha('auth');
  }, [executeRecaptcha]);

  const handleFormSubmit = useCallback(
    async (formData: FormData) => {
      setIsLoading(true);

      try {
        const captchaToken = await verifyRecaptcha();

        if (!captchaToken) {
          setErrorMessage(t('Common.recaptcha.error'));
          setIsLoading(false);

          return;
        }

        const { error } = await supabase.auth.signInWithOtp({
          email: formData.email,
          options: {
            captchaToken,
          },
        });

        if (error) {
          setErrorMessage(error.message);
          setIsLoading(false);
        } else {
          setEmail(formData.email);
          setStep('confirm');
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error signing in with email:', err);
      } finally {
        setIsLoading(false);
      }
    },
    [supabase, verifyRecaptcha]
  );

  return (
    <>
      <Button
        isIconOnly
        onPress={onCancel}
        radius='full'
        size='sm'
        variant='bordered'
      >
        <LiaTimesSolid size={20} />
      </Button>
      <h1
        className='text-center text-4xl font-bold'
        dangerouslySetInnerHTML={{ __html: t.raw('Auth.email.title') }}
      />
      {!!errorMessage && <Alert color='danger' title={errorMessage} />}
      <Form
        className='gap-4 pb-4'
        onSubmit={handleSubmit(handleFormSubmit)}
        validationBehavior='aria'
      >
        <Controller
          control={control}
          name='email'
          render={({ field }) => (
            <Input
              {...field}
              errorMessage={errors.email?.message}
              isInvalid={!!errors.email?.message}
              isRequired
              placeholder={t('Common.form.email.placeholder')}
              size='lg'
              type='email'
              variant='faded'
            />
          )}
        />
        <Button
          color='primary'
          fullWidth
          isLoading={isLoading}
          size='lg'
          type='submit'
          variant='solid'
        >
          {t('Auth.email.cta')}
        </Button>
        <div
          className='mt-7 text-center text-xs text-default-400'
          dangerouslySetInnerHTML={{ __html: t.raw('Common.recaptcha.info') }}
        />
      </Form>
    </>
  );
};

export { AuthEmailForm };
