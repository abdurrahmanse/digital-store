"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from "lucide-react";
import { sendContactEmail } from "@/features/contact/actions/contact";
import { Container } from "@/components/layout/container";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const res = await sendContactEmail(formData);
    
    setIsSubmitting(false);
    if (res.success) {
      setIsSubmitted(true);
    } else {
      // In a real app we'd show an error toast here
      alert("Failed to send message: " + res.error);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header Banner */}
      <div className="bg-muted text-foreground py-12 md:py-20 px-4 relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
        <Container className="relative z-10 text-center">
          <Badge className="mb-4 bg-primary/10 hover:bg-primary/20 text-primary border-none px-3 py-1 text-sm inline-flex items-center gap-2">
            <MessageSquare className="w-4 h-4" /> Get in Touch
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">We'd love to hear from you</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Whether you have a question about our products, need support, or just want to say hi, our team is ready to answer all your questions.
          </p>
        </Container>
      </div>

      <Container className="-mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Information Cards */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-card p-6 rounded-2xl shadow-sm border border-border flex items-start gap-4 transition-transform hover:-translate-y-1 duration-300">
              <div className="bg-indigo-50 dark:bg-indigo-900/30 p-3 rounded-full text-indigo-600 dark:text-indigo-400">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Email Us</h3>
                <p className="text-muted-foreground text-sm mb-2">Our friendly team is here to help.</p>
                <a href="mailto:hello@digitalstore.com" className="text-indigo-600 dark:text-indigo-400 font-medium hover:underline text-sm">hello@digitalstore.com</a>
              </div>
            </div>

            <div className="bg-card p-6 rounded-2xl shadow-sm border border-border flex items-start gap-4 transition-transform hover:-translate-y-1 duration-300">
              <div className="bg-emerald-50 dark:bg-emerald-900/30 p-3 rounded-full text-emerald-600 dark:text-emerald-400">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Call Us</h3>
                <p className="text-muted-foreground text-sm mb-2">Mon-Fri from 8am to 5pm.</p>
                <a href="tel:+1234567890" className="text-emerald-600 dark:text-emerald-400 font-medium hover:underline text-sm">+1 (234) 567-890</a>
              </div>
            </div>

            <div className="bg-card p-6 rounded-2xl shadow-sm border border-border flex items-start gap-4 transition-transform hover:-translate-y-1 duration-300">
              <div className="bg-amber-50 dark:bg-amber-900/30 p-3 rounded-full text-amber-600 dark:text-amber-400">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Office</h3>
                <p className="text-muted-foreground text-sm mb-2">Come say hello at our office HQ.</p>
                <span className="text-foreground font-medium text-sm">100 Smith Street<br/>Collingwood VIC 3066</span>
              </div>
            </div>

            <div className="bg-card p-6 rounded-2xl shadow-sm border border-border flex items-start gap-4 transition-transform hover:-translate-y-1 duration-300">
              <div className="bg-rose-50 dark:bg-rose-900/30 p-3 rounded-full text-rose-600 dark:text-rose-400">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Working Hours</h3>
                <p className="text-muted-foreground text-sm mb-2">When we're available to assist.</p>
                <span className="text-foreground font-medium text-sm">Mon - Fri: 9:00 AM - 6:00 PM<br/>Sat - Sun: Closed</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-card p-8 md:p-12 rounded-2xl shadow-sm border border-border h-full">
              {isSubmitted ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 min-h-[400px]">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mb-4">
                    <Send className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl font-bold text-foreground">Message Sent!</h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Thanks for reaching out. We've received your message and will get back to you as soon as possible.
                  </p>
                  <Button 
                    className="mt-6 px-8 rounded-full" 
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-foreground mb-6">Send us a message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="text-sm font-medium text-foreground">First Name</label>
                        <Input 
                          id="firstName" 
                          name="firstName"
                          placeholder="John" 
                          required 
                          className="rounded-xl border-border bg-background focus-visible:ring-primary h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="lastName" className="text-sm font-medium text-foreground">Last Name</label>
                        <Input 
                          id="lastName" 
                          name="lastName"
                          placeholder="Doe" 
                          required 
                          className="rounded-xl border-border bg-background focus-visible:ring-primary h-12"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</label>
                      <Input 
                        id="email" 
                        name="email"
                        type="email" 
                        placeholder="john@example.com" 
                        required 
                        className="rounded-xl border-border bg-background focus-visible:ring-primary h-12"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium text-foreground">Subject</label>
                      <Input 
                        id="subject" 
                        name="subject"
                        placeholder="How can we help you?" 
                        required 
                        className="rounded-xl border-border bg-background focus-visible:ring-primary h-12"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                      <textarea 
                        id="message" 
                        name="message"
                        placeholder="Please describe your request in detail..." 
                        required 
                        rows={6}
                        className="w-full rounded-xl border border-border bg-background px-3 py-3 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary resize-none"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-lg flex items-center justify-center gap-2 group transition-all"
                      isLoading={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : (
                        <>
                          Send Message
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>

        </div>
      </Container>
    </div>
  );
}
