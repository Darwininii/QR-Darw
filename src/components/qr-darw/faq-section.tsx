import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "¿Es realmente gratis? ¿Hay algún truco?",
    answer: "Sí, es 100% gratis y siempre lo será. No hay truco. Este es un proyecto creado para ofrecer una herramienta útil y accesible para todos, sin publicidad ni versiones \"premium\"."
  },
  {
    question: "¿Puedo usar los códigos QR para fines comerciales?",
    answer: "¡Por supuesto! Puedes usar los códigos QR que generes para tus menús de restaurante, tarjetas de visita, empaques de productos, campañas de marketing o cualquier otro uso comercial que necesites. No hay limitaciones."
  },
  {
    question: "¿Qué formato de descarga debo elegir?",
    answer: "SVG: Es un formato vectorial. Elige esta opción si vas a imprimir el código QR en material físico (flyers, carteles, etc.), ya que no pierde calidad al ampliarlo.\nPNG: Ideal para usar en páginas web, correos electrónicos o redes sociales. Permite fondos transparentes.\nJPEG / WEBP: Úsalos si necesitas un tamaño de archivo más pequeño para uso digital."
  },
  {
    question: "¿Los códigos QR que creo aquí caducan?",
    answer: "No. Los códigos QR generados son estáticos, lo que significa que mientras el enlace o texto de destino no cambie, el código QR funcionará para siempre."
  }
]

export function FaqSection() {
  return (
    <section id="faq" className="py-16 sm:py-24 bg-transparent">
      <div className="container mx-auto max-w-4xl px-4">
        <h2 className="text-3xl font-bold text-center tracking-tight sm:text-4xl">
          Preguntas Frecuentes
        </h2>
        <Accordion type="single" collapsible className="w-full mt-12">
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-left text-lg font-medium">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground whitespace-pre-line">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
