import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function NewAssignmentModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">+ Шинэ хуваарилалт</Button>
      </DialogTrigger>

  <DialogContent className="sm:max-w-md bg-white rounded-xl shadow-lg">
  <DialogHeader>
    <DialogTitle>Шинэ хуваарилалт үүсгэх</DialogTitle>
    <DialogDescription>
      Хөрөнгийг ажилтанд хуваарилж, цахим гарын үсгийн хүсэлт илгээх
    </DialogDescription>
  </DialogHeader>

  <div className="space-y-4 py-4">
    <div className="space-y-2">
      <Label>Ажилтан сонгох</Label>
      <Input placeholder="Email" />
    </div>

    <div className="space-y-2">
      <Label>Хөрөнгө сонгох</Label>
      <Input placeholder="Asset ID" />
    </div>

    <Button className="w-full">
      Баталгаажуулах хүсэлт илгээх
    </Button>
  </div>
</DialogContent>

    </Dialog>
  )
}