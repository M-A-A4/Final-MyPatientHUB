import React, { useEffect, useMemo, useState } from "react";

import Footer from "./Footer";

import "./Chat.css";

// ==========================================
// 1. INITIAL CONVERSATIONS
// ==========================================

const initialThreads = [
  {
    id: 1,
    name: "Care Team",
    role: "MyPatientHUB support",
    avatar: "CT",
    online: true,
    preview: "Hello! How can we help you today?",

    messages: [
      {
        from: "them",
        text: "Hello! Welcome to MyPatientHUB care chat.",
        time: "09:15",
      },
      {
        from: "them",
        text: "You can message your care team here. Please do not share emergency information in this demo chat.",
        time: "09:15",
      },
    ],
  },

  {
    id: 2,
    name: "Dr. Mustafa Rahimi",
    role: "Cardiology",
    avatar: "MR",
    online: false,
    preview: "Your appointment request is ready to review.",

    messages: [
      {
        from: "them",
        text: "Thank you for reaching out. Your appointment request is ready to review.",
        time: "Yesterday",
      },
    ],
  },

  {
    id: 3,
    name: "Clinic Reception",
    role: "Central Medical Centre",
    avatar: "CR",
    online: true,
    preview: "We can help with clinic information.",

    messages: [
      {
        from: "them",
        text: "Hi there! We can help with general clinic information and scheduling questions.",
        time: "Mon",
      },
    ],
  },
];

// ==========================================
// 2. MAIN CHAT COMPONENT
// ==========================================

