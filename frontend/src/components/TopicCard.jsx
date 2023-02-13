import API from "@services/api";
import React, { useState, useEffect } from "react";
import { dateFormater } from "@services/dateFormater";
import MessageCard from "./MessageCard";

function TopicCard({ topic, setIsTopicDeleted }) {
  const [name, setName] = useState("");
  const userId = sessionStorage.getItem("userId");
  const [topicMessage, setTopicMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isMessageSent, setIsMessageSent] = useState(false);
  const [messagesNumber, setMessagesNumber] = useState(0);
  const [isMessageModified, setIsMessageModified] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    API.get(`/users/name/${topic.userId}`)
      .then((res) => setName(`${res.data.firstname} ${res.data.lastname}`))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    API.get(`/users/role/${topic.userId}`)
      .then((res) => {
        setRole(res.data.role);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    API.get(`/messages/${topic.id}`)
      .then((res) => {
        setMessages(res.data);
        setIsMessageSent(false);
        setIsMessageModified(false);
      })
      .catch((err) => console.error(err));
  }, [isMessageSent, isMessageModified]);

  useEffect(() => {
    API.get(`/messages-count/${topic.id}`)
      .then((res) => setMessagesNumber(res.data.number))
      .catch((err) => console.error(err));
  }, [isMessageSent]);

  const addMessage = (e) => {
    e.preventDefault();
    API.post("/add-message", {
      topicId: topic.id,
      userId,
      content: topicMessage,
    })
      .then(() => {
        setTopicMessage("");
        setIsMessageSent(true);
      })
      .catch((err) => console.error(err));
  };

  const deleteTopic = async () => {
    if (
      // eslint-disable-next-line no-alert
      window.confirm("Voulez-vous vraiment supprimer ce fil de discussion ?")
    ) {
      await API.delete(`/delete-messages/${topic.id}`).catch((err) =>
        console.error(err)
      );
      API.delete(`/delete-topic/${topic.id}`)
        .then(() => setIsTopicDeleted(true))
        .catch((err) => console.error(err));
    }
  };

  return (
    <details>
      <summary>
        <div>{topic.content}</div>
        <div>
          {sessionStorage.getItem("isAdmin") && (
            <button type="button" onClick={deleteTopic}>
              X
            </button>
          )}
        </div>
      </summary>
      <p className="topic-date">
        Topic ouvert par{" "}
        <span
          style={{
            color: role === "ADMIN" && "red",
          }}
          className="user-pseudo"
        >
          {name}
        </span>
        &nbsp; le {dateFormater(topic.date)}
      </p>
      {messagesNumber === 0 && <p>Aucun message n'a été posté</p>}
      {messagesNumber === 1 && <p>{messagesNumber} message posté</p>}
      {messagesNumber > 1 && <p>{messagesNumber} messages postés</p>}
      <form className="form-topic" onSubmit={addMessage}>
        <textarea
          type="text"
          required
          placeholder="Votre message"
          value={topicMessage}
          onChange={(e) => setTopicMessage(e.target.value)}
        />
        <button type="submit">Poster</button>
      </form>
      <div className="message-container">
        {messages &&
          messages
            .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
            .map((message) => {
              return (
                <MessageCard
                  key={message.id}
                  message={message}
                  setIsMessageModified={setIsMessageModified}
                />
              );
            })}
      </div>
    </details>
  );
}

export default TopicCard;
