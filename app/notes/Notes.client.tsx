"use client";

import { fetchNotes } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "@/app/notes/NotesPage.module.css";

import { useState } from "react";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import { useDebouncedCallback } from "use-debounce";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

export default function NotesClient() {
  const [searchWord, setSearchWord] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  const { data } = useQuery({
    queryKey: ["notes", searchWord, page],
    queryFn: () => fetchNotes(searchWord, page),
    placeholderData: keepPreviousData,
  });
  const debauncedSearch = useDebouncedCallback((newSearchQuery: string) => {
    setSearchWord(newSearchQuery);
    setPage(1);
  }, 300);
  const totalPages = data?.totalPages || 0;
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchWord} onChange={debauncedSearch} />
        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onChange={setPage}
          />
        )}
        <button className={css.button} onClick={() => setOpenModal(true)}>
          Create note +
        </button>
      </header>
      {openModal && (
        <Modal onClose={() => setOpenModal(false)}>
          <NoteForm onClose={() => setOpenModal(false)} />
        </Modal>
      )}
      {data?.notes && <NoteList notes={data?.notes} />}
    </div>
  );
}
