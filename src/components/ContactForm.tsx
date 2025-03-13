
import React, { useState } from 'react';
import { Mail, Phone, User, Info, Pencil } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from '@/components/ui/use-toast';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    transactionalConsent: false,
    marketingConsent: false,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      const formSubmissionData = {
        ...formData,
        access_key: 'e73a3855-6c64-4906-8bf6-06b01b148bfa',
        from_name: formData.name,
        subject: formData.subject || 'New Contact Form Submission',
        to_email: 'seginc2@gmail.com',
      };
      
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formSubmissionData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast({
          title: "Message Sent",
          description: "We've received your message and will get back to you soon!",
        });
        
        // Reset form after submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          transactionalConsent: false,
          marketingConsent: false,
        });
      } else {
        throw new Error(result.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <User className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-5 text-[hsl(var(--form-icon))]" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
              className="w-full bg-transparent border-b border-gray-700 pl-8 pb-2 text-white focus:outline-none focus:border-[hsl(var(--form-icon))]"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-5 text-[hsl(var(--form-icon))]" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full bg-transparent border-b border-gray-700 pl-8 pb-2 text-white focus:outline-none focus:border-[hsl(var(--form-icon))]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <Phone className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-5 text-[hsl(var(--form-icon))]" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full bg-transparent border-b border-gray-700 pl-8 pb-2 text-white focus:outline-none focus:border-[hsl(var(--form-icon))]"
            />
          </div>

          <div className="relative">
            <Info className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-5 text-[hsl(var(--form-icon))]" />
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full bg-transparent border-b border-gray-700 pl-8 pb-2 text-white focus:outline-none focus:border-[hsl(var(--form-icon))]"
            />
          </div>
        </div>

        <div className="relative">
          <Pencil className="absolute left-0 top-4 h-5 w-5 text-[hsl(var(--form-icon))]" />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="How can we help you? Feel free to get in touch!"
            rows={3}
            className="w-full bg-transparent border-b border-gray-700 pl-8 pb-2 text-white focus:outline-none focus:border-[hsl(var(--form-icon))]"
          />
        </div>

        <div className="border-t border-gray-700 pt-4">
          <div className="flex items-start space-x-2 mb-3">
            <Checkbox 
              id="transactionalConsent" 
              checked={formData.transactionalConsent}
              onCheckedChange={(checked) => 
                handleCheckboxChange('transactionalConsent', checked as boolean)
              }
              className="mt-1 border-gray-700 data-[state=checked]:bg-[hsl(var(--form-icon))] data-[state=checked]:text-black"
            />
            <label htmlFor="transactionalConsent" className="text-sm text-gray-300">
              By checking this box, I consent to receive transactional messages related to my account, 
              orders, or services I have requested. These messages may include appointment reminders, 
              order confirmations, and account notifications among others. Message frequency may vary. 
              Message & Data rates may apply. Reply HELP for help or STOP to opt-out.
            </label>
          </div>
          
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="marketingConsent" 
              checked={formData.marketingConsent}
              onCheckedChange={(checked) => 
                handleCheckboxChange('marketingConsent', checked as boolean)
              }
              className="mt-1 border-gray-700 data-[state=checked]:bg-[hsl(var(--form-icon))] data-[state=checked]:text-black"
            />
            <label htmlFor="marketingConsent" className="text-sm text-gray-300">
              By checking this box, I consent to receive marketing and promotional messages, including
              special offers, discounts, new product updates among others. Message frequency may vary.
              Message & Data rates may apply. Reply HELP for help or STOP to opt-out.
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#AE8870] hover:bg-[#9a7964] text-black font-bold py-3 px-6 rounded-md transition-colors duration-200 flex items-center justify-center"
        >
          {isSubmitting ? "SENDING..." : "GET IN TOUCH"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
