"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, Mail, Phone, User, MessageSquare, MapPin, Loader2, CheckCircle2, Linkedin, Github, Sparkles } from "lucide-react";
import LustreText from "../ui/lustretext";
import { toast } from "../ui/toast";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Simulate submission delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for reaching out. Satish will get back to you soon.",
        variant: "success",
      });

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: "", email: "", mobile: "", message: "" });
      }, 4000);
    } catch (err) {
      setError('There was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative pt-20 md:pt-24 pb-12 overflow-hidden px-4 max-w-6xl mx-auto space-y-12">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center space-y-3"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-600 dark:text-teal-400 text-xs font-bold uppercase tracking-wider">
          <Mail className="w-4 h-4" /> Let's Connect
        </div>
        <h1 className="text-lg sm:text-3xl md:text-5xl font-extrabold tracking-tight">
          <LustreText text="Get In Touch" className="text-lg sm:text-3xl md:text-5xl font-extrabold" />
        </h1>
        <p className="text-[11px] sm:text-xs md:text-sm text-muted-foreground max-w-xl mx-auto">
          Have an exciting project, open role, or collaboration in mind? Feel free to reach out directly or send a message below!
        </p>
      </motion.div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Direct Contact Info & Socials */}
        <div className="lg:col-span-5 space-y-6">
          
          <Card className="rounded-2xl border border-border bg-card p-4 sm:p-6 shadow-md space-y-4">
            <h3 className="text-sm sm:text-lg font-bold text-foreground border-b border-border/50 pb-2.5">
              Direct Contact Details
            </h3>

            {/* Mobile Layout: Compact 3-Column Pill Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-1 md:space-y-4 gap-2.5 sm:gap-4">
              <a href="mailto:satishchaubey02@gmail.com" className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl border border-border bg-background hover:bg-accent hover:border-teal-500/40 transition-all group">
                <div className="p-2 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20 flex-shrink-0">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] sm:text-xs text-muted-foreground font-semibold block">Email</span>
                  <span className="text-xs sm:text-sm font-bold text-foreground group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors truncate block">
                    satishchaubey02@gmail.com
                  </span>
                </div>
              </a>

              <a href="tel:+918299805407" className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl border border-border bg-background hover:bg-accent hover:border-emerald-500/40 transition-all group">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex-shrink-0">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] sm:text-xs text-muted-foreground font-semibold block">Phone</span>
                  <span className="text-xs sm:text-sm font-bold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors block">
                    +91 8299805407
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl border border-border bg-background">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 flex-shrink-0">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] sm:text-xs text-muted-foreground font-semibold block">Location</span>
                  <span className="text-xs sm:text-sm font-bold text-foreground block truncate">
                    Ghaziabad, UP, India
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Social Profiles */}
          <Card className="rounded-2xl border border-border bg-card p-6 shadow-md space-y-4">
            <h3 className="text-sm font-bold text-foreground">Connect Online</h3>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://linkedin.com/in/satish-chaubey"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 rounded-xl border border-border bg-background hover:bg-accent text-blue-600 dark:text-blue-400 text-xs font-bold transition-all"
              >
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>

              <a
                href="https://github.com/satishchaubey"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 p-3 rounded-xl border border-border bg-background hover:bg-accent text-foreground text-xs font-bold transition-all"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
            </div>
          </Card>

        </div>

        {/* Right Column: Interactive Form */}
        <div className="lg:col-span-7">
          <Card className="rounded-2xl border border-border bg-card p-6 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500" />

            <CardHeader className="p-0 pb-4">
              <CardTitle className="text-xl font-bold text-foreground">
                Send Satish a Direct Message
              </CardTitle>
            </CardHeader>

            <CardContent className="p-0 pt-2">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10 space-y-3"
                >
                  <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">Message Delivered!</h3>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                    Thank you for reaching out. Satish will respond to your email as soon as possible.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold rounded-xl">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="name" className="text-xs font-bold text-foreground flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-teal-500" /> Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="bg-background border-border text-foreground text-xs rounded-xl focus:border-teal-500 h-10"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-xs font-bold text-foreground flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-teal-500" /> Email *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="satishchaubey02@gmail.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="bg-background border-border text-foreground text-xs rounded-xl focus:border-teal-500 h-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="mobile" className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-teal-500" /> Phone Number
                    </Label>
                    <Input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      placeholder="+91 8299805407"
                      value={formData.mobile}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="bg-background border-border text-foreground text-xs rounded-xl focus:border-teal-500 h-10"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="message" className="text-xs font-bold text-foreground flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5 text-teal-500" /> Message *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project, timeline, or open role..."
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="bg-background border-border text-foreground text-xs rounded-xl focus:border-teal-500 resize-none p-3"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-bold py-3 rounded-xl transition-all cursor-pointer shadow-md"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" /> Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

      </div>

    </section>
  );
};

export default ContactForm;