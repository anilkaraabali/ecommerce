import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
} from '@heroui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

interface AuthUnlockFeaturesModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

const AuthUnlockFeaturesModal: FC<AuthUnlockFeaturesModalProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const t = useTranslations();

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              <Image
                alt='Illustration representing the sign-up process.'
                height={276}
                src='/illustrations/login.webp'
                width={512}
              />
              <h2 className='mb-4 text-center text-base'>
                {t('Common.unlockFeatureModal.description')}
              </h2>
              <ul className='flex list-disc flex-col gap-2 pl-6'>
                <li
                  dangerouslySetInnerHTML={{
                    __html: t.raw('Common.unlockFeatureModal.saveFavorites'),
                  }}
                />
                <li
                  dangerouslySetInnerHTML={{
                    __html: t.raw(
                      'Common.unlockFeatureModal.fastOrderTracking'
                    ),
                  }}
                />
                <li
                  dangerouslySetInnerHTML={{
                    __html: t.raw(
                      'Common.unlockFeatureModal.exclusiveDiscounts'
                    ),
                  }}
                />
              </ul>
            </ModalBody>
            <ModalFooter>
              <Button
                color='primary'
                data-testid='auth-features-modal-cancel-button'
                onPress={onClose}
                variant='light'
              >
                {t('Common.cta.noThanks')}
              </Button>
              <Button
                as={NextLink}
                color='primary'
                data-testid='auth-features-modal-sign-in-link'
                href='/inbox'
              >
                {t('Common.cta.signIn')}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export type { AuthUnlockFeaturesModalProps };
export { AuthUnlockFeaturesModal };
