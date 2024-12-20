import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Vote, Users, BarChart3, CheckCircle2 } from 'lucide-react';
import { BackgroundLines } from './ui/background-lines';
import logo from "@/public/logo.png"
import GithubButton from "@/components/ui/GithubButton"
import FeatureCard from './FeatureCard';
import ThemeToggle from './ui/ThemeToggle';

const HeroSection = () => {
  const features = [
    {
      icon: Vote,
      title: "Quick Polls",
      description: "Create and share polls in seconds"
    },
    {
      icon: Users,
      title: "Team Decisions",
      description: "Collaborate with your team effectively"
    },
    {
      icon: BarChart3,
      title: "Real-time Results",
      description: "Watch responses flow in instantly"
    },
    {
      icon: CheckCircle2,
      title: "Smart Analytics",
      description: "Gain insights from voting patterns"
    }
  ]

  return (
    <BackgroundLines className="relative min-h-screen h-full bg-[#D9D9D9] dark:bg-black">
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0">
        <div className="absolute w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-100/20 via-transparent to-fuchsia-100/20 dark:from-violet-900/10 dark:to-fuchsia-900/10"></div>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation */}
        <nav className="pt-4 sm:pt-6 lg:pt-8 flex items-center justify-between">
          <Link href='/' className="flex items-center">
            <Vote className="w-16 h-12 sm:w-24 sm:h-16 lg:w-32 lg:h-20 text-black dark:text-white" />
            <h2 className="uppercase text-xl sm:text-2xl lg:text-3xl p-2 sm:p-4 lg:p-6 font-semibold text-zinc-900 dark:text-white tracking-tight">
              Choice Hub
            </h2>
          </Link>
          
          <ThemeToggle />
        </nav>

        {/* Hero Content */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 lg:gap-16 pt-8 sm:pt-16 lg:pt-32 pb-12 sm:pb-16 lg:pb-24">
          {/* Left Column */}
          <div className="flex-1 max-w-xl w-full text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 lg:mb-8 text-zinc-900 dark:text-white tracking-tight leading-tight">
              Transform Your
              <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400">
                Decision Making
              </span>
            </h1>

            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 mb-6 sm:mb-8 lg:mb-10 max-w-md mx-auto lg:mx-0">
              Create elegant polls that inspire meaningful engagement and drive results.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/poll" className="group inline-flex items-center justify-center px-6 py-3 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all duration-200">
                Create Your Poll
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <GithubButton />
            </div>
          </div>

          {/* Right Column - Feature Grid */}
          <div className="flex-1 w-full max-w-xl mt-8 lg:mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {features.map((feature, index) => (
                <FeatureCard key={index} feature={feature} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </BackgroundLines>
  );
};

export default HeroSection;