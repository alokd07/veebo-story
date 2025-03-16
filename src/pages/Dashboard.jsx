import React, { useEffect, useState } from "react";
import Editor from "../components/Editor";
import { Modal } from "@mui/material";
import { BASE_URL } from "../../config";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import DOMPurify from "dompurify";

export default function Dashboard({ open, setOpen }) {
  const [post, setPost] = useState({
    title: "",
    content: "",
    genre: "movies",
    image: "",
  });
  const [stories, setStories] = useState([]);
  const [category, setCategory] = useState("all");
  const [users, setUsers] = useState([]);

  const sanitizedData = (data) => ({
    __html: DOMPurify.sanitize(data),
  });

  const fetchStories = () => {
    fetch(`${BASE_URL}story/all?category=${category}`)
      .then((res) => res.json())
      .then((data) => setStories(data))
      .catch((err) => console.log(err));
  };

  const fetchUsers = () => {
    fetch(`${BASE_URL}user/all`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
  };

  const deleteStory = (id) => {
    fetch(`${BASE_URL}story/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => toast.success(data.message))
      .then(() => fetchStories())
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("body", post.content);
    formData.append("genre", post.genre);
    formData.append("thumbnail", post.image);

    fetch(`${BASE_URL}story/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOpen(false);
        toast.success(data.message);
        fetchStories();
      })
      .catch((err) => {
        console.log(err);
        toast.error("An error occurred. Please try again.");
      });
  };

  useEffect(() => {
    fetchStories();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-full">
      <div className="py-10">
        <div className="mx-auto max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8">
          <Modal open={open} onClose={() => setOpen(false)}>
            <div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                maxHeight: "90vh",
                height: "auto",
                overflowY: "auto",
                transform: "translate(-50%, -50%)",
              }}
              className="bg-white max-w-xl h-[70] mx-auto p-4"
            >
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label
                    for="title"
                    className="block text-lg font-medium text-gray-800 mb-1"
                  >
                    Story Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={post.title}
                    onChange={(e) =>
                      setPost({ ...post, title: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label
                    for="title"
                    className="block text-lg font-medium text-gray-800 mb-1"
                  >
                    Story Genre
                  </label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    value={post.genre}
                    onChange={(e) =>
                      setPost({ ...post, genre: e.target.value })
                    }
                    required
                  >
                    <option value="movies">Movies</option>
                    <option value="food">Food</option>
                    <option value="sports">Sports</option>
                    <option value="animals">Animals</option>
                    <option value="science">Science</option>
                    <option value="dinosaurs">Dinosaurs</option>
                    <option value="talents">Talents</option>
                    <option value="gaming">Gaming</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label
                    for="content"
                    className="block text-lg font-medium text-gray-800 mb-1"
                  >
                    Content
                  </label>
                  <Editor
                    value={post.content}
                    onChange={(value) => setPost({ ...post, content: value })}
                  />
                </div>

                <div className="mb-6">
                  <label
                    for="image"
                    className="block text-lg font-medium text-gray-800 mb-1"
                  >
                    Image
                  </label>
                  <input
                    type="file"
                    id="thumbnail"
                    name="thumbnail"
                    onChange={(e) =>
                      setPost({ ...post, image: e.target.files[0] })
                    }
                    accept="image/*"
                    className="w-full"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-bold focus:outline-none"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </Modal>
          <div className="hidden lg:col-span-3 lg:block xl:col-span-2">
            <nav
              aria-label="Sidebar"
              className="sticky top-4 divide-y divide-gray-300"
            >
              <div className="space-y-1 pb-8">
                <a
                  href="#"
                  className="bg-gray-200 text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                  aria-current="page"
                >
                  <svg
                    className="text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                  <span className="truncate">Home</span>
                </a>
                <a
                  href="#"
                  className="text-gray-700 hover:bg-gray-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                >
                  <svg
                    className="text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
                    />
                  </svg>
                  <span className="truncate">Popular</span>
                </a>
                <a
                  href="#"
                  className="text-gray-700 hover:bg-gray-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                >
                  <svg
                    className="text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                    />
                  </svg>
                  <span className="truncate">Genre</span>
                </a>
                <a
                  href="#"
                  className="text-gray-700 hover:bg-gray-50 group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                >
                  <svg
                    className="text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                    />
                  </svg>
                  <span className="truncate">Trending</span>
                </a>
              </div>
              <div className="pt-10">
                <p className="px-3 text-sm font-medium text-gray-500">
                  Story Genre
                </p>
                <div className="mt-3 space-y-2">
                  <button
                    onClick={() => setCategory("all")}
                    className="group flex items-center cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  >
                    <span className="truncate">All Stories</span>
                  </button>
                  <button
                    onClick={() => setCategory("movies")}
                    className="group flex items-center cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  >
                    <span className="truncate">Movies</span>
                  </button>
                  <button
                    onClick={() => setCategory("food")}
                    className="group flex items-center cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  >
                    <span className="truncate">Food</span>
                  </button>
                  <button
                    onClick={() => setCategory("sports")}
                    className="group flex items-center cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  >
                    <span className="truncate">Sports</span>
                  </button>
                </div>
              </div>
            </nav>
          </div>
          <main className="lg:col-span-9 xl:col-span-6">
            <div className="mt-4">
              <h1 className="sr-only">Recent questions</h1>
              <ul className="space-y-4">
                {stories.map((story) => (
                  <li
                    key={story.id}
                    className="bg-white px-4 py-6 shadow sm:rounded-lg sm:p-6"
                  >
                    <article aria-labelledby="question-title-81614">
                      <div>
                        <div className="flex space-x-3">
                          <div className="flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full"
                              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              alt=""
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              <a href="#" className="hover:underline">
                                Admin
                              </a>
                            </p>
                            <p className="text-sm text-gray-500">
                              <a href="#" className="hover:underline">
                                <time
                                  dateTime={new Date(
                                    story.createdAt
                                  ).toDateString()}
                                >
                                  {new Date(story.createdAt).toDateString()}{" "}
                                </time>
                              </a>
                            </p>
                          </div>
                          <div className="flex flex-shrink-0 self-center">
                            <div
                              className="relative inline-block text-left"
                            >
                              <div>
                                <button
                                onClick={() => {deleteStory(story._id)}}
                                  type="button"
                                  className="-m-2 flex items-center rounded-full p-2 text-sm text-red-400 hover:text-red-600 cursor-pointer"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <h2
                          id="question-title-81614"
                          className="mt-4 text-base font-medium text-gray-900"
                        >
                          {story.title}
                        </h2>
                      </div>
                      <div
                        className="mt-2 space-y-4 text-sm text-gray-700"
                        dangerouslySetInnerHTML={sanitizedData(story.body)}
                      />
                      <div className="mt-6 flex justify-between space-x-8">
                        <div className="flex space-x-6">
                          <span className="inline-flex items-center text-sm">
                            <button
                              type="button"
                              className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                            >
                              <svg
                                className="h-5 w-5"
                                x-description="Heroicon name: mini/hand-thumb-up"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path d="M1 8.25a1.25 1.25 0 112.5 0v7.5a1.25 1.25 0 11-2.5 0v-7.5zM11 3V1.7c0-.268.14-.526.395-.607A2 2 0 0114 3c0 .995-.182 1.948-.514 2.826-.204.54.166 1.174.744 1.174h2.52c1.243 0 2.261 1.01 2.146 2.247a23.864 23.864 0 01-1.341 5.974C17.153 16.323 16.072 17 14.9 17h-3.192a3 3 0 01-1.341-.317l-2.734-1.366A3 3 0 006.292 15H5V8h.963c.685 0 1.258-.483 1.612-1.068a4.011 4.011 0 012.166-1.73c.432-.143.853-.386 1.011-.814.16-.432.248-.9.248-1.388z" />
                              </svg>
                              <span className="font-medium text-gray-900">
                                0
                              </span>
                              <span className="sr-only">likes</span>
                            </button>
                          </span>
                          <span className="inline-flex items-center text-sm">
                            <button
                              type="button"
                              className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                            >
                              <svg
                                className="h-5 w-5"
                                x-description="Heroicon name: mini/chat-bubble-left-ellipsis"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902.848.137 1.705.248 2.57.331v3.443a.75.75 0 001.28.53l3.58-3.579a.78.78 0 01.527-.224 41.202 41.202 0 005.183-.5c1.437-.232 2.43-1.49 2.43-2.903V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0010 2zm0 7a1 1 0 100-2 1 1 0 000 2zM8 8a1 1 0 11-2 0 1 1 0 012 0zm5 1a1 1 0 100-2 1 1 0 000 2z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="font-medium text-gray-900">
                                0
                              </span>
                              <span className="sr-only">replies</span>
                            </button>
                          </span>
                          <span className="inline-flex items-center text-sm">
                            <button
                              type="button"
                              className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                            >
                              <svg
                                className="h-5 w-5"
                                x-description="Heroicon name: mini/eye"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                                <path
                                  fillRule="evenodd"
                                  d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span className="font-medium text-gray-900">
                                0
                              </span>
                              <span className="sr-only">views</span>
                            </button>
                          </span>
                        </div>
                        <div className="flex text-sm">
                          <span className="inline-flex items-center text-sm">
                            <button
                              type="button"
                              className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                            >
                              <svg
                                className="h-5 w-5"
                                x-description="Heroicon name: mini/share"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path d="M13 4.5a2.5 2.5 0 11.702 1.737L6.97 9.604a2.518 2.518 0 010 .792l6.733 3.367a2.5 2.5 0 11-.671 1.341l-6.733-3.367a2.5 2.5 0 110-3.475l6.733-3.366A2.52 2.52 0 0113 4.5z" />
                              </svg>
                              <span className="font-medium text-gray-900">
                                Share
                              </span>
                            </button>
                          </span>
                        </div>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          </main>
          <aside className="hidden xl:col-span-4 xl:block">
            <div className="sticky">
              <section aria-labelledby="who-to-follow-heading">
                <div className="rounded-lg bg-white shadow">
                  <div className="p-6">
                    <h2
                      id="who-to-follow-heading"
                      className="text-base font-medium text-gray-900"
                    >
                      All Users
                    </h2>
                    <div className="mt-6 flow-root">
                      <ul className="-my-4 divide-y divide-gray-200">
                        {users.map((user) => (
                          <li
                            key={user.id}
                            className="flex items-center space-x-3 py-4"
                          >
                            <div className="flex-shrink-0">
                              <img
                                className="h-8 w-8 rounded-full"
                                src="https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-gray-900">
                                <a href="#">{user.name}</a>
                              </p>
                              <p className="text-sm text-gray-500">
                                <a href="#">{user.email}</a>
                              </p>
                            </div>
                            <div className="flex-shrink-0">
                              <button
                                type="button"
                                className="inline-flex items-center rounded-full bg-rose-50 px-3 py-0.5 text-sm font-medium text-primary hover:bg-rose-100"
                              >
                                <span>{user.isAdmin ? "Admin" : "User"}</span>
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-6">
                      <a
                        href="#"
                        className="block w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                      >
                        View all
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
