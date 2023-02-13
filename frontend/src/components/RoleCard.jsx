import API from "@services/api";
import React, { useState } from "react";
import Modal from "./Modal";
import "@assets/RoleCard.css";

function RoleCard({ user }) {
  const superAdminId = import.meta.env.VITE_SUPER_ADMIN_ID;
  const userId = sessionStorage.getItem("userId");
  const [role, setRole] = useState(user.role);
  const [isRoleUpdated, setIsRoleUpdated] = useState(false);

  const handleUpdateRole = (e) => {
    e.preventDefault();
    API.put(`/role/users/${user.id}`, { role })
      .then(() => setIsRoleUpdated(true))
      .catch((err) => console.error(err));
  };

  const toggleModal = () => {
    setIsRoleUpdated(false);
  };

  return (
    <div className="role-card" id="role-card">
      {user.id !== userId && user.id !== superAdminId && (
        <details>
          <summary>Statut</summary>
          <form onSubmit={handleUpdateRole}>
            <div className="role-card-roles">
              <div className="role-card-input">
                <div>
                  <input
                    onChange={(e) => setRole(e.target.value)}
                    id="user"
                    type="radio"
                    name="role"
                    value="USER"
                    defaultChecked={user.role === "USER"}
                  />
                </div>
                <div>
                  <label htmlFor="user">Utilisateur</label>
                </div>
              </div>
              <div className="role-card-input">
                <div>
                  <input
                    onChange={(e) => setRole(e.target.value)}
                    id="admin"
                    type="radio"
                    name="role"
                    value="ADMIN"
                    defaultChecked={user.role === "ADMIN"}
                  />
                </div>
                <div>
                  <label htmlFor="admin">Administrateur</label>
                </div>
              </div>
            </div>
            <div className="role-card-button-container">
              <button type="submit">Modfier</button>
            </div>
          </form>
        </details>
      )}
      {isRoleUpdated && (
        <Modal
          toggleModal={toggleModal}
          modalMessage="Le statut de cet utilisateur a bien été mis à jour."
        />
      )}
    </div>
  );
}

export default RoleCard;
