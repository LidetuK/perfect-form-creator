
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
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
  };

  return (
    <div className="w-full max-w-2xl mx-auto py-2">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="relative">
            <User className="absolute left-0 top-1/2 -translate-y-1/2 h-3 w-3 text-[hsl(var(--form-icon))]" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
              className="w-full bg-transparent border-b border-gray-700 pl-5 pb-1 text-white text-xs focus:outline-none focus:border-[hsl(var(--form-icon))]"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-0 top-1/2 -translate-y-1/2 h-3 w-3 text-[hsl(var(--form-icon))]" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="w-full bg-transparent border-b border-gray-700 pl-5 pb-1 text-white text-xs focus:outline-none focus:border-[hsl(var(--form-icon))]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="relative">
            <Phone className="absolute left-0 top-1/2 -translate-y-1/2 h-3 w-3 text-[hsl(var(--form-icon))]" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full bg-transparent border-b border-gray-700 pl-5 pb-1 text-white text-xs focus:outline-none focus:border-[hsl(var(--form-icon))]"
            />
          </div>

          <div className="relative">
            <Info className="absolute left-0 top-1/2 -translate-y-1/2 h-3 w-3 text-[hsl(var(--form-icon))]" />
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              className="w-full bg-transparent border-b border-gray-700 pl-5 pb-1 text-white text-xs focus:outline-none focus:border-[hsl(var(--form-icon))]"
            />
          </div>
        </div>

        <div className="relative">
          <Pencil className="absolute left-0 top-2 h-3 w-3 text-[hsl(var(--form-icon))]" />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="How can we help you? Feel free to get in touch!"
            rows={2}
            className="w-full bg-transparent border-b border-gray-700 pl-5 pb-1 text-white text-xs focus:outline-none focus:border-[hsl(var(--form-icon))]"
          />
        </div>

        <div className="border-t border-gray-700 pt-2">
          <div className="flex items-start space-x-2 mb-2">
            <Checkbox 
              id="transactionalConsent" 
              checked={formData.transactionalConsent}
              onCheckedChange={(checked) => 
                handleCheckboxChange('transactionalConsent', checked as boolean)
              }
              className="mt-1 border-gray-700 data-[state=checked]:bg-[hsl(var(--form-icon))] data-[state=checked]:text-black h-3 w-3"
            />
            <label htmlFor="transactionalConsent" className="text-xs text-gray-300">
              I consent to receive transactional messages related to my account and services.
            </label>
          </div>
          
          <div className="flex items-start space-x-2">
            <Checkbox 
              id="marketingConsent" 
              checked={formData.marketingConsent}
              onCheckedChange={(checked) => 
                handleCheckboxChange('marketingConsent', checked as boolean)
              }
              className="mt-1 border-gray-700 data-[state=checked]:bg-[hsl(var(--form-icon))] data-[state=checked]:text-black h-3 w-3"
            />
            <label htmlFor="marketingConsent" className="text-xs text-gray-300">
              I consent to receive marketing and promotional messages.
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="bg-[#AE8870] hover:bg-[#9a7863] text-black text-xs font-medium py-1.5 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
        >
          GET IN TOUCH
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
