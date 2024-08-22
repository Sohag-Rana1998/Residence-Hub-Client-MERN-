import SectionHeading from "./SectionHeading";
import ReviewSlider from "./ReviewSlider/ReviewSlider";

const ReviewSection = () => {
  return (
    <div className="w-full mx-auto">
      <div className="pt-10">
        <SectionHeading
          heading={"Good Reviews By Customers"}
          subheading={`Read the glowing reviews from our satisfied customers. See how we've helped people find their dream homes and perfect properties. Our clients' experiences and feedback are a testament to our commitment to excellence in real estate services.`}
        />

        <div className="mt-5 ">
          <ReviewSlider />
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;
