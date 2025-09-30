import { Logo } from "./logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 bg-transparent border-t [border-image:linear-gradient(to_right,hsl(var(--border)),#fff,hsl(var(--border)))_1]">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <Logo />
        <div className="text-center sm:text-right">
          <p className="text-sm text-muted-foreground">
            Hecho con ❤️ por{" "}
            <a
              href="https://darwinini-dev.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline underline-offset-4"
            >
              Darwinnini
            </a>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            © {currentYear} QRDarw. Todos los derechos reservados. |{" "}
            <a
              href="https://darwinini-dev.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline underline-offset-4"
            >
              Contáctame
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
