{/* Testimonials Section */}
<section className="py-20 bg-white dark:bg-gray-950">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
      <p className="text-xl text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
        Don&apos;t just take our word for it - hear from the people who use ShopMeco every day
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div 
        id="testimonial-1" 
        data-scroll
        className={`transition-all duration-700 ${isVisible['testimonial-1'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <TestimonialCard
          quote="ShopMeco has completely changed how I maintain my vehicles. Finding reliable mechanics used to be a nightmare, but now it&apos;s just a few clicks away."
          name="Michael Johnson"
          role="Vehicle Owner"
          image="/hero-car-service.jpg"
        />
      </div>
      
      <div 
        id="testimonial-2" 
        data-scroll
        className={`transition-all duration-700 delay-150 ${isVisible['testimonial-2'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <TestimonialCard
          quote="As a mechanic with my own shop, ShopMeco has helped me reach more customers and grow my business by 40% in just six months."
          name="Sarah Williams"
          role="Service Provider"
          image="/car-mechanic-service.jpg"
        />
      </div>
      
      <div 
        id="testimonial-3" 
        data-scroll
        className={`transition-all duration-700 delay-300 ${isVisible['testimonial-3'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <TestimonialCard
          quote="My parts business has thrived since joining ShopMeco. The platform connects us directly with customers who need exactly what we sell."
          name="David Chen"
          role="Parts Seller"
          image="/car-parts.jpg"
        />
      </div>
    </div>
  </div>
</section>
