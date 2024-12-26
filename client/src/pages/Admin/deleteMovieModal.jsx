import { Modal, message } from "antd";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../store/loadingSlice";
import { deleteMovie } from "../../services/movieInstance";

const DeleteMovieModal = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  selectedMovie,
  setSelectedMovie,
  getData,
}) => {
  const dispatch = useDispatch();

  const handleOK = async () => {
    try {
      dispatch(showLoading());
      const movieId = selectedMovie._id;
      const response = await deleteMovie(movieId);
      if (response.data?.status === "success") {
        message.success(response.data?.message);
        getData();
      } else {
        message.error(response.message);
      }
      setSelectedMovie(null);
      setIsDeleteModalOpen(false);
      dispatch(hideLoading());
    } catch (err) {
      message.error(err.message);
      dispatch(hideLoading());
      setIsDeleteModalOpen(false);
    }
  };

  const handleCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedMovie(null);
  };
  
  return (
    <Modal
      centered
      title="Delete Movie"
      open={isDeleteModalOpen}
      onCancel={handleCancel}
      onOk={handleOK}
    >
      Are you sure you want to delete this movie?
    </Modal>
  );
};
export default DeleteMovieModal;