import { useNavigate } from "react-router-dom";


const Header = () => {
    const navigate = useNavigate();

    return (
        <header>
            <div className="navbar-container">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                    <div className="bg-indigo-600 p-2 rounded-xl">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold text-gray-900 tracking-tight">BigFloppaCRM</span>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                    <a href="#features" className="text-sm font-medium text-gray-500 hover:text-gray-900">Features</a>
                    <a href="#pricing" className="text-sm font-medium text-gray-500 hover:text-gray-900">Pricing</a>
                    <a href="#about" className="text-sm font-medium text-gray-500 hover:text-gray-900">About</a>
                    </div>
                    <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate('/login')}
                        className="text-sm font-bold text-gray-600 hover:text-indigo-600 px-4"
                    >
                        Sign in
                    </button>
                    <button 
                        onClick={() => navigate('/register')}
                        className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all"
                    >
                        Get Started
                    </button>
                    </div>
                </nav>
            </div>
        </header>
    )
}
export default Header;