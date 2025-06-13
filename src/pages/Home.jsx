import { Link } from "react-router-dom";
import { Upload, Activity, Shield, Zap, Users, Award } from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: Upload,
      title: "Easy Upload",
      description: "Drag and drop chest X-ray images for instant analysis",
    },
    {
      icon: Activity,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning models trained on medical data",
    },
    {
      icon: Shield,
      title: "Medical Grade",
      description: "Professional-grade accuracy for healthcare environments",
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get diagnosis results with confidence scores in seconds",
    },
  ];

  const stats = [
    { label: "Accuracy Rate", value: "94%" },
    { label: "Models Trained", value: "2+" },
    { label: "Classifications", value: "4" },
    { label: "Response Time", value: "<3s" },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="medical-gradient">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Chest Pneumonia
                <br />
                <span className="text-blue-200">Detection System</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Advanced AI-powered analysis of chest X-rays to detect and
                classify pneumonia with professional-grade accuracy for
                healthcare professionals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/diagnosis"
                  className="bg-white text-primary-600 hover:bg-gray-50 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Start Diagnosis
                </Link>
                <Link
                  to="/about"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 inline-flex items-center justify-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="relative">
          <svg viewBox="0 0 1200 120" className="w-full h-12 fill-primary-600">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our System?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built specifically for healthcare professionals with cutting-edge
              AI technology and medical-grade accuracy standards.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="card text-center hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Classification Types */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Detection Capabilities
            </h2>
            <p className="text-xl text-gray-600">
              Our AI system can accurately classify chest X-rays into four
              categories
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Normal
              </h3>
              <p className="text-gray-600">
                Healthy chest X-rays with no signs of pneumonia or lung
                infection
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Lung-Opacity Pneumonia
              </h3>
              <p className="text-gray-600">
                Detection of Lung-Opacity infections causing pneumonia in lung
                tissue
              </p>
            </div>
            <div className="card text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                COVID Pneumonia
              </h3>
              <p className="text-gray-600">
                Detection of COVID-19 infections causing pneumonia
              </p>
            </div>

            <div className="card text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Viral Pneumonia
              </h3>
              <p className="text-gray-600">
                Identification of viral infections affecting respiratory system
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Start Analyzing?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Upload your chest X-ray images and get instant AI-powered diagnosis
            results with confidence scores.
          </p>
          <Link
            to="/diagnosis"
            className="btn-primary text-lg inline-flex items-center"
          >
            <Upload className="w-5 h-5 mr-2" />
            Upload X-Ray Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
