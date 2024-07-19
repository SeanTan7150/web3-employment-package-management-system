"use client";

import { User, useContractContext } from "@/constants/web3EthContract";
import { useEffect, useState } from "react";
import { UserData, userDataTypes } from "@/models/userData";
import { getWeb3Instance } from "@/constants/web3Providers";
import { useFormState } from "@/components/form/ProfileForm";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { MdEmail, MdEdit } from "react-icons/md";
import { useIPFSContext } from "@/constants/web3IPFS";
import { PopupEditUserProfileDetailsForm } from "./edit";

export default function Profile() {
  const { setFormData, formData } = useFormState();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [userDetails, setUserDetails] = useState<UserData | undefined>(
    undefined
  );
  const [isProfileUpdated, setIsProfileUpdated] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { address, contract, getUser, updateUserDetails } =
    useContractContext();

  const { uploadToIPFS, IPFSUrl, isLoading } = useIPFSContext();

  const fetchUser = async () => {
    if (address !== undefined) {
      const data = await getUser(address);
      setUser(data);

      if (data?.encodedUserDetails !== undefined && data?.isRegistered) {
        const decodedData = getWeb3Instance().eth.abi.decodeParameters(
          userDataTypes,
          data.encodedUserDetails
        );

        setUserDetails({
          profileImageUrl: decodedData[0] as string,
          firstName: decodedData[1] as string,
          lastName: decodedData[2] as string,
          username: decodedData[3] as string,
          mobile: decodedData[4] as string,
          residency: decodedData[5] as string,
          email: decodedData[6] as string,
          resume: decodedData[7] as string,
          skills: decodedData[8] as string[],
          minExpectedMonthlySalary: parseInt(decodedData[9] as string),
          maxExpectedMonthlySalary: parseInt(decodedData[10] as string),
          bio: decodedData[11] as string,
        });
      }
    } else {
      setUser(undefined);
    }
  };

  function handleFormSubmit(
    firstName: string,
    lastName: string,
    username: string,
    mobile: string,
    residency: string,
    email: string
  ) {
    if (userDetails) {
      setUserDetails({
        profileImageUrl: userDetails.profileImageUrl,
        firstName,
        lastName,
        username,
        mobile,
        residency,
        email,
        resume: userDetails.resume,
        skills: userDetails.skills,
        minExpectedMonthlySalary: userDetails.minExpectedMonthlySalary,
        maxExpectedMonthlySalary: userDetails.maxExpectedMonthlySalary,
        bio: userDetails.bio,
      });
    }
    setIsEditing(false);
  }

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    if (contract) {
      fetchUser();
    }
  }, [address, contract]);

  useEffect(() => {
    const updateProfile = async () => {
      if (isProfileUpdated && imageFile && userDetails) {
        const uploadedProfileUrl = await uploadToIPFS(imageFile);

        const values = [
          uploadedProfileUrl,
          userDetails.firstName,
          userDetails.lastName,
          userDetails.username,
          userDetails.mobile,
          userDetails.residency,
          userDetails.email,
          userDetails.resume,
          userDetails.skills,
          userDetails.minExpectedMonthlySalary,
          userDetails.maxExpectedMonthlySalary,
          userDetails.bio,
        ];

        const types = [
          "string",
          "string",
          "string",
          "string",
          "string",
          "string",
          "string",
          "string",
          "string[]",
          "uint256",
          "uint256",
          "string",
        ];

        const encodedData = getWeb3Instance().eth.abi.encodeParameters(
          types,
          values
        );
        // updateUserDetails(encodedData);
      }
    };
    updateProfile();
  }, [isProfileUpdated]);

  return (
    <>
      <div>
        {isEditing && userDetails ? (
          <PopupEditUserProfileDetailsForm
            firstName={userDetails.firstName}
            lastName={userDetails.lastName}
            username={userDetails.username}
            mobile={userDetails.mobile}
            residency={userDetails.residency}
            email={userDetails.email}
            onSubmit={handleFormSubmit}
            handleClose={handleClose}
          />
        ) : null}
        {userDetails ? (
          <div className="bg-white mx-auto rounded-xl shadow-xl w-full w-3/4">
            <div className="rounded-t-md h-[140px] bg-gradient-to-r from-cyan-500 to-blue-500"></div>
            <div className="px-5 py-2 flex flex-col gap-3 pb-6">
              <div className="flow-root">
                <div className="float-left h-[90px] shadow-md w-[90px] rounded-full border-4 overflow-hidden -mt-14 border-white">
                  {userDetails.profileImageUrl != "" ? (
                    <img
                      src={
                        "https://salmon-casual-peafowl-18.mypinata.cloud/ipfs/" +
                        userDetails.profileImageUrl
                      }
                      className="w-full h-full rounded-full object-center object-cover"
                    />
                  ) : (
                    <div>
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          className="w-full h-full rounded-full object-center object-cover"
                        />
                      ) : (
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      )}
                    </div>
                  )}
                </div>
                <div className="float-right">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 p-3 rounded-full"
                    onClick={() => {
                      setIsEditing(true);
                    }}
                  >
                    <MdEdit
                      className="justify-center"
                      size={20}
                      color="white"
                    />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-xl text-slate-900 font-bold leading-6">
                  {userDetails.firstName} {userDetails.lastName}
                </h3>
                <p className="text-sm text-gray-600">@{userDetails.username}</p>
              </div>

              <div className="flex gap-3 flex-wrap">
                <span className="rounded-sm bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800 flex items-center">
                  <FaPhoneSquareAlt className="mr-2" /> {userDetails.mobile}
                </span>
                <span className="rounded-sm bg-green-100 px-3 py-1 text-xs font-medium text-green-800 flex items-center">
                  <MdEmail className="mr-2" /> {userDetails.email}
                </span>
              </div>
              <h4 className="mt-3 text-md font-medium leading-3">About</h4>
              <p className="mb-2 text-sm text-stone-500">
                {userDetails.bio != ""
                  ? userDetails.bio
                  : "Roses are red. Violets are blue. We'd love to know a bit more about you..."}
              </p>
              <div className="flex gap-2">
                <button className="inline-flex w-auto cursor-pointer select-none appearance-none items-center justify-center space-x-1 rounded border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 transition hover:border-gray-300 active:bg-white hover:bg-gray-100 focus:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300">
                  View Resume
                </button>
                <button
                  type="submit"
                  className="inline-flex w-auto cursor-pointer select-none appearance-none items-center justify-center space-x-1 rounded border border-gray-200 bg-blue-700 px-3 py-2 text-sm font-medium text-white transition hover:border-blue-300 hover:bg-blue-600 active:bg-blue-700 focus:blue-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>Loading user details...</div>
        )}
      </div>
    </>
  );
}
