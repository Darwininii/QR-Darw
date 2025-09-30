import { QrCode } from 'lucide-react';

export function Logo() {
  return (
    <a href="/" className="flex items-center gap-2" aria-label="QRDarw Home">
      <div className="bg-primary p-1.5 rounded-lg">
        <QrCode className="h-6 w-6 text-primary-foreground" />
      </div>
      <span className="text-xl font-bold tracking-tighter">
        QR<span className="text-primary">Darw</span>
      </span>
    </a>
  );
}
