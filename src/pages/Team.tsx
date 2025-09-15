import {
  Linkedin,
  Mail,
  Award,
  Users,
  Target,
  Heart,
  Star,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";
import { motion } from "framer-motion";

const Team = () => {
  const teamMembers = [
    {
      name: "Hukam Chand Gupta",
      position: "Director",
      image: "/images/Hukam Chand Gupta.jpeg",
      bio: "Visionary leader with extensive experience in international trade and agricultural exports. Passionate about connecting India's finest products to global markets and building sustainable business relationships.",
      experience: "25+ years",
      expertise: [
        "International Trade",
        "Strategic Planning",
        "Business Development",
        "Agricultural Exports",
      ],
      linkedin: "https://www.linkedin.com/in/the-exim-overseas-3a726635a",
      instagram:
        "https://www.instagram.com/the11exim/?utm_source=qr&igsh=NXFjc2wybzZvZXBr#",
      youtube: "https://www.youtube.com/@THE11EXIMOVERSEAS-t1n",
      facebook: "https://www.facebook.com/the11eximoverseas",
      twitter: "https://www.twitter.com/the11exim",
      email: "hukam@the11eximoverseas.com",
      achievements: [
        "Established global trade network",
        "Led successful export operations",
        "Industry leadership recognition",
      ],
    },
    {
      name: "Yawal Gupta",
      position: "Director",
      image: "/images/Yawal Gupta.jpeg",
      bio: "Dynamic leader specializing in modern trade practices and digital transformation of export-import operations. Committed to innovation and excellence in international business.",
      experience: "15+ years",
      expertise: [
        "Digital Trade Solutions",
        "Export Operations",
        "Client Relations",
        "Market Development",
      ],
      linkedin: "https://www.linkedin.com/in/the-exim-overseas-3a726635a",
      instagram:
        "https://www.instagram.com/the11exim/?utm_source=qr&igsh=NXFjc2wybzZvZXBr#",
      youtube: "https://www.youtube.com/@THE11EXIMOVERSEAS-t1n",
      facebook: "https://www.facebook.com/the11eximoverseas",
      twitter: "https://www.twitter.com/the11exim",
      email: "yawal@the11eximoverseas.com",
      achievements: [
        "Modernized trade processes",
        "Expanded market reach",
        "Technology integration success",
      ],
    },
  ];

  const values = [
    {
      icon: Target,
      title: "Excellence",
      description:
        "We strive for excellence in every aspect of our business, from product quality to customer service.",
    },
    {
      icon: Heart,
      title: "Integrity",
      description:
        "We conduct business with honesty, transparency, and ethical practices in all our dealings.",
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "We believe in the power of teamwork and collaboration to achieve common goals and success.",
    },
    {
      icon: Award,
      title: "Innovation",
      description:
        "We continuously innovate and adapt to meet the evolving needs of global markets.",
    },
  ];

  const stats = [
    { label: "Team Members", value: "2", icon: Users },
    { label: "Years Combined Experience", value: "40+", icon: Award },
    { label: "Countries Served", value: "25+", icon: Target },
    { label: "Client Satisfaction", value: "98%", icon: Star },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-white to-primary-50/30">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/5 via-transparent to-accent-600/5"></div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl lg:text-7xl font-display font-bold text-gradient mb-8 text-balance">
              Meet Our Team
            </h1>
            <p className="text-xl text-neutral-600 mb-12 leading-relaxed text-balance">
              Our diverse team of experts brings together decades of experience
              in international trade, agriculture, and global market development
              to deliver exceptional results.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/80 backdrop-blur-sm border-b border-neutral-200/50">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-20 h-20 premium-gradient rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-glow">
                  <stat.icon className="h-10 w-10 text-white" />
                </div>
                <div className="text-4xl lg:text-5xl font-display font-bold text-gradient mb-3">
                  {stat.value}
                </div>
                <div className="text-neutral-700 font-semibold text-lg">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-gradient mb-6">
              Leadership Team
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Meet the visionary leaders who drive our success and shape the
              future of international trade.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="card-premium p-8 hover:scale-105 transition-all duration-500 group"
              >
                <div className="text-center">
                  <div className="w-40 h-40 rounded-3xl overflow-hidden mx-auto mb-6 shadow-lg">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-3xl font-display font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-primary-600 font-semibold text-lg mb-4">
                    {member.position}
                  </p>
                  <p className="text-neutral-600 leading-relaxed mb-6 text-base">
                    {member.bio}
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300"
                      aria-label={`${member.name} Instagram`}
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a
                      href={member.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300"
                      aria-label={`${member.name} YouTube`}
                    >
                      <Youtube className="h-5 w-5" />
                    </a>
                    <a
                      href={member.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300"
                      aria-label={`${member.name} Facebook`}
                    >
                      <Facebook className="h-5 w-5" />
                    </a>

                    <a
                      href={`mailto:${member.email}`}
                      className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300"
                      aria-label={`Email ${member.name}`}
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Values */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-gradient mb-6">
              Our Values
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              The principles that guide our team and shape our company culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-16 h-16 premium-gradient rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-glow">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-display font-bold text-neutral-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-accent-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/90 via-primary-700/90 to-accent-600/90"></div>
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h2 className="text-4xl lg:text-6xl font-display font-bold mb-6 text-balance">
              Ready to Work With Our Team?
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed text-balance">
              Connect with our experts and discover how we can help grow your
              business in international markets.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="btn-secondary text-lg px-8 py-4 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white hover:text-primary-900">
                Contact Our Team
              </button>
              <button className="btn-primary text-lg px-8 py-4">
                Schedule a Meeting
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Team;
