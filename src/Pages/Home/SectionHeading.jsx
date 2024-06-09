import PropTypes from 'prop-types';

const SectionHeading = ({ heading, subheading }) => {
  return (
    <div className="text-center w-[90%] md:w-[70%] mx-auto">
      <h2 className="text-5xl font-bold">{heading}</h2>
      <p className="mt-3">{subheading}</p>
    </div>
  );
};

SectionHeading.propTypes = {
  heading: PropTypes.string,
  subheading: PropTypes.string,
};

export default SectionHeading;
