import React, { useContext } from "react";
import API from "../services/api";
import { MainContext } from "../contexts/MainContext";

function UserCard({ users, setUsers, user }) {
  const { setDeleteModal } = useContext(MainContext);

  const handleDelete = (e) => {
    // eslint-disable-next-line no-alert
    return window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")
      ? API.delete(`/users/${user.id}`)
          .then(() => {
            setUsers(users.filter((u) => u !== user));
            setTimeout(() => {
              setDeleteModal(true);
            }, 1000);
          })
          .catch((err) => console.error(err))
      : e.preventDefault();
  };

  return (
    <div>
      <p>
        Nom: {user.firstname} {user.lastname}
      </p>
      <p>Adresse email: {user.email}</p>
      <p>Téléphone: {user.phoneNumber}</p>
      <button type="button" onClick={handleDelete}>
        Supprimer utilisateur
      </button>
    </div>
  );
}

export default UserCard;
