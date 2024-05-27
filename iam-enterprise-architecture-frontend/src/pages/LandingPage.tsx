/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { Button, Typography, Card, CardBody, Input, Textarea } from '@material-tailwind/react';
import blackHawkArmy from '../assets/blackhawk-army.png';
import TeamMember1 from '../assets/Team-Member-1.png';
import TeamMember2 from '../assets/Team-Member-2.png';
import TeamMember3 from '../assets/Team-Member-3.png';
import '../style/landingPage.css'

const LandingPage = () => {
  return (

    <div>
      {/* Hero Section */}
      <section className="relative bg-cover bg-center h-screen" style={{ backgroundImage: `url(${blackHawkArmy})` }}>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="container mx-auto flex flex-col justify-center items-center h-full text-center relative z-10">
          <Typography variant="h1" className="text-5xl font-bold text-white">Your Safety, Our Priority</Typography>
          <Typography variant="lead" className="mt-4 text-xl text-white">Professional Security Solutions for Any Occasion</Typography>
          <div className="mt-8">
            <Button variant="gradient" color="white" className="m-2">Learn More</Button>
            <Button variant="gradient" color="white" className="m-2">Get Protected Now</Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="container mx-auto p-8">
        <Typography variant="h2" className="text-3xl font-bold text-center">Our Services</Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          <Card>
            <CardBody>
              <Typography variant="h3" className="text-xl font-bold mb-2">Personal Bodyguards</Typography>
              <Typography>VIP protection with a professional bodyguard.</Typography>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Typography variant="h3" className="text-xl font-bold mb-2">Event Security</Typography>
              <Typography>Secure events of any size.</Typography>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Typography variant="h3" className="text-xl font-bold mb-2">Residential Security</Typography>
              <Typography>Keep your home safe and secure.</Typography>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Typography variant="h3" className="text-xl font-bold mb-2">Corporate Security</Typography>
              <Typography>Ensure business safety and security.</Typography>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="bg-black bg-opacity-70 py-12">
        <div className="container mx-auto text-center">
          <Typography variant="h2" className="text-3xl font-bold text-white">About BlackHawk Security</Typography>
          <Typography className="mt-4 mx-52 text-white">We are a very diverse team of hardened security professionals. Look at how threatening we are. Not convinced? Well idk what to tell you.</Typography>
          <div className='flex'>
            <img src={TeamMember1} alt="BlackHawk Security Team" className="mx-auto mt-8 rounded-lg w-[150px] h-[150px]" />
            <img src={TeamMember2} alt="BlackHawk Security Team" className="mx-auto mt-8 rounded-lg w-[150px] h-[150px]" />
            <img src={TeamMember3} alt="BlackHawk Security Team" className="mx-auto mt-8 rounded-lg w-[150px] h-[150px]" />
            <img src={TeamMember2} alt="BlackHawk Security Team" className="mx-auto mt-8 rounded-lg w-[150px] h-[150px]" />
            <img src={TeamMember1} alt="BlackHawk Security Team" className="mx-auto mt-8 rounded-lg w-[150px] h-[150px]" />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="container mx-auto py-12">
        <Typography variant="h2" className="text-3xl font-bold text-center">What Our Clients Say</Typography>
        <div className="mt-8 flex gap-3">
          <Card className="bg-polka border p-6 rounded-lg w-1/3">
            <CardBody className='flex flex-col h-full'>
              <Typography className='italic p-1 bg-white rounded-md'>"Excellent service! They protected my son against terrorists! Highly recommend."</Typography>
              <Typography variant='h5' className="mt-auto bg-white rounded-md">Totally legitimate client 1</Typography>
            </CardBody>
          </Card>
          <Card className="bg-polka border p-6 rounded-lg w-1/3">
            <CardBody className='flex flex-col h-full'>
              <Typography className='italic bg-white rounded-md'>"If you need someone to be your bodyguard, these are the guys. They're so macho and strong and their masculine aura intimidates everyone."</Typography>
              <Typography variant='h5' className="mt-auto bg-white rounded-md">Totally legitimate client 2</Typography>
            </CardBody>
          </Card>
          <Card className="bg-polka border p-6 rounded-lg w-1/3">
            <CardBody className='flex flex-col h-full'>
              <Typography className='italic bg-white rounded-md'>"I hired them to guard the moon base. They're so dedicated to the job, they still haven't returned, even though we stop supplying them oxygen! 10/10!"</Typography>
              <Typography variant='h5' className="mt-4 bg-white rounded-md">Totally legitimate client 3</Typography>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="bg-black bg-opacity-70 py-12">
        <div className="container mx-auto text-center">
          <Typography variant="h2" className="text-3xl font-bold text-white">Get in Touch</Typography>
          <form className="mt-8 w-1/2 mx-auto">
            <div className="flex flex-col space-y-4">
              <Input type="text" placeholder="Name" className="p-4 rounded-lg bg-white bg-opacity-70 border border-gray-600 " />
              <Input type="email" placeholder="Email" className="p-4 rounded-lg bg-white bg-opacity-70 border border-gray-600" />
              <Input type="text" placeholder="Phone Number" className="p-4 rounded-lg bg-white bg-opacity-70 border border-gray-600" />
              <Textarea placeholder="Message" className="p-4 rounded-lg bg-white bg-opacity-70 border border-gray-600 " />
            </div>
            <Button type="submit" variant="gradient" color="black" className="mt-4">Send Message</Button>
          </form>
          <div className="mt-8">
            <Typography className='text-white'>Phone: (123) 456-7890</Typography>
            <Typography className='text-white'>Email: info@blackhawksecurity.com</Typography>
            <Typography className='text-white'>Address: 123 Security Lane, Safe City, ST 12345</Typography>
          </div>
          <div className="mt-8 w-fit mx-auto">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2486.3819716222993!2d5.477202276416863!3d51.45114301481187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c6d9bbf31bd8fb%3A0xbb209e5872fefac8!2sFontys%20R10!5e0!3m2!1sen!2snl!4v1716475915302!5m2!1sen!2snl" className='w-[300px] md:w-[600px] h-[225px] md:h-[450px]' style={{ border: 0 }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-6">
        <div className="container mx-auto text-center">
          <nav className="flex justify-center space-x-4 mb-4 text-white">
            <a href="#" className="hover:text-gray-400">Home</a>
            <a href="#services" className="hover:text-gray-400">Services</a>
            <a href="#about" className="hover:text-gray-400">About Us</a>
            <a href="#contact" className="hover:text-gray-400">Contact Us</a>
            <a href="#" className="hover:text-gray-400">Privacy Policy</a>
          </nav>
          <div className="flex justify-center space-x-4 mb-4 text-white">
            <a href="#" className="hover:text-gray-400">Twitter</a>
            <a href="#" className="hover:text-gray-400">LinkedIn</a>
            <a href="#" className="hover:text-gray-400">Instagram</a>
          </div>
          <Typography className='text-white'>© 2024 BlackHawk Security. All Rights Reserved.</Typography>
        </div>
      </footer>
    </div>
  )
};

export default LandingPage