'use client'
import { CopyMinus } from 'lucide-react'
import { Share2 } from 'lucide-react'
import { Link } from 'lucide-react'
import React, { useState } from 'react'
import { RWebShare } from "react-web-share";

function ShareCard({pollId} : {pollId:string}) {
    const [copied, setCopied] = useState<boolean>(false)
    const pollUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/vote/${pollId}`

    const handleCopy = async () => {
        await navigator.clipboard.writeText(pollUrl); 
        setTimeout(() => {
            setCopied(false)
        }, 4000);
        setCopied(true)
    }

  return (
        <div className="w-full  mx-auto bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-lg ring-1 ring-zinc-200 dark:ring-zinc-800">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0 mb-4">
              <div className="flex items-center gap-3">
                <Link className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                <h2 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-white">Share Your Poll</h2>
              </div>
              <div className="flex items-center gap-2">
                <RWebShare
                  data={{
                    text: "Vote now",
                    title: "Choice Hub",
                    url: pollUrl,
                  }}
                >
                  <button className="p-2 rounded-lg hover:bg-violet-50 dark:hover:bg-violet-900/50 text-violet-600 dark:text-violet-400 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </RWebShare>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 bg-zinc-50 dark:bg-zinc-800/50 px-3 sm:px-4 py-2 rounded-lg text-zinc-600 dark:text-zinc-300 font-mono text-xs sm:text-sm border border-zinc-200 dark:border-zinc-700 truncate">
                {pollUrl}
              </div>
              <button 
                onClick={handleCopy} 
                className="group px-4 py-2 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <CopyMinus className="w-4 h-4" />
                {copied? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>  )
}

export default ShareCard