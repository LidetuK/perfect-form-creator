
import ContactForm from "@/components/ContactForm";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212]">
      <div className="w-full max-w-4xl p-6">
        <h1 className="text-3xl font-bold mb-8 text-white text-center">Contact Us</h1>
        <ContactForm />
      </div>
    </div>
  );
};

export default Index;
