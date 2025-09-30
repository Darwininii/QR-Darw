import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-transparent backdrop-blur supports-[backdrop-filter]:bg-transparent/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Logo />
        <nav className="hidden md:flex">
          <ul className="flex items-center space-x-2">
            <li>
              <Button variant="link" asChild>
                <a href="#features">Características</a>
              </Button>
            </li>
            <li>
              <Button variant="link" asChild>
                <a href="#faq">Preguntas Frecuentes</a>
              </Button>
            </li>
            <li>
              <Button variant="link" asChild>
                <a
                  href="https://darwinini-dev.onrender.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contáctame
                </a>
              </Button>
            </li>
          </ul>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-4 pt-8">
              <a
                href="#features"
                className="text-lg font-medium text-foreground hover:text-primary"
              >
                Características
              </a>
              <a
                href="#faq"
                className="text-lg font-medium text-foreground hover:text-primary"
              >
                Preguntas Frecuentes
              </a>
              <a
                href="https://darwinini-dev.onrender.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium text-foreground hover:text-primary"
              >
                Contáctame
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
