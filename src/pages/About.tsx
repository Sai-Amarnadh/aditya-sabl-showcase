import React from 'react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">About SABL</h1>
      <p className="mb-4">
        Student-Based Learning (SABL) is an innovative educational approach that places students at the center of the learning process. It encourages active participation, critical thinking, and collaborative skills. Through SABL, students take ownership of their education, fostering a deeper understanding of subjects and developing essential life skills.
      </p>
      <h2 className="text-2xl font-bold mb-4">SABL at Aditya University</h2>
      <p className="mb-4">
        Aditya University has embraced Student-Based Learning (SABL) to provide a dynamic and engaging educational experience. Our SABL activities are designed to complement the traditional curriculum, offering students opportunities to apply their knowledge in practical scenarios. These activities include project-based learning, case studies, group discussions, and interactive workshops, all aimed at enhancing the learning process and preparing students for future challenges.
      </p>
      <a href="/SABL_Grading_Points_Overview.pdf" download>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Download Grading Points Overview
        </button>
      </a>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">SABL Activities in Action</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <img src="https://placehold.co/600x400/F2722C/white?text=SABL+Project" alt="SABL Project" className="rounded-lg shadow-md" />
          <img src="https://placehold.co/600x400/007BFF/white?text=Group+Discussion" alt="Group Discussion" className="rounded-lg shadow-md" />
          <img src="https://placehold.co/600x400/28A745/white?text=Workshop" alt="Workshop" className="rounded-lg shadow-md" />
        </div>
      </div>
    </div>
  );
};

export default About;
