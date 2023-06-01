import notificationRepositoryImpl from "../../frameworks/mongodb/repositorys/notificationRepositoryImpl";

const notificationRepositoryInterface = (repository: notificationRepositoryImpl) => {
  const getAllNotification = repository.getAllNotifications;
  const getAllUnreadedNotifications = repository.getAllUnreadedNotifications;
  const addNotification = repository.addNotification;

  return {
    getAllNotification,
    getAllUnreadedNotifications,
    addNotification,
  };
};

type notificationRepositoryInterface = ReturnType<typeof notificationRepositoryInterface>;
export default notificationRepositoryInterface;
