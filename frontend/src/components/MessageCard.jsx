import API from "@services/api";
import React, { useEffect, useState } from "react";

function MessageCard({ message, setIsMessageModified }) {
  const userId = sessionStorage.getItem("userId");
  const [name, setName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message.content);

  useEffect(() => {
    API.get(`/users/name/${message.userId}`)
      .then((res) => {
        setName(`${res.data.firstname} ${res.data.lastname}`);
      })
      .catch((err) => console.error(err));
  }, []);

  const editMessage = () => {
    API.put(`/edit-message/${message.id}`, {
      content: editContent,
    })
      .then(() => {
        setIsEditing(false);
        setIsMessageModified(true);
      })
      .catch((err) => console.error(err));
  };

  const banMessage = () => {
    // eslint-disable-next-line no-alert
    if (window.confirm("Voulez-vous vraiment supprimer ce message ?")) {
      API.put(`/ban-message/${message.id}`, {
        content: "Ce message a été supprimé par un administrateur.",
        isDeleted: true,
      })
        .then(() => setIsMessageModified(true))
        .catch((err) => console.error(err));
    }
  };

  const preciseDateFormater = (date) => {
    const newDate = new Date(date).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    return newDate.split(" ").join(" à ").split(":").join("h");
  };

  return (
    <div
      className={
        message.userId === userId ? "personal-message-post" : "message-post"
      }
    >
      <div className="message-content">
        {isEditing ? (
          <textarea
            /* eslint-disable */
            autoFocus
            /* eslint-enable */
            defaultValue={message.content}
            onChange={(e) => setEditContent(e.target.value)}
          />
        ) : (
          <p style={{ fontStyle: message.isDeleted ? "italic" : "normal" }}>
            {message.content}
          </p>
        )}
      </div>
      <div className="message-infos">
        <p>
          Posté par <span className="user-pseudo">{name}</span> le{" "}
          {preciseDateFormater(message.date)}
        </p>
      </div>
      {message.userId === userId && isEditing && !message.isDeleted && (
        <button type="button" onClick={editMessage}>
          Valider
        </button>
      )}
      {message.userId === userId && !isEditing && !message.isDeleted && (
        <button type="button" onClick={() => setIsEditing(true)}>
          Editer
        </button>
      )}
      {sessionStorage.getItem("isAdmin") &&
        !message.isDeleted &&
        message.userId !== userId && (
          <button type="button" onClick={banMessage}>
            Supprimer
          </button>
        )}
    </div>
  );
}

export default MessageCard;
