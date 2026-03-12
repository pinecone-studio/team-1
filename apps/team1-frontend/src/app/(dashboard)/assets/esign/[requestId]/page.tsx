'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type PageProps = {
  params: {
    requestId: string;
  };
};

export default function ESignRequestPage({ params }: PageProps) {
  const searchParams = useSearchParams();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [signedAt, setSignedAt] = useState<string | null>(null);

  const details = useMemo(
    () => ({
      name: searchParams.get('name') ?? '—',
      email: searchParams.get('email') ?? '—',
      category: searchParams.get('category') ?? '—',
      qrCount: searchParams.get('qrCount') ?? '—',
      sample: searchParams.get('sample') ?? '—',
    }),
    [searchParams],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      canvas.width = rect.width * ratio;
      canvas.height = 200 * ratio;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = '200px';
      const context = canvas.getContext('2d');
      if (context) {
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.scale(ratio, ratio);
        context.lineWidth = 2;
        context.lineCap = 'round';
        context.strokeStyle = '#0f172a';
      }
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const getPosition = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return { x: 0, y: 0 };
    }
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const handlePointerDown = (
    event: React.PointerEvent<HTMLCanvasElement>,
  ) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) {
      return;
    }
    const { x, y } = getPosition(event);
    context.beginPath();
    context.moveTo(x, y);
    setIsDrawing(true);
  };

  const handlePointerMove = (
    event: React.PointerEvent<HTMLCanvasElement>,
  ) => {
    if (!isDrawing) {
      return;
    }
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) {
      return;
    }
    const { x, y } = getPosition(event);
    context.lineTo(x, y);
    context.stroke();
    setHasSignature(true);
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) {
      return;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
    setSignedAt(null);
  };

  const handleSubmit = () => {
    if (!hasSignature) {
      return;
    }
    setSignedAt(new Date().toLocaleString('mn-MN'));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          E-sign баталгаажуулалт
        </h1>
        <p className="text-muted-foreground">
          Эд хөрөнгийн бүртгэлийн хүсэлтийг баталгаажуулна.
        </p>
      </div>

      <Card className="border-border">
        <CardHeader className="space-y-2">
          <CardTitle>Хүсэлтийн мэдээлэл</CardTitle>
          <p className="text-sm text-muted-foreground">
            Request ID: {params.requestId}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-xs text-muted-foreground">Ажилтан</p>
              <p className="text-sm font-medium text-foreground">
                {details.name}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm font-medium text-foreground">
                {details.email}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Ангилал</p>
              <p className="text-sm font-medium text-foreground">
                {details.category}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">QR тоо</p>
              <p className="text-sm font-medium text-foreground">
                {details.qrCount}
              </p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-xs text-muted-foreground">Жишээ QR</p>
              <p className="text-sm font-mono text-foreground">
                {details.sample}
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-muted/20 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-foreground">
                Гарын үсэг зурна уу
              </p>
              {signedAt ? (
                <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                  Баталгаажсан
                </Badge>
              ) : (
                <Badge variant="outline" className="text-xs">
                  Хүлээгдэж буй
                </Badge>
              )}
            </div>
            <div className="rounded-xl border border-dashed border-border bg-background p-2">
              <canvas
                ref={canvasRef}
                className="h-[200px] w-full touch-none"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
              />
            </div>
            {signedAt && (
              <p className="text-xs text-muted-foreground">
                Баталгаажуулсан огноо: {signedAt}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={handleClear}>
              Арилгах
            </Button>
            <Button onClick={handleSubmit} disabled={!hasSignature}>
              Баталгаажуулах
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
