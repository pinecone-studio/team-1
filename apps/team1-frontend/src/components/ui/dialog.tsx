"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type DialogContextValue = {
  open: boolean
  onOpenChange?: (open: boolean) => void
}

const DialogContext = React.createContext<DialogContextValue | null>(null)

export function Dialog({
  open = false,
  onOpenChange,
  children,
}: {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}) {
  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      {children}
    </DialogContext.Provider>
  )
}

export const DialogContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const ctx = React.useContext(DialogContext)
    if (!ctx?.open) return null

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          onClick={() => ctx.onOpenChange?.(false)}
        />
        <div
          ref={ref}
          className={cn(
            "relative z-10 w-full max-w-lg rounded-lg border border-border bg-card p-6 shadow-lg",
            className
          )}
          {...props}
        />
      </div>
    )
  }
)

DialogContent.displayName = "DialogContent"

export const DialogHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("space-y-2", className)} {...props} />
  )
)

DialogHeader.displayName = "DialogHeader"

export const DialogFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("mt-6 flex items-center justify-end gap-2", className)} {...props} />
  )
)

DialogFooter.displayName = "DialogFooter"

export const DialogTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
  )
)

DialogTitle.displayName = "DialogTitle"

export const DialogDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
)

DialogDescription.displayName = "DialogDescription"
