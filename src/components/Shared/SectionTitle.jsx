import PropTypes from 'prop-types';

const SectionTitle = ({ heading, subheading }) => {
  return (
    <div className="flex justify-center ">
      <div className="  p-3 text-center rounded-t-3xl">
        <h3 className="text-3xl font-bold underline pb-1">{heading}</h3>
        <h3 className="text-sm ">{subheading}</h3>
      </div>
    </div>
  );
};

SectionTitle.propTypes = {
  heading: PropTypes.string,
  subheading: PropTypes.string,
};

export default SectionTitle;
