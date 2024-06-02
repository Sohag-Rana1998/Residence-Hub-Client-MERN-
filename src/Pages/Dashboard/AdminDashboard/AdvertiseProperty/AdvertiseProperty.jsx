import SectionTitle from '../../../../components/Shared/SectionTitle';
import useVerifiedProperty from '../../../../hooks/useVerifiedProperty';

const AdvertiseProperty = () => {
  const { verifiedProperties, isLoading, refetch } = useVerifiedProperty();
  console.log(verifiedProperties);
  return (
    <div>
      <div>
        <SectionTitle
          heading={'Advertise Property'}
          subheading={'Home/dashboard/Advertise property'}
        />
      </div>
      <div>
        <div className="mt-5">
          <div className="overflow-x-auto">
            <table className="table ">
              {/* head */}

              <thead>
                <tr className="bg-blue-500 text-white rounded-t-3xl">
                  <th className=" ">No</th>

                  <th>Image</th>
                  <th>Title</th>
                  <th> Agent Name</th>
                  <th> Price Range</th>
                  <th> Action</th>
                </tr>
              </thead>

              <tbody>
                {/* row 1 */}
                {verifiedProperties?.map((property, index) => (
                  <tr key={property._id}>
                    <td>{index + 1}</td>

                    <td className="w-32 h-24 md:w-48 md:h-36">
                      <img
                        src={property.image}
                        className="w-full h-full rounded-lg"
                        alt=""
                      />
                    </td>
                    <td>{property.title}</td>

                    <td>{property.agentName}</td>

                    <td>
                      ${property.minimumPrice}-{property.maximumPrice}
                    </td>

                    <td className="">
                      <button className="btn bg-blue-500 text-white">
                        Advertise
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvertiseProperty;
