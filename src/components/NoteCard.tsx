import React, { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { RouterOutputs } from "../utils/api";

type Props = {
  note: Note;
  onDelete: () => void;
};

type Note = RouterOutputs["note"]["getAll"][0];

export default function NoteCard({ note, onDelete }: Props) {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  return (
    <div className="card mt-5 border border-gray-200 bg-base-100 shadow-xl">
      <div className="card-body m-0 p-3">
        <div
          className={`collapse-arrow collapse ${
            isExpanded ? "collapse-open" : ""
          }`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="collapse-title text-xl font-bold">{note.title}</div>
          <div className="collapse-content">
            <article className="ls:prose-xl prose">
              <ReactMarkdown>{note.content}</ReactMarkdown>
            </article>
          </div>
        </div>
        <div className="card-actions mx-2 flex justify-end">
          <button className="btn-warning btn-xs btn px-5" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
