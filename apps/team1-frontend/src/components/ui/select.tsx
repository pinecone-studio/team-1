"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type SelectItemData = { value: string; label: string }

type SelectContextValue = {
  value?: string
  onValueChange?: (value: string) => void
  setItems: (items: SelectItemData[]) => void
  triggerClassName?: string
  setTriggerClassName: (className?: string) => void
}

const SelectContext = React.createContext<SelectContextValue | null>(null)

export function Select({
  value,
  onValueChange,
  children,
}: {
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
}) {
  const [items, setItems] = React.useState<SelectItemData[]>([])
  const [triggerClassName, setTriggerClassName] = React.useState<string | undefined>(undefined)

  const ctxValue = React.useMemo(
    () => ({ value, onValueChange, setItems, triggerClassName, setTriggerClassName }),
    [value, onValueChange, triggerClassName]
  )

  return (
    <SelectContext.Provider
      value={ctxValue}
    >
      <div className="relative">
        <select
          className={cn(
            "h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
            triggerClassName
          )}
          value={value}
          onChange={(event) => onValueChange?.(event.target.value)}
        >
          {items.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        {children}
      </div>
    </SelectContext.Provider>
  )
}

export function SelectTrigger({ className, children }: React.HTMLAttributes<HTMLDivElement>) {
  const ctx = React.useContext(SelectContext)
  React.useEffect(() => {
    if (!ctx) return
    ctx.setTriggerClassName((prev) => (prev === className ? prev : className))
  }, [className, ctx])

  return <div className="hidden">{children}</div>
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  return placeholder ? <span className="sr-only">{placeholder}</span> : null
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  const ctx = React.useContext(SelectContext)

  React.useEffect(() => {
    if (!ctx) return
    const items = collectItems(children)
    if (!items.length) return
    ctx.setItems((prev) => (shallowEqualItems(prev, items) ? prev : items))
  }, [children, ctx])

  return null
}

export function SelectItem({ value, children }: { value: string; children: React.ReactNode }) {
  return <div data-value={value}>{children}</div>
}

function collectItems(children: React.ReactNode): SelectItemData[] {
  const items: SelectItemData[] = []
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return
    const props = child.props as { value?: string; children?: React.ReactNode }
    if (typeof props.value === "string") {
      items.push({ value: props.value, label: String(props.children ?? props.value) })
    } else if (props.children) {
      items.push(...collectItems(props.children))
    }
  })
  return items
}

function shallowEqualItems(a: SelectItemData[], b: SelectItemData[]) {
  if (a === b) return true
  if (a.length !== b.length) return false
  for (let i = 0; i < a.length; i += 1) {
    if (a[i].value !== b[i].value || a[i].label !== b[i].label) return false
  }
  return true
}
