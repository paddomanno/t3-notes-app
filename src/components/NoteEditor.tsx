import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import ReactCodeMirror from "@uiw/react-codemirror";
import React, { useState } from "react";

type Props = {
  onSave: (note: { title: string; content: string }) => void;
};

export default function NoteEditor({ onSave }: Props) {
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  return (
    <div className="card mt-5 border border-gray-200 bg-base-200 shadow-xl">
      <div className="card-body">
        <div className="card-title">
          <input
            type="text"
            placeholder="Note title..."
            className="input-primary input input-lg w-full font-bold"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </div>
        <ReactCodeMirror
          value={code}
          width="500px"
          height="30vh"
          minWidth="100%"
          minHeight="30vh"
          extensions={[
            markdown({ base: markdownLanguage, codeLanguages: languages }),
          ]}
          onChange={(value) => setCode(value)}
          className="border-grey-300 border"
        />
      </div>
      <div className="card-actions justify-end">
        <button
          onClick={() => {
            onSave({ title, content: code });
            setCode("");
            setTitle("");
          }}
          className="btn-primary btn"
          disabled={title.trim().length === 0 || code.trim().length === 0}
        >
          Save
        </button>
      </div>
    </div>
  );
}
