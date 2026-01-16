const MainStart = () => {
    return (
        <div>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 flex flex-col items-center text-center animate-fadeIn">
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight max-w-4xl leading-[1.1]">
          The smartest way to manage <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            business relationships.
          </span>
        </h1>
        <p className="mt-8 text-xl text-gray-500 max-w-2xl leading-relaxed">
          Streamline your sales pipeline.
        </p>
        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <button 
            className="px-8 py-4 bg-indigo-600 text-white rounded-2xl text-lg font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all"
          >
            Start for free
          </button>
          <button className="px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-2xl text-lg font-bold hover:bg-gray-50 transition-all">
            Book a demo
          </button>
        </div>

        <div className="mt-20 w-full max-w-5xl rounded-3xl border border-gray-200 shadow-2xl overflow-hidden bg-white p-2">
          <div className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden aspect-[16/9] flex items-center justify-center relative">
             <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:20px_20px]"></div>
             <img 
        src="/bigfloppa.jpeg" 
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-50" 
      />
             
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-3 gap-12 text-center">
          <div>
            <p className="text-3xl font-extrabold text-indigo-600">0</p>
            <p className="text-sm font-medium text-gray-500 mt-2 uppercase tracking-widest">Active Users</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-indigo-600">99.9%</p>
            <p className="text-sm font-medium text-gray-500 mt-2 uppercase tracking-widest">Uptime Rate</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold text-indigo-600">0/7</p>
            <p className="text-sm font-medium text-gray-500 mt-2 uppercase tracking-widest">Live Support</p>
          </div>
        </div>
      </section>
    </div>
    )
}
export default MainStart;