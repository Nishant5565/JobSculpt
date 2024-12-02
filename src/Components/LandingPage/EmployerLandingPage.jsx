import React from 'react';
import api_call from '../../Functions/api_call';
import { useState, useEffect } from 'react';

const EmployerLandingPage = () => {

     const [user, setUser] = useState();
     const { authuser } = api_call();

     const token = localStorage.getItem('token');

     const fetchUser = async () => {
          const response = await authuser();
          setUser(response);
     };

     useEffect(() => { fetchUser(); }, []);  

    return (
        <div className="min-h-screen bg-gradient-to-b pt-20 from-teal-200 to-teal-50 flex flex-col items-center">
            {/* Hero Section */}
            <div className="max-w-5xl mx-auto p-12 bg-white shadow-2xl rounded-3xl mt-12 mb-10 text-center">
                <h1 className="text-5xl font-extrabold text-teal-700 mb-6 leading-tight">
                    Welcome, {user?.name}!
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    Discover and collaborate with the best freelancers to bring your vision to life. Experience seamless hiring and project management.
                </p>
                <button className="bg-teal-600 text-white px-8 py-4 rounded-full shadow-lg hover:bg-teal-700 transition-transform transform hover:scale-105 text-lg">
                    Get Started
                </button>
            </div>

            {/* Features Section */}
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 px-8">
                {[
                    {
                        title: "Access Global Talent",
                        description: "Connect with skilled freelancers worldwide to match your project needs.",
                        icon: "🌍"
                    },
                    {
                        title: "Streamlined Hiring",
                        description: "Post jobs and manage proposals effortlessly in one streamlined platform.",
                        icon: "🚀"
                    },
                    {
                        title: "Secure Payments",
                        description: "Ensure secure transactions with our trusted payment gateway.",
                        icon: "💳"
                    },
                ].map((feature, index) => (
                    <div
                        key={index}
                        className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow">
                        <div className="text-5xl mb-6">{feature.icon}</div>
                        <h3 className="text-2xl font-semibold text-teal-600 mb-4">{feature.title}</h3>
                        <p className="text-gray-600 text-lg">{feature.description}</p>
                    </div>
                ))}
            </div>

            {/* Testimonials Section */}
            <div className="max-w-5xl mx-auto mt-16 mb-12 px-8">
                <h2 className="text-4xl font-bold text-teal-600 text-center mb-12">
                    What Employers Say
                </h2>
                <div className="space-y-8">
                    {[
                        {
                            feedback: "This platform revolutionized the way we hire freelancers. The process is simple and efficient!",
                            name: "Sarah M.",
                            role: "Project Manager"
                        },
                        {
                            feedback: "I've found the best developers here. Highly recommend it to any business owner.",
                            name: "John D.",
                            role: "Entrepreneur"
                        },
                        {
                            feedback: "Great experience! The security and ease of use make it my go-to hiring platform.",
                            name: "Emily R.",
                            role: "Marketing Lead"
                        },
                    ].map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow">
                            <p className="text-gray-700 italic text-lg mb-6">
                                "{testimonial.feedback}"
                            </p>
                            <div className="font-semibold text-teal-700 text-xl">{testimonial.name}</div>
                            <div className="text-gray-500 text-sm">{testimonial.role}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Call to Action Section */}
            <div className="bg-teal-700 text-white py-12 w-full flex flex-col items-center rounded-t-3xl">
                <h3 className="text-4xl font-bold mb-6">Ready to Find Your Perfect Freelancer?</h3>
                <p className="text-lg mb-8 max-w-3xl text-center leading-relaxed">
                    Join thousands of employers connecting with top talent. Simplify your hiring process and unlock new possibilities today.
                </p>
                <button className="bg-white text-teal-700 px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-105 text-lg">
                    Post a Job Now
                </button>
            </div>
        </div>
    );
};

export default EmployerLandingPage;
