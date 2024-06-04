import SectionTitle from '../../../../components/Shared/SectionTitle';
import useSoldPropertiesByEmail from '../../../../hooks/useSoldPropertiesByEmail';

const MySoldProperties = () => {
  const { soldData, refetch, isLoading } = useSoldPropertiesByEmail();
  return (
    <div className="w-full px-5 mt-5">
      <div>
        <SectionTitle
          heading={'My Sold Properties'}
          subheading={'Home/Dashboard/Sold Properties'}
        />
      </div>
      <div className="w-full text-3xl mt-5 font-bold cinzel flex justify-evenly items-center">
        <div>All Sold Properties: </div>
        <div>Total solds: {soldData?.length}</div>
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
