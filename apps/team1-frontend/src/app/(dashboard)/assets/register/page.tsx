import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function RegisterAssetPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Эд хөрөнгө бүртгэх</h1>
        <p className="text-muted-foreground">Шинэ эд хөрөнгийн бүртгэл үүсгэнэ.</p>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
        <CardTitle>Эд хөрөнгийн мэдээлэл</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Input placeholder="Эд хөрөнгийн ID" />
          <Input placeholder="Серийн дугаар" />
          <Input placeholder="Ангилал" />
          <Input placeholder="Хариуцагч ажилтан" />
          <Input placeholder="Худалдан авалтын үнэ" />
          <Input placeholder="Худалдан авсан огноо" />
          <div className="md:col-span-2">
            <Textarea placeholder="Тэмдэглэл" />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <Button>Хадгалах</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
