import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const phoneNumber = "5491112345678"; // TODO: Reemplazar por tu número oficial de WhatsApp con código de país
const text = encodeURIComponent("Hola Websy, quiero un bot de WhatsApp para ventas.");
const waLink = `https://wa.me/${phoneNumber}?text=${text}`;

const WhatsAppFloatingButton = () => {
  return (
    <Button asChild size="lg" className="fixed bottom-6 right-6 z-50 rounded-full">
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos por WhatsApp"
        title="Escríbenos por WhatsApp"
      >
        <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp
      </a>
    </Button>
  );
};

export default WhatsAppFloatingButton;
