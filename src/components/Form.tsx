import { useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import { addUser, getUsers } from "../api";
import { RootState } from "../store";
import { validation } from "../heplers";
import { IFromData } from "../types/formData";
import { setCountOfVisibleUsers, setUsers } from "../usersSlice";
import { Button } from "./Button";
import { Position } from "./Position";

import successImage from "../images/success-image.svg";

const initialFormData: IFromData = Object.freeze({
  name: "",
  phone: "",
  email: "",
  position_id: 1,
  photo: "Upload your photo",
});

const initialFormDataError = Object.freeze({
  name: "",
  phone: "",
  email: "",
  position_id: "",
  photo: "",
});

export const Form = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [formDataError, setFormDataError] = useState(initialFormDataError);
  const [isUserRegister, setIsUserRegister] = useState(false);
  const form = useRef(null);

  const { positions } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string = "text"
  ) => {
    setFormDataError({
      ...formDataError,
      [e.target.name]: "",
    });

    let value;
    switch (type) {
      case "radio":
        value = +e.target.id;
        break;
      case "file":
        if (e.target.files) {
          value = e.target.files[0];
        }
        break;

      default:
        value = e.target.value.trim();
        break;
    }

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const isDisabledButton = useMemo(() => {
    for (let key in formDataError) {
      if (formDataError[key as keyof IFromData].length > 0) {
        return true;
      }
    }

    if (
      formData.name.length === 0 ||
      formData.email.length === 0 ||
      formData.phone.length === 0
    ) {
      return true;
    }

    if (typeof formData.photo === "string") {
      return true;
    }

    return false;
  }, [formData, formDataError]);

  const validationForImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const maxSize = 5242880;
      const types = ["image/jpeg", "image/jpg"];

      var img: HTMLImageElement;
      img = document.createElement("img");

      img.src = URL.createObjectURL(files[0]);
      await img.decode();

      return (
        files[0].size < maxSize &&
        types.includes(files[0].type) &&
        img.width > 70 &&
        img.height > 70
      );
    }
  };

  const checkValidation = (
    e: React.FocusEvent<HTMLInputElement, Element>,
    textError: string
  ) => {
    if (!validation(e)) {
      setFormDataError({
        ...formDataError,
        [e.target.name]: textError,
      });
    } else {
      setFormDataError({
        ...formDataError,
        [e.target.name]: "",
      });
    }
  };

  return (
    <div className="block form" id="form">
      <h1 className="blockTitle">Working with POST request</h1>
      {isUserRegister ? (
        <div>
          <h1 className="block">User successfully registered</h1>
          <img src={successImage} alt="success" />
        </div>
      ) : (
        <form
          action=""
          ref={form}
          method="post"
          className="form_content"
          onSubmit={async (e) => {
            e.preventDefault();

            if (form.current) {
              const data = new FormData(form.current);
              await addUser(data).then((res) => setIsUserRegister(res.success));
            }

            dispatch(setCountOfVisibleUsers(6));
            getUsers(6).then((res) => dispatch(setUsers(res.users)));
            setFormData(initialFormData);
          }}
        >
          <div>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              className={classNames("input", {
                error: formDataError.name.length > 0,
              })}
              onChange={handleChange}
              value={formData.name}
              onBlur={(e) => {
                checkValidation(e, "Name should be 2-60 characters");
              }}
            />
            <div className="error_text">{formDataError.name}</div>
          </div>
          <div>
            <input
              type="text"
              name="email"
              placeholder="Email"
              className={classNames("input", {
                error: formDataError.email.length > 0,
              })}
              onChange={handleChange}
              value={formData.email}
              onBlur={(e) => {
                checkValidation(e, "Email should be 2-100 characters");
              }}
            />
            <div className="error_text">{formDataError.email}</div>
          </div>

          <div>
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              className={classNames("input", {
                error: formDataError.phone.length,
              })}
              onChange={handleChange}
              value={formData.phone}
              onBlur={(e) => {
                checkValidation(
                  e,
                  "Number should start with code of Ukraine +380"
                );
              }}
            />
            <div className="input_hint">+380XXXXXXXXX</div>
            <div className="error_text">{formDataError.phone}</div>
          </div>

          <div className="position">
            <p className="position_title">Select your position</p>
            <div className="position_buttons">
              {positions.map((elem) => {
                return (
                  <Position
                    name={elem.name}
                    key={elem.id}
                    id={elem.id}
                    handleChange={handleChange}
                    formData={formData}
                  />
                );
              })}
            </div>
          </div>

          <div className="photo">
            <label className="file">
              <input
                type="file"
                id="file"
                aria-label="File browser example"
                name="photo"
                onChange={(e) => {
                  validationForImage(e).then((res) => {
                    if (!res) {
                      setFormDataError({
                        ...formDataError,
                        [e.target.name]:
                          "Photo should be jpg/jpeg image, with resolution at least 70x70px and size must not exceed 5MB",
                      });

                      setFormData({
                        ...formData,
                        [e.target.name]: "Upload your photo",
                      });
                    } else {
                      handleChange(e, "file");
                    }
                  });
                }}
              />
              <span
                className={classNames("file-custom", {
                  error: formDataError.photo.length > 0,
                })}
              >
                Upload
              </span>
              <div
                className={classNames("photo_upload", {
                  error: formDataError.photo.length > 0,
                })}
              >
                {typeof formData.photo === "string"
                  ? formData.photo
                  : formData.photo.name}
              </div>
            </label>
            <div className="error_text">{formDataError.photo}</div>
          </div>

          <div className="form_button">
            <Button text="Sign up" disabledButton={isDisabledButton} />
          </div>
        </form>
      )}
    </div>
  );
};
