import React from 'react';

const Section = ({ title, children }) => {
  return(
    <section className="section">
      <div className="section__content">
        <h3 className="section__title">{title}</h3>
        {children}
      </div>
    </section>
  )
};

export default Section;
