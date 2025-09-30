import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Palette, BadgeDollarSign, Zap, Lock } from "lucide-react"

const features = [
  {
    icon: <Palette className="h-8 w-8 text-primary" />,
    title: "Personalización Total",
    description: "Destaca de la competencia. Elige colores, formas y añade tu propio logo para que tu QR sea reconocible y esté alineado con tu marca."
  },
  {
    icon: <BadgeDollarSign className="h-8 w-8 text-primary" />,
    title: "Gratis y Sin Anuncios",
    description: "Una herramienta para la comunidad. Sin costes ocultos, sin publicidad molesta y sin necesidad de crear una cuenta. Para siempre."
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Descarga Instantánea y en Alta Calidad",
    description: "Obtén tu código QR al instante en formatos profesionales como SVG, perfectos para imprenta, o PNG, ideal para tu web o redes sociales."
  },
  {
    icon: <Lock className="h-8 w-8 text-primary" />,
    title: "Tu Privacidad es lo Primero",
    description: "No guardamos ni rastreamos los datos de tus códigos QR. Todo el proceso de generación se realiza en tu propio navegador. Tu información es solo tuya."
  }
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 sm:py-24 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Un generador de QR pensado para todos</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Creamos esta herramienta con todo lo que necesitas y nada de lo que te molesta.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center bg-card hover:shadow-lg transition-all hover:-translate-y-2">
              <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                <CardDescription className="mt-2 text-muted-foreground">{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
