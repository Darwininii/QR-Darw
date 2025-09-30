"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import type QRCodeStyling from 'qr-code-styling';
import type { Options as QrOptions } from 'qr-code-styling';
import { useToast } from "@/hooks/use-toast"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ColorPicker } from './color-picker';
import { Palette, Shapes, Image as ImageIcon, ShieldCheck, Download, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

type DotType = QrOptions['dotsOptions']['type'];
type CornerSquareType = QrOptions['cornersSquareOptions']['type'];
type CornerDotType = QrOptions['cornersDotOptions']['type'];
type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

const dotStyleOptions: { value: DotType; label: string }[] = [
  { value: 'square', label: 'Cuadrado' },
  { value: 'dots', label: 'Punteado' },
  { value: 'rounded', label: 'Redondeado' },
  { value: 'extra-rounded', label: 'Extra Redondeado' },
  { value: 'classy', label: 'Clásico' },
];

const cornerStyleOptions: { value: CornerSquareType; label: string }[] = [
  { value: 'square', label: 'Cuadrado' },
  { value: 'dot', label: 'Punteado' },
  { value: 'extra-rounded', label: 'Extra Redondeado' },
];

const cornerDotStyleOptions: { value: CornerDotType; label: string }[] = [
  { value: 'square', label: 'Cuadrado' },
  { value: 'dot', label: 'Punteado' },
];

const errorCorrectionOptions: { value: ErrorCorrectionLevel; label: string }[] = [
  { value: 'L', label: 'Bajo' },
  { value: 'M', label: 'Medio' },
  { value: 'Q', label: 'Cuartil' },
  { value: 'H', label: 'Alto' },
];

export function QrCodeGenerator() {
  const [content, setContent] = useState('');
  const [dotColor, setDotColor] = useState('#E44D26');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [cornerColor, setCornerColor] = useState('#E44D26');
  const [dotStyle, setDotStyle] = useState<DotType>('square');
  const [cornerStyle, setCornerStyle] = useState<CornerSquareType>('square');
  const [cornerDotStyle, setCornerDotStyle] = useState<CornerDotType>('square');
  const [logo, setLogo] = useState<string | undefined>(undefined);
  const [logoSize, setLogoSize] = useState(0.3);
  const [logoMargin, setLogoMargin] = useState(10);
  const [hidePoints, setHidePoints] = useState(true);
  const [errorCorrection, setErrorCorrection] = useState<ErrorCorrectionLevel>('H');
  const [downloadFormat, setDownloadFormat] = useState<'svg' | 'png' | 'jpeg' | 'webp'>('png');

  const { toast } = useToast();

  const qrRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const qrInstanceRef = useRef<QRCodeStyling | null>(null);

  const qrOptions: QrOptions = useMemo(() => ({
    width: 300,
    height: 300,
    data: content,
    image: logo,
    dotsOptions: {
      color: dotColor,
      type: dotStyle,
    },
    backgroundOptions: {
      color: backgroundColor,
    },
    cornersSquareOptions: {
      color: cornerColor,
      type: cornerStyle,
    },
    cornersDotOptions: {
      color: cornerColor,
      type: cornerDotStyle,
    },
    imageOptions: {
      hideBackgroundDots: hidePoints,
      imageSize: logoSize,
      margin: logoMargin,
      crossOrigin: 'anonymous',
    },
    qrOptions: {
      errorCorrectionLevel: errorCorrection,
    },
  }), [content, dotColor, backgroundColor, cornerColor, dotStyle, cornerStyle, cornerDotStyle, logo, logoSize, logoMargin, hidePoints, errorCorrection]);


  useEffect(() => {
    if (!qrRef.current) return;

    const initializeQrCode = async () => {
      const QRCodeStyling = (await import('qr-code-styling')).default;
      
      if (!qrInstanceRef.current) {
        qrInstanceRef.current = new QRCodeStyling(qrOptions);
        qrInstanceRef.current.append(qrRef.current!);
      } else {
        qrInstanceRef.current.update(qrOptions);
      }
    };
    
    initializeQrCode();
  }, [qrOptions]);
  

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setLogo(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleDownload = () => {
    if (!qrInstanceRef.current) return;
    qrInstanceRef.current.download({
      name: 'qr-darw',
      extension: downloadFormat,
    });
  };

  const renderTooltip = (text: string) => (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Info className="h-4 w-4 text-muted-foreground cursor-help" />
        </TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );

  const formatOptions = ['svg', 'png', 'jpeg', 'webp'] as const;

  return (
    <section id="generator" className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Generador de QR
          </h1>
          <h2 className="mt-4 text-2xl font-medium text-muted-foreground">Realizado por Darwinini</h2>
          <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
            Crea códigos QR únicos y personalizados en segundos. Añade tu logo, elige colores, formas y descárgalo en alta calidad. Sin anuncios, sin registros, para siempre.
          </p>
        </div>

        <div className="mt-8 max-w-xl mx-auto">
            <Label htmlFor="qr-content" className="sr-only">Pega tu URL o escribe el texto</Label>
            <Input
              id="qr-content"
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Pega tu URL o escribe el texto que quieres en tu QR"
              className="h-14 text-lg text-center shadow-lg focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            />
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-8">
          <Card className="bg-card">
            <CardContent className="p-6">
              <div className="flex justify-center sm:justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Opciones de Diseño</h2>
              </div>
              <Accordion type="multiple" defaultValue={['item-1', 'item-2']} className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-lg font-medium"><Palette className="mr-2 h-5 w-5" /> Colores</AccordionTrigger>
                  <AccordionContent className="grid gap-4 pt-4 sm:grid-cols-3">
                    <ColorPicker color={dotColor} onChange={setDotColor} label="Color de Puntos" />
                    <ColorPicker color={backgroundColor} onChange={setBackgroundColor} label="Color de Fondo" />
                    <ColorPicker color={cornerColor} onChange={setCornerColor} label="Color de Esquinas" />
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-lg font-medium"><Shapes className="mr-2 h-5 w-5" /> Formas y Estilo</AccordionTrigger>
                  <AccordionContent className="grid gap-4 pt-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="dot-style">Estilo de los Puntos</Label>
                      <Select value={dotStyle} onValueChange={(v) => setDotStyle(v as DotType)}>
                        <SelectTrigger id="dot-style"><SelectValue /></SelectTrigger>
                        <SelectContent>{dotStyleOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="corner-style">Estilo de Esquinas (Marco)</Label>
                      <Select value={cornerStyle} onValueChange={(v) => setCornerStyle(v as CornerSquareType)}>
                        <SelectTrigger id="corner-style"><SelectValue /></SelectTrigger>
                        <SelectContent>{cornerStyleOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="corner-dot-style">Estilo de Esquinas (Punto)</Label>                      <Select value={cornerDotStyle} onValueChange={(v) => setCornerDotStyle(v as CornerDotType)}>
                        <SelectTrigger id="corner-dot-style"><SelectValue /></SelectTrigger>
                        <SelectContent>{cornerDotStyleOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-lg font-medium"><ImageIcon className="mr-2 h-5 w-5" /> Logo</AccordionTrigger>
                  <AccordionContent className="pt-4 space-y-4">
                    <div className="flex gap-4 items-center">
                      <Button variant="outline" onClick={() => fileInputRef.current?.click()}>Añadir Logo</Button>
                      <input type="file" ref={fileInputRef} onChange={handleLogoUpload} accept="image/*" className="hidden" />
                      {logo && <Button variant="ghost" size="sm" onClick={() => setLogo(undefined)}>Quitar logo</Button>}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="logo-size">Tamaño del Logo: {logoSize.toFixed(2)}</Label>
                            <Slider id="logo-size" value={[logoSize]} onValueChange={([v]) => setLogoSize(v)} min={0.1} max={0.9} step={0.05} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="logo-margin">Margen del Logo: {logoMargin}</Label>
                            <Slider id="logo-margin" value={[logoMargin]} onValueChange={([v]) => setLogoMargin(v)} min={0} max={20} step={1} />
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="hide-points" checked={hidePoints} onCheckedChange={(checked) => setHidePoints(Boolean(checked))} />
                        <Label htmlFor="hide-points" className="font-normal">Ocultar puntos detrás del logo</Label>
                        {renderTooltip("Marca esta opción para que el logo tenga un fondo limpio y mejore la legibilidad.")}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-lg font-medium"><ShieldCheck className="mr-2 h-5 w-5" /> Calidad y Precisión</AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="space-y-2 max-w-xs">
                        <div className="flex items-center gap-2">
                          <Label htmlFor="error-correction">Nivel de Corrección de Errores</Label>
                          {renderTooltip('Un nivel más alto permite que el QR se lea incluso si está parcialmente dañado, pero lo hace más denso. "Alto" es ideal si tienes un logo grande.')}
                        </div>
                        <Select value={errorCorrection} onValueChange={(v) => setErrorCorrection(v as ErrorCorrectionLevel)}>
                          <SelectTrigger id="error-correction"><SelectValue /></SelectTrigger>
                          <SelectContent>{errorCorrectionOptions.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}</SelectContent>
                        </Select>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
          <div className="space-y-6 lg:sticky lg:top-24 h-max">
            <Card className="bg-card">
              <CardContent className="p-6">
                <div ref={qrRef} className="mx-auto w-[300px] h-[300px] [&>canvas]:w-full [&>canvas]:h-full" />
              </CardContent>
            </Card>
            <Card className="bg-card">
              <CardContent className="p-6 space-y-4">
                  <h3 className="text-lg font-medium flex items-center gap-2 justify-center sm:justify-start"><Download className="h-5 w-5"/>Descargar</h3>
                  <div className="space-y-2">
                    <Label>Formato</Label>
                    <RadioGroup
                      value={downloadFormat}
                      onValueChange={(v) => setDownloadFormat(v as any)}
                      className="flex flex-wrap gap-2"
                    >
                      {formatOptions.map((format) => (
                        <Label
                          key={format}
                          htmlFor={`fmt-${format}`}
                          className={cn(
                            'border rounded-md p-2 px-3 text-sm cursor-pointer transition-colors',
                            downloadFormat === format
                              ? 'bg-primary text-primary-foreground border-primary'
                              : 'hover:bg-accent'
                          )}
                        >
                          <RadioGroupItem
                            value={format}
                            id={`fmt-${format}`}
                            className="sr-only"
                          />
                          {format.toUpperCase()}
                        </Label>
                      ))}
                    </RadioGroup>
                  </div>
                  <Button onClick={handleDownload} className="w-full text-lg h-12 transition-transform hover:-translate-y-1">Descargar Código QR</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
