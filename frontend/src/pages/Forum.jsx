import UserNavbar from "@components/UserNavbar";
import React, { useEffect, useState } from "react";
import API from "@services/api";
import "../assets/Forum.css";
import { useNavigate } from "react-router-dom";
import TopicCard from "@components/TopicCard";
import Footer from "@components/Footer";

function Forum() {
  const userId = sessionStorage.getItem("userId");
  const [topicContent, setTopicContent] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [topicId, setTopicId] = useState(0);
  const navigate = useNavigate();
  const [topics, setTopics] = useState([]);
  const [isTopicSent, setIsTopicSent] = useState(false);
  const [isTopicDeleted, setIsTopicDeleted] = useState(false);
  const [isFirstMesssageSent, setIsFirstMessageSent] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("loggedIn")) {
      navigate("/connexion");
    }
    API.get("/topics")
      .then((res) => {
        setTopics(res.data);
        setIsTopicDeleted(false);
        setIsFirstMessageSent(false);
      })
      .catch((err) => console.error(err));
  }, [isTopicDeleted, isFirstMesssageSent]);

  const addTopic = (e) => {
    e.preventDefault();
    API.post("/add-topic", {
      userId,
      content: topicContent,
    })
      .then((res) => {
        setTopicId(res.data.id);
        setTopicContent("");
        setIsTopicSent(true);
      })
      .catch((err) => console.error(err));
  };

  if (isTopicSent) {
    setIsTopicSent(false);
    API.post("/add-message", {
      topicId,
      userId,
      content: messageContent,
    })
      .then(() => {
        setMessageContent("");
        setIsFirstMessageSent(true);
      })
      .catch((err) => console.error(err));
  }

  return (
    <div>
      <UserNavbar />
      <form className="add-topic" onSubmit={addTopic}>
        <input
          type="text"
          required
          placeholder="Une idée de topic ?"
          value={topicContent}
          onChange={(e) => setTopicContent(e.target.value)}
        />
        <textarea
          type="text"
          required
          placeholder="Votre message"
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
        />
        <button type="submit">Poster</button>
      </form>
      <div className="topics-container">
        {topics &&
          topics
            .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
            .map((topic) => {
              return (
                <TopicCard
                  key={topic.id}
                  topic={topic}
                  setIsTopicDeleted={setIsTopicDeleted}
                />
              );
            })}
      </div>
      <Footer />
    </div>
  );
}

export default Forum;
