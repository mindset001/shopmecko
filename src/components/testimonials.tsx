'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  image: string;
}

const TestimonialCard = ({ quote, name, role, image }: TestimonialCardProps) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 h-full flex flex-col">
    <div className="mb-6">
      <svg 
        className="text-blue-500 h-8 w-8 mb-4" 
        fill="currentColor" 
        viewBox="0 0 24 24"
      >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
      <p className="text-gray-700 dark:text-gray-300">{quote}</p>
    </div>
    <div className="mt-auto flex items-center">
      <div className="h-12 w-12 rounded-full overflow-hidden relative mr-4">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div>
        <h4 className="font-bold">{name}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
      </div>
    </div>
  </div>
);

interface TestimonialsProps {
  testimonials?: TestimonialCardProps[];
  title?: string;
  subtitle?: string;
}

export default function Testimonials({ 
  testimonials, 
  title = "What Our Users Say",
  subtitle = "Don't just take our word for it - hear from the people who use ShopMeco every day"
}: TestimonialsProps) {
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      {
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    // Observe all elements with data-scroll attribute
    document.querySelectorAll('[data-scroll]').forEach((elem) => {
      if (observerRef.current) {
        observerRef.current.observe(elem);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Default testimonials if none are provided
  const defaultTestimonials: TestimonialCardProps[] = [
    {
      quote: "ShopMeco has completely changed how I maintain my vehicles. Finding reliable mechanics used to be a nightmare, but now it's just a few clicks away.",
      name: "Michael Johnson",
      role: "Vehicle Owner",
      image: "/hero-car-service.jpg"
    },
    {
      quote: "As a mechanic with my own shop, ShopMeco has helped me reach more customers and grow my business by 40% in just six months.",
      name: "Sarah Williams",
      role: "Service Provider",
      image: "/car-mechanic-service.jpg"
    },
    {
      quote: "My parts business has thrived since joining ShopMeco. The platform connects us directly with customers who need exactly what we sell.",
      name: "David Chen",
      role: "Parts Seller",
      image: "/car-parts.jpg"
    }
  ];

  const testimonialsToShow = testimonials || defaultTestimonials;

  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonialsToShow.map((testimonial, index) => (
            <div 
              key={`testimonial-${index + 1}`}
              id={`testimonial-${index + 1}`} 
              data-scroll
              ref={(el) => {
                if (el) elementsRef.current[index] = el;
              }}
              className={`transition-all duration-700 ${index > 0 ? `delay-${index * 150}` : ''} 
                ${isVisible[`testimonial-${index + 1}`] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <TestimonialCard
                quote={testimonial.quote}
                name={testimonial.name}
                role={testimonial.role}
                image={testimonial.image}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
