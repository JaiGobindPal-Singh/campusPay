import {useState, useEffect} from 'react'

const HandleFailedPayment = () => {
     return (
          <div>
               <div className='absolute min-w-screen min-h-screen bg-black/35 flex items-center justify-center'>
                    <div className="relative z-10 bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
                         <div className="flex flex-col items-center">
                              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                                   <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                   </svg>
                              </div>
                              <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Failed</h2>
                              <p className="text-gray-600 mb-6">We couldn't process your payment. Please try again or use a different payment method.</p>
                              <button
                                   className="px-6 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
                                   onClick={() => window.location.href = '/checkout'}
                              >
                                   Try Again
                              </button>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default HandleFailedPayment
