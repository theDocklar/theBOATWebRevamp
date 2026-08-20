import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProcessSection from "@/components/ProcessSection";
import ServicesSection from "@/components/ServicesSection";
import ProductSection from "@/components/ProductSection";
import CommerceSection from "@/components/CommerceSection";
import WorkSection from "@/components/WorkSection";
import WhySection from "@/components/WhySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { FAQSchema, ServiceSchema } from "@/components/schema";
import { FAQS } from "@/lib/faqs";
import { SERVICES } from "@/lib/services";

export default function Home() {
  return (
    <>
      <FAQSchema faqs={FAQS.map((f) => ({ question: f.q, answer: f.a }))} />
      {SERVICES.map((service) => (
        <ServiceSchema
          key={service.title}
          name={service.title}
          description={service.description}
          url={service.schemaUrl}
        />
      ))}
      <Navbar />
      <main>
        <HeroSection />
        <ProcessSection />
        <ServicesSection />
        <ProductSection />
        <WorkSection />
        <CommerceSection />
        <WhySection />
        {/* <TestimonialsSection /> */}
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
