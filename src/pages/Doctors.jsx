import { useState, useEffect } from "react";
import { MapPin, Phone, Mail, User, Search, Filter } from "lucide-react";
import axios from "axios";

const Doctors = () => {
  const [selectedGovernorate, setSelectedGovernorate] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const egyptianGovernorates = [
    { value: "الجيزة", label: "Giza" },
    { value: "القاهرة", label: "Cairo" },
    { value: "الاسكندرية", label: "Alexandria" },
    { value: "الشرقية", label: "Sharkia" },
    { value: "المنيا", label: "Minya" },
    { value: "الوادي الجديد", label: "New Valley" },
    { value: "الفيوم", label: "Faiyum" },
    { value: "المنوفية", label: "Menoufia" },
    { value: "الغربية", label: "Gharbia" },
    { value: "الشرقيه", label: "Sharkia" },
    { value: "الدمياط", label: "Dakahlia" },
    { value: "البحر الأحمر", label: "Red Sea" },
    { value: "السنبلاوين", label: "Sohag" },
    { value: "الاسماعيلية", label: "Ismailia" },
    { value: "كفر الشيخ", label: "Kafr el-Sheikh" },
    { value: "Port Said", label: "Port Said" },
    { value: "السويس", label: "Suez" },
    { value: "الاقصر", label: "Luxor" },
    { value: "اسيوط", label: "Asyut" },
    { value: "البحيرة", label: "Beheira" },
    { value: "مرسى مطروح", label: "Matruh" },
    { value: "المنيا", label: "Minya" },
    { value: "الوادي الجديد", label: "New Valley" },
    { value: "شمال سيناء", label: "North Sinai" },
    { value: "جنوب سيناء", label: "South Sinai" },
  ];

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      const { data } = await axios.get(
        `https://chestcancerdetection.runasp.net/api/Doctor/GetAllDoctor`
      );

      console.log("Fetched doctors data:", data);

      setDoctors(data);
      setLoading(false);
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    let filtered = doctors;

    // Filter by governorate
    if (selectedGovernorate) {
      filtered = filtered.filter(
        (doctor) => doctor.country === selectedGovernorate
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.specialization
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          doctor.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredDoctors(filtered);
  }, [selectedGovernorate, searchTerm, doctors]);

  const handleGovernorateChange = (e) => {
    setSelectedGovernorate(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearFilters = () => {
    setSelectedGovernorate("");
    setSearchTerm("");
  };

  const getSpecialtyColor = (specialization) => {
    if (specialization.includes("Consultant")) {
      return "bg-blue-100 text-blue-800";
    } else if (specialization.includes("Professor")) {
      return "bg-purple-100 text-purple-800";
    } else if (specialization.includes("Specialist")) {
      return "bg-green-100 text-green-800";
    } else {
      return "bg-orange-100 text-orange-800";
    }
  };

  const formatPhoneNumber = (phone) => {
    // Format Egyptian phone numbers for display
    if (phone.startsWith("01")) {
      return `+20 ${phone}`;
    } else if (phone.startsWith("02") || phone.startsWith("03")) {
      return `+20 ${phone}`;
    }
    return phone;
  };

  const getRandomImage = (id) => {
    // Generate consistent random images based on doctor ID
    const images = [
      "https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      "https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      "https://images.pexels.com/photos/5452274/pexels-photo-5452274.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    ];
    return images[id % images.length];
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Search for Doctors in Egypt
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find qualified doctors specializing in chest and respiratory
            diseases across all Egyptian governorates
          </p>
        </div>
        {/* Filters */}
        <div className="card mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Governorate Filter */}
            <div>
              <label
                htmlFor="governorate"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                <MapPin className="w-4 h-4 inline mr-1" />
                Choose Governorate
              </label>
              <select
                id="governorate"
                value={selectedGovernorate}
                onChange={handleGovernorateChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">All Governorates</option>
                {egyptianGovernorates.map(({ label, value }) => (
                  <option key={label} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            {/* Search Filter */}
            <div>
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                <Search className="w-4 h-4 inline mr-1" />
                Search Doctors
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search by name, specialty, or location..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            {/* Clear Filters */}
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full btn-secondary inline-flex items-center justify-center"
              >
                <Filter className="w-4 h-4 mr-2" />
                Clear Filters
              </button>
            </div>
          </div>
          {/* }; */}
          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              {loading
                ? "Loading..."
                : `Found ${filteredDoctors.length} doctor(s)`}
              {selectedGovernorate && ` in ${selectedGovernorate}`}
            </p>
          </div>
        </div>
        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="loading-spinner w-8 h-8 border-4 border-primary-200 border-t-primary-600 rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Loading doctor data...</p>
          </div>
        )}
        {/* No Results */}
        {!loading && filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No Doctors Found
            </h3>
            <p className="text-gray-600 mb-4">
              {selectedGovernorate || searchTerm
                ? "Try adjusting your search criteria or selecting a different governorate."
                : "No doctors are currently available in the database."}
            </p>
            {(selectedGovernorate || searchTerm) && (
              <button onClick={clearFilters} className="btn-primary">
                Clear Filters
              </button>
            )}
          </div>
        )}
        {/* Doctors Grid */}
        {!loading && filteredDoctors.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="card hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start space-x-4 mb-4">
                  <img
                    src={getRandomImage(doctor.id)}
                    alt={doctor.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-tight">
                      {doctor.name}
                    </h3>
                    <span
                      className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 ${getSpecialtyColor(
                        doctor.specialization
                      )}`}
                    >
                      {doctor.specialization}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{doctor.location}</span>
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                    <span>{formatPhoneNumber(doctor.phoneNumber)}</span>
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="truncate">{doctor.email}</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <a
                      href={`tel:${doctor.phoneNumber}`}
                      className="flex-1 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium py-2 px-3 rounded-md transition-colors inline-flex items-center justify-center"
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </a>
                    <a
                      href={`mailto:${doctor.email}`}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium py-2 px-3 rounded-md transition-colors inline-flex items-center justify-center"
                    >
                      <Mail className="w-4 h-4 mr-1" />
                      Email
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Information Panel */}
        <div className="mt-12 card bg-blue-50 border-blue-200">
          <div className="flex items-start space-x-3">
            <MapPin className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">
                About the Doctor Network
              </h4>
              <p className="text-gray-700 text-sm">
                Our platform connects you with qualified doctors in all Egyptian
                governorates specializing in chest and respiratory diseases. All
                listed doctors are certified and have experience in diagnosing
                and treating pneumonia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
