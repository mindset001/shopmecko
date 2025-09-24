import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { safelySetStyle } from "@/lib/dom-utils";
import NavigationBar from "@/components/ui/navigation-bar";
import InteractiveLink from "@/components/ui/interactive-link";
import ServiceItem from "@/components/ui/service-item";
import TestimonialCard from "@/components/ui/testimonial-card";
import CtaSection from "@/components/ui/cta-section";
import CtaButton from "@/components/ui/cta-button";

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navigation - Client Component */}
      <NavigationBar />
      
      {/* Spacer to prevent content from hiding under fixed header */}
      <div style={{ height: '4rem' }}></div>

      <main style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
        {/* Hero Section */}
        <section className="hero-gradient" style={{ 
          background: 'linear-gradient(to bottom, #ffffff, #e6f1ff)',
          padding: '5rem 0',
          overflow: 'hidden'
        }}>
          <div className="container-custom" style={{ 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3rem',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1rem'
          }}>
            <div style={{ 
              flex: '1',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem'
            }} className="animate-fade-in-up">
              <h1 style={{ 
                fontSize: '2.5rem', 
                fontWeight: '800', 
                lineHeight: '1.2',
                marginBottom: '1.5rem'
              }}>
                <span style={{ 
                  color: '#0071ff',
                  display: 'inline-block'
                }}>Connect</span> with the Best in 
                <span style={{ 
                  color: '#ffd700',
                  display: 'inline-block'
                }}> Vehicle Services</span>
              </h1>
              <p style={{ 
                fontSize: '1.25rem', 
                color: '#6b7280',
                maxWidth: '42rem',
                margin: '0 auto',
                marginBottom: '2rem'
              }} className="animate-fade-in delay-200">
                ShopMeco brings together vehicle owners, repair specialists, and spare part sellers in one seamless marketplace.
              </p>
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column',
                gap: '1rem', 
                justifyContent: 'center',
                marginBottom: '2rem'
              }} className="animate-fade-in delay-400 sm:flex-row">
                <CtaButton href="/register" variant="primary" className="btn-primary">
                  <svg style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Join as Vehicle Owner
                </CtaButton>
                <CtaButton href="/register" variant="secondary" className="btn-secondary">
                  <svg style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Register as Service Provider
                </CtaButton>
              </div>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '0.5rem', 
                fontSize: '0.875rem', 
                color: '#6b7280'
              }} className="animate-fade-in delay-600">
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '1.5rem',
                  height: '1.5rem',
                  borderRadius: '50%',
                  backgroundColor: '#cce3ff'
                }} className="animate-pulse-glow">
                  <svg style={{ width: '1rem', height: '1rem', color: '#0071ff' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Trusted by over 10,000 vehicle owners nationwide</span>
              </div>
            </div>
            <div style={{ 
              flex: '1', 
              position: 'relative', 
              display: 'none'
            }} className="lg:block animate-fade-in delay-300">
              <div style={{ 
                position: 'relative',
                width: '100%',
                height: '500px',
                borderRadius: '1rem',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
              }}>
                <Image
                  src="/hero-car-service.jpg"
                  alt="Vehicle Service Illustration"
                  fill
                  style={{
                    objectFit: 'cover'
                  }}
                  priority
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top right, rgba(0,0,0,0.4), transparent)'
                }}></div>
                <div style={{
                  position: 'absolute',
                  bottom: '1.5rem',
                  right: '1.5rem',
                  width: '6rem',
                  height: '6rem',
                  borderRadius: '50%',
                  backgroundColor: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                }} className="animate-bounce-subtle">
                  <svg style={{ width: '4rem', height: '4rem', color: '#0071ff' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" style={{ 
          padding: '6rem 0',
          backgroundColor: '#ffffff',
          overflow: 'hidden'
        }}>
          <div style={{ 
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1rem'
          }}>
            <div style={{ 
              textAlign: 'center', 
              marginBottom: '4rem' 
            }} className="animate-fade-in-up">
              <h2 style={{ 
                fontSize: '2.5rem',
                fontWeight: '700',
                marginBottom: '1rem',
                color: '#1e3a8a',
                display: 'inline-block',
                position: 'relative'
              }}>
                Why Choose ShopMeco?
                <span style={{ 
                  position: 'absolute',
                  bottom: '-0.5rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '6rem',
                  height: '0.25rem',
                  backgroundColor: '#0071ff',
                  borderRadius: '9999px'
                }}></span>
              </h2>
              <p style={{ 
                fontSize: '1.25rem',
                color: '#6b7280',
                maxWidth: '48rem',
                margin: '1.5rem auto 0'
              }}>
                A comprehensive solution for all your vehicle service needs
              </p>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              {/* Feature 1 */}
              <ServiceItem 
                imageSrc="/car-mechanic-service.jpg"
                title="Expert Mechanics"
                description="Connect with certified mechanics who have years of experience with a wide variety of vehicle makes and models."
              />
              
              {/* Feature 2 */}
              <ServiceItem 
                imageSrc="/car-parts.jpg"
                title="Quality Parts"
                description="Access genuine or OEM-equivalent parts from trusted suppliers for your vehicle repairs and maintenance."
              />
              
              {/* Feature 3 */}
              <ServiceItem 
                imageSrc="/car-maintenance.jpg"
                title="Scheduled Maintenance"
                description="Set up regular maintenance schedules and get reminders when your vehicle needs servicing."
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" style={{ 
          padding: '6rem 0',
          backgroundColor: '#f9fafb',
          overflow: 'hidden'
        }}>
          <div style={{ 
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1rem'
          }}>
            <div style={{ 
              textAlign: 'center', 
              marginBottom: '4rem' 
            }} className="animate-fade-in-up">
              <h2 style={{ 
                fontSize: '2.5rem',
                fontWeight: '700',
                marginBottom: '1rem',
                color: '#1e3a8a',
                display: 'inline-block',
                position: 'relative'
              }}>
                How It Works
                <span style={{ 
                  position: 'absolute',
                  bottom: '-0.5rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '6rem',
                  height: '0.25rem',
                  backgroundColor: '#0071ff',
                  borderRadius: '9999px'
                }}></span>
              </h2>
              <p style={{ 
                fontSize: '1.25rem',
                color: '#6b7280',
                maxWidth: '48rem',
                margin: '1.5rem auto 0'
              }}>
                Simple steps to get your vehicle serviced
              </p>
            </div>

            <div style={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem'
            }} className="md:flex-row">
              {/* Step 1 */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                flex: 1,
                padding: '2rem',
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }} className="animate-fade-in-up">
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '50%',
                  backgroundColor: '#dbeafe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem'
                }}>
                  <span style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#0071ff'
                  }}>1</span>
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: '#1F2937'
                }}>Register Your Vehicle</h3>
                <p style={{ 
                  color: '#6B7280',
                  lineHeight: '1.6',
                }}>
                  Create an account and add your vehicle details. We&apos;ll keep track of your service history.
                </p>
              </div>

              {/* Step 2 */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                flex: 1,
                padding: '2rem',
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }} className="animate-fade-in-up delay-100">
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '50%',
                  backgroundColor: '#dbeafe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem'
                }}>
                  <span style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#0071ff'
                  }}>2</span>
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: '#1F2937'
                }}>Book a Service</h3>
                <p style={{ 
                  color: '#6B7280',
                  lineHeight: '1.6',
                }}>
                  Choose from our network of verified mechanics and schedule an appointment at your convenience.
                </p>
              </div>

              {/* Step 3 */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                flex: 1,
                padding: '2rem',
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }} className="animate-fade-in-up delay-200">
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  borderRadius: '50%',
                  backgroundColor: '#dbeafe',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem'
                }}>
                  <span style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#0071ff'
                  }}>3</span>
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  marginBottom: '1rem',
                  color: '#1F2937'
                }}>Get Service Done</h3>
                <p style={{ 
                  color: '#6B7280',
                  lineHeight: '1.6',
                }}>
                  Receive quality service from trusted professionals and rate your experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" style={{ 
          padding: '6rem 0',
          backgroundColor: '#ffffff',
          overflow: 'hidden'
        }}>
          <div style={{ 
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1rem'
          }}>
            <div style={{ 
              textAlign: 'center', 
              marginBottom: '4rem' 
            }} className="animate-fade-in-up">
              <h2 style={{ 
                fontSize: '2.5rem',
                fontWeight: '700',
                marginBottom: '1rem',
                color: '#1e3a8a',
                display: 'inline-block',
                position: 'relative'
              }}>
                What Our Customers Say
                <span style={{ 
                  position: 'absolute',
                  bottom: '-0.5rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '6rem',
                  height: '0.25rem',
                  backgroundColor: '#0071ff',
                  borderRadius: '9999px'
                }}></span>
              </h2>
              <p style={{ 
                fontSize: '1.25rem',
                color: '#6b7280',
                maxWidth: '48rem',
                margin: '1.5rem auto 0'
              }}>
                Don&apos;t take our word for it, hear what our users have to say
              </p>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '2rem'
            }}>
              {/* Testimonial 1 */}
              <TestimonialCard
                quote="ShopMeco made finding a reliable mechanic so easy. The service was excellent and the price was fair."
                author="James Wilson"
                role="Toyota Owner"
              />
              
              {/* Testimonial 2 */}
              <TestimonialCard
                quote="I love how I can track all my vehicle&apos;s maintenance history in one place. The reminders are a lifesaver!"
                author="Sarah Johnson"
                role="Honda Owner"
              />
              
              {/* Testimonial 3 */}
              <TestimonialCard
                quote="As a mechanic, ShopMeco has helped me connect with new customers and grow my business steadily."
                author="Michael Brown"
                role="Certified Mechanic"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <CtaSection />
      </main>
      
      {/* Footer */}
      <footer style={{ 
        backgroundColor: '#1e293b', 
        color: 'white', 
        padding: '4rem 0 2rem' 
      }}>
        <div style={{ 
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1rem'
        }}>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            marginBottom: '3rem'
          }}>
            {/* Company Info */}
            <div>
              <h3 style={{ 
                fontSize: '1.25rem',
                fontWeight: '600',
                marginBottom: '1.5rem',
                color: 'white'
              }}>ShopMeco</h3>
              <p style={{ 
                color: '#CBD5E1',
                marginBottom: '1.5rem',
                maxWidth: '20rem'
              }}>
                Connecting vehicle owners with the best service providers nationwide.
              </p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Link href="#" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  transition: 'background-color 0.2s'
                }}
                className="hover:bg-blue-500">
                  <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </Link>
                <Link href="#" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  transition: 'background-color 0.2s'
                }}
                className="hover:bg-blue-700">
                  <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"></path>
                  </svg>
                </Link>
                <Link href="#" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '9999px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  transition: 'background-color 0.2s'
                }}
                className="hover:bg-pink-600">
                  <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                  </svg>
                </Link>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 style={{ 
                fontSize: '1.25rem',
                fontWeight: '600',
                marginBottom: '1.5rem',
                color: 'white'
              }}>Quick Links</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li>
                  <InteractiveLink 
                    href="/about" 
                    defaultColor="#CBD5E1" 
                    hoverColor="#FFFFFF"
                    style={{ fontSize: '0.875rem', color: '#CBD5E1' }}
                  >
                    About Us
                  </InteractiveLink>
                </li>
                <li>
                  <InteractiveLink 
                    href="/services" 
                    defaultColor="#CBD5E1" 
                    hoverColor="#FFFFFF"
                    style={{ fontSize: '0.875rem', color: '#CBD5E1' }}
                  >
                    Our Services
                  </InteractiveLink>
                </li>
                <li>
                  <InteractiveLink 
                    href="/contact" 
                    defaultColor="#CBD5E1" 
                    hoverColor="#FFFFFF"
                    style={{ fontSize: '0.875rem', color: '#CBD5E1' }}
                  >
                    Contact Us
                  </InteractiveLink>
                </li>
                <li>
                  <InteractiveLink 
                    href="/register" 
                    defaultColor="#CBD5E1" 
                    hoverColor="#FFFFFF"
                    style={{ fontSize: '0.875rem', color: '#CBD5E1' }}
                  >
                    Join as Provider
                  </InteractiveLink>
                </li>
              </ul>
            </div>
            
            {/* Legal */}
            <div>
              <h3 style={{ 
                fontSize: '1.25rem',
                fontWeight: '600',
                marginBottom: '1.5rem',
                color: 'white'
              }}>Legal</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li>
                  <InteractiveLink 
                    href="/privacy" 
                    defaultColor="#CBD5E1" 
                    hoverColor="#FFFFFF"
                    style={{ fontSize: '0.875rem', color: '#CBD5E1' }}
                  >
                    Privacy Policy
                  </InteractiveLink>
                </li>
                <li>
                  <InteractiveLink 
                    href="/terms" 
                    defaultColor="#CBD5E1" 
                    hoverColor="#FFFFFF"
                    style={{ fontSize: '0.875rem', color: '#CBD5E1' }}
                  >
                    Terms of Service
                  </InteractiveLink>
                </li>
                <li>
                  <InteractiveLink 
                    href="/cookies" 
                    defaultColor="#CBD5E1" 
                    hoverColor="#FFFFFF"
                    style={{ fontSize: '0.875rem', color: '#CBD5E1' }}
                  >
                    Cookie Policy
                  </InteractiveLink>
                </li>
              </ul>
            </div>
            
            {/* Contact */}
            <div>
              <h3 style={{ 
                fontSize: '1.25rem',
                fontWeight: '600',
                marginBottom: '1.5rem',
                color: 'white'
              }}>Contact</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#CBD5E1', fontSize: '0.875rem' }}>
                  <svg style={{ width: '1.25rem', height: '1.25rem', flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>123 Main Street, City, Country</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#CBD5E1', fontSize: '0.875rem' }}>
                  <svg style={{ width: '1.25rem', height: '1.25rem', flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>info@shopmeco.com</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#CBD5E1', fontSize: '0.875rem' }}>
                  <svg style={{ width: '1.25rem', height: '1.25rem', flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+1 (555) 123-4567</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderTop: '1px solid rgba(203, 213, 225, 0.2)',
            paddingTop: '2rem'
          }} className="sm:flex-row sm:justify-between">
            <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginBottom: '1rem' }} className="sm:mb-0">
              © {new Date().getFullYear()} ShopMeco. All rights reserved.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <InteractiveLink 
                href="#" 
                defaultColor="#94a3b8" 
                hoverColor="#FFFFFF"
                style={{ fontSize: '0.75rem', color: '#94a3b8' }}
              >
                Privacy
              </InteractiveLink>
              <InteractiveLink 
                href="#" 
                defaultColor="#94a3b8" 
                hoverColor="#FFFFFF"
                style={{ fontSize: '0.75rem', color: '#94a3b8' }}
              >
                Terms
              </InteractiveLink>
              <InteractiveLink 
                href="#" 
                defaultColor="#94a3b8" 
                hoverColor="#FFFFFF"
                style={{ fontSize: '0.75rem', color: '#94a3b8' }}
              >
                Sitemap
              </InteractiveLink>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
