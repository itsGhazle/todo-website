"use client";

import React, { useState } from "react";
import { useTaskContext } from "@/app/context/TaskContext";
import { fa } from "@/app/languages/fa";
import Button from "@/app/ui/Button";
import TextField from "@/app/ui/TextField";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

export default function AddTask() {
  const { addTask } = useTaskContext();
  const [name, setName] = useState("");
  const [date, setDate] = useState<DateObject | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError(fa.TASK_NAME_CANNOT_BE_EMPTY);
      return;
    }

    if (!date) {
      setError(fa.TASK_DATE_CANNOT_BE_EMPTY);
      return;
    }

    addTask({
      name: name.trim(),
      date: date!.toString(),
      status: { _tag: "not_started" },
    });

    setName("");
    setDate(null);
    setError(null);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-base font-semibold mb-4">{fa.ADD_TASK}</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 text-xs px-2 py-1 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label={fa.TASK.name}
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div>
          <label htmlFor="date" className="block text-gray-700 mb-1">
            {fa.TASK.date}
          </label>
          <DatePicker
            calendar={persian}
            locale={persian_fa}
            className="w-full"
            inputClass="w-full p-2 border border-gray-300 rounded hover:cursor-pointer"
            value={date}
            onChange={(e) => setDate(e)}
          />
        </div>

        <Button type="submit" className="w-full">
          {fa.ADD_TASK}
        </Button>
      </form>
    </div>
  );
}
