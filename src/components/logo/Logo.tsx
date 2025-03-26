import NextLink from 'next/link';
import { useTranslations } from 'next-intl';
import { ComponentPropsWithRef, forwardRef } from 'react';

interface LogoProps extends ComponentPropsWithRef<'svg'> {
  showText?: boolean;
}

const Logo = forwardRef<SVGSVGElement, LogoProps>(
  ({ showText = true, ...props }, ref) => {
    const t = useTranslations('Common');

    return (
      <NextLink
        aria-label={t('homepage.ariaLabel')}
        className='flex items-center justify-start gap-2'
        color='foreground'
        href='/'
        title={t('homepage.title')}
      >
        <div className='flex size-[40px] flex-none items-center justify-center rounded-xl border border-default-200 bg-background'>
          <svg
            aria-label='Acme logo'
            className='size-4 fill-foreground'
            ref={ref}
            viewBox='0 0 32 28'
            xmlns='http://www.w3.org/2000/svg'
            {...props}
          >
            <path d='M21.5758 9.75769L16 0L0 28H11.6255L21.5758 9.75769Z' />
            <path d='M26.2381 17.9167L20.7382 28H32L26.2381 17.9167Z' />
          </svg>
        </div>
        {showText && <p className='font-bold uppercase text-inherit'>Acme</p>}
      </NextLink>
    );
  }
);

export type { LogoProps };
export { Logo };
