"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, Mail, Phone, User, MessageSquare, MapPin, Loader2 } from "lucide-react";
import LustreText from "../ui/lustretext";

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
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: `Mobile: ${formData.mobile}\n\nMessage: ${formData.message}`
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setIsSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: "",
          email: "",
          mobile: "",
          message: ""
        });
      }, 3000);
    } catch (err) {
      setError('There was an error sending your message. Please try again.');
      console.error('Error sending message:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="contact" className="relative py-20  overflow-hidden pt-30">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 transform -skew-y-3 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-300/10 rounded-full filter blur-3xl"></div>
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-300/10 rounded-full filter blur-3xl"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl mb-6 shadow-2xl"
          >
            <Mail className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-gray-400 via-gray-500 to-gray-500 bg-clip-text text-transparent leading-tight drop-shadow-lg">
            <LustreText text="Get In Touch" />
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Have a project in mind or want to discuss opportunities? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-0 shadow-2xl overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  Let's Talk
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
                    <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Email</h3>
                    <p className="text-gray-600 dark:text-gray-300">satishchaubey02@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-2xl">
                    <Phone className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Phone</h3>
                    <p className="text-gray-600 dark:text-gray-300">+91 8299805407</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-pink-100 dark:bg-pink-900/30 rounded-2xl">
                    <MapPin className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Location</h3>
                    <p className="text-gray-600 dark:text-gray-300">Ghaziabad</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-0 shadow-2xl overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  Why Contact Me?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {[
                    "Quick response within 24 hours",
                    "Free initial consultation",
                    "Custom solutions for your needs",
                    "Professional and reliable service"
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-2 text-gray-600 dark:text-gray-300"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-0 shadow-2xl overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>

              <CardHeader className="text-center pt-8 pb-4">
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                  Send a Message
                </CardTitle>
              </CardHeader>

              <CardContent className="pb-8">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
                      <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                    <p className="text-gray-600 dark:text-gray-300">Thank you for reaching out. I'll get back to you soon.</p>
                  </motion.div>
                ) : (
                  <motion.form
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg border border-red-200 dark:border-red-800"
                      >
                        {error}
                      </motion.div>
                    )}

                    <motion.div variants={itemVariants} className="space-y-2">
                      <Label htmlFor="name" className="text-gray-700 dark:text-gray-300 flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        Name *
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
                        className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50"
                      />
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 flex items-center">
                        <Mail className="w-4 h-4 mr-2" />
                        Email *
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
                        className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50"
                      />
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-2">
                      <Label htmlFor="mobile" className="text-gray-700 dark:text-gray-300 flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        Mobile Number
                      </Label>
                      <Input
                        id="mobile"
                        name="mobile"
                        type="tel"
                        placeholder="+91 8299805407"
                        value={formData.mobile}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50"
                      />
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-2">
                      <Label htmlFor="message" className="text-gray-700 dark:text-gray-300 flex items-center">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell me about your project or inquiry..."
                        rows={5}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none disabled:opacity-50"
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg"
                        size="lg"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </motion.form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;