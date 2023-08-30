import React from 'react'
import './FeaturedPage.css'
import HeaderBar from "../HeaderBar/HeaderBar";

export default function FeaturedPage() {
  return (<>
     <div className="flex flex-col h-screen App">
     <HeaderBar/>
     <div className='mt-4 featured-container'>
            <h2>Featured</h2>
            <h4>View community nodes</h4>
            <div className='mt-2 ml-8 featured-buttons'>
              <button className='mr-4 underline'>Trending</button>
              <button className='mr-4 underline'>Latest</button>
              <button className='mr-4 underline'>Popular</button>
            </div>
            <div className='flex flex-col items-center featured-nodes-homepage'>
              <div className='featured-top'>
                  Featured Spotlight text 1
              </div>
              <div className='featured-bottom'>
                  Featured Spotlight text 2
              </div>
            </div>
          </div>  

        </div>
   
    </>
  )
}

