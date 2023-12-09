import React, { useEffect } from "react";
import { useMemo, useState, useCallback } from "react";
import api from "../api/axiosconfig";
import BasicHeader from "./Header";
import MaterialModal from "./Modal";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import FileUpload from "react-material-file-upload";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Container,
} from "@mui/material";
import TableComponent from "./TableComponent";
import DeleteConfirmDialog from "./DeleteConfirmDialog";

const TableWithImage = React.forwardRef((props, ref) => {
  const [editObj, setEditObj] = useState(null);
  const [id, setId] = useState(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [data, setData] = useState([]);
  const [modelOpen, setModelOpen] = useState(false);
  const [btnTxt, setBtnTxt] = useState("Submit");
  const [title, setTitle] = useState("Create Form");
  const [file, setFile] = useState(null);
  //  using it for file upload
  const [disableValidation, setDisableValidation] = useState(false);

  const {
    handleSubmit,
    register,
    // control,
    setValue,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      name: "", 
      image: null,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const handleModelOpen = () => {
    setModelOpen(true);
  };
  const handleModelClose = (event, reason) => {
    if (reason && reason === "backdropClick") return;
    setModelOpen(false);
    reset({
     title: "",
      name: "",
      image: null,
    });
    setEditObj(null);
    setTitle("Create Form");
    setBtnTxt("Submit");
    setFile(null);
  };
  // --------Way 3---------
  const getData = async () => {
    try {
      const response = await api.get("/image", data);
      console.log(response);
      setData(response?.data);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  useEffect(() => {
    getData(); // Call the function immediately when the component mounts
  }, []);
  // -------------Submit or Update ----------
  const onSubmit = useCallback(
    async (data) => {
      if (data) {
        if (data?.image) {
          data.image = await toBase64(data.image[0]);
        } else {
          data.image = editObj?.image;
        }
        console.log(data);
        if (editObj !== null) {
           await api.put(`/image/${editObj.id}`, data);
          setEditObj(null);
          getData();
          reset({
            title: "",
            name: "",
            image: null,
          });
          setFile(null);
          setDisableValidation(false);
          handleModelClose();
 
        } else {
          await api.post("/image", data);
          handleModelClose();
          getData();
          reset({
           title: "",
            name: "",
            image: null,
          });
          setFile(null);
        }
      }
    },
    [btnTxt]
  );

  const onEdit = (obj) => {
    setTitle("Edit Form");
    setBtnTxt("Update");
    setEditObj(obj);
    setDisableValidation(true);
    Object.entries(obj).forEach(([key, val]) => {
      if (key !== "image") setValue(key, val);
    });
    handleModelOpen();
  };

  const confirmDialog = (id) => {
    setId(id);
    setDeleteDialogOpen(true); // Open the confirmation dialog
    console.log(id);
  };
  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    // Close the confirmation dialog
  };

  const onDelete = async (id) => {
    try {
      console.log("Deleting item with id:", id);
      await api.delete(`/image/${id}`);
      setId(null);
      getData();
      setDeleteDialogOpen(false);
    } catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Id",
      },
      {
        accessorKey: "title", //normal accessorKey
        header: "Title",
      },
      {
        accessorKey: "name",
        header: "Added By",
      },
      {
        accessorKey: "image",
        header: "Image",
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <img
              alt="avatar"
              height={50}
              width={50}
              src={row?.original?.image}
              loading="lazy"
              style={{ borderRadius: "50%" }}
            />
          </Box>
        ),
      },
    ],
    []
  );
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  const validateFileDimension = (file, title, key, imgWidth, imgHeight) => {
    if (file.length > 0) {
      const img = document.createElement("img");
      img.hidden = true;
      const objectURL = URL.createObjectURL(file[0]);
      img.onload = function handleLoad() {
        if (img.width <= imgWidth && img.height <= imgHeight) {
          setFile(file);
          setValue("image", file);
          clearErrors(key);
        } else {
          setError(key, {
            // manually set errors in react hook form
            type: "manual",
            message:
              title +
              " dimensions should be in pixels " +
              imgWidth +
              " x " +
              imgHeight,
          });
        }
        URL.revokeObjectURL(objectURL);
      };
      img.src = objectURL;
      document.body.appendChild(img);
    } else {
      setFile(null);
      setValue("image", null);
    }
  };

  return (
    <>
      {/* crud modal */}
      <div>
        <Box style={{ width: "100%" }}>
          <DeleteConfirmDialog
            open={isDeleteDialogOpen}
            onClose={handleDeleteCancel}
            onDelete={onDelete}
            id={id}
          />
          <MaterialModal
            title={title}
            open={modelOpen}
            onClose={handleModelClose}
          >
            <Container>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  // mt: "4rem",
                  alignItems: "center",
                }}
              >
                {/* form */}
                <Box
                  noValidate
                  sx={{
                    width: "100%",
                    mt: "2rem",
                    display: "flex",
                    flexWrap: "wrap",
                  }}
                  autoComplete="off"
                  onSubmit={handleSubmit(onSubmit)}
                  component="form"
                >
                  <FormControl fullWidth sx={{ mb: "1rem" }}>
                    <TextField
                      label="Title"
                      {...register("title", {
                        required: "Title Required",
                      })}
                    />
                    <FormHelperText error={!!errors?.title?.message}>
                      {errors?.title?.message}
                    </FormHelperText>
                  </FormControl>
                  <FormControl fullWidth sx={{ mb: "1rem" }}>
                    <TextField
                      label="Added By"
                      type="text"
                      {...register("name", {
                        required: "Name Required",
                      })}
                    />
                    <FormHelperText error={!!errors?.name?.message}>
                      {errors?.name?.message}
                    </FormHelperText>
                  </FormControl>
                  <Box sx={{ width: 1, margin: "auto" }}>
                    <FileUpload
                      {...register("image", {
                        required: disableValidation ? "" : "Image Is Required",
                      })}
                      onChange={(e) => {
                        validateFileDimension(e, "Image", "image", 600, 700);
                      }}
                      ref={ref}
                      value={file}
                      multiple={false}
                      accept={["image/jpeg", "image/png"]}
                      title="Click to select or drag and drop a picture. (Max size: 60kb)  (Dimensions in pixels 400 * 500 )"
                      buttonText="Select an Image"
                      maxSize={1 * 1024 * 1024}
                      buttonProps={{
                        variant: "outlined",
                        disableFocusRipple: true,
                        style: { color: "black" }, // Set the color to black
                      }}
                      typographyProps={{
                        variant: "body2",
                        color: "textSecondary",
                      }}
                      sx={{
                        // marginLeft: "12px",
                        // width: "inherit",
                        borderColor: errors?.image ? "red" : ""
                      }}
                    />
                    <FormHelperText error={!!errors?.image?.message}>
                      {errors?.image?.message}
                    </FormHelperText>
                  </Box>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 , background:'#000','&:hover':{background:'#000'}}}
                  >
                    {btnTxt}
                  </Button>
                </Box>
              </Box>
            </Container>
          </MaterialModal>

          {/* header */}
          {/* <BasicHeader title={"TableWithAPI"} handleClick={handleModelOpen} /> */}
          <BasicHeader  handleClick={handleModelOpen} />
          <TableComponent
            columns={columns}
            data={data}
            isEdit={true}
            onEdit={onEdit}
            confirmDialog={confirmDialog}
          />
        </Box>
      </div>
    </>
  );
});

export default TableWithImage;
