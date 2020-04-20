import React, { useState } from 'react';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Fake Form Submitted:', email);
    setIsSubmitted(true);
    setEmail('');
  };

  if (isSubmitted) return <ThankYouMessage />;

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="w-full mb-16 p-16 bg-white text-cyan rounded-lg outline-none focus:shadow-outline"
        placeholder="Email Address"
      />
      <div className="text-right">
        <button type="submit" className="btn-primary rounded-lg">
          Subscribe
        </button>
      </div>
    </form>
  );
};

const ThankYouMessage = () => (
  <div className="w-full p-32 text-center">
    <h2>Thank you!</h2>
  </div>
);

export default NewsletterForm;
