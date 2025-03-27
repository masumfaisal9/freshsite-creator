
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MapPin, Phone, Mail, Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", data);
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
      form.reset();
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 lg:pt-32">
        {/* Hero Section */}
        <div className="bg-gray-50 py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <span className="bg-fresh-100 text-fresh-600 text-sm font-medium px-4 py-1 rounded-full">
                Get In Touch
              </span>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mt-4">
                Contact Us
              </h1>
              <p className="text-gray-600 mt-4 md:text-lg">
                We'd love to hear from you. Please fill out the form below or reach out via the provided contact information.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Info & Form Section */}
        <div className="container mx-auto px-4 md:px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                  Contact Information
                </h2>
                <p className="text-gray-600 mb-8">
                  Feel free to contact us through any of these channels. We're always ready to help and answer your questions.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-fresh-100 p-3 rounded-full text-fresh-600">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Our Location</h3>
                    <p className="text-gray-600 mt-1">
                      123 Fresh Street, Green City, Dhaka, Bangladesh
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-fresh-100 p-3 rounded-full text-fresh-600">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Phone Number</h3>
                    <p className="text-gray-600 mt-1">
                      <a href="tel:+8801234567890" className="hover:text-fresh-600 transition-colors">
                        +880 123 456 7890
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-fresh-100 p-3 rounded-full text-fresh-600">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Email Address</h3>
                    <p className="text-gray-600 mt-1">
                      <a href="mailto:info@befresh.com" className="hover:text-fresh-600 transition-colors">
                        info@befresh.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Google Map Embed */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Find Us On Map</h3>
                <div className="rounded-xl overflow-hidden h-[300px] shadow-md">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233668.0585521!2d90.27923803731499!3d23.78086635886069!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1699900028947!5m2!1sen!2sbd" 
                    width="100%" 
                    height="300" 
                    style={{ border: 0 }}
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="BeFresh Location"
                  />
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-md p-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Send Us A Message
              </h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Your Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="John Doe" 
                              className="border-gray-300 focus:border-fresh-500 focus:ring-fresh-500" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Email Address</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="johndoe@example.com" 
                              className="border-gray-300 focus:border-fresh-500 focus:ring-fresh-500" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Subject</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="How can we help you?" 
                            className="border-gray-300 focus:border-fresh-500 focus:ring-fresh-500" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Your Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Type your message here..." 
                            className="min-h-[150px] border-gray-300 focus:border-fresh-500 focus:ring-fresh-500" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-fresh-600 hover:bg-fresh-700 text-white py-3 rounded-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="bg-fresh-100 text-fresh-600 text-sm font-medium px-4 py-1 rounded-full">
                FAQs
              </span>
              <h2 className="text-3xl font-bold text-gray-800 mt-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 mt-4">
                Find answers to common questions about our services and delivery
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto divide-y divide-gray-200 rounded-2xl bg-white shadow-md overflow-hidden">
              {[
                {
                  question: "What areas do you deliver to?",
                  answer: "We currently deliver to all major areas in Dhaka city. You can check if your area is within our delivery zone during checkout."
                },
                {
                  question: "How long does delivery take?",
                  answer: "Our standard delivery time is within 2-4 hours of placing an order. You can also select a specific delivery time slot that's convenient for you."
                },
                {
                  question: "Do you offer same-day delivery?",
                  answer: "Yes, we offer same-day delivery for orders placed before 2 PM. Orders placed after that time will be delivered the next day."
                },
                {
                  question: "What is your return policy?",
                  answer: "If you're not satisfied with the quality of the products, you can request a return or replacement within 24 hours of delivery."
                },
              ].map((faq, index) => (
                <div key={index} className="px-6 py-4">
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer py-2 text-gray-800 font-medium">
                      {faq.question}
                      <span className="text-fresh-600 font-bold text-xl transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 text-gray-600 group-open:animate-fadeIn">
                      {faq.answer}
                    </p>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
