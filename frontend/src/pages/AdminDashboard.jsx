import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserCard from "@components/UserCard";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import UserDeleteModal from "@components/UserDeleteModal";
import API from "../services/api";
import { MainContext } from "../contexts/MainContext";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const navigate = useNavigate();
  const { deleteModal, setDeleteModal } = useContext(MainContext);

  const getUsers = () => {
    API.get(`/users`)
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  };

  const toggleModal = () => {
    setDeleteModal(false);
  };

  useEffect(() => {
    if (localStorage.getItem("loggedIn") && !localStorage.getItem("isAdmin")) {
      navigate("/mon-compte");
    }
    if (!localStorage.getItem("loggedIn") && !localStorage.getItem("isAdmin")) {
      navigate("/");
    }
    getUsers();
  }, []);

  return (
    <div>
      <Navbar />
      <h2>Liste Utilisateurs</h2>
      <input
        type="text"
        placeholder="Rechercher un utilisateur"
        value={searchUser}
        onChange={(e) => setSearchUser(e.target.value)}
      />
      <ul>
        {users &&
          users
            .sort((a, b) =>
              a.lastname.toLowerCase() < b.lastname.toLowerCase() ? -1 : 1
            )
            .filter(
              (user) =>
                user.firstname
                  .toLowerCase()
                  .includes(searchUser.toLowerCase()) ||
                user.lastname
                  .toLowerCase()
                  .includes(searchUser.toLowerCase()) ||
                user.email.toLowerCase().includes(searchUser.toLowerCase()) ||
                user.phoneNumber.includes(searchUser)
            )
            .map((user) => {
              return (
                <li key={user.id}>
                  <UserCard users={users} setUsers={setUsers} user={user} />
                </li>
              );
            })}
      </ul>
      {deleteModal && <UserDeleteModal toggleModal={toggleModal} />}
      <Footer />
    </div>
  );
}

export default AdminDashboard;
