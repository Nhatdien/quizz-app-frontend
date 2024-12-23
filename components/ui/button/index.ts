import { cva, type VariantProps } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow hover:bg-primary/90 font-bold',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 font-bold',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground font-bold',
        secondary:
          'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 font-bold',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline font-bold',
        success: 'bg-success text-white shadow-sm hover:bg-success/90 font-bold',
        warning: 'bg-warning text-warning-foreground shadow-sm hover:bg-warning/90 font-bold',
        danger: 'bg-danger text-danger-foreground shadow-sm hover:bg-danger/90',
        info: 'bg-info text-white shadow-sm hover:bg-info/90 font-bold',

      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
