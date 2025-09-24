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
import HowItWorksSection from "@/components/ui/how-it-works-section";
import SimpleHeroSection from "@/components/ui/simple-hero-section";
import TailwindTest from "@/components/tailwind-test";
import { Footer } from "@/components/ui/footer";
import { Header } from "@/components/ui/header";
import EnhancedHeroSection from "@/components/ui/enhanced-hero-section";

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Header Component */}
      <Header />
      
      {/* Spacer to prevent content from hiding under fixed header */}
      <div style={{ height: '4rem' }}></div>

      <main style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
        {/* Simple Hero Section without the header */}
        <div style={{ marginTop: '-4rem' }}>
          <SimpleHeroSection />
        </div>

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
        <HowItWorksSection />

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
      <Footer />
    </div>
  );
}