export default function Chat() {
  // ----------------------------------------
  // State variables
  // ----------------------------------------

  // Load previously saved conversations.
  const [threads, setThreads] = useState(() => {
    try {
      const savedThreads = localStorage.getItem(
        "mypatienthub-chat-threads"
      );

      return savedThreads
        ? JSON.parse(savedThreads)
        : initialThreads;
    } catch {
      return initialThreads;
    }
  });

  // Store the selected conversation.
  const [activeId, setActiveId] = useState(1);

  // Store the conversation search text.
  const [search, setSearch] = useState("");

  // Store the message being typed.
  const [draft, setDraft] = useState("");

  // Control the mobile conversation layout.
  const [mobileList, setMobileList] = useState(true);

  // ----------------------------------------
  // Find the active conversation
  // ----------------------------------------

  const active =
    threads.find((thread) => thread.id === activeId) ||
    threads[0];

  // ----------------------------------------
  // Filter conversations
  // ----------------------------------------

  const visible = useMemo(() => {
    return threads.filter((thread) => {
      const information = `
        ${thread.name}
        ${thread.role}
        ${thread.preview}
      `.toLowerCase();

      return information.includes(search.toLowerCase().trim());
    });
  }, [threads, search]);

  // ----------------------------------------
  // Save conversations to localStorage
  // ----------------------------------------

  useEffect(() => {
    try {
      localStorage.setItem(
        "mypatienthub-chat-threads",
        JSON.stringify(threads)
      );
    } catch {
      console.error("Could not save chat conversations.");
    }
  }, [threads]);

  // ----------------------------------------
  // Select a conversation
  // ----------------------------------------

  function handleSelectThread(threadId) {
    setActiveId(threadId);
    setMobileList(false);
  }

  // ----------------------------------------
  // Open the support conversation
  // ----------------------------------------

  function handleContactSupport() {
    setActiveId(1);
    setMobileList(false);
  }

  // ----------------------------------------
  // Send a message
  // ----------------------------------------

  function handleSendMessage(event) {
    event.preventDefault();

    const messageText = draft.trim();

    // Do not send an empty message.
    if (!messageText || !active) {
      return;
    }

    // Get the current time.
    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Add the message to the selected conversation.
    setThreads((oldThreads) =>
      oldThreads.map((thread) => {
        if (thread.id === activeId) {
          const newMessage = {
            from: "me",
            text: messageText,
            time: time,
          };

          return {
            ...thread,
            preview: messageText,
            messages: [...thread.messages, newMessage],
          };
        }

        return thread;
      })
    );

    // Clear the message input.
    setDraft("");
  }

  // ========================================
  // 3. PAGE UI
  // ========================================

  return (
    <div className="dashboard-container chat-layout">
      

      <main className="content">
        

        <div className="chat-page">

          {/* Page heading */}
          <div className="chat-page-heading">
            <div>
              <span className="eyebrow">
                Connected care
              </span>

              <h1>Messages</h1>

              <p>
                Keep conversations with your care team organized
                in one place.
              </p>
            </div>

            <span className="secure-badge">
              <i className="fa-solid fa-shield-heart"></i>
              Private demo inbox
            </span>
          </div>

          {/* Chat workspace */}
          <section
            className={`chat-workspace ${
              mobileList
                ? "show-thread-list"
                : "show-conversation"
            }`}
          >

            {/* =================================
                4. CONVERSATION SIDEBAR
            ================================= */}

            <aside className="chat-sidebar-panel">

              {/* Inbox heading */}
              <div className="chat-inbox-title">
                <div>
                  <h2>Inbox</h2>

                  <span>
                    {threads.length} conversations
                  </span>
                </div>

                <button
                  type="button"
                  title="New message"
                  aria-label="New message"
                  onClick={handleContactSupport}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </button>
              </div>

              {/* Search conversations */}
              <label className="chat-search">
                <i className="fa-solid fa-magnifying-glass"></i>

                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search messages"
                  aria-label="Search conversations"
                />
              </label>

              {/* Conversation list */}
              <div className="chat-thread-list">
                {visible.map((thread) => (
                  <button
                    key={thread.id}
                    type="button"
                    className={`chat-thread ${
                      thread.id === activeId ? "active" : ""
                    }`}
                    onClick={() =>
                      handleSelectThread(thread.id)
                    }
                  >
                    {/* Contact avatar */}
                    <span
                      className={`chat-avatar avatar-${thread.id}`}
                    >
                      {thread.avatar}

                      {thread.online && <i></i>}
                    </span>

                    {/* Contact information */}
                    <span className="chat-thread-copy">
                      <strong>{thread.name}</strong>

                      <small>{thread.role}</small>

                      <span>{thread.preview}</span>
                    </span>

                    <i className="fa-solid fa-chevron-right thread-chevron"></i>
                  </button>
                ))}

                {/* Empty search result */}
                {visible.length === 0 && (
                  <p className="chat-no-results">
                    No conversations found.
                  </p>
                )}
              </div>

              {/* Support card */}
              <div className="chat-help-card">
                <i className="fa-solid fa-headset"></i>

                <strong>Need a hand?</strong>

                <p>
                  Send a message to the support team for help
                  using the platform.
                </p>

                <button
                  type="button"
                  onClick={handleContactSupport}
                >
                  Contact support
                </button>
              </div>
            </aside>

            {/* =================================
                5. MAIN CONVERSATION PANEL
            ================================= */}

            <section className="chat-panel">

              {/* Conversation header */}
              <div className="chat-conversation-header">

                {/* Back button for mobile */}
                <button
                  type="button"
                  className="chat-back-button"
                  onClick={() => setMobileList(true)}
                  aria-label="Back to conversations"
                >
                  <i className="fa-solid fa-arrow-left"></i>
                </button>

                {/* Active contact avatar */}
                <span
                  className={`chat-avatar avatar-${active.id}`}
                >
                  {active.avatar}

                  {active.online && <i></i>}
                </span>

                {/* Active contact details */}
                <div>
                  <strong>{active.name}</strong>

                  <small>
                    {active.online
                      ? "Available now"
                      : active.role}
                  </small>
                </div>

                {/* Conversation information button */}
                <button
                  type="button"
                  className="chat-more-button"
                  aria-label="Conversation details"
                  title={active.role}
                  onClick={() =>
                    window.alert(
                      `${active.name}\n${active.role}`
                    )
                  }
                >
                  <i className="fa-solid fa-circle-info"></i>
                </button>
              </div>

              {/* Message history */}
              <div className="chat-message-area">
                <div className="chat-date-divider">
                  <span>Conversation</span>
                </div>

                {active.messages.map((message, index) => (
                  <div
                    key={`${active.id}-${index}`}
                    className={`chat-message-row ${
                      message.from === "me"
                        ? "mine"
                        : "theirs"
                    }`}
                  >
                    {/* Show avatar for received messages */}
                    {message.from !== "me" && (
                      <span
                        className={`chat-mini-avatar avatar-${active.id}`}
                      >
                        {active.avatar}
                      </span>
                    )}

                    {/* Message bubble */}
                    <div className="chat-message-bubble">
                      <p>{message.text}</p>

                      <small>
                        {message.time}

                        {message.from === "me" && (
                          <i className="fa-solid fa-check-double"></i>
                        )}
                      </small>
                    </div>
                  </div>
                ))}
              </div>

              {/* =================================
                  6. MESSAGE INPUT FORM
              ================================= */}

              <form
                className="chat-composer"
                onSubmit={handleSendMessage}
              >
                {/* Attachment button */}
                <button
                  type="button"
                  aria-label="Add attachment"
                  title="Attachments are not available in this demo"
                  onClick={() =>
                    window.alert(
                      "File attachments are not enabled in this demo."
                    )
                  }
                >
                  <i className="fa-solid fa-paperclip"></i>
                </button>

                {/* Message input */}
                <input
                  type="text"
                  value={draft}
                  onChange={(event) =>
                    setDraft(event.target.value)
                  }
                  placeholder={`Message ${active.name}…`}
                  aria-label="Write a message"
                />

                {/* Send button */}
                <button
                  className="chat-send-button"
                  type="submit"
                  disabled={!draft.trim()}
                  aria-label="Send message"
                >
                  <i className="fa-solid fa-paper-plane"></i>
                </button>
              </form>

              {/* Disclaimer */}
              <p className="chat-disclaimer">
                Demo messaging only. For urgent medical needs,
                contact local emergency services.
              </p>
            </section>
          </section>
        </div>

        <Footer />
      </main>
    </div>
  );
}