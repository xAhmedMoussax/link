import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "@/axios";
import { CloudUpload } from "lucide-react";

const Update = ({ setOpenUpdate, user }) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    email: user.email,
    password: user.password,
    name: user.name,
    city: user.city,
    website: user.website,
  });

  const upload = async (file) => {
    console.log(file);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setTexts((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const queryClient = useQueryClient();

  const mutation = useMutation(
    (user) => {
      return makeRequest.put("/users", user);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["user"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();

    let coverUrl;
    let profileUrl;
    coverUrl = cover ? await upload(cover) : user.coverPic;
    profileUrl = profile ? await upload(profile) : user.profilePic;

    mutation.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl });
    setOpenUpdate(false);
    setCover(null);
    setProfile(null);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-4/5 md:w-1/2 lg:w-2/5 p-8 rounded-lg shadow-lg flex flex-col gap-6 relative">
        <h1 className="text-gray-700 text-2xl">Update Your Profile</h1>
        <form className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-4">
            <label htmlFor="cover" className="flex flex-col items-center gap-2">
              <span>Cover Picture</span>
              <div className="relative">
                <img
                  className="w-24 h-24 object-cover"
                  src={
                    cover
                      ? URL.createObjectURL(cover)
                      : `/upload/${user.coverPic}`
                  }
                  alt="Cover"
                />
                <CloudUpload className="absolute inset-0 m-auto text-gray-500 text-3xl cursor-pointer" />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              className="hidden"
              onChange={(e) => setCover(e.target.files[0])}
            />
            <label htmlFor="profile" className="flex flex-col items-center gap-2">
              <span>Profile Picture</span>
              <div className="relative">
                <img
                  className="w-24 h-24 object-cover"
                  src={
                    profile
                      ? URL.createObjectURL(profile)
                      : `/upload/${user.profilePic}`
                  }
                  alt="Profile"
                />
                <CloudUpload className="absolute inset-0 m-auto text-gray-500 text-3xl cursor-pointer" />
              </div>
            </label>
            <input
              type="file"
              id="profile"
              className="hidden"
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </div>
          <label className="flex flex-col gap-1">
            Email
            <input
              type="text"
              value={texts.email}
              name="email"
              onChange={handleChange}
              className="p-2 border-b border-gray-300 focus:outline-none focus:border-gray-500"
            />
          </label>
          <label className="flex flex-col gap-1">
            Password
            <input
              type="text"
              value={texts.password}
              name="password"
              onChange={handleChange}
              className="p-2 border-b border-gray-300 focus:outline-none focus:border-gray-500"
            />
          </label>
          <label className="flex flex-col gap-1">
            Name
            <input
              type="text"
              value={texts.name}
              name="name"
              onChange={handleChange}
              className="p-2 border-b border-gray-300 focus:outline-none focus:border-gray-500"
            />
          </label>
          <label className="flex flex-col gap-1">
            Country / City
            <input
              type="text"
              name="city"
              value={texts.city}
              onChange={handleChange}
              className="p-2 border-b border-gray-300 focus:outline-none focus:border-gray-500"
            />
          </label>
          <label className="flex flex-col gap-1">
            Website
            <input
              type="text"
              name="website"
              value={texts.website}
              onChange={handleChange}
              className="p-2 border-b border-gray-300 focus:outline-none focus:border-gray-500"
            />
          </label>
          <button
            onClick={handleClick}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Update
          </button>
        </form>
        <button
          onClick={() => setOpenUpdate(false)}
          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Update;
