"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type DropdownContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
}

const DropdownContext = React.createContext<DropdownContextValue | null>(null)

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block">{children}</div>
    </DropdownContext.Provider>
  )
}

interface DropdownMenuTriggerProps {
  asChild?: boolean
  children: React.ReactElement
}

export function DropdownMenuTrigger({ asChild, children }: DropdownMenuTriggerProps) {
  const ctx = React.useContext(DropdownContext)

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<any>
    return React.cloneElement(child, {
      onClick: (event: React.MouseEvent) => {
        child.props?.onClick?.(event)
        ctx?.setOpen(!ctx.open)
      },
    })
  }

  return (
    <button type="button" onClick={() => ctx?.setOpen(!ctx.open)}>
      {children}
    </button>
  )
}

export const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { align?: "start" | "end" }
>(({ className, ...props }, ref) => {
  const ctx = React.useContext(DropdownContext)
  if (!ctx?.open) return null

  return (
    <div
      ref={ref}
      className={cn(
        "absolute right-0 z-50 mt-2 min-w-[10rem] rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md",
        className
      )}
      {...props}
    />
  )
})

DropdownMenuContent.displayName = "DropdownMenuContent"

export const DropdownMenuItem = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "flex w-full cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-muted",
        className
      )}
      {...props}
    />
  )
)

DropdownMenuItem.displayName = "DropdownMenuItem"

export const DropdownMenuLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("px-2 py-1.5 text-sm font-medium", className)} {...props} />
  )
)

DropdownMenuLabel.displayName = "DropdownMenuLabel"

export function DropdownMenuSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("my-1 h-px bg-border", className)} {...props} />
}
