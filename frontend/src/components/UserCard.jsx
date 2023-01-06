import React, { useContext, useState } from "react";
import { dateFormater } from "@services/dateFormater";
import API from "../services/api";
import { MainContext } from "../contexts/MainContext";
import "../assets/Usercard.css";
import AdminModalAudit from "./AdminModalAudit";
import SponsorName from "./SponsorName";
import UserFiles from "./UserFiles";
import TotalGainsPerUser from "./TotalGainsPerUser";
import RoleCard from "./RoleCard";

function UserCard({ user }) {
  const { setDeleteUserModal, setIsUserDeleted } = useContext(MainContext);
  const [modal, setModal] = useState(false);
  const superAdminId = import.meta.env.VITE_SUPER_ADMIN_ID;
  const userId = sessionStorage.getItem("userId");

  const handleDelete = async () => {
    // eslint-disable-next-line no-alert
    if (window.confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
      await API.delete(`/all-files/${user.id}`).catch((err) =>
        console.error(err)
      );
      await API.delete(`/delete-all-messages/${user.id}`).catch((err) =>
        console.error(err)
      );
      API.delete(`/delete-all-topics/${user.id}`)
        .catch((err) => console.error(err))
        .then(() => API.delete(`/users/${user.id}`))
        .then(() => {
          setIsUserDeleted(true);
          setTimeout(() => {
            setDeleteUserModal(true);
          }, 500);
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div className="user_card">
      <details className="usercard_details">
        <summary className="usercard_summary">
          {user.firstname} {user.lastname}
        </summary>
        <div className="usercard_div">
          <div className="details_div">
            <TotalGainsPerUser
              user={user.id}
              admin={sessionStorage.getItem("isAdmin")}
            />
            <p>
              <span>Adresse email:</span> {user.email}
            </p>
            <p>
              <span>Téléphone:</span> {user.phoneNumber}
            </p>
            <p>
              <span>Date d'inscription:</span> {dateFormater(user.signupDate)}
            </p>
            <SponsorName
              user={user.id}
              admin={sessionStorage.getItem("isAdmin")}
            />
            <p>
              <span>Code de parrainage:</span> {user.referralCode}
            </p>
          </div>
          <div className="usercard_btn">
            {user.id !== userId && user.role !== "ADMIN" && (
              <button
                type="button"
                onClick={() => setModal(true)}
                className="add_btn"
              >
                Envoyer document
              </button>
            )}
            {user.id !== userId && user.id !== superAdminId && (
              <button
                type="button"
                onClick={handleDelete}
                className="delete_btn"
              >
                Supprimer utilisateur
              </button>
            )}
          </div>
        </div>
        <RoleCard user={user} />
        <UserFiles user={user.id} />
      </details>
      {modal && <AdminModalAudit setModal={setModal} user={user} />}
    </div>
  );
}

export default UserCard;
