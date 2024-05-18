import { useContext, useState } from "react";
import { AuthContext } from "@/context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "@/axios";
import { Image, Map, Users } from "lucide-react";
const Share = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newPost) => {
      return makeRequest.post("/posts", newPost);
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if (file) imgUrl = await upload();
    mutation.mutate({ desc, img: imgUrl });
    setDesc("");
    setFile(null);
  };

  return (
    <div className="bg-gray-100 rounded-lg shadow-right p-6 mb-8">
      <div className="container">
        <div className="flex justify-between items-center mb-6">
          <div className="flex-3 flex items-center">
            <img
              src={"/upload/" + currentUser.profilePic}
              alt=""
              className="w-10 h-10 rounded-full mr-2"
            />
            <input
              type="text"
              placeholder={`What's on your mind ${currentUser.name}?`}
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              className="border-none outline-none bg-transparent w-3/5 text-gray-800"
            />
          </div>
          <div className="flex-1 flex justify-end">
            {file && (
              <img
                className="w-24 h-24 object-cover"
                alt=""
                src={URL.createObjectURL(file)}
              />
            )}
          </div>
        </div>
        <hr className="my-6 border-gray-300" />
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label htmlFor="file" className="cursor-pointer">
              <div className="flex items-center space-x-2 cursor-pointer">
                <Image className="w-5 h-5" />
                <span className="text-gray-600">Add Image</span>
              </div>
            </label>
            <div className="flex items-center space-x-2 cursor-pointer">
              <Map className="w-5 h-5" />
              <span className="text-gray-600">Add Place</span>
            </div>
            <div className="flex items-center space-x-2 cursor-pointer">
              <Users className="w-5 h-5" />
              <span className="text-gray-600">Tag Friends</span>
            </div>
          </div>
          <div>
            <button
              onClick={handleClick}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
