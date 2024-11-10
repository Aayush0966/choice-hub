import React from 'react';

function FeatureCard({ feature }: { feature: { icon: any; title: string; description: string } }) {
  return (
    <div className="group relative p-6 rounded-xl bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 hover:border-violet-500/50 dark:hover:border-violet-500/50 transition-all duration-300"
    >
      <div className="flex flex-col gap-4">
        <feature.icon className="w-8 h-8 text-violet-600 dark:text-violet-400" />
        <div>
          <h3 className="font-semibold text-zinc-900 dark:text-white mb-1">
            {feature.title}
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            {feature.description}
          </p>
        </div>
      </div>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-500/0 via-transparent to-fuchsia-500/0 group-hover:from-violet-500/10 group-hover:to-fuchsia-500/10 transition-all duration-300" />
    </div>
  );
}

export default FeatureCard;