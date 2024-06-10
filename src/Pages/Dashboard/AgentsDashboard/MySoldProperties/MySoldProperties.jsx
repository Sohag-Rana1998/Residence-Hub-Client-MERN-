import { Helmet } from 'react-helmet-async';
import SectionTitle from '../../../../components/Shared/SectionTitle';
import useSoldPropertiesByEmail from '../../../../hooks/useSoldPropertiesByEmail';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { useEffect } from 'react';

const MySoldProperties = () => {
  const { soldData, refetch, isLoading } = useSoldPropertiesByEmail();
  const totalPrice = soldData?.reduce(
    (total, property) => total + parseInt(property.price),
    0
  );
  useEffect(() => {
    refetch();
  }, []);
  return isLoading ? (
    <div className="w-full min-h-screen flex justify-center items-center">
      <ScaleLoader color="#36d7b7" height={80} width={5} />
    </div>
  ) : (
    <div className="px-10 pb-10">
      <Helmet>
        <title>RESIDENCE HUB | Sold Properties</title>
      </Helmet>
      <div>
        <SectionTitle
          heading={'My Sold Properties'}
          subheading={'Home/Dashboard/Sold Properties'}
        />
      </div>
      <div className="w-full text-xl md:text-2xl mt-5 font-bold cinzel flex flex-col lg:flex-row gap-2 justify-evenly items-start lg:items-center">
        <div>Total Sold Properties: {soldData?.length}</div>
        <div>Total Sold Amount:{totalPrice} </div>
      </div>
      <div className="mt-5">
        <div className="overflow-x-auto">
          <table className="table ">
            {/* head */}

            <thead>
              <tr className="bg-blue-500 text-white rounded-t-3xl">
                <th className="p-5 ">No</th>

                <th>Property Tile</th>
                <th> Location</th>
                <th>Buyer Name</th>
                <th> Buyer Email</th>
                <th> Sold Price</th>
                <th> Date</th>
              </tr>
            </thead>

            <tbody>
              {/* row 1 */}
              {soldData?.map((sold, index) => (
                <tr key={sold._id}>
                  <th>{index + 1}</th>

                  <td>{sold?.title}</td>
                  <td>{sold?.location}</td>
                  <td>{sold?.buyerName}</td>
                  <td>{sold?.buyerEmail}</td>
                  <td>{sold?.price}</td>
                  <td>{new Date(sold?.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MySoldProperties;
