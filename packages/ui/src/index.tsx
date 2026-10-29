import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from './utils';

const buttonVariants = cva(
  'inline-flex min-h-11 items-center justify-center gap-3 whitespace-nowrap px-5 py-3 text-xs font-semibold uppercase tracking-[.14em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-gold text-navy hover:bg-white',
        outline: 'border border-gold text-white hover:bg-gold hover:text-navy',
        text: 'text-navy hover:text-royal',
      },
    },
    defaultVariants: { variant: 'primary' },
  },
);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot : 'button';
    return (
      <Component className={cn(buttonVariants({ variant }), className)} ref={ref} {...props} />
    );
  },
);

Button.displayName = 'Button';

export { buttonVariants, cn };
