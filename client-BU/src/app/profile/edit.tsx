"use client";

import { useState } from "react";
import { ImCross } from "react-icons/im";

interface PopupEditUserProfileDetailsFormProps {
  firstName: string;
  lastName: string;
  username: string;
  mobile: string;
  residency: string;
  email: string;
  onSubmit: (
    firstName: string,
    lastName: string,
    username: string,
    mobile: string,
    residency: string,
    email: string
  ) => void;
  handleClose: () => void;
}

export const PopupEditUserProfileDetailsForm: React.FC<
  PopupEditUserProfileDetailsFormProps
> = ({
  firstName,
  lastName,
  username,
  mobile,
  residency,
  email,
  onSubmit,
  handleClose,
}) => {
  const [profile, setProfile] = useState({
    firstName,
    lastName,
    username,
    mobile,
    residency,
    email,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(
      profile.firstName,
      profile.lastName,
      profile.username,
      profile.mobile,
      profile.residency,
      profile.email
    );
  };

  return (
    <>
      <div className="fixed l-0 t-0 z-999 w-full h-full bg-gray-900/90 ">
        <div
          className="w-3/5 bg-white absolute left-2/4 transform -translate-x-1/2 -translate-y-1/2 br-5 flex flex-wrap border shadow rounded-lg max-h-[60vh] overflow-y-auto"
          style={{ top: "45%" }}
        >
          <div className="absolute top-2 right-2">
            <button
              className="p-2 rounded-full hover:bg-gray-200 transition duration-200"
              onClick={handleClose}
            >
              <ImCross
                size={25}
                className="text-gray-600 hover:text-gray-800"
              />
            </button>
          </div>

          <form
            className="justify-center p-8 w-full mx-3"
            onSubmit={handleSubmit}
          >
            <h2 className="text-xl text-gray-600 pb-2">Edit Profile</h2>

            <div className="flex flex-col gap-2 w-full border-gray-400">
              <label className="text-gray-600">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                type="text"
                id="firstName"
                value={profile.firstName}
                onChange={handleChange}
                required
              />

              <label className="text-gray-600">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                type="text"
                id="lastName"
                value={profile.lastName}
                onChange={handleChange}
                required
              />

              <label className="text-gray-600">
                Username <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                type="text"
                id="username"
                value={profile.username}
                onChange={handleChange}
                required
              />

              <label className="text-gray-600">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                type="text"
                id="mobile"
                value={profile.mobile}
                onChange={handleChange}
                required
              />

              <label className="text-gray-600">
                Residency <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                type="text"
                id="residency"
                value={profile.residency}
                onChange={handleChange}
                required
              />

              <label className="text-gray-600">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                type="text"
                id="email"
                value={profile.email}
                onChange={handleChange}
                required
              />

              <div className="flex justify-end">
                <button
                  className="w-auto cursor-pointer select-none appearance-none items-center justify-center space-x-1 rounded border border-gray-200 bg-blue-700 px-5 py-3 text-sm font-medium text-white transition hover:border-blue-300 hover:bg-blue-600 active:bg-blue-700 focus:blue-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300 mt-2"
                  type="submit"
                >
                  Preview
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
