import { Header } from "@/components/qr-darw/header";
import { QrCodeGenerator } from "@/components/qr-darw/qr-code-generator";
import { FeaturesSection } from "@/components/qr-darw/features-section";
import { FaqSection } from "@/components/qr-darw/faq-section";
import { MissionSection } from "@/components/qr-darw/mission-section";
import { Footer } from "@/components/qr-darw/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-dvh relative">
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      <Header />
      <main className="flex-1">
        <QrCodeGenerator />
        <FeaturesSection />
        <FaqSection />
        <MissionSection />
      </main>
      <Footer />
    </div>
  );
}
