import "./style.scss";
import EditIcon from "@mui/icons-material/Edit";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  Alert,
  Box,
  Button,
  Card,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Modal,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useDispatch } from "react-redux";
import { storageConfig } from "../../configs/firebase";
import { authBackend } from "../../configs/axios";
import { fetchUserData } from "../../redux/userSlice";
import { Link } from "react-router-dom";

const AccountSettings = () => {
  const user = useAppSelector((state) => state.user.data);
  const [imgFile, setImgFile] = useState<null | File>(null);
  const [status, setStatus] = useState({ show: false, progress: 0, message: "" });
  const [modal, setModal] = useState({
    show: false,
    success: false,
    error: false,
    message: "This will change permenantly",
    title: "Edit",
    value: "",
    label: "Label",
    loading: false,
    type: "",
  });
  const input: any = useRef(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const uploadImage = async () => {
      return new Promise((resolve, reject) => {
        if (imgFile && user?.uid) {
          const storageRef = ref(
            storageConfig,
            `users/${user.uid}/pp.${imgFile.name.split(".")[imgFile.name.split(".").length - 1]}`
          );

          setStatus((state) => {
            return { ...state, message: "Loading..." };
          });

          const uploadTask = uploadBytesResumable(storageRef, imgFile);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              setStatus((state) => {
                return { ...state, message: "Uploding image..." };
              });
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              // here we get the progress of the upload;
              setStatus((state) => {
                return { ...state, progress };
              });
            },
            (error) => {
              // storage error
              console.error(error);
              setStatus((state) => {
                return { ...state, message: "Faild to upload image - Plz check file" };
              });
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                // after completeing image uploading, upload data to firestore
                try {
                  setStatus((state) => {
                    return { ...state, message: "Saving image..." };
                  });

                  const { data } = await authBackend.post(
                    "user_data",
                    { photoURL: downloadURL },
                    { headers: { Authorization: `Bearer ${user?.accessToken}` } }
                  );
                  dispatch(fetchUserData());
                  resolve(data?.message ? data.message : "Updated");

                  setStatus((state) => {
                    return { ...state, progress: 0, message: "Profile image updated successfully" };
                  });
                } catch (error) {
                  console.log(error);
                  reject(error);
                }
              });
            }
          );
        }
      });
    };
    uploadImage();
  }, [imgFile]);

  const updateData = async (type: string, dataValue?: string) => {
    try {
      const dataPayload = {
        [type]: dataValue ?? modal.value.trim(),
      };
      const { data } = await authBackend.post("/user_data", dataPayload, {
        headers: { Authorization: `Bearer ${user?.accessToken}` },
      });
      dispatch(fetchUserData());
      setModal((state) => {
        return { ...state, error: false, success: true, message: `${type} updated` };
      });
    } catch (error: any) {
      setModal((state) => {
        return { ...state, error: true, message: error?.response?.data?.error ? error.response.data.error : error.message };
      });
      console.log(error);
    }
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    borderRadius: "5px",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div className="AccountSettings">
      {!user && (
        <>
          <Card
            style={{
              padding: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
            variant="outlined"
          >
            <div>
              <h3>Login to continue in account settings</h3>
            </div>
            <Link to="/auth/login">
              <Button variant="outlined">Login</Button>
            </Link>
          </Card>
        </>
      )}
      {user && (
        <>
          <Card className="card" variant="outlined">
            <h4>Basic info</h4>
            {status.message.length > 0 && (
              <Alert severity="info" variant="outlined" color="info">
                {status.message}
              </Alert>
            )}
            {status.progress > 0 && (
              <>
                <br />
                <LinearProgress variant="determinate" value={status.progress} />
              </>
            )}
            <div className="list profile">
              <span>Profile photo</span>
              <div className="imgCont">
                <img src={user?.photoURL ?? "/icons/user.png"} alt={user?.email} />
                <div className="editBanner" onClick={() => input.current?.click()}>
                  <CameraAltIcon />
                  <input
                    ref={input}
                    onChange={(e) => {
                      if (e.target?.files?.length && e.target?.files?.length > 0) {
                        setImgFile(e.target?.files?.[0]);
                      }
                    }}
                    type="file"
                    accept="image/*"
                    hidden
                  />
                </div>
              </div>
            </div>
            <div className="list">
              <span>
                Name &nbsp;:&nbsp; &nbsp;<span>{user?.name}</span>
              </span>
              <EditIcon
                onClick={() => {
                  setModal((state) => {
                    return {
                      ...state,
                      show: true,
                      title: "Edit Name",
                      value: user?.name ?? "",
                      label: "Name",
                      type: "name",
                      success: false,
                      error: false,
                      message: "This will change permenantly",
                    };
                  });
                }}
              />
            </div>
            <div className="list">
              <span>
                Birthday &nbsp;:&nbsp; &nbsp; <span>{user?.dob ? new Date(user?.dob).toDateString() : ""}</span>
              </span>
              <EditIcon
                onClick={() => {
                  setModal((state) => {
                    return {
                      ...state,
                      show: true,
                      title: "Edit Birthday",
                      value: user?.dob ?? "",
                      label: "Birthday",
                      type: "dob",
                      success: false,
                      error: false,
                      message: "This will change permenantly",
                    };
                  });
                }}
              />
            </div>
            <div className="list">
              <span>
                Gender &nbsp;:&nbsp; &nbsp; <span>{user?.gender}</span>
              </span>
              <EditIcon
                onClick={() => {
                  setModal((state) => {
                    return {
                      ...state,
                      show: true,
                      title: "Edit Gender",
                      value: user?.gender ?? "",
                      label: "Gender",
                      type: "gender",
                      success: false,
                      error: false,
                      message: "This will change permenantly",
                    };
                  });
                }}
              />
            </div>
          </Card>

          <Card className="card" variant="outlined">
            <h4>Contact Details</h4>
            <div className="list">
              <span>
                Email &nbsp;:&nbsp; &nbsp; <span>{user?.email}</span>
              </span>
            </div>
            <div className="list">
              <span>
                phone &nbsp;:&nbsp; &nbsp; <span>{user?.phone}</span>
              </span>
              <EditIcon
                onClick={() => {
                  setModal((state) => {
                    return {
                      ...state,
                      show: true,
                      title: "Edit Phone",
                      value: user?.phone ?? "",
                      label: "Phone Number",
                      type: "phone",
                      success: false,
                      error: false,
                      message: "This will change permenantly",
                    };
                  });
                }}
              />
            </div>
          </Card>

          <Card className="card" variant="outlined">
            <h4>Account actions</h4>
            <div className="list">
              <span>Private Account</span>
              <Switch
                checked={user?.privateAccount ?? false}
                onChange={(e) => {
                  updateData("privateAccount", e.target.checked ? "true" : "false");
                }}
              />
            </div>
          </Card>

          <Modal
            open={modal.show}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onClose={() => {
              setModal((state) => {
                return { ...state, show: false };
              });
            }}
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {modal.title}
              </Typography>
              <Alert
                variant="outlined"
                severity={modal.error ? "error" : modal.success ? "success" : "info"}
                style={{ marginTop: "10px" }}
              >
                {modal.message}
              </Alert>
              {(modal.type == "name" || modal.type == "phone") && (
                <TextField
                  value={modal.value}
                  onChange={(e) =>
                    setModal((status) => {
                      return { ...status, value: e.target.value };
                    })
                  }
                  style={{ width: "100%", marginTop: "15px" }}
                  id="outlined-basic"
                  label={modal.label}
                  variant="outlined"
                  autoFocus
                />
              )}

              {modal.type == "gender" && (
                <FormControl fullWidth style={{ width: "100%", marginTop: "15px" }}>
                  <InputLabel id="demo-simple-select-label">{modal.label}</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    value={modal.value}
                    onChange={(e) =>
                      setModal((status) => {
                        return { ...status, value: e.target.value };
                      })
                    }
                    fullWidth
                    label={modal.label}
                  >
                    <MenuItem value={"male"}>Male</MenuItem>
                    <MenuItem value={"female"}>Female</MenuItem>
                    <MenuItem value={"other"}>Other</MenuItem>
                  </Select>
                </FormControl>
              )}

              {modal.type == "dob" && (
                <TextField
                  value={modal.value}
                  onChange={(e) =>
                    setModal((status) => {
                      return { ...status, value: e.target.value };
                    })
                  }
                  style={{ width: "100%", marginTop: "15px" }}
                  id="outlined-basic"
                  label={modal.label}
                  variant="outlined"
                  autoFocus
                  type="date"
                />
              )}

              <Button
                style={{ width: "100%", height: "50px", boxSizing: "border-box", marginTop: "15px" }}
                variant="contained"
                onClick={() => {
                  updateData(modal.type);
                }}
              >
                Save
              </Button>
            </Box>
          </Modal>
        </>
      )}
    </div>
  );
};

export default AccountSettings;
