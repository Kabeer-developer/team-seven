import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form);
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-20 w-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl mb-6">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7.5a2.25 2.25 0 01-4.496.504l-.4-.8a2.25 2.25 0 00-4.008 0l-.4.8A2.25 2.25 0 015 7.5v9a2.25 2.25 0 002.25 2.25H19A2.25 2.25 0 0021 16.5v-9zM9.75 8.25h4.5m-4.5 3h4.5m0 0v4.5m0-4.5H9.75M9.75 15h4.5" />
            </svg>
          </div>
          <h2 className="mt-6 text-center text-3xl md:text-4xl font-black text-gray-900">
            Create Account
          </h2>
          <p className="mt-2 text-center text-lg text-gray-600 max-w-sm mx-auto">
            Join our community in just a few seconds
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 space-y-6 border border-white/50">
          {error && (
            <div className="bg-gradient-to-r from-rose-500/10 to-pink-500/10 border border-rose-200/50 rounded-2xl p-4">
              <p className="text-rose-700 font-semibold text-center">{error}</p>
            </div>
          )}
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
              Full Name
            </label>
            <input
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white/50 backdrop-blur-sm shadow-inner focus:ring-4 focus:ring-indigo-200/50 focus:border-indigo-400 text-lg placeholder-gray-500 transition-all duration-300 hover:border-gray-300"
              placeholder="John Doe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white/50 backdrop-blur-sm shadow-inner focus:ring-4 focus:ring-indigo-200/50 focus:border-indigo-400 text-lg placeholder-gray-500 transition-all duration-300 hover:border-gray-300"
              placeholder="john@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
              Password
            </label>
            <input
              type="password"
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white/50 backdrop-blur-sm shadow-inner focus:ring-4 focus:ring-indigo-200/50 focus:border-indigo-400 text-lg placeholder-gray-500 transition-all duration-300 hover:border-gray-300"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              minLength="6"
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-700 hover:via-purple-700 hover:to-indigo-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-black text-xl py-5 px-8 rounded-3xl shadow-2xl hover:shadow-3xl hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 flex items-center justify-center space-x-3"
          >
            {loading ? (
              <>
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                <span>Join Now</span>
              </>
            )}
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">Sign in</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;