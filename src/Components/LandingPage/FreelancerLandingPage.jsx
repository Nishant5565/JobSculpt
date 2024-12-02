import React from 'react';
import api_call from '../../Functions/api_call';
import { useState, useEffect } from 'react';

const FreelancerLandingPage = () => {

     const [user, setUser] = useState();
     const { authuser } = api_call();

     const token = localStorage.getItem('token');

     const fetchUser = async () => {
          const response = await authuser();
          setUser(response);
     };

     useEffect(() => { fetchUser(); }, []);  

    return (
        <div className="min-h-screen bg-gradient-to-b pt-20 from-green-200 to-green-50 flex flex-col items-center">
            {/* Hero Section */}
            <div className="max-w-5xl mx-auto p-12 bg-white shadow-2xl rounded-3xl mt-12 mb-10 text-center">
                <h1 className="text-5xl font-extrabold text-green-700 mb-6 leading-tight">
                    Welcome, {user?.name}!
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    Discover and apply for the best projects to showcase your skills and grow your career.
                </p>
                <button className="bg-green-600 text-white px-8 py-4 rounded-full shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105 text-lg">
                    Get Started
                </button>
            </div>

            {/* Features Section */}
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 px-8">
                {[
                    {
                        title: "Find Quality Projects",
                        description: "Browse through a variety of projects that match your skills and interests.",
                        icon: "🔍"
                    },
                    {
                        title: "Seamless Collaboration",
                        description: "Work with clients effortlessly using our integrated communication tools.",
                        icon: "🤝"
                    },
                    {
                        title: "Timely Payments",
                        description: "Receive payments securely and on time for your hard work.",
                        icon: "💰"
                    },
                ].map((feature, index) => (
                    <div
                        key={index}
                        className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow">
                        <div className="text-5xl mb-6">{feature.icon}</div>
                        <h3 className="text-2xl font-semibold text-green-600 mb-4">{feature.title}</h3>
                        <p className="text-gray-600 text-lg">{feature.description}</p>
                    </div>
                ))}
            </div>

            {/* Testimonials Section */}
            <div className="max-w-5xl mx-auto mt-16 mb-12 px-8">
                <h2 className="text-4xl font-bold text-green-600 text-center mb-12">
                    What Freelancers Say
                </h2>
                <div className="space-y-8">
                    {[
                        {
                            feedback: "This platform has connected me with amazing clients and projects. Highly recommend!",
                            name: "Alex P.",
                            role: "Web Developer"
                        },
                        {
                            feedback: "I've been able to grow my freelance career significantly thanks to this platform.",
                            name: "Maria L.",
                            role: "Graphic Designer"
                        },
                        {
                            feedback: "The payment system is reliable and the projects are top-notch.",
                            name: "James T.",
                            role: "Content Writer"
                        },
                    ].map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-shadow">
                            <p className="text-gray-700 italic text-lg mb-6">
                                "{testimonial.feedback}"
                            </p>
                            <div className="font-semibold text-green-700 text-xl">{testimonial.name}</div>
                            <div className="text-gray-500 text-sm">{testimonial.role}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Call to Action Section */}
            <div className="bg-green-700 text-white py-12 w-full flex flex-col items-center rounded-t-3xl">
                <h3 className="text-4xl font-bold mb-6">Ready to Find Your Next Project?</h3>
                <p className="text-lg mb-8 max-w-3xl text-center leading-relaxed">
                    Join thousands of freelancers finding quality projects and growing their careers. Start your journey today.
                </p>
                <button className="bg-white text-green-700 px-8 py-4 rounded-full shadow-lg hover:bg-gray-100 transition-transform transform hover:scale-105 text-lg">
                    Browse Projects Now
                </button>
            </div>
        </div>
    );
};

export default FreelancerLandingPage;