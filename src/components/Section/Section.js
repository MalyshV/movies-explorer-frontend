import React from 'react';

const Section = ({ title, children }) => {
  return(
    <section class="section">
      <div class="section__content">
        <h3 className="section__title">{title}</h3>
        {children}
      </div>
    </section>
  )
};

export default Section;
