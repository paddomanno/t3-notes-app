// import { Topic } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { api, type RouterOutputs } from "~/utils/api";
import NoteCard from "./NoteCard";
import NoteEditor from "./NoteEditor";

export default function Content() {
  const { data: sessionData } = useSession();

  type Topic = RouterOutputs["topic"]["getAll"][0];

  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const { data: topics, refetch: refetchTopics } = api.topic.getAll.useQuery(
    undefined, // no input
    {
      enabled: sessionData?.user !== undefined,
      onSuccess: (data) => {
        setSelectedTopic(selectedTopic ?? data[0] ?? null);
      },
    }
  );

  const createTopicQuery = api.topic.create.useMutation({
    onSuccess: () => void refetchTopics(),
  });

  const { data: notes, refetch: refetchNotes } = api.note.getAll.useQuery(
    { topicId: selectedTopic?.id ?? "" },
    { enabled: sessionData?.user !== undefined && selectedTopic !== null }
  );

  const createNoteQuery = api.note.create.useMutation({
    onSuccess: () => void refetchNotes(),
  });

  const deleteNoteQuery = api.note.delete.useMutation({
    onSuccess: () => void refetchNotes(),
  });

  return (
    <div className="container p-4">
      <div className="m-5 grid grid-cols-4 gap-2">
        <div className="px-2">
          <h2>My topics</h2>
          <ul className="menu rounded-box w-56 bg-base-100 p-2">
            {topics && topics?.length > 0 ? (
              topics.map((topic) => (
                <li key={topic.id}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedTopic(topic);
                    }}
                  >
                    {topic.title}
                  </a>
                </li>
              ))
            ) : (
              <p>No topics yet</p>
            )}
          </ul>
          <div className="divider"></div>
          <input
            type="text"
            placeholder="New topic..."
            className="input-bordered input input-sm w-full"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                createTopicQuery.mutate({ title: e.currentTarget.value });
                e.currentTarget.value = "";
              }
            }}
          />
        </div>
        <div className="col-span-3">
          {selectedTopic ? <p>Notes in topic {selectedTopic.title}</p> : <></>}
          <div>
            {notes?.map((note) => (
              <div className="mt-5" key={note.id}>
                <NoteCard
                  note={note}
                  onDelete={() => void deleteNoteQuery.mutate({ id: note.id })}
                />
              </div>
            ))}
          </div>
          <NoteEditor
            onSave={({ title, content }) => {
              void createNoteQuery.mutate({
                title,
                content,
                topicId: selectedTopic?.id ?? "",
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}
