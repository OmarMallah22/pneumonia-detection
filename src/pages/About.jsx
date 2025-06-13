import { Users, Award, Brain, Target, Code, Database } from 'lucide-react'

const About = () => {
const contributors = [
  { name: 'Omar Reda Sayed', role: 'Front-End Developer' },
  { name: 'Nahed Mortada Ali', role: 'AI Engineering' },
  { name: 'Aya Saleh Almasry', role: 'AI Engineering' },
  { name: 'Yousef Saad Mohamed', role: 'Back-End Developer' },
  { name: 'Esraa Eid Ahmed', role: 'AI Engineering' }
]
  const models = [
    {
      name: 'ResNet-80',
      description: 'Deep residual network with 80 layers, powerful for medical image diagnosis',
      accuracy: '92.1%'
    },
    {
      name: 'CNN',
      description: 'Convolutional neural network for extracting spatial features from images',
      accuracy: '94%'
    },
    {
      name: 'GoogleNet (Inception V1)',
      description: 'Deep convolutional network with inception modules for efficient feature extraction',
      accuracy: '89.7%'
    },
    {
      name: 'DenseNet-121',
      description: 'Densely connected network for enhanced representation and deeper learning',
      accuracy: '91.8%'
    }
  ]

  const technologies = [
    {
      icon: Brain,
      name: 'Deep Learning',
      description: 'Advanced neural networks trained on medical imaging datasets'
    },
    {
      icon: Database,
      name: 'Medical Data',
      description: 'Trained on thousands of chest X-ray images from medical databases'
    },
    {
      icon: Target,
      name: 'High Accuracy',
      description: 'Achieving over 94% accuracy in pneumonia classification tasks'
    },
    {
      icon: Code,
      name: 'Production Ready',
      description: 'Built with modern technologies and medical-grade standards'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Our System
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Learn about the advanced AI technology and dedicated team behind the 
            Chest Pneumonia Detection System, designed specifically for healthcare professionals.
          </p>
        </div>

        {/* How It Works */}
        <div className="mb-20">
          <div className="card">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                How Our AI Works
              </h2>
              <p className="text-lg text-gray-600">
                Our system uses state-of-the-art deep learning models to analyze chest X-rays
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-600">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Image Processing</h3>
                <p className="text-gray-600">
                  Your chest X-ray is preprocessed and normalized to match our training data format
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-600">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Analysis</h3>
                <p className="text-gray-600">
                  Multiple deep learning models analyze the image to detect pneumonia patterns
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-primary-600">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Results</h3>
                <p className="text-gray-600">
                  Classification results with confidence scores are returned instantly
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Models */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              AI Models Used
            </h2>
            <p className="text-lg text-gray-600">
              Our system leverages multiple state-of-the-art deep learning architectures
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {models.map((model, index) => (
              <div key={index} className="card hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {model.name}
                  </h3>
                  <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
                    {model.accuracy}
                  </span>
                </div>
                <p className="text-gray-600">
                  {model.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Technology Stack
            </h2>
            <p className="text-lg text-gray-600">
              Built with cutting-edge technologies for reliability and performance
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {technologies.map((tech, index) => {
              const Icon = tech.icon
              return (
                <div key={index} className="card text-center hover:shadow-lg transition-shadow duration-300">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {tech.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {tech.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Contributors */}
        <div className="mb-20">
          <div className="card">
            <div className="text-center mb-8">
              <Users className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full p-4 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Development Team
              </h2>
              <p className="text-lg text-gray-600">
                Meet the dedicated team behind this medical AI system
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {contributors.map((contributor, index) => (
  <div key={index} className="bg-gray-50 rounded-lg p-4 text-center">
    <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-3">
      <span className="text-white font-bold text-lg">
        {contributor.name.split(' ').map(name => name[0]).join('')}
      </span>
    </div>
    <h3 className="font-semibold text-gray-900">
      {contributor.name}
    </h3>
    <p className="text-sm text-gray-600">{contributor.role}</p>
  </div>
))}

            </div>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <div className="card bg-yellow-50 border-yellow-200">
          <div className="flex items-start space-x-4">
            <Award className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Medical Disclaimer
              </h3>
              <p className="text-gray-700 leading-relaxed">
                This AI system is designed to assist healthcare professionals in medical diagnosis. 
                It should not be used as a substitute for professional medical judgment, diagnosis, 
                or treatment. Always consult with qualified healthcare providers for medical decisions. 
                The system is intended for educational and assistive purposes in clinical settings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About