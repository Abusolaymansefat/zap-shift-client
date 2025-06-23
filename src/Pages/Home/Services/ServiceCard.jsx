import React from "react";

const ServiceCard = ({ service }) => {
    const {icon: Icon, title, description} = service
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition duration-300 text-center space-y-3">
      <div className="text-4xl text-primary mx-auto">
        <Icon />
      </div>
      <h3 className="text-xl font-semibold text-primary">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default ServiceCard;
