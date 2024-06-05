import { Rating } from '@smastrom/react-rating';
import SectionTitle from '../../../../components/Shared/SectionTitle';
import Swal from 'sweetalert2';
import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import useAllReviews from '../../../../hooks/useAllReviews';

const ManageReviews = () => {
  const axiosSecure = useAxiosSecure();
  const { allReviews, refetch, isLoading } = useAllReviews();
  console.log(allReviews);

  //   delete
  const { mutateAsync } = useMutation({
    mutationFn: async id => {
      const { data } = await axiosSecure.delete(`/review/${id}`);
      return data;
    },
    onSuccess: data => {
      console.log(data);
      refetch();
      Swal.fire({
        title: 'Deleted!',
        text: 'Your review has been deleted.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
    },
  });

  //  Handle Delete
  const handleDelete = async id => {
    console.log(id);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this review!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          await mutateAsync(id);
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  return (
    <div>
      <div>
        <SectionTitle
          heading={'Manage Reviews'}
          subheading={'Home/Dashboard/ManageReviews'}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {allReviews?.map(review => (
          <div
            key={review._id}
            className="mb-4 bg-gray-100 p-5 rounded-sm hover:scale-105 duration-500"
          >
            <div className="">
              <div className="flex justify-center items-center flex-col ">
                <img
                  className="w-12 h-10 my-2"
                  src="https://i.postimg.cc/xCfnh8DK/png-transparent-quotation-mark-apostrophe-computer-icons-quotation-text-number-sign-thumbnail.png"
                  alt=""
                />

                <p className="text-center">{review.review}</p>

                <Rating style={{ maxWidth: 140 }} value={review.star} />
                <div className="mt-2">
                  <h3 className="font-bold mb-1">
                    Property Title:{review?.propertyTitle}
                  </h3>
                </div>
              </div>

              <div>
                <div>
                  <img
                    src={review.photo}
                    className="h-12 w-12 rounded-full"
                    alt=""
                  />
                  <h3>Name:{review?.name}</h3>
                  <h3>Email:{review?.email}</h3>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <div>{new Date(review.date).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="btn  bg-red-400 my-3 text-white"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageReviews;
