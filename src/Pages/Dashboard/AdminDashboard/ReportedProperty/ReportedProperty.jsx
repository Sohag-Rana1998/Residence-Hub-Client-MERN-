import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { useMutation } from '@tanstack/react-query';
import { MdVerified } from 'react-icons/md';
import useAllReports from '../../../../hooks/useAllReports';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import SectionTitle from '../../../../components/Shared/SectionTitle';
const ReportedProperty = () => {
  const { allReports, refetch, isLoading } = useAllReports();
  const axiosSecure = useAxiosSecure();
  console.log('Reports', allReports);

  //   delete
  const { mutateAsync } = useMutation({
    mutationFn: async ids => {
      const { data } = await axiosSecure.patch(`/reported-property`, ids);
      console.log(data);
      return data;
    },

    onSuccess: data => {
      console.log(data);
      refetch();
      Swal.fire({
        title: 'Deleted!',
        text: 'Property has been deleted.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
    },
  });

  //  Handle Delete
  const handleRemoveProperty = async report => {
    const ids = { id: report._id, propertyId: report.propertyId };
    console.log(report);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to remove this property!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          await mutateAsync(ids);
        } catch (err) {
          console.log(err);
        }
      }
    });
  };
  return (
    <div className="px-10 pb-10">
      <div>
        <SectionTitle
          heading={'Reported Properties'}
          subheading={'Home/dashboard/ReportedProperties'}
        />
      </div>
      <div className="w-full text-3xl mt-5 font-bold  ">
        <div>Total Reports : {allReports?.length}</div>
      </div>
      <div>
        <div className="mt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {allReports?.map(report => (
              <div
                key={report._id}
                className="mb-4 bg-gray-100 p-5 rounded-sm hover:scale-105 duration-500"
              >
                <div className="">
                  <div className="">
                    <h3 className="font-bold ">
                      Property Title:{report?.propertyTitle}
                    </h3>
                    <h3 className="font-bold text-sm mb-2">
                      Property agent:{report?.agentName}
                    </h3>
                    <p className="mb-2">Report Description:{report.report}</p>
                  </div>

                  <div>
                    <div>
                      <img
                        src={report.reporterPhoto}
                        className="h-12 w-12 rounded-full"
                        alt=""
                      />
                      <h3>Report By:{report?.reporterName}</h3>
                      <h3>Email:{report?.reporterName}</h3>
                    </div>
                    <div className="flex justify-between items-start">
                      <div>
                        <div>{new Date(report.date).toLocaleDateString()}</div>
                      </div>
                      <div>
                        {report?.status ? (
                          <>
                            <span className="  px-5 py-3 flex items-center gap-1 rounded-3xl bg-blue-500 my-3 text-white">
                              {report?.status} <MdVerified />
                            </span>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => handleRemoveProperty(report)}
                              className="btn  bg-red-500 my-3 text-white"
                            >
                              Remove this property
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportedProperty;
