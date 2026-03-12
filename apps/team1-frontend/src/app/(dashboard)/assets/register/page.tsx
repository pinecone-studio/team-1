'use client';

import { useMemo, useState } from 'react';
import { Download, Filter, Plus, QrCode, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { jsPDF } from 'jspdf';
import QRCode from 'qrcode';

export default function RegisterAssetPage() {
  const [categoryCode, setCategoryCode] = useState('');
  const [qrCount, setQrCount] = useState(1);
  const [employeeName, setEmployeeName] = useState('');
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);
  const [batches, setBatches] = useState<
    Array<{
      id: string;
      category: string;
      qrCount: number;
      createdAt: string;
      pairs: Array<{ qr: string }>;
    }>
  >([]);

  const sanitizedCategory = categoryCode.trim().toUpperCase();

  const createUniqueId = (prefix: string) => {
    const uid =
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    return `${prefix}-${uid}`.toUpperCase();
  };

  const buildPairs = (count: number, category: string) => {
    const nextPairs: Array<{ qr: string }> = [];
    const categoryCode = category.trim().toUpperCase();

    for (let i = 0; i < count; i += 1) {
      nextPairs.push({
        qr: `${categoryCode}-${new Date().getFullYear()}-${String(i + 1).padStart(3, '0')}`,
      });
    }

    return nextPairs;
  };

  const handleAdd = () => {
    const nextPairs = buildPairs(qrCount, sanitizedCategory);
    setBatches((prev) => [
      ...prev,
      {
        id: createUniqueId('BATCH'),
        category: sanitizedCategory,
        qrCount,
        createdAt: new Date().toISOString(),
        pairs: nextPairs,
      },
    ]);
    setCategoryCode('');
    setQrCount(1);
  };

  const canPrint = useMemo(
    () => qrCount > 0 && sanitizedCategory.length > 0,
    [qrCount, sanitizedCategory],
  );

  const isEmailValid =
    employeeEmail.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employeeEmail.trim());
  const canSendESign =
    canPrint && employeeName.trim().length > 0 && isEmailValid;

  const latestBatch = batches[batches.length - 1];
  const previewPairs = latestBatch?.pairs.slice(0, 3) ?? [];
  const categoryInitials = (sanitizedCategory || latestBatch?.category || 'QR')
    .slice(0, 2)
    .toUpperCase();
  const dialogPreview = canPrint
    ? buildPairs(Math.min(qrCount, 1), sanitizedCategory)[0]
    : null;

  const handleDownloadPdf = async () => {
    if (batches.length === 0) {
      return;
    }

    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    let cursorY = 16;
    const leftMargin = 14;
    const sectionGap = 10;
    const qrSize = 18;
    const rowHeight = 22;

    const drawSectionTitle = (title: string) => {
      doc.setFontSize(12);
      doc.text(title, leftMargin, cursorY);
      cursorY += 6;
    };

    const ensureSpace = (height: number) => {
      if (cursorY + height > pageHeight - 14) {
        doc.addPage();
        cursorY = 16;
      }
    };

    drawSectionTitle('QR code жагсаалт');
    for (const batch of batches) {
      ensureSpace(10);
      doc.setFontSize(9);
      doc.text(
        `Category: ${batch.category} • QR: ${batch.qrCount}`,
        leftMargin,
        cursorY,
      );
      cursorY += 6;

      for (const pair of batch.pairs) {
        ensureSpace(rowHeight);
        const dataUrl = await QRCode.toDataURL(pair.qr, {
          margin: 1,
          width: 160,
        });
        doc.addImage(dataUrl, 'PNG', leftMargin, cursorY, qrSize, qrSize);
        doc.setFontSize(9);
        doc.text(pair.qr, leftMargin + qrSize + 4, cursorY + 6);
        cursorY += rowHeight;
      }

      cursorY += sectionGap;
    }

    doc.save('asset-codes.pdf');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Эд хөрөнгийн бүртгэл
          </h1>
          <p className="text-muted-foreground">
            Бүртгэлийн багц үүсгэж, QR кодыг бэлтгэнэ.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="h-11 gap-2">
            <Filter className="h-4 w-4" />
            Шүүлтүүр
          </Button>
          <Button className="h-11 gap-2" onClick={() => setShowRegisterDialog(true)}>
            <Plus className="h-4 w-4" />
            Шинэ бүртгэл
          </Button>
        </div>
      </div>

      <Dialog open={showRegisterDialog} onOpenChange={setShowRegisterDialog}>
        <DialogContent className="sm:max-w-[640px]">
          <DialogHeader>
            <DialogTitle>Шинэ бүртгэл үүсгэх</DialogTitle>
            <DialogDescription>
              Эд хөрөнгийн ангилал сонгож, QR багц үүсгэнэ.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5">
            <div className="space-y-3">
              <p className="text-sm font-semibold text-foreground">
                Ангилал сонгох
              </p>
              <Select
                value={categoryCode}
                onValueChange={(value) => setCategoryCode(value)}
              >
                <SelectTrigger className="h-11 bg-background">
                  <SelectValue placeholder="Category сонгох" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="WIN-LAP">Windows Laptop</SelectItem>
                  <SelectItem value="MON">Monitor / Display</SelectItem>
                  <SelectItem value="TV">Television</SelectItem>
                  <SelectItem value="MOB">Mobile Phone</SelectItem>
                  <SelectItem value="PER">Peripherals</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-foreground">
                QR тоо
              </p>
              <Input
                type="number"
                min={1}
                max={50}
                value={qrCount}
                onChange={(event) =>
                  setQrCount(Math.max(1, Number(event.target.value || 1)))
                }
                className="h-11"
              />
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-foreground">
                Ажилтны мэдээлэл
              </p>
              <Input
                placeholder="Ажилтны нэр"
                value={employeeName}
                onChange={(event) => setEmployeeName(event.target.value)}
                className="h-11"
              />
              <Input
                placeholder="Email хаяг"
                type="email"
                value={employeeEmail}
                onChange={(event) => setEmployeeEmail(event.target.value)}
                className="h-11"
              />
              {!isEmailValid && employeeEmail.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  Имэйл хаяг зөв эсэхийг шалгана уу.
                </p>
              )}
            </div>

            {employeeName.trim().length > 0 && isEmailValid && (
              <div className="rounded-2xl border border-border bg-muted/20 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <QrCode className="h-4 w-4" />
                  Бүртгэлийн preview
                </div>
                <div className="mt-3 space-y-2 text-sm">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Ажилтан:</span>
                    <span className="text-foreground font-medium">
                      {employeeName}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Email:</span>
                    <span className="text-foreground font-medium">
                      {employeeEmail}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Ангилал:</span>
                    <span className="text-foreground font-medium">
                      {sanitizedCategory || '—'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>QR тоо:</span>
                    <span className="text-foreground font-medium">{qrCount}</span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Жишээ код:</span>
                    <span className="text-foreground font-mono">
                      {dialogPreview?.qr ?? '—'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setShowRegisterDialog(false)}
            >
              Болих
            </Button>
            <Button
              onClick={() => {
                if (!canSendESign) {
                  return;
                }
                const requestId = createUniqueId('ESIGN');
                const esignParams = new URLSearchParams({
                  name: employeeName,
                  email: employeeEmail,
                  category: sanitizedCategory,
                  qrCount: String(qrCount),
                  sample: dialogPreview?.qr ?? '',
                });
                const esignLink = `${window.location.origin}/assets/esign/${requestId}?${esignParams.toString()}`;
                handleAdd();
                const subject = encodeURIComponent('E-signature хүсэлт');
                const body = encodeURIComponent(
                  `Сайн байна уу ${employeeName},\n\n` +
                    `Эд хөрөнгийн бүртгэлийн QR багц үүсгэлээ.\n` +
                    `Ангилал: ${sanitizedCategory}\n` +
                    `QR тоо: ${qrCount}\n` +
                    `Жишээ QR: ${dialogPreview?.qr ?? '-'}\n\n` +
                    `Та цахим гарын үсгээ баталгаажуулна уу:\n${esignLink}`,
                );
                window.location.href = `mailto:${employeeEmail}?subject=${subject}&body=${body}`;
                setShowRegisterDialog(false);
              }}
              disabled={!canSendESign}
            >
              E-signed рүү илгээх
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-border">
          <CardContent className="flex items-center justify-between gap-4 p-5">
            <div>
              <p className="text-sm text-muted-foreground">Нийт багц</p>
              <p className="text-2xl font-semibold text-foreground">
                {batches.length}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
              <QrCode className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="flex items-center justify-between gap-4 p-5">
            <div>
              <p className="text-sm text-muted-foreground">Нийт QR</p>
              <p className="text-2xl font-semibold text-foreground">
                {batches.reduce((sum, batch) => sum + batch.qrCount, 0)}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
              <Download className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardContent className="flex items-center justify-between gap-4 p-5">
            <div>
              <p className="text-sm text-muted-foreground">Сүүлийн ангилал</p>
              <p className="text-lg font-semibold text-foreground">
                {batches.length > 0 ? batches[batches.length - 1].category : '—'}
              </p>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground">
              <Plus className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
        <Card className="border-border">
          <CardHeader className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <CardTitle>Багцын жагсаалт</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Бүртгэлийн QR багцуудын мэдээлэл.
                </p>
              </div>
              <Button
                variant="outline"
                className="h-10 gap-2"
                onClick={handleDownloadPdf}
                disabled={batches.length === 0}
              >
                <Download className="h-4 w-4" />
                PDF татах
              </Button>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:max-w-[320px]">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Багцын кодоор хайх"
                  className="h-10 pl-9"
                />
              </div>
              <Button variant="outline" className="h-10 gap-2">
                <Filter className="h-4 w-4" />
                Төлөв
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">
                    Багц ID
                  </TableHead>
                  <TableHead className="text-muted-foreground">
                    Ангилал
                  </TableHead>
                  <TableHead className="text-muted-foreground">
                    QR тоо
                  </TableHead>
                  <TableHead className="text-muted-foreground">
                    Огноо
                  </TableHead>
                  <TableHead className="text-muted-foreground">
                    Төлөв
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {batches.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="py-10 text-center text-sm text-muted-foreground"
                    >
                      Одоогоор бүртгэлийн багц алга байна.
                    </TableCell>
                  </TableRow>
                ) : (
                  batches.map((batch) => {
                    const status =
                      batch.qrCount >= 10
                        ? {
                            label: 'Хэвлэхэд бэлэн',
                            className:
                              'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
                          }
                        : batch.qrCount >= 5
                          ? {
                              label: 'Шалгаж буй',
                              className:
                                'bg-amber-500/10 text-amber-600 border-amber-500/20',
                            }
                          : {
                              label: 'Бэлтгэсэн',
                              className:
                                'bg-primary/10 text-primary border-primary/20',
                            };

                    return (
                      <TableRow key={batch.id} className="border-border">
                        <TableCell className="font-mono text-sm text-muted-foreground">
                          {batch.id.slice(0, 8).toUpperCase()}
                        </TableCell>
                        <TableCell className="font-medium text-foreground">
                          {batch.category}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {batch.qrCount}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {new Date(batch.createdAt).toLocaleDateString('mn-MN')}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={status.className}>
                            {status.label}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Эд хөрөнгийн мэдээлэл</CardTitle>
              <p className="text-sm text-muted-foreground">
                Ангиллаа сонгоод QR багц үүсгэнэ.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl border border-border bg-background p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
                    {categoryInitials}
                  </div>
                  <div>
                    <p className="text-base font-semibold text-foreground">
                      Бүртгэлийн багц
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {sanitizedCategory.length > 0
                        ? `${sanitizedCategory} ангилал`
                        : 'Ангилал сонгоогүй'}
                    </p>
                  </div>
                </div>

                <div className="my-4 h-px bg-border/70" />

                <p className="text-sm font-semibold text-foreground mb-3">
                  QR тохиргоо
                </p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/20 p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <QrCode className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium text-foreground">
                        Category code
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Формат: CODE-YEAR-001
                      </p>
                      <Select
                        value={categoryCode}
                        onValueChange={(value) => setCategoryCode(value)}
                      >
                        <SelectTrigger className="h-10 bg-background">
                          <SelectValue placeholder="Category сонгох" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="WIN-LAP">Windows Laptop</SelectItem>
                          <SelectItem value="MON">Monitor / Display</SelectItem>
                          <SelectItem value="TV">Television</SelectItem>
                          <SelectItem value="MOB">Mobile Phone</SelectItem>
                          <SelectItem value="PER">Peripherals</SelectItem>
                        </SelectContent>
                      </Select>
                      {categoryCode && (
                        <p className="text-xs text-muted-foreground">
                          Сонгосон код: {categoryCode.toUpperCase()}
                        </p>
                      )}
                      {sanitizedCategory.length === 0 && (
                        <p className="text-xs text-muted-foreground">
                          Category code оруулна уу.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/20 p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                      <Plus className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium text-foreground">
                        QR code гаргах
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Хэдэн QR код гаргах вэ?
                      </p>
                      <Input
                        type="number"
                        min={1}
                        max={50}
                        value={qrCount}
                        onChange={(event) =>
                          setQrCount(Math.max(1, Number(event.target.value || 1)))
                        }
                        className="h-10"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button
                onClick={handleAdd}
                className="h-11 w-full text-base"
                disabled={!canPrint}
              >
                Багц үүсгэх
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>QR урьдчилсан харагдац</CardTitle>
              <p className="text-sm text-muted-foreground">
                Сүүлд үүсгэсэн QR кодуудын урьдчилсан харагдац.
              </p>
            </CardHeader>
            <CardContent>
              {batches.length === 0 ? (
                <div className="rounded-lg border border-dashed border-border bg-muted/30 p-6 text-center text-sm text-muted-foreground">
                  QR багц үүсгэсний дараа preview харагдана.
                </div>
              ) : (
                <div className="rounded-2xl border border-border bg-background p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
                      {categoryInitials}
                    </div>
                    <div>
                      <p className="text-base font-semibold text-foreground">
                        {latestBatch?.category ?? 'Сүүлчийн багц'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {latestBatch?.qrCount ?? 0} QR код •{' '}
                        {latestBatch
                          ? new Date(latestBatch.createdAt).toLocaleDateString(
                              'mn-MN',
                            )
                          : '—'}
                      </p>
                    </div>
                  </div>

                  <div className="my-4 h-px bg-border/70" />

                  <p className="text-sm font-semibold text-foreground mb-3">
                    Миний үүсгэсэн QR
                  </p>

                  <div className="space-y-3">
                    {previewPairs.map((pair, index) => {
                      const showAction =
                        index === previewPairs.length - 1 &&
                        latestBatch?.pairs.length > 2;
                      const lastSegment = pair.qr.split('-').pop() ?? '';

                      return (
                        <div
                          key={pair.qr}
                          className="flex items-center gap-3 rounded-xl border border-border bg-muted/20 p-3"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                            <QrCode className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">
                              {pair.qr}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {latestBatch?.category} багц • #{lastSegment}
                            </p>
                          </div>
                          {showAction ? (
                            <Button
                              variant="outline"
                              className="h-8 px-3 text-xs"
                              onClick={handleDownloadPdf}
                            >
                              Хэвлэх
                            </Button>
                          ) : (
                            <Badge variant="outline" className="text-xs">
                              QR
                            </Badge>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {batches.length > 0 && (
                <Button
                  onClick={handleDownloadPdf}
                  variant="outline"
                  className="mt-4 h-10 w-full gap-2"
                >
                  <Download className="h-4 w-4" />
                  PDF хэлбэрээр авах
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
