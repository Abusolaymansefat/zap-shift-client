import React from "react";
import { motion } from "framer-motion";

const ServiceCard = ({ service }) => {
  const { icon: Icon, title, description } = service;
  return (
    <motion.div
      className="rounded-2xl p-5 text-center shadow-md border border-transparent transition-all duration-300 bg-white hover:bg-gradient-to-tr hover:from-primary hover:[#1c5c78] hover:text-white hover:shadow-xl flex flex-col items-center justify-center space-y-4 h-full"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="text-4xl text-primary mx-auto transition-colors duration-300">
        <Icon />
      </div>
      <h3 className="text-xl font-semibold text-primary">{title}</h3>
      <p className="text-gray-600 hover:text-white transition-colors duration-300">{description}</p>
    </motion.div>
  );
};

export default ServiceCard;
