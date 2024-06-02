import PropTypes from 'prop-types';

const SectionTitle = ({ heading, subheading }) => {
  return (
    <div className="flex justify-center ">
      <div className="w-[250px]  p-3 text-center rounded-t-3xl">
        <h3 className="text-3xl font-bold border-b-2 pb-1">{heading}</h3>
        <h3 className="text-sm mt-2">{subheading}</h3>
      </div>
    </div>
  );
};

SectionTitle.propTypes = {
  heading: PropTypes.string,
  subheading: PropTypes.string,
};

export default SectionTitle;
