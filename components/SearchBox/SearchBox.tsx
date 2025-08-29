import css from "@/components/SearchBox/SearchBox.module.css";

interface SearchBoxProps {
  searchQuery: string;
  onSeach: (searchQuery: string) => void;
}

export default function SearchBox({ searchQuery, onSeach }: SearchBoxProps) {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSeach(event.target.value);
  };
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={handleSearch}
      defaultValue={searchQuery}
    />
  );
}
